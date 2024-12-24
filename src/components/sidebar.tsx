'use client'

import { DrawMode, DrawModeName } from "@/shared/shared";

export default function Sidebar({ set_mode } : { set_mode: (mode: DrawMode) => void }) {
  const clear_mode = () => {
    set_mode(DrawMode.Clear);
  };
  const select_mode = () => {
    set_mode(DrawMode.Select);
  };
  const brush_mode = () => {
    set_mode(DrawMode.Brush);
  };
  const pixelbrush_mode = () => {
    set_mode(DrawMode.PixelBrush);
  };
  const fill_mode = () => {
    set_mode(DrawMode.Fill);
  };
  const eraser_mode = () => {
    set_mode(DrawMode.Eraser);
  };
  const download_mode = () => {
    set_mode(DrawMode.Download);
  };
  const export_mode = () => {
    set_mode(DrawMode.Export);
  };
  const information_mode = () => {
    set_mode(DrawMode.Information);
  };

  return (
    <div className="w-fit max-h-screen bg-gray-800 p-2 border border-gray-700">
      <div className="flex group">
        <svg id="clear" onClick={clear_mode} viewBox="0 0 14 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" strokeWidth={0} stroke="currentColor" className="my-4 size-6 cursor-pointer"><rect x="0.5" y="0.458496" width="13" height="14"/></svg>
        <div className="fixed align-middle rounded-md ml-[3rem] mt-1 hidden group-hover:block bg-gray-800 border border-gray-700">
          <p className="p-3">{DrawModeName(DrawMode.Clear)}</p>
        </div>
      </div>
      <div className="flex group">
        <svg id="select" onClick={select_mode} viewBox="0 0 18 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" strokeWidth={0} stroke="currentColor" className="my-4 size-6 cursor-pointer"><rect x="12.4488" y="1.31458" width="3.27243" height="3.27243" /><rect x="7.36399" y="1.31458" width="3.27243" height="3.27243" /><rect x="2.27879" y="1.31458" width="3.27243" height="3.27243" /><rect x="12.4488" y="6.13208" width="3.27243" height="3.27243" /><rect x="2.27879" y="6.13208" width="3.27243" height="3.27243" /><rect x="12.4488" y="10.9498" width="3.27243" height="3.27243" /><rect x="2.27879" y="10.9498" width="3.27243" height="3.27243" /><rect x="7.36379" y="10.9498" width="3.27243" height="3.27243" /></svg>
        <div className="fixed align-middle rounded-md ml-[3rem] mt-1 hidden group-hover:block bg-gray-800 border border-gray-700">
          <p className="p-3">{DrawModeName(DrawMode.Select)}</p>
        </div>
      </div>
      <div className="flex group">
        <svg id="brush" onClick={brush_mode} viewBox="0 0 14 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" strokeWidth={0} stroke="currentColor" className="my-4 size-6 cursor-pointer"><rect x="12.1394" y="0.481323" width="2.18224" height="12.9123" transform="rotate(45 12.1394 0.481323)"/><rect x="0.317513" y="10.4279" width="3.48284" height="3.48284"/></svg>
        <div className="fixed align-middle rounded-md ml-[3rem] mt-1 hidden group-hover:block bg-gray-800 border border-gray-700">
          <p className="p-3">{DrawModeName(DrawMode.Brush)}</p>
        </div>
      </div>
      <div className="flex group">
        <svg id="pixelbrush" onClick={pixelbrush_mode} viewBox="0 0 18 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg" strokeWidth={0} stroke="currentColor" className="my-4 size-6 cursor-pointer"><rect x="6.28595" y="6.87439" width="5.39609" height="5.39609"/><rect x="4.03934" y="10.0393" width="5.39609" height="5.39609" transform="rotate(45 4.03934 10.0393)"/><circle cx="13.9172" cy="4.68146" r="3.11872"/></svg>
        <div className="fixed align-middle rounded-md ml-[3rem] mt-1 hidden group-hover:block bg-gray-800 border border-gray-700">
          <p className="p-3">{DrawModeName(DrawMode.Brush)}</p>
        </div>
      </div>

      <div className="flex group">
        <svg id="fill" onClick={fill_mode} viewBox="0 0 24 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" strokeWidth={0} stroke="currentColor" className="my-4 size-6 cursor-pointer"><rect x="11.8984" y="2.64685" width="9.78835" height="12.7943" transform="rotate(45 11.8984 2.64685)" /><rect x="19.4903" y="10.097" width="2.34517" height="2.34517" transform="rotate(45 19.4903 10.097)" /><rect x="19.4903" y="13.4137" width="2.34517" height="2.34517" transform="rotate(45 19.4903 13.4137)"/></svg>
        <div className="fixed align-middle rounded-md ml-[3rem] mt-1 hidden group-hover:block bg-gray-800 border border-gray-700">
          <p className="p-3">{DrawModeName(DrawMode.Fill)}</p>
        </div>
      </div>
      <div className="flex group">
        <svg id="eraser" onClick={eraser_mode} viewBox="0 0 24 22" strokeWidth={0} stroke="currentColor" className="my-4 size-6 cursor-pointer" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect x="14.6015" y="2.02002" width="9.78835" height="11.6687" transform="rotate(45 14.6015 2.02002)" /><rect x="5.36685" y="11.3152" width="9.78835" height="3.34723" transform="rotate(45 5.36685 11.3152)" /></svg>
        <div className="fixed align-middle rounded-md ml-[3rem] mt-1 hidden group-hover:block bg-gray-800 border border-gray-700">
          <p className="p-3">{DrawModeName(DrawMode.Eraser)}</p>
        </div>
      </div>
      <div className="flex group">
        <svg id="download" onClick={download_mode} viewBox="0 0 22 19" strokeWidth={0} stroke="currentColor" fill="currentColor" className="my-4 size-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.78316 2.14697H8.31316V6.43689H13.6911V2.14697H17.2168V6.43689V15.5786H13.6911H8.31316H4.78316V6.43689V2.14697Z" /></svg>
        <div className="fixed align-middle rounded-md ml-[3rem] mt-1 hidden group-hover:block bg-gray-800 border border-gray-700">
          <p className="p-3">{DrawModeName(DrawMode.Download)}</p>
        </div>
      </div>
      <div className="flex group">
        <svg id="export" onClick={export_mode} viewBox="0 0 14 19" strokeWidth={0} stroke="currentColor" fill="currentColor" className="my-4 size-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.29923 0.536743H5.70077V2.84082H8.29923V0.536743ZM5.70077 4.44397H8.29923V8.42188H13.9111V18.4585H0.0888596V8.42188H5.70077V4.44397Z" /></svg>
        <div className="fixed align-middle rounded-md ml-[3rem] mt-1 hidden group-hover:block bg-gray-800 border border-gray-700">
          <p className="p-3">{DrawModeName(DrawMode.Export)}</p>
        </div>
      </div>

      <div className="flex group fixed bottom-0">
        <svg id="information" onClick={information_mode} strokeWidth={0} stroke="currentColor" fill="currentColor" className="my-4 size-6 cursor-pointer" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="5.97392" y="6.55286" width="4.12014" height="8.79504" /><rect x="5.97392" y="0.684692" width="4.12014" height="4.12014" /></svg>
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