import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import paths from "../constants/paths";
import CreationForm from "./deliverer/CreationForm";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={paths.CREATE_PATH} element={<CreationForm />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;