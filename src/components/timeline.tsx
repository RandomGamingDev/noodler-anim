import { Layer, wrapmod } from "@/shared/shared";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import DraggableInput from "./draggable-input";
import p5 from "p5";

export default function Timeline({ layers, setLayers, layerCursor, setLayerCursor, frame, setFrame, fps, setFps, playing, setPlaying, getNumFrames, p5sketch } : { layers: Array<Layer>, setLayers: Dispatch<SetStateAction<Layer[]>>, layerCursor: number, setLayerCursor: Dispatch<number>, frame: number, setFrame: Dispatch<number>, fps: number, setFps: Dispatch<number>, playing: boolean, setPlaying: Dispatch<boolean>, getNumFrames: () => number, p5sketch: RefObject<p5 | null> }) {
  const back = () => {
    setFrame((frame - 1) % layers[0].frames.length);
  }
  const play = () => {
    setPlaying(!playing);
  }
  const forward = () => {
    setFrame((frame + 1) % layers[0].frames.length);
  }

  const change_visibility = (e: React.MouseEvent) => {
    const layer_id = Number(e.currentTarget.parentElement!.parentElement!.id.slice("layers-row-".length));
    layers[layer_id].visible = !layers[layer_id].visible;
    setLayers([...layers]);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing) {
        setFrame((frame + 1) % layers[0].frames.length);
      }
    }, 1000 / fps);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [fps, frame, layers, playing, setFrame])

  return (
    <div className="max-w-[84.5vw] w-full h-[20%] bg-gray-800 z-[-1] border border-gray-700">
      <div className="flex border border-gray-700">
        <div className="flex px-1">
          <svg id="back" onClick={back} strokeWidth={1.5} stroke="currentColor" className="cursor-pointer mx-1 my-1 size-4" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4487 1.67437C11.5135 1.63178 11.5897 1.60648 11.669 1.60124C11.7484 1.59599 11.8277 1.61101 11.8985 1.64463C11.9692 1.67826 12.0285 1.7292 12.0699 1.79188C12.1113 1.85455 12.1333 1.92655 12.1333 1.99997V9.99997C12.1333 10.0734 12.1113 10.1454 12.0699 10.2081C12.0285 10.2707 11.9692 10.3217 11.8985 10.3553C11.8277 10.3889 11.7484 10.4039 11.669 10.3987C11.5897 10.3935 11.5135 10.3682 11.4487 10.3256L5.382 6.32557C5.32582 6.28857 5.28004 6.23972 5.24845 6.18308C5.21685 6.12645 5.20037 6.06367 5.20037 5.99997C5.20037 5.93627 5.21685 5.87349 5.24845 5.81686C5.28004 5.76022 5.32582 5.71137 5.382 5.67437L11.4487 1.67437ZM4.76666 10.3553H3.9V1.55528H4.76666V10.3553Z" fill="white"/></svg>
          {
            playing ?
            <svg id="pause" onClick={play} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer mx-1 my-1 size-4" fill="none" viewBox="0 0 24 24" strokeWidth={5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /></svg> :
            <svg id="play" onClick={play} strokeWidth={1.5} stroke="currentColor" className="cursor-pointer mx-1 my-1 size-4" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.611 1.67437C1.54371 1.63179 1.46454 1.60649 1.38215 1.60124C1.29976 1.596 1.21734 1.61101 1.14391 1.64464C1.07048 1.67826 1.00888 1.7292 0.965859 1.79188C0.922837 1.85456 0.900052 1.92655 0.900002 1.99997V9.99997C0.900052 10.0734 0.922837 10.1454 0.965859 10.2081C1.00888 10.2707 1.07048 10.3217 1.14391 10.3553C1.21734 10.3889 1.29976 10.4039 1.38215 10.3987C1.46454 10.3935 1.54371 10.3682 1.611 10.3256L7.911 6.32557C7.96933 6.28857 8.01688 6.23972 8.04969 6.18309C8.0825 6.12645 8.09961 6.06367 8.09961 5.99997C8.09961 5.93627 8.0825 5.87349 8.04969 5.81686C8.01688 5.76023 7.96933 5.71137 7.911 5.67437L1.611 1.67437Z" fill="white"/></svg>
          }
          <svg id="forward" onClick={forward} strokeWidth={1.5} stroke="currentColor" className="cursor-pointer mx-1 my-1 size-4" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.55133 1.67438C1.48654 1.6318 1.41029 1.6065 1.33096 1.60125C1.25162 1.596 1.17225 1.61102 1.10154 1.64464C1.03083 1.67827 0.971512 1.72921 0.930083 1.79189C0.888655 1.85457 0.866714 1.92656 0.866665 1.99998V9.99998C0.866714 10.0734 0.888655 10.1454 0.930083 10.2081C0.971512 10.2708 1.03083 10.3217 1.10154 10.3553C1.17225 10.3889 1.25162 10.404 1.33096 10.3987C1.41029 10.3935 1.48654 10.3682 1.55133 10.3256L7.618 6.32558C7.67417 6.28858 7.71996 6.23973 7.75155 6.1831C7.78314 6.12646 7.79962 6.06368 7.79962 5.99998C7.79962 5.93628 7.78314 5.8735 7.75155 5.81687C7.71996 5.76023 7.67417 5.71138 7.618 5.67438L1.55133 1.67438ZM8.23333 10.4H9.1V5.99997V1.59997H8.23333V10.4Z" fill="white"/></svg>
        </div>
        <div className="flex pl-3">
          <p>Frame</p>
          <DraggableInput value={frame} className="text-center appearance-none bg-transparent border border-gray-700 ml-1 mr-4 my-[0.1rem] max-w-10 max-h-5 rounded-md" onChange={(e) => {
            const numFrames = getNumFrames();
            try {
              setFrame(wrapmod(Number(e.currentTarget.value), numFrames));
            }
            catch {}
          }}></DraggableInput>
          <p>FPS</p>
          <DraggableInput value={fps} className="text-center appearance-none bg-transparent border border-gray-700 ml-1 mr-4 my-[0.1rem] max-w-10 max-h-5 rounded-md" onChange={(e) => {
            try {
              setFps(Number(e.currentTarget.value))
            }
            catch {}
          }}></DraggableInput>
          <p>Length</p>
          <DraggableInput value={getNumFrames()} className="text-center appearance-none bg-transparent border border-gray-700 ml-1 mr-4 my-[0.1rem] max-w-10 max-h-5 rounded-md" onChange={(e) => {
            /*
            const newNumFrames = Number(e.currentTarget.value);
            const frameDif = newNumFrames - getNumFrames();
            if (frameDif >= 0) {
              for (let i = 0; i < frameDif; i++)
                for (const layer of layers) {
                  const buf = p5sketch.current!.createFramebuffer() as unknown as p5.Framebuffer;
                  layer.frames.push(buf);
                }
            }
            else {
              if (getNumFrames() + frameDif > 0)
                for (const layer of layers)
                  layer.frames.splice(layer.frames.length + frameDif, -frameDif);
            }
            setLayers([...layers]);
            */
            setLayers((prevLayers) => {
              let newNumFrames;
              try {
                newNumFrames = Number(e.target.value);
              }
              catch (e) {
                console.log(e);
                return prevLayers;
              }
              const frameDif = newNumFrames - getNumFrames();
              if (frameDif >= 0) {
                for (let i = 0; i < frameDif; i++)
                  for (const layer of prevLayers) {
                    const buf = p5sketch.current!.createFramebuffer() as unknown as p5.Framebuffer;
                    layer.frames.push(buf);
                  }
              }
              else {
                if (getNumFrames() + frameDif > 0)
                  for (const layer of prevLayers)
                    layer.frames.splice(layer.frames.length + frameDif, -frameDif);
              }
              return [...prevLayers];
            });
          }}></DraggableInput>
        </div>
      </div>
      <div className="overflow-scroll h-[85%]">
        {
          layers.map((e, i) => (
            <div className="max-w-full flex border border-gray-700" id={`layers-row-${i}`} key={`layers-row-${i}`}>
              <div className="flex w-32 max-w-32 overflow-x-scroll">
                {
                  e.visible ? 
                    <svg onClick={change_visibility} strokeWidth={0} stroke="currentColor" className="cursor-pointer mx-4 my-1 min-w-5 size-5" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 4.5C5.60218 4.5 5.22064 4.65804 4.93934 4.93934C4.65804 5.22064 4.5 5.60218 4.5 6C4.5 6.39782 4.65804 6.77936 4.93934 7.06066C5.22064 7.34196 5.60218 7.5 6 7.5C6.39782 7.5 6.77936 7.34196 7.06066 7.06066C7.34196 6.77936 7.5 6.39782 7.5 6C7.5 5.60218 7.34196 5.22064 7.06066 4.93934C6.77936 4.65804 6.39782 4.5 6 4.5ZM6 8.5C5.33696 8.5 4.70107 8.23661 4.23223 7.76777C3.76339 7.29893 3.5 6.66304 3.5 6C3.5 5.33696 3.76339 4.70107 4.23223 4.23223C4.70107 3.76339 5.33696 3.5 6 3.5C6.66304 3.5 7.29893 3.76339 7.76777 4.23223C8.23661 4.70107 8.5 5.33696 8.5 6C8.5 6.66304 8.23661 7.29893 7.76777 7.76777C7.29893 8.23661 6.66304 8.5 6 8.5ZM6 2.25C3.5 2.25 1.365 3.805 0.5 6C1.365 8.195 3.5 9.75 6 9.75C8.5 9.75 10.635 8.195 11.5 6C10.635 3.805 8.5 2.25 6 2.25Z" fill="white"/></svg> :
                    <svg onClick={change_visibility} strokeWidth={0} stroke="currentColor" className="cursor-pointer mx-4 my-1 min-w-5 size-5" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 4.5C5.60218 4.5 5.22064 4.65804 4.93934 4.93934C4.65804 5.22064 4.5 5.60218 4.5 6C4.5 6.39782 4.65804 6.77936 4.93934 7.06066C5.22064 7.34196 5.60218 7.5 6 7.5C6.39782 7.5 6.77936 7.34196 7.06066 7.06066C7.34196 6.77936 7.5 6.39782 7.5 6C7.5 5.60218 7.34196 5.22064 7.06066 4.93934C6.77936 4.65804 6.39782 4.5 6 4.5ZM6 8.5C5.33696 8.5 4.70107 8.23661 4.23223 7.76777C3.76339 7.29893 3.5 6.66304 3.5 6C3.5 5.33696 3.76339 4.70107 4.23223 4.23223C4.70107 3.76339 5.33696 3.5 6 3.5C6.66304 3.5 7.29893 3.76339 7.76777 4.23223C8.23661 4.70107 8.5 5.33696 8.5 6C8.5 6.66304 8.23661 7.29893 7.76777 7.76777C7.29893 8.23661 6.66304 8.5 6 8.5ZM6 2.25C3.5 2.25 1.365 3.805 0.5 6C1.365 8.195 3.5 9.75 6 9.75C8.5 9.75 10.635 8.195 11.5 6C10.635 3.805 8.5 2.25 6 2.25Z" fill="white" fillOpacity="0.2"/></svg>
                }
                <h2 className="cursor-pointer align-middle mt-[1.5px] text-gray-400" onClick={(e: React.MouseEvent<HTMLElement>) => {
                  const newName = prompt("What would you like to rename this layer?");
                  if (newName == null)
                    return;
                  e.currentTarget!.innerText = newName;
                }}>{e.name}</h2>
              </div>
              <div className="max-w-full overflow-scroll flex pl-3 my-2 align-middle">
                {
                  e.frames.map((fe, fi) => {
                    const frame_id = `layer-${i}-frame-${fi}`;
                    const frame_select = (e: React.MouseEvent) => {
                      const elem = e.currentTarget;
                      const id = elem.id;
                      const attribs = id.split('-');
                      const new_layer = Number(attribs[1]);
                      const new_frame = Number(attribs[3]);

                      setLayerCursor(new_layer);
                      setFrame(new_frame);
                    }
                    return (
                      layerCursor == i && frame == fi ?
                        <svg id={frame_id} key={frame_id} onClick={frame_select} strokeWidth={0.1} stroke="currentColor" className="cursor-pointer mx-2 min-w-2 size-2" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="3" cy="3" r="3" fill="#D9D9D9"/></svg> :
                        <svg id={frame_id} key={frame_id} onClick={frame_select} stroke="currentColor" className="cursor-pointer mx-2 min-w-2 size-2" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="3" cy="3" r="2.5" stroke="white" strokeOpacity="0.6"/></svg>
                    );
                  })
                }
              </div>

            </div>
          ))
        }
      </div>
    </div>
  );
}