import { download_file, DrawMode, DrawModeName, Layer, Save, SerializedLayer, Settings } from "@/shared/shared";
import p5 from "p5";
import { Dispatch, RefObject } from "react";
import { CanvasCapture } from 'canvas-capture';
import DraggableInput from "./draggable-input";
import { create_project, input_x_res, input_y_res } from "./canvas";

export default function Details({ mode, layers, layerCursor, frame, fps, getNumFrames, p5sketch, settings, setSettings } : { mode: DrawMode, layers: Array<Layer>, layerCursor: number, frame: number, fps: number, getNumFrames: () => number, p5sketch: RefObject<p5 | null>, settings: Settings, setSettings: Dispatch<Settings> }) {
  const clear = () => {
    const current_frame = layers[layerCursor].frames[frame];
    current_frame.begin();
    p5sketch.current!.clear();
    current_frame.end();
  }

  const create_details = (
    <div className="text-left pt-4">
      <div>
        <button onClick={create_project} className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 mb-1 rounded">Create Project:</button>
        <div className="flex">
          <input id="create-project-res-x" ref={input_x_res} type="number" defaultValue="1920" pattern="[0-9]" className="text-center appearance-none bg-transparent border border-gray-700 mx-1 my-[0.1rem] max-w-12 max-h-5 rounded-md"></input>
          <p>x</p>
          <input id="create-project-res-y" ref={input_y_res} type="number" defaultValue="1080" pattern="[0-9]" className="text-center appearance-none bg-transparent border border-gray-700 mx-1 my-[0.1rem] max-w-12 max-h-5 rounded-md"></input>
        </div>
      </div>
    </div>
  );

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
            <th>
              <input value={settings.brush_color} onChange={(e) => {
                settings.brush_color = e.currentTarget.value;
                setSettings({... settings});
              }} className="m-1" type="color" />
            </th>
          </tr>
          <tr>
            <th><h2 className="font-normal p-2">Brush Radius</h2></th>
            <th>
              <DraggableInput value={settings.brush_radius} className="m-1 max-w-16 text-black" onChange={(e) => {
                settings.brush_radius = Number(e.currentTarget.value);
                setSettings({... settings});
              }} />
            </th>
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
            <th>
              <DraggableInput value={settings.pixelbrush_size} onChange={(e) => {
                settings.pixelbrush_size = Number(e.currentTarget.value);
                setSettings({... settings});
              }} className="m-1 max-w-16 text-black" />
            </th>
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
            <th><DraggableInput value={settings.fill_threshold} onChange={(e) => {
              settings.fill_threshold = Number(e.currentTarget.value);
              setSettings({... settings});
            }} className="m-1 max-w-16 text-black" /></th>
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
            <th><DraggableInput value={settings.eraser_radius} onChange={(e) => {
              settings.eraser_radius = Number(e.currentTarget.value);
              setSettings({... settings});
            }} className="m-1 max-w-16 text-black" /></th>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const download_save = async () => {
    const serialized_layers: Array<SerializedLayer> = [];
    for (const layer of layers)
      serialized_layers.push(await layer.serialize(p5sketch.current!));
    download_file(JSON.stringify(new Save([p5sketch.current!.width, p5sketch.current!.height], fps, serialized_layers)), "save.json", "text/plain");
  }

  const download_details = (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={download_save}>Save</button>
    </div>
  );

  const export_vid = () => {
    CanvasCapture.init(
      document.getElementById("defaultCanvas0")! as HTMLCanvasElement,
      { showRecDot: true }, // Options are optional, more info below.
    );
    CanvasCapture.beginVideoRecord({ format: CanvasCapture.WEBM, fps: fps });
    const num_frames = getNumFrames();
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
              ["New Layer", "N"],
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
    <div className="min-w-64 w-64 min-h-screen max-h-screen bg-gray-800 p-2 border border-gray-700 text-gray-300 overflow-scroll">
      <h1 className="text-xl font-bold">{ DrawModeName(mode) }</h1>
      {
        [
          create_details,
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