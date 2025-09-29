// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import {
  Home,
  User,
  CreditCard,
  BarChart3,
  Wrench,
  FileText,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-60 bg-gray-200 h-full p-4 shadow-md">
      <nav className="flex flex-col gap-2">
        <Link
          to="/homepage"
          className="flex items-center gap-2 text-gray-700 hover:bg-gray-300 p-2 rounded"
        >
          <Home className="w-5 h-5" />
          <span>Trang chủ</span>
        </Link>

        <Link
          to="/accounts"
          className="flex items-center gap-2 text-gray-700 hover:bg-gray-300 p-2 rounded"
        >
          <User className="w-5 h-5" />
          <span>Tài khoản</span>
        </Link>

        <Link
          to="/deviceManager"
          className="flex items-center gap-2 text-gray-700 hover:bg-gray-300 p-2 rounded"
        >
          <CreditCard className="w-5 h-5" />
          <span>Quản lí thiết bị</span>
        </Link>

        <Link
          to="/userRegistration"
          className="flex items-center gap-2 text-gray-700 hover:bg-gray-300 p-2 rounded"
        >
          <BarChart3 className="w-5 h-5" />
          <span>Phê duyệt đăng kí</span>
        </Link>

        <Link
          to="/history"
          className="flex items-center gap-2 text-gray-700 hover:bg-gray-300 p-2 rounded"
        >
          <Wrench className="w-5 h-5" />
          <span>Lịch sử hoạt động</span>
        </Link>

        <Link
          to="/reports"
          className="flex items-center gap-2 text-gray-700 hover:bg-gray-300 p-2 rounded"
        >
          <FileText className="w-5 h-5" />
          <span>Báo cáo</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-2 text-gray-700 hover:bg-gray-300 p-2 rounded"
        >
          <Settings className="w-5 h-5" />
          <span>Cài đặt</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
