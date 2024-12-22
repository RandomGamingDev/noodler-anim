'use client'

import Canvas from "@/components/canvas";
import Details from "@/components/details";
import Sidebar from "@/components/sidebar";
import Timeline from "@/components/timeline";
import p5 from "p5";
import { useEffect, useRef, useState } from "react";

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
  frames: Array<p5.Framebuffer>

  constructor(visible: boolean, name: string, frames: Array<p5.Framebuffer>) {
    this.visible = visible;
    this.name = name;
    this.frames = frames;
  }
}

export default function Home() {
  const [mode, setMode] = useState(DrawMode.Information);
  const [layers, setLayers] = useState<Array<Layer>>([
    new Layer(true, "test1", []),
    new Layer(false, "test2", []),
    new Layer(true, "bollocks", [])
  ]);
  const [layerCursor, setLayerCursor] = useState<number>(0);
  const [frame, setFrame] = useState<number>(0);
  const [fps, setFps] = useState<number>(60);
  const p5sketch = useRef<p5>(null);

  return (
    <div className="flex">
      <Sidebar setMode={setMode}></Sidebar>
      <div className="w-full max-h-screen">
        <Canvas mode={mode} layers={layers} setLayers={setLayers} layerCursor={layerCursor} frame={frame} p5sketch={p5sketch}></Canvas>
        <Timeline layers={layers} setLayers={setLayers} layerCursor={layerCursor} setLayerCursor={setLayerCursor} frame={frame} setFrame={setFrame} fps={fps} setFps={setFps}></Timeline>
      </div>
      <Details mode={mode} layers={layers} layerCursor={layerCursor} frame={frame} p5sketch={p5sketch}></Details>
    </div>
  );
}