'use client'

import Canvas from "@/components/canvas";
import Details from "@/components/details";
import Sidebar from "@/components/sidebar";
import Timeline from "@/components/timeline";
import { useState } from "react";

export enum DrawMode {
  Clear,
  Select,
  Brush,
  Fill,
  Eraser,
  Download,
  Export,
  Information
}

export function DrawModeName(draw_mode: DrawMode) {
  switch (draw_mode) {
    case DrawMode.Clear:
      return "Clear";
    case DrawMode.Select:
      return "Select";
    case DrawMode.Brush:
      return "Brush";
    case DrawMode.Fill:
      return "Fill";
    case DrawMode.Eraser:
      return "Eraser";
    case DrawMode.Download:
      return "Download";
    case DrawMode.Export:
      return "Export";
    case DrawMode.Information:
      return "Information";
  }
}

export default function Home() {
  const [mode, setMode] = useState(DrawMode.Information);

  return (
    <div className="flex">
      <Sidebar setMode={setMode}></Sidebar>
      <div className="w-full max-h-screen">
        <Canvas></Canvas>
        <Timeline></Timeline>
      </div>
      <Details mode={mode}></Details>
    </div>
  );
}