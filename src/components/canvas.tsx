'use client'

import { RefObject, useEffect, useRef } from "react";
import p5 from "p5";
import { DrawMode } from "@/app/page";

export default function Canvas({ mode } : { mode: DrawMode }) {
  const canvas_container: RefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const s = (sketch: p5) => {
      let canvas: p5.Renderer;
      let last_mouse_pos = [0, 0];
      let mouse_was_pressed = false;
    
      sketch.setup = () => {
        canvas = sketch.createCanvas(200, 200, sketch.WEBGL);
        canvas.parent(canvas_container.current!);
        canvas.style('width', '1000px');
        canvas.style('height', '50px');
        canvas.style('image-rendering', 'pixelated'); // crisp-edges
        // Make it so that size can be independent of resolution
      };
    
      const canvas_pos_handler = () => {
        // Set canvas position
        const canvas_container_loc = [canvas_container.current!.offsetLeft, canvas_container.current!.offsetTop];
        const canvas_container_dims = [canvas_container.current!.offsetWidth, canvas_container.current!.offsetHeight];
      
        canvas.position(
          canvas_container_loc[0] + canvas_container_dims[0] / 2 - sketch.width / 2,
          canvas_container_loc[1] + canvas_container_dims[1] / 2 - sketch.height / 2
        );
      }

      const cursor_handler = () => {
        // Make mouse cursor disappear when on canvas
        if (sketch.mouseX < 0 || sketch.mouseX > sketch.width || sketch.mouseY < 0 || sketch.mouseY > sketch.width)
          return;
        sketch.noCursor();
      }

      sketch.draw = () => {
        canvas_pos_handler();
        cursor_handler();

        // Rendering
        sketch.background(0);
        sketch.translate(-sketch.width / 2, -sketch.height / 2);
        sketch.rect(0, 0, 100, 100);

        // Handle different tools
        switch (mode) {
          case DrawMode.Brush:
            sketch.push();
            {
              // Draw cursor
              sketch.stroke(200);
              sketch.strokeWeight(1);
              sketch.noFill();
              sketch.circle(sketch.mouseX, sketch.mouseY, 25);
            }
            sketch.pop();
            break;
        }

        { // Cleanup
          last_mouse_pos[0] = sketch.mouseX;
          last_mouse_pos[1] = sketch.mouseY;
          mouse_was_pressed = sketch.mouseIsPressed;
        }
      };
    };
    let myp5 = new p5(s);
  }, [mode]);

  return (
    <div className="w-full h-[80%] bg-gray-950 z-[-1]" ref={canvas_container}>
      <p className="text-white">{mode}</p>
    </div>
  );
}