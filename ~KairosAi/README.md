# Kairos AI — Autonomous Intelligent Agent Platform

Kairos AI is a futuristic, immersive web experience presenting an advanced platform for deploying autonomous intelligent agents. Designed with dark-themed aesthetics, fluid 3D particle fields, and smooth micro-interactions, it showcases how AI agents can operate independently to run tasks, handle database queries, and automate workflows.

---

## ✨ Features

- **Futuristic 3D WebGL Scenes**: Powered by React Three Fiber (R3F), featuring particle fields, floating dust, and the central **Kairos Orb** representing intelligent core cycles.
- **Premium Micro-Animations**: Interactivity designed with GSAP, ScrollTrigger, and Framer Motion for high-end scrolling and state transitions.
- **Dynamic Backgrounds**: Multiple premium canvas backgrounds (Animated Mesh Gradient, Fiber Network, Flowing Fibers, Aurora).
- **Prisma Database Layer**: Modern database schema supporting waitlist signup, usage metrics, and logs.
- **Premium HUD Elements**: Cyberpunk-style heads-up displays, telemetry metrics, and agent deployment tracking.
- **Full Responsiveness**: Adaptive styling from mobile interfaces to wide desktop screens.

---

## 🛠️ Tech Stack

- **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/)
- **Animation & 3D**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3.docs.pmnd.rs/), [GSAP](https://gsap.com/), [Framer Motion](https://www.framer.com/motion/)
- **Database & Query**: [Prisma ORM](https://www.prisma.io/), PostgreSQL/SQLite
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/) or [Node.js](https://nodejs.org/) installed.

### Installation

1. Navigate to the project directory:
   ```bash
   cd ~KairosAi
   ```

2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

3. Setup environment files:
   Create a `.env` file based on `.env.example` (if required) and set database parameters.

4. Start database migrations (Prisma):
   ```bash
   bun run db:push
   # or
   npx prisma db push
   ```

5. Start the local Next.js development server:
   ```bash
   bun run dev
   # or
   npm run dev
   ```
   Open `http://localhost:5176` (or the configured port) in your browser.

6. Build the Next.js application for production:
   ```bash
   bun run build
   # or
   npm run build
   ```

---

## 📂 Directory Structure

```
~KairosAi/
├── prisma/               # Prisma database schema configuration
├── public/               # Static assets (logos, images, WebGL configurations)
├── src/
│   ├── app/              # Next.js App Router entrypoints & CSS
│   ├── components/       # Custom React UI components & 3D views
│   │   ├── backgrounds/  # Dynamic canvas background gradients & networks
│   │   ├── providers/    # GSAP and Smooth scroll contexts
│   │   ├── sections/     # Premium sections (Hero, About, Process, Testimonials)
│   │   └── three/        # WebGL scenes, particles, and core simulation
│   ├── hooks/            # Cursor, scroll, and mouse utility hooks
│   ├── lib/              # Utility configurations & Prisma client
│   └── store/            # Zustand global application state
├── package.json          # Dependency manifest
└── tsconfig.json         # TypeScript configurations
```

---

## 📄 License

This project is licensed under the MIT License. See the root [LICENSE](../LICENSE) file for details.
