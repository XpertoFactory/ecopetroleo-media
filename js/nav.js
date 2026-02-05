/**
 * Ecopetróleo "Impulso Dominicano" - Navigation
 * Fixed header, mobile menu, and scroll state management
 */

(function() {
    'use strict';

    window.SiteCraft = window.SiteCraft || {};

    SiteCraft.Nav = {
        // Elements
        header: null,
        toggle: null,
        mobileMenu: null,

        // State
        isMenuOpen: false,
        isScrolled: false,
        lastScrollY: 0,
        scrollThreshold: 50,

        /**
         * Initialize navigation
         */
        init: function() {
            this.cacheElements();
            if (!this.header) return;

            this.bindEvents();
            this.checkScroll();

            console.log('SiteCraft.Nav: Initialized');
        },

        /**
         * Cache DOM elements
         */
        cacheElements: function() {
            this.header = document.querySelector('.page__header');
            this.toggle = document.querySelector('.nav__toggle');
            this.mobileMenu = document.querySelector('.nav__mobile-menu');
        },

        /**
         * Bind event listeners
         */
        bindEvents: function() {
            // Mobile menu toggle
            if (this.toggle) {
                this.toggle.addEventListener('click', this.toggleMenu.bind(this));
            }

            // Close menu on link click
            if (this.mobileMenu) {
                const links = this.mobileMenu.querySelectorAll('.nav__mobile-link');
                links.forEach(link => {
                    link.addEventListener('click', this.closeMenu.bind(this));
                });
            }

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isMenuOpen) {
                    this.closeMenu();
                }
            });

            // Subscribe to scroll events
            if (SiteCraft.Events) {
                SiteCraft.Events.on('window:scroll', this.handleScroll.bind(this));
            } else {
                window.addEventListener('scroll', SiteCraft.Utils.throttle(
                    this.handleScroll.bind(this),
                    16
                ), { passive: true });
            }

            // Handle resize
            if (SiteCraft.Events) {
                SiteCraft.Events.on('window:resize', this.handleResize.bind(this));
            }
        },

        /**
         * Toggle mobile menu
         */
        toggleMenu: function() {
            this.isMenuOpen = !this.isMenuOpen;

            if (this.toggle) {
                this.toggle.classList.toggle('nav__toggle--open', this.isMenuOpen);
                this.toggle.setAttribute('aria-expanded', this.isMenuOpen);
            }

            if (this.mobileMenu) {
                this.mobileMenu.classList.toggle('nav__mobile-menu--open', this.isMenuOpen);
            }

            // Prevent body scroll when menu is open
            document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';

            // Emit event
            if (SiteCraft.Events) {
                SiteCraft.Events.emit('nav:toggle', { isOpen: this.isMenuOpen });
            }
        },

        /**
         * Close mobile menu
         */
        closeMenu: function() {
            if (!this.isMenuOpen) return;

            this.isMenuOpen = false;

            if (this.toggle) {
                this.toggle.classList.remove('nav__toggle--open');
                this.toggle.setAttribute('aria-expanded', 'false');
            }

            if (this.mobileMenu) {
                this.mobileMenu.classList.remove('nav__mobile-menu--open');
            }

            document.body.style.overflow = '';

            if (SiteCraft.Events) {
                SiteCraft.Events.emit('nav:close');
            }
        },

        /**
         * Handle scroll events
         */
        handleScroll: function(data) {
            const scrollY = data ? data.scrollY : window.scrollY;
            this.checkScroll(scrollY);
        },

        /**
         * Check scroll position and update header state
         * @param {number} scrollY - Current scroll position
         */
        checkScroll: function(scrollY = window.scrollY) {
            const shouldBeScrolled = scrollY > this.scrollThreshold;

            if (shouldBeScrolled !== this.isScrolled) {
                this.isScrolled = shouldBeScrolled;

                if (this.header) {
                    this.header.classList.toggle('page__header--scrolled', this.isScrolled);
                }

                if (SiteCraft.Events) {
                    SiteCraft.Events.emit('nav:scrolled', { isScrolled: this.isScrolled });
                }
            }

            this.lastScrollY = scrollY;
        },

        /**
         * Handle window resize
         */
        handleResize: function(data) {
            const width = data ? data.width : window.innerWidth;

            // Close mobile menu on desktop
            if (width >= 1024 && this.isMenuOpen) {
                this.closeMenu();
            }
        },

        /**
         * Set active nav item
         * @param {string} path - Current page path
         */
        setActive: function(path) {
            const links = document.querySelectorAll('.nav__link, .nav__mobile-link');

            links.forEach(link => {
                const href = link.getAttribute('href');
                const isActive = href === path ||
                    (path !== '/' && href !== '/' && path.startsWith(href));

                link.classList.toggle('nav__link--active', isActive);
            });
        },

        /**
         * Highlight current section (for single-page sections)
         * @param {string} sectionId - Section ID
         */
        highlightSection: function(sectionId) {
            const links = document.querySelectorAll('.nav__link[href^="#"]');

            links.forEach(link => {
                const href = link.getAttribute('href');
                link.classList.toggle('nav__link--active', href === '#' + sectionId);
            });
        }
    };

})();
