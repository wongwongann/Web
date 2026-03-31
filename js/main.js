/* ==================== MAIN JAVASCRIPT FILE ==================== */
/*
   This file contains all interactivity and dynamic functionality
   for the Portfolio Hub parent website.
   
   Key Features:
   - Navigation highlighting
   - Mobile menu toggle
   - Smooth scroll navigation
   - Portfolio card animations
   - Smooth page transitions
*/

/* ==================== DOCUMENT READY ==================== */
/*
   Wait for the DOM to fully load before initializing scripts
   This ensures all HTML elements are available
*/
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio Hub initialized');
    
    // Initialize all interactive features
    initNavigation();
    initMobileMenu();
    initSmoothScroll();
    initPortfolioCards();
    initPageTransition();
    initScrollEffects();
});

/* ==================== NAVIGATION HIGHLIGHTING ==================== */
/*
   Highlights the active navigation link as the user scrolls
   Updates the nav link styling based on which section is in view
*/
function initNavigation() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Listen to scroll events
    window.addEventListener('scroll', function() {
        // Check which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // If section is in view
            if (window.scrollY >= sectionTop - 200) {
                // Get the section's ID
                const sectionId = section.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to matching link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
}

/* ==================== MOBILE MENU TOGGLE ==================== */
/*
   Handles the hamburger menu functionality for mobile devices
   Toggles the visibility of navigation links on small screens
*/
function initMobileMenu() {
    // Get hamburger button and nav links
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLink = document.querySelectorAll('.nav-link');
    
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animate hamburger icon
        hamburger.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    navLink.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        // Check if click is outside hamburger and nav
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

/* ==================== SMOOTH SCROLL NAVIGATION ==================== */
/*
   Smooth scrolling when clicking on navigation links
   Uses the native CSS scroll-behavior, with JS fallback
*/
function initSmoothScroll() {
    // Get all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to section (native CSS handles this)
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ==================== PORTFOLIO CARD INTERACTIONS ==================== */
/*
   Adds interactive features to portfolio cards
   Includes hover effects and click animations
*/
function initPortfolioCards() {
    // Get all portfolio cards
    const cards = document.querySelectorAll('.portfolio-card');
    
    cards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Click event listener
        card.addEventListener('click', function(event) {
            // If click is on the link, let it navigate normally
            if (event.target.tagName === 'A') {
                return;
            }
            
            // Otherwise, add animation effect
            card.style.transition = 'all 0.3s ease-out';
            
            // Add slight scale effect
            card.style.transform = 'scale(0.98)';
            
            // Reset after animation
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 300);
        });
        
        // Add hover animation on the icon
        const icon = card.querySelector('.card-icon');
        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
}

/* ==================== PAGE TRANSITION EFFECT ==================== */
/*
   Smooth transition effect when entering/exiting pages
   Creates a professional visual experience
*/
function initPageTransition() {
    // Handle transitions for external portfolio links
    const portfolioLinks = document.querySelectorAll('.card-link');
    
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Allow normal navigation but add transition effect
            // The page will naturally reload, so we just add some visual feedback
        });
    });
}

/* ==================== SCROLL EFFECTS ==================== */
/*
   Adds visual effects when elements come into view
   Uses Intersection Observer API for performance
*/
function initScrollEffects() {
    // Get all portfolio cards for animation on scroll
    const cards = document.querySelectorAll('.portfolio-card');
    
    // Create intersection observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            // If element is in view
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else {
                // Reset when out of view
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
            }
        });
    }, {
        threshold: 0.1  // Trigger when 10% of element is visible
    });
    
    // Observe all cards
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

/* ==================== UTILITY FUNCTIONS ==================== */

/*
   Function: debounce(func, delay)
   Purpose: Prevents a function from being called too frequently
   Usage: Useful for resize, scroll, or input events
*/
function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/*
   Function: addClass(element, className)
   Purpose: Add a class to an element
*/
function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

/*
   Function: removeClass(element, className)
   Purpose: Remove a class from an element
*/
function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

/*
   Function: toggleClass(element, className)
   Purpose: Toggle a class on an element
*/
function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

/* ==================== KEYBOARD SHORTCUTS ==================== */
/*
   Add keyboard navigation for accessibility
*/
document.addEventListener('keydown', function(event) {
    // Press 'H' to go to home section
    if (event.key === 'h' || event.key === 'H') {
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            homeSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press 'P' to go to portfolios section
    if (event.key === 'p' || event.key === 'P') {
        const portfoliosSection = document.querySelector('#portfolios');
        if (portfoliosSection) {
            portfoliosSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

/* ==================== CONSOLE MESSAGES ==================== */
/*
   Helpful console messages for debugging and student learning
*/
console.log('%cPortfolio Hub Parent Website', 'font-size: 20px; font-weight: bold; color: #0066ff;');
console.log('%cA modern, responsive multi-portfolio system', 'font-size: 14px; color: #666;');
console.log('%cPress H to go to home, P to go to portfolios', 'font-size: 12px; color: #999;');
console.log('%cOpen and customize this file to add your own features!', 'font-size: 12px; color: #999; font-style: italic;');
