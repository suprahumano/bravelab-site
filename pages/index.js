import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Ładowanie skryptów po załadowaniu strony
    const script = document.createElement('script');
    script.src = '/scripts/main.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Usuwanie skryptu przy odmontowaniu komponentu
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Bravelab - Building Small Automated Ventures</title>
        <meta name="description" content="Łączymy technologię AI z automatyzacją procesów, tworząc małe, zautomatyzowane przedsięwzięcia, które generują wartość." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" />
      </Head>

      {/* Header/Navigation */}
      <header>
        <div className="container nav-container">
          <a href="#" className="logo"><i className="fas fa-microchip" style={{ marginRight: '10px' }}></i>bravelab</a>
          <div className="nav-links">
            <a href="#features"><i className="fas fa-rocket" style={{ marginRight: '6px' }}></i>Podejście</a>
            <a href="#philosophy"><i className="fas fa-lightbulb" style={{ marginRight: '6px' }}></i>Filozofia</a>
            <a href="#projects"><i className="fas fa-cogs" style={{ marginRight: '6px' }}></i>Projekty</a>
            <a href="#services"><i className="fas fa-tools" style={{ marginRight: '6px' }}></i>Usługi</a>
            <a href="#testimonials"><i className="fas fa-star" style={{ marginRight: '6px' }}></i>Opinie</a>
          </div>
          <a href="#contact" className="nav-cta"><i className="fas fa-comment" style={{ marginRight: '8px' }}></i>Kontakt</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Building small automated ventures.</h1>
            <p className="hero-subtitle">Łączymy technologię AI z automatyzacją procesów, tworząc małe, zautomatyzowane przedsięwzięcia, które generują wartość — bez potrzeby ciągłego nadzoru.</p>
            <a href="#contact" className="cta-button"><i className="fas fa-bolt" style={{ marginRight: '10px' }}></i>Porozmawiajmy <i className="fas fa-arrow-right" style={{ marginLeft: '8px' }}></i></a>
            <p className="hero-footnote">Dołącz do nas i obserwuj naszą drogę lub nawiąż współpracę</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects" id="projects">
        <div className="container">
          <h2 className="section-title">Nasze projekty</h2>
          <div className="row">
            {/* Tutaj będą dynamicznie wstawiane projekty z API */}
            <div className="loading-indicator">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Ładowanie projektów...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <h2 className="section-title">Opinie od naszych klientów</h2>
          <div className="carousel-inner">
            {/* Tutaj będą dynamicznie wstawiane testimoniale z API */}
            <div className="loading-indicator">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Ładowanie opinii...</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <h2 className="section-title">Nasze usługi</h2>
          <div className="row">
            {/* Tutaj będą dynamicznie wstawiane usługi z API */}
            <div className="loading-indicator">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Ładowanie usług...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-container">
          <div className="footer-links">
            <a href="#features">Podejście</a>
            <a href="#philosophy">Filozofia</a>
            <a href="#projects">Projekty</a>
            <a href="#services">Usługi</a>
            <a href="#testimonials">Opinie</a>
            <a href="#contact">Kontakt</a>
          </div>
          <div className="footer-social">
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
          </div>
        </div>
        <div className="copyright">
          &copy; 2025 Bravelab. Wszystkie prawa zastrzeżone.
        </div>
      </footer>
    </div>
  );
} 