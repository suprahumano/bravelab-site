import { getTestimonials } from '../../utils/airtable';

/**
 * API endpoint do pobierania testimoniali (opinii) z Airtable
 * GET /api/testimonials - pobiera wszystkie opinie
 */
export default async function handler(req, res) {
  // Obsługujemy tylko metody GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Pobieramy wszystkie testimoniale
    const testimonials = await getTestimonials();
    return res.status(200).json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
} 