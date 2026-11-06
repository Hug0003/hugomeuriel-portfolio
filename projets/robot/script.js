// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1500,
        once: true,
    });
});

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('show');
}

// Pas de onclick dans le HTML : la CSP n'autorise aucun script inline.
document.querySelector('.mobile-menu-btn').addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        mobileMenu.classList.remove('show');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.remove('show');
    });
});

// Animation du robot 3D
document.addEventListener('DOMContentLoaded', function() {
    const splineViewer = document.querySelector('spline-viewer');
    
    if (splineViewer) {
        // Attendre que le modèle soit chargé
        splineViewer.addEventListener('load', function() {
            // Délai pour laisser l'animation d'entrée se terminer
            setTimeout(() => {
                splineViewer.classList.add('loaded');
            }, 2000);
        });
        
        // Animation d'entrée avec effet de particules
        setTimeout(() => {
            createParticleEffect();
        }, 500);
    }
});

// Effet de particules pour l'arrivée du robot
function createParticleEffect() {
    const container = document.querySelector('.spline-container');
    const particles = [];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #e99b63, #ff6b6b);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
            animation: particleFloat ${2 + Math.random() * 2}s ease-out forwards;
        `;
        
        // Position aléatoire autour du robot
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        container.appendChild(particle);
        particles.push(particle);
        
        // Supprimer la particule après l'animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 4000);
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'transparent';
        header.style.backdropFilter = 'none';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (window.innerWidth >= 768) {
        mobileMenu.classList.remove('show');
    }
});

// Add hover effects to buttons
document.querySelectorAll('.btn-secondary, .btn-primary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Add parallax effect to gradient background
window.addEventListener('scroll', function() {
    const gradient = document.querySelector('.gradient-bg');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (gradient) {
        gradient.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
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

