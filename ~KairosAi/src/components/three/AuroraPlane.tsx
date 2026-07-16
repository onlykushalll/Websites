'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;

    float n1 = snoise(vec2(uv.x * 1.5 + uTime * 0.05, uv.y * 0.8 + uTime * 0.03));
    float n2 = snoise(vec2(uv.x * 2.0 - uTime * 0.04, uv.y * 1.2 - uTime * 0.02));
    float n3 = snoise(vec2(uv.x * 0.8 + uTime * 0.06, uv.y * 1.5 + uTime * 0.01));

    float combined = (n1 + n2 * 0.5 + n3 * 0.3) * 0.4;

    vec3 color1 = vec3(1.0, 0.98, 0.94);
    vec3 color2 = vec3(0.83, 0.66, 0.33);
    vec3 color3 = vec3(0.96, 0.62, 0.04);
    vec3 color4 = vec3(0.99, 0.95, 0.88);

    vec3 color = mix(color1, color2, smoothstep(-0.3, 0.3, combined));
    color = mix(color, color3, smoothstep(0.0, 0.5, n2) * 0.3);
    color = mix(color, color4, smoothstep(-0.5, 0.0, n3) * 0.4);

    float alpha = smoothstep(-0.5, 0.5, combined) * 0.25;
    alpha *= smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.7, uv.y);

    gl_FragColor = vec4(color, alpha);
  }
`

export default function AuroraPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh position={[0, 0, -8]} scale={[25, 18, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
