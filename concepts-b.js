'use strict';

// Compositions for the second round of concepts (07–09), built before the shared interactions attach.
(() => {
  const variant = new URLSearchParams(location.search).get('design');
  if (!['7', '8', '9'].includes(variant)) return;
  const main = document.querySelector('main');
  const hero = document.querySelector('.hero');
  const servicesSection = document.querySelector('#services');
  const coverage = document.querySelector('#coverage');
  const about = document.querySelector('#about');
  const faq = document.querySelector('#faq');
  const cta = document.querySelector('.cta');
  const strip = document.querySelector('.capability-strip');
  const make = html => {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  };
  const process = () => make(`<section class="shipment-process wrap"><p class="eyebrow">A CLEAR ROAD FROM A TO B</p><h2>Three steps. One moving business.</h2><div class="process-steps"><article><span>01 / PLAN</span><h3>Tell us what’s moving.</h3><p>Start with your freight, your lane, and your schedule.</p></article><article><span>02 / CONFIRM</span><h3>Get the details right.</h3><p>Review equipment, pricing, and the pickup window before booking.</p></article><article><span>03 / MOVE</span><h3>Keep moving forward.</h3><p>A clear point of contact from pickup through delivery.</p></article></div></section>`);

  if (variant === '7') {
    const board = [
      ['Los Angeles, CA', 'Chicago, IL', '90001', '60601', 'DRY VAN', 'TRUCKLOAD', 'ftl'],
      ['Dallas, TX', 'Atlanta, GA', '75201', '30301', 'PALLETIZED', 'LTL', 'ltl'],
      ['Chicago, IL', 'Newark, NJ', '60601', '07101', 'DRY VAN', 'TRUCKLOAD', 'ftl'],
      ['Seattle, WA', 'Denver, CO', '98101', '80201', 'RECURRING LANE', 'DEDICATED', 'dedicated'],
      ['Memphis, TN', 'Columbus, OH', '38101', '43201', 'PALLETIZED', 'LTL', 'ltl']
    ];
    const rows = board.map(([from, to, zipFrom, zipTo, equipment, service, key]) => `<button class="board-row" data-quote data-quote-service="${key}" data-quote-origin="${zipFrom}" data-quote-destination="${zipTo}" aria-label="Request a quote for ${from} to ${to}"><b>${from} <i>→</i> ${to}</b><span>${equipment}</span><span class="service-flag">${service}</span><span aria-hidden="true">→</span></button>`).join('');
    hero.replaceWith(make(`<section class="terminal-hero wrap" aria-labelledby="hero-title"><div class="terminal-status"><span><span class="live-dot"></span> REQUEST DESK OPEN</span><span>TRUCKLOAD / LTL / DEDICATED</span><span id="terminal-clock">--:--:--</span></div><h1 id="hero-title">FREIGHT<br><em>TERMINAL.</em></h1><div class="terminal-lead"><p>Truckload, less-than-truckload, and dedicated capacity across the contiguous United States. Pick a lane below, or open a request with your own origin and destination.</p><button class="button" data-quote>Open a request <span>→</span></button></div><div class="terminal-board"><div class="board-head"><span>LANE</span><span>EQUIPMENT</span><span>SERVICE</span><span></span></div>${rows}<div class="board-foot"><span>ILLUSTRATIVE LANES · AVAILABILITY CONFIRMED WITH EACH QUOTE</span><span>SELECT A ROW TO PREFILL A REQUEST</span></div></div></section>`));
    servicesSection.querySelector('.section-heading').innerHTML = '<div><p class="eyebrow">01 / SERVICE INDEX</p><h2>What we move.</h2></div><p>Three ways to put your freight on the road.<br>Pick the one that fits the load.</p>';
    main.insertBefore(process(), faq);
    cta.querySelector('h2').innerHTML = 'Open a request.<br>Let’s move it.';

    const clock = document.querySelector('#terminal-clock');
    const tick = () => { clock.textContent = new Date().toLocaleTimeString('en-US', { hour12: false }); };
    tick();
    setInterval(tick, 1000);
  }

  if (variant === '8') {
    hero.replaceWith(make(`<section class="aurora-hero" aria-labelledby="hero-title"><div class="aurora-glow" aria-hidden="true"><span></span><span></span><span></span></div><div class="wrap"><p class="aurora-pill"><span class="live-dot"></span> Road freight across the contiguous United States</p><h1 id="hero-title">Shipping that feels <em>effortless.</em></h1><p class="aurora-sub">Truckload, LTL, and dedicated freight — planned by people who pick up the phone, quoted without the runaround.</p><div class="aurora-actions"><button class="button" data-quote>Get a freight quote <span>↗</span></button><a class="text-link" href="#services">See how it works <span>↓</span></a></div><form id="quick-quote" class="aurora-quote"><label>Pickup ZIP<input name="quickOrigin" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" placeholder="90001" required title="Enter a 5-digit US ZIP code"></label><label>Delivery ZIP<input name="quickDestination" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" placeholder="60601" required title="Enter a 5-digit US ZIP code"></label><label>Service<select name="quickService"><option value="ftl">Full truckload</option><option value="ltl">Less-than-truckload</option><option value="dedicated">Dedicated freight</option></select></label><button class="button" type="submit">Continue <span>→</span></button></form><div class="aurora-trust"><span>No booking commitment</span><span>A human point of contact</span><span>Equipment confirmed before pickup</span></div></div></section>`));
    servicesSection.querySelector('.section-heading').innerHTML = '<div><p class="eyebrow">WHAT WE MOVE</p><h2>Pick the service<br>that fits the load.</h2></div><p>One shipment or a regular lane — start with the size of your freight and we’ll take it from there.</p>';
    main.insertBefore(process(), coverage);
    cta.querySelector('h2').innerHTML = 'Ready when<br>your freight is.';

    // The glow is decorative; hold it still when the viewer asks for less motion.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const glow = document.querySelector('.aurora-glow');
      addEventListener('scroll', () => { glow.style.transform = `translateY(${scrollY * 0.14}px)`; }, { passive: true });
    }
  }

  if (variant === '9') {
    hero.replaceWith(make(`<section class="blueprint-hero wrap" aria-labelledby="hero-title"><div class="bp-meta"><span>DRAWING No. NL-001</span><span>SUBJECT: ROAD FREIGHT</span><span>REV. A</span><span>SHEET 1 OF 1</span></div><div class="bp-head"><h1 id="hero-title">Freight,<br>planned like <em>engineering.</em></h1><div class="bp-lead"><p>Every shipment starts as a specification: the freight, the equipment, the lane, the schedule. Get those right and the road takes care of itself.</p><button class="button" data-quote>Start a specification <span>→</span></button></div></div><figure class="bp-drawing"><svg viewBox="0 0 720 302" role="img" aria-label="Technical side elevation of a tractor-trailer with dimension callouts"><defs><marker id="bp-tip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--blue)"/></marker><marker id="bp-tip-start" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="var(--blue)"/></marker></defs><g class="bp-thin"><path d="M20 236h680"/></g><g class="bp-line"><path d="M44 74h396v128H44z"/><path d="M448 202v-58h34l30-38h58a16 16 0 0 1 16 16v80z"/><path d="M492 148h58v-30h-34z"/><path d="M586 168h28"/></g><g class="bp-thin"><path d="M44 96h396M44 180h396M60 74v128M140 74v128M220 74v128M300 74v128M380 74v128"/></g><g class="bp-line"><circle cx="330" cy="214" r="22"/><circle cx="386" cy="214" r="22"/><circle cx="474" cy="214" r="22"/><circle cx="608" cy="214" r="22"/></g><g class="bp-thin"><circle cx="330" cy="214" r="8"/><circle cx="386" cy="214" r="8"/><circle cx="474" cy="214" r="8"/><circle cx="608" cy="214" r="8"/></g><g class="bp-thin bp-leaders"><path d="M180 74V44h120M470 118V56h96"/></g><g class="bp-thin"><path d="M358 240v16H262"/></g><g class="bp-dim"><path d="M44 286h592" marker-start="url(#bp-tip-start)" marker-end="url(#bp-tip)"/><path d="M44 278v16M636 278v16M24 74v128" marker-start="url(#bp-tip-start)" marker-end="url(#bp-tip)"/><path d="M16 74h16M16 202h16"/></g><text x="306" y="41" class="bp-key">DRY VAN — ENCLOSED TRAILER</text><text x="572" y="53" class="bp-key">TRACTOR UNIT</text><text x="256" y="259" text-anchor="end">TANDEM AXLE</text><text x="340" y="279" text-anchor="middle">OVERALL LENGTH</text><text x="14" y="66">TRAILER HEIGHT</text></svg><figcaption class="bp-caption"><span>FIG. 01 — STANDARD ENCLOSED TRAILER, SIDE ELEVATION</span><span>NOT TO SCALE</span></figcaption></figure></section>`));
    servicesSection.querySelector('.section-heading').innerHTML = '<div><p class="eyebrow">SECTION 01 / SPECIFICATIONS</p><h2>Three ways to<br>move a load.</h2></div><p>Each service is a different set of requirements.<br>Start with the one that matches your freight.</p>';
    about.querySelector('.about-image').replaceWith(make(`<div class="bp-panel"><svg viewBox="0 0 420 250" role="img" aria-label="Diagram of a shipment moving from pickup through transit to delivery"><g class="bp-thin"><path d="M20 210h380"/></g><g class="bp-line"><path d="M40 210v-58h76v58z"/><path d="M304 210v-58h76v58z"/></g><g class="bp-thin"><path d="M40 168h76M304 168h76M66 210v-22h24v22M330 210v-22h24v22"/></g><g class="bp-line"><path d="M152 194v-40h58v40z"/><path d="M210 194v-26h18l14 14v12z"/><circle cx="174" cy="200" r="9"/><circle cx="228" cy="200" r="9"/></g><g class="bp-dim"><path d="M122 178h22" marker-end="url(#bp-tip)"/><path d="M250 178h48" marker-end="url(#bp-tip)"/></g><g class="bp-thin"><path d="M78 132v-18h264v18"/></g><text x="210" y="106" text-anchor="middle" class="bp-key">ONE POINT OF CONTACT, END TO END</text><text x="40" y="234">01 — PICKUP</text><text x="152" y="234">02 — IN TRANSIT</text><text x="304" y="234">03 — DELIVERY</text></svg><div class="bp-caption"><span>FIG. 02 — SHIPMENT PATH</span><span>SCHEMATIC</span></div></div>`));
    main.insertBefore(process(), faq);
    cta.querySelector('h2').innerHTML = 'Send the specification.<br>We’ll take it from there.';
  }

  if (strip && variant === '9') strip.querySelector('span').innerHTML = 'GENERAL ARRANGEMENT<br><strong>ROAD FREIGHT, U.S.</strong>';
})();
