/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ustawienie trybu eksportu statycznego
  output: 'export',
  
  // Konfiguracja obrazów dla eksportu statycznego
  images: {
    unoptimized: true,
  },
  
  // Pozwala na dostęp do plików statycznych
  // i obsługuje pliki HTML jako strony
  trailingSlash: true,
  
  // Wyłącza używanie domyślnego folderu .next
  distDir: 'out',
  
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
  
  // Konfiguracja webpack (opcjonalna)
  webpack: (config, { isServer }) => {
    // Dostosowuj konfigurację webpack tutaj, jeśli potrzeba
    return config;
  },
};

module.exports = nextConfig; 