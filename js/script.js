// Initialize Lenis
// Check if browser is Safari
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (!isSafari) {
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
} else {
  // Optional: Add a class for CSS adjustments if needed
  document.documentElement.classList.add('is-safari');
}

// Initialize AOS
AOS.init({
  once: true,
});

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
  const swiperContainers = document.querySelectorAll('.awards__swiper');

  swiperContainers.forEach(container => {
    new Swiper(container, {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: false,
      speed: 800,
      navigation: {
          nextEl: container.querySelector('.awards__nav-next'),
          prevEl: container.querySelector('.awards__nav-prev'),
      },
      breakpoints: {
          768: {
              slidesPerView: 3,
          },
          1024: {
              slidesPerView: 4,
          },
          1280: {
              slidesPerView: 6,
          }
      },
      observer: true,
      observeParents: true,
    });
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

function initTeamSlider() {
    const sliderSelector = '.team__body'; 
    const teamSliderCheck = document.querySelector(sliderSelector);
    
    if (!teamSliderCheck) return;

    let teamSwiper;
    
    function handleResize() {
        if (window.innerWidth < 992) {
            if (!teamSwiper || teamSwiper.destroyed) {
                teamSwiper = new Swiper(teamSliderCheck, {
                    slidesPerView: 'auto',
                    spaceBetween: 16,
                    observer: true,
                    observeParents: true,
                    navigation: {
                        nextEl: teamSliderCheck.querySelector('.team__nav-next'),
                        prevEl: teamSliderCheck.querySelector('.team__nav-prev'),
                    },
                });
            }
        } else {
            if (teamSwiper && !teamSwiper.destroyed) {
                teamSwiper.destroy(true, true);
            }
        }
    }

    // Initial check
    handleResize();

    // Listen for resize
    window.addEventListener('resize', handleResize);
}

function initMaterialsProductSlider() {
    const slider = document.querySelector('.materials-product-swiper');
    
    if (slider) {
        new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 800,
            navigation: {
                nextEl: '.materials-product__slide-next',
                prevEl: '.materials-product__slide-prev',
            },
        });
    }
}

function initMixologyTabs() {
    const tabs = document.querySelectorAll('.mixology-page__tab');
    const cards = document.querySelectorAll('.mixology-page__card');
    
    if (!tabs.length || !cards.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filterValue = tab.getAttribute('data-filter');
            
            // 1. Update Tabs UI
            tabs.forEach(t => {
                t.classList.remove('mixology-page__tab--active');
                t.setAttribute('aria-selected', 'false');
            });
            
            tab.classList.add('mixology-page__tab--active');
            tab.setAttribute('aria-selected', 'true');

            // 2. Filter Cards
            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // If filter is 'all' or matches the category
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = ''; // Reset display to CSS default (block/flex/grid)
                    
                    // Add a small fade-in effect via global class if desired, or just show
                    // Using a small timeout to allow display change to register before opacity transition if we had CSS for it
                    // For now, just direct show/hide
                } else {
                    card.style.display = 'none';
                }
            });

            // Refresh AOS or other layout libraries if present
            if (typeof AOS !== 'undefined') {
                setTimeout(() => AOS.refresh(), 100);
            }
        });
    });
}

function initBlogFilter() {
    const filters = document.querySelectorAll('input[name="blog_category"]');
    const cards = document.querySelectorAll('.blog-card');

    if (!filters.length || !cards.length) return;

    filters.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const filterValue = e.target.value;

            // Optional: Scroll to top of list smoothly
            // const content = document.querySelector('.blog-page__content');
            // if (content) content.scrollIntoView({ behavior: 'smooth' });

            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = ''; // Restore default display
                } else {
                    card.style.display = 'none';
                }
            });

            // Trigger AOS refresh if available
            if (typeof AOS !== 'undefined') {
                setTimeout(() => AOS.refresh(), 100);
            }
        });
    });
}

function initFancybox() {
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind("[data-fancybox]", {
            // Custom options if needed
        });
    }
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
  initTeamSlider();
  initMaterialsProductSlider();
  initMixologyTabs();
  initBlogFilter();
  initFancybox();
});
