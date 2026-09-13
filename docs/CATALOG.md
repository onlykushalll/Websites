# Web Experience Showcase — Architecture & Product Catalog

This catalog provides technical audits, visual specifications, 3D asset inventories, and architectural capabilities for all seven applications within the Web Experience Showcase monorepo.

---

## 1. Application Directory Matrix

| Application | Path | Domain & Purpose | Core Technologies | Interactive Highlights |
| :--- | :--- | :--- | :--- | :--- |
| **Aura** | `~Aura/` | Ultra-luxury cosmetics & perfume e-commerce | React 18, Three.js, GSAP, Tailwind CSS | Custom GLB 3D viewer, cursor follower, scroll trigger animations |
| **Birthday Surprise** | `~Birthday-Surprise/` | Interactive celebration keepsake | React 19, Vite, Motion, Web Audio API | Canvas flashlight torch, 3D sliceable cake, coupon flip cards |
| **Dcozi** | `~DCOZI/` | Commercial kiosk & digital podium manufacturing | React 18, Vite, Lenis, Lucide React | Inertial smooth scrolling, interactive RFQ flow, hardware spec tables |
| **Kairos AI** | `~KairosAi/` | Autonomous AI workflow agent platform | Next.js 16 (App Router), React 19, Three.js, Tailwind | Neural WebGL particle dust, dynamic routing, Aurora gradient shaders |
| **NeoNax** | `~NeoNax/` | Futuristic lab beverage & materials experience | React 18, Vite, Three.js, Lucide React | 3D aluminum can GLB rendering with real-time environment reflection |
| **Som** | `~Som/` | Organic beverage brand & launch portal | React 18, Vite, Three.js, Tailwind CSS | High-contrast kinetic typography, product showcase, waitlist capture |
| **Valentime** | `~Valentime/` | Interactive romantic proposal journey | React 19, Vite, Motion, Canvas Confetti | Branching decision trees, evasive buttons, date itinerary planner |

---

## 2. Technical Profile by Application

### 1. Aura (~Aura)
- **Design System:** Luxury editorial aesthetic, muted serif typography, deep noir backgrounds with golden accents.
- **3D Asset Pipeline:** Custom GLB models (`lipstick.glb`, `perfume_bottle.glb`) rendered via Three.js with PBR materials, ambient occlusion, and directional key lighting.
- **Micro-Interactions:** Mouse-tracking custom cursor with fluid magnetic snap on interactive buttons and product cards.
- **Animation Orchestration:** GSAP ScrollTrigger timeline coordinating product rotation with vertical scroll depth.

### 2. Birthday Surprise (~Birthday-Surprise)
- **Design System:** Whimsical warm-tinted celebration interface with fairy lights and playful micro-typography.
- **Interactive Torch Engine:** HTML5 Canvas `globalCompositeOperation = "destination-out"` mask simulating flashlight illumination in a darkened room.
- **3D Cake System:** Layered cake slice physics with candle blowout audio trigger and multi-stage confetti burst.
- **Sound System:** Procedural Web Audio API sound synthesis generating melodic chimes without external audio asset dependencies.

### 3. Dcozi (~DCOZI)
- **Design System:** Heavy industrial Swiss modernist aesthetic with high-contrast slate and metallic gold highlights.
- **Performance:** Integrated Lenis inertial scrolling engine maintaining 60 FPS across complex specification grids.
- **Component Architecture:** Reusable product showcase cards with specification toggles, dimension blueprints, and RFQ dialogs.

### 4. Kairos AI (~KairosAi)
- **Design System:** Cybernetic futuristic dark mode with custom glowing gradient tokens and glassmorphic panels.
- **WebGL Particle Field:** Three.js custom shader rendering 5,000 interactive nodes reacting dynamically to cursor velocity.
- **Framework Integration:** Built on Next.js 16 App Router with server-side rendered landing structures and client-side WebGL canvas hydration.

### 5. NeoNax (~NeoNax)
- **Design System:** Bio-tech cyber laboratory theme with matrix-style monospace annotations and neon accents.
- **3D Can Visualization:** GLTF loader integration rendering metallic specular highlights on curved aluminum geometries (`cool-ayyd_soda_can.glb`).
- **Responsive Layout:** Adaptive split-screen layout transforming from dual desktop viewports into single-column mobile cards.

### 6. Som (~Som)
- **Design System:** Nordic minimalist beverage branding with ultra-clean typography and bold color blocking.
- **Interactive Features:** Animated product showcase with real-time interaction states and responsive waitlist registration portal.

### 7. Valentime (~Valentime)
- **Design System:** Playful pastel illustration aesthetic with smooth physics-based card flips and spring animations.
- **Interaction Logic:** Evasive "No" button algorithm with dynamic avoidance boundaries and escalating persuasion states.
- **Workflow:** Multi-stage date planner letting users customize dinner, activities, and locations with celebration export.

---

## 3. Commercial Evaluation & Rarity Assets
- **Zero Third-Party PII:** Fully sanitized of real phone numbers, real GSTIN numbers, and proprietary contact addresses.
- **Held-Out Benchmark Quality:** Contains standalone shaders, custom procedural canvas math, and self-contained WebGL pipelines.
- **Proprietary Commercial Evaluation License:** Protected under explicit commercial evaluation terms.
