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
window.matchMedia('(min-width: 1361px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
const quoteDialog = document.querySelector('#quote-dialog');
const form = document.querySelector('#quote-form');
const result = document.querySelector('#quote-result');
const quoteTitle = document.querySelector('#quote-title');
let dialogOpener = null;
let sendingQuote = false;
const quoteError = document.querySelector('#quote-error');
const submitQuote = form.querySelector('[type=submit]');
// Carry the selected service into the email.
let selectedService = '';
function openQuote(trigger) {
  dialogOpener = trigger;
  closeMenu();
  selectedService = trigger.dataset.service || '';
  quoteTitle.hidden = false;
  quoteDialog.setAttribute('aria-labelledby', 'quote-title');
  form.hidden = false;
  result.hidden = true;
  if (!quoteDialog.open) quoteDialog.showModal();
  quoteDialog.scrollTop = 0;
  form.elements.name.focus({ preventScroll: true });
}
// Links marked data-scroll jump to the quote section instead of opening the dialog.
document.querySelectorAll('a[href="#quote"]:not([data-scroll]), [data-quote]').forEach(trigger => {
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('aria-controls', 'quote-dialog');
  trigger.addEventListener('click', event => {
    event.preventDefault();
    openQuote(trigger);
  });
});
quoteDialog.querySelector('.dialog-close').addEventListener('click', () => quoteDialog.close());
quoteDialog.addEventListener('click', event => {
  if (event.target !== quoteDialog) return;
  const rect = quoteDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) quoteDialog.close();
});
quoteDialog.addEventListener('close', () => {
  // The mobile navigation closes before opening the dialog, so restore focus to Menu.
  if (dialogOpener?.getClientRects().length) dialogOpener.focus({ preventScroll: true });
  else menu.focus({ preventScroll: true });
});
form.addEventListener('input', event => {
  if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
});
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (sendingQuote) return;
  quoteError.hidden = true;
  form.elements.name.setCustomValidity(form.elements.name.value.trim() ? '' : 'Please enter your name.');
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  sendingQuote = true;
  submitQuote.disabled = true;
  submitQuote.textContent = 'Sending…';
  form.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, service: selectedService }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.ok !== true) {
      throw new Error(payload.error || 'We could not confirm your request was sent. Please try again or contact our team by email.');
    }
    form.reset();
    quoteTitle.hidden = true;
    quoteDialog.setAttribute('aria-labelledby', 'quote-success-title');
    form.hidden = true;
    result.hidden = false;
    quoteDialog.scrollTop = 0;
    if (quoteDialog.open) document.querySelector('#quote-success-title').focus({ preventScroll: true });
  } catch (error) {
    quoteError.textContent = error instanceof TypeError
      ? 'We could not confirm your request was sent. Please check your connection or contact our team by email.'
      : error.message;
    quoteError.hidden = false;
  } finally {
    sendingQuote = false;
    submitQuote.disabled = false;
    submitQuote.textContent = 'Submit';
    form.removeAttribute('aria-busy');
  }
});
document.querySelector('#edit-request').addEventListener('click', () => {
  result.hidden = true;
  quoteTitle.hidden = false;
  quoteDialog.setAttribute('aria-labelledby', 'quote-title');
  form.hidden = false;
  selectedService = '';
  quoteError.hidden = true;
  form.elements.name.focus();
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
  document.querySelectorAll('.about-copy, .about-image, .section-heading, .service-detail, .service-card, .service, .why, .tech-content, .dashboard, .quote-copy, .quote-form').forEach(element => revealObserver.observe(element));
  motionPreference.addEventListener('change', event => {
    if (event.matches) activeAnimations.forEach(animation => animation.cancel());
  });
}
