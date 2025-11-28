document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cursor trail effect
    const cursorTrail = document.querySelector('.cursor-trail');
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorTrail.style.opacity = '1';
    });

    document.addEventListener('mouseleave', function() {
        cursorTrail.style.opacity = '0';
    });

    // Animation loop for smooth trailing effect
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.15; // Slightly faster follow
        trailY += (mouseY - trailY) * 0.15;
        
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();

    // Smooth scrolling for navigation links (handled by components.js)
    // This is now managed by the component loader to avoid conflicts

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Scroll vers la section À propos
            const aboutSection = document.querySelector('#apropos');
            if (aboutSection) {
                lenis.scrollTo(aboutSection);
            }
        });
        
        // Ajouter le style cursor pointer pour indiquer que c'est cliquable
        scrollIndicator.style.cursor = 'pointer';
    } 

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;



    // Mobile menu toggle (handled by components.js)
    // This is now managed by the component loader to avoid conflicts

    // Project cards interaction (handled by components.js)
    // This is now managed by the component loader to avoid conflicts


    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.15, // Increased threshold for better visibility before trigger
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section-header, .about-card, .skill-item, .stat-card, .project-card, .contact-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .section-header,
        .about-card,
        .skill-item,
        .stat-card,
        .project-card,
        .contact-card {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            filter: blur(10px);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            will-change: opacity, transform, filter;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) scale(1) !important;
            filter: blur(0) !important;
        }
        
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            padding: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-toggle.active .bar:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active .bar:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
        
        .loading-overlay {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
    `;
    
    document.head.appendChild(style);


    // Typing effect for hero title
    const titleName = document.querySelector('.title-name');
    if (titleName) {
        const text = titleName.textContent;
        titleName.textContent = text.charAt(0); // Affiche la première lettre dès le début
        
        let i = 1; // Commence à partir de la 2ème lettre
        const typeWriter = () => {
            if (i < text.length) {
                titleName.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                const isPercentage = finalNumber.includes('%');
                const isPlus = finalNumber.includes('+');
                const number = parseInt(finalNumber.replace(/[^\d]/g, ''));
                
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    
                    let displayValue = Math.floor(current);
                    if (isPercentage) displayValue += '%';
                    if (isPlus) displayValue += '+';
                    
                    target.textContent = displayValue;
                }, 30);
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        sectionObserver.observe(section);
    });

    // Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });


    // Performance optimization: throttle scroll events
    let scrollTimeout;
    const throttledScroll = () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
                // Scroll-based animations here
            }, 16); // ~60fps
        }
    };

    window.addEventListener('scroll', throttledScroll);

    // Preload critical images and resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];

    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });

    // Plausible Outbound Link Tracking
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href) {
            const url = new URL(link.href);
            if (url.hostname !== window.location.hostname) {
                // It's an external link
                if (window.plausible) {
                    window.plausible('Outbound Link', { props: { url: link.href } });
                }
            }
        }
    });

});






  // Correction de l'affichage du statut des sites (asynchrone)

  const containerProjects = document.querySelector('.projects-grid');
  const filterSelect = document.querySelector('#projects-filter');
  let projectsData = [];

  const normalizeValue = (value = '') => value.toString().trim().toLowerCase();

  const filterProjects = (criteria) => {
    const normalizedCriteria = normalizeValue(criteria);
    if (!normalizedCriteria || normalizedCriteria === 'all') {
      return [...projectsData].sort((a, b) => a.originalIndex - b.originalIndex);
    }

    return projectsData
      .filter(project => normalizeValue(project.category || project.type) === normalizedCriteria)
      .sort((a, b) => a.originalIndex - b.originalIndex);
  };

  const attachProjectCardInteractions = (card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'link');

    card.addEventListener('click', function () {
      const url = this.getAttribute('data-url');
      if (url) {
        if (url.startsWith('http') || url.startsWith('https')) {
          window.open(url, '_blank');
        } else {
          window.location.href = url;
        }
      }
    });

    card.addEventListener('keypress', function (e) {
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

    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  };

  const renderProjects = (list) => {
    if (!containerProjects) return;
    containerProjects.innerHTML = '';

    list.forEach(site => {
      const technologiesHtml = Array.isArray(site.technologies)
        ? site.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')
        : '';

      containerProjects.insertAdjacentHTML(
        'beforeend',
        `
          <div class="project-card premium-card" data-url="${site.url}">
            <div class="project-image" style="${site.color}">
              <div class="project-icon">
                <i class="${site.icon}"></i>
              </div>
              <div class="project-overlay">
                <div class="overlay-content">
                  <i class="fas fa-external-link-alt"></i>
                  <span>${site.voir}</span>
                </div>
              </div>
              <div class="project-gradient"></div>
            </div>
            <div class="project-content">
              <div class="project-header">
                <h3 class="project-title">${site.name}</h3>
                <div class="project-badge">${site.type}</div>
              </div>
              <p class="project-description">
                ${site.description}
              </p>
              <div class="project-tech">
                ${technologiesHtml}
              </div>
              <div class="project-footer">
                <div class="project-status">
                  <span>Vérification...</span>
                </div>
                <div class="project-link">
                  <i class="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>`
      );

      const inserted = containerProjects.lastElementChild;
      if (inserted) {
        inserted.classList.add('animate-in');
        attachProjectCardInteractions(inserted);

        const statusContainer = inserted.querySelector('.project-status');
        if (statusContainer) {
          verifierSite(site.url)
            .then(html => {
              statusContainer.innerHTML = html;
            })
            .catch(() => {
              statusContainer.innerHTML =
                `<span class="status-dot_offline"></span>
                 <span>Hors ligne</span>`;
            });
        }
      }
    });

    if (list.length > 0 && list.length <= 2) {
      containerProjects.classList.add('projects-grid--compact');
    } else {
      containerProjects.classList.remove('projects-grid--compact');
    }
  };

  if (containerProjects) {
    fetch('data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        return response.json();
      })
      .then(sites => {
        projectsData = sites.map((site, index) => ({
          ...site,
          originalIndex: index,
          category: site.category || site.type || 'autre'
        }));

        renderProjects(projectsData.sort((a, b) => a.originalIndex - b.originalIndex));

        if (filterSelect) {
          filterSelect.addEventListener('change', (event) => {
            const filteredProjects = filterProjects(event.target.value);
            renderProjects(filteredProjects);
          });
        }
      })
      .catch(error => {
        console.error('Erreur lors du chargement des projets :', error);
      });
  }

  async function verifierSite(url) {
    try {
      const reponse = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
      // Les requêtes HEAD cross-origin retourneront probablement pas ok,
      // donc on suppose online si c'est une URL http(s) externe
      if (reponse && (reponse.ok || url.startsWith('http'))) {
        return `
          <span class="status-dot_online"></span>
          <span>En ligne</span>
        `;
      } else {
        // Pour les urls locales/fichiers non accédés
        return `
          <span class="status-dot_offline"></span>
          <span>Hors ligne</span>
        `;
      }
    } catch (erreur) {
      return `
        <span class="status-dot_offline"></span>
        <span>Hors ligne</span>
      `;
    }
  }
    
 
document.addEventListener('loadAllComponents', function() {
  const containerProjectsFooter = document.querySelector('.projects-footer');
  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return response.json();
    })
    .then(sites => {
      sites.forEach(site => {
        // Créer le HTML initial avec un placeholder pour status
        containerProjectsFooter.insertAdjacentHTML(
          'beforeend',
          `
                <a href="${site.url}" target="_blank">
                    ${site.name}
                </a>`
            );
        });
    });
});



