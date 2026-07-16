'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════
// KAIROS CORE — Custom GLSL Morphing Glass Sphere
// 3D Simplex Noise vertex displacement + Iridescent refraction
// ═══════════════════════════════════════════════════════════════

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScrollVelocity;
  uniform vec2 uMouse;
  uniform float uMorphIntensity;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewDir;
  varying float vDisplacement;
  varying float vFresnel;

  // ═══ 3D Simplex Noise (Ashima/Stefan Gustavson) ═══
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    // Multi-octave noise displacement
    float noise1 = snoise(position * 1.2 + uTime * 0.25) * 0.5;
    float noise2 = snoise(position * 2.4 + uTime * 0.15) * 0.25;
    float noise3 = snoise(position * 4.8 + uTime * 0.35) * 0.125;
    float totalNoise = (noise1 + noise2 + noise3) * uMorphIntensity;

    // Scroll velocity amplifies morphing
    float scrollAmp = 1.0 + uScrollVelocity * 3.0;

    // Displace along normal
    vec3 displaced = position + normal * totalNoise * scrollAmp;

    // Mouse attraction — pull vertices toward cursor
    vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
    vec3 mouseWorld = vec3(uMouse * 4.0, 0.0);
    vec3 toMouse = mouseWorld - worldPos.xyz;
    float mouseDist = length(toMouse);
    float mouseInfluence = smoothstep(4.0, 0.0, mouseDist) * 0.15;
    displaced += normalize(toMouse) * mouseInfluence;

    // Compute normals for displaced surface
    float eps = 0.001;
    vec3 tangent1 = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));
    if (length(cross(normal, vec3(0.0, 1.0, 0.0))) < 0.01) {
      tangent1 = normalize(cross(normal, vec3(1.0, 0.0, 0.0)));
    }
    vec3 tangent2 = normalize(cross(normal, tangent1));

    vec3 nearby1 = position + tangent1 * eps;
    vec3 nearby2 = position + tangent2 * eps;

    float nNearby1 = snoise(nearby1 * 1.2 + uTime * 0.25) * 0.5 + snoise(nearby1 * 2.4 + uTime * 0.15) * 0.25 + snoise(nearby1 * 4.8 + uTime * 0.35) * 0.125;
    float nNearby2 = snoise(nearby2 * 1.2 + uTime * 0.25) * 0.5 + snoise(nearby2 * 2.4 + uTime * 0.15) * 0.25 + snoise(nearby2 * 4.8 + uTime * 0.35) * 0.125;

    vec3 displacedNearby1 = nearby1 + normal * nNearby1 * uMorphIntensity * scrollAmp;
    vec3 displacedNearby2 = nearby2 + normal * nNearby2 * uMorphIntensity * scrollAmp;

    vec3 newNormal = normalize(cross(displacedNearby1 - displaced, displacedNearby2 - displaced));

    vNormal = normalize(normalMatrix * newNormal);
    vWorldPosition = (modelMatrix * vec4(displaced, 1.0)).xyz;
    vViewDir = normalize(cameraPosition - vWorldPosition);
    vDisplacement = totalNoise;

    // Fresnel
    float fresnel = pow(1.0 - max(dot(vViewDir, vNormal), 0.0), 3.0);
    vFresnel = fresnel;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uOpacity;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewDir;
  varying float vDisplacement;
  varying float vFresnel;

  void main() {
    // ═══ Iridescent color based on view angle + displacement ═══
    vec3 champagne = vec3(0.77, 0.66, 0.51);   // #C4A882
    vec3 platinum  = vec3(0.72, 0.72, 0.78);   // #B8B8C8
    vec3 lilac     = vec3(0.55, 0.49, 0.78);   // #8B7EC8
    vec3 iceBlue   = vec3(0.42, 0.72, 0.88);   // #6BB8E0
    vec3 frost     = vec3(0.91, 0.88, 0.94);   // #E8E0F0
    vec3 pureWhite = vec3(0.98, 0.98, 0.98);

    // View-angle dependent color mixing
    float viewAngle = 1.0 - max(dot(vViewDir, vNormal), 0.0);

    // Iridescent shift: center is champagne, edges shift through lilac to blue
    vec3 baseColor = mix(pureWhite, champagne, 0.3);
    vec3 iridescentColor = mix(champagne, lilac, smoothstep(0.0, 0.5, viewAngle));
    iridescentColor = mix(iridescentColor, iceBlue, smoothstep(0.3, 0.8, viewAngle));

    // Add displacement-based color variation
    iridescentColor = mix(iridescentColor, frost, smoothstep(-0.3, 0.3, vDisplacement) * 0.3);

    // ═══ Chromatic Aberration at edges ═══
    float chromaticStrength = pow(viewAngle, 2.0) * 0.08;
    vec3 chromaticR = mix(iridescentColor, iceBlue, chromaticStrength);
    vec3 chromaticG = iridescentColor;
    vec3 chromaticB = mix(iridescentColor, lilac, chromaticStrength);

    // ═══ Fresnel rim glow ═══
    float rimGlow = pow(vFresnel, 2.0);
    vec3 rimColor = mix(platinum, iceBlue, rimGlow);

    // ═══ Final compositing ═══
    vec3 finalColor = mix(chromaticG, rimColor, rimGlow * 0.6);
    finalColor += vec3(chromaticR.r, 0.0, 0.0) * chromaticStrength * 3.0;
    finalColor += vec3(0.0, 0.0, chromaticB.b) * chromaticStrength * 3.0;

    // Subtle inner glow
    float innerGlow = smoothstep(0.5, 0.0, viewAngle) * 0.1;
    finalColor += champagne * innerGlow;

    // Surface quality: slightly translucent
    float alpha = mix(0.6, 0.95, rimGlow) * uOpacity;

    gl_FragColor = vec4(finalColor, alpha);
  }
