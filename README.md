# MuseRave

A website that reads your Muse 2 brainwaves live and turns them into visuals — and, in later phases, AI images. It connects the headband straight from the browser over Bluetooth. No install, no Terminal.

## Live site
Once GitHub Pages is on: **https://ufangYang.github.io/MuseRave/**
Open it in Chrome or Edge, click **Connect Muse**, and your five brainwave bands drive the visuals in real time. (Safari/Firefox can't do Web Bluetooth.)

## How it works
- `index.html` — the whole app in one file. Uses [muse-js](https://github.com/urish/muse-js) (Web Bluetooth) to pair the Muse 2, computes the five EEG bands (delta, theta, alpha, beta, gamma) with a built-in FFT, and renders live art. Try **Simulate** to see it with no headset.
- Everything runs in your browser. Nothing is sent to a server.

## Roadmap
- Phase 1: connect + live bands (done, in `index.html`).
- Phase 2: preprocess bands into steady 0–1 features.
- Phase 3: map features to a text prompt.
- Phase 4: call a cheap image model from the prompt and show the picture.

Progress is tracked step-by-step in `00-Build-Log.md`.
