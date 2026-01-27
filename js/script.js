// Initialize Lenis
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize AOS
AOS.init();

/* ==========================================================================
   Navigation Menu Script
   ========================================================================== */
function initMenu() {
  const menuItems = document.querySelectorAll('.header__nav-item, .header__sub-item');

  menuItems.forEach(item => {
    const link = item.querySelector('a');
    const submenu = item.querySelector('ul');

    if (submenu) {
      item.classList.add('has-submenu');
      
      // Create and append arrow
      const arrow = document.createElement('span');
      arrow.classList.add('menu-arrow');
      link.appendChild(arrow);

      // Hover events
      item.addEventListener('mouseenter', () => {
        item.classList.add('is-active');
      });

      item.addEventListener('mouseleave', () => {
        item.classList.remove('is-active');
      });
    }
  });
}

function initBurger() {
  const burgerBtn = document.querySelector('.burger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.querySelector('body');

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('is-active');
      mobileMenu.classList.toggle('is-active');
      body.classList.toggle('no-scroll');

      if (body.classList.contains('no-scroll')) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });
  }
}

function initMobileNav() {
  const arrows = document.querySelectorAll('.mobile-menu__arrow');

  arrows.forEach(arrow => {
    arrow.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = this.closest('li');
        if (parent) {
            parent.classList.toggle('is-open');
        }
    });
  });
}

function initFooterNav() {
  const heads = document.querySelectorAll('.footer__nav-head');

  heads.forEach(head => {
    head.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = this.closest('.footer__nav-item');
        if (parent) {
            parent.classList.toggle('is-open');
        }
    });
  });
}

function initLangSwitcher() {
    const langBtn = document.querySelector('.header__lang-btn');
    const langContainer = document.querySelector('.header__lang');
    const langOptions = document.querySelectorAll('.header__lang-option');

    if (langBtn && langContainer) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langContainer.classList.toggle('is-active');
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!langContainer.contains(e.target)) {
                langContainer.classList.remove('is-active');
            }
        });

        // Handle option selection
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent navigation for now
                const selectedLang = option.textContent.trim();
                
                // Update button text
                langBtn.textContent = selectedLang;
                
                // Update active class
                langOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');

                // Close dropdown
                langContainer.classList.remove('is-active');
            });
        });
    }
}

function initAwards() {
  const awardsSwipers = new Swiper('.awards__swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    // Marquee effect settings
    speed: 5000, // Adjust for speed (higher = slower)
    // freeMode: true, 
    // freeModeMomentum: false,
    // autoplay: {
    //     delay: 0,
    //     disableOnInteraction: false,
    //     pauseOnMouseEnter: true
    // },
  });

  // 2. Tabs Logic
  const tabBtns = document.querySelectorAll('.awards__tab-btn');
  const tabContents = document.querySelectorAll('.awards__tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');

        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to current
        btn.classList.add('active');
        const currentContent = document.querySelector(`.awards__tab-content[data-content="${tabId}"]`);
        if (currentContent) {
            currentContent.classList.add('active');
        }
    });
  });
}

function initReviews() {
  new Swiper('.reviews__slider', {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
          el: '.reviews__pagination',
          clickable: true,
      },
  });
}

// Call scripts
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initBurger();
  initMobileNav();
  initFooterNav();
  initLangSwitcher();
  initAwards();
  initReviews();
});
