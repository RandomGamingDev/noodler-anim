import { DrawMode, DrawModeName, Layer, Settings } from "@/app/page";
import p5 from "p5";
import { Dispatch, RefObject } from "react";
import { CanvasCapture } from 'canvas-capture';

export default function Details({ mode, layers, layerCursor, frame, fps, getNumFrames, p5sketch, settings, setSettings } : { mode: DrawMode, layers: Array<Layer>, layerCursor: number, frame: number, fps: number, getNumFrames: () => number, p5sketch: RefObject<p5 | null>, settings: Settings, setSettings: Dispatch<Settings> }) {
  const clear = () => {
    const current_frame = layers[layerCursor].frames[frame];
    current_frame.begin();
    p5sketch.current!.clear();
    current_frame.end();
  }

  const clear_details = (
    <div className="text-left">
      <table>
        <thead></thead>
        <tbody>
        </tbody>
      </table>
      <button onClick={clear} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Clear</button>
    </div>
  );

  const select_details = (
    <div>

    </div>
  );

  const brush_details = (
    <div className="text-left">
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <th><h2 className="font-normal p-2">Brush Color</h2></th>
            <th><input value={settings.brush_color} onChange={(e) => {
              settings.brush_color = e.currentTarget.value;
              setSettings({... settings});
            }} className="m-1" type="color" /></th>
          </tr>
          <tr>
            <th><h2 className="font-normal p-2">Brush Radius</h2></th>
            <th><input value={settings.brush_radius} onChange={(e) => {
              settings.brush_radius = Number(e.currentTarget.value);
              setSettings({... settings});
            }} className="m-1 max-w-16 text-black" type="number" /></th>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const pixelbrush_details = (
    <div className="text-left">
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <th><h2 className="font-normal p-2">Brush Size</h2></th>
            <th><input value={settings.pixelbrush_size} onChange={(e) => {
              settings.pixelbrush_size = Number(e.currentTarget.value);
              setSettings({... settings});
            }} className="m-1 max-w-16 text-black" type="number" /></th>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const fill_details = (
    <div className="text-left">
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <th><h2 className="font-normal p-2">Fill Color</h2></th>
            <th><input value={settings.fill_color} onChange={(e) => {
              settings.fill_color = e.currentTarget.value;
              setSettings({... settings});
            }} className="m-1" type="color" /></th>
          </tr>
          <tr>
            <th><h2 className="font-normal p-2">Threshold</h2></th>
            <th><input value={settings.fill_threshold} onChange={(e) => {
              settings.fill_threshold = Number(e.currentTarget.value);
              setSettings({... settings});
            }} className="m-1 max-w-16 text-black" type="number" /></th>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const eraser_details = (
    <div className="text-left">
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <th><h2 className="font-normal p-2">Brush Radius</h2></th>
            <th><input value={settings.eraser_radius} onChange={(e) => {
              settings.eraser_radius = Number(e.currentTarget.value);
              setSettings({... settings});
            }} className="m-1 max-w-16 text-black" type="number" /></th>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const download_save = (e: React.MouseEvent) => {
    

    /*
    for (let i = 0; i < num_frames; i++) {
      p5sketch.current!.clear();
      for (const layer of layers) {
        if (layer.visible)
          p5sketch.current!.image(layer.frames[i], 0, 0, p5sketch.current!.width, p5sketch.current!.height);
      }
      CanvasCapture.recordFrame();
    }
    */
  }

  const download_details = (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={download_save}>Download</button>
    </div>
  );

  const export_vid = () => {
    CanvasCapture.init(
      document.getElementById("defaultCanvas0")! as HTMLCanvasElement,
      { showRecDot: true }, // Options are optional, more info below.
    );
    CanvasCapture.beginVideoRecord({ format: CanvasCapture.WEBM, fps: fps });
    const num_frames = getNumFrames();
    /*
    let i = 0;
    const render_frame = () => {
      p5sketch.current!.clear();
      for (const layer of layers) {
        if (layer.visible)
          p5sketch.current!.image(layer.frames[i], 0, 0, p5sketch.current!.width, p5sketch.current!.height);
      }
      CanvasCapture.recordFrame();

      if (i < num_frames) {
        i++;
        console.log(i);
        requestAnimationFrame(render_frame);
      }
      else {
        CanvasCapture.stopRecord();
      }
    }
    requestAnimationFrame(render_frame);
    */
    for (let i = 0; i < num_frames; i++) {
      p5sketch.current!.clear();
      for (const layer of layers) {
        if (layer.visible)
          p5sketch.current!.image(layer.frames[i], 0, 0, p5sketch.current!.width, p5sketch.current!.height);
      }
      CanvasCapture.recordFrame();
    }
    CanvasCapture.stopRecord();
  }

  const export_details = (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={export_vid}>Export</button>
    </div>
  );

  const information_details = (
    <div className="text-left">
      <table>
        <thead></thead>
        <tbody>
          {
            [
              ["New Page", "Ctrl + N"],
              ["Save", "Ctrl + S"],
              ["Brush", "B"],
              ["Grab brush", "G"],
              ["Color picker", "Hold Shift"],
              ["Fill", "F"],
              ["Erase", "E"],
              ["Pan", "Hold Space"],
              ["Zoom", "Hold Ctrl + Mouse Wheel"],
              ["Undo", "Ctrl + Z"],
              ["Play/Pause", "/"],
              ["Previous frame", "<"],
              ["Next frame", ">"],
              ["New layer", "Ctrl Shift + N"],
              ["Merge layer", "Ctrl Shift + M"],
              ["Paste", "Ctrl + V"]
            ].map((e, i) =>
              <tr key={`information-details-row-${i}`}>
                <th><h2 className="font-normal p-2">{e[0]}</h2></th>
                <th><h2 className="p-2">{e[1]}</h2></th>
              </tr>
            )
          }
        </tbody>
      </table>
      <div>
        <p className="text-gray-400">Thanks to Casey REAS and Sketch Machine for the inspiration</p>
      </div>
    </div>
  );

  return (
    <div className="w-64 min-h-screen max-h-screen bg-gray-800 p-2 border border-gray-700 text-gray-300 overflow-scroll">
      <h1 className="text-xl font-bold">{ DrawModeName(mode) }</h1>
      {
        [
          clear_details,
          select_details,
          brush_details,
          pixelbrush_details,
          fill_details,
          eraser_details,
          download_details,
          export_details,
          information_details
        ][mode]
      }
    </div>
  );
}