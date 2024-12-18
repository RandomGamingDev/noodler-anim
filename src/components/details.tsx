import { DrawMode, DrawModeName } from "@/app/page";

export default function Details({ mode } : { mode: DrawMode }) {
  const clear_details = (
    <div className="text-left">
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <th><h2 className="font-normal p-2">Background Color</h2></th>
            <th><input className="m-1" type="color" /></th>
          </tr>
        </tbody>
      </table>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Clear</button>
    </div>
  );

  const select_details = (
    <div>

    </div>
  );

  const brush_details = (
    <div className="text-left">
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <th><h2 className="font-normal p-2">Brush Color</h2></th>
            <th><input className="m-1" type="color" /></th>
          </tr>
          <tr>
            <th><h2 className="font-normal p-2">Brush Radius</h2></th>
            <th><input className="m-1 max-w-16 text-black" type="number" /></th>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const fill_details = (
    <div className="text-left">
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <th><h2 className="font-normal p-2">Fill Color</h2></th>
            <th><input className="m-1" type="color" /></th>
          </tr>
          <tr>
            <th><h2 className="font-normal p-2">Threshold</h2></th>
            <th><input className="m-1 max-w-16 text-black" type="number" /></th>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const eraser_details = (
    <div className="text-left">
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <th><h2 className="font-normal p-2">Eraser Color</h2></th>
            <th><input className="m-1" type="color" /></th>
          </tr>
          <tr>
            <th><h2 className="font-normal p-2">Brush Radius</h2></th>
            <th><input className="m-1 max-w-16 text-black" type="number" /></th>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const download_details = (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Clear</button>
    </div>
  );

  const export_details = (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Clear</button>
    </div>
  );

  const information_details = (
    <div className="text-left">
      <table>
        <thead></thead>
        <tbody>
          {
            [
              ["New Page", "Ctrl + N"],
              ["Save", "Ctrl + S"],
              ["Brush", "B"],
              ["Grab brush", "G"],
              ["Color picker", "Hold Shift"],
              ["Fill", "F"],
              ["Erase", "E"],
              ["Pan", "Hold Space"],
              ["Zoom", "Hold Ctrl + Mouse Wheel"],
              ["Undo", "Ctrl + Z"],
              ["Play/Pause", "/"],
              ["Previous frame", "<"],
              ["Next frame", ">"],
              ["New layer", "Ctrl Shift + N"],
              ["Merge layer", "Ctrl Shift + M"],
              ["Paste", "Ctrl + V"]
            ].map((e, i) =>
              <tr key={`information-details-row-${i}`}>
                <th><h2 className="font-normal p-2">{e[0]}</h2></th>
                <th><h2 className="p-2">{e[1]}</h2></th>
              </tr>
            )
          }
        </tbody>
      </table>
      <div>
        <p className="text-gray-400">Thanks to Casey REAS and Sketch Machine for the inspiration</p>
      </div>
    </div>
  );

  return (
    <div className="w-64 min-h-screen max-h-screen bg-gray-800 p-2 border border-gray-700 text-gray-300 overflow-scroll">
      <h1 className="text-xl font-bold">{ DrawModeName(mode) }</h1>
      {
        [
          clear_details,
          select_details,
          brush_details,
          fill_details,
          eraser_details,
          download_details,
          export_details,
          information_details
        ][mode]
      }
    </div>
  );
}