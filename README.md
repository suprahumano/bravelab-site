# Bravelab Site

## Instrukcja wdrożenia

### Przygotowanie lokalnego środowiska
1. Sklonuj repozytorium
2. Zainstaluj zależności: `npm install`
3. Utwórz plik `.env.local` z twoimi kluczami API (NIE zostanie on wysłany do repozytorium):

```
AIRTABLE_API_KEY=twój_klucz_api
AIRTABLE_BASE_ID=twoje_id_bazy
```

### Wdrożenie na Vercel

1. Zarejestruj się na [Vercel](https://vercel.com) i połącz konto GitHub
2. Importuj projekt z GitHuba
3. W ustawieniach projektu dodaj zmienne środowiskowe:
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`
4. Vercel automatycznie wykryje i wdroży aplikację Next.js

### Ważne informacje bezpieczeństwa

- **NIGDY nie commituj pliku `.env.local`** - zawiera on wrażliwe dane dostępowe
- Sprawdzaj zawsze `git status` przed commitowaniem, aby upewnić się, że nie wysyłasz wrażliwych danych
- Klucze API przechowuj w panelu Vercel, a nie w kodzie
- Używaj `.gitignore` aby wykluczyć wrażliwe pliki z repozytorium

## Struktura projektu

- `pages/` - Strony aplikacji Next.js
- `public/` - Statyczne pliki (CSS, JS, obrazy)
- `utils/` - Narzędzia, w tym konfiguracja Airtable API
- `styles/` - Pliki CSS

## Rozwój lokalny

```
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## Budowanie projektu

```
npm run build
``` 