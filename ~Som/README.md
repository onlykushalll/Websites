# SOM — Interactive 3D Beverage Experience

Som is a premium beverage brand showcase website that combines smooth product interactions, detailed 3D can renders, and real-time backend integrations to drive marketing campaigns and customer engagement.

---

## ✨ Features

- **3D Interactive Product Models**: Embedded Three.js model of the beverage can that responds dynamically to scroll offsets and mouse movements.
- **Supabase Waitlist Integration**: Fully integrated contact database using Supabase, enabling real-time queue registration and waitlist data insertion.
- **Brand Preloader**: Immersive brand entrance loader screen displaying resource loading metrics.
- **Interactive Benefits & Ingredients Sections**: Dynamic text overlays detailing nutrition, botanical benefits, and formulation science.
- **High Performance**: Highly optimized assets, serverless API functions (`/api/waitlist`), and lightweight rendering pathways.

---

## 🛠️ Tech Stack

- **Core Framework**: [React](https://react.dev/) + [Vite](https://vite.dev/)
- **3D Modeling**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3.docs.pmnd.rs/getting-started/introduction), [@react-three/drei](https://github.com/pmndrs/drei)
- **Database & Hosting**: [Supabase](https://supabase.com/), Serverless functions configured for Vercel
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Navigate to the project directory:
   ```bash
   cd ~Som
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment files:
   Create a `.env` file containing your Supabase key and database credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. Compile and build the application:
   ```bash
   npm run build
   ```
   The production assets will be generated inside the `dist` directory.

---

## 📂 Directory Structure

```
~Som/
├── api/                  # Vercel serverless function files (waitlist handlers)
├── public/               # Static assets (favicons, product branding images)
├── src/
│   ├── components/       # Custom React elements (Waitlist, Ingredients, Preloader, Hero)
│   │   └── 3d/           # Three.js beverage can component and canvas scenes
│   ├── lib/              # Supabase Client connection utilities
│   ├── App.tsx           # Application route hub
│   ├── index.css         # Typography directives and design tokens
│   └── main.tsx          # Application entrypoint
├── vite.config.ts        # Vite configuration
└── tsconfig.json         # TypeScript configuration
```

---

## 📄 License

Proprietary Commercial Source & Evaluation Asset — see root [LICENSE.md](../LICENSE.md) (Contact: `creatormanager27@gmail.com`). Third-party packages remain under their respective upstream open-source licenses.
