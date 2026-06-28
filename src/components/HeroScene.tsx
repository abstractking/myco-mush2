import { useEffect, useRef } from "react";
import * as THREE from "three";
import sunEye from "@/assets/sun-eye-hero.png";

/**
 * Synthwave neon grid with a mystical sun-eye floating above the horizon.
 * Pure Three.js — no postprocessing, mobile-friendly, respects reduced motion.
 */
export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0612, 8, 28);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 1.6, 6);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ---- Neon grid (custom shader for animated wave + vertical gradient) ----
    const isMobile = window.innerWidth < 768;
    const segs = isMobile ? 60 : 120;
    const gridGeo = new THREE.PlaneGeometry(40, 40, segs, segs);
    gridGeo.rotateX(-Math.PI / 2);

    const gridMat = new THREE.ShaderMaterial({
      transparent: true,
      wireframe: true,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color("#ff8a3d") }, // amber near
        uColorB: { value: new THREE.Color("#e94aa8") }, // magenta mid
        uColorC: { value: new THREE.Color("#7c3aed") }, // violet far
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        varying float vDepth;
        void main() {
          vec3 pos = position;
          float wave = sin(pos.x * 0.4 + uTime * 0.6) * 0.25
                     + sin(pos.z * 0.3 - uTime * 0.5) * 0.35
                     + sin((pos.x + pos.z) * 0.2 + uTime * 0.3) * 0.5;
          // Push terrain up away from center
          float dist = length(pos.xz);
          pos.y += wave * smoothstep(2.0, 14.0, dist);
          vDepth = clamp((-pos.z + 4.0) / 18.0, 0.0, 1.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        varying float vDepth;
        void main() {
          vec3 col = mix(uColorA, uColorB, smoothstep(0.0, 0.55, vDepth));
          col = mix(col, uColorC, smoothstep(0.55, 1.0, vDepth));
          float alpha = 1.0 - smoothstep(0.6, 1.0, vDepth);
          gl_FragColor = vec4(col, alpha * 0.95);
        }
      `,
    });

    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.position.y = -0.6;
    scene.add(grid);

    // ---- Sun-eye plane ----
    const texLoader = new THREE.TextureLoader();
    const sunTex = texLoader.load(sunEye);
    sunTex.colorSpace = THREE.SRGBColorSpace;
    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTex,
      transparent: true,
      depthWrite: false,
    });
    const sunSize = isMobile ? 3.4 : 4.4;
    const sunGeo = new THREE.PlaneGeometry(sunSize, sunSize);
    const sun = new THREE.Mesh(sunGeo, sunMat);
    sun.position.set(0, 2.6, -1);
    scene.add(sun);

    // ---- Animation ----
    const clock = new THREE.Clock();
    let frame = 0;
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    io.observe(container);

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      if (!reduced) {
        gridMat.uniforms.uTime.value = t;
        sun.scale.setScalar(1 + Math.sin(t * 0.6) * 0.04);
        sun.rotation.z = Math.sin(t * 0.15) * 0.04;
        sun.position.y = 2.6 + Math.sin(t * 0.4) * 0.06;
      }
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      sunGeo.dispose();
      sunMat.dispose();
      sunTex.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}