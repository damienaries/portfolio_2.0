# Contact form → Google Apps Script

Replaces Netlify Forms. Submissions land in a Google Sheet and email you.

## Why this shape

Apps Script web apps **cannot answer a CORS preflight**. So the browser must
send a "simple" request — one the spec exempts from preflight — which means:

- `Content-Type: text/plain;charset=utf-8` (JSON content type would trigger one)
- no custom headers
- body is a JSON string, parsed from `e.postData.contents` on the script side

`/exec` also 302-redirects to `script.googleusercontent.com`, which is where the
CORS headers actually come from. `fetch` follows that automatically.

Apps Script **can't set HTTP status codes** on a `ContentService` response, so
every reply is `200` with an `ok` flag in the body. The client checks the flag,
not the status.

---

## 1. Create the sheet

New Google Sheet, name it something like `damienaries-contact`. Rename the first
tab to **Submissions**. Note the ID from the URL:

```
https://docs.google.com/spreadsheets/d/<THIS_PART>/edit
```

## 2. Add the script

In the sheet: **Extensions → Apps Script**. Replace `Code.gs` with:

```javascript
const SHEET_ID = 'PASTE_SHEET_ID_HERE';
const TAB = 'Submissions';
const NOTIFY = 'damien@damienaries.com';

/** Every reply is 200 — ContentService can't set status codes. */
function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);

    // Honeypot. Report success so bots don't learn anything, but write nothing.
    if (d['bot-field']) return reply({ ok: true });

    if (!d.email || !d.message) {
      return reply({ ok: false, error: 'Email and message are required.' });
    }

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Received', 'Enquiry', 'Name', 'Email', 'Company', 'Message']);
    }
    sheet.appendRow([
      new Date(),
      d.inquiry || '',
      d.name || '',
      d.email,
      d.company || '',
      d.message,
    ]);

    MailApp.sendEmail({
      to: NOTIFY,
      replyTo: d.email,
      subject: `Portfolio: ${d.inquiry || 'enquiry'} — ${d.name || d.email}`,
      body:
        `Enquiry: ${d.inquiry || '(none)'}\n` +
        `Name:    ${d.name || '(none)'}\n` +
        `Email:   ${d.email}\n` +
        `Company: ${d.company || '(none)'}\n\n` +
        `${d.message}\n`,
    });

    return reply({ ok: true });
  } catch (err) {
    console.error(err);
    return reply({ ok: false, error: 'Server error.' });
  }
}

/** Health check — visit the /exec URL in a browser to confirm deployment. */
function doGet() {
  return reply({ ok: true, service: 'contact' });
}
```

Paste the sheet ID into `SHEET_ID`.

## 3. Deploy it

**Deploy → New deployment → Web app**

| Field | Value |
|---|---|
| Execute as | **Me** |
| Who has access | **Anyone** |

"Anyone" is required — the browser posts unauthenticated. Authorise the scopes
when prompted (Sheets + Gmail send).

Copy the **Web app URL**, ending in `/exec`.

## 4. Point the site at it

Local — add to `.env` (gitignored):

```
NEXT_PUBLIC_CONTACT_ENDPOINT=https://script.google.com/macros/s/…/exec
```

Netlify — **Site configuration → Environment variables**, same key and value.

`NEXT_PUBLIC_` is inlined at build time, so **a change needs a redeploy**, not
just a restart. It's a public endpoint by design, so being in the client bundle
costs nothing — anyone can POST to it either way, which is what the honeypot and
the required-field check are for.

## 5. Verify

1. Open the `/exec` URL directly — should return `{"ok":true,"service":"contact"}`
2. Submit the real form on `/contact`
3. Check the sheet for a row, and your inbox for the notification

## Re-deploying after script edits

Apps Script pins each deployment to a version. After editing `Code.gs`:
**Deploy → Manage deployments → edit (pencil) → Version: New version → Deploy.**
The URL stays the same. Creating a *new deployment* instead gives a new URL and
is the usual reason "it worked yesterday" stops being true.
