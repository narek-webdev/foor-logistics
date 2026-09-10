'use strict';

const params = new URLSearchParams(location.search);
const designs = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
// Query string wins; a pre-rendered page keeps the theme already on <body>.
const design = designs.includes(params.get('design')) ? params.get('design')
  : designs.includes(document.body.dataset.theme) ? document.body.dataset.theme : '1';
document.body.dataset.theme = design;
const designNames = { '1': 'Blue Horizon', '2': 'Night Shift', '3': 'Open Road', '4': 'Freight Journal', '5': 'Dispatch', '6': 'Long Haul', '7': 'Terminal', '8': 'Aurora', '9': 'Blueprint' };
document.title = `Northline — ${designNames[design]} | US Trucking`;
document.querySelector(`[data-design="${design}"]`).classList.add('active');
document.querySelector(`[data-design="${design}"]`).setAttribute('aria-current', 'page');
document.querySelectorAll('.logo').forEach(link => { link.href = `index.html?design=${design}`; });
document.querySelector('#year').textContent = new Date().getFullYear();

const iconPaths = {
  truck: '<path d="M2 6h13v12H2zM15 10h4l3 4v4h-7M15 14h7"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>',
  box: '<path d="m12 3 9 5v10l-9 5-9-5V8zM3 8l9 5 9-5M12 13v10M7.5 5.5l9 5V15"/>',
  route: '<circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M8 5h8a4 4 0 0 1 0 8H8a3 3 0 0 0 0 6h8M16 2l3 3-3 3"/>'
};
document.querySelectorAll('[data-icon]').forEach(el => {
  el.innerHTML = `<svg viewBox="0 0 24 26" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[el.dataset.icon]}</svg>`;
});

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
function closeMenu() {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });

const quoteDialog = document.querySelector('#quote-dialog');
const serviceDialog = document.querySelector('#service-dialog');
const form = document.querySelector('#quote-form');
const result = document.querySelector('#quote-result');
const today = new Date();
const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
form.elements.date.min = dateString;
let dialogOpener;
function openQuote({ service, origin, destination } = {}) {
  dialogOpener = document.activeElement;
  serviceDialog.close();
  if (service) form.elements.service.value = service;
  if (origin) form.elements.origin.value = origin;
  if (destination) form.elements.destination.value = destination;
  form.hidden = false;
  result.hidden = true;
  quoteDialog.showModal();
}
document.querySelectorAll('[data-quote]').forEach(button => button.addEventListener('click', () => openQuote({
  service: button.dataset.quoteService, origin: button.dataset.quoteOrigin, destination: button.dataset.quoteDestination
})));
document.querySelector('#quick-quote')?.addEventListener('submit', event => {
  event.preventDefault();
  const quickForm = event.currentTarget;
  if (!quickForm.reportValidity()) return;
  openQuote({ service: quickForm.elements.quickService.value, origin: quickForm.elements.quickOrigin.value, destination: quickForm.elements.quickDestination.value });
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
});
quoteDialog.addEventListener('close', () => {
  if (dialogOpener && !dialogOpener.closest('dialog')) dialogOpener.focus();
  else if (dialogOpener?.closest('#service-dialog')) document.querySelector(`[data-service="${selectedService}"]`).focus();
});

const services = {
  ftl: { title: 'Full truckload', description: 'For shipments that need the space and focus of a dedicated truck. Plan a direct move around your freight, pickup window, and delivery requirements.', features: ['Dry van transportation for general freight', 'One-time shipments or consistent shipping lanes', 'Equipment and scheduling confirmed before booking'] },
  ltl: { title: 'Less-than-truckload', description: 'A flexible option when your shipment does not need a full trailer. Share capacity while keeping your freight requirements front and center.', features: ['Palletized and smaller commercial shipments', 'Provide weight, dimensions, and freight class if known', 'Tell us about liftgate, appointment, or limited-access needs'] },
  dedicated: { title: 'Dedicated freight', description: 'Build a transportation plan around repeat shipments. Start with your lanes and volume, and work toward a consistent schedule.', features: ['Recurring routes and regular shipping schedules', 'Capacity planning around your operation', 'A transportation plan tailored to your requirements'] }
};
let selectedService = 'ftl';
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  selectedService = button.dataset.service;
  const service = services[selectedService];
  document.querySelector('#service-title').textContent = service.title;
  document.querySelector('#service-description').textContent = service.description;
  document.querySelector('#service-features').replaceChildren(...service.features.map(feature => {
    const li = document.createElement('li'); li.textContent = feature; return li;
  }));
  serviceDialog.showModal();
}));
document.querySelector('#service-quote').addEventListener('click', () => openQuote({ service: selectedService }));

