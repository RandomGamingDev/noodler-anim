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
  PixelBrush,
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
    case DrawMode.PixelBrush:
      return "PixelBrush";
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

export class Settings {
  brush_color: string
  brush_radius: number
  pixelbrush_size: number
  fill_color: string
  fill_threshold: number
  eraser_radius: number

  constructor(
    brush_color: string = "#000000",
    brush_radius: number = 25,
    pixelbrush_size: number = 1,
    fill_color: string = "#000000",
    fill_threshold: number = 0,
    eraser_radius: number = 25
  ) {
    this.brush_color = brush_color;
    this.brush_radius = brush_radius;
    this.pixelbrush_size = pixelbrush_size;
    this.fill_color = fill_color;
    this.fill_threshold = fill_threshold;
    this.eraser_radius = eraser_radius;
  }
}

export default function Home() {
  const [mode, setMode] = useState(DrawMode.Information);
  const set_mode = (mode: DrawMode) => {
    //const clicked = e.currentTarget;
    const clicked = document.getElementById(DrawModeName(mode).toLowerCase())!;
    clicked.setAttribute("stroke", "#ADD8E6");
    clicked.setAttribute("fill", "#ADD8E6");
    setMode(prev_mode => {
      if (mode == prev_mode)
        return prev_mode;
      const unselected = document.getElementById(DrawModeName(prev_mode).toLowerCase());
      unselected!.setAttribute("stroke", "currentColor");
      unselected!.setAttribute("fill", "currentColor");
      return mode;
    });
  }
  const [layers, setLayers] = useState<Array<Layer>>([
    new Layer(true, "test1", []),
    new Layer(false, "test2", []),
    new Layer(true, "bollocks", [])
  ]);
  const get_num_frames = () => layers[0].frames.length;
  const [layerCursor, setLayerCursor] = useState<number>(0);
  const [frame, setFrame] = useState<number>(0);
  const [fps, setFps] = useState<number>(60);
  const p5sketch = useRef<p5>(null);
  const [settings, setSettings] = useState<Settings>(new Settings());

  return (
    <div className="flex">
      <Sidebar set_mode={set_mode}></Sidebar>
      <div className="w-full max-h-screen">
        <Canvas mode={mode} layers={layers} setLayers={setLayers} layerCursor={layerCursor} frame={frame} p5sketch={p5sketch} set_mode={set_mode} settings={settings}></Canvas>
        <Timeline layers={layers} setLayers={setLayers} layerCursor={layerCursor} setLayerCursor={setLayerCursor} frame={frame} setFrame={setFrame} fps={fps} setFps={setFps}></Timeline>
      </div>
      <Details mode={mode} layers={layers} layerCursor={layerCursor} frame={frame} fps={fps} getNumFrames={get_num_frames} p5sketch={p5sketch} settings={settings!} setSettings={setSettings}></Details>
    </div>
  );
}