// Northeast Aluminium - Main Script

document.addEventListener('DOMContentLoaded', () => {
  // ========== Mobile Menu ==========
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.overlay');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      overlay.classList.toggle('show');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    overlay.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  // ========== Header Scroll ==========
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ========== Product Filter & Search ==========
  const searchInput = document.getElementById('productSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  const categorySections = document.querySelectorAll('.category-section');
  const noResults = document.querySelector('.no-results');

  if (searchInput && filterBtns.length) {
    let currentFilter = 'all';

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        filterProducts();
      });
    });

    searchInput.addEventListener('input', filterProducts);

    function filterProducts() {
      const query = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;

      productCards.forEach(card => {
        const material = card.dataset.material;
        const name = card.dataset.name.toLowerCase();
        const desc = card.querySelector('p')?.textContent.toLowerCase() || '';

        const matchesFilter = currentFilter === 'all' || material === currentFilter;
        const matchesSearch = !query || name.includes(query) || desc.includes(query);

        if (matchesFilter && matchesSearch) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Hide empty category titles
      categorySections.forEach(section => {
        const cards = section.querySelectorAll('.product-card');
        const hasVisible = Array.from(cards).some(c => c.style.display !== 'none');
        section.style.display = hasVisible ? '' : 'none';
      });

      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }
  }

  // ========== Simple Form Handling ==========
  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = enquiryForm.querySelector('[name="name"]').value;
      const phone = enquiryForm.querySelector('[name="phone"]').value;
      const message = enquiryForm.querySelector('[name="message"]').value;

      // Open WhatsApp with pre-filled message
      const text = `Hello Northeast Aluminium,%0A%0AName: ${name}%0APhone: ${phone}%0A%0AMessage: ${message}`;
      window.open(`https://wa.me/919362970418?text=${text}`, '_blank');
      
      enquiryForm.reset();
      alert('Opening WhatsApp... You can send the enquiry directly!');
    });
  }

  // ========== Active Nav Link ==========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});