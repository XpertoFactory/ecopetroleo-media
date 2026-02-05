/**
 * Ecopetróleo "Impulso Dominicano" - Main JavaScript
 * SiteCraft namespace and initialization
 */

// SiteCraft Namespace
window.SiteCraft = window.SiteCraft || {};

/**
 * Main initialization
 */
SiteCraft.init = function() {
    // Initialize modules
    if (SiteCraft.Nav) SiteCraft.Nav.init();
    if (SiteCraft.Animations) SiteCraft.Animations.init();

    // Mark page as loaded
    document.body.classList.add('is-loaded');

    console.log('SiteCraft: Initialized');
};

/**
 * Utility Functions
 */
SiteCraft.Utils = {
    /**
     * Debounce function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function}
     */
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in ms
     * @returns {Function}
     */
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Get scroll percentage
     * @returns {number} - Scroll percentage (0-100)
     */
    getScrollPercent: function() {
        const h = document.documentElement;
        const b = document.body;
        const st = 'scrollTop';
        const sh = 'scrollHeight';
        return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
    },

    /**
     * Check if element is in viewport
     * @param {HTMLElement} el - Element to check
     * @param {number} offset - Offset from viewport edge
     * @returns {boolean}
     */
    isInViewport: function(el, offset = 0) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
            rect.bottom >= offset
        );
    },

    /**
     * Smooth scroll to element
     * @param {string|HTMLElement} target - Target element or selector
     * @param {number} offset - Offset from top
     */
    scrollTo: function(target, offset = 80) {
        const el = typeof target === 'string' ? document.querySelector(target) : target;
        if (!el) return;

        const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    },

    /**
     * Format number with locale
     * @param {number} num - Number to format
     * @returns {string}
     */
    formatNumber: function(num) {
        return new Intl.NumberFormat('es-DO').format(num);
    },

    /**
     * Parse data attributes to object
     * @param {HTMLElement} el - Element with data attributes
     * @returns {Object}
     */
    parseData: function(el) {
        const data = {};
        for (const attr of el.attributes) {
            if (attr.name.startsWith('data-')) {
                const key = attr.name.slice(5).replace(/-([a-z])/g, g => g[1].toUpperCase());
                data[key] = attr.value;
            }
        }
        return data;
    }
};

/**
 * Event Handlers
 */
SiteCraft.Events = {
    handlers: {},

    /**
     * Subscribe to custom event
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    on: function(event, callback) {
        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }
        this.handlers[event].push(callback);
    },

    /**
     * Unsubscribe from custom event
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    off: function(event, callback) {
        if (!this.handlers[event]) return;
        this.handlers[event] = this.handlers[event].filter(cb => cb !== callback);
    },

    /**
     * Emit custom event
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    emit: function(event, data) {
        if (!this.handlers[event]) return;
        this.handlers[event].forEach(callback => callback(data));
    }
};

/**
 * DOM Ready Handler
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', SiteCraft.init);
} else {
    SiteCraft.init();
}

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        SiteCraft.Events.emit('page:hidden');
    } else {
        SiteCraft.Events.emit('page:visible');
    }
});

/**
 * Handle resize with debounce
 */
window.addEventListener('resize', SiteCraft.Utils.debounce(function() {
    SiteCraft.Events.emit('window:resize', {
        width: window.innerWidth,
        height: window.innerHeight
    });
}, 250));

/**
 * Handle scroll with throttle
 */
window.addEventListener('scroll', SiteCraft.Utils.throttle(function() {
    SiteCraft.Events.emit('window:scroll', {
        scrollY: window.scrollY,
        scrollPercent: SiteCraft.Utils.getScrollPercent()
    });
}, 16), { passive: true });
