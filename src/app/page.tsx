'use client'

//import Canvas from "@/components/canvas";
import dynamic from "next/dynamic";
const Canvas = dynamic(() => import("@/components/canvas"), {
  ssr: false, // Disable server-side rendering
});
const Details = dynamic(() => import("@/components/details"), {
  ssr: false, // Disable server-side rendering
});

//import Details from "@/components/details";
import Sidebar from "@/components/sidebar";
import Timeline from "@/components/timeline";
import { DrawMode, DrawModeName, Layer, Settings } from "@/shared/shared";
import { useRef, useState } from "react";
import p5 from "p5";

export default function Home() {
  const [mode, setMode] = useState(DrawMode.Create);
  const set_mode = (mode: DrawMode) => {
    const clicked = document.getElementById(DrawModeName(mode).toLowerCase())!;
    clicked.setAttribute("stroke", "#ADD8E6");
    clicked.setAttribute("fill", "#ADD8E6");
    setMode(prev_mode => {
      if (mode == prev_mode)
        return prev_mode;
      const unselected = document.getElementById(DrawModeName(prev_mode).toLowerCase());
      if (unselected != null) {
        unselected!.setAttribute("stroke", "currentColor");
        unselected!.setAttribute("fill", "currentColor");
      }
      return mode;
    });
  }
  const [layers, setLayers] = useState<Layer[]>([]);
    /* Test Layers
    new Layer(true, "test1", []),
    new Layer(false, "test2", []),
    new Layer(true, "bollocks", [])
    //*/
  const get_num_frames = () => layers.length > 0 ? layers[0].frames.length : 0;
  const [layerCursor, setLayerCursor] = useState<number>(0);
  const [frame, setFrame] = useState<number>(0);
  const [fps, setFps] = useState<number>(60);
  const p5sketch = useRef<p5>(null);
  const [settings, setSettings] = useState<Settings>(new Settings());
  const [playing, setPlaying] = useState(false);

  return (
    <div className="max-w-full flex">
      <Sidebar set_mode={set_mode}></Sidebar>
      <div className="max-w-full w-full max-h-screen">
        <Canvas mode={mode} layers={layers} setLayers={setLayers} layerCursor={layerCursor} frame={frame} setFrame={setFrame} p5sketch={p5sketch} set_mode={set_mode} settings={settings} setSettings={setSettings} getNumFrames={get_num_frames} playing={playing} setPlaying={setPlaying} setFps={setFps}></Canvas>
        <Timeline layers={layers} setLayers={setLayers} layerCursor={layerCursor} setLayerCursor={setLayerCursor} frame={frame} setFrame={setFrame} fps={fps} setFps={setFps} playing={playing} setPlaying={setPlaying} getNumFrames={get_num_frames} p5sketch={p5sketch}></Timeline>
      </div>
      <Details mode={mode} layers={layers} layerCursor={layerCursor} frame={frame} fps={fps} getNumFrames={get_num_frames} p5sketch={p5sketch} settings={settings!} setSettings={setSettings}></Details>
    </div>
  );
}