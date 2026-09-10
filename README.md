# Northline — US trucking website concepts

Nine responsive, English-language concepts made with plain HTML, CSS and JavaScript. No build process or framework.

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

The top design switcher works in both file and HTTP modes. `freight-journal.html`, `dispatch.html` and `long-haul.html` are pre-rendered copies of designs 4, 5 and 6 for sharing a single concept on its own; they read their design from `data-theme` on `<body>`. They are static snapshots — edits to `index.html` or `concepts.js` do not reach them, so regenerate or delete them once a direction is chosen.

Every concept includes mobile navigation, service detail dialogs, selectable sample freight lanes, FAQ accordions, and a validated quote form with a downloadable text request. Design 5 and design 8 add a hero quick-quote that carries its values into the full form; design 6 adds a tabbed service panel; design 7 turns sample lanes into a board where a row prefills the request. Any element with `data-quote` can prefill the form through `data-quote-service`, `data-quote-origin` and `data-quote-destination`. Native dialogs support Escape and focus trapping. Reduced motion and visible keyboard focus are supported.

`previews/` holds full-page screenshots of each design at 1440px and 390px wide.

## Before launch

Northline is a placeholder brand. Confirm the company name, approved service copy, operating coverage, real contact details, and any required company identifiers. Routes are illustrative; no fleet size, safety credentials, customer endorsements, or delivery metrics are invented.

The form runs locally. It does not submit, book freight, or provide prices. Connect an actual form endpoint or CRM and add appropriate privacy information before enabling submission. This prototype does not store contact data in localStorage or send it to a server. Remove the concept bar and select the final design before launch.

## Assets and references

- Truck image: https://www.pexels.com/photo/trucks-on-the-road-2199293/ (local file `assets/american-truck.jpg`). Review stock licensing for final publication.
- Fonts: DM Sans, Manrope, Barlow Condensed, IBM Plex Mono, Plus Jakarta Sans and Space Grotesk via Google Fonts, with system fallbacks. All core functionality and photography work without a font connection.
- Content structure references: https://www.jbhunt.com/shippers/truckload and https://schneider.com/freight-shipping-solutions/dedicated . Original visual designs; no affiliation.

Files: `index.html` (semantic markup), `styles.css` (shared and concept 1–3 styles), `concepts.css` / `concepts.js` (concepts 4–6), `concepts-b.css` / `concepts-b.js` (concepts 7–9), `app.js` (interactions), `assets/`, `previews/`.
