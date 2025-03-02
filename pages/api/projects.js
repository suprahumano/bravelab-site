import { getProjects, getProjectById } from '../../utils/airtable';

/**
 * API endpoint do pobierania projektów z Airtable
 * GET /api/projects - pobiera wszystkie projekty
 * GET /api/projects?id=123 - pobiera konkretny projekt o ID 123
 */
export default async function handler(req, res) {
  // Obsługujemy tylko metody GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Sprawdzamy, czy mamy ID projektu w query params
    const { id } = req.query;
    
    if (id) {
      // Jeśli mamy ID, pobieramy konkretny projekt
      const project = await getProjectById(id);
      
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      return res.status(200).json(project);
    } else {
      // Jeśli nie mamy ID, pobieramy wszystkie projekty
      const projects = await getProjects();
      return res.status(200).json(projects);
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
} 