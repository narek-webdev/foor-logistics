'use strict';
// Shared approved copy, applied after each original concept composes its layout.
window.FOOR_CONTENT = {
  "about": [
    "Foor Logistics is four friends who started on the dispatch side ten years ago and grew into freight brokers. We still work the same way we did then: as one desk. Everyone owns their piece of the job, nobody hands off a problem and hopes it disappears, and whoever you reach gives you the same answer.",
    "Ten years in this business teaches you that capacity is easy to find and reliability is not. That's the part we're built around."
  ],
  "services": [
    [
      "Truckload",
      "Dry van, box truck, sprinter van, flatbed, step deck, hotshot, and Conestoga. One skid or a full 53', we source the equipment that fits your load instead of forcing your load onto the equipment we happen to have."
    ],
    [
      "LTL",
      "We hold contracts with every major LTL carrier and quote at Tier 1 pricing. LTL is also where most shipments go sideways: reclasses, reweighs, missed pickups, damage. So we do more than tender and wait. We chase pickups until they happen, catch problems before they show up on your invoice, and when a claim comes up we file it and push it. Our side of the table is your side."
    ],
    [
      "Heavy Haul & Specialized",
      "Machinery, construction equipment, oversized and overweight freight. Multi-axle RGNs, lowboys, and step decks, with routing and permits handled before the truck rolls. Pole cars, escorts, and route surveys when the load requires them. We know how this freight has to be secured and which drivers can actually secure it. Additional insurance when the value calls for it, no argument."
    ],
    [
      "Drayage & Intermodal",
      "Port-to-door service at all major US ports, intermodal rail for the long haul, and warehousing when product needs to sit somewhere in between. Container, chassis, appointment, paperwork: ours to manage, not yours."
    ]
  ],
  "intro": "We operate as an independent agency of Margin Freight, which puts one of the strongest tech stacks in brokerage behind every load we move.",
  "features": [
    [
      "Customer portal.",
      "Your quotes, active shipments, documents, and invoices in one place, whenever you want to look."
    ],
    [
      "Faster sourcing.",
      "Our AI tools help us check thousands of carrier options down to the right few in minutes rather than an afternoon of phone calls. The choice is still always made by us."
    ],
    [
      "Live tracking.",
      "Continuous monitoring with ETAs recalculated in real time against every pickup and delivery."
    ]
  ],
  "why": [
    "Because we genuinely like this work. We like moving trucks, and we've spent ten years building the carrier network that makes it possible.",
    "What we're really selling is a quiet inbox. Hand us a shipment and you should be able to stop thinking about it. And if something does go wrong on the road, you'll hear it from us first, with the fix already in motion."
  ]
};
const FOOR_LOGO = "<svg viewBox=\"0 0 540 330\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M75 50 L122 64 171 70 205 74 247 75 280 70 297 90 315 87 329 102 342 98 356 114 374 106 387 89 409 93 421 78 439 80 454 52 467 57 464 84 476 96 463 109 450 119 436 144 426 160 407 175 399 195 380 212 380 229 393 252 395 272 384 280 372 259 360 239 333 238 308 233 286 246 273 242 267 258 256 254 237 223 223 214 199 216 182 206 160 206 148 194 127 190 115 179 111 160 97 150 91 127 81 113 79 91 68 78 Z\"/><g fill=\"none\" stroke=\"white\" stroke-width=\"12\" stroke-linejoin=\"round\"><path d=\"M160 187v-53h64v53h128v-36h34l19 24v12h-14M226 187h-15m-43 0h-18\"/><circle cx=\"190\" cy=\"189\" r=\"14\"/><circle cx=\"367\" cy=\"189\" r=\"14\"/></g></svg><span><b>FOOR</b><small>LOGISTICS</small></span>";
(() => {
  const copy = window.FOOR_CONTENT;
  const variant = new URLSearchParams(location.search).get('design') || document.body.dataset.theme || '1';
  document.body.classList.add('foor-site');
  const make = html => { const template = document.createElement('template'); template.innerHTML = html; return template.content.firstElementChild; };
  const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const paragraphs = lines => lines.map(line => `<p>${escape(line)}</p>`).join('');
  document.querySelectorAll('.logo').forEach(logo => { logo.innerHTML = FOOR_LOGO; logo.setAttribute('aria-label','FOOR Logistics home'); });
  document.querySelectorAll('[data-design]').forEach(link => { link.href = `index.html?design=${link.dataset.design}`; });
  const title = document.querySelector('#hero-title');
  title.innerHTML = ['4', '7'].includes(variant) ? 'WE NEVER <br>CANCEL <br><span><em>THE FREIGHT</em></span>' : 'WE NEVER <br>CANCEL <br><em>THE FREIGHT</em>';
  const hero = title.closest('section');
  hero.classList.add('foor-hero');
  const eyebrow = hero.querySelector('.eyebrow, .aurora-pill');
  if (eyebrow) eyebrow.textContent = 'Our Principle';
  hero.querySelectorAll('img').forEach(image => { image.src='assets/hero.jpg'; image.alt='Blue FOOR Logistics semi-truck on a mountain highway'; image.width=1536; image.height=1024; });
  // Keep each original hero composition; replace its old service summary.
  const lead = hero.querySelector('.hero-description, .dispatch-title > p:last-child, .terminal-lead > p, .aurora-sub, .bp-lead > p, .haul-title > div > p, .journal-intro > p');
  if (lead) lead.textContent = 'Truckload services · LTL services · Drayage/Intermodal';
  const about = document.querySelector('#about');
  const aboutCopy = about.lastElementChild;
  aboutCopy.classList.add('foor-about-copy');
  aboutCopy.innerHTML = `<p class="eyebrow">Who we are</p><h2>Four friends.<br>Ten years. One desk.</h2>${paragraphs(copy.about)}`;
  const aboutPhoto = about.querySelector('.about-image img');
  if (aboutPhoto) { aboutPhoto.src='assets/operations.jpg'; aboutPhoto.alt='Logistics operator reviewing a tablet at a freight warehouse'; aboutPhoto.width=1774;aboutPhoto.height=887; }
  else about.querySelector('.bp-panel')?.insertAdjacentHTML('afterbegin','<img class="foor-operations" src="assets/operations.jpg" alt="Logistics operator at a freight warehouse" loading="lazy">');
  const servicesSection = document.querySelector('#services');
  const names = ['Truckload services','LTL services','Drayage/Intermodal'];
  const keys = ['ftl','ltl','drayage'];
  const indexes = [0,1,3];
  servicesSection.querySelectorAll('.service-card').forEach((card,i) => {
    card.id = ['truckload','ltl','drayage'][i];
    card.setAttribute('aria-labelledby',`${card.id}-title`);
    card.querySelector('h3').id = `${card.id}-title`;
    card.querySelector('h3').textContent = names[i];
    card.querySelector('p').textContent = copy.services[indexes[i]][1];
    const tags = card.querySelector('.tags');
    if (tags) tags.innerHTML = (i===0?['DRY VAN','FLATBED','CONESTOGA']:i===1?['TIER 1 PRICING','PICKUP SUPPORT']:['PORT-TO-DOOR','RAIL','WAREHOUSING']).map(t=>`<span>${t}</span>`).join('');
    const button = card.querySelector('[data-service]');
    button.dataset.service=keys[i];button.innerHTML='Service details <span>↗</span>';
  });
  servicesSection.insertAdjacentHTML('beforeend',`<div class="foor-specialized"><p class="eyebrow">Truckload services</p><h3>Heavy Haul &amp; Specialized</h3>${paragraphs([copy.services[2][1]])}<button class="text-link" data-quote data-quote-service="heavy">Request specialized freight <span>↗</span></button></div>`);
  // The Long Haul tabbed panel remains a tabbed panel, with full service copy.
  servicesSection.querySelectorAll('[data-capability]').forEach((button,i)=>{button.dataset.capability=keys[i];button.innerHTML=`<span>0${i+1}</span> ${names[i]} <span>↗</span>`;});
  if (document.querySelector('#capability-description')) {
    document.querySelector('#capability-title').textContent=names[0];
    document.querySelector('#capability-description').textContent=copy.services[0][1];
  }
  let why = document.querySelector('.journal-statement') || document.querySelector('.shipment-process');
  if (why) {
    why.id='why';why.classList.add('foor-why');
    if (why.classList.contains('journal-statement')) {
      why.innerHTML=`<p class="eyebrow">Why choose us</p><h2 class="statement-type">A quiet<br><em>inbox.</em></h2><div>${paragraphs(copy.why)}</div>`;
    } else {
      why.innerHTML=`<p class="eyebrow">Why choose us</p><h2>A quiet inbox.<br>A shipment handled.</h2><div class="process-steps"><article><span>01 / OUR PEOPLE</span>${paragraphs([copy.why[0]])}</article><article><span>02 / OUR COMMITMENT</span>${paragraphs([copy.why[1]])}</article></div>`;
    }
  } else {
    why=make(`<section id="why" class="section wrap foor-why"><div class="section-heading"><h2>Why choose us</h2></div><div class="foor-why-columns">${paragraphs(copy.why)}</div></section>`);
    about.after(why);
  }
  // Preserve the map and lane selector in Coverage; use the supplied map in Technology.
  const technology=make(`<section id="technology" class="section wrap foor-technology"><div class="coverage-grid"><div><p class="eyebrow">Empowered by AI</p><h2>Empowered by AI</h2><p class="foor-tech-intro">${escape(copy.intro)}</p>${copy.features.map(([title,text],i)=>`<div class="value-row"><span>0${i+1}</span><div><h3>${escape(title)}</h3><p>${escape(text)}</p></div></div>`).join('')}</div><div class="foor-tech-media"><div class="map-panel"><img src="assets/network.svg" alt="Illustrative United States freight route network" loading="lazy"><p class="fine-print">Illustrative view</p></div><img class="foor-tech-photo" src="assets/hero.jpg" alt="Blue FOOR Logistics truck on a mountain highway" loading="lazy"></div></div></section>`);
  why.after(technology);
  document.querySelectorAll('.main-nav').forEach(nav=>{nav.innerHTML='<a href="#services">Our services</a><a href="#about">Who we are</a><a href="#why">Why choose us</a><a href="#technology">Empowered by AI</a>';});
  document.querySelectorAll('select[name="service"],select[name="quickService"]').forEach(select=>{
    select.innerHTML='<option value="ftl">Truckload services</option><option value="ltl">LTL services</option><option value="drayage">Drayage/Intermodal</option><option value="heavy">Heavy Haul &amp; Specialized</option>';
  });
  const faqAnswers=document.querySelectorAll('#faq details p');
  if(faqAnswers[0])faqAnswers[0].textContent='Request Truckload services, LTL services, Drayage/Intermodal, or Heavy Haul & Specialized. Include the commodity, weight, dimensions, and equipment requirements so the shipment can be reviewed.';
  if(faqAnswers[2])faqAnswers[2].textContent='Yes. Choose the service that fits your freight and describe the route, shipping frequency, and preferred schedule in the shipment notes.';
})();
