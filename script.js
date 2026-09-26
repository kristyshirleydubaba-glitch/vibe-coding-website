(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  // Mobile navigation: keep the button state and menu visibility in sync.
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('open', !expanded);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }));

  // Lightweight style filter for the sample collection.
  const filterButtons = document.querySelectorAll('.filter-chip');
  const productCards = document.querySelectorAll('.product-card');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    productCards.forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.style !== button.dataset.filter;
    });
  }));

  // Native dialog gives keyboard and screen reader users a familiar lightbox.
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox.querySelector('img');
  document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
    const image = item.querySelector('img');
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = image.alt;
    lightbox.showModal();
  }));
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });

  // Static-hosting feedback. Netlify can handle this form after form detection
  // is enabled for the site; ordinary static preview gets a friendly message.
  const form = document.querySelector('#order-form');
  form.addEventListener('submit', event => {
    const feedback = form.querySelector('.form-feedback');
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get('bot-field')) return;
    // Keep normal POST submission on hosted sites so Netlify Forms can receive it.
    // On localhost, simulate the confirmation because no form service is attached.
    if (['localhost', '127.0.0.1', '::1'].includes(location.hostname)) {
      event.preventDefault();
      feedback.textContent = 'Thanks for your request! On a Netlify deployment, this form will be sent to the business.';
      form.reset();
    }
  });

  document.querySelector('#year').textContent = new Date().getFullYear();
})();
