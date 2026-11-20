# Ramayan Avatar Booth (Fal.ai + Vercel)

Zero-build web app for generating face-preserving Ramayan portraits in two styles (Traditional Painting & Epic Film Still) using Fal.ai.

## Files
- `index.html` — Mobile-friendly frontend UI (10 characters, Ramayana intro, Dussehra/Deepavali story, style selector, download).
- `api/generate.js` — Secure Vercel serverless function that calls Fal.ai using your `FAL_KEY` environment variable.
- `vercel.json` — Extends serverless timeout to 60 seconds for smooth image generation.

## Deployment
1. Upload all files (keeping `api/generate.js` inside the `api/` folder) to a GitHub repository.
2. Import the repository at https://vercel.com/new.
3. Add Environment Variable: `FAL_KEY` = your Fal.ai API key.
   - Optional: `FAL_MODEL` = `fal-ai/flux-pro/kontext` (default, $0.04/image, best quality) or `fal-ai/flux-kontext/dev` (~$0.025/image).
4. Click Deploy and generate a QR code for your live `.vercel.app` URL.
