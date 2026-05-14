# University Scraper Dashboard

Prosty dashboard do pobierania danych o kierunkach studiów ze stron uczelni oraz eksportu danych do formatu JSON.

## Funkcjonalności

- pobieranie danych ze stron uczelni,
- ekstrakcja kierunków studiów,
- podział na typy i tryby studiów,
- eksport wyników do JSON,
- obsługa błędów i walidacja URL.

## Stack technologiczny

### Frontend

- React
- Vite
- TypeScript

### Backend

- Node.js
- Express
- Axios
- Cheerio

## Instalacja

```bash
git clone git@github.com:kacpi95/university-scraper-dashboard.git
```

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

## Uruchomienie projektu

W głównym folderze projektu:

```bash
npm install
npm run dev
```

Komenda uruchamia jednocześnie frontend oraz backend.

## Przykładowe strony testowe

- [Politechnika Warszawska – studia II stopnia](https://www.pw.edu.pl/studia/studia-ii-stopnia)
- [Politechnika Warszawska – studia I stopnia](https://www.pw.edu.pl/studia/studia-i-stopnia)

## Uwagi

Projekt jest wersją MVP i aktualnie najlepiej działa dla stron podanych wyżej.
