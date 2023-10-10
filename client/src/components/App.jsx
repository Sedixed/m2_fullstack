import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";

import Header from "./Header";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                </Routes>
            </BrowserRouter>
            
        </div>
    );
}

export default App;