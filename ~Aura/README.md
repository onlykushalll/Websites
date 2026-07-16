# AURA — Luxury Beauty & 3D Cosmetic Experience

Aura is an ultra-premium, design-focused cosmetics and skincare landing page featuring 3D product visualization, high-fidelity micro-animations, and a refined ivory-and-charcoal aesthetic. 

The website uses interactive WebGL rendering to show cosmetic products like lipsticks and perfume bottles in real-time.

---

## ✨ Features

- **Real-Time 3D Product Interactive Models**: Rendered using React Three Fiber, featuring custom glass material transmission, metallic sheen, and interactive hover rotations.
- **GSAP Scroll Parallax & Typography Reveal**: Seamlessly integrated GSAP and ScrollTrigger animations that reveal headers char-by-char and slide elements organically as you scroll.
- **Custom Interactive Mouse Cursor**: Floating modern cursor with hover-scaling states.
- **Magnetic UI Elements**: Magnet-inspired action buttons that dynamically pull toward the cursor.
- **Fluid Layout**: Clean minimal grid displaying product collections, signature sets, and philosophy blocks.

---

## 🛠️ Tech Stack

- **Core Framework**: [React](https://react.dev/) + [Vite](https://vite.dev/)
- **3D Rendering**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3.docs.pmnd.rs/getting-started/introduction), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations**: [GSAP](https://gsap.com/) (GreenSock Animation Platform) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Navigate to the project directory:
   ```bash
   cd ~Aura
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

4. Compile and bundle for production:
   ```bash
   npm run build
   ```
   The production build will be generated inside the `dist` directory.

---

## 📂 Directory Structure

```
~Aura/
├── public/               # 3D GLB Models (lipstick.glb, perfume_bottle.glb)
├── src/
│   ├── components/       # UI Sections (About, Collections, HeroScene, Navigation, ProductShowcase)
│   ├── hooks/            # Mouse position tracker
│   ├── utils/            # Styling utilities (clsx/tailwind-merge wrapper)
│   ├── App.tsx           # Main application shell
│   ├── index.css         # Styling directives and custom typography
│   └── main.tsx          # Application entrypoint
├── index.html            # Core HTML template
└── tsconfig.json         # TypeScript configuration
```

---

## 📄 License

This project is licensed under the MIT License. See the root [LICENSE](../LICENSE) file for details.
