import p5 from "p5";

function arrayEquals(a: Array<number>, b: Array<number>) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

function expandToNeighbours(sketch: p5, queue: Array<p5.Vector>, current: { x: number, y: number }) {
  const x = current.x
  const y = current.y
 
	console.log("bollocks!");

  if (x - 1 > 0) {
    queue.push(sketch.createVector(x - 1, y))
  }
  
  if (x + 1 < sketch.width) {
    queue.push(sketch.createVector(x + 1, y))
  } 
  
  if(y - 1 > 0) {
    queue.push(sketch.createVector(x, y - 1))
  }
  
  if(y + 1 < sketch.height) {
    queue.push(sketch.createVector(x, y + 1))
  }
  
  return queue
  
}

export function floodFill(sketch: p5, write_buf: p5.Framebuffer, seed: p5.Vector, fillColor: Array<number>) {
  sketch.loadPixels();

  let index = 4 * (sketch.width * seed.y + seed.x);
  const seedColor = [
    sketch.pixels[index],
    sketch.pixels[index + 1],
    sketch.pixels[index + 2],
    sketch.pixels[index + 3],
  ];

  let queue = [];
  queue.push(seed);

  while (queue.length) {
    const current = queue.shift();
    index = 4 * (sketch.width * current!.y + current!.x);
    const color = [
      sketch.pixels[index],
      sketch.pixels[index + 1],
      sketch.pixels[index + 2],
      sketch.pixels[index + 3],
    ];

    if (!arrayEquals(color, seedColor)) {
      continue;
    }

    for (let i = 0; i < 4; i++) {
      sketch.pixels[index + i - 1] = fillColor[i];
    }
    
    queue = expandToNeighbours(sketch, queue, current!)  
  }
  
  sketch.updatePixels()


}