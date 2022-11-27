import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
    <HashRouter>
        <Routes>
            {isLoggedIn ? (
                <Route path="/" element={<Home/>} />
            ):(
                <Route path="/" element={<Auth/>} />
            )}
        </Routes>
    </HashRouter>
    );
};

export default AppRouter;