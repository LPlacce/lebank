import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Outlet />
    </div>
  );
}