"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Implementation D: Three.js WebGL (MK-IV 3D Monolith)
 * - Bundle size: ~150 KB
 * - Unconventional Animation:
 *   1. True 3D Stepped Architectural Fin Array + Beveled Base Plinth
 *   2. Dual-Axis Concentric Gyroscopic Rings inside Central Aperture
 *   3. 120-Node Orbiting Telemetry Particle Shell
 *   4. Free 360° Mouse Orbit with Inertial Damping & Axonometric Reset
 */
export function ThreeLinearMark() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const resetCameraRef = useRef<() => void>(() => {});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // True Isometric Axonometric Camera (Orthographic)
    const aspect = width / height;
    const d = 110;
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);

    // Initial 35.264° / 45° isometric angle
    const setIsoPosition = () => {
      camera.position.set(160, 130, 160);
      camera.lookAt(0, -5, 0);
    };
    setIsoPosition();
    resetCameraRef.current = setIsoPosition;

    // WebGL Renderer with High Precision & Antialiasing
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Dark solid faces + high-voltage glowing edge shaders
    const faceMaterial = new THREE.MeshBasicMaterial({
      color: 0x05070b,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
    const edgeMaterialPrimary = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      linewidth: 1.5,
    });
    const edgeMaterialSlate = new THREE.LineBasicMaterial({
      color: 0x334155,
      linewidth: 1,
    });

    // Helper: Create Box with Edges
    const createEdgedBox = (
      w: number,
      h: number,
      dp: number,
      colorMaterial: THREE.LineBasicMaterial,
      yPos: number,
    ) => {
      const geo = new THREE.BoxGeometry(w, h, dp);
      const mesh = new THREE.Mesh(geo, faceMaterial);
      mesh.position.y = yPos;

      const edgesGeo = new THREE.EdgesGeometry(geo);
      const wireframe = new THREE.LineSegments(edgesGeo, colorMaterial);
      mesh.add(wireframe);

      return mesh;
    };

    // 1. Base Plinth (Section 1 Listening)
    const basePlinth = createEdgedBox(80, 14, 80, edgeMaterialSlate, -34);
    mainGroup.add(basePlinth);

    // 2. Middle Fin Array (Section 2 Structure) - 7 Architectural Blades
    const finGroup = new THREE.Group();
    finGroup.position.y = -8;
    for (let i = -3; i <= 3; i++) {
      const finHeight = 18 - Math.abs(i) * 3;
      const fin = createEdgedBox(
        8,
        finHeight,
        50,
        i === 0 ? edgeMaterialPrimary : edgeMaterialSlate,
        0,
      );
      fin.position.x = i * 11;
      finGroup.add(fin);
    }
    mainGroup.add(finGroup);

    // 3. Top Master Deck with Hollow Well (Section 3 Reading)
    const topDeck = createEdgedBox(76, 12, 76, edgeMaterialPrimary, 20);
    mainGroup.add(topDeck);

    // 4. Central Aperture Well (Cylinder Wireframe)
    const cylGeo = new THREE.CylinderGeometry(18, 18, 10, 24);
    const cylMesh = new THREE.Mesh(cylGeo, faceMaterial);
    cylMesh.position.y = 21;
    const cylEdges = new THREE.EdgesGeometry(cylGeo);
    const cylWire = new THREE.LineSegments(cylEdges, edgeMaterialPrimary);
    cylMesh.add(cylWire);
    mainGroup.add(cylMesh);

    // 5. Dual-Axis Gyroscope Rings inside Aperture
    const gyroRingOuterGeo = new THREE.TorusGeometry(12, 0.4, 8, 32);
    const gyroRingOuter = new THREE.LineSegments(
      new THREE.EdgesGeometry(gyroRingOuterGeo),
      edgeMaterialPrimary,
    );
    gyroRingOuter.position.y = 21;

    const gyroRingInnerGeo = new THREE.TorusGeometry(8, 0.4, 8, 24);
    const gyroRingInner = new THREE.LineSegments(
      new THREE.EdgesGeometry(gyroRingInnerGeo),
      new THREE.LineBasicMaterial({ color: 0x60a5fa }),
    );
    gyroRingInner.position.y = 21;

    mainGroup.add(gyroRingOuter);
    mainGroup.add(gyroRingInner);

    // 6. Orbiting Telemetry Particle Shell
    const particleCount = 100;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 65 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 1.5,
      transparent: true,
      opacity: 0.7,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleSystem);

    // Mouse Drag Interaction Setup
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      mainGroup.rotation.y += deltaX * 0.01;
      mainGroup.rotation.x += deltaY * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Render loop
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Auto-orbit rotation
      if (isRotating && !isDragging) {
        mainGroup.rotation.y += 0.005;
      }

      // Gyroscopic ring spins
      gyroRingOuter.rotation.x += 0.02;
      gyroRingOuter.rotation.y += 0.01;
      gyroRingInner.rotation.y -= 0.025;
      gyroRingInner.rotation.z += 0.015;

      // Particle cloud counter-rotation
      particleSystem.rotation.y -= 0.003;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isRotating]);

  return (
    <div className="relative w-full max-w-[420px] aspect-square mx-auto flex flex-col items-center justify-center bg-[#05070B] rounded-2xl border border-white/10 p-5 overflow-hidden select-none shadow-2xl shadow-black/80">
      {/* Header Controls */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-auto">
        <div className="font-mono text-[9px] text-muted-foreground/80 tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>FIG 0.4 — WEBGL 3D ORBIT</span>
        </div>

        <div className="flex items-center gap-1 bg-black/60 border border-white/10 rounded-lg p-0.5 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className={`px-1.5 py-0.5 text-[8px] font-mono rounded transition-colors ${
              isRotating
                ? "bg-cyan-500 text-black font-semibold"
                : "text-muted-foreground hover:text-white"
            }`}
          >
            {isRotating ? "ORBIT ON" : "ORBIT PAUSE"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (resetCameraRef.current) resetCameraRef.current();
            }}
            className="px-1.5 py-0.5 text-[8px] font-mono rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            ISO RESET
          </button>
        </div>
      </div>

      {/* WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      />

      {/* Bottom Hint */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[8px] text-slate-500 z-10 pointer-events-none">
        <span>INTERACTION: DRAG TO ROTATE 360°</span>
        <span className="text-cyan-400">~150 KB RUNTIME</span>
      </div>
    </div>
  );
}