// Long Haul (design 6) swaps one service feature panel in place.
const capabilities = {
  ftl: { kicker: 'THE WHOLE TRAILER. YOUR FREIGHT.', title: 'Room for the big moves.', description: services.ftl.description, action: 'Plan your truckload', caption: '01 / DRY VAN TRANSPORTATION' },
  ltl: { kicker: 'LESS SPACE. THE SAME COMMITMENT.', title: 'Small loads. Open possibilities.', description: 'Share trailer capacity for palletized freight. Tell us the weight, dimensions, and special handling your shipment needs.', action: 'Plan your LTL shipment', caption: '02 / SHARED TRAILER CAPACITY' },
  dedicated: { kicker: 'YOUR ROUTE. ON REPEAT.', title: 'Consistency goes a long way.', description: 'Build a transportation plan for recurring lanes, regular volume, and the rhythm of your business.', action: 'Plan dedicated freight', caption: '03 / RECURRING FREIGHT LANES' }
};
document.querySelectorAll('[data-capability]').forEach(button => button.addEventListener('click', () => {
  const capability = capabilities[button.dataset.capability];
  document.querySelectorAll('[data-capability]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  document.querySelector('#capability-kicker').textContent = capability.kicker;
  document.querySelector('#capability-title').textContent = capability.title;
  document.querySelector('#capability-description').textContent = capability.description;
  document.querySelector('#capability-quote').innerHTML = `${capability.action} <span>\u2197</span>`;
  document.querySelector('#equipment-caption').textContent = capability.caption;
  form.elements.service.value = button.dataset.capability;
}));

const lanes = {
  west: { origin: 'Los Angeles, CA', destination: 'Chicago, IL', zipFrom: '90001', zipTo: '60601', start: [126, 208], end: [438, 150], curve: 'M126 208Q260 45 438 150', labels: ['LOS ANGELES', 'CHICAGO'] },
  south: { origin: 'Dallas, TX', destination: 'Atlanta, GA', zipFrom: '75201', zipTo: '30301', start: [343, 258], end: [489, 247], curve: 'M343 258Q410 190 489 247', labels: ['DALLAS', 'ATLANTA'] },
  east: { origin: 'Chicago, IL', destination: 'Newark, NJ', zipFrom: '60601', zipTo: '07101', start: [438, 150], end: [576, 169], curve: 'M438 150Q509 75 576 169', labels: ['CHICAGO', 'NEWARK'] }
};
let selectedLane = 'west';
document.querySelectorAll('[data-lane]').forEach(button => button.addEventListener('click', () => {
  selectedLane = button.dataset.lane;
  const lane = lanes[selectedLane];
  document.querySelectorAll('[data-lane]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  document.querySelector('#lane-origin').textContent = lane.origin;
  document.querySelector('#lane-destination').textContent = lane.destination;
  document.querySelector('#route-path').setAttribute('d', lane.curve);
  ['start', 'end'].forEach((point, i) => {
    const group = document.querySelector(`#map-${point}`);
    group.setAttribute('transform', `translate(${lane[point].join(' ')})`);
    group.querySelector('text').textContent = lane.labels[i];
  });
}));
document.querySelector('#lane-quote').addEventListener('click', () => {
  const lane = lanes[selectedLane];
  openQuote({ origin: lane.zipFrom, destination: lane.zipTo });
});

let requestText = '';
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  requestText = `NORTHLINE — FREIGHT QUOTE REQUEST\nDesign preview · Not submitted or booked\n\nName: ${data.name.trim()}\nEmail: ${data.email}\nPickup ZIP: ${data.origin}\nDelivery ZIP: ${data.destination}\nService: ${services[data.service].title}\nPreferred pickup date: ${data.date}\n\nShipment notes:\n${data.notes.trim() || 'None provided'}\n`;
  document.querySelector('#request-summary').textContent = requestText;
  form.hidden = true;
  result.hidden = false;
  quoteDialog.scrollTop = 0;
  document.querySelector('#download-request').focus();
});
document.querySelector('#edit-request').addEventListener('click', () => {
  result.hidden = true; form.hidden = false; form.elements.name.focus();
});
document.querySelector('#download-request').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([requestText], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url; link.download = 'northline-freight-request.txt';
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
