# Logistics

The original website designs, now adapted to FOOR Logistics branding and complete copy, are in [`verion-1/`](verion-1/).

Open [`verion-1/index.html`](verion-1/index.html), or run `python3 -m http.server 8080` from this folder and visit http://localhost:8080/verion-1/.

See [`verion-1/README.md`](verion-1/README.md) for the original design documentation.

## New implementations based on `output/design-concepts`

Open [`index.html`](index.html) directly in a browser to choose a version. No installation, build step, internet connection, or server is required.

- [`version-1/index.html`](version-1/index.html) — Clear & Confident: white and pale blue, editorial sections, a photographic hero.
- [`version-2/index.html`](version-2/index.html) — Bold & Reliable: cinematic navy hero, numbered service grid, full-width company story.
- [`version-3/index.html`](version-3/index.html) — Connected & Smart: SVG route map, modular service cards, interactive illustrative portal.

Each version contains its own `index.html`, `styles.css`, `app.js`, and `assets/` directory. Each folder works independently. The sites use the full viewport width without concept labels or gallery links in their headers. Subtle entrance, scroll, and hover animations respect reduced-motion preferences. The original-design collection in `verion-1/` remains separate and now uses the same FOOR branding and complete copy.

All versions include mobile navigation, section links, service-specific quote prefilling, accessible form labels, browser validation, keyboard focus states, and reduced-motion support. The quote form downloads a local `.txt` request; it does not submit anything to a server or store personal information. Connect a backend before enabling real submissions. The portal in version 3 is explicitly illustrative, with working Shipments, Tracking, and Documents preview buttons.

Visuals are adaptations of the reference compositions, not pixel-perfect reproductions. Truck and warehouse photos were created with the built-in image generation tool. The US route map, logo approximation, and service icons are editable SVG. Asset prompts and provenance are in [`output/site-previews/asset-prompts.md`](output/site-previews/asset-prompts.md).

Chrome verification covered all three versions at 1440, 390, and 320 px widths, image loading, absence of horizontal overflow and runtime errors, mobile menus, service quote links, required fields, invalid email rejection, quote file content, and portal previews. Desktop/mobile captures and the recorded checks are in [`output/site-previews/`](output/site-previews/).

The three current versions include the complete supplied Website info copy, ordered as Our Principle, Who we are, Truckload services, LTL services, Drayage/Intermodal, Why choose us, and Empowered by AI, followed by the quote form. No supplied paragraphs are shortened. Equipment text is under Truckload, LTL carrier text under LTL, machinery text under the Heavy Haul & Specialized subsection of Truckload services, and port text under Drayage & Intermodal. The accidental spacing inside “source” was corrected. The complete text is also recorded in `output/site-previews/website-copy.json`.
