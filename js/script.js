// Initialize AOS
AOS.init({
  once: true,
});

/* ==========================================================================
   Navigation Menu Script
   ========================================================================== */
function initMenu() {
  // 1. Top Level Items (Click)
  const navItems = document.querySelectorAll('.header__nav-item');

  navItems.forEach(item => {
    const link = item.querySelector('a');
    const submenu = item.querySelector('ul');

    if (submenu) {
      item.classList.add('has-submenu');
      
      if (!link.querySelector('.menu-arrow')) {
        const arrow = document.createElement('span');
        arrow.classList.add('menu-arrow');
        link.appendChild(arrow);
      }

      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Close other top level items
        navItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('is-active')) {
                otherItem.classList.remove('is-active');
            }
        });

        item.classList.toggle('is-active');
      });
    }
  });

  // 2. Sub Items (Click)
  const subItems = document.querySelectorAll('.header__sub-item');

  subItems.forEach(item => {
    const link = item.querySelector('a');
    const submenu = item.querySelector('ul');

    if (submenu) {
      item.classList.add('has-submenu');
      
      if (!link.querySelector('.menu-arrow')) {
        const arrow = document.createElement('span');
        arrow.classList.add('menu-arrow');
        link.appendChild(arrow);
      }

      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Avoid bubbling up
        
        // Close siblings
        const parent = item.parentElement;
        const siblings = parent.querySelectorAll('.header__sub-item.is-active');
        siblings.forEach(sibling => {
            if (sibling !== item) sibling.classList.remove('is-active');
        });

        item.classList.toggle('is-active');
      });
    }
  });

  // Close submenus when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header__nav-item')) {
      document.querySelectorAll('.header__nav-item.is-active').forEach(el => {
        el.classList.remove('is-active');
      });
    }
    if (!e.target.closest('.header__sub-item')) {
      document.querySelectorAll('.header__sub-item.is-active').forEach(el => {
        el.classList.remove('is-active');
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
    // Check if we should disable swiper for this container
    if (container.closest('.awards__body--not-swiper')) return;

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
    
    // Check if slider exists and doesn't have the 'not-swiper' class
    if (slider && !slider.classList.contains('materials-product-not-swiper')) {
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

function initProductFilter() {
    const filters = document.querySelectorAll('input[name="product_category"]');
    // We target .blog-card because product.html reuses this class
    const cards = document.querySelectorAll('.blog-card'); 

    if (!filters.length) return; // Don't check !cards.length strictly, maybe no products yet? But usually fine.

    filters.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const filterValue = e.target.value;

            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = ''; 
                } else {
                    card.style.display = 'none';
                }
            });

            if (typeof AOS !== 'undefined') {
                setTimeout(() => AOS.refresh(), 100);
            }
        });
    });
}

function initPartnerSlider() {
    const container = document.querySelector('.partner-swiper');
    if (!container) return;

    new Swiper(container, {
        slidesPerView: "auto",
        spaceBetween: 24,
        loop: true,
    });
}

