import { Search, Settings, Bell } from "lucide-react"; // dùng icon lib lucide-react
import anh1 from "../assets/1.jpg";

const TopNavbar = () => {
  return (
    <nav className="w-full h-16 bg-white border-b flex items-center px-6 shadow-sm">
      {/* Logo + tên */}
      <div className="flex items-center  gap-2">
        <img
          src={anh1} // 👉 thay bằng logo ElderCare
          alt="Logo"
          className="w-12 h-12 border-border rounded-full"
        />
        <span className="text-gray-700 font-medium">ElderCare Admin</span>
      </div>

      {/* Tiêu đề trang */}
      <h1 className="ml-15 text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text uppercase">
        DASHBOARD
      </h1>


      {/* Search + Icons + Avatar */}
      <div className="ml-auto flex items-center gap-4">
        {/* Search box */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for something"
            className="bg-transparent outline-none text-sm ml-2 placeholder-gray-400 flex-1 h-full"
          />
        </div>

        {/* Icons */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings className="w-5 h-5 text-gray-500" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5 text-pink-500" />
        </button>

        {/* Avatar */}
        <img
          src={anh1} // 👉 thay bằng ảnh user bạn đã upload
          alt="User Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default TopNavbar;