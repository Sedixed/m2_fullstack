import React, { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import server from "../../apis/server";
import routes from "../../constants/routes";
import DelivererTable from "./DelivererTable";
import Loader from "../Loader.jsx";

const HomePage = () => {
    const [deliverers, setDeliverers] = useState(null);

    const fetch = async () => {
        const { data } = await server.get(
            routes.DELIVERERS, 
            {
                params: {
                    pagination: true,
                    page: 1,
                    itemsPerPage: 5
                }
            });
        setDeliverers(data['hydra:member']);
        console.log(data);
    }

    useEffect(() => {
        fetch();
    }, []);

    return (
        !deliverers ?
        <Loader /> :
        <React.Fragment>
            <ErrorMessage />
            <SuccessMessage />
            <DelivererTable deliverers={deliverers} />
        </React.Fragment>
    );
};

export default HomePage;