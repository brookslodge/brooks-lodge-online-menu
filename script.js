// ============================================
// BROOKS LODGE & SPA - MENU WEBSITE SCRIPTS
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initIntersectionObserver();
    initSmoothScrolling();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const nav = document.querySelector('.floating-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Mobile menu toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking a link
        links.forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Scroll effect for navigation
    let lastScrollTop = 0;
    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    // Parallax effect for background images
    const sectionBackgrounds = document.querySelectorAll('.section-background');

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        sectionBackgrounds.forEach(bg => {
            const section = bg.parentElement;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - window.innerHeight && scrollY <= sectionTop + sectionHeight) {
                const offset = (scrollY - sectionTop) * 0.3;
                bg.style.transform = `translateY(${offset}px)`;
            }
        });
    });

    // Fade hero on scroll
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        window.addEventListener('scroll', function () {
            const scrollY = window.scrollY;
            const heroHeight = hero.clientHeight;

            if (scrollY < heroHeight) {
                const opacity = 1 - (scrollY / heroHeight) * 1.5;
                const translateY = scrollY * 0.4;
                heroContent.style.opacity = Math.max(0, opacity);
                heroContent.style.transform = `translateY(${translateY}px)`;
            }
        });
    }
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Stagger animation for menu cards
                if (entry.target.classList.contains('menu-card')) {
                    const cards = entry.target.parentElement.querySelectorAll('.menu-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const animateElements = document.querySelectorAll('.menu-card, .section-header');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.floating-nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', function () {
    document.body.classList.add('loaded');

    // Remove any loading states
    document.querySelectorAll('.loading').forEach(el => {
        el.classList.remove('loading');
    });
});

// ============================================
// TOUCH DEVICE DETECTION
// ============================================
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// ============================================
// KEYBOARD NAVIGATION SUPPORT
// ============================================
document.addEventListener('keydown', function (e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const navToggle = document.querySelector('.nav-toggle');

        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// ============================================
// PRELOAD IMAGES
// ============================================
function preloadImages() {
    const imageUrls = [
        'images/food_background.png',
        'images/drinks_background.png',
        'images/coffee_background.png',
        'images/breakfast_background.png',
        'images/dessert_background.png'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Preload images after page load
window.addEventListener('load', preloadImages);
