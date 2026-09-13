# System Architecture & Engineering Standards

## 1. Overview
The **Web Experience Showcase** is structured as a multi-package monorepo containing distinct single-page and server-rendered web applications. Each application demonstrates production-level frontend engineering patterns across 3D graphics, state management, and modern styling.

```
Websites/
├── ~Aura/                 # Luxury 3D Three.js cosmetics experience
├── ~Birthday-Surprise/    # Canvas torch & Web Audio interactive keepsake
├── ~DCOZI/                # Industrial manufacturing showcase with Lenis scroll
├── ~KairosAi/             # Next.js 16+ WebGL AI platform marketing portal
├── ~NeoNax/               # 3D can GLB laboratory showcase
├── ~Som/                  # Minimalist beverage brand experience
├── ~Valentime/            # Interactive proposal journey & date planner
├── docs/
│   ├── CATALOG.md         # Application matrix & feature profiles
│   └── ARCHITECTURE.md    # System design & engineering standards
├── tests/
│   └── showcase.test.ts   # Automated verification suite (Bun test)
├── Dockerfile             # Multi-stage container definition
├── docker-compose.yml     # Local orchestration service
├── LICENSE.md             # Proprietary Commercial Source & Evaluation License
└── package.json           # Monorepo workspaces definition
```

---

## 2. Rendering Pipelines & 3D WebGL Implementations

### Three.js & GLTF Pipeline
Applications utilizing 3D capabilities (`~Aura`, `~NeoNax`, `~KairosAi`, `~Som`) follow a strict WebGL lifecycle management protocol:
- **Canvas Lifecycle:** Responsive canvas containers automatically recalibrate aspect ratio and camera projection matrices upon window resize events.
- **Asset Preloading:** GLTF/GLB models are asynchronously parsed and cached, minimizing frame drops during initial rendering.
- **Resource Disposal:** Geometry, textures, and shader materials are systematically cleaned up on component unmount to prevent GPU memory leaks.

### Canvas Composite Masking (~Birthday-Surprise)
- Implements dynamic lighting simulation via an offscreen 2D canvas buffer.
- Employs `ctx.globalCompositeOperation = "destination-out"` with radial gradients to cut illumination holes through a dark ambient overlay.

---

## 3. State Management & Interaction Patterns
- **Local React State:** Form inputs, modal visibilities, and navigation drawers utilize standard React `useState` and `useReducer` hooks.
- **Spring Animations:** Framer Motion and Motion v12 handle gesture physics, entry/exit transitions, and card flipping.
- **Scroll Orchestration:** Lenis and GSAP ScrollTrigger synchronize scroll offset with canvas rotation and typography shifts.

---

## 4. Quality Control & Sanity Verification
The repository includes an automated verification harness (`tests/showcase.test.ts`) executable via `bun test`:
1. Validates structural presence and manifest validity of all 7 workspaces.
2. Asserts zero unscannable surface files (`<no_ext>` files).
3. Asserts zero un-sanitized personal emails and telephone numbers.
4. Verifies presence and valid size of all 3D GLB model assets.
