const { CHARACTERS, buildPrompt } = require('../lib/prompts.js');

// Nano Banana (Gemini image editing) keeps faces far better than FLUX Kontext
// and costs about the same on fal ($0.0398 per image).
// Optional FAL_MODEL values:
//   fal-ai/nano-banana/edit      default, ~$0.04
//   fal-ai/nano-banana-2/edit    newer, ~$0.08, best likeness and detail
//   fal-ai/flux-pro/kontext      the old model, ~$0.04
const DEFAULT_MODEL = 'fal-ai/nano-banana/edit';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const falKey = process.env.FAL_KEY;
  if (!falKey) {
    return res.status(500).json({ error: 'Server configuration error: FAL_KEY is not set in Vercel.' });
  }

  try {
    const { image_url, character, style } = req.body || {};

    if (typeof image_url !== 'string' || !image_url.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Please choose a photo first.' });
    }
    if (image_url.length > 4 * 1024 * 1024) {
      return res.status(413).json({ error: 'That photo is too large. Try another one.' });
    }

    const prompt = buildPrompt(character, style);
    if (!prompt) {
      return res.status(400).json({ error: 'Please pick a character and a style.' });
    }
    const aspect = CHARACTERS[character].aspect;

    const modelId = (process.env.FAL_MODEL || DEFAULT_MODEL).trim();
    const isKontext = modelId.includes('kontext');

    const payload = isKontext
      ? {
          prompt,
          image_url,
          aspect_ratio: aspect,
          guidance_scale: 2.5,      // lower = stays closer to the photo
          output_format: 'jpeg',
          safety_tolerance: '2',
          num_images: 1
        }
      : {
          prompt,
          image_urls: [image_url],
          aspect_ratio: aspect,
          output_format: 'jpeg',
          num_images: 1
        };

    const falResponse = await fetch(`https://fal.run/${modelId}`, {
      method: 'POST',
      headers: { Authorization: `Key ${falKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await falResponse.json().catch(() => ({}));

    if (!falResponse.ok) {
      console.error('fal error', falResponse.status, JSON.stringify(data).slice(0, 500));
      return res.status(502).json({ error: 'The portrait could not be made just now. Please try again.' });
    }

    const imageUrl = data?.images?.[0]?.url;
    if (!imageUrl) {
      return res.status(422).json({
        error: 'This photo could not be turned into a portrait. Try a clear photo of one face, or another character.'
      });
    }

    return res.status(200).json({ url: imageUrl, aspect });
  } catch (err) {
    console.error('Generation error:', err);
    return res.status(500).json({ error: 'Unexpected error while making the portrait. Please try again.' });
  }
};
