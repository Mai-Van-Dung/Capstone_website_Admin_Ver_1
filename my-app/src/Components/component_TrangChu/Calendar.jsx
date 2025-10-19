import React from "react";
import { ChevronLeft, ChevronRight ,  Calendar } from "lucide-react";


const CalendarUpgraded = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const startDay = (startOfMonth.getDay() + 6) % 7; // Chuyển Sunday-end sang Monday-start

  const daysArray = [...Array(startDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Calendar className="w-5 h-5 text-indigo-500" />
          {monthName}
        </h3>
        <div className="flex gap-2">
          <button onClick={() => changeMonth(-1)} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => changeMonth(1)} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-gray-500 text-sm gap-2 mb-4">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="font-medium text-gray-600">
            {day}
          </div>
        ))}

        {daysArray.map((day, i) => {
          const isToday =
            day &&
            today.getDate() === day &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear();

          return (
            <div
              key={i}
              className={`py-2 rounded-full cursor-pointer transition-all ${
                day
                  ? isToday
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md"
                    : "hover:bg-indigo-50 text-gray-700"
                  : ""
              }`}
            >
              {day || ""}
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-4 flex flex-col items-start shadow-md">
        <h4 className="font-semibold text-sm mb-1">Upcoming Reminder</h4>
        <p className="text-xs opacity-90">Team meeting at 10:00 AM</p>
        <button className="mt-3 bg-white text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-100 transition">
          View Details
        </button>
      </div>
    </>
  );
};
export default CalendarUpgraded;