/* ==========================================================================
   Avolo - Interactivity & Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.add('active');
            hamburger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburger.children[1].style.opacity = '0';
            hamburger.children[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('active');
            hamburger.children[0].style.transform = 'none';
            hamburger.children[1].style.opacity = '1';
            hamburger.children[2].style.transform = 'none';
            document.body.style.overflow = '';
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // --- Active Nav Link Highlighting (Improv 2) ---
    const navLinks = document.querySelectorAll('.nav-link');
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '') currentPath = 'index.html';
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.setAttribute('aria-current', 'page');
            link.classList.add('active');
        }
    });

    // --- Toast Notification System (Bug 1 & Improv 1) ---
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span><span class="toast-text">${message}</span>`;
        document.body.appendChild(toast);
        
        // Trigger reflow
        void toast.offsetWidth;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // Check URL for form success
    if (window.location.search.includes('success=true')) {
        showToast('Your message has been sent successfully!', 'success');
        // Clean URL without refreshing
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // --- Scroll Animations ---
    const fadeElements = document.querySelectorAll('.fade-up');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));


    // --- Smooth Scrolling for Anchor Links (Bug 9) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Regex check for valid CSS selector to prevent DOMException
            if (targetId === '#' || !/^#[a-zA-Z0-9_-]+$/.test(targetId)) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }

    // --- Scroll to Top Button (Improv 4) ---
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn btn-icon';
    scrollTopBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // --- Draggable Floating Instagram Button (Bug 8) ---
    const igBtn = document.querySelector('.floating-ig');
    if (igBtn) {
        let isDragging = false;
        let startX, startY, initialX, initialY;
        let dragged = false;

        const savedLeft = localStorage.getItem('igBtnLeft');
        const savedTop = localStorage.getItem('igBtnTop');
        
        if (savedLeft && savedTop) {
            igBtn.style.bottom = 'auto';
            igBtn.style.right = 'auto';
            igBtn.style.left = savedLeft;
            igBtn.style.top = savedTop;
        }

        igBtn.addEventListener('dragstart', (e) => e.preventDefault());

        const dragStart = (e) => {
            if (e.type === 'mousedown') {
                e.preventDefault();
            }
            if (e.type === 'touchstart') {
                initialX = e.touches[0].clientX - igBtn.getBoundingClientRect().left;
                initialY = e.touches[0].clientY - igBtn.getBoundingClientRect().top;
            } else {
                initialX = e.clientX - igBtn.getBoundingClientRect().left;
                initialY = e.clientY - igBtn.getBoundingClientRect().top;
            }
            isDragging = true;
            dragged = false;
            igBtn.style.cursor = 'grabbing';
            igBtn.style.transition = 'none'; 
        };

        const drag = (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevents scroll on touch
            dragged = true;
            
            let currentX, currentY;
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            const maxX = window.innerWidth - igBtn.offsetWidth;
            const maxY = window.innerHeight - igBtn.offsetHeight;
            
            currentX = Math.max(0, Math.min(currentX, maxX));
            currentY = Math.max(0, Math.min(currentY, maxY));

            igBtn.style.bottom = 'auto';
            igBtn.style.right = 'auto';
            igBtn.style.left = `${currentX}px`;
            igBtn.style.top = `${currentY}px`;
        };

        const dragEnd = (e) => {
            if (!isDragging) return;
            isDragging = false;
            igBtn.style.cursor = 'pointer';
            igBtn.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'; 

            if (dragged) {
                localStorage.setItem('igBtnLeft', igBtn.style.left);
                localStorage.setItem('igBtnTop', igBtn.style.top);
                setTimeout(() => { dragged = false; }, 100);
            }
        };

        igBtn.addEventListener('click', (e) => {
            if (dragged) {
                e.preventDefault();
            }
        });

        igBtn.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        igBtn.addEventListener('touchstart', dragStart, { passive: false });
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', dragEnd);
    }

    // --- Dark Mode Toggle ---
    const themeToggle = document.createElement('button');
    themeToggle.className = 'btn btn-icon theme-toggle';
    themeToggle.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    themeToggle.style.marginLeft = '1rem';
    themeToggle.style.background = 'transparent';
    themeToggle.style.border = 'none';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.color = 'inherit';
    themeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
    
    const headerActions = document.querySelector('.header-actions');
    if(headerActions) {
        headerActions.appendChild(themeToggle);
    }

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        // Document head script already handles applying the theme
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        }
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        }
    });

    // --- Custom Cursor ---
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const clickables = document.querySelectorAll('a, button, .nav-link, .btn, .logo, .floating-ig, label');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    // --- Smooth Page Transitions (Bug 2) ---
    const transitionEl = document.createElement('div');
    transitionEl.classList.add('page-transition');
    document.body.appendChild(transitionEl);
    
    let isTransitioning = false;

    window.addEventListener('pageshow', () => {
        transitionEl.classList.remove('active');
        isTransitioning = false;
    });

    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');
            // Prevent on external, hash, mailto, tel, or target blank
            if (target.startsWith('http') || target.startsWith('#') || target.startsWith('mailto') || target.startsWith('tel:') || link.target === '_blank') return;
            
            if (isTransitioning) {
                e.preventDefault();
                return;
            }

            e.preventDefault();
            isTransitioning = true;
            transitionEl.classList.add('active');
            setTimeout(() => {
                window.location.href = target;
            }, 400); 
        });
    });

    // --- Animated Number Counters (Bug 6) ---
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endVal = parseInt(target.getAttribute('data-target'));
                
                if (isNaN(endVal)) return;

                let currentVal = 0;
                const increment = endVal / 40;
                const updateCounter = () => {
                    currentVal += increment;
                    if (currentVal < endVal) {
                        target.innerText = Math.ceil(currentVal);
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.innerText = endVal;
                    }
                };
                updateCounter();
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));

    // --- Magnetic Buttons (Bug 3) ---
    const magneticButtons = document.querySelectorAll('.btn:not(.theme-toggle)');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transition = 'none'; // Prevent CSS lag during move
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';
            btn.style.transform = `translate(0px, 0px)`;
            // Reset transition property so CSS handles it normally
            setTimeout(() => { btn.style.transition = ''; }, 300);
        });
    });

    // --- Pricing Estimator (Bug 4 & Improv 6) ---
    const estCheckboxes = document.querySelectorAll('.estimator-box input[type="checkbox"]');
    const estTotalDisplay = document.getElementById('est-total');
    if (estCheckboxes.length > 0 && estTotalDisplay) {
        // Dynamically get base price from initial display to prevent sync bugs
        let currentTotal = parseInt(estTotalDisplay.innerText.replace(/,/g, '')) || 20000;
        let basePrice = currentTotal;
        
        const animatePrice = (start, end) => {
            let current = start;
            const step = (end - start) / 20;
            const update = () => {
                current += step;
                if ((step > 0 && current < end) || (step < 0 && current > end)) {
                    estTotalDisplay.innerText = Math.ceil(current).toLocaleString('en-IN');
                    requestAnimationFrame(update);
                } else {
                    estTotalDisplay.innerText = end.toLocaleString('en-IN');
                }
            };
            update();
        };

        const updateTotal = () => {
            let targetTotal = basePrice;
            estCheckboxes.forEach(box => {
                if(box.checked) targetTotal += parseInt(box.value);
            });
            
            const startVal = parseInt(estTotalDisplay.innerText.replace(/,/g, ''));
            animatePrice(startVal, targetTotal);
        };
        
        estCheckboxes.forEach(box => box.addEventListener('change', updateTotal));
    }

    // --- Testimonial Carousel Navigation ---
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    
    if (testimonialsGrid && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            testimonialsGrid.scrollBy({ left: -320, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            testimonialsGrid.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }

    // --- Premium 3D Mouse Tracking (Tilt Effect) ---
    // Note: .hero-visual img is excluded to preserve CSS float3d animation
    const tiltElements = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .pricing-card');
    
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        tiltElements.forEach(el => {
            el.style.willChange = 'transform';
            
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
                const rotateY = ((x - centerX) / centerX) * 6;
                
                el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
                el.style.transition = 'transform 0.1s ease-out';
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
                el.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            });
        });
    }


    // Project Estimator Logic
    const estForm = document.getElementById('estimator-form');
    if (estForm) {
        const steps = estForm.querySelectorAll('.form-step');
        const nextBtns = estForm.querySelectorAll('.next-step');
        const prevBtns = estForm.querySelectorAll('.prev-step');
        const estBtns = estForm.querySelectorAll('.est-btn');
        let currentStep = 0;

        estBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                // Deselect siblings
                estForm.querySelectorAll(`.est-btn[data-type="${type}"]`).forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                
                // Set hidden input value
                if (type === 'type') document.getElementById('project-type-input').value = this.getAttribute('data-val');
                if (type === 'budget') document.getElementById('budget-input').value = this.getAttribute('data-val');

                // Enable next button for current step
                const nextBtn = steps[currentStep].querySelector('.next-step');
                if(nextBtn) {
                    nextBtn.disabled = false;
                    nextBtn.classList.remove('btn-outline');
                    nextBtn.classList.add('btn-primary');
                }
            });
        });

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                steps[currentStep].style.display = 'none';
                currentStep++;
                steps[currentStep].style.display = 'block';
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                steps[currentStep].style.display = 'none';
                currentStep--;
                steps[currentStep].style.display = 'block';
            });
        });
    }
});
