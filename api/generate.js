module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const falKey = process.env.FAL_KEY;
  if (!falKey) {
    return res.status(500).json({
      error: 'Server configuration error: FAL_KEY environment variable is not set in Vercel.'
    });
  }

  try {
    const { image_url, prompt } = req.body || {};

    if (!image_url || !prompt) {
      return res.status(400).json({ error: 'Missing required fields: image_url and prompt.' });
    }

    const modelId = (process.env.FAL_MODEL || 'fal-ai/flux-pro/kontext').trim();
    const endpoint = `https://fal.run/${modelId}`;

    // Lower guidance_scale (2.5 - 2.8) preserves the uploaded person's real face and identity much better.
    const payload = modelId.includes('kontext/dev')
      ? {
          prompt,
          image_url,
          resolution_mode: '3:4',
          guidance_scale: 2.3,
          num_inference_steps: 28,
          acceleration: 'regular',
          output_format: 'jpeg',
          num_images: 1
        }
      : {
          prompt,
          image_url,
          aspect_ratio: '3:4',
          guidance_scale: 2.8,
          output_format: 'jpeg',
          safety_tolerance: '2',
          num_images: 1
        };

    const falResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${falKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await falResponse.json().catch(() => ({}));

    if (!falResponse.ok) {
      const detail = data.detail || data.error || data.message || `Fal.ai returned HTTP ${falResponse.status}`;
      return res.status(falResponse.status).json({
        error: typeof detail === 'string' ? detail : JSON.stringify(detail)
      });
    }

    const imageUrl = data?.images?.[0]?.url;
    if (!imageUrl) {
      return res.status(502).json({ error: 'Fal.ai did not return an image URL.' });
    }

    return res.status(200).json({ url: imageUrl });
  } catch (err) {
    console.error('Generation error:', err);
    return res.status(500).json({
      error: err.message || 'Unexpected server error while generating portrait.'
    });
  }
};
