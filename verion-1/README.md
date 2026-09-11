# FOOR Logistics — Nine original website designs

Nine responsive, English-language concepts made with plain HTML, CSS and JavaScript. No build process or framework. All nine use the supplied FOOR Logistics logo, photography, and complete company copy, while retaining their original design direction.

## View

Open `index.html` directly, or run `python3 -m http.server 8080` from this folder and visit:

- http://localhost:8080/?design=1 — **Blue Horizon:** light corporate layout, split hero, cobalt accents.
- http://localhost:8080/?design=2 — **Night Shift:** dark navy, immersive photography, shipment planning card.
- http://localhost:8080/?design=3 — **Open Road:** editorial heading, wide photography, horizontal service rows.
- http://localhost:8080/?design=4 — **Freight Journal:** newsprint scale, condensed type, off-white paper stock.
- http://localhost:8080/?design=5 — **Dispatch:** product-style panels, a quote form in the hero, rounded cards.
- http://localhost:8080/?design=6 — **Long Haul:** dark full-bleed hero, fixed left rail, tabbed service panel.
- http://localhost:8080/?design=7 — **Terminal:** monospaced freight board, hard rules, dark utility palette, no hero photography.
- http://localhost:8080/?design=8 — **Aurora:** gradient light, frosted glass panels, centred hero with an inline quote bar.
- http://localhost:8080/?design=9 — **Blueprint:** graph-paper ground, dimensioned line drawings in place of photography.

The top design switcher works in both file and HTTP modes. `freight-journal.html`, `dispatch.html`, and `long-haul.html` retain their standalone layouts for designs 4, 5, and 6. Their switcher links open the corresponding design in `index.html`.

`foor-content.js` applies the same approved copy and logo after each original composition is built, before `app.js` attaches interactions. It is also loaded by the standalone pages, so their branding and copy stay synchronized. `foor-content.css` provides only logo sizing, long-copy layout adjustments, and styles for the additional content using each theme’s existing colors and typography. Keep these two files with the other site files.

All supplied paragraphs are retained: Who we are; Truckload services; LTL services; Drayage/Intermodal; Heavy Haul & Specialized; Why choose us; and Empowered by AI. The full service descriptions also appear in service dialogs and the Long Haul tabs. The supplied accidental whitespace in “source” was corrected. No copy was summarized.

Every concept includes mobile navigation, service detail dialogs, selectable sample freight lanes, FAQ accordions, and a validated quote form with a downloadable text request. Design 5 and design 8 add a hero quick-quote that carries its values into the full form; design 6 adds a tabbed service panel; design 7 turns sample lanes into a board where a row prefills the request. Any element with `data-quote` can prefill the form through `data-quote-service`, `data-quote-origin` and `data-quote-destination`. Native dialogs support Escape and focus trapping. Reduced motion and visible keyboard focus are supported.

`previews/` holds full-page screenshots of each design at 1440px and 390px wide.

## Before launch

FOOR Logistics copy is supplied by the project owner. Freight lanes remain explicitly illustrative. The existing design switcher, FAQs, lane selector, and form behavior are retained.

The form runs locally. It does not submit, book freight, or provide prices. Connect an actual form endpoint or CRM and add appropriate privacy information before enabling submission. This prototype does not store contact data in localStorage or send it to a server. Remove the concept bar and select the final design before launch.

## Assets and references

- Current visuals: `assets/hero.jpg`, `assets/operations.jpg`, `assets/network.svg`, and `assets/favicon.svg`, copied from `version-1/assets/`. The logo uses the same SVG mark and FOOR Logistics wordmark as the newer versions. Photo generation prompts are documented in `../output/site-previews/asset-prompts.md`.
- The previous stock truck asset is retained as an unused original file.
- Fonts: DM Sans, Manrope, Barlow Condensed, IBM Plex Mono, Plus Jakarta Sans and Space Grotesk via Google Fonts, with system fallbacks. All core functionality and photography work without a font connection.
- Content structure references: https://www.jbhunt.com/shippers/truckload and https://schneider.com/freight-shipping-solutions/dedicated . Original visual designs; no affiliation.

Files: `index.html` (semantic markup), `styles.css` (shared and concept 1–3 styles), `concepts.css` / `concepts.js` (concepts 4–6), `concepts-b.css` / `concepts-b.js` (concepts 7–9), `app.js` (interactions), `assets/`, `previews/`.

FOOR adaptation verification: all 9 query-string designs and all 3 standalone pages checked in Chrome at 1440 px and 390 px. Checks cover complete copy, images, navigation anchors, no horizontal overflow, mobile menus, service dialogs, Long Haul tabs, quick-quote prefilling, quote validation, and the downloaded FOOR request. Updated captures and `foor-checks.json` are in `previews/`.
