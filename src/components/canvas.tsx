'use client'

import { RefObject, useEffect, useRef } from "react";
import p5 from "p5";

export default function Canvas() {
  const canvas_container: RefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const s = (sketch: p5) => {
      let x = 100;
      let y = 100;
    
      sketch.setup = () => {
        const canvas = sketch.createCanvas(200, 200);
        const canvas_container_dims = [canvas_container.current!.offsetWidth, canvas_container.current!.offsetHeight];
        canvas.position(canvas_container_dims[0] / 2 - canvas.width / 2, canvas_container_dims[1] / 2 - canvas.height / 2);
        canvas.parent(canvas_container.current!);
      };
    
      sketch.draw = () => {
        sketch.background(0);
        sketch.fill(255);
        sketch.rect(x,y,50,50);
      };
    };
    let myp5 = new p5(s);
  }, []);

  return (
    <div className="w-full h-full fixed top-0 bg-gray-950 ml-[2.5rem] mr-[15rem] z-[-1]" ref={canvas_container}>

    </div>
  );
}