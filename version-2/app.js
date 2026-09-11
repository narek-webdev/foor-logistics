'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}
menu.addEventListener('click', () => {
  const opened = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(opened));
  navigation.classList.toggle('open', opened);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
window.matchMedia('(min-width: 1101px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
const form = document.querySelector('.quote-form');
const information = form.elements.information;
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const service = link.dataset.service;
    const cleaned = information.value.replace(/^Service: .*\n\n/, '');
    information.value = `Service: ${service}\n\n${cleaned}`;
    information.focus({ preventScroll: true });
  });
});
form.addEventListener('submit', event => {
  event.preventDefault();
  // Static demo: create a local file. No network request or persistence of personal data.
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const details = information.value.trim();
  form.elements.name.setCustomValidity(name ? '' : 'Please enter your name.');
  information.setCustomValidity(details.length >= 10 ? '' : 'Please add at least 10 characters about your shipment.');
  if (!form.reportValidity()) return;
  const request = `FOOR LOGISTICS\nSubject: Request Quote\nName: ${name}\nEmail: ${email}\n\nQuote information:\n${details}\n\nPrepared locally. This request has not been sent.\n`;
  const url = URL.createObjectURL(new Blob([request], { type: 'text/plain;charset=utf-8' }));
  const download = document.createElement('a');
  download.href = url;
  download.download = 'foor-quote-request.txt';
  document.body.append(download);
  download.click();
  download.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  form.querySelector('.form-status').textContent = 'Your request file is ready. No information has been sent.';
});
form.addEventListener('input', event => {
  event.target.setCustomValidity('');
  form.querySelector('.form-status').textContent = '';
});
const preview = document.querySelector('.dashboard-view');
if (preview) {
  const views = {
    shipments: '<img src="assets/network.svg" alt="Illustrative route network"><div class="shipment-line"><span class="status-dot"></span><b>Shipment overview</b><span>In transit</span></div><p class="dashboard-caption">Your freight. One clear view.</p>',
    tracking: '<img src="assets/network.svg" alt="Illustrative shipment tracking map"><div class="shipment-line"><span class="status-dot"></span><b>Pickup → On the road → Delivery</b></div><p class="dashboard-caption">An illustrative look at shipment visibility.</p>',
    documents: '<div class="document-row">↳ &nbsp; Bill of lading <span class="demo-label">/ Sample</span></div><div class="document-row">↳ &nbsp; Proof of delivery <span class="demo-label">/ Sample</span></div><p class="dashboard-caption">Shipment documents, together in one place. Illustrative only.</p>'
  };
  document.querySelectorAll('[data-preview]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-preview]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      preview.innerHTML = views[button.dataset.preview];
    });
  });
}


// Animate each section once as it enters view; content stays visible without JS.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && 'animate' in Element.prototype) {
  const activeAnimations = new Set();
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      revealObserver.unobserve(entry.target);
      if (motionPreference.matches) return;
      const animation = entry.target.animate(
        [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 550, easing: 'cubic-bezier(.2,.65,.3,1)' }
      );
      activeAnimations.add(animation);
      animation.onfinish = animation.oncancel = () => activeAnimations.delete(animation);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.about-copy, .about-image, .section-heading, .service-detail, .service, .why, .tech-content, .dashboard, .quote-copy, .quote-form').forEach(element => revealObserver.observe(element));
  motionPreference.addEventListener('change', event => {
    if (event.matches) activeAnimations.forEach(animation => animation.cancel());
  });
}
