'use strict';

// Build different page compositions before the shared interactions are attached.
(() => {
  const variant = new URLSearchParams(location.search).get('design');
  if (!['4', '5', '6'].includes(variant)) return;
  const main = document.querySelector('main');
  const hero = document.querySelector('.hero');
  const servicesSection = document.querySelector('#services');
  const coverage = document.querySelector('#coverage');
  const about = document.querySelector('#about');
  const faq = document.querySelector('#faq');
  const cta = document.querySelector('.cta');
  document.querySelector('.capability-strip').remove();
  const make = html => {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  };
  const process = make(`<section class="shipment-process wrap"><p class="eyebrow">A CLEAR ROAD FROM A TO B</p><h2>Three steps. One moving business.</h2><div class="process-steps"><article><span>01 / PLAN</span><h3>Tell us what’s moving.</h3><p>Start with your freight, your lane, and your schedule.</p></article><article><span>02 / CONFIRM</span><h3>Get the details right.</h3><p>Review equipment, pricing, and the pickup window before booking.</p></article><article><span>03 / MOVE</span><h3>Keep moving forward.</h3><p>A clear point of contact from pickup through delivery.</p></article></div></section>`);

  if (variant === '4') {
    hero.replaceWith(make(`<section class="journal-hero wrap" aria-labelledby="hero-title"><div class="journal-edition"><span>THE NORTHLINE JOURNAL</span><span>U.S. ROAD FREIGHT / VOL. 01</span><span>BUILT TO GO FURTHER ↗</span></div><h1 id="hero-title">MOVING<br><span>AMERICA.</span></h1><div class="journal-intro"><span class="journal-cross" aria-hidden="true">✳</span><p>The goods that fill our shelves.<br>The parts that build our cities.<br><strong>We’re here to move them.</strong></p><button class="round-link" data-quote aria-label="Start a shipment">LET’S TALK<br>FREIGHT <span>↗</span></button></div><figure class="journal-photo"><img src="assets/american-truck.jpg" alt="American semi-trucks on a sunlit highway" width="2200" height="1469" fetchpriority="high"><figcaption><span>01 — OUT HERE, EVERY MILE MATTERS.</span><span>THE NORTHLINE WAY ↓</span></figcaption></figure></section>`));
    servicesSection.querySelector('.section-heading').innerHTML = '<div><p class="eyebrow">THE WORK / 01</p><h2>Good freight.<br>In good hands.</h2></div><p>Different loads. Same commitment.<br>Find your way forward.</p>';
    servicesSection.querySelectorAll('.service-card').forEach((card, i) => {
      card.insertAdjacentHTML('afterbegin', `<div class="journal-number" aria-hidden="true">0${i + 1}</div>`);
    });
    const statement = make(`<section class="journal-statement wrap"><p class="eyebrow">THE BELIEF / 02</p><p class="statement-type">A load is never<br><em>just a load.</em></p><div><span>IT’S SOMEONE’S BUSINESS.</span><p>A promise to a customer. A production line waiting. A next chapter. We see what’s behind the freight — and bring that care to the road.</p><a class="text-link" href="#about">Meet the Northline approach ↗</a></div></section>`);
    main.insertBefore(statement, coverage);
    main.insertBefore(process, faq);
    cta.querySelector('h2').innerHTML = 'YOUR FREIGHT.<br>OUR NEXT CHAPTER.';
  }

  if (variant === '5') {
    hero.replaceWith(make(`<section class="dispatch-hero wrap" aria-labelledby="hero-title"><div class="dispatch-title"><p class="eyebrow"><span class="live-dot"></span> A SIMPLER WAY TO SHIP</p><h1 id="hero-title">Big moves.<br><em>Less busywork.</em></h1><p>Truckload, LTL, and dedicated transportation.<br>One place to get your next shipment started.</p></div><div class="dispatch-board"><form id="quick-quote" class="quick-quote"><div class="panel-heading"><span>LET’S PLAN YOUR SHIPMENT</span><span>01 / 02</span></div><h2>Where are we headed?</h2><div class="quick-route"><span class="route-spine" aria-hidden="true">○<i></i>●</span><div><label>Pickup ZIP code<input name="quickOrigin" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" placeholder="e.g. 90001" required title="Enter a 5-digit US ZIP code"></label><label>Delivery ZIP code<input name="quickDestination" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" placeholder="e.g. 60601" required title="Enter a 5-digit US ZIP code"></label></div></div><label>What kind of shipment?<select name="quickService"><option value="ftl">Full truckload</option><option value="ltl">Less-than-truckload</option><option value="dedicated">Dedicated freight</option></select></label><button class="button" type="submit">Continue to shipment details <span>→</span></button><p class="fine-print">No booking commitment. We’ll start with the details.</p></form><div class="dispatch-mosaic"><div class="dispatch-photo"><img src="assets/american-truck.jpg" alt="A fleet of American trucks on the highway" width="2200" height="1469" fetchpriority="high"><span>YOUR BUSINESS.<br>IN FORWARD MOTION. ↗</span></div><div class="dispatch-note"><span data-icon="route"></span><h3>Your lane.<br>Your schedule.</h3><a href="#coverage">Explore sample routes ↗</a></div><div class="dispatch-note light"><span data-icon="truck"></span><h3>Real freight.<br>Real people.</h3><a href="#about">How we work ↗</a></div></div></div><div class="dispatch-bottom"><span>BUILT FOR YOUR SHIPPING DAY</span><span>✓ Clear requirements</span><span>✓ Flexible service options</span><span>✓ A human point of contact</span></div></section>`));
    main.insertBefore(coverage, servicesSection);
    main.insertBefore(process, servicesSection);
    servicesSection.querySelector('.section-heading').innerHTML = '<div><p class="eyebrow">PICK YOUR SERVICE</p><h2>A fit for every shipping day.</h2></div><p>Start with the size of your shipment.<br>We’ll take it from there.</p>';
    cta.querySelector('h2').innerHTML = 'Your next shipment.<br>Let’s get it sorted.';
  }

  if (variant === '6') {
    document.querySelector('header').insertAdjacentHTML('beforeend', '<span class="rail-caption">AMERICAN ROADS. NORTHLINE.</span>');
    hero.replaceWith(make(`<section class="haul-hero" aria-labelledby="hero-title"><img class="haul-background" src="assets/american-truck.jpg" alt="American semi-trucks heading down the open road" width="2200" height="1469" fetchpriority="high"><div class="haul-top"><span>ROAD FREIGHT, WITH PURPOSE.</span><span>U.S.A. / NORTHLINE</span></div><div class="haul-title"><p class="eyebrow">FOR THE PEOPLE WHO KEEP AMERICA MOVING</p><h1 id="hero-title">THE ROAD<br><em>IS OURS.</em></h1><div><p>You build the business.<br>We’ll take it down the road.</p><button class="button" data-quote>Move with Northline <span>↗</span></button></div></div><div class="haul-bottom"><a href="#services"><span>01 / EXPLORE THE CAPABILITIES</span><span class="haul-down">↓</span></a><p>THE DESTINATION MATTERS.<br>SO DOES WHO GETS YOU THERE.</p></div></section>`));
    servicesSection.innerHTML = `<div class="haul-service-heading"><p class="eyebrow">THE CAPABILITIES</p><h2>CHOOSE YOUR<br><em>WAY FORWARD.</em></h2></div><div class="haul-service-controls" role="group" aria-label="Choose a freight service"><button data-capability="ftl" aria-pressed="true"><span>01</span> FULL TRUCKLOAD <span>↗</span></button><button data-capability="ltl" aria-pressed="false"><span>02</span> LESS-THAN-TRUCKLOAD <span>↗</span></button><button data-capability="dedicated" aria-pressed="false"><span>03</span> DEDICATED FREIGHT <span>↗</span></button></div><article class="haul-service-feature" aria-live="polite"><div class="haul-equipment" aria-hidden="true"><svg viewBox="0 0 600 240"><path d="M26 55h350v123H26zM388 93h60l62 52v33H388zM409 105h32l38 34h-70z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M40 69h321M40 81h321M40 93h321M40 105h321M40 117h321M40 129h321M40 141h321M40 153h321M16 184h521" stroke="currentColor" opacity=".35"/><g fill="#081f33" stroke="currentColor" stroke-width="3"><circle cx="89" cy="182" r="21"/><circle cx="145" cy="182" r="21"/><circle cx="411" cy="182" r="21"/><circle cx="478" cy="182" r="21"/></g><path d="M25 225h490m-490-5v10m490-10v10" stroke="currentColor" opacity=".4"/></svg><span id="equipment-caption">01 / DRY VAN TRANSPORTATION</span></div><div><p class="eyebrow" id="capability-kicker">THE WHOLE TRAILER. YOUR FREIGHT.</p><h3 id="capability-title">Room for the big moves.</h3><p id="capability-description">A truck dedicated to your shipment. Direct transportation for larger loads, from dock to destination.</p><button class="button" id="capability-quote" data-quote>Plan your truckload <span>↗</span></button></div></article>`;
    main.insertBefore(about, coverage);
    main.insertBefore(process, faq);
    cta.querySelector('h2').innerHTML = 'THE NEXT MILE.<br>LET’S OWN IT.';
  }
})();
