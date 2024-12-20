import { Layer } from "@/app/page";

export default function Timeline({ layers } : { layers: Array<Layer> }) {
  return (
    <div className="w-full h-[20%] bg-gray-800 z-[-1] border border-gray-700">
      <div className="flex border border-gray-700">
        <div className="flex px-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-1 size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-1 size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-1 size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" /></svg>
        </div>
        <div className="flex pl-3">
          <p>Frame</p>
          <input type="number" pattern="[0-9]" className="text-center appearance-none bg-transparent border border-gray-700 ml-1 mr-4 my-[0.1rem] max-w-10 max-h-5 rounded-md"></input>
          <p>FPS</p>
          <input type="number" pattern="[0-9]" className="text-center appearance-none bg-transparent border border-gray-700 ml-1 mr-4 my-[0.1rem] max-w-10 max-h-5 rounded-md"></input>
        </div>
      </div>
      <div>
        {
          layers.map((e, i) => (
            <div className="flex border border-gray-700" key={`layers-row-${i}`}>
              <div className="flex w-32 max-w-32 overflow-x-scroll">
                {
                  e.visible ? 
                    <svg strokeWidth={0.5} stroke="currentColor" className="mx-4 my-1 size-5" viewBox="0 0 12 12"fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 4.5C5.60218 4.5 5.22064 4.65804 4.93934 4.93934C4.65804 5.22064 4.5 5.60218 4.5 6C4.5 6.39782 4.65804 6.77936 4.93934 7.06066C5.22064 7.34196 5.60218 7.5 6 7.5C6.39782 7.5 6.77936 7.34196 7.06066 7.06066C7.34196 6.77936 7.5 6.39782 7.5 6C7.5 5.60218 7.34196 5.22064 7.06066 4.93934C6.77936 4.65804 6.39782 4.5 6 4.5ZM6 8.5C5.33696 8.5 4.70107 8.23661 4.23223 7.76777C3.76339 7.29893 3.5 6.66304 3.5 6C3.5 5.33696 3.76339 4.70107 4.23223 4.23223C4.70107 3.76339 5.33696 3.5 6 3.5C6.66304 3.5 7.29893 3.76339 7.76777 4.23223C8.23661 4.70107 8.5 5.33696 8.5 6C8.5 6.66304 8.23661 7.29893 7.76777 7.76777C7.29893 8.23661 6.66304 8.5 6 8.5ZM6 2.25C3.5 2.25 1.365 3.805 0.5 6C1.365 8.195 3.5 9.75 6 9.75C8.5 9.75 10.635 8.195 11.5 6C10.635 3.805 8.5 2.25 6 2.25Z" fill="white"/></svg> :
                    <svg strokeWidth={0.5} stroke="currentColor" className="mx-4 my-1 size-5" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 4.5C5.60218 4.5 5.22064 4.65804 4.93934 4.93934C4.65804 5.22064 4.5 5.60218 4.5 6C4.5 6.39782 4.65804 6.77936 4.93934 7.06066C5.22064 7.34196 5.60218 7.5 6 7.5C6.39782 7.5 6.77936 7.34196 7.06066 7.06066C7.34196 6.77936 7.5 6.39782 7.5 6C7.5 5.60218 7.34196 5.22064 7.06066 4.93934C6.77936 4.65804 6.39782 4.5 6 4.5ZM6 8.5C5.33696 8.5 4.70107 8.23661 4.23223 7.76777C3.76339 7.29893 3.5 6.66304 3.5 6C3.5 5.33696 3.76339 4.70107 4.23223 4.23223C4.70107 3.76339 5.33696 3.5 6 3.5C6.66304 3.5 7.29893 3.76339 7.76777 4.23223C8.23661 4.70107 8.5 5.33696 8.5 6C8.5 6.66304 8.23661 7.29893 7.76777 7.76777C7.29893 8.23661 6.66304 8.5 6 8.5ZM6 2.25C3.5 2.25 1.365 3.805 0.5 6C1.365 8.195 3.5 9.75 6 9.75C8.5 9.75 10.635 8.195 11.5 6C10.635 3.805 8.5 2.25 6 2.25Z" fill="white" fill-opacity="0.2"/></svg>
                }
                <h2 className="align-middle mt-[1.5px] text-gray-400">{e.name}</h2>
              </div>

              <div className="flex pl-3 my-2 align-middle">
                <svg strokeWidth={0.1} stroke="currentColor" className="mx-2 size-2" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="3" cy="3" r="3" fill="#D9D9D9"/></svg>
                <svg strokeWidth={0.5} stroke="currentColor" className="mx-2 size-2" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="3" cy="3" r="2.5" stroke="white" strokeOpacity="0.6"/></svg>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  );
}