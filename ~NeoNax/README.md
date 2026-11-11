# NeoNax — Futuristic 3D Material Showcase

NeoNax is an interactive 3D laboratory and futuristic material showcase platform. With dark cybernetic themes, detailed mesh grid overlays, and real-time WebGL can modeling, it provides a high-fidelity showcase of premium products.

---

## ✨ Features

- **3D Fluid & Product Modeling**: High-fidelity WebGL can model showing refraction, metal reflection, and dynamic hover rotation.
- **Advanced Shadcn/UI Components**: Pre-configured accordion, alert dialogs, calendar, custom badges, carousels, and responsive dashboard widgets.
- **Cybernetic Themes**: Highly custom CSS layouts utilizing deep dark palettes combined with bright futuristic neon colors.
- **Interactive Telemetry Plots**: Built-in interactive charts displaying data parameters of molecular properties.
- **Responsive Layout**: Designed for seamless compatibility between high-resolution monitors and mobile devices.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vite.dev/)
- **3D/WebGL**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3.docs.pmnd.rs/getting-started/introduction)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/) (Radix Primitives)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Navigate to the project directory:
   ```bash
   cd ~NeoNax
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build the application for production:
   ```bash
   npm run build
   ```
   The compiled bundle will be output to the `dist` directory.

---

## 📂 Directory Structure

```
~NeoNax/
├── public/               # GLB Models (cool-ayyd_soda_can.glb) and images
├── src/
│   ├── components/       # Custom React components and R3F Canvas
│   │   └── ui/           # Radix/Shadcn primitives (dialog, button, table)
│   ├── hooks/            # Mobile responsive hooks
│   ├── pages/            # Page layouts
│   ├── sections/         # Feature blocks (Hero, Origin, Molecules, Transmutation)
│   ├── App.tsx           # Main application router
│   ├── index.css         # Styling utilities and CSS components
│   └── main.tsx          # Application entrypoint
├── vite.config.ts        # Vite configuration
└── tsconfig.json         # TypeScript configuration
```

---

## 📄 License

Proprietary Commercial Source & Evaluation Asset — see root [LICENSE.md](../LICENSE.md) (Contact: `creatormanager27@gmail.com`). Third-party packages remain under their respective open-source licenses.
