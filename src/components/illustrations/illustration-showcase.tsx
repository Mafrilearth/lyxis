"use client";

import { GsapLinearMark } from "@/components/illustrations/gsap-linear-mark";
import { MotionLinearMark } from "@/components/illustrations/motion-linear-mark";
import { PureCssLinearMark } from "@/components/illustrations/pure-css-linear-mark";
import { ThreeLinearMark } from "@/components/illustrations/three-linear-mark";
import { Activity } from "lucide-react";
import { useState } from "react";

type LibraryKey = "all" | "css" | "motion" | "gsap" | "three";

export function IllustrationShowcase() {
  const [activeTab, setActiveTab] = useState<LibraryKey>("all");

  return (
    <div className="space-y-10">
      {/* Tab Switcher Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
            activeTab === "all"
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-muted/40 text-muted-foreground hover:bg-muted"
          }`}
        >
          VIEW ALL 4 (SIDE-BY-SIDE)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("css")}
          className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
            activeTab === "css"
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-muted/40 text-muted-foreground hover:bg-muted"
          }`}
        >
          1. PURE SVG + CSS (0 KB)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("motion")}
          className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
            activeTab === "motion"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-muted/40 text-muted-foreground hover:bg-muted"
          }`}
        >
          2. MOTION (SPRING & TILT)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("gsap")}
          className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
            activeTab === "gsap"
              ? "bg-emerald-600 text-white shadow-md"
              : "bg-muted/40 text-muted-foreground hover:bg-muted"
          }`}
        >
          3. GSAP (BLUEPRINT DRAW-IN)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("three")}
          className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
            activeTab === "three"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-muted/40 text-muted-foreground hover:bg-muted"
          }`}
        >
          4. THREE.JS (3D WEBGL ORBIT)
        </button>
      </div>

      {/* Showcase Grid */}
      {activeTab === "all" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="space-y-3">
            <PureCssLinearMark />
            <div className="text-center font-mono text-xs text-muted-foreground">
              <span className="font-bold text-foreground">Option A: Pure CSS</span> • 0 KB Runtime
            </div>
          </div>
          <div className="space-y-3">
            <MotionLinearMark />
            <div className="text-center font-mono text-xs text-muted-foreground">
              <span className="font-bold text-foreground">Option B: Motion</span> • Spring Physics
            </div>
          </div>
          <div className="space-y-3">
            <GsapLinearMark />
            <div className="text-center font-mono text-xs text-muted-foreground">
              <span className="font-bold text-foreground">Option C: GSAP</span> • Stroke Assembly
            </div>
          </div>
          <div className="space-y-3">
            <ThreeLinearMark />
            <div className="text-center font-mono text-xs text-muted-foreground">
              <span className="font-bold text-foreground">Option D: Three.js</span> • 3D
              Orthographic
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          {activeTab === "css" && <PureCssLinearMark />}
          {activeTab === "motion" && <MotionLinearMark />}
          {activeTab === "gsap" && <GsapLinearMark />}
          {activeTab === "three" && <ThreeLinearMark />}
        </div>
      )}

      {/* Deep Technical Comparison Matrix */}
      <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary">
            <Activity className="h-4 w-4" /> Technical Benchmark Matrix
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Perbandingan Kinerja, Ukuran Bundle & Fleksibilitas
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground">
                <th className="py-3 px-3">Metrik / Opsi</th>
                <th className="py-3 px-3 text-primary font-bold">1. Pure SVG + CSS</th>
                <th className="py-3 px-3 text-blue-400 font-bold">2. Motion</th>
                <th className="py-3 px-3 text-emerald-400 font-bold">3. GSAP Timeline</th>
                <th className="py-3 px-3 text-indigo-400 font-bold">4. Three.js WebGL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-foreground">
              <tr>
                <td className="py-3 px-3 font-semibold text-muted-foreground">
                  JS Bundle Overhead
                </td>
                <td className="py-3 px-3 font-bold text-emerald-400">0 KB (Nol)</td>
                <td className="py-3 px-3">~28 KB</td>
                <td className="py-3 px-3">~23 KB</td>
                <td className="py-3 px-3 text-amber-400">~150 KB</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-muted-foreground">Frame Rate (FPS)</td>
                <td className="py-3 px-3">60–120 FPS (GPU)</td>
                <td className="py-3 px-3">60 FPS (Spring)</td>
                <td className="py-3 px-3">60 FPS (RAF)</td>
                <td className="py-3 px-3">60 FPS (WebGL)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-muted-foreground">
                  Interaktivitas Mouse
                </td>
                <td className="py-3 px-3">Hover CSS dasar</td>
                <td className="py-3 px-3 font-bold text-blue-400">Parallax 3D & Click Explode</td>
                <td className="py-3 px-3">Play/Pause Timeline Scrub</td>
                <td className="py-3 px-3 font-bold text-indigo-400">Orbit Drag 360° Real 3D</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-muted-foreground">Efek Khas</td>
                <td className="py-3 px-3">Floating wave & laser pulse</td>
                <td className="py-3 px-3">Spring physics & responsive tilt</td>
                <td className="py-3 px-3 font-bold text-emerald-400">CAD Blueprint Line Draw-in</td>
                <td className="py-3 px-3">Hidden line backface removal</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-muted-foreground">
                  Rekomendasi Terbaik
                </td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Hero & Landing Page</td>
                <td className="py-3 px-3">Feature Card & Micro-UI</td>
                <td className="py-3 px-3">Scroll-Driven Storytelling</td>
                <td className="py-3 px-3">Lab / Interactive Showcase</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
