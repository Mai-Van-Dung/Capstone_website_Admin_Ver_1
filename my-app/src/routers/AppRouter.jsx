import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Views/Login/Login.jsx";
import MainPages from "../Views/MainPages/MainPages.jsx";
import Layout from "../Layouts/Layout.jsx";
import Setting from "../Views/MainPages/Settings/Setting.jsx";


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element ={<Login/>}/>

            <Route path="/" element ={<Layout/>}>
                <Route path="/homepage" element ={<MainPages/>}/>
                <Route path="/accounts" element ={<MainPages/>}/>
                <Route path="/deviceManager" element ={<MainPages/>}/>
                <Route path="/userRegistration" element ={<MainPages/>}/>
                <Route path="/history" element ={<MainPages/>}/>
                <Route path="/reports" element ={<MainPages/>}/>
                <Route path="/settings" element ={<Setting/>}/>
            </Route>
        </Routes>
    );
}

export default AppRouter;