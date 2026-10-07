const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

if (toggle && navigation) {
  toggle.hidden = false;
  navigation.dataset.collapsible = 'true';

  const closeMenu = () => {
    navigation.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) closeMenu();
  });

  window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
}

const currentUrl = new URL(window.location.href);
const nextInput = document.querySelector('input[name="_next"]');
if (nextInput && ['http:', 'https:'].includes(currentUrl.protocol)) {
  const returnUrl = new URL(window.location.pathname, currentUrl.origin);
  returnUrl.searchParams.set('sent', '1');
  returnUrl.hash = 'mini-contact';
  nextInput.value = returnUrl.href;
}
if (currentUrl.searchParams.get('sent') === '1') {
  const message = document.querySelector('#mc-success');
  if (message) message.hidden = false;
}

const contactForm = document.querySelector('.contact-form');
const contactResult = document.querySelector('#contact-result');
if (contactForm && contactResult && typeof contactResult.showModal === 'function') {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const title = contactResult.querySelector('#contact-result-title');
  const message = contactResult.querySelector('#contact-result-message');
  const help = contactResult.querySelector('.contact-dialog-help');
  let submitting = false;

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitting) return;
    submitting = true;
    const buttonContent = submitButton.innerHTML;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    const data = new FormData(contactForm);
    data.delete('_next');
    submitButton.disabled = true;
    submitButton.textContent = 'Odosielam…';
    contactForm.setAttribute('aria-busy', 'true');
    document.querySelector('#mc-success').hidden = true;
    let success = false;

    try {
      const endpoint = new URL(contactForm.action);
      endpoint.pathname = '/ajax' + endpoint.pathname;
      const response = await fetch(endpoint.href, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        throw new Error('Submission not accepted');
      }
      success = true;
      contactForm.reset();
      title.textContent = 'Ďakujeme za správu';
      message.textContent = 'Vaša správa bola úspešne odoslaná. Ozveme sa vám čo najskôr.';
    } catch {
      title.textContent = 'Odoslanie sa nepodarilo potvrdiť';
      message.textContent = 'Skontrolujte internetové pripojenie a skúste to znova. Vyplnené údaje zostali zachované.';
    } finally {
      clearTimeout(timeout);
      submitting = false;
      submitButton.disabled = false;
      submitButton.innerHTML = buttonContent;
      contactForm.removeAttribute('aria-busy');
    }
    help.hidden = success;
    contactResult.dataset.state = success ? 'success' : 'error';
    contactResult.showModal();
  });
  contactResult.addEventListener('close', () => submitButton.focus());
}

const slideshow = document.querySelector('.hero-visual');
if (slideshow) {
  const slides = [...slideshow.querySelectorAll('.hero-slide')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const slideInterval = 6000;
  let active = 0;
  let timer;

  const showSlide = (index) => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === active);
      slide.setAttribute('aria-hidden', String(i !== active));
    });
  };
  const updatePlayback = () => {
    clearInterval(timer);
    if (!reducedMotion.matches && !document.hidden) {
      timer = setInterval(() => showSlide(active + 1), slideInterval);
    }
  };
  if (slides.length > 1) {
    // Fetch the remaining photographs before the first transition.
    slides.forEach((slide) => { slide.loading = 'eager'; });
    document.addEventListener('visibilitychange', updatePlayback);
    reducedMotion.addEventListener('change', updatePlayback);
    updatePlayback();
  }
}
