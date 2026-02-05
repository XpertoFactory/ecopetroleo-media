/**
 * Ecopetróleo "Impulso Dominicano" - Animations
 * Scroll reveals, counters, parallax, and manifesto effects
 */

(function() {
    'use strict';

    window.SiteCraft = window.SiteCraft || {};

    SiteCraft.Animations = {
        // Observers
        scrollObserver: null,
        manifestoObserver: null,

        // State
        countersAnimated: new Set(),

        // Configuration
        config: {
            scrollThreshold: 0.1,
            manifestoThreshold: 0.5,
            counterDuration: 2000,
            counterEasing: 'easeOutCubic'
        },

        /**
         * Initialize animations
         */
        init: function() {
            this.initScrollReveal();
            this.initManifestoReveal();
            this.initCounters();
            this.initParallax();

            console.log('SiteCraft.Animations: Initialized');
        },

        /**
         * Initialize scroll reveal for elements with .animate-on-scroll
         */
        initScrollReveal: function() {
            const elements = document.querySelectorAll('.animate-on-scroll, .animate-fade-up, .animate-fade-down, .animate-fade-left, .animate-fade-right, .animate-scale, .animate-scale-up');

            if (!elements.length) return;

            // Check for IntersectionObserver support
            if (!('IntersectionObserver' in window)) {
                // Fallback: show all elements immediately
                elements.forEach(el => el.classList.add('is-visible'));
                return;
            }

            this.scrollObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');

                        // Check if element has a counter
                        if (entry.target.hasAttribute('data-counter')) {
                            this.animateCounter(entry.target);
                        }

                        // Also check for counters inside the element
                        const counters = entry.target.querySelectorAll('[data-counter]');
                        counters.forEach(counter => this.animateCounter(counter));

                        // Unobserve after animation (one-time)
                        this.scrollObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: this.config.scrollThreshold,
                rootMargin: '0px 0px -50px 0px'
            });

            elements.forEach(el => this.scrollObserver.observe(el));
        },

        /**
         * Initialize manifesto line-by-line reveal
         */
        initManifestoReveal: function() {
            const lines = document.querySelectorAll('.manifesto__line');

            if (!lines.length) return;

            if (!('IntersectionObserver' in window)) {
                lines.forEach(el => el.classList.add('is-visible'));
                return;
            }

            this.manifestoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, {
                threshold: this.config.manifestoThreshold,
                rootMargin: '-10% 0px -10% 0px'
            });

            lines.forEach(el => this.manifestoObserver.observe(el));
        },

        /**
         * Initialize counter animations
         */
        initCounters: function() {
            const counters = document.querySelectorAll('[data-counter]');

            if (!counters.length) return;

            // Counters will be animated when they become visible via scrollObserver
            // This method sets up any additional counter-specific logic

            counters.forEach(counter => {
                // Store original value
                const value = counter.getAttribute('data-counter');
                counter.setAttribute('data-counter-value', value);

                // Set initial display to 0
                counter.textContent = '0';
            });
        },

        /**
         * Animate a counter element
         * @param {HTMLElement} element - Counter element
         */
        animateCounter: function(element) {
            const id = element.getAttribute('data-counter') || element.id || Math.random().toString();

            // Prevent re-animation
            if (this.countersAnimated.has(id)) return;
            this.countersAnimated.add(id);

            const targetValue = parseFloat(element.getAttribute('data-counter-value') || element.getAttribute('data-counter'));
            const suffix = element.getAttribute('data-counter-suffix') || '';
            const prefix = element.getAttribute('data-counter-prefix') || '';
            const decimals = parseInt(element.getAttribute('data-counter-decimals') || '0', 10);
            const duration = parseInt(element.getAttribute('data-counter-duration') || this.config.counterDuration, 10);

            let startTime = null;
            const startValue = 0;

            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;

                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (easeOutCubic)
                const easedProgress = 1 - Math.pow(1 - progress, 3);

                const currentValue = startValue + (targetValue - startValue) * easedProgress;

                // Format the number
                let displayValue;
                if (decimals > 0) {
                    displayValue = currentValue.toFixed(decimals);
                } else {
                    displayValue = Math.floor(currentValue);
                    // Add thousand separators for large numbers
                    if (displayValue >= 1000) {
                        displayValue = displayValue.toLocaleString('es-DO');
                    }
                }

                element.textContent = prefix + displayValue + suffix;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        },

        /**
         * Initialize parallax effects
         */
        initParallax: function() {
            const parallaxElements = document.querySelectorAll('.parallax');

            if (!parallaxElements.length) return;

            // Check for reduced motion preference
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }

            const updateParallax = () => {
                const scrollY = window.scrollY;

                parallaxElements.forEach(el => {
                    const speed = parseFloat(el.getAttribute('data-parallax-speed')) ||
                        parseFloat(getComputedStyle(el).getPropertyValue('--parallax-speed')) ||
                        0.2;

                    const rect = el.getBoundingClientRect();
                    const elementCenter = rect.top + rect.height / 2;
                    const viewportCenter = window.innerHeight / 2;
                    const distance = elementCenter - viewportCenter;

                    const translateY = distance * speed;

                    el.style.transform = `translateY(${translateY}px)`;
                });
            };

            // Subscribe to scroll events
            if (SiteCraft.Events) {
                SiteCraft.Events.on('window:scroll', updateParallax);
            } else {
                window.addEventListener('scroll', SiteCraft.Utils.throttle(updateParallax, 16), { passive: true });
            }

            // Initial update
            updateParallax();
        },

        /**
         * Progress bar animation
         * @param {HTMLElement} element - Progress bar element
         * @param {number} percentage - Target percentage (0-100)
         */
        animateProgress: function(element, percentage) {
            const fill = element.querySelector('.progress__fill');
            if (!fill) return;

            fill.style.width = '0%';

            // Trigger reflow
            fill.offsetHeight;

            fill.style.width = percentage + '%';
            fill.classList.add('is-animated');
        },

        /**
         * Typewriter effect
         * @param {HTMLElement} element - Element to animate
         * @param {string} text - Text to type
         * @param {number} speed - Typing speed in ms
         */
        typewriter: function(element, text, speed = 50) {
            element.textContent = '';
            element.classList.add('typewriter');

            let i = 0;
            const type = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    element.classList.remove('typewriter');
                }
            };

            type();
        },

        /**
         * Trigger animation programmatically
         * @param {string|HTMLElement} target - Element or selector
         * @param {string} animation - Animation class to add
         */
        trigger: function(target, animation) {
            const el = typeof target === 'string' ? document.querySelector(target) : target;
            if (!el) return;

            el.classList.add(animation);
            el.classList.add('is-visible');
        },

        /**
         * Reset animation
         * @param {string|HTMLElement} target - Element or selector
         */
        reset: function(target) {
            const el = typeof target === 'string' ? document.querySelector(target) : target;
            if (!el) return;

            el.classList.remove('is-visible');

            // Re-observe if observer exists
            if (this.scrollObserver) {
                this.scrollObserver.observe(el);
            }
        },

        /**
         * Destroy observers and cleanup
         */
        destroy: function() {
            if (this.scrollObserver) {
                this.scrollObserver.disconnect();
            }
            if (this.manifestoObserver) {
                this.manifestoObserver.disconnect();
            }
            this.countersAnimated.clear();
        }
    };

})();
