"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Implementation D: Three.js WebGL (True 3D Isometric Wireframe)
 * - Orthographic Camera (no perspective distortion, 100% parallel edges)
 * - EdgesGeometry + LineSegments for razor-sharp CAD vector outlines
 * - Solid black backface occlusion (masks hidden lines behind solid faces)
 * - Interactive Mouse Drag Orbit in 3D Space
 */
export function ThreeLinearMark() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 320;
    const height = mount.clientHeight || 320;

    // 1. Scene & Orthographic Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#07090E");

    const aspect = width / height;
    const d = 3.2; // View frustum size
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 0.1, 1000);

    // True Isometric viewing angles: azimuth 45deg, elevation 35.264deg
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 3. 3-Tier Layer Group
    const group = new THREE.Group();
    scene.add(group);

    const solidMat = new THREE.MeshBasicMaterial({ color: 0x07090e });
    const edgeColor = new THREE.Color("#94A3B8");
    const edgeMat = new THREE.LineBasicMaterial({ color: edgeColor, linewidth: 1.5 });
    const highlightEdgeMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2 });

    // Function to create a beveled slab with edge lines
    const createSlab = (w: number, h: number, depth: number, yPos: number, isTop = false) => {
      const slabGroup = new THREE.Group();
      slabGroup.position.y = yPos;

      const geom = new THREE.BoxGeometry(w, h, depth);
      const mesh = new THREE.Mesh(geom, solidMat);
      slabGroup.add(mesh);

      const edges = new THREE.EdgesGeometry(geom);
      const line = new THREE.LineSegments(edges, isTop ? highlightEdgeMat : edgeMat);
      slabGroup.add(line);

      return slabGroup;
    };

    // Tier 1: Base (Listening)
    const tier1 = createSlab(2.8, 0.22, 2.8, -0.6);
    group.add(tier1);

    // Tier 2: Middle (Structure)
    const tier2 = createSlab(2.3, 0.22, 2.3, 0);
    group.add(tier2);

    // Tier 3: Top (Reading with calibration disc)
    const tier3 = createSlab(1.8, 0.22, 1.8, 0.6, true);
    group.add(tier3);

    // Cylinder Reticle on Top
    const cylinderGeom = new THREE.CylinderGeometry(0.5, 0.5, 0.05, 32);
    const cylinderMesh = new THREE.Mesh(cylinderGeom, solidMat);
    cylinderMesh.position.y = 0.73;
    group.add(cylinderMesh);

    const cylinderEdges = new THREE.EdgesGeometry(cylinderGeom);
    const cylinderLine = new THREE.LineSegments(
      cylinderEdges,
      new THREE.LineBasicMaterial({ color: 0x60a5fa }),
    );
    cylinderLine.position.y = 0.73;
    group.add(cylinderLine);

    // 4. Mouse Interactive Drag Controls
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
      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    mount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // 5. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle ambient floating wave
      tier1.position.y = -0.6 + Math.sin(elapsed * 1.5) * 0.03;
      tier2.position.y = 0 + Math.sin(elapsed * 1.5 + 0.5) * 0.05;
      tier3.position.y = 0.6 + Math.sin(elapsed * 1.5 + 1.0) * 0.08;
      cylinderMesh.position.y = tier3.position.y + 0.13;
      cylinderLine.position.y = tier3.position.y + 0.13;

      if (!isDragging) {
        group.rotation.y += 0.003;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      mount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[360px] aspect-square mx-auto flex items-center justify-center bg-[#07090E] rounded-2xl border border-border/40 overflow-hidden select-none cursor-grab active:cursor-grabbing">
      {/* Technical Header Callout */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2 z-10">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        <span>FIG 0.1 — THREE.JS WEBGL</span>
      </div>

      <div className="absolute top-4 right-4 font-mono text-[9px] text-indigo-400 uppercase tracking-wider z-10 bg-indigo-950/40 border border-indigo-900/60 px-2 py-0.5 rounded">
        DRAG TO ORBIT 3D
      </div>

      {/* WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Footer Specification Badge */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-muted-foreground border-t border-border/30 pt-2 z-10">
        <span>TRUE 3D ORTHOGRAPHIC</span>
        <span className="text-indigo-400 font-bold">EDGES SHADER</span>
      </div>
    </div>
  );
}
