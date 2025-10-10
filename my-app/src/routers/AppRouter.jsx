import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Views/Login/Login.jsx";
import MainPages from "../Views/MainPages/MainPages.jsx";
import Layout from "../Layouts/Layout.jsx";
import Setting from "../Views/MainPages/Settings/Setting.jsx";
import Dashboard from "../Views/pages/Dashboard.jsx";
import Signup from "../Views/Signup/Signup.jsx";
import Accounts from "../Views/pages/Accounts.jsx";
import DeviceManager from "../Views/pages/DeviceManager.jsx";
import UserRegistration from "../Views/pages/UserRegistration.jsx";
import History from "../Views/pages/History.jsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element ={<Login/>}/>
            <Route path="/signup" element ={<Signup/>}/>
            <Route path="/" element ={<Layout/>}>
                <Route path="/homepage" element ={<Dashboard/>}/>
                <Route path="/accounts" element ={<Accounts/>}/>
                <Route path="/deviceManager" element ={<DeviceManager/>}/>
                <Route path="/userRegistration" element ={<UserRegistration/>}/>
                <Route path="/history" element ={<History/>}/>
                <Route path="/reports" element ={<MainPages/>}/>
                <Route path="/settings" element ={<Setting/>}/>
            </Route>
        </Routes>
    );
}

export default AppRouter;