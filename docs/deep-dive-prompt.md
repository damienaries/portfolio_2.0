# Deep-dive drafting prompt

Paste this into ChatGPT, then name one project. It interviews you first and
drafts second — the questions are the point, since the value of these pages is
detail nobody could invent.

Output drops straight into `src/content/deep-dives/<slug>.ts`.

---

You're helping me write a short case study for my engineering portfolio. I'm a
front-end engineer in Los Angeles with six years of experience, currently
targeting product and media/entertainment companies. The audience is a hiring
manager or interviewer who will read this and then ask me follow-up questions
about it — so everything in it has to be true and specific enough that I can
defend it out loud.

**Work in two phases. Do not skip phase one.**

**Phase 1 — interview me.** Ask me up to 8 questions, a few at a time, about the
project I name. Prioritise:

- what specifically prompted me to build it, and when
- what problem it solves, and what people did before it
- what I personally owned versus what was decided for me
- the two or three technical or product decisions that had real alternatives,
  and why I chose as I did
- what each of those decisions cost me
- how it turned out — numbers if they exist, honest uncertainty if they don't
- what I'd rebuild given the chance

Ask follow-ups when an answer is vague. If I give you a generic answer like
"to learn React," push me for the concrete version. Do not move on until you
have enough to write without inventing anything.

**Phase 2 — draft it.** Write roughly 350–500 words total, structured as:

- **Context** — 2 short paragraphs. What existed before, and the specific failure
  it addresses.
- **What I owned** — 1 paragraph, plain and direct.
- **Decisions that mattered** — 2 or 3 paragraphs, each opening with a bolded
  decision, then the alternative I rejected and why. Include the cost.
- **Where it stands** — 1 short paragraph.
- **Outcome** — 1–3 bullet points, concrete.
- **What I'd change** — 1–2 bullet points, genuinely self-critical.

**Rules:**

- Never invent a metric, a user count, or an outcome. If I haven't given you a
  number, write the honest version instead.
- No filler adjectives: nothing is "robust," "seamless," "cutting-edge," or
  "passionate."
- No stack lists. Technology only appears attached to a decision it explains.
- Short sentences. Active voice. First person.
- Write the way an engineer talks to another engineer, not the way a landing
  page talks to a visitor.
- If a section would be weak because I didn't give you enough, say so rather
  than padding it.

**Then output it as a TypeScript object** matching this shape exactly, so I can
paste it into my repo:

```ts
import type { DeepDive } from './types';

export const <slug>: DeepDive = {
  slug: '<kebab-case-slug>',
  intro: '<one or two sentences, the standfirst under the title>',
  sections: [
    { heading: 'Context', body: ['<paragraph>', '<paragraph>'] },
    { heading: 'What I owned', body: ['<paragraph>'] },
    { heading: 'Decisions that mattered', body: ['**<decision>.** <why>', '**<decision>.** <why>'] },
    { heading: 'Where it stands', body: ['<paragraph>'] },
  ],
  outcomes: ['<concrete outcome>'],
  wouldChange: ['<honest thing I would rebuild>'],
};
```

Use `**bold**` only at the start of decision paragraphs. Keep apostrophes as
plain `'` escaped for TypeScript.

The project is: **<PROJECT NAME>**

---

## After pasting

1. Save as `src/content/deep-dives/<slug>.ts`
2. Add it to `src/content/deep-dives/index.ts`:
   ```ts
   import { ivisa } from './ivisa';
   const DEEP_DIVES: DeepDive[] = [swizzle, ivisa];
   ```
3. The `slug` must match the project's `slug` in `data/portfolio_data_copy.json`

The "Read the deep dive" link appears on `/work` automatically once it's in the
registry — projects without one simply don't show the link.
