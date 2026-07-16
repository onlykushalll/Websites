# Web Experience Showcase — Multi-Project Portfolio

Welcome to the **Web Experience Showcase**, a curated collection of five premium, production-ready web applications demonstrating state-of-the-art interactive front-ends, advanced layouts, immersive 3D/WebGL experiences, and highly responsive user interfaces. 

Each project serves as an architectural template for modern, high-performance web development.

---

## 📂 Featured Applications

| Project | Directory | Description | Key Tech Stack | Features |
| :--- | :--- | :--- | :--- | :--- |
| **Aura** | [`~Aura`](./~Aura) | Ultra-premium 3D cosmetics & makeup landing page with luxury aesthetics. | React, Vite, Three.js, GSAP, Tailwind CSS | Interactive 3D product models, custom cursor, scroll parallax, magnetic elements. |
| **Kairos AI** | [`~KairosAi`](./~KairosAi) | Clean, futuristic landing page for an autonomous AI agent deployment platform. | Next.js 16+, React 19, Three.js, Framer Motion, Prisma | Aurora gradients, interactive particle fields, smooth scroll, responsive dynamic routing. |
| **Dcozi** | [`~DCOZI`](./~DCOZI) | Digital signage, smart kiosk, and digital podium manufacturing landing page. | React, Vite, Lenis Scroll, Tailwind CSS | Smooth inertial scrolling, contact portal, dynamic marquee, product scroll showcase. |
| **NeoNax** | [`~NeoNax`](./~NeoNax) | Interactive futuristic laboratory/materials 3D product showcase. | React, Vite, Three.js, Tailwind CSS, Lucide | 3D can/fluid visualization, micro-animations, customizable responsive components. |
| **Som** | [`~Som`](./~Som) | Interactive beverage product landing page showcasing premium packaging. | React, Vite, Three.js, Tailwind CSS, Supabase | Interactive 3D liquid/can models, real-time waitlist database integration, preloader. |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local environment:
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0+), **Yarn**, or **Bun**

### General Setup & Installation

Each folder is configured as a standalone application. To set up any of the websites, navigate into the respective directory and follow these steps:

1. **Install Dependencies:**
   ```bash
   cd ~Aura    # Replace with any of the 5 folders
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open the port shown in your terminal (typically `http://localhost:5173` or similar) to view the application.

3. **Build for Production:**
   ```bash
   npm run build
   ```
   This generates an optimized static bundle in the project's `dist` or `.next` folder.

---

## 🛠️ Global Technology Stack

Across the five websites, the codebase implements:
- **Frameworks:** [React](https://react.dev/), [Next.js](https://nextjs.org/) (App Router)
- **Styling:** Vanilla CSS, [Tailwind CSS](https://tailwindcss.com/)
- **Animation & 3D:** [Three.js](https://threejs.org/), [@react-three/fiber](https://r3.docs.pmnd.rs/getting-started/introduction), [GSAP](https://gsap.com/), [Framer Motion](https://www.framer.com/motion/)
- **Utility Libraries:** [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll), [Lucide React](https://lucide.dev/), [Zustand](https://zustand-demo.pmnd.rs/) (State Management)

---

## 📄 License & Terms

All code within this repository is open-source and licensed under the **MIT License**. For details, please refer to the root [LICENSE](./LICENSE) file.

## 🤝 Contribution Guidelines

We welcome contributions, bug fixes, and feature enhancements. Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on codebase standards, formatting, and branch structure.
