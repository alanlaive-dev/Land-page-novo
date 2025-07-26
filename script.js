// Countdown Timer
let countdownInterval;

function startCountdown() {
    // Set countdown to 3 hours from now (fake urgency)
    let hours = 2;
    let minutes = 59;
    let seconds = 45;
    
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    countdownInterval = setInterval(() => {
        // Decrement seconds
        seconds--;
        
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            
            if (minutes < 0) {
                minutes = 59;
                hours--;
                
                if (hours < 0) {
                    // Reset to 3 hours when it reaches 0
                    hours = 2;
                    minutes = 59;
                    seconds = 45;
                }
            }
        }
        
        // Update display with leading zeros
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
    }, 1000);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for potential fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const benefitItems = document.querySelectorAll('.benefit-item');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const authorContent = document.querySelector('.author-content');
    const ctaContent = document.querySelector('.cta-content');
    
    benefitItems.forEach((item, index) => {
        item.classList.add('fade-in');
        // Add slight delay for staggered animation
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    testimonialItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    if (authorContent) {
        authorContent.classList.add('slide-in-left');
        observer.observe(authorContent);
    }
    
    if (ctaContent) {
        ctaContent.classList.add('fade-in');
        observer.observe(ctaContent);
    }
}

// Button hover effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });
    });
}

// Parallax effect for hero section (subtle)
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Add floating animation to benefit icons
function initIconAnimations() {
    const icons = document.querySelectorAll('.benefit-icon');
    
    icons.forEach((icon, index) => {
        // Add random delay and duration for more natural effect
        const delay = index * 0.5;
        const duration = 3 + (index * 0.5);
        
        icon.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    initSmoothScrolling();
    initScrollAnimations();
    initButtonEffects();
    initParallaxEffect();
    initIconAnimations();
    
    // Add loading class removal after page loads
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate any position-dependent animations if needed
    if (window.innerWidth <= 768) {
        // Mobile-specific adjustments
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
});

// Add scroll progress indicator (optional enhancement)
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #ff6b35, #f7931e);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress on load
document.addEventListener('DOMContentLoaded', initScrollProgress);
