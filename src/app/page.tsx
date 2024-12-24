'use client'

import Canvas from "@/components/canvas";
import Details from "@/components/details";
import Sidebar from "@/components/sidebar";
import Timeline from "@/components/timeline";
import { DrawMode, DrawModeName, Layer, Settings } from "@/shared/shared";
import p5 from "p5";
import { useRef, useState } from "react";

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