// Sorelle JavaScript - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Navigation Effects ==========
    const header = document.querySelector('.menu');
    const logo = document.querySelector('.logo');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(250, 247, 245, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(212, 165, 116, 0.15)';
            header.style.borderBottom = '1px solid rgba(212, 165, 116, 0.2)';
        } else {
            header.style.background = 'rgba(250, 247, 245, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(212, 165, 116, 0.08)';
            header.style.borderBottom = '1px solid rgba(212, 165, 116, 0.1)';
        }
    });
    
    // Logo click effect
    logo.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        }, 100);
    });
    
    // ========== Smooth Scrolling ==========
    function smoothScroll(target, duration = 800) {
        const targetPosition = target.offsetTop - 80; // Account for fixed header
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        // Easing function
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // ========== Button Interactions ==========
    const buttons = document.querySelectorAll('button, .btn');
    
    buttons.forEach(button => {
        // Click ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Hover sound effect (visual feedback)
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
    
    // Add ripple CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        button, .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ========== Feature Cards Animation ==========
    const featureCards = document.querySelectorAll('.feature');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation delay
                const index = Array.from(featureCards).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // ========== Hero Image Animation ==========
    const heroImage = document.querySelector('.hero-img img');
    if (heroImage) {
        heroImage.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Parallax effect on scroll
        window.addEventListener('scroll', function() {
            if (heroImage) {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.1;
                heroImage.style.transform = `translateY(${parallax}px) scale(1)`;
            }
        });
    }
    
    // ========== Text Typing Animation ==========
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Apply typing effect to hero subtitle (if needed)
    const heroSubtitle = document.querySelector('.hero-text p');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.style.opacity = '0';
        
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            // Uncomment below for typing effect
            // typeWriter(heroSubtitle, originalText, 30);
        }, 1000);
    }
    
    // ========== Color Theme Switcher (Optional) ==========
    let currentTheme = 'warm';
    
    function switchTheme() {
        const root = document.documentElement;
        
        if (currentTheme === 'warm') {
            // Cool theme
            root.style.setProperty('--primary-gradient', 'linear-gradient(135deg, #c7b8d4, #a8b5a0)');
            root.style.setProperty('--accent-color', '#c7b8d4');
            currentTheme = 'cool';
        } else {
            // Warm theme (default)
            root.style.setProperty('--primary-gradient', 'linear-gradient(135deg, #d4a574, #b8956a)');
            root.style.setProperty('--accent-color', '#d4a574');
            currentTheme = 'warm';
        }
    }
    
    // ========== Loading Animation ==========
    function showPageLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">Sorelle</div>
                <div class="loader-spinner"></div>
                <div class="loader-text">Preparing your style journey...</div>
            </div>
        `;
        document.body.appendChild(loader);
        
        // Add loader styles
        const loaderStyle = document.createElement('style');
        loaderStyle.textContent = `
            .page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #f8f4f0 0%, #faf7f5 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                opacity: 1;
                transition: opacity 0.5s ease;
            }
            
            .loader-content {
                text-align: center;
            }
            
            .loader-logo {
                font-size: 3rem;
                font-weight: 700;
                background: linear-gradient(135deg, #d4a574, #b8956a);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 2rem;
                animation: pulse 2s ease-in-out infinite;
            }
            
            .loader-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid rgba(212, 165, 116, 0.3);
                border-top: 4px solid #d4a574;
                border-radius: 50%;
                margin: 0 auto 1rem;
                animation: spin 1s linear infinite;
            }
            
            .loader-text {
                color: #6b5b73;
                font-size: 1rem;
                animation: fadeInOut 2s ease-in-out infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            @keyframes fadeInOut {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(loaderStyle);
        
        // Hide loader after page load
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 2000);
    }
    
    // ========== Error Handling ==========
    window.addEventListener('error', function(e) {
        console.log('Sorelle: Handling gracefully -', e.message);
    });
    
    // ========== Performance Optimization ==========
    // Throttle scroll events
    function throttle(func, wait) {
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
    
    // Apply throttling to scroll events
    const throttledScroll = throttle(function() {
        // Scroll-based animations here
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScroll);
    
    // ========== Accessibility Enhancements ==========
    // Focus management
    const focusableElements = document.querySelectorAll('button, a, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #d4a574';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });
    
    // ========== Initialize ==========
    console.log('✨ Sorelle JavaScript loaded successfully!');
    
    // Optional: Show loader on first visit
    // showPageLoader();
    
    // Add fade-in animation to page content
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});