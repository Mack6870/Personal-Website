/* =================================================================
 * Mackenzie Furlong — Personal Website
 * Main JavaScript (Vanilla ES6+, no jQuery)
 * ================================================================= */

(function () {
    'use strict';

    /* ---------------------------------------------------------
     * Smooth Scroll for anchor links
     * --------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            var headerOffset = 72;
            var elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            var offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            var nav = document.getElementById('headerNav');
            var toggle = document.getElementById('mobileToggle');
            if (nav && nav.classList.contains('is-open')) {
                nav.classList.remove('is-open');
                toggle.classList.remove('is-active');
                document.body.style.overflow = '';
            }
        });
    });


    /* ---------------------------------------------------------
     * Mobile Menu Toggle
     * --------------------------------------------------------- */
    var mobileToggle = document.getElementById('mobileToggle');
    var headerNav = document.getElementById('headerNav');

    if (mobileToggle && headerNav) {
        mobileToggle.addEventListener('click', function () {
            this.classList.toggle('is-active');
            headerNav.classList.toggle('is-open');
            document.body.style.overflow = headerNav.classList.contains('is-open') ? 'hidden' : '';
        });
    }


    /* ---------------------------------------------------------
     * Active Nav Link on Scroll
     * --------------------------------------------------------- */
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        var scrollPos = window.pageYOffset + 150;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();


    /* ---------------------------------------------------------
     * Scroll Reveal (Intersection Observer)
     * --------------------------------------------------------- */
    var reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        reveals.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: just show everything
        reveals.forEach(function (el) {
            el.classList.add('is-visible');
        });
    }


    /* ---------------------------------------------------------
     * Header background on scroll
     * --------------------------------------------------------- */
    var header = document.getElementById('header');

    function updateHeader() {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

})();
