# Budget Project — Digital Services Budget Generator
 
Web application for the dynamic generation of budgets for digital marketing and custom web development services.
 
## Features
 
- Digital service selection (SEO, Ads, Web) with dynamic, itemized total price calculation
- Web service configurator with increment/decrement controls for number of pages and languages
- Real-time calculation of the Web service subtotal and the overall budget total
- Accessible info icons (modal) detailing the cost per additional unit
- Mobile-first design with Tailwind CSS v4
- Accessibility: ARIA roles, `aria-live`, `aria-expanded`, `aria-controls`, keyboard navigation
> **Project status:** partial delivery of US-02 (Web service configurator). US-01 (service selection and dynamic calculation) is complete with unit tests. US-02 unit tests and Gherkin scenarios are still **pending** — they remain as next steps before moving on to the rest of the user stories (budget generation, history, sharing).
 
## Tech Stack
 
- [React](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — static typing
- [Vite](https://vite.dev/) — build tool
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first styling
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) — testing
- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) with `jsx-a11y` — linting and accessibility
## Project Structure
 
```
budget-project/
├── public/
│   └── favicon.png
├── src/
│   ├── assets/
│   │   └── icons/
│   │       └── icons8-info-speech-bubble-100.png
│   ├── components/
│   │   ├── info-tooltip.tsx
│   │   ├── service-card.tsx
│   │   ├── services-list.tsx
│   │   ├── stepper.tsx
│   │   ├── total-price-display.tsx
│   │   └── web-configurator.tsx
│   ├── data/
│   │   ├── info-tooltip.json
│   │   ├── services.json
│   │   └── web-config-defaults.json
│   ├── hooks/
│   │   ├── use-selected-services.ts
│   │   ├── use-selected-services.test.ts
│   │   └── use-web-config.ts
│   ├── logic/
│   │   ├── calculate-price-web.ts
│   │   ├── calculate-total.ts
│   │   └── calculate-total.test.ts
│   ├── types/
│   │   ├── service.ts
│   │   └── web-config.ts
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── index.css
│   ├── main.tsx
│   └── setupTests.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
└── tsconfig.app.json
```
 
## Getting Started
 
Clone the repo and install dependencies:
 
```bash
git clone https://github.com/Joel-Gandalf/S4_project2_budjet.git
cd S4_project2_budjet
npm install
```
 
Start the development server:
 
```bash
npm run dev
```
 
## Scripts
 
| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run test:coverage` | Run tests with coverage report |
 
## Usage
 
- **Check** the services you're interested in (SEO, Ads, Web) to see the budget update instantly
- When **Web** is checked, adjust the **number of pages** and **languages** with the +/- controls
- Check the ⓘ icon to see the cost detail per additional unit
- The **estimated budget** is always shown updated at the bottom
## Next Steps
 
- Unit tests and Gherkin scenarios for US-02
- US-03: client data form and budget generation with unique ID
- US-04: budget persistence (localStorage / json-server) and history
- US-05/06: history search and sorting
- US-07: unique shareable budget URL
- US-08 (bonus): PDF export

## Organization for development management

[Link to the project Kanban board](https://trello.com/invite/b/6a5603041662bc1fbe3e41ab/ATTIa137121b0c96b6c3c522da95e10f005b87BB64F1/budget-proyecto2)

## Author
 
**Joel Gandalf**
[GitHub](https://github.com/Joel-Gandalf)