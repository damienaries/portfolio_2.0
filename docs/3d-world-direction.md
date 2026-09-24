# Portfolio 3D World — long-term direction

**Status: not started.** Nothing here is scheduled. The 3D landing page (Phase 1)
has to land first — roughly late October 2026 — and until it does this document
is direction, not a backlog. Treat it as the thing to break future issues out
of, not a plan to work through top to bottom.

### Decided so far

_2026-09-21, on first read-through of this direction:_

- The world lives at **its own route**; `/` stays light.
- Mobile navigates by **waypoint, not free movement** — see
  [Navigation models](#navigation-models).
- Journal posts are **drafted in-repo now, published in Phase 6**.
- Work Street is **curated buildings plus background presence** for the rest.

Everything still open is in [Open questions](#open-questions).

---

## Goal

Evolve the portfolio from a conventional developer site with a 3D landing page
into a small, explorable 3D world.

It should demonstrate frontend engineering, Blender/3D skill, real-time web
graphics, performance work and visual storytelling, while staying a practical
portfolio that a recruiter can actually use.

The site evolves incrementally. No rebuild.

## The principle everything else answers to

**Nobody is ever forced to play a game to understand the portfolio.**

Someone who wants to explore gets a small interactive world. Someone who wants
to read the Swizzle case study opens `/work/swizzle` and reads it. Conventional
navigation and direct URLs stay, permanently, as first-class paths — not as a
degraded fallback.

The 3D world is a navigation and storytelling layer. It is not where content
lives.

Read the rest of this document with that constraint in front of it. Where a
feature and this principle conflict, the principle wins.

## Scope guardrail

This is **not** an open-world game. The target is:

1. A landing/start area
2. One small commercial street (work)
3. One perpendicular personal street

Los Angeles continues past the boundary by implication only — composition,
distant geometry, hills, vegetation, blocked roads. **Small film set or backlot,
not a simulated city.**

No gameplay systems unless they directly improve navigation or storytelling. No
inventory, quests, combat, NPCs, economy.

---

## The world

### Work Street

A small commercial street where projects exist physically.

- **Swizzle** — a bar. The most natural fit, and the best candidate for the
  first complete interactive location.
- **iVisa** — a larger established commercial space, representing several years
  of professional work.
- **Habit Tracker** — a smaller storefront.
- **CWC** — its own client/business space. (Lives in the repo as
  `leader-institute` and 'made in the middle collective' projects.)
- Everything else can be storefronts, posters, windows, signage, or environment
  objects.

Do **not** force every project into the same "store" metaphor. Believable
stylized neighborhood first, project index second.

Interacting with a project opens the real React case study. Large amounts of
text never go inside the 3D world.

**Coverage: curated buildings, plus background presence for the rest.** There
are eight deep dives in [`src/content/deep-dives/`](../src/content/deep-dives):
`ivisa`, `swizzle`, `habit-tracker`, `leader-institute`, `corea-creative`,
`carey-corea`, `judi-boisson`, `concept`. The four named above get buildings.
The other four appear as posters, signage, window displays or a facade on the
cross street — present in the world, lower fidelity, still clicking through to
`/work`.

That gives two tiers of interactive object to design: a door you enter and a
surface you read. Worth keeping the distinction legible in the art, so a visitor
learns which things are which without being told.

### Storyboard — the construction site

This project will only be shown on portfolio once it is under construction. architect in a way that allows that.

The long-term collaborative storyboard platform ("Figma for storyboards")
appears as a building **under construction**. It is ambitious and actively in
development, and the environment should say so rather than pretend it is
finished.

Scaffolding, fencing, unfinished structure, and a development-style project
board:

```
STORYBOARD — UNDER CONSTRUCTION
Collaborative visual production workspace

Idea → Script → Visual References → Storyboard → Shot List → Production

Status: Pre-production / In development
Estimated completion: 2028
```

Interacting with the board opens a living project page: product vision, current
status, architecture decisions, early UI explorations, data models, technical
experiments, screenshots, prototypes, milestones.

The site visually evolves as the real project does — empty lot → foundation →
structure → facade → completed building. The portfolio and the product advance
together, which is the point of putting it there at all.

### Personal Street

A perpendicular street, more residential in feel, holding About, Blog/journal
and Contact. The physical metaphors don't need deciding yet.

---

## Ownership

Keeping this boundary clean is what stops the world from becoming the app.
When reaching this stage of development, help me curate the list of assets to be created.

**Blender owns** environment modeling, buildings, props, materials,
character/environment assets, rigging, animation, and baked lighting where
appropriate.

**Three.js / React Three Fiber owns** rendering, both navigation models (free
movement and waypoint), input, collision, raycasting and interaction, animation
playback, scene transitions, asset loading, and LOD/performance behavior.

**React/Next owns** case studies, blog, about, contact, SEO, accessibility,
routing, admin, and resume tooling.

### Routing

**The world gets its own route.** `/` keeps the current fast scene
([`src/app/page.tsx`](../src/app/page.tsx)) and gains a second door alongside
Enter. The world's bundle is never on the critical path for the landing, and the
"never forced to play" principle becomes structural rather than promised.

Every important destination keeps a real URL:

```
/              landing — current scene, Enter → /work, Explore → the world
/work/swizzle  /work/ivisa   /about   /blog   /contact
```

Direct links work without walking through the world first. The site shell loads
independently of the 3D experience — the two are separable by construction, not
by convention.

Deep links need to work in both directions: a case study opened from inside the
world should be a real navigation, and arriving at a project's URL cold should
not require the world to exist.

### Navigation models

There are two, and the system should treat neither as the fallback.

**Free movement** — desktop. First-person controller, keyboard arrows and/or WASD, mouse look, collision. The mode that demonstrates real-time engineering.

**Waypoint** — mobile and low-powered devices. Closer to walking a street in
Google Maps than to a game: tap a point further down the street and the camera
travels there; tap a storefront and it snaps to that storefront. Discrete stops
rather than continuous control.

This is a deliberate design choice, not a degraded port. It happens to remove
most of what makes 3D expensive on a phone — no continuous input loop, no
per-frame collision, camera positions known in advance so surrounding assets can
be prefetched at each stop and nothing else needs to be resident.

Two consequences worth holding onto:

- **The interaction layer has to be navigation-agnostic.** "Enter the Swizzle
  bar" is the same intent whether the visitor walked there or tapped it. Phase 3
  should build the interaction and routing systems against that intent, with the
  controller as a swappable input to it — not a first-person controller with a
  mobile branch grafted on later.
- **Waypoint is worth prototyping early**, since it may turn out to be the nicer
  way to move around a street this small even on desktop, or a good accessibility
  path for anyone who can't use mouse-look.

---

## Performance

Performance is a first-class requirement, not a polish phase.

**Do not export one enormous Blender scene and load it at startup.** The world
is modular and progressively loaded.

Techniques to reach for: GLB/glTF; Meshopt/Draco where useful; KTX2/Basis
compressed textures; instancing for repeated geometry; LODs; baked lighting;
few dynamic lights and shadows; sensible texture sizes; lazy loading of
secondary areas; adaptive quality; reduced effects and pixel ratio on weak
hardware.

Nobody downloads the world to read a case study.

---

## Blog / development journal

Document the process of building this. A real development journal, not SEO
filler.

Candidate posts:

- Learning Blender as a web developer
- Building my first environment
- Blender → GLB → Three.js
- Why Three.js instead of Unity for the portfolio
- Building first-person controls for the web
- Optimizing a 3D environment for browser performance
- Designing a tiny LA-inspired world
- Mistakes and iterations while learning 3D

Screenshots, experiments and failures are the valuable part. The portfolio
becomes its own case study: conventional frontend engineering →
interactive/3D/entertainment technology.

**Draft now, publish in Phase 6.** No `/blog` route yet and no infrastructure —
posts are written as plain markdown in the repo as the work happens, starting
with Phase 1. Phase 6 turns them into the published blog.

The reason to write them now rather than later: the useful part of a journal is
what you thought at the time. The Blender learning curve and the Unity-vs-R3F
call are not reconstructible from memory a year on.

The known cost of this route is that drafts rot and "turn these into posts
later" quietly becomes its own project. Two things make that less likely — write
each post as if it were being published that week rather than as notes, and date
every file so the sequence survives even if the prose needs work later.

---

## Resume

Keep the current resume as-is for now.

Longer term the public resume page disappears from the portfolio and becomes an
internal job-search tool behind a private/admin route.

One structured source of truth for profile, experience, skills, projects, and
education. Eventually: editing from an admin UI, version history, multiple
variants, PDF export, role-specific versions, and previously submitted
versions.

The public portfolio and the private resume system can share structured
project/work data where useful, but they serve different readers and should not
be forced into one shape.

> **Repo note.** [`data/resume_data.json`](../data/resume_data.json) is already
> the structured source. The gap is editing, history and variants — not the data
> model's existence.

---

## Phases

Each phase should break into independent issues. Do not attempt the world at
once.

| #   | Phase                       | Outcome                                                                                                                                                   |
| --- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Current 3D landing page** | Finish the Blender environment and visual direction.                                                                                                      |
| 2   | **Browser prototype**       | Export to GLB, build an experimental R3F route.                                                                                                           |
| 3   | **Environment system**      | Navigation-agnostic interaction and routing, both controllers behind it, asset loading, scene management, performance scaling, HTML overlays, deep links. |
| 4   | **Work Street MVP**         | Landing → street → one project. Swizzle first. Validate UX and performance before expanding.                                                              |
| 5   | **Complete Work Street**    | Remaining projects plus the Storyboard construction site.                                                                                                 |
| 6   | **Personal Street**         | About, Blog, Contact destinations. Journal drafts written since Phase 1 become the published blog.                                                        |
| 7   | **Polish**                  | Environment art, animation, transitions, sound, loading, accessibility, performance, environmental storytelling.                                          |

### Phase 2 is a decision gate

The prototype has to prove: the Blender → browser pipeline, first-person
movement, mouse look, collision, animation playback, one interactive object,
and React UI triggered from the 3D scene.

Worth adding a waypoint move to the same prototype. It is a small amount of
extra work there and it answers two questions at once — whether the mobile model
feels right, and whether the interaction layer really is navigation-agnostic or
only claims to be.

Its real output is the **Three.js/R3F vs Unity WebGL** call. That decision wants
written criteria before the prototype starts, so it gets made on evidence rather
than on how the week went — see [Open questions](#open-questions).

---

## Open questions

Not blocking. Worth settling before Phase 2 starts.

1. **What are the Phase 2 pass/fail criteria?** Target frame rate, on which
   reference device, at what payload, with what time-to-interactive. Written
   down before the prototype, not after — otherwise the Three.js-vs-Unity call
   gets made on how the week went.

2. **Where does the Storyboard living project page live?** This repo, or its
   own? It needs to update as that product moves, independently of portfolio
   releases.

3. **What guards the admin route?** There is no backend or auth in this repo
   today. The private resume tool is the first thing that needs one.

4. **Where do journal drafts live in the repo?** `docs/journal/` is the obvious
   place, but if Phase 6 wants MDX with components it may be cheaper to write
   them in their eventual home from day one.

5. **Does waypoint navigation also serve desktop?** Cheap to answer during the
   Phase 2 prototype, and it would collapse two navigation models into one.

---

## Working notes

- **Extract reusable pieces as packages.** `da-signature` is the precedent: the
  mark started as a local component, became a published custom element, and is
  now consumed by both this site and Swizzle. A player controller or interaction
  system could plausibly go the same way — but only once a second consumer
  exists. One consumer is a component, not a package.
- **The world is a consumer of content, never its owner.** If a change would put
  case-study text, project metadata or copy inside a GLB, it is the wrong change.
