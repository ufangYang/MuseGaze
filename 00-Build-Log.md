---
project: MuseRave
type: build-log
status: Phase 3 done — live prompt + EEG verification
updated: 2026-08-04
---

# MuseRave — Build Log

Crash-safe progress tracker. If a conversation dies, this file is the source of truth. Read **RESUME HERE**, then continue.

> **RESUME HERE:** Repo LIVE at github.com/ufangYang/MuseRave, site https://ufangyang.github.io/MuseRave/. Phase 2 done: `index.html` now converts raw bands into steady, self-calibrating 0–1 features (adaptive per-band min/max in `toFeatures()`), shows a features readout, and drives the art from features. Verified in node (low/mid/high → 0/50/100). Working GitHub-only, no local files needed. Next action = Phase 3: map features to a text prompt.

## Goal
Muse 2 EEG → bands → features → prompt → cheap AI image, shown on screen. Runs as a website. No AI signatures in the repo.

## Locked decisions
- **Engine: browser (Web Bluetooth via muse-js), NOT goofi-pipe.** Reason: user does not want Terminal; goofi is a desktop app that needs Terminal + muselsl. Browser pairs the Muse directly from a webpage.
- Publish via GitHub website upload + GitHub Pages (no git/Terminal, no merge conflicts on an empty repo).
- Image stage: cheap image API, added after connect + bands + features work.
- Dropped from earlier goofi plan: `connect_muse.py`, `requirements.txt`, `muselsl`.

## Phase map
- [x] **Phase 1 — Connect + live bands** (works in `index.html`; Simulate button for no-headset)
- [x] Phase 1b — Published to GitHub + Pages. Repo: github.com/ufangYang/MuseRave. Live: https://ufangyang.github.io/MuseRave/
- [x] Phase 2 — Preprocess bands → steady 0–1 features (adaptive normalization + features panel)
- [x] Phase 3 — Map features → live text prompt (buildPrompt: top-2 bands → mood/texture/color). Bottom prompt bar.
- [x] Verification added — raw EEG scope (auto-scaled, per-channel selectable), LIVE/no-data light (lastPacket), smoothing slider. Left "monitor" panel = the goofi-like plot+params chooser.
- [x] Lab view added — goofi-style analysis panel: raw EEG scope + live power spectrum (PSD, 1–45 Hz, bands shaded) + band/feature values + controls. "Lab view" toggle in top bar flips between clean art and full lab (two modes). For the ERP-researcher user who wants to see/control the frequency pipeline.
- [ ] Phase 4 — Prompt → cheap AI image on screen  ← current
- [ ] Phase 2 — Preprocess bands → steady 0–1 features
- [ ] Phase 3 — Features → text prompt
- [ ] Phase 4 — Prompt → cheap AI image on screen

## Files
- `index.html` — the app (connect, bands, art). Open in Chrome/Edge.
- `README.md` — overview + live URL.
- `00-Build-Log.md` — this tracker.
- `UPLOAD-TO-GITHUB.md` — click-by-click publish steps (not needed in the repo itself).

## What "done" looks like now
`https://ufangYang.github.io/MuseRave/` opens, Connect pairs the Muse 2, five band bars move, the canvas reacts.

## Known-good notes
- muse-js MUST be imported from `https://esm.sh/muse-js` (unversioned). A pinned `muse-js@2.0.2` does NOT exist on the CDN and silently kills the whole module (page renders buttons only, no bands). Do not pin a made-up version.
- Custom domain is live too: www.yufang-yang.com/MuseRave/. After any push, hard-refresh (Cmd+Shift+R) to bypass cache.

## Change history
- 2026-08-04 — Fixed blank page: import muse-js from esm.sh instead of a non-existent pinned version. Verified live (5 bands + features panel + art render).
- 2026-08-04 — Pivoted to browser path (no Terminal). Renamed interface to `index.html`. Rewrote README. Prepared GitHub website-upload steps.
- 2026-08-04 — (earlier) Scaffolded goofi/terminal Phase 1 — now superseded.
