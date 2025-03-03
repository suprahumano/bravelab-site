/**
 * Główny plik JavaScript do obsługi dynamicznego ładowania danych z API
 */

document.addEventListener('DOMContentLoaded', () => {
  // Załaduj wszystkie dane potrzebne na stronie
  loadProjects();
  loadTestimonials();
  loadServices();
});

/**
 * Pobiera projekty z API i aktualizuje sekcję projektów na stronie
 */
async function loadProjects() {
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) {
      throw new Error('Nie udało się pobrać projektów');
    }
    
    const projects = await response.json();
    const projectsContainer = document.querySelector('#projects .row') || document.querySelector('#projects');
    
    if (!projectsContainer) {
      console.warn('Nie znaleziono kontenera projektów na stronie');
      return;
    }
    
    // Wyczyść istniejące projekty (jeśli istnieją)
    projectsContainer.innerHTML = '';
    
    // Dodaj projekty do kontenera
    projects.forEach(project => {
      const projectElement = createProjectElement(project);
      projectsContainer.appendChild(projectElement);
    });
    
  } catch (error) {
    console.error('Błąd podczas ładowania projektów:', error);
  }
}

/**
 * Tworzy element HTML dla projektu
 */
function createProjectElement(project) {
  const col = document.createElement('div');
  col.className = 'col-md-4';
  
  const portfolioItem = document.createElement('div');
  portfolioItem.className = 'portfolio-item';
  
  const imgContainer = document.createElement('div');
  imgContainer.className = 'portfolio-img';
  
  const iconContainer = document.createElement('div');
  iconContainer.className = 'project-icon';
  iconContainer.innerHTML = `<i class="${project.icon || 'fas fa-rocket'}"></i>`;
  
  const title = document.createElement('h4');
  title.textContent = project.title;
  
  const description = document.createElement('p');
  description.textContent = project.description;
  
  const link = document.createElement('a');
  link.href = project.link || '#';
  link.className = 'project-link';
  
  imgContainer.appendChild(iconContainer);
  portfolioItem.appendChild(imgContainer);
  portfolioItem.appendChild(title);
  portfolioItem.appendChild(description);
  if (project.link) {
    portfolioItem.appendChild(link);
  }
  col.appendChild(portfolioItem);
  
  return col;
}

/**
 * Pobiera testimoniale z API i aktualizuje sekcję testimoniali na stronie
 */
async function loadTestimonials() {
  try {
    const response = await fetch('/api/testimonials');
    if (!response.ok) {
      throw new Error('Nie udało się pobrać testimoniali');
    }
    
    const testimonials = await response.json();
    const testimonialsContainer = document.querySelector('#testimonials .carousel-inner') || 
                                document.querySelector('#testimonials');
    
    if (!testimonialsContainer) {
      console.warn('Nie znaleziono kontenera testimoniali na stronie');
      return;
    }
    
    // Wyczyść istniejące testimoniale (jeśli istnieją)
    testimonialsContainer.innerHTML = '';
    
    // Dodaj testimoniale do kontenera
    testimonials.forEach((testimonial, index) => {
      const testimonialElement = createTestimonialElement(testimonial, index === 0);
      testimonialsContainer.appendChild(testimonialElement);
    });
    
  } catch (error) {
    console.error('Błąd podczas ładowania testimoniali:', error);
  }
}

/**
 * Tworzy element HTML dla testimonialu
 */
function createTestimonialElement(testimonial, isActive) {
  const item = document.createElement('div');
  item.className = `carousel-item ${isActive ? 'active' : ''}`;
  
  const content = document.createElement('div');
  content.className = 'testimonial-content text-center';
  
  const nameInitials = testimonial.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
  
  const avatar = document.createElement('div');
  avatar.className = 'testimonial-avatar';
  avatar.textContent = nameInitials;
  
  const quote = document.createElement('p');
  quote.textContent = testimonial.quote;
  
  const author = document.createElement('h3');
  author.textContent = testimonial.name;
  
  const company = document.createElement('h4');
  company.textContent = testimonial.company || '';
  
  const results = document.createElement('div');
  results.className = 'testimonial-results';
  
  if (testimonial.results && testimonial.results.length > 0) {
    testimonial.results.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';
      resultItem.innerHTML = `
        <i class="fas fa-check result-icon"></i>
        <span>${result}</span>
      `;
      results.appendChild(resultItem);
    });
  }
  
  content.appendChild(avatar);
  content.appendChild(quote);
  content.appendChild(author);
  content.appendChild(company);
  content.appendChild(results);
  item.appendChild(content);
  
  return item;
}

/**
 * Pobiera usługi z API i aktualizuje sekcję usług na stronie
 */
async function loadServices() {
  try {
    const response = await fetch('/api/services');
    if (!response.ok) {
      throw new Error('Nie udało się pobrać usług');
    }
    
    const services = await response.json();
    const servicesContainer = document.querySelector('#services .row') || 
                            document.querySelector('#services');
    
    if (!servicesContainer) {
      console.warn('Nie znaleziono kontenera usług na stronie');
      return;
    }
    
    // Wyczyść istniejące usługi (jeśli istnieją)
    servicesContainer.innerHTML = '';
    
    // Dodaj usługi do kontenera
    services.forEach(service => {
      const serviceElement = createServiceElement(service);
      servicesContainer.appendChild(serviceElement);
    });
    
  } catch (error) {
    console.error('Błąd podczas ładowania usług:', error);
  }
}

/**
 * Tworzy element HTML dla usługi
 */
function createServiceElement(service) {
  const col = document.createElement('div');
  col.className = 'col-md-4';
  
  const serviceBox = document.createElement('div');
  serviceBox.className = 'service-box text-center';
  
  const title = document.createElement('h3');
  title.textContent = service.title;
  
  const description = document.createElement('p');
  description.textContent = service.content;
  
  serviceBox.appendChild(title);
  serviceBox.appendChild(description);
  col.appendChild(serviceBox);
  
  return col;
} 