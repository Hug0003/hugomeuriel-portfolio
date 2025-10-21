// ========================================
// COMPONENTS LOADER
// ========================================

class ComponentLoader {
    constructor() {
        this.components = new Map();
    }

    async loadComponent(path) {
        if (this.components.has(path)) {
            return this.components.get(path);
        }

        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${path}`);
            }
            const html = await response.text();
            this.components.set(path, html);
            return html;
        } catch (error) {
            console.error(`Error loading component ${path}:`, error);
            return '';
        }
    }

    async loadHeader() {
        const headerHtml = await this.loadComponent('assets/components/header.html');
        const headerElement = document.querySelector('#header-placeholder');
        if (headerElement) {
            headerElement.innerHTML = headerHtml;
        }
    }

    async loadFooter() {
        const footerHtml = await this.loadComponent('assets/components/footer.html');
        const footerElement = document.querySelector('#footer-placeholder');
        if (footerElement) {
            footerElement.innerHTML = footerHtml;
        }
    }

    async loadAllComponents() {
        await Promise.all([
            this.loadHeader(),
            this.loadFooter()
        ]);
    }
}

// Initialize component loader when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    const loader = new ComponentLoader();
    await loader.loadAllComponents();
    
    // Re-initialize scripts that depend on the loaded components
    reinitializeScripts();
});

// Function to reinitialize scripts after components are loaded
function reinitializeScripts() {
    // Re-initialize navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Re-initialize smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
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

    // Re-initialize project cards interaction
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url) {
                if (url.startsWith('http') || url.startsWith('https')) {
                    window.open(url, '_blank');
                } else {
                    window.location.href = url;
                }
            }
        });

        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const url = this.getAttribute('data-url');
                if (url) {
                    if (url.startsWith('http') || url.startsWith('https')) {
                        window.open(url, '_blank');
                    } else {
                        window.location.href = url;
                    }
                }
            }
        });

        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Export for use in other scripts
window.ComponentLoader = ComponentLoader;
