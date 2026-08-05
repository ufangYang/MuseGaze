// ============================================================================
//  MuseGaze image Worker — free live text→image with NO GPU and NO bill.
//  Runs on Cloudflare Workers AI (free tier ~10,000 neurons/day = a few hundred
//  Flux images). MuseGaze's Image node POSTs { prompt }, this returns
//  { image: "<base64>" }, which the node draws. Credentials stay on Cloudflare;
//  nothing is exposed in your browser.
//
//  DEPLOY (all in the browser, ~10 minutes, no command line):
//   1. Make a free account at https://dash.cloudflare.com  (no card needed).
//   2. Left sidebar → "Workers & Pages" → "Create" → "Create Worker".
//      Give it a name like  musegaze-image  → "Deploy".
//   3. Click "Edit code". Delete what's there, paste THIS whole file, "Deploy".
//   4. Go to the Worker's "Settings" → "Bindings" → "Add binding" →
//      choose "Workers AI". Set the Variable name to exactly:  AI  → Save/Deploy.
//   5. Copy the Worker URL (looks like  https://musegaze-image.<you>.workers.dev ).
//   6. In MuseGaze → Control → the "Image" node, paste that URL into the
//      endpoint field. Images now render live from your brain-written prompt.
//
//  To use a different model, change MODEL below. Good free options on Workers AI:
//   '@cf/black-forest-labs/flux-1-schnell'          (fast, high quality — default)
//   '@cf/stabilityai/stable-diffusion-xl-base-1.0'  (SDXL; returns a PNG stream)
//   '@cf/bytedance/stable-diffusion-xl-lightning'   (very fast SDXL)
// ============================================================================

const MODEL = '@cf/black-forest-labs/flux-1-schnell';

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST')
      return new Response('POST { "prompt": "..." }', { status: 405, headers: cors });

    let prompt = 'a luminous abstract dreamscape, painterly';
    try { const body = await request.json(); if (body && body.prompt) prompt = String(body.prompt); } catch {}

    try {
      const out = await env.AI.run(MODEL, { prompt, steps: 6 });
      // flux-1-schnell returns { image: "<base64 jpeg>" }.
      // SDXL models return a raw PNG stream instead — handle both.
      let b64;
      if (out && out.image) {
        b64 = out.image;
      } else if (out instanceof ReadableStream || out instanceof ArrayBuffer || out instanceof Uint8Array) {
        const buf = out instanceof ReadableStream ? await new Response(out).arrayBuffer()
                  : (out instanceof Uint8Array ? out.buffer : out);
        b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
      } else {
        return new Response(JSON.stringify({ error: 'unexpected model output' }),
          { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } });
      }
      return new Response(JSON.stringify({ image: b64 }),
        { headers: { ...cors, 'Content-Type': 'application/json' } });
    } catch (e) {
      return new Response(JSON.stringify({ error: String(e) }),
        { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } });
    }
  },
};
