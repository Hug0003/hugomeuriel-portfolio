document.addEventListener('DOMContentLoaded', function () {
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

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorTrail.style.opacity = '1';
  });

  document.addEventListener('mouseleave', function () {
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

  /* Scroll indicator click handled by Lenis via anchor tags or verify if needed specific logic */
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      lenis.scrollTo('#apropos');
    });
    scrollIndicator.style.cursor = 'pointer';
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;



  // Mobile menu toggle (handled by components.js)
  // This is now managed by the component loader to avoid conflicts

  // Project cards interaction (handled by components.js)
  // This is now managed by the component loader to avoid conflicts


  // Intersection Observer for animations removed
  // Elements are now visible by default



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

  // Button hover effects handled by CSS


  // Stats counter animation
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver(function (entries) {
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

  // Smooth reveal animation removed - sections visible by default


  // Floating cards animation - CSS handled



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
  document.addEventListener('click', function (e) {
    let url = null;

    // 1. Check for <a> tags
    const link = e.target.closest('a');
    if (link && link.href) {
      url = link.href;
    }
    // 2. Check for project cards (divs acting as links)
    else {
      const card = e.target.closest('.project-card');
      if (card && card.getAttribute('data-url')) {
        url = card.getAttribute('data-url');
      }
    }

    if (url) {
      try {
        // Construct URL object (handles relative URLs by using current origin as base)
        const urlObj = new URL(url, window.location.origin);

        // Check if hostname is different
        if (urlObj.hostname !== window.location.hostname) {
          console.log('🌍 Outbound link detected:', url);

          if (window.plausible) {
            window.plausible('Outbound Link', { props: { url: url } });
            console.log('✅ Event sent to Plausible');
          } else {
            console.warn('⚠️ Plausible object not found on window');
          }
        }
      } catch (err) {
        console.error('Error processing URL:', err);
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

  // Hover effects handled by CSS

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


document.addEventListener('loadAllComponents', function () {
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



