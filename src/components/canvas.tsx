'use client'

import { Dispatch, RefObject, useEffect, useRef, useState } from "react";
import { DrawMode, Layer, Settings } from "@/shared/shared";
import FloodFill from 'q-floodfill';
import p5, { Framebuffer } from "p5";
import FileDrop from "./file-drop";

export default function Canvas({ mode, layers, setLayers, layerCursor, frame, setFrame, p5sketch, set_mode, settings, setSettings, getNumFrames, playing, setPlaying } : { mode: DrawMode, layers: Array<Layer>, setLayers: Dispatch<Array<Layer>>, layerCursor: number, frame: number, setFrame: Dispatch<number>, p5sketch: RefObject<p5 | null>, set_mode: (mode: DrawMode) => void, settings: Settings, setSettings: Dispatch<Settings>, getNumFrames: () => number, playing: boolean, setPlaying: Dispatch<boolean> }) {
  const canvas_container: RefObject<HTMLDivElement | null> = useRef(null);

  const modeRef = useRef(mode);
  const layersRef = useRef(layers);
  const layerCursorRef = useRef(layerCursor);
  const frameRef = useRef(frame);
  const settingsRef = useRef(settings);
  const playingRef = useRef(playing);
  useEffect(() => {
    modeRef.current = mode;
    layersRef.current = layers;
    layerCursorRef.current = layerCursor;
    frameRef.current = frame;
    settingsRef.current = settings;
    playingRef.current = playing;
  });

  const input_x_res: RefObject<HTMLInputElement | null> = useRef(null);
  const input_y_res: RefObject<HTMLInputElement | null> = useRef(null);
  
  const create_project = (e: React.MouseEvent) => {
    let x_res: number;
    let y_res: number;
    try {
      x_res = Number(input_x_res.current!.value);
      y_res = Number(input_y_res.current!.value);
    }
    catch {
      alert("Invalid Resolution Entered!");
      return;
    }
    e.currentTarget.parentElement!.remove();

    const s = (sketch: p5) => {
      let canvas: p5.Renderer;
      const last_mouse_pos = [0, 0];
      let mouse_was_pressed = false;
      //let was_pressed_keys: { [id: string]: boolean } = {};
      const pressed_keys: { [id: string]: boolean } = {};
      let write_buf: p5.Framebuffer;
      let graphics: p5.Graphics;

      const get_canvas_dims = () => [Number(canvas.elt.style.width.slice(0, -2)), Number(canvas.elt.style.height.slice(0, -2))];

      sketch.setup = () => {
        window.onkeyup = (e) => { pressed_keys[e.code] = false };
        window.onkeydown = (e) => { pressed_keys[e.code] = true };

        canvas = sketch.createCanvas(x_res, y_res, sketch.WEBGL);
        canvas.parent(canvas_container.current!);
        canvas.style('image-rendering', 'pixelated');
        canvas.style('background-color', 'white');

        graphics = sketch.createGraphics(x_res, y_res);

        // Test
        layersRef.current!.push(new Layer(true, "Background", [sketch.createFramebuffer() as unknown as p5.Framebuffer]));
        setLayers([...layersRef.current!]);

        { // Set canvas position
          const canvas_container_dims = [canvas_container.current!.offsetWidth, canvas_container.current!.offsetHeight];
        
          const canvas_dims = get_canvas_dims();

          /*
          canvas.position(
            canvas_container_loc[0] + canvas_container_dims[0] / 2 - canvas_dims[0] / 2,
            canvas_container_loc[1] + canvas_container_dims[1] / 2 - canvas_dims[1] / 2
          );
          */

          canvas.position(
            canvas_container_dims[0] / 2 - canvas_dims[0] / 2,
            canvas_container_dims[1] / 2 - canvas_dims[1] / 2
          );
        }
      };
    
      sketch.mouseMoved = (e: MouseEvent) => {
        const canvas_pos = canvas.position() as { x: number, y: number };

        if (pressed_keys["Space"] && sketch.mouseIsPressed) {
          canvas.position(
            canvas_pos.x + e.movementX,
            canvas_pos.y + e.movementY
          );
        }
      }

      sketch.mouseDragged = sketch.mouseMoved;

      const cursor_handler = () => {
        const canvas_dims = get_canvas_dims();

        // Make mouse cursor disappear when on canvas
        if (sketch.mouseX < 0 || sketch.mouseX >= canvas_dims[0] || sketch.mouseY < 0 || sketch.mouseY >= canvas_dims[1])
          return;
        switch (modeRef.current!) {
          case DrawMode.Brush:
          case DrawMode.Eraser:
            sketch.noCursor();
            break;
          default:
            sketch.cursor(sketch.CROSS);
            break;
        }
      }

      sketch.mouseWheel = (event: WheelEvent) => {
        const canvas_pos = canvas.position() as { x: number, y: number };
        const canvas_dims = get_canvas_dims();
        const dim_perc = 1 + -event.deltaY * 0.001;
        const coord_dif = [canvas_dims[0] * dim_perc - canvas_dims[0], canvas_dims[1] * dim_perc - canvas_dims[1]];

        // Increase canvas size from center
        canvas.position(canvas_pos.x - coord_dif[0] / 2, canvas_pos.y - coord_dif[1] / 2);
        canvas.style('width', `${canvas_dims[0] + coord_dif[0]}px`);
        canvas.style('height', `${canvas_dims[1] + coord_dif[1]}px`);
      }

      const mouse_pressed_loc = [0, 0];
      sketch.mousePressed = () => {
        mouse_pressed_loc[0] = sketch.mouseX;
        mouse_pressed_loc[1] = sketch.mouseY;
      }

      /*
      const mouse_released_loc = [0, 0];
      sketch.mouseReleased = () => {
        mouse_released_loc[0] = sketch.mouseX;
        mouse_released_loc[1] = sketch.mouseY;
      }
      */

      sketch.keyPressed = (event: KeyboardEvent) => {
        switch (event.code) {
          case "KeyB":
            set_mode(DrawMode.Brush);
            break;
          case "KeyF":
            set_mode(DrawMode.Fill);
            break;
          case "KeyE":
            set_mode(DrawMode.Eraser);
            break;
          case "KeyN": // New Layer
            setLayers([...layersRef.current!, new Layer(true, "Untitled", new Array(getNumFrames()).fill(undefined).map(() => sketch.createFramebuffer() as unknown as p5.Framebuffer))]);
            break;
          case "Comma": // Previous frame
            setFrame((frameRef.current! - 1 + getNumFrames()) % getNumFrames());
            break;
          case "Period": // Next frame
            setFrame((frameRef.current! + 1) % getNumFrames());
            break;
          case "Slash": // Play/Pause
            event.preventDefault();
            setPlaying(!playingRef.current!);
            break;
        }
      }

      let local_clipboard: p5.Image;
      sketch.draw = () => {
        cursor_handler();

        // Get current frame
        const current_frame = layersRef.current[layerCursorRef.current].frames[frameRef.current];
        write_buf = current_frame;

        // Foreground aka UI rendering
        sketch.clear();
        sketch.translate(-sketch.width / 2, -sketch.height / 2);

        { // Frame
          for (const layer of layersRef.current!) {
            if (layer.visible)
              sketch.image(layer.frames[frameRef.current!], 0, 0, sketch.width, sketch.height);
          }
          //sketch.image(write_buf, 0, 0, sketch.width, sketch.height);
        }

        // Handle different tools
        switch (modeRef.current!) {
          case DrawMode.Select:
            if (sketch.mouseIsPressed) {
              sketch.push();
              {
                sketch.noFill();
                sketch.stroke(200);
                sketch.strokeWeight(3);
                const selection_org = [mouse_pressed_loc[0], mouse_pressed_loc[1]]
                sketch.rect(
                  mouse_pressed_loc[0],
                  mouse_pressed_loc[1],
                  sketch.mouseX - selection_org[0],
                  sketch.mouseY - selection_org[1]
                );
              }
              sketch.pop();
            }
            else if (mouse_was_pressed) {
              const selection_org = [mouse_pressed_loc[0], mouse_pressed_loc[1]]
              const copied_img = sketch.get(
                mouse_pressed_loc[0],
                mouse_pressed_loc[1],
                sketch.mouseX - selection_org[0],
                sketch.mouseY - selection_org[1]
              );
              const copied: HTMLCanvasElement = (copied_img as unknown as { canvas: HTMLCanvasElement }).canvas;

              local_clipboard = copied_img;

              copied.toBlob(function(blob) { 
                const item = new ClipboardItem({ "image/png": blob! });
                navigator.clipboard.write([item]); 
              });
            }
            break;
          case DrawMode.Brush:
            if (pressed_keys["BracketLeft"]) {
              settings.brush_radius -= 1;
              setSettings({...settings});
            }
            if (pressed_keys["BracketRight"]) {
              settings.brush_radius += 1;
              setSettings({...settings});
            }
            sketch.push();
            {
              // Draw cursor
              sketch.stroke(200);
              sketch.strokeWeight(1);
              sketch.noFill();
              sketch.circle(sketch.mouseX, sketch.mouseY, settingsRef.current!.brush_radius);

              // Draw
              if (mouse_was_pressed && sketch.mouseIsPressed) {
                write_buf.begin();
                sketch.translate(-sketch.width / 2, -sketch.height / 2);
                {
                  sketch.stroke(settingsRef.current!.brush_color);
                  sketch.strokeWeight(settingsRef.current!.brush_radius);
                  sketch.line(last_mouse_pos[0], last_mouse_pos[1], sketch.mouseX, sketch.mouseY);
                }
                write_buf.end();
              }
            }
            sketch.pop();
            break;
          case DrawMode.PixelBrush:
            if (local_clipboard == undefined)
              break;
            sketch.push();
            {
              // Draw cursor
              sketch.image(local_clipboard, sketch.mouseX - local_clipboard.width / 2, sketch.mouseY - local_clipboard.height / 2, local_clipboard.width * settingsRef.current!.pixelbrush_size, local_clipboard.height * settingsRef.current!.pixelbrush_size);

              // Draw
              if (mouse_was_pressed && sketch.mouseIsPressed) {
                write_buf.begin();
                sketch.translate(-sketch.width / 2, -sketch.height / 2);
                {
                  sketch.image(local_clipboard, sketch.mouseX - local_clipboard.width / 2, sketch.mouseY - local_clipboard.height / 2, local_clipboard.width * settingsRef.current!.pixelbrush_size, local_clipboard.height * settingsRef.current!.pixelbrush_size);
                }
                write_buf.end();
              }
            }
            sketch.pop();
            break;
          case DrawMode.Fill:
            if (sketch.mouseIsPressed && sketch.mouseX >= 0 && sketch.mouseX < sketch.width && sketch.mouseY >= 0 && sketch.mouseY < sketch.width) {
              write_buf.begin(); // Fix this and then the rest os just timeline pixel tool and hooking up settings
              {
                graphics.clear();
                (write_buf as unknown as { loadPixels: () => void }).loadPixels();
                const img = new ImageData(new Uint8ClampedArray(write_buf.pixels), sketch.width, sketch.height);
                const flood_fill = new FloodFill(img);
                flood_fill.fill(settingsRef.current!.fill_color, Math.floor(sketch.mouseX), Math.floor(sketch.mouseY), settingsRef.current!.fill_threshold);
                sketch.clear();
                (graphics.drawingContext as CanvasRenderingContext2D).putImageData(flood_fill.imageData, 0, 0);
                sketch.image(graphics, -sketch.width / 2, -sketch.height / 2);
              }
              write_buf.end();
            }
            break;
          case DrawMode.Eraser:
            if (pressed_keys["BracketLeft"]) {
              settings.eraser_radius -= 1;
              setSettings({...settings});
            }
            if (pressed_keys["BracketRight"]) {
              settings.eraser_radius += 1;
              setSettings({...settings});
            }
            sketch.push();
            {
              // Draw cursor
              sketch.stroke(200);
              sketch.strokeWeight(1);
              sketch.noFill();
              sketch.circle(sketch.mouseX, sketch.mouseY, settingsRef.current!.eraser_radius);

              // Draw
              if (mouse_was_pressed && sketch.mouseIsPressed) {
                write_buf.begin();
                sketch.translate(-sketch.width / 2, -sketch.height / 2);
                {
                  sketch.erase(); // Placeholder
                  sketch.strokeWeight(settingsRef.current!.eraser_radius);
                  sketch.line(last_mouse_pos[0], last_mouse_pos[1], sketch.mouseX, sketch.mouseY);
                  sketch.noErase();
                }
                write_buf.end();
              }
            }
            sketch.pop();
            break;
        }

        { // Cleanup
          last_mouse_pos[0] = sketch.mouseX;
          last_mouse_pos[1] = sketch.mouseY;
          mouse_was_pressed = sketch.mouseIsPressed;
          //was_pressed_keys = { ...pressed_keys };
        }
      };
    };
    p5sketch.current = new p5(s);
  }

  /*
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default behavior
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setDroppedFile(e.dataTransfer.files[0]); // Get the first file
      e.dataTransfer.clearData(); // Clear drag data
    }
  };
  */
 // onDrop={handleDrop}
  return (
    <div className="w-full h-[80%] bg-gray-950 z-0 overflow-hidden relative flex content-center align-middle text-center justify-center" ref={canvas_container}>
      <div className="pt-[20%]">
        <button onClick={create_project} className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 mb-1 rounded">Create Project:</button>
        <div className="flex mx-4">
          <input id="create-project-res-x" ref={input_x_res} type="number" defaultValue="1920" pattern="[0-9]" className="text-center appearance-none bg-transparent border border-gray-700 mx-1 my-[0.1rem] max-w-12 max-h-5 rounded-md"></input>
          <p>x</p>
          <input id="create-project-res-y" ref={input_y_res} type="number" defaultValue="1080" pattern="[0-9]" className="text-center appearance-none bg-transparent border border-gray-700 mx-1 my-[0.1rem] max-w-12 max-h-5 rounded-md"></input>
        </div>
      </div>
    </div>
  );
}