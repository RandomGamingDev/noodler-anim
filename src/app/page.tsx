import Details from "@/components/details";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <Details></Details>
    </div>
  );
}