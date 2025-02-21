import p5, { Framebuffer } from "p5";
import { Dispatch, SetStateAction } from "react";

export enum DrawMode {
  Create,
  Clear,
  Select,
  Brush,
  PixelBrush,
  Fill,
  Eraser,
  Save,
  Export,
  Information
}

export function DrawModeName(draw_mode: DrawMode) {
  switch (draw_mode) {
    case DrawMode.Create:
      return "Create";
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
    case DrawMode.Save:
      return "Save";
    case DrawMode.Export:
      return "Export";
    case DrawMode.Information:
      return "Information";
  }
}

/*
async function bufferToBase64(buffer: Uint8Array) {
  // use a FileReader to generate a base64 data URI:
  const base64url = await new Promise(r => {
    const reader = new FileReader()
    reader.onload = () => r(reader.result! as string)
    reader.readAsDataURL(new Blob([buffer]))
  }) as string;
  // remove the `data:...;base64,` part from the start
  return base64url.slice(base64url.indexOf(',') + 1);
}
*/

export class Layer {
  visible: boolean
  name: string
  frames: Array<p5.Framebuffer>

  constructor(visible: boolean, name: string, frames: Array<p5.Framebuffer>) {
    this.visible = visible;
    this.name = name;
    this.frames = frames;
  }

  async serialize(p5sketch: p5) {
    const serialized_frames: Array<string> = [];
    for (const frame of this.frames) {
      p5sketch.clear();
      p5sketch.image(frame, 0, 0, p5sketch.width, p5sketch.height);
      serialized_frames.push(((p5sketch as unknown as { canvas: p5.Renderer }).canvas.elt as HTMLCanvasElement).toDataURL());
    }

    return new SerializedLayer(this.visible, this.name, serialized_frames);
  }
}

export class SerializedLayer {
  visible: boolean
  name: string
  frames: Array<string>

  constructor(visible: boolean, name: string, frames: Array<string>) {
    this.visible = visible;
    this.name = name;
    this.frames = frames;
  }

  static deserialize(thi: SerializedLayer, p5sketch: p5, setLayers: Dispatch<SetStateAction<Layer[]>>) {
    const deserializedFrames: Array<Framebuffer> = new Array(thi.frames.length);
    const returnLayer = new Layer(thi.visible, thi.name, deserializedFrames);
    for (let i = 0; i < thi.frames.length; i++) {
      p5sketch.loadImage(thi.frames[i], (img) => {
        const layerFB = p5sketch.createFramebuffer() as unknown as p5.Framebuffer;
        layerFB.begin();
        p5sketch.image(img, -p5sketch.width / 2, -p5sketch.height / 2);
        layerFB.end();
        deserializedFrames[i] = layerFB;
        setLayers(prevLayers => [...prevLayers]);
      });
    }

    return returnLayer;
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

export class Save {
  res: Array<number>
  fps: number
  layers: Array<SerializedLayer>

  constructor(res: Array<number>, fps: number, layers: Array<SerializedLayer>) {
    this.res = res;
    this.fps = fps;
    this.layers = layers;
  }
}

export function download_file(content: string, fileName: string, contentType: string) {
  const a = document.createElement("a");
  const file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

export const wrapmod = (num: number, mod: number) => num < 0 ? (mod - Math.abs(num % mod)) % mod : Math.abs(num % mod);