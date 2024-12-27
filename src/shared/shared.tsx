import p5 from "p5";

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

export class Layer {
  visible: boolean
  name: string
  frames: Array<p5.Framebuffer>

  constructor(visible: boolean, name: string, frames: Array<p5.Framebuffer>) {
    this.visible = visible;
    this.name = name;
    this.frames = frames;
  }

  async serialize() {
    const serialized_frames: Array<string> = [];
    for (const frame of this.frames) {
      (frame as unknown as { loadPixels: () => void }).loadPixels();
      serialized_frames.push(await bufferToBase64(frame.pixels as unknown as Uint8Array));
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