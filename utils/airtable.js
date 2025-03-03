/**
 * Ten plik zawiera funkcje do komunikacji z Airtable API
 * i pobierania danych dla projektów, testimoniali i usług.
 */

// Importujemy bibliotekę Airtable
const Airtable = require('airtable');

// Pobieramy klucz API i ID bazy z zmiennych środowiskowych
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

// Konfigurujemy bazę Airtable
const base = new Airtable({ apiKey }).base(baseId);

/**
 * Pobiera wszystkie projekty z tabeli "Projects"
 * @returns {Promise<Array>} Tablica obiektów projektów
 */
async function getProjects() {
  try {
    const records = await base('Projects')
      .select({
        view: 'Grid view',
        sort: [{ field: 'Order', direction: 'asc' }]
      })
      .all();
    
    return records.map(record => ({
      id: record.id,
      title: record.get('Title'),
      description: record.get('Description'),
      status: record.get('Status'),
      icon: record.get('Icon'),
      link: record.get('Link'),
      order: record.get('Order'),
      active: record.get('Active') || false
    }));
  } catch (error) {
    console.error('Błąd podczas pobierania projektów:', error);
    return [];
  }
}

/**
 * Pobiera wszystkie testimoniale (opinie) z tabeli "Testimonials"
 * @returns {Promise<Array>} Tablica obiektów testimoniali
 */
async function getTestimonials() {
  try {
    const records = await base('Testimonials')
      .select({
        view: 'Grid view',
        sort: [{ field: 'Order', direction: 'asc' }]
      })
      .all();
    
    return records.map(record => ({
      id: record.id,
      name: record.get('Name'),
      company: record.get('Company'),
      quote: record.get('Quote'),
      results: record.get('Results'),
      active: record.get('Active') || false
    }));
  } catch (error) {
    console.error('Błąd podczas pobierania testimoniali:', error);
    return [];
  }
}

/**
 * Pobiera wszystkie usługi z tabeli "Services"
 * @returns {Promise<Array>} Tablica obiektów usług
 */
async function getServices() {
  try {
    const records = await base('Services')
      .select({
        view: 'Grid view',
        sort: [{ field: 'Order', direction: 'asc' }]
      })
      .all();
    
    return records.map(record => ({
      id: record.id,
      title: record.get('Title'),
      content: record.get('Content'),
      order: record.get('Order'),
      active: record.get('Active') || false
    }));
  } catch (error) {
    console.error('Błąd podczas pobierania usług:', error);
    return [];
  }
}

/**
 * Pobiera jedną konkretną usługę po ID
 * @param {string} id - ID usługi w Airtable
 * @returns {Promise<Object|null>} Obiekt usługi lub null w przypadku błędu
 */
async function getServiceById(id) {
  try {
    const record = await base('Services').find(id);
    
    return {
      id: record.id,
      title: record.get('Title'),
      content: record.get('Content'),
      order: record.get('Order'),
      active: record.get('Active') || false
    };
  } catch (error) {
    console.error(`Błąd podczas pobierania usługi o ID ${id}:`, error);
    return null;
  }
}

/**
 * Pobiera jeden konkretny projekt po ID
 * @param {string} id - ID projektu w Airtable
 * @returns {Promise<Object|null>} Obiekt projektu lub null w przypadku błędu
 */
async function getProjectById(id) {
  try {
    const record = await base('Projects').find(id);
    
    return {
      id: record.id,
      title: record.get('Title'),
      description: record.get('Description'),
      status: record.get('Status'),
      icon: record.get('Icon'),
      link: record.get('Link'),
      order: record.get('Order'),
      active: record.get('Active') || false
    };
  } catch (error) {
    console.error(`Błąd podczas pobierania projektu o ID ${id}:`, error);
    return null;
  }
}

// Eksportujemy funkcje do użycia w innych plikach
module.exports = {
  getProjects,
  getTestimonials,
  getServices,
  getServiceById,
  getProjectById
}; 