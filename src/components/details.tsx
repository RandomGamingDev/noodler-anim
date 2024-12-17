import { DrawMode, DrawModeName } from "@/app/page";

export default function Details({ mode } : { mode: DrawMode }) {
  const information_details = (
    <div>
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
            ].map((e) =>
              <tr>
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
    <div className="w-64 min-h-screen bg-gray-800 p-2 fixed right-0 border border-gray-700 text-gray-300">
      <h1 className="text-xl font-bold">{ DrawModeName(mode) }</h1>
      {
        [
          information_details,
          information_details,
          information_details,
          information_details,
          information_details,
          information_details,
          information_details,
          information_details,
        ][mode]
      }
    </div>
  );
}

/*
      <div className="flex">
        <div className="">
        </div>
        <div className="font-bold">
        </div>
      </div>
      */