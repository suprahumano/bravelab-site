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
  
  const img = document.createElement('img');
  img.src = project.coverImage || 'public/img/portfolio/placeholder.jpg';
  img.alt = project.name;
  img.className = 'img-fluid';
  
  const overlay = document.createElement('div');
  overlay.className = 'portfolio-overlay';
  
  const link = document.createElement('a');
  link.href = project.url || '#';
  link.className = 'popup';
  
  const title = document.createElement('h4');
  title.textContent = project.name;
  
  const category = document.createElement('p');
  category.textContent = project.category || '';
  
  imgContainer.appendChild(img);
  overlay.appendChild(link);
  overlay.appendChild(title);
  overlay.appendChild(category);
  imgContainer.appendChild(overlay);
  portfolioItem.appendChild(imgContainer);
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
  
  const img = document.createElement('img');
  img.src = testimonial.avatar || 'public/img/testimonial/placeholder.jpg';
  img.alt = testimonial.name;
  img.className = 'img-fluid rounded-circle mx-auto';
  
  const quote = document.createElement('p');
  quote.textContent = testimonial.quote;
  
  const author = document.createElement('h3');
  author.textContent = testimonial.name;
  
  const position = document.createElement('h4');
  position.textContent = testimonial.position || '';
  
  content.appendChild(img);
  content.appendChild(quote);
  content.appendChild(author);
  content.appendChild(position);
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
  
  const icon = document.createElement('div');
  icon.className = 'service-icon';
  icon.innerHTML = `<i class="${service.icon || 'fas fa-cog'}"></i>`;
  
  const title = document.createElement('h3');
  title.textContent = service.name;
  
  const description = document.createElement('p');
  description.textContent = service.description || '';
  
  serviceBox.appendChild(icon);
  serviceBox.appendChild(title);
  serviceBox.appendChild(description);
  col.appendChild(serviceBox);
  
  return col;
} 