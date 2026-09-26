(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('open', !expanded);
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }
  });

  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const bouquets = [...document.querySelectorAll('.bouquet-card')];
  function filterBouquets(category) {
    filterButtons.forEach((button) => {
      const selected = button.dataset.filter === category;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    bouquets.forEach((card) => {
      card.hidden = category !== 'all' && !card.dataset.category.split(' ').includes(category);
    });
  }
  filterButtons.forEach((button) => button.addEventListener('click', () => filterBouquets(button.dataset.filter)));
  document.querySelectorAll('[data-occasion]').forEach((link) => {
    link.addEventListener('click', () => {
      const mapped = link.dataset.occasion === 'wedding' ? 'celebration' : link.dataset.occasion;
      const available = filterButtons.some((button) => button.dataset.filter === mapped);
      if (available) filterBouquets(mapped);
    });
  });

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('p');
  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      lightboxImage.src = item.dataset.full;
      lightboxImage.alt = item.querySelector('img').alt;
      lightboxCaption.textContent = item.querySelector('span').textContent;
      lightbox.showModal();
      lightbox.querySelector('.lightbox-close').focus();
    });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    lightboxImage.src = '';
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.open) lightbox.close();
  });

  const dateField = document.querySelector('input[name="required-date"]');
  const today = new Date();
  dateField.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const form = document.querySelector('.order-form');
  const status = form.querySelector('.form-status');
  if (new URLSearchParams(location.search).has('success')) {
    status.textContent = 'Thanks for your enquiry. We’ll be in touch shortly.';
  }
  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      return;
    }
    status.textContent = 'Sending your enquiry…';
  });
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
