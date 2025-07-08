document.addEventListener('DOMContentLoaded', function() {

    // Mobile menu (hamburger) functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Sticky header on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Service packages data
    const pricingData = [
        {
            title: "Launch Essentials",
            price: "450",
            originalPrice: "600",
            perfectFor: "For new e-commerce ventures ready to make their first sales.",
            deliverables: [
                "Platform consultation & setup",
                "Pre-built theme installation",
                "Product upload (up to 10)",
                "Payment & shipping configuration",
                "First-Month Hypercare Support",
                "Managed hosting & SSL certificate",
                "Analytics & tracking setup",
                "Launch checklist & Onboarding workshop"
            ]
        },
        {
            title: "Foundation Framework",
            price: "950",
            originalPrice: "1300",
            perfectFor: "For startups looking to establish a strong, branded presence.",
            includes: "Includes all Launch Essentials deliverables, plus:",
            deliverables: [
                "Custom responsive theme",
                "UI/UX enhancements",
                "Extended catalog (up to 30)",
                "Advanced payment & shipping configuration",
                "On-page SEO groundwork",
                "Performance & Security Sprint",
                "Quality assurance & testing",
                "Full QA & 30-day hypercare support"
            ]
        },
        {
            title: "Premium Growth",
            price: "1150",
            originalPrice: "1700",
            perfectFor: "For scaling brands focused on conversion and optimization.",
            includes: "Includes all Foundation Framework deliverables, plus:",
            deliverables: [
                "UX/CRO audit & redesign",
                "A/B testing pilot",
                "Checkout optimization",
                "Automated cart-recovery",
                "Ongoing performance checks",
                "Advanced analytics tracking & funnel setup",
                "Content tuning & on-site SEO improvements"
            ],
            mostPopular: true
        },
        {
            title: "Enterprise Accelerator",
            price: "1800",
            originalPrice: "2500",
            perfectFor: "For high-volume retailers needing robust, scalable solutions.",
            includes: "Includes all Premium Growth deliverables, plus:",
            deliverables: [
                "Deep UX/CRO program",
                "Multi-channel expansion support",
                "Systems architecture (ERP/CRM)",
                "DevOps & CI/CD pipeline",
                "Dedicated SLA-backed support",
                "Cloud architecture & scalability",
                "Compliance & security audits",
                "Long-term roadmap & consulting"
            ],
            outcomes: [
                "99.9% uptime during peak traffic",
                "Unified operations across channels",
                "Scalable, secure infrastructure"
            ]
        },
        {
            title: "Tailored Solutions",
            price: "Custom Quote",
            originalPrice: null,
            perfectFor: "Unique or complex projects requiring a bespoke approach.",
            custom_lists: {
                "Features": [
                    "In-depth scoping workshop (2–3 hrs)",
                    "Modular selection of any core or add-on services",
                    "Phased sprint delivery plan",
                    "Dedicated project manager & specialist team",
                    "Weekly demos & custom reporting dashboard"
                ],
                "Use Cases": [
                    "Headless commerce implementation",
                    "Multi-vendor marketplace development",
                    "Advanced subscription/membership flows",
                    "Complex ERP/CRM integrations"
                ]
            }
        }
    ];

    const servicesContent = document.getElementById('services-content');
    if (servicesContent) {
        pricingData.forEach(tier => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            if (tier.mostPopular) {
                serviceCard.classList.add('most-popular');
            }

            const checkmarkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            
            let priceHTML = '';
            if (tier.originalPrice) {
                priceHTML = `
                <div class="service-price">
                    <span class="old-price">$${tier.originalPrice}</span>
                    <span class="new-price">$${tier.price}</span>
                </div>`;
            } else {
                priceHTML = `
                <div class="service-price">
                    <span class="new-price">${tier.price}</span>
                </div>`;
            }

            let serviceBodyHtml;
            if (tier.custom_lists) {
                let listsHtml = '';
                for (const listName in tier.custom_lists) {
                    listsHtml += `
                        <h4 class="feature-list-title">${listName}</h4>
                        <ul class="features-list">
                            ${tier.custom_lists[listName].map(item => `<li class="feature-item">${checkmarkIcon}${item}</li>`).join('')}
                        </ul>
                    `;
                }
                serviceBodyHtml = `
                    <div class="service-body">
                        <p class="service-description">${tier.perfectFor}</p>
                        ${listsHtml}
                    </div>
                `;
            } else {
                let includesHtml = '';
                if (tier.includes) {
                    includesHtml = `<p class="service-includes">${tier.includes}</p>`;
                }
                let outcomesHtml = '';
                if (tier.outcomes) {
                    outcomesHtml = `
                        <h4 class="feature-list-title">Outcomes:</h4>
                        <ul class="features-list">
                            ${tier.outcomes.map(item => `<li class="feature-item">${checkmarkIcon}${item}</li>`).join('')}
                        </ul>
                    `;
                }
                serviceBodyHtml = `
                    <div class="service-body">
                        <p class="service-description">${tier.perfectFor}</p>
                        ${includesHtml}
                        <ul class="features-list">
                            ${tier.deliverables.map(item => `<li class="feature-item">${checkmarkIcon}${item}</li>`).join('')}
                        </ul>
                        ${outcomesHtml}
                    </div>
                `;
            }

            serviceCard.innerHTML = `
                ${tier.mostPopular ? '<div class="most-popular-badge">Most Popular</div>' : ''}
                <div class="service-header">
                    <h3 class="service-name">${tier.title}</h3>
                    ${priceHTML}
                </div>
                ${serviceBodyHtml}
                <div class="service-footer">
                    <a href="#contact" class="btn btn-secondary">Get This Plan</a>
                </div>
            `;
            
            servicesContent.appendChild(serviceCard);
        });
    }

    // Contact form submission
    const form = document.getElementById('ecom-form');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Submit to Formspree
            fetch('https://formspree.io/f/xpwrbgvb', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Thank you! Your message has been sent successfully. We will get back to you shortly.');
                    form.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Sorry, there was an error sending your message. Please try again or contact us directly at ecomnexus123@gmail.com');
            })
            .finally(() => {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

});
