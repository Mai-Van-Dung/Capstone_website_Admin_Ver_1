import React from "react";
import { Camera } from "lucide-react";
import anh1 from "../../../assets/1.jpg";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-white border border-blue-300 rounded-lg shadow-sm p-6">
            {/* Tabs */}
            <div className="flex gap-6 pb-2">
                <button className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
                    Edit Profile
                </button>
                <button className="text-gray-500 hover:text-blue-600" 
                        onClick={() => navigate("/settings/preferences")}>
                    Preferences
                </button>
                <button className="text-gray-500 hover:text-blue-600"
                        onClick={() => navigate("/settings/security")}>
                    Security</button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-6">
                {/* Profile image */}
                <div className="col-span-1 flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={anh1} // 👉 thay ảnh thật vào đây
                            alt="Profile"
                            className="w-35 h-35 rounded-full object-cover"
                        />
                        <button className="absolute bottom-1 right-1 bg-blue-600 p-1 rounded-full text-white">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="col-span-2 grid grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm text-gray-600">Your Name</label>
                        <input
                            type="text"
                            defaultValue="Charlene Reed"
                            className="w-full mt-1 border border-black rounded-lg px-3 py-2 text-sm text-black outline-none focus:ring focus:ring-black"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">User Name</label>
                        <input
                            type="text"
                            defaultValue="Charlene Reed"
                            className="w-full mt-1 border border-black rounded-lg px-3 py-2 text-sm text-black outline-none focus:ring focus:ring-black"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            defaultValue="charlenereed@gmail.com"
                            className="w-full mt-1 border border-black rounded-lg px-3 py-2 text-sm text-black outline-none focus:ring focus:ring-black"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            defaultValue="********"
                            className="w-full mt-1 border border-black rounded-lg px-3 py-2 text-sm text-black outline-none focus:ring focus:ring-black"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Date of Birth</label>
                        <input
                            type="text"
                            defaultValue="25 January 1990"
                            className="w-full mt-1 border border-black rounded-lg px-3 py-2 text-sm text-black outline-none focus:ring focus:ring-black"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Present Address</label>
                        <input
                            type="text"
                            defaultValue="San Jose, California, USA"
                            className="w-full mt-1 border border-black rounded-lg px-3 py-2 text-sm text-black outline-none focus:ring focus:ring-black"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Permanent Address</label>
                        <input
                            type="text"
                            defaultValue="San Jose, California, USA"
                            className="w-full mt-1 border border-black rounded-lg px-3 py-2 text-sm text-black outline-none focus:ring focus:ring-black"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">City</label>
                        <input
                            type="text"
                            defaultValue="San Jose"
                            className="w-full mt-1 border border-black rounded-lg px-3 py-2 text-sm text-black outline-none focus:ring focus:ring-black"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Postal Code</label>
                        <input
                            type="text"
                            defaultValue="45962"
                            className="w-full mt-1 border border-black rounded-lg px-3 py-2 text-sm text-black outline-none focus:ring focus:ring-black"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Country</label>
                        <input
                            type="text"
                            defaultValue="USA"
                            className="w-full mt-1 border border-black rounded-lg px-3 py-2 text-sm text-black outline-none focus:ring focus:ring-black"
                        />
                    </div>
                </div>

            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">
                    Save
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
