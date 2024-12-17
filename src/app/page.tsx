import Canvas from "@/components/canvas";
import Details from "@/components/details";
import Sidebar from "@/components/sidebar";
import Timeline from "@/components/timeline";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <Canvas></Canvas>
      <Timeline></Timeline>
      <Details></Details>
    </div>
  );
}