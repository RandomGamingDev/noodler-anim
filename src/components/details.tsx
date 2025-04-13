import { download_file, DrawMode, Layer, Save, SerializedLayer, Settings } from "@/shared/shared";
import p5 from "p5";
import { Dispatch, RefObject, SetStateAction } from "react";
import { CanvasCapture } from 'canvas-capture';
import DraggableInput from "./draggable-input";
import { create_project, input_x_res, input_y_res } from "./canvas";

export default function Details({ mode, setMode, layers, fps, getNumFrames, p5sketch, settings, setSettings, customBrushes, setCustomBrushes, currentBrush, setCurrentBrush, addBrush } : { mode: DrawMode, setMode: Dispatch<DrawMode>, layers: Array<Layer>, fps: number, getNumFrames: () => number, p5sketch: RefObject<p5 | null>, settings: Settings, setSettings: Dispatch<Settings>, customBrushes: [p5.Image, string][], setCustomBrushes: Dispatch<SetStateAction<[p5.Image, string][]>>, currentBrush: number, setCurrentBrush: Dispatch<SetStateAction<number>>, addBrush: () => undefined }) {
  const create = () => {
    setMode(DrawMode.Information);
    create_project();
  }
  const create_details = (
    <div className="text-left pt-4">
      <div>
        <button onClick={create} className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 mb-1 rounded">Create Project:</button>
        <div className="flex">
          <input id="create-project-res-x" ref={input_x_res} type="number" defaultValue="1080" pattern="[0-9]" className="text-center appearance-none bg-transparent border border-gray-700 mx-1 my-[0.1rem] max-w-12 max-h-5 rounded-md"></input>
          <p>x</p>
          <input id="create-project-res-y" ref={input_y_res} type="number" defaultValue="1080" pattern="[0-9]" className="text-center appearance-none bg-transparent border border-gray-700 mx-1 my-[0.1rem] max-w-12 max-h-5 rounded-md"></input>
        </div>
      </div>
    </div>
  );

  const general_details = (
    <div className="text-left">
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <th><h2 className="font-normal p-2">Color</h2></th>
            <th>
              <input value={settings.brush_color} onChange={(e) => {
                settings.brush_color = e.currentTarget.value;
                settings.fill_color = e.currentTarget.value;
                setSettings({ ...settings });
              }} className="m-1" type="color" />
            </th>
          </tr>
          <tr>
            <th><h2 className="font-normal p-2">Brush Radius</h2></th>
            <th>
              <DraggableInput value={settings.brush_radius} className="m-1 max-w-16 text-black" onChange={(e) => {
                settings.brush_radius = Number(e.currentTarget.value);
                settings.eraser_radius = Number(e.currentTarget.value);
                setSettings({... settings});
              }} />
            </th>
          </tr>
          <tr>
            <th><h2 className="font-normal p-2">Threshold</h2></th>
            <th><DraggableInput value={settings.fill_threshold} onChange={(e) => {
              settings.fill_threshold = Number(e.currentTarget.value);
              setSettings({... settings});
            }} className="m-1 max-w-16 text-black" /></th>
          </tr>
          <tr>
            <th><h2 className="font-normal p-2">Brush Size</h2></th>
            <th>
              <DraggableInput value={settings.pixelbrush_size} onChange={(e) => {
                settings.pixelbrush_size = Number(e.currentTarget.value);
                setSettings({... settings});
              }} className="m-1 max-w-16 text-black" />
            </th>
          </tr>
          <tr>
            <th colSpan={2} className="w-full">
              <p className="w-full font-bold py-5">Brushes:</p>
              <div className="grid grid-cols-3 gap-4 w-full">
                {
                  customBrushes.map((e, i) => {
                    const setBrush = () => {
                      setCurrentBrush(i);
                    }
                    const remBrush = () => {
                      setCustomBrushes((prevCustomBrushes: [p5.Image, string][]) => {
                        setCurrentBrush(prevCurrentBrush => prevCurrentBrush == prevCustomBrushes.length - 1 ? prevCurrentBrush - 1 : prevCurrentBrush);
                        return [...prevCustomBrushes.slice(0, i), ...prevCustomBrushes.slice(i + 1)];
                      });
                    }

                    return (
                      <div className="w-full rounded-lg border relative aspect-square" key={`custom-brush-${i}`}>
                        <img className={`w-full h-full object-contain cursor-pointer ${currentBrush == i ? "bg-white-100" : null}`} alt={`custom-brush-img-${i}`} onClick={setBrush} src={e[1]}></img>
                        <button onClick={remBrush} className="absolute top-0 left-0 w-3 h-3 flex items-center justify-center bg-red-500 text-white rounded-lg hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-md transition-all" aria-label="Delete">
                          X
                        </button>
                      </div>
                    );
                  })
                }
              </div>
              <button onClick={addBrush} className="w-10 h-10 mt-5 flex items-center justify-center bg-green-500 text-white rounded-lg hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all" aria-label="Create">
                +
              </button>
            </th>
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

  const export_gif = () => {
    CanvasCapture.init(
      document.getElementById("defaultCanvas0")! as HTMLCanvasElement,
      { showRecDot: true }, // Options are optional, more info below.
    );
    CanvasCapture.beginGIFRecord({ fps: fps });
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

  const export_png_frames = () => {
    CanvasCapture.init(
      document.getElementById("defaultCanvas0")! as HTMLCanvasElement,
      { showRecDot: true }, // Options are optional, more info below.
    );
    CanvasCapture.beginPNGFramesRecord({});
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
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={export_vid}>Export Video</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={export_gif}>Export GIF</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={export_png_frames}>Export PNG Frames</button>
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
      {
        [
          create_details,
          general_details,
          general_details,
          general_details,
          general_details,
          general_details,
          general_details,
          download_details,
          export_details,
          information_details
        ][mode]
      }
    </div>
  );
}