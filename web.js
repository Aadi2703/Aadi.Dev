document.addEventListener('DOMContentLoaded', () => {

    // ── Nav scroll effect ──────────────────────────────────
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // ── Hamburger menu ─────────────────────────────────────
    const hamburger  = document.getElementById('hamburger');
    const navLinks   = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('active', isOpen);
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ── Smooth scroll for anchor links ────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = parseInt(getComputedStyle(document.documentElement)
                    .getPropertyValue('--nav-height')) || 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ── Scroll-reveal animation ────────────────────────────
    const revealElements = document.querySelectorAll('.card, .hero-content, .social-btn, .highlight-item, .stat-badge');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // animate only once
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.06}s, transform 0.6s ease ${i * 0.06}s`;
        observer.observe(el);
    });

    // Add a small CSS rule for .revealed dynamically
    const style = document.createElement('style');
    style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

});
