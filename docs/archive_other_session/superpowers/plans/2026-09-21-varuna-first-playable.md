# Varuna First Playable Implementation Plan

> **For agentic workers:** Execute the independent creature art, game systems, and design bible tasks in parallel, then integrate and verify the running game. The orchestrator performs integration and browser verification in this session.

**Goal:** Create a playable Japanese-language third-person prehistoric exploration game prototype and a concrete production design for the full requested epic.

**Architecture:** TypeScript and Three.js render a continuous procedural landscape. DOM overlays supply a restrained cinematic Japanese interface. Pure game state and persistence are isolated from rendering so progression, combat conditions, and saves can be verified deterministically.

**Tech Stack:** Vite, TypeScript, Three.js, Node test runner / tsx, Playwright for browser verification. All runtime assets are local or procedurally generated; no required network connection during play.

## Scope and honesty

The first deliverable is the requested initial playable slice, not a finished 245–330 hour commercial game. The full design, content inventory, production dependencies, and acceptance gates accompany the executable. The slice should provide movement, a beautiful explorable grassland/forest landscape, wildlife observation, traces, a ruin, riding, a boss encounter with a regional consequence, journal/map/settings/photo tools, and saves. Its actual duration is not inferred from map size. Content absent from the executable is recorded as planned.

## File ownership

| Owner | Files | Responsibility |
| --- | --- | --- |
| Root | package.json, tsconfig.json, index.html, src/main.ts, src/style.css, src/world.ts, src/ui.ts, src/audio.ts | Setup, landscape, integration, input, UI, sound, browser verification |
| Creature worker | src/creatures.ts | Articulated procedural ancient creatures and player avatar |
| Systems worker | src/game-state.ts, src/content.ts, tests/game-state.test.ts | Pure game state, local save validation, progression, journal and boss content |
| Design worker | docs/game-design.md, docs/production-roadmap.md | Japanese production bible, detailed bosses, story, region layout, scope inventory |

## Task 1 — Establish the application

- [ ] Create a private package with `dev`, `build`, `preview`, and `test` commands. Build uses `tsc --noEmit && vite build`; test uses `tsx --test tests/*.test.ts`.
- [ ] Set TypeScript strict mode, ES2022, DOM libraries and bundler resolution. Use Vite on loopback with a documented stable port.
- [ ] Copy the user's source specification to `docs/source-request.txt` without changing its text.
- [ ] Install dependencies locally. Check `npm run build` after modules are integrated.

## Task 2 — Establish the tested progression contract

- [ ] Implement `createInitialState()`, normalized validated save/load, observation, trace discovery, relic collection, quest progress, boss damage and victory. Expose typed content coordinates independent of Three.js.
- [ ] Test actual gameplay invariants: repeated observation cannot grant repeated progress; boss protection prevents damage outside its opening; defeating a boss remains recorded after save/load; malformed or future-version saves do not crash or corrupt new state; remaining guardians gate the finale in the design, with the prototype completion distinct.
- [ ] Run `npm test`, inspect each result, and fix failures before integration.

## Task 3 — Build distinct moving creatures

- [ ] Export a small renderer API for sauropod, ceratopsian, raptor, pterosaur, mammoth, marine creature, guardian, and player. Geometry uses anatomical silhouettes, curved necks/tails, articulated limbs and material variation.
- [ ] Every creature exposes its root group and an update function accepting elapsed time, movement and activity. Geometry/material reuse limits allocations.
- [ ] Inspect walking, flight and grazing at runtime; do not describe procedural models as production cinematic assets.

## Task 4 — Build the landscape and lighting

- [ ] Generate continuous terrain from a deterministic height function shared with movement/collision. Create a river/lagoon, grassland, forest edge, ruins, trails, monumental cliffs, and a distant ancient silhouette.
- [ ] Use instanced grass/trees/rocks, atmospheric perspective, a sky gradient, warm directional light, water animation, restrained particles and distance detail.
- [ ] Ensure spawn and objective positions are above terrain and reachable; sample the camera terrain height to avoid going underground.

## Task 5 — Integrate actual play

- [ ] Implement camera-relative movement, run, jump/dodge, observation, interaction, attack, riding and pause. Include gamepad input and clearly documented controls.
- [ ] Connect trace/observation/ruin tasks to the journal and map. Entering the guardian arena starts readable combat; charge/recovery provides the opening; victory changes the route/world.
- [ ] Persist world state, position and settings; restore saves without duplicate rewards. Provide manual saves, continue, and restart confirmation.
- [ ] Add background ambience activated by a user gesture; volume and mute must work.

## Task 6 — Design the presentation

- [ ] Build cinematic title/pause views, restrained HUD, interactive journal/map, real settings and photo capture. Avoid filling the game with development explanations; keep build/scope information in the help/about area and docs.
- [ ] Japanese typography, warm ivory/gold on deep forest tones, line-based ornaments and generous spacing. All visible buttons perform implemented actions.
- [ ] Handle loading and WebGL failure gracefully. Pause simulation while a modal or inactive tab is open.

## Task 7 — Write full production documentation

- [ ] Develop six characters, four factions, five acts, eight regions plus finale, four midbosses plus final boss, progression/equipment/ecosystem systems, original side quests and endgame.
- [ ] Map the requested content counts to production modules and track design / prototype / production status separately. Explain graphical asset pipeline and the engine decision without asserting unmeasured performance.
- [ ] Include 245–330 hour validation methodology and explicit non-overlap rules, milestone dependencies, QA risks and actual current limitations.

## Task 8 — Verify and deliver

- [ ] Run fresh `npm test` and `npm run build` successfully.
- [ ] Launch with `npm run dev -- --host 127.0.0.1`. Verify the title, start/continue, movement, journal, map, settings, observation, boss phases, victory, save/reload and photo mode using a browser.
- [ ] Capture actual screenshots, inspect them, correct visual problems and record measured renderer timing with test environment identified. Do not extrapolate headless figures to user's GPU.
- [ ] Write README with launch steps, control mapping, actual implemented content and limitations. Final response links the local game and documentation and distinguishes the prototype from the full production target.
