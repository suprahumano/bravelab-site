import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function ApiTest() {
  const [projects, setProjects] = useState(null);
  const [testimonials, setTestimonials] = useState(null);
  const [services, setServices] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Pobierz projekty
        const projectsRes = await fetch('/api/projects');
        const projectsData = await projectsRes.json();
        
        // Pobierz testimoniale
        const testimonialsRes = await fetch('/api/testimonials');
        const testimonialsData = await testimonialsRes.json();
        
        // Pobierz usługi
        const servicesRes = await fetch('/api/services');
        const servicesData = await servicesRes.json();
        
        setProjects(projectsData);
        setTestimonials(testimonialsData);
        setServices(servicesData);
      } catch (err) {
        console.error('Błąd podczas pobierania danych:', err);
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor: '#111', color: '#fff' }}>
      <Head>
        <title>Test API Bravelab</title>
      </Head>
      
      <h1>Test połączenia z API</h1>
      
      {loading && <p>Ładowanie danych...</p>}
      
      {error && (
        <div style={{ backgroundColor: '#ff000020', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          <h2>Błąd:</h2>
          <pre>{error}</pre>
        </div>
      )}
      
      {!loading && !error && (
        <>
          <h2>Projekty:</h2>
          <pre style={{ backgroundColor: '#222', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {JSON.stringify(projects, null, 2)}
          </pre>
          
          <h2>Testimoniale:</h2>
          <pre style={{ backgroundColor: '#222', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {JSON.stringify(testimonials, null, 2)}
          </pre>
          
          <h2>Usługi:</h2>
          <pre style={{ backgroundColor: '#222', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {JSON.stringify(services, null, 2)}
          </pre>
        </>
      )}
      
      <div style={{ marginTop: '30px' }}>
        <h2>Diagnostyka:</h2>
        <ul>
          <li>
            <a href="/api/projects" target="_blank" style={{ color: '#6c5ce7' }}>
              Sprawdź bezpośrednio endpoint /api/projects
            </a>
          </li>
          <li>
            <a href="/api/testimonials" target="_blank" style={{ color: '#6c5ce7' }}>
              Sprawdź bezpośrednio endpoint /api/testimonials
            </a>
          </li>
          <li>
            <a href="/api/services" target="_blank" style={{ color: '#6c5ce7' }}>
              Sprawdź bezpośrednio endpoint /api/services
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
} 