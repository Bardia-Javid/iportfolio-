  /**
  * Template Name: iPortfolio
  * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
  * Updated: Jun 29 2024 with Bootstrap v5.3.3
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  */

  (function() {
    "use strict";

    /**
     * Header toggle
     */
    const headerToggleBtn = document.querySelector('.header-toggle');

    let scrollPosition;

    // Only initialize mobile menu functionality on mobile devices
    function initMobileMenu() {
      if (window.innerWidth < 992) { // Match Bootstrap's lg breakpoint
        if (headerToggleBtn) {
          // Remove any existing listeners
          headerToggleBtn.removeEventListener('click', handleHeaderToggle);
          // Add new listener
          headerToggleBtn.addEventListener('click', handleHeaderToggle);
        }
      } else {
        // Remove listeners on desktop
        if (headerToggleBtn) {
          headerToggleBtn.removeEventListener('click', handleHeaderToggle);
        }
      }
    }

    function handleHeaderToggle(event) {
      event.preventDefault();
      event.stopPropagation();
      headerToggle();
    }

    function headerToggle() {
      const header = document.querySelector('#header');
      const isShown = header.classList.toggle('header-show');
      const icon = headerToggleBtn.querySelector('i');
      
      // Toggle icon classes
      if (isShown) {
        icon.classList.remove('bi-list');
        icon.classList.add('bi-x');
        
        // Store current scroll position
        scrollPosition = window.pageYOffset;
        
        // Add scroll lock while preserving position
        const main = document.querySelector('main');
        main.classList.add('scroll-lock');
        main.style.top = `-${scrollPosition}px`;
      } else {
        icon.classList.remove('bi-x');
        icon.classList.add('bi-list');
        
        // Restore scroll position without animation
        const main = document.querySelector('main');
        main.classList.remove('scroll-lock');
        main.style.top = '';
        window.scrollTo({
          top: scrollPosition,
          behavior: 'instant'
        });
      }
    }

    // Initialize on load and resize
    window.addEventListener('load', initMobileMenu);
    window.addEventListener('resize', initMobileMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      const header = document.querySelector('#header');
      const headerToggleBtn = document.querySelector('.header-toggle');
      
      if (header.classList.contains('header-show') && 
          !header.contains(event.target) && 
          !headerToggleBtn.contains(event.target)) {
        headerToggle();
      }
    });

    // Prevent menu from closing when clicking inside
    document.querySelector('#header').addEventListener('click', (event) => {
      event.stopPropagation();
    });

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.header-show')) {
          headerToggle();
        }
      });

    });

    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });

    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }

    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector('.scroll-top');

    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
    }
    const scrollTopBtn = document.getElementById('scroll-top');

    scrollTopBtn.addEventListener('click', (e) => {
      // Make sure it's a direct user click (not triggered by browser/script)
      if (e.isTrusted) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);

    /**
     * Animation on scroll function and init
     */
    function aosInit() {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
    window.addEventListener('load', aosInit);

    /**
     * Init typed.js
     */
    const selectTyped = document.querySelector('.typed');
    if (selectTyped) {
      let typed_strings = selectTyped.getAttribute('data-typed-items');
      typed_strings = typed_strings.split(',');
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }

    /**
     * Initiate Pure Counter
     */
    new PureCounter();

    /**
     * Animate the skills items on reveal
     */
    let skillsAnimation = document.querySelectorAll('.skills-animation');
    skillsAnimation.forEach((item) => {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function(direction) {
          let progress = item.querySelectorAll('.progress .progress-bar');
          progress.forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    });

    /**
     * Initiate glightbox
     */
    const glightbox = GLightbox({
      selector: '.glightbox'
    });

    /**
     * Init isotope layout and filters
     */
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope;
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });

    });

    /**
     * Init swiper sliders
     */
    function initSwiper() {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );

        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      });
    }

    window.addEventListener("load", initSwiper);

    /**
     * Correct scrolling position upon page load for URLs containing hash links.
     */
    window.addEventListener('load', function(e) {
      if (window.location.hash) {
        if (document.querySelector(window.location.hash)) {
          setTimeout(() => {
            let section = document.querySelector(window.location.hash);
            let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
            window.scrollTo({
              top: section.offsetTop - parseInt(scrollMarginTop),
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    });

    /**
     * Navmenu Scrollspy
     */
    let navmenulinks = document.querySelectorAll('.navmenu a');

    function navmenuScrollspy() {
      navmenulinks.forEach(navmenulink => {
        if (!navmenulink.hash) return;
        let section = document.querySelector(navmenulink.hash);
        if (!section) return;
        let position = window.scrollY + 200;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
          navmenulink.classList.add('active');
        } else {
          navmenulink.classList.remove('active');
        }
      })
    }
    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);

  })();