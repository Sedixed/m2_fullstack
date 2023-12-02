import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import paths from "../constants/paths";
import DelivererCreationForm from "./deliverer/DelivererCreationForm";
import DeliverersList from "./deliverer/DeliverersList";
import ShiftCreationForm from "./shift/ShiftCreationForm";
import DeliveryCreationForm from "./delivery/DeliveryCreationForm";
import DeliveriesList from "./delivery/DeliveriesList";
import ShiftsList from "./shift/ShiftsList";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={paths.DELIVERERS_CREATE_PATH} element={<DelivererCreationForm />} />
                    <Route path={paths.DELIVERERS_LIST_PATH} element={<DeliverersList />} />

                    <Route path={paths.SHIFTS_CREATE_PATH} element={<ShiftCreationForm />} />
                    <Route path={paths.SHIFTS_LIST_PATH} element={<ShiftsList />} />

                    <Route path={paths.DELIVERIES_CREATE_PATH} element={<DeliveryCreationForm />} />
                    <Route path={paths.DELIVERIES_LIST_PATH} element={<DeliveriesList />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;