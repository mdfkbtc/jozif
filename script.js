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

const slideshow = document.querySelector('.hero-visual');
if (slideshow) {
  const slides = [...slideshow.querySelectorAll('.hero-slide')];
  const controls = slideshow.querySelector('.hero-slide-controls');
  const dots = [...slideshow.querySelectorAll('[data-slide]')];
  const play = slideshow.querySelector('.slide-play');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let paused = reducedMotion.matches;
  let hovered = false;
  let timer;

  const showSlide = (index) => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === active);
      slide.setAttribute('aria-hidden', String(i !== active));
      dots[i].setAttribute('aria-pressed', String(i === active));
    });
  };
  const updatePlayback = () => {
    clearInterval(timer);
    play.classList.toggle('is-paused', paused);
    play.setAttribute('aria-label', paused ? 'Spustiť striedanie fotografií' : 'Pozastaviť striedanie fotografií');
    if (!paused && !hovered && !document.hidden) {
      timer = setInterval(() => showSlide(active + 1), 6000);
    }
  };
  if (slides.length > 1 && controls && play) {
    controls.hidden = false;
    // Fetch the remaining photographs before the first transition.
    slides.forEach((slide) => { slide.loading = 'eager'; });
    controls.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button) return;
      if (button === play) paused = !paused;
      else {
        paused = true;
        if (button.dataset.slide !== undefined) showSlide(Number(button.dataset.slide));
        else if (button.dataset.direction) showSlide(active + Number(button.dataset.direction));
      }
      updatePlayback();
    });
    slideshow.addEventListener('mouseenter', () => { hovered = true; updatePlayback(); });
    slideshow.addEventListener('mouseleave', () => { hovered = false; updatePlayback(); });
    slideshow.addEventListener('focusin', () => { paused = true; updatePlayback(); });
    document.addEventListener('visibilitychange', updatePlayback);
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) paused = true;
      updatePlayback();
    });
    updatePlayback();
  }
}
