/**
 * API endpoint do sprawdzania statusu API
 * GET /api/status - zwraca informacje o statusie API
 */
export default async function handler(req, res) {
  // Obsługujemy tylko metody GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Sprawdzamy zmienne środowiskowe
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    
    // Tworzymy obiekt statusu
    const status = {
      success: true,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || 'unknown',
      config: {
        airtableApiKey: apiKey ? 'configured' : 'missing',
        airtableBaseId: baseId ? 'configured' : 'missing'
      }
    };
    
    return res.status(200).json(status);
  } catch (error) {
    console.error('Error in status endpoint:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
} 