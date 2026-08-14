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
            // Change hamburger to X
            hamburger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburger.children[1].style.opacity = '0';
            hamburger.children[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            mobileMenu.classList.remove('active');
            // Reset hamburger
            hamburger.children[0].style.transform = 'none';
            hamburger.children[1].style.opacity = '1';
            hamburger.children[2].style.transform = 'none';
            document.body.style.overflow = '';
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });


    // --- Scroll Animations (Intersection Observer) ---
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
                // Optional: Stop observing once visible if you only want it to animate once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));


    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Account for fixed header height
                const headerHeight = document.querySelector('.header').offsetHeight;
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
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // --- Draggable Floating Instagram Button ---
    const igBtn = document.querySelector('.floating-ig');
    if (igBtn) {
        let isDragging = false;
        let startX, startY, initialX, initialY;
        let dragged = false;

        // Restore position from localStorage
        const savedLeft = localStorage.getItem('igBtnLeft');
        const savedTop = localStorage.getItem('igBtnTop');
        
        if (savedLeft && savedTop) {
            igBtn.style.bottom = 'auto';
            igBtn.style.right = 'auto';
            igBtn.style.left = savedLeft;
            igBtn.style.top = savedTop;
        }

        // Prevent native dragging of the anchor tag
        igBtn.addEventListener('dragstart', (e) => e.preventDefault());

        const dragStart = (e) => {
            // Prevent default only for mouse to avoid native drag selection
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
            igBtn.style.transition = 'none'; // Disable transition for smooth dragging
        };

        const drag = (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevent scrolling while dragging
            dragged = true;

            let currentX, currentY;
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            // Keep within screen bounds
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
            igBtn.style.cursor = 'grab';
            igBtn.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'; 

            // Save position
            if (dragged) {
                localStorage.setItem('igBtnLeft', igBtn.style.left);
                localStorage.setItem('igBtnTop', igBtn.style.top);
                // Reset dragged state after click event has a chance to fire
                setTimeout(() => { dragged = false; }, 100);
            }
        };

        // Prevent click if it was dragged
        igBtn.addEventListener('click', (e) => {
            if (dragged) {
                e.preventDefault();
            }
        });

        // Mouse Events
        igBtn.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        // Touch Events
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
    
    // Add to header actions
    const headerActions = document.querySelector('.header-actions');
    if(headerActions) {
        headerActions.appendChild(themeToggle);
    }

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
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

    const clickables = document.querySelectorAll('a, button, .nav-link, .btn, .logo, .floating-ig');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    // --- Smooth Page Transitions ---
    const transitionEl = document.createElement('div');
    transitionEl.classList.add('page-transition');
    document.body.appendChild(transitionEl);

    // Fade in on load
    window.addEventListener('pageshow', () => {
        transitionEl.classList.remove('active');
    });

    // Fade out on navigation
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');
            // Don't transition on external links, hash links, or new tabs
            if (target.startsWith('http') || target.startsWith('#') || target.startsWith('mailto') || link.target === '_blank') return;
            
            e.preventDefault();
            transitionEl.classList.add('active');
            setTimeout(() => {
                window.location.href = target;
            }, 400); // matches CSS transition duration
        });
    });

});
