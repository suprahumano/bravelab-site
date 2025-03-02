import { getServices, getServiceById } from '../../utils/airtable';

/**
 * API endpoint do pobierania usług z Airtable
 * GET /api/services - pobiera wszystkie usługi
 * GET /api/services?id=123 - pobiera konkretną usługę o ID 123
 */
export default async function handler(req, res) {
  // Obsługujemy tylko metody GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Sprawdzamy, czy mamy ID usługi w query params
    const { id } = req.query;
    
    if (id) {
      // Jeśli mamy ID, pobieramy konkretną usługę
      const service = await getServiceById(id);
      
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      
      return res.status(200).json(service);
    } else {
      // Jeśli nie mamy ID, pobieramy wszystkie usługi
      const services = await getServices();
      return res.status(200).json(services);
    }
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
} 