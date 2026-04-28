document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio Hub initialized');
    
    initNavigation();
    initMobileMenu();
    initSmoothScroll();
    initPortfolioCards();
    initPageTransition();
    initScrollEffects();
});

function initNavigation() {

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                const sectionId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLink = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        hamburger.classList.toggle('active');
    });
    
    navLink.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initPortfolioCards() {
    const cards = document.querySelectorAll('.portfolio-card');
    
    cards.forEach((card, index) => {

        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('click', function(event) {
            // Check if click target is a link or inside a link
            if (event.target.closest('a')) {
                return;
            }
            
            card.style.transition = 'all 0.3s ease-out';
            
            card.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 300);
        });
        
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

function initPageTransition() {
    const viewPortfolioButtons = document.querySelectorAll('.view-portfolio-btn');
    const modalOverlay = document.getElementById('portfolioModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalOpenBtn = document.getElementById('modalOpenBtn');
    const portfolioIframe = document.getElementById('portfolioIframe');
    const iframeLoader = document.getElementById('iframeLoader');
    const iframeBlocked = document.getElementById('iframeBlocked');
    const modalTitle = document.getElementById('modalTitle');

    // Handle View Portfolio button clicks
    viewPortfolioButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            const portfolioUrl = this.getAttribute('data-url');
            const portfolioTitle = this.getAttribute('data-title');
            
            openModal(portfolioUrl, portfolioTitle);
        });
    });

    // Handle Close button
    modalCloseBtn.addEventListener('click', closeModal);

    // Handle Open Webpage button
    modalOpenBtn.addEventListener('click', function(event) {
        const url = this.getAttribute('href');
        if (url) {
            window.open(url, '_blank');
        }
    });

    // Close modal when clicking outside the container
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    // Handle iframe load
    portfolioIframe.addEventListener('load', function() {
        iframeLoader.classList.add('hidden');
        portfolioIframe.classList.add('loaded');
    });

    // Handle iframe error (CORS or blocked)
    portfolioIframe.addEventListener('error', function() {
        showBlockedMessage();
    });

    function openModal(url, title) {
        // Reset modal state
        iframeLoader.classList.remove('hidden');
        iframeBlocked.classList.remove('show');
        portfolioIframe.classList.remove('loaded');
        
        // Set modal content
        modalTitle.textContent = title;
        modalOpenBtn.setAttribute('href', url);
        portfolioIframe.src = url;
        
        // Show modal with animation
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear iframe
        setTimeout(() => {
            portfolioIframe.src = '';
        }, 300);
    }

    function showBlockedMessage() {
        iframeLoader.classList.add('hidden');
        iframeBlocked.classList.add('show');
        portfolioIframe.classList.remove('loaded');
    }
}

function initScrollEffects() {

    const cards = document.querySelectorAll('.portfolio-card');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
 
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else { 
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
            }
        });
    }, {
        threshold: 0.1  
    });
    
    // Observe all cards
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'h' || event.key === 'H') {
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            homeSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    if (event.key === 'p' || event.key === 'P') {
        const portfoliosSection = document.querySelector('#portfolios');
        if (portfoliosSection) {
            portfoliosSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

console.log('%cPortfolio Hub Parent Website', 'font-size: 20px; font-weight: bold; color: #0066ff;');
console.log('%cA modern, responsive multi-portfolio system', 'font-size: 14px; color: #666;');
console.log('%cPress H to go to home, P to go to portfolios', 'font-size: 12px; color: #999;');
console.log('%cOpen and customize this file to add your own features!', 'font-size: 12px; color: #999; font-style: italic;');
