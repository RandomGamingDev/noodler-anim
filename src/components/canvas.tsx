'use client'

import { useEffect, useRef } from "react";
import p5 from "p5";

export default function Canvas() {
  const canvas_container = useRef(null);

  useEffect(() => {
    const s = (sketch: p5) => {
      let x = 100;
      let y = 100;
    
      sketch.setup = () => {
        const canvas = sketch.createCanvas(200, 200);
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
    <div className="w-full h-full fixed top-0 bg-black ml-[2.5rem] z-[-1]" ref={canvas_container}>

    </div>
  );
}