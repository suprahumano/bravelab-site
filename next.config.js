/** @type {import('next').NextConfig} */
const nextConfig = {
  // Usuwam statyczny eksport, ponieważ używamy Vercel
  // output: 'export',
  
  // Konfiguracja obrazów - zostawiamy optymalizację obrazów włączoną na Vercel
  images: {
    domains: ['dl.airtable.com'], // Dodajemy domenę Airtable, jeśli będziemy pobierać stamtąd obrazy
  },
  
  // Usuwam trailing slash, nie jest potrzebny na Vercel
  // trailingSlash: true,
  
  // Usuwam distDir, ponieważ Vercel używa domyślnej konfiguracji
  // distDir: 'out',
  
  // Wyłącza ścisłe sprawdzanie typów dla komponentów API
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Wyłącza ESLint podczas budowania
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Konfiguracja środowiska
  env: {
    // Dodaj zmienne środowiskowe, które mają być dostępne w przeglądarce
    NEXT_PUBLIC_SITE_URL: 'https://bravelab.pl',
  },
  
  // Uproszczona konfiguracja nagłówków - tylko dobrze obsługiwane funkcje
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ],
      },
    ];
  },
  
  // Konfiguracja webpack (opcjonalna)
  webpack: (config, { isServer }) => {
    // Dostosowuj konfigurację webpack tutaj, jeśli potrzeba
    return config;
  },
};

module.exports = nextConfig; 