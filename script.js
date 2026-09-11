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
