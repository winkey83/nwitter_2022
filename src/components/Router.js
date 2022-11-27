import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
    <HashRouter>
        <Switch>
            <Route></Route>
        </Switch>
    </HashRouter>
    );
};

export default AppRouter;