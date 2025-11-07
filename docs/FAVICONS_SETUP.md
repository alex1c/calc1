# SEO Optimization - Favicons Setup

## Required Favicon Files

Create the following favicon files in the `public/` directory:

1. **favicon.ico** (32x32) - Main favicon
2. **favicon-16x16.png** (16x16) - Small favicon
3. **favicon-32x32.png** (32x32) - Standard favicon
4. **apple-touch-icon.png** (180x180) - Apple touch icon
5. **android-chrome-192x192.png** (192x192) - Android Chrome icon
6. **android-chrome-512x512.png** (512x512) - Android Chrome icon (large)

## How to Generate Favicons

You can use online tools to generate favicons:
- https://realfavicongenerator.net/
- https://favicon.io/
- https://www.favicon-generator.org/

## Steps:

1. Create a logo/icon image (at least 512x512px)
2. Upload it to one of the favicon generators above
3. Download the generated favicon package
4. Place all files in the `public/` directory
5. Ensure the filenames match exactly as listed above

## Verification

After adding favicons, verify they work by:
1. Running `npm run dev`
2. Checking browser tab for favicon
3. Checking `/manifest.json` loads correctly
4. Testing on mobile devices for PWA icons

