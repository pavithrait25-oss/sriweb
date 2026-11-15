/**
 * Sri Web Designs (SWD) - Interactive Experience Script
 * Owner: Pavithra | Hosur, Tamil Nadu
 * WhatsApp: 9566750694
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Sticky Navbar & Scroll Progress ---
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        updateActiveNavLink();
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- 2. Active Navigation Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // --- 3. Mobile Drawer Menu Navigation ---
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerClose = document.getElementById('drawerClose');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function openMobileDrawer() {
        mobileDrawer.classList.add('open');
        drawerBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileDrawer() {
        mobileDrawer.classList.remove('open');
        drawerBackdrop.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openMobileDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeMobileDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileDrawer();
        });
    });

    // --- 4. Portfolio Filter System ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // --- 5. Project Quick Details Modal ---
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalDynamicContent = document.getElementById('modalDynamicContent');
    const modalTriggers = document.querySelectorAll('.modal-trigger');

    const projectData = {
        boutique: {
            title: "Sri Boutique — Luxury Saree & Ethnic Wear Studio",
            client: "Sri Boutique (Hosur)",
            type: "Boutique & E-Commerce Catalog",
            description: "A showcase website built for silk and designer sarees. Features rich product galleries for Kanchipuram, soft silk, and cotton sarees with zoom-in details, dynamic filters, and instant WhatsApp ordering for each individual product code.",
            highlights: [
                "1-Click WhatsApp direct saree ordering with pre-filled title and SKU",
                "Instant category filtering (Silk, Designer, Bridal, Cotton)",
                "Full mobile-friendly touch carousel and responsive grid",
                "Sub-1.2s PageSpeed score on 4G mobile connections"
            ],
            liveUrl: "../index.html",
            whatsappText: "Hi Pavithra, I want a website like Sri Boutique for my store"
        },
        cake: {
            title: "Sri Homemade Cakes — Custom Cake Ordering Studio",
            client: "Sri Homemade Cakes (Hosur)",
            type: "Artisanal Bakery & Food Studio",
            description: "A specialized online cake catalogue allowing customers to choose between eggless or regular cakes, choose weights from 0.5kg to 5kg, customize flavors (Black Forest, Butterscotch, Red Velvet, etc.), and send an exact order booking to WhatsApp.",
            highlights: [
                "Custom flavor, weight, and occasion selector logic",
                "Generates detailed WhatsApp booking request in one click",
                "Category showcase: Birthday, Wedding, Cupcakes & Pastries",
                "Notice banners for lead times and delivery zones"
            ],
            liveUrl: "../../cake/index.html",
            whatsappText: "Hi Pavithra, I want a cake shop website like Sri Homemade Cakes"
        },
        portfolio: {
            title: "Elite Executive & Creator Portfolio Website",
            client: "Professional Portfolio Model",
            type: "Personal Brand & Consulting Portal",
            description: "Designed for business consultants, speakers, architects, and high-impact executives. Provides an authoritative personal brand platform with career milestones, case studies, downloadable CV, and appointment lead capture.",
            highlights: [
                "High-prestige dark and gold luxury aesthetic",
                "Interactive career milestone timeline",
                "Downloadable resume integration with tracking",
                "Direct client consultation booking form"
            ],
            liveUrl: "#contact",
            whatsappText: "Hi Pavithra, I want a personal portfolio website"
        }
    };

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const projectKey = trigger.getAttribute('data-project');
            const data = projectData[projectKey];

            if (data) {
                modalDynamicContent.innerHTML = `
                    <span class="project-tag-pill" style="margin-bottom:0.8rem; display:inline-block;">${data.type}</span>
                    <h2 style="font-size: 1.6rem; color:#fff; margin-bottom: 0.5rem;">${data.title}</h2>
                    <p style="color:var(--gold-primary); font-size:0.9rem; font-weight:600; margin-bottom: 1.2rem;">
                        <i class="fa-solid fa-building-user"></i> Client: ${data.client}
                    </p>
                    <p style="color:var(--text-secondary); line-height:1.7; margin-bottom: 1.5rem;">${data.description}</p>
                    
                    <h4 style="color:#fff; font-size:1.1rem; margin-bottom: 0.8rem;">Key Engineering Highlights:</h4>
                    <ul style="margin-bottom: 2rem; display:flex; flex-direction:column; gap:0.6rem;">
                        ${data.highlights.map(h => `<li style="display:flex; align-items:flex-start; gap:0.6rem; font-size:0.9rem; color:var(--text-secondary);"><i class="fa-solid fa-check text-gold" style="margin-top:0.25rem;"></i> ${h}</li>`).join('')}
                    </ul>

                    <div style="display:flex; gap:1rem; flex-wrap:wrap;">
                        <a href="${data.liveUrl}" target="_blank" class="btn btn-gold btn-sm">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live Website
                        </a>
                        <a href="https://wa.me/919566750694?text=${encodeURIComponent(data.whatsappText)}" target="_blank" class="btn btn-outline btn-sm">
                            <i class="fa-brands fa-whatsapp text-gold"></i> Request Quote on WhatsApp
                        </a>
                    </div>
                `;
                projectModal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        projectModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeModal();
        });
    }

    // --- 6. Contact Form Validation & WhatsApp Handshake ---
    const contactForm = document.getElementById('contactForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const serviceType = document.getElementById('serviceType').value;
            const projectDetails = document.getElementById('projectDetails').value.trim();

            let isValid = true;

            // Simple validation
            if (!fullName) {
                document.getElementById('nameError').textContent = 'Please enter your name.';
                isValid = false;
            } else {
                document.getElementById('nameError').textContent = '';
            }

            if (!phone || phone.length < 10) {
                document.getElementById('phoneError').textContent = 'Please provide a valid 10-digit phone/WhatsApp number.';
                isValid = false;
            } else {
                document.getElementById('phoneError').textContent = '';
            }

            if (!email || !email.includes('@')) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address.';
                isValid = false;
            } else {
                document.getElementById('emailError').textContent = '';
            }

            if (!projectDetails) {
                document.getElementById('detailsError').textContent = 'Please provide brief details about your project.';
                isValid = false;
            } else {
                document.getElementById('detailsError').textContent = '';
            }

            if (isValid) {
                // Prepare structured WhatsApp Message for Pavithra
                const formattedMessage = 
                    `*🌟 New Website Inquiry for Sri Web Designs (SWD)*\n\n` +
                    `👤 *Client Name:* ${fullName}\n` +
                    `📱 *Phone / WhatsApp:* ${phone}\n` +
                    `📧 *Email:* ${email}\n` +
                    `💻 *Service Required:* ${serviceType}\n` +
                    `📝 *Project Overview:* ${projectDetails}\n\n` +
                    `📍 *Sent via Sri Web Designs Website Contact Portal*`;

                const whatsappUrl = `https://wa.me/919566750694?text=${encodeURIComponent(formattedMessage)}`;

                // Show success UI
                contactForm.style.display = 'none';
                formSuccessMessage.classList.remove('d-none');

                // Redirect directly to WhatsApp after slight delay
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                }, 1000);
            }
        });
    }

    // --- 7. Smooth Scroll for all internal hash links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetEl.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
