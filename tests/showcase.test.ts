import { describe, it, expect } from "bun:test";
import * as fs from "fs";
import * as path from "path";

const ROOT_DIR = path.resolve(__dirname, "..");
const WORKSPACES = [
  "~Aura",
  "~KairosAi",
  "~NeoNax",
  "~Som",
  "~Valentime",
];

describe("Web Experience Showcase — Monorepo Integrity", () => {
  it("verifies root package.json defines all 5 workspaces and UNLICENSED evaluation license", () => {
    const pkgPath = path.join(ROOT_DIR, "package.json");
    expect(fs.existsSync(pkgPath)).toBe(true);

    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    expect(pkg.name).toBe("@showcase/monorepo");
    expect(pkg.license).toBe("UNLICENSED");
    expect(pkg.private).toBe(true);
    expect(pkg.workspaces).toEqual(expect.arrayContaining(WORKSPACES));
  });

  it("verifies every workspace folder exists with a valid package.json", () => {
    for (const ws of WORKSPACES) {
      const wsDir = path.join(ROOT_DIR, ws);
      expect(fs.existsSync(wsDir)).toBe(true);

      const pkgPath = path.join(wsDir, "package.json");
      expect(fs.existsSync(pkgPath)).toBe(true);

      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      expect(pkg.name).toBeDefined();
      expect(typeof pkg.name).toBe("string");
    }
  });

  it("verifies LICENSE.md exists and contains proprietary commercial evaluation terms", () => {
    const licensePath = path.join(ROOT_DIR, "LICENSE.md");
    expect(fs.existsSync(licensePath)).toBe(true);

    const content = fs.readFileSync(licensePath, "utf-8");
    expect(content).toContain("Proprietary Commercial Source & Evaluation License");
    expect(content).toContain("Copyright (c) 2026 Kushal. All rights reserved.");
    // Verify no bare MIT license text remains in root LICENSE.md
    expect(content).not.toContain("Permission is hereby granted, free of charge");
  });

  it("verifies no bare <no_ext> files exist in root or public folders", () => {
    const bareLicense = path.join(ROOT_DIR, "LICENSE");
    expect(fs.existsSync(bareLicense)).toBe(false);

    const bareDockerfile = path.join(ROOT_DIR, "Dockerfile");
    expect(fs.existsSync(bareDockerfile)).toBe(false);
  });
});

describe("Web Experience Showcase — PII & Surface Hygiene Verification", () => {
  it("verifies corporate and personal legacy directories are completely purged", () => {
    const dcoziDir = path.join(ROOT_DIR, "~DCOZI");
    expect(fs.existsSync(dcoziDir)).toBe(false);

    const birthdayDir = path.join(ROOT_DIR, "~Birthday-Surprise");
    expect(fs.existsSync(birthdayDir)).toBe(false);
  });

  it("verifies ~Som/src/components/Footer.tsx has no external personal contact email", () => {
    const footerPath = path.join(ROOT_DIR, "~Som", "src", "components", "Footer.tsx");
    expect(fs.existsSync(footerPath)).toBe(true);

    const content = fs.readFileSync(footerPath, "utf-8");
    expect(content).not.toContain(["hello", "@", "drinksom", ".eu"].join(""));
  });

  it("verifies ~Som/index.html contains no external arena recording script", () => {
    const htmlPath = path.join(ROOT_DIR, "~Som", "index.html");
    const content = fs.readFileSync(htmlPath, "utf-8");
    expect(content).not.toContain("data-arena-recording");
    expect(content).not.toContain("rrweb");
  });
});

describe("Web Experience Showcase — 3D Asset Pipeline", () => {
  it("verifies ~Aura has required 3D models with valid sizes", () => {
    const models = ["lipstick.glb", "perfume_bottle.glb"];
    for (const m of models) {
      const p = path.join(ROOT_DIR, "~Aura", "public", "models", m);
      expect(fs.existsSync(p)).toBe(true);
      const stat = fs.statSync(p);
      expect(stat.size).toBeGreaterThan(1000);
    }
  });

  it("verifies ~NeoNax has required 3D can model", () => {
    const p = path.join(ROOT_DIR, "~NeoNax", "public", "cool-ayyd_soda_can.glb");
    expect(fs.existsSync(p)).toBe(true);
    const stat = fs.statSync(p);
    expect(stat.size).toBeGreaterThan(1000);
  });
});
