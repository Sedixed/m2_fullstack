import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import paths from "../constants/paths";
import CreationForm from "./deliverer/CreationForm";
import HomePage from "./deliverer/Home";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={paths.CREATE_PATH} element={<CreationForm />} />
                    <Route path={paths.LIST_PATH} element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;