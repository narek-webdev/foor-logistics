# FOOR Logistics

The FOOR Logistics website: plain HTML, CSS, and JavaScript with no build step,
no dependencies to install, and no server required.

Open [`index.html`](index.html) directly in a browser, or run
`python3 -m http.server 8080` from this folder and visit http://localhost:8080/.

## Files

- [`index.html`](index.html) — the full single-page site.
- [`styles.css`](styles.css) — all styles.
- [`app.js`](app.js) — navigation, the quote dialog, and scroll animations.
- [`assets/`](assets/) — photography, SVG route map and icons, logo, and the
  bundled `libphonenumber` used for phone validation.

## Notes

The page includes mobile navigation, section links, accessible form labels,
browser validation, keyboard focus states, and reduced-motion support. Truck and
warehouse photos are generated images; the US route map, logo, and service icons
are editable SVG.

The quote dialog collects a name, phone number, email, and free-form quote info,
then prepares a local `.txt` download. It does not submit anything to a server or
store personal information — connect a backend before enabling real submissions.
Phone numbers are validated as U.S. numbers.

Copy is ordered as Our Principle, Who we are, Truckload services, LTL services,
Drayage/Intermodal, Why choose us, and Empowered by AI, followed by the quote
form.