`

export default function KairosCore() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const scrollVelocityRef = useRef(0)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = Math.abs(currentY - lastScrollY.current)
      scrollVelocityRef.current = Math.min(delta / 100, 1.0)
      lastScrollY.current = currentY
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const shaderUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScrollVelocity: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uMorphIntensity: { value: 0.6 },
    uOpacity: { value: 1.0 },
  }), [])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
      materialRef.current.uniforms.uScrollVelocity.value += 
        (scrollVelocityRef.current - materialRef.current.uniforms.uScrollVelocity.value) * 0.05
      materialRef.current.uniforms.uMouse.value.set(mousePos.x, mousePos.y)
      
      // Decay scroll velocity
      scrollVelocityRef.current *= 0.95
    }
  })

  return (
    <group>
      {/* Main morphing glass core */}
      <mesh>
        <icosahedronGeometry args={[1.8, 64]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={shaderUniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner wireframe structure — visible through the glass */}
      <mesh scale={0.85}>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshBasicMaterial
          color="#8B7EC8"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Orbital ring 1 — Champagne */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.8, 0.008, 16, 200]} />
        <meshStandardMaterial
          color="#C4A882"
          emissive="#C4A882"
          emissiveIntensity={0.5}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Orbital ring 2 — Lilac */}
      <mesh rotation={[-Math.PI / 6, Math.PI / 3, 0]}>
        <torusGeometry args={[3.2, 0.006, 16, 200]} />
        <meshStandardMaterial
          color="#8B7EC8"
          emissive="#8B7EC8"
          emissiveIntensity={0.4}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Orbital ring 3 — Ice Blue */}
      <mesh rotation={[Math.PI / 8, -Math.PI / 5, Math.PI / 6]}>
        <torusGeometry args={[3.6, 0.004, 16, 200]} />
        <meshStandardMaterial
          color="#6BB8E0"
          emissive="#6BB8E0"
          emissiveIntensity={0.3}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Ambient glow sphere */}
      <mesh scale={2.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#E8E0F0"
          emissive="#C4A882"
          emissiveIntensity={0.08}
          transparent
          opacity={0.05}
        />
      </mesh>
    </group>
  )
}
