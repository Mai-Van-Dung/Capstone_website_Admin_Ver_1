import { Outlet } from "react-router-dom";
import TopNavBar from "../Components/TopNavBar";
import SideNavBar from "../Components/SideNavBar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNavBar />
      <div className="flex flex-1">
        <SideNavBar />
        <main className="flex-1 bg-gray-100 p-6">
          <Outlet /> {/* Chỗ này render nội dung của từng page */}
        </main>
      </div>
    </div>
  );
};

export default Layout;