function initFaq() {
    const buttons = document.querySelectorAll('.faq-content__accardion-btn');

    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const isOpen = btn.classList.contains('active');

            // Close other items (optional - strict accordion behavior)
            // buttons.forEach(otherBtn => {
            //     if (otherBtn !== btn && otherBtn.classList.contains('active')) {
            //         otherBtn.classList.remove('active');
            //         otherBtn.setAttribute('aria-expanded', 'false');
            //         otherBtn.nextElementSibling.style.maxHeight = null;
            //     }
            // });

            if (isOpen) {
                btn.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = null;
            } else {
                btn.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
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

function initShopFilter() {
    // 1. Inputs
    const radios = document.querySelectorAll('.sidebar input[type="radio"]');
    const minPriceInput = document.getElementById('min_price');
    const maxPriceInput = document.getElementById('max_price');
    const priceFrom = document.querySelector('.price_label .from');
    const priceTo = document.querySelector('.price_label .to');

    if (!radios.length && !minPriceInput) {
        // If inputs are missing, still try to init accordion if category_list exists
        const filterBlocks = document.querySelectorAll('.category_list');
        if (!filterBlocks.length) return;
    }

    // 2. Prevent link navigation inside labels
    const filterLinks = document.querySelectorAll('.sidebar .cat-item a');
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Trigger the associated input manually if needed, 
            // though clicking the label usually handles it.
            const radio = link.closest('label').querySelector('input');
            if (radio && !radio.checked) {
                radio.checked = true;
                radio.dispatchEvent(new Event('change'));
            }
        });
    });

    // 3. Price Slider Logic
    const sliderTrack = document.querySelector('.slider-track-fill');
    
    function updatePrice() {
        if (!minPriceInput || !maxPriceInput) return;

        let minVal = parseInt(minPriceInput.value);
        let maxVal = parseInt(maxPriceInput.value);
        
        // Validation limits
        const minAttr = parseInt(minPriceInput.min);
        const maxAttr = parseInt(minPriceInput.max);

        // Swap if min > max
        if (minVal > maxVal) {
            let temp = minVal;
            minVal = maxVal;
            maxVal = temp;
        }

        if (priceFrom) priceFrom.textContent = minVal + ' грн';
        if (priceTo) priceTo.textContent = maxVal + ' грн';

        // Update Track
        if (sliderTrack) {
            const range = maxAttr - minAttr;
            const minPercent = ((minVal - minAttr) / range) * 100;
            const maxPercent = ((maxVal - minAttr) / range) * 100;
            
            sliderTrack.style.left = minPercent + "%";
            sliderTrack.style.right = (100 - maxPercent) + "%";
        }
        
        // Debounce filter trigger or just trigger it? 
        // Usually wait for user to stop dragging. 
        // For now, update text live, do not trigger filter on every move unless requested.
    }

    // Trigger on change (end of drag) for filter, input for visual
    if (minPriceInput) {
        minPriceInput.addEventListener('input', updatePrice);
        minPriceInput.addEventListener('change', triggerFilter);
    }
    if (maxPriceInput) {
        maxPriceInput.addEventListener('input', updatePrice);
        maxPriceInput.addEventListener('change', triggerFilter);
    }

    // Init
    updatePrice();

    // 4. Radio Logic
    radios.forEach(radio => {
        radio.addEventListener('change', triggerFilter);
    });

    // OK Button Logic
    const okBtn = document.querySelector('.filter-btn');
    if (okBtn) {
        okBtn.addEventListener('click', (e) => {
            e.preventDefault();
            triggerFilter();
        });
    }

    // 5. Filter Function (Placeholder)
    function triggerFilter() {
        const filters = {};

        // Collect checked radios
        radios.forEach(r => {
            if (r.checked) {
                filters[r.name] = r.value;
            }
        });

        // Collect price
        if (minPriceInput && maxPriceInput) {
            filters.min_price = Math.min(minPriceInput.value, maxPriceInput.value);
            filters.max_price = Math.max(minPriceInput.value, maxPriceInput.value);
        }

        console.log("Selected Shop Filters:", filters);
        
        // TODO: Call your grid filtering logic here
        // filterShopGrid(filters);
    }

    // 6. Filter Accordion (Collapsible)
    const filterBlocks = document.querySelectorAll('.category_list');

    filterBlocks.forEach(block => {
        const title = block.querySelector('h4');
        if (title) {
            // Add arrow
            if (!title.querySelector('.filter-arrow')) {
                const arrow = document.createElement('span');
                arrow.classList.add('filter-arrow');
                // You can style .filter-arrow in CSS (e.g., background-image)
                title.appendChild(arrow);
            }

            // Click event
            title.addEventListener('click', () => {
                block.classList.toggle('active');
            });
        }
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
  initTeamSlider();
  initMaterialsProductSlider();
  initMixologyTabs();
  initBlogFilter();
  initProductFilter();
  initPartnerSlider();
  initFaq();
  initFancybox();
  initShopFilter();
});
