'use client'

import { DrawMode, DrawModeName } from "@/app/page";
import { Dispatch, SetStateAction } from "react";

export default function Sidebar({ setMode } : { setMode: Dispatch<SetStateAction<DrawMode>> }) {
  const clear_mode = () => {
    setMode(DrawMode.Clear);
  };
  const select_mode = () => {
    setMode(DrawMode.Select);
  };
  const brush_mode = () => {
    setMode(DrawMode.Brush);
  };
  const fill_mode = () => {
    setMode(DrawMode.Fill);
  };
  const eraser_mode = () => {
    setMode(DrawMode.Eraser);
  };
  const download_mode = () => {
    setMode(DrawMode.Download);
  };
  const export_mode = () => {
    setMode(DrawMode.Export);
  };

  return (
    <div className="w-fit min-h-screen bg-gray-800 p-2 fixed left-0 border border-gray-700">
      <div className="flex group">
        <svg id="clear" onClick={clear_mode} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" strokeWidth={2.0} stroke="currentColor" className="my-4 size-6 cursor-pointer"><rect x="2" y="2" width="12" height="12" rx="1"/></svg>
        <div className="fixed align-middle rounded-md ml-[3rem] mt-1 hidden group-hover:block bg-gray-800 border border-gray-700">
          <p className="p-3">{DrawModeName(DrawMode.Clear)}</p>
        </div>
      </div>
      <div className="flex group">
        <svg id="select" onClick={select_mode} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth={2.0} stroke="currentColor" className="my-4 size-6 cursor-pointer"><path d="M8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V8M4 11V13M4 16V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20H8M11 20H13M16 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V16M20 13V11M20 8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H16M13 4H11" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <div className="fixed align-middle rounded-md ml-[3rem] mt-1 hidden group-hover:block bg-gray-800 border border-gray-700">
          <p className="p-3">{DrawModeName(DrawMode.Select)}</p>
        </div>
      </div>
      <div className="flex group">
        <svg id="brush"  onClick={brush_mode} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="my-4 size-6 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" /></svg>
        <div className="fixed align-middle rounded-md ml-[3rem] mt-1 hidden group-hover:block bg-gray-800 border border-gray-700">
          <p className="p-3">{DrawModeName(DrawMode.Brush)}</p>
        </div>
      </div>
      <div className="flex group">
        <svg id="fill" onClick={fill_mode} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth={1.7} stroke="currentColor" className="my-4 size-6 cursor-pointer"><path d="M17.3108 11.25C17.3308 11.51 17.2408 11.78 17.0408 11.98L11.0208 18C9.69083 19.33 8.35083 19.33 7.01083 18L3.00083 13.99C2.32083 13.3 1.98083 12.61 2.00083 11.92H2.07083L17.1908 11.26L17.3108 11.25Z" fill="#292D32"/><path opacity="0.4" d="M17.04 10.6402L9.69 3.29013L8.82 2.42014C8.53 2.13014 8.05 2.13014 7.76 2.42014C7.47 2.71014 7.47 3.19013 7.76 3.48013L8.63 4.35013L3 9.98013C2.36 10.6201 2.02 11.2701 2 11.9201H2.07L17.19 11.2602L17.31 11.2502C17.3 11.0302 17.2 10.8002 17.04 10.6402Z" fill="#292D32"/><path d="M16 22.75H3C2.59 22.75 2.25 22.41 2.25 22C2.25 21.59 2.59 21.25 3 21.25H16C16.41 21.25 16.75 21.59 16.75 22C16.75 22.41 16.41 22.75 16 22.75Z" fill="#292D32"/><path d="M19.35 14.7798C19.09 14.4998 18.61 14.4998 18.35 14.7798C18.04 15.1198 16.5 16.8598 16.5 18.1698C16.5 19.4698 17.55 20.5198 18.85 20.5198C20.15 20.5198 21.2 19.4698 21.2 18.1698C21.2 16.8598 19.66 15.1198 19.35 14.7798Z" fill="#292D32"/></svg>
        <div className="fixed align-middle rounded-md ml-[3rem] mt-1 hidden group-hover:block bg-gray-800 border border-gray-700">
          <p className="p-3">{DrawModeName(DrawMode.Fill)}</p>
        </div>
      </div>
      <div className="flex group">
        <svg id="eraser" onClick={eraser_mode} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" strokeWidth={1.5} stroke="currentColor" className="my-4 size-6 cursor-pointer"><g stroke="none" strokeWidth={1.5} fill="none" fillRule="evenodd"><g transform="translate(-432.000000, -96.000000)"><g transform="translate(432.000000, 96.000000)"><path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" fillRule ="nonzero"></path><path d="M15.5354,2.80759 L21.1922,8.46444 C21.9733,9.24549 21.9733,10.5118 21.1922,11.2929 L17.6696,14.8155 C17.6654,14.8199 17.6611,14.8242 17.6568,14.8285 C17.6526,14.8328 17.6482,14.837 17.6439,14.8412 L13.4851,19 L19.9999,19 C20.5522,19 20.9999,19.4477 20.9999,20 C20.9999,20.5523 20.5522,21 19.9999,21 L8.89327,21 C8.49545,21 8.11392,20.842 7.83261,20.5607 L2.80747,15.5355 C2.02642,14.7545 2.02642,13.4881 2.80747,12.7071 L12.707,2.80759 C13.488,2.02654 14.7543,2.02654 15.5354,2.80759 Z M15.5354,14.1213 L10.6567,19 L9.10038,19 L4.22168,14.1213 L9.87856,8.46442 L15.5354,14.1213 Z M16.9496,12.7071 L11.2928,7.0502 L14.1212,4.2218 L19.778,9.87866 L16.9496,12.7071 Z" fill="currentColor"></path></g></g></g></svg>              
        <div className="fixed align-middle rounded-md ml-[3rem] mt-1 hidden group-hover:block bg-gray-800 border border-gray-700">
          <p className="p-3">{DrawModeName(DrawMode.Eraser)}</p>
        </div>
      </div>
      <div className="flex group">
        <svg id="download" onClick={download_mode} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="my-4 size-6 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
        <div className="fixed align-middle rounded-md ml-[3rem] mt-1 hidden group-hover:block bg-gray-800 border border-gray-700">
          <p className="p-3">{DrawModeName(DrawMode.Download)}</p>
        </div>
      </div>
      <div className="flex group">
        <svg id="export" onClick={export_mode} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="my-4 size-6 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" /></svg>
        <div className="fixed align-middle rounded-md ml-[3rem] mt-1 hidden group-hover:block bg-gray-800 border border-gray-700">
          <p className="p-3">{DrawModeName(DrawMode.Export)}</p>
        </div>
      </div>

      <div className="flex group fixed bottom-0">
        <svg id="information" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="my-4 size-6 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
        <div className="fixed align-middle rounded-md ml-[3rem] mt-1 hidden group-hover:block bg-gray-800 stroke-white border border-gray-700">
          <p className="p-3">{DrawModeName(DrawMode.Information)}</p>
        </div>
      </div>
    </div>
  );
}

/*
https://heroicons.com/
*/