'use client'

import Canvas from "@/components/canvas";
import Details from "@/components/details";
import Sidebar from "@/components/sidebar";
import Timeline from "@/components/timeline";
import p5 from "p5";
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

export class Layer {
  visible: boolean
  name: string
  frames: Array<p5.Image>

  constructor(visible: boolean, name: string, frames: Array<p5.Image>) {
    this.visible = visible;
    this.name = name;
    this.frames = frames;
  }
}

export default function Home() {
  const [mode, setMode] = useState(DrawMode.Information);
  const [layers, setLayers] = useState<Array<Layer>>([]);

  ///* Test
  setLayers([
    new Layer(true, "test1", []),
    new Layer(false, "test2", []),
    new Layer(true, "bollocks", [])
  ]);
  //*/

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