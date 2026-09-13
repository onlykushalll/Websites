# 🎂 Birthday Surprise — Interactive Keepsake Web Experience

An aesthetic, emotional, and interactive birthday keepsake website inspired by the iconic *Cutiepage Birthday Wish* experience. Featuring a dark room flashlight discovery, pull-string fairy lights, balloon releases, an interactive 3D cake with real candle-blowing & drag-to-slice mechanics, 3D flip card wish decks, handwritten emotional letters with photo strips, love vouchers, and celebratory fireworks.

---

## ✨ Features & Interactive Flow

The experience progresses seamlessly through 10 interactive stages:

1. **🎁 Stage 1: The Invitation (`intro`)**
   * Personalized recipient name picker & profile presets.
   * Playful evasive "No" button that playfully dodges cursor / touch interactions.
2. **⏳ Stage 2: Surprise Setup (`loading`)**
   * Cinematic progress loader preparing lights, music, and cake.
3. **🔦 Stage 3: Dark Room (`dark_room`)**
   * Interactive dark room with real-time torch/flashlight cursor tracking.
   * Flickering bulb and interactive pull cord to illuminate the surprise.
4. **💡 Stage 4: Ambient Illumination (`lights_on`)**
   * Glowing fairy lights garland animated across the top of the room.
   * Ambient mood transition with celebratory audio prompt.
5. **🎈 Stage 5: Balloon Release (`celebration`)**
   * Floating physics-driven pastel balloons with interactive pop effects.
   * Synchronized celebratory background music start.
6. **🎂 Stage 6: The Interactive Cake (`cake`)**
   * 3D layered birthday cake with glowing candle flames.
   * Candle blowing interaction (microphone support or click-to-blow) and drag-to-slice knife gesture.
7. **⭐ Stage 7: Make a Wish (`make_wish`)**
   * Immersive starlight ambient mode encouraging the recipient to close their eyes and make a wish.
8. **🃏 Stage 8: 3D Flip Card Deck (`wishes_deck`)**
   * 5 beautifully illustrated keepsake cards with 3D flip animations and custom heartfelt messages.
9. **💌 Stage 9: The Heartfelt Letter (`letter`)**
   * Handwritten letter reveal on textured paper with interactive hugs counter and Polaroid photo strip.
10. **💖 Stage 10: Final Page of Love (`final_love`)**
    * Redeemable love/friendship coupons, reasons why you're special counter, scratch card gift box, and celebratory canvas fireworks.

---

## 🛠️ Technology Stack

* **Frontend Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build System:** [Vite 6](https://vitejs.dev/) with `@tailwindcss/vite`
* **Styling & Design System:** [Tailwind CSS v4](https://tailwindcss.com/) + Custom Keyframes & Glassmorphism
* **Animations:** [Motion](https://motion.dev/) (`motion/react`) + [Canvas-Confetti](https://www.npmjs.com/package/canvas-confetti)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Sound Engine:** Standalone **Web Audio API Synthesizer** (real-time harmonic chords, acoustic bass, melody lead, party horns, pop effects, and fireworks without external audio dependencies)

---

## 📂 Project Structure

```text
~Birthday-Surprise/
├── dist/                       # Production build ready for Netlify drag-and-drop
│   ├── index.html
│   ├── _redirects
│   └── assets/
├── netlify.toml                # Netlify deployment configuration & SPA redirects
├── package.json                # Project dependencies & npm scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite + Tailwind v4 build configuration
├── server.ts                   # Express server with optional wish generation
├── index.html                  # HTML entrypoint & Google Fonts imports
├── src/
│   ├── main.tsx                # React application bootstrap
│   ├── App.tsx                 # Master state machine & interaction orchestrator
│   ├── index.css               # Design system, CSS variables & animations
│   ├── types.ts                # TypeScript data interfaces & step definitions
│   ├── data/
│   │   └── defaultData.ts      # Profile data initialization
│   ├── utils/
│   │   ├── audio.ts            # Web Audio API procedural synthesizer
│   │   └── personas.ts         # Pre-configured persona profiles & generators
│   └── components/
│       ├── LandscapeNotice.tsx # Responsive orientation advisor
│       ├── FairyLights.tsx     # Dynamic glowing string lights
│       ├── AudioPlayer.tsx     # BGM and sound effects manager
│       ├── CelebrationBalloons.tsx # Balloon physics & pop system
│       ├── InteractiveCake.tsx # Cake cutting & candle blow interaction
│       ├── FlipCardDeck.tsx    # 3D interactive flip cards
│       ├── HeartfeltLetter.tsx # Handwritten letter & Polaroid memory strip
│       ├── FinalPageOfLove.tsx # Coupons, gift box & fireworks finale
│       └── PersonalizeModal.tsx# Customization modal & settings
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18.0.0 or higher) or **Bun**

### 1. Install Dependencies
```bash
npm install
# or
bun install
```

### 2. Run Locally
* **Full-stack (Vite + Express Server):**
  ```bash
  npm run dev
  ```
* **Frontend Only (Vite SPA):**
  ```bash
  npm run dev:client
  ```

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 Deploying to Netlify

### Option 1: Manual Drag & Drop (Easiest — Direct Folder Upload)
1. Open [Netlify Sites Dashboard](https://app.netlify.com/drop).
2. Drag and drop the compiled **`dist`** folder (`C:\Users\Default.L-HCG-9FVVGS3\OneDrive\Documents\Projects\Websites\~Birthday-Surprise\dist`).
3. Your site goes live instantly with SSL, CDN caching, and SPA redirects enabled!

### Option 2: Deploy via Git (GitHub / GitLab)
1. Push this repository to your Git provider.
2. Link the repository in the **Netlify Dashboard**.
3. Netlify will automatically detect [`netlify.toml`](./netlify.toml) and configure:
   * **Build Command:** `npm run build`
   * **Publish Directory:** `dist`

---

## 💖 Customization & Personas

The application includes pre-configured persona profiles (Siya, Priya, Ananya, Aisha, Rohit, Aryan, and default customizable profiles). Users can open the **Personalize Modal** (`⚙️ Personalize`) at any time to:
* Customize recipient and sender names & nicknames.
* Add personalized photos and captions for the Polaroid strip.
* Select audio themes (Lofi, Celebration, Music Box).
