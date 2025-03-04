/**
 * Główny plik JavaScript do obsługi dynamicznego ładowania danych z API
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Dokument załadowany, rozpoczynam pobieranie danych...');
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
    console.log('Rozpoczynam pobieranie projektów...');
    
    const projectsContainer = document.querySelector('#projects .row') || document.querySelector('#projects');
    
    if (!projectsContainer) {
      console.warn('Nie znaleziono kontenera projektów na stronie');
      return;
    }
    
    // Aktualizacja indicatora ładowania
    projectsContainer.innerHTML = `
      <div class="loading-indicator">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Ładowanie projektów...</p>
      </div>
    `;
    
    const response = await fetch('/api/projects');
    console.log('Odpowiedź API projektów:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Nie udało się pobrać projektów: ${response.status} ${response.statusText}, ${errorText}`);
    }
    
    const projects = await response.json();
    console.log(`Pobrano ${projects.length} projektów:`, projects);
    
    // Wyczyść istniejące projekty (jeśli istnieją)
    projectsContainer.innerHTML = '';
    
    // Dodaj projekty do kontenera lub wyświetl komunikat
    if (projects && projects.length > 0) {
      projects.forEach(project => {
        const projectElement = createProjectElement(project);
        projectsContainer.appendChild(projectElement);
      });
    } else {
      projectsContainer.innerHTML = `<div class="col-12 text-center">
        <p>Brak dostępnych projektów.</p>
      </div>`;
    }
    
  } catch (error) {
    console.error('Błąd podczas ładowania projektów:', error);
    
    // Wyświetl komunikat o błędzie na stronie
    const projectsContainer = document.querySelector('#projects .row') || document.querySelector('#projects');
    if (projectsContainer) {
      projectsContainer.innerHTML = `
        <div class="col-12 text-center error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <p>Nie udało się pobrać projektów. Błąd: ${error.message}</p>
        </div>
      `;
    }
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
    console.log('Rozpoczynam pobieranie testimoniali...');
    
    const testimonialsContainer = document.querySelector('#testimonials .carousel-inner') || 
                                document.querySelector('#testimonials');
    
    if (!testimonialsContainer) {
      console.warn('Nie znaleziono kontenera testimoniali na stronie');
      return;
    }
    
    // Aktualizacja indicatora ładowania
    testimonialsContainer.innerHTML = `
      <div class="loading-indicator">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Ładowanie opinii...</p>
      </div>
    `;
    
    const response = await fetch('/api/testimonials');
    console.log('Odpowiedź API testimoniali:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Nie udało się pobrać testimoniali: ${response.status} ${response.statusText}, ${errorText}`);
    }
    
    const testimonials = await response.json();
    console.log(`Pobrano ${testimonials.length} testimoniali:`, testimonials);
    
    // Wyczyść istniejące testimoniale (jeśli istnieją)
    testimonialsContainer.innerHTML = '';
    
    // Dodaj testimoniale do kontenera lub wyświetl komunikat
    if (testimonials && testimonials.length > 0) {
      testimonials.forEach((testimonial, index) => {
        const testimonialElement = createTestimonialElement(testimonial, index === 0);
        testimonialsContainer.appendChild(testimonialElement);
      });
    } else {
      testimonialsContainer.innerHTML = `<div class="carousel-item active">
        <div class="testimonial-content text-center">
          <p>Brak dostępnych opinii.</p>
        </div>
      </div>`;
    }
    
  } catch (error) {
    console.error('Błąd podczas ładowania testimoniali:', error);
    
    // Wyświetl komunikat o błędzie na stronie
    const testimonialsContainer = document.querySelector('#testimonials .carousel-inner') || 
                                document.querySelector('#testimonials');
    if (testimonialsContainer) {
      testimonialsContainer.innerHTML = `
        <div class="carousel-item active">
          <div class="testimonial-content text-center error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Nie udało się pobrać opinii. Błąd: ${error.message}</p>
          </div>
        </div>
      `;
    }
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
    console.log('Rozpoczynam pobieranie usług...');
    
    const servicesContainer = document.querySelector('#services .row') || 
                            document.querySelector('#services');
    
    if (!servicesContainer) {
      console.warn('Nie znaleziono kontenera usług na stronie');
      return;
    }
    
    // Aktualizacja indicatora ładowania
    servicesContainer.innerHTML = `
      <div class="loading-indicator">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Ładowanie usług...</p>
      </div>
    `;
    
    const response = await fetch('/api/services');
    console.log('Odpowiedź API usług:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Nie udało się pobrać usług: ${response.status} ${response.statusText}, ${errorText}`);
    }
    
    const services = await response.json();
    console.log(`Pobrano ${services.length} usług:`, services);
    
    // Wyczyść istniejące usługi (jeśli istnieją)
    servicesContainer.innerHTML = '';
    
    // Dodaj usługi do kontenera lub wyświetl komunikat
    if (services && services.length > 0) {
      services.forEach(service => {
        const serviceElement = createServiceElement(service);
        servicesContainer.appendChild(serviceElement);
      });
    } else {
      servicesContainer.innerHTML = `<div class="col-12 text-center">
        <p>Brak dostępnych usług.</p>
      </div>`;
    }
    
  } catch (error) {
    console.error('Błąd podczas ładowania usług:', error);
    
    // Wyświetl komunikat o błędzie na stronie
    const servicesContainer = document.querySelector('#services .row') || 
                            document.querySelector('#services');
    if (servicesContainer) {
      servicesContainer.innerHTML = `
        <div class="col-12 text-center error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <p>Nie udało się pobrać usług. Błąd: ${error.message}</p>
        </div>
      `;
    }
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