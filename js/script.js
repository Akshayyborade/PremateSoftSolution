// script.js
console.log("Welcome to my website!");

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        const scrollThreshold = 50;
        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu functionality
    const initMobileMenu = () => {
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (!menuBtn || !navLinks) return;

        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    };

    // Smooth scroll functionality
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (!target) return;

                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800;
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }

                function easeInOutCubic(t) {
                    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }

                requestAnimationFrame(animation);
            });
        });
    };

    // Particles.js initialization
    const initParticles = () => {
        const particlesContainer = document.getElementById('particles-js');
        if (!particlesContainer || typeof particlesJS === 'undefined') return;

        try {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: '#ffffff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.1, random: false },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#ffffff',
                        opacity: 0.1,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 0.3 } },
                        push: { particles_nb: 4 }
                    }
                },
                retina_detect: true
            });
        } catch (error) {
            console.error('Failed to initialize particles:', error);
        }
    };

    // Floating cards animation
    const initFloatingCards = () => {
        const floatingCards = document.querySelectorAll('.floating-card');
        if (!floatingCards.length) return;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(2deg); }
                100% { transform: translateY(0) rotate(0deg); }
            }
        `;
        document.head.appendChild(style);

        floatingCards.forEach((card, index) => {
            const delay = index * 0.2;
            const duration = 3 + Math.random() * 2;
            card.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
    };

    // Statistics animation
    const initStatsAnimation = () => {
        const stats = document.querySelectorAll('.stat-number');
        const statsSection = document.querySelector('.hero-stats');
        if (!stats.length || !statsSection) return;

        let animated = false;

        const animateStats = () => {
            if (animated) return;
            animated = true;

            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-value') || stat.textContent);
                if (isNaN(target)) return;

                let current = 0;
                const increment = target / 50;
                const duration = 1500;
                const stepTime = duration / 50;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target.toLocaleString();
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(current).toLocaleString();
                    }
                }, stepTime);
            });
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(statsSection);
    };

    // Portfolio filter
    const initPortfolioFilter = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        if (!filterButtons.length || !portfolioItems.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');
                if (!filterValue) return;

                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    const shouldShow = filterValue === 'all' || itemCategory === filterValue;

                    item.style.opacity = shouldShow ? '1' : '0';
                    item.style.transform = shouldShow ? 'scale(1)' : 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.display = shouldShow ? 'block' : 'none';
                    }, shouldShow ? 0 : 500);
                });
            });
        });
    };

    // Back to top button
    const initBackToTop = () => {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;

        const toggleBackToTop = () => {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        };

        window.addEventListener('scroll', toggleBackToTop);
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    // Contact form handling
    const initContactForm = () => {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const submitButton = form.querySelector('button[type="submit"]');
            
            try {
                submitButton.disabled = true;
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) throw new Error('Failed to submit form');
                
                const data = await response.json();
                alert('Message sent successfully!');
                form.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Failed to send message. Please try again later.');
            } finally {
                submitButton.disabled = false;
            }
        });
    };

    // Initialize all components
    try {
        initMobileMenu();
        initSmoothScroll();
        initParticles();
        initFloatingCards();
        initStatsAnimation();
        initPortfolioFilter();
        initBackToTop();
        initContactForm();
    } catch (error) {
        console.error('Error initializing components:', error);
    }
});
