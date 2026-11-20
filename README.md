# Ramayan Avatar Booth (Fal.ai + Vercel)

Mobile web app that turns a guest's photo into a Ramayan character portrait in two styles
(Ravi Varma-style painting and Indian epic film still), using fal.ai.

## Files
- `index.html` - the page guests see.
- `api/generate.js` - Vercel function that calls fal.ai with your `FAL_KEY`.
- `lib/prompts.js` - all character and style prompts. Edit costumes here.
- `vercel.json` - 60-second timeout and bundles `lib/`.

## Deploy
1. Put all files in a GitHub repository, keeping the `api/` and `lib/` folders.
2. Import it at https://vercel.com/new.
3. Add the environment variable `FAL_KEY` = your fal.ai key.
   Optional `FAL_MODEL`:
   - `fal-ai/nano-banana/edit` (default, about $0.04 per image, keeps faces well)
   - `fal-ai/nano-banana-2/edit` (about $0.08, best likeness and detail)
   - `fal-ai/flux-pro/kontext` (the previous model, about $0.04)
4. Deploy, then make a QR code for your `.vercel.app` address.

## What changed in this version
- Default model is Nano Banana edit instead of FLUX Kontext Pro, for better face likeness.
- Prompts put the face first and treat the character as a costume, so the model keeps the person.
- Costumes are described with Indian iconography (kirita crown, bare chest with sacred thread,
  dhoti, uttariya, keyura armlets, kundala earrings) and Persian/European elements are ruled out.
- Ravan has ten heads and is made in landscape (4:3); Lakshmana has long hair; Hanuman's gada
  is described exactly; Indrajit has far more ornament.
- Prompts are built on the server; the page only sends the character and style, so the key
  cannot be used to generate other images.
