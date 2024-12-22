'use client'

import { Reference, RefObject, useEffect, useRef } from "react";
import p5 from "p5";
import { DrawMode, Layer } from "@/app/page";
import dynamic from "next/dynamic";

export default function Canvas({ mode, layers, layerCursor, frame, p5sketch } : { mode: DrawMode, layers: Array<Layer>, layerCursor: number, frame: number, p5sketch: RefObject<p5 | null> }) {
  const canvas_container: RefObject<HTMLDivElement | null> = useRef(null);

  const modeRef = useRef(mode);
  const layersRef = useRef(layers);
  const layerCursorRef = useRef(layerCursor);
  const frameRef = useRef(frame);
  useEffect(() => {
    modeRef.current = mode;
    layersRef.current = layers;
    layerCursorRef.current = layerCursor;
    frameRef.current = frame;
  });

  
  useEffect(() => {
    const s = (sketch: p5) => {
      let canvas: p5.Renderer;
      const last_mouse_pos = [0, 0];
      let mouse_was_pressed = false;
      let was_pressed_keys: { [id: string]: boolean } = {};
      const pressed_keys: { [id: string]: boolean } = {};
      let write_buf: p5.Framebuffer;

      const get_canvas_dims = () => [Number(canvas.elt.style.width.slice(0, -2)), Number(canvas.elt.style.height.slice(0, -2))];

      sketch.setup = () => {
        window.onkeyup = (e) => { pressed_keys[e.code] = false };
        window.onkeydown = (e) => { pressed_keys[e.code] = true };

        canvas = sketch.createCanvas(200, 200, sketch.WEBGL);
        canvas.parent(canvas_container.current!);
        canvas.style('image-rendering', 'pixelated');

        // Initialize frame buffer
        write_buf = sketch.createFramebuffer() as unknown as p5.Framebuffer;

        { // Set canvas position
          const canvas_container_loc = [canvas_container.current!.offsetLeft, canvas_container.current!.offsetTop];
          const canvas_container_dims = [canvas_container.current!.offsetWidth, canvas_container.current!.offsetHeight];
        
          const canvas_dims = get_canvas_dims();

          canvas.position(
            canvas_container_loc[0] + canvas_container_dims[0] / 2 - canvas_dims[0] / 2,
            canvas_container_loc[1] + canvas_container_dims[1] / 2 - canvas_dims[1] / 2
          );
        }
      };
    
      sketch.mouseMoved = (e: MouseEvent) => {
        const canvas_pos = canvas.position() as { x: number, y: number };

        if (pressed_keys["Space"]) {
          sketch.cursor(sketch.ARROW);
          canvas.position(
            canvas_pos.x + e.movementX,
            canvas_pos.y + e.movementY
          );
        }
      }

      const cursor_handler = () => {
        const canvas_dims = get_canvas_dims();

        // Make mouse cursor disappear when on canvas
        if (sketch.mouseX < 0 || sketch.mouseX > canvas_dims[0] || sketch.mouseY < 0 || sketch.mouseY > canvas_dims[1])
          return;
        sketch.noCursor();
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

      sketch.draw = () => {
        cursor_handler();

        // Get current frame
        const current_frame = layersRef.current[layerCursorRef.current].frames[frameRef.current];

        // Foreground aka UI rendering
        sketch.background(0);
        sketch.translate(-sketch.width / 2, -sketch.height / 2);

        { // Frame
          sketch.image(write_buf, 0, 0, sketch.width, sketch.height);
        }

        // Handle different tools
        switch (modeRef.current) {
          case DrawMode.Brush:
            sketch.push();
            {
              // Draw cursor
              sketch.stroke(200);
              sketch.strokeWeight(1);
              sketch.noFill();
              sketch.circle(sketch.mouseX, sketch.mouseY, 25);

              // Draw
              if (mouse_was_pressed && sketch.mouseIsPressed) {
                write_buf.begin();
                sketch.translate(-sketch.width / 2, -sketch.height / 2);
                {
                  sketch.stroke("red"); // Placeholder
                  sketch.strokeWeight(25);
                  sketch.line(last_mouse_pos[0], last_mouse_pos[1], sketch.mouseX, sketch.mouseY);
                }
                write_buf.end();
              }
            }
            sketch.pop();
            break;
          case DrawMode.Fill:
            
            break;
          case DrawMode.Eraser:
            sketch.push();
            {
              // Draw cursor
              sketch.stroke(200);
              sketch.strokeWeight(1);
              sketch.noFill();
              sketch.circle(sketch.mouseX, sketch.mouseY, 25);

              // Draw
              if (mouse_was_pressed && sketch.mouseIsPressed) {
                write_buf.begin();
                sketch.translate(-sketch.width / 2, -sketch.height / 2);
                {
                  sketch.erase(); // Placeholder
                  sketch.strokeWeight(25);
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
          was_pressed_keys = { ...pressed_keys };
        }
      };
    };
    p5sketch.current = new p5(s);
  }, []);

  return (
    <div className="w-full h-[80%] bg-gray-950 z-[-1] overflow-hidden relative" ref={canvas_container}>
    </div>
  );
}