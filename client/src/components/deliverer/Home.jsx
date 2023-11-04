import React, { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import server from "../../apis/server";
import routes from "../../constants/routes";
import DelivererTable from "./DelivererTable";
import Loader from "../Loader.jsx";
import PaginationTabs from "../PaginationTabs";
import EditionModal from "./EditionModal";

const HomePage = () => {
    const [deliverers, setDeliverers] = useState(null);
    const [hydraView, setHydraView] = useState(null);
    const [delivererToEdit, setDelivererToEdit] = useState(null);
    const [fetchingParams, setFetchingParams] = useState({
        pagination: true,
        page: 1,
        itemsPerPage: 8
    });
    const location = useLocation();
    const modalRef = useRef();

    const fetch = async () => {
        const { data } = await server.get(
            routes.DELIVERERS, 
            {
                params: fetchingParams
            });  
        setDeliverers(data['hydra:member']);
        setHydraView(data['hydra:view']);
        console.log(location.state);
    }
    
    const deleteDeliverer = async (delivererId) => {
        try {
            const data = await server.delete(
                routes.DELIVERERS + '/' + delivererId
            );
            if (data.status == 204) {
                location.state = {
                    deleted: true
                };
                fetch();
            }
        } catch (exception) {
            console.log(exception);
        }
    }

    const closeModal = () => {
        setDelivererToEdit(null);
    }

    useEffect(() => {
        fetch();
    }, [fetchingParams]);

    return (
        !deliverers ?
        <Loader /> :
        <React.Fragment>
            {
                delivererToEdit ?
                <EditionModal 
                    modalRef={modalRef} 
                    deliverer={delivererToEdit}
                    closeModal={closeModal}
                    refetchCallback={fetch}
                /> :
                null
            }
            <ErrorMessage />
            <SuccessMessage />
            <DelivererTable 
                deliverers={deliverers} 
                editionCallback={setDelivererToEdit}
                deletionCallback={deleteDeliverer}
            />
            <PaginationTabs 
                currentPage={fetchingParams.page}
                hydraView={hydraView} 
                callback={setFetchingParams}
            />
        </React.Fragment>
    );
};

export default HomePage;