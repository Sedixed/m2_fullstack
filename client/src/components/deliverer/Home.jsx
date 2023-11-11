import React, { useEffect, useRef, useState } from "react";
import server from "../../apis/server";
import routes from "../../constants/routes";
import DelivererTable from "./DelivererTable";
import Loader from "../Loader.jsx";
import PaginationTabs from "../PaginationTabs";
import EditionModal from "./EditionModal";
import SuccessMessage from '../SuccessMessage';
import { useLocation, useNavigate } from "react-router-dom";
import paths from "../../constants/paths";
import FetchOptionsTabs from "../FetchOptionsTabs";

const HomePage = () => {
    const [deliverers, setDeliverers] = useState(null);
    const [hydraView, setHydraView] = useState(null);
    const [delivererToEdit, setDelivererToEdit] = useState(null);
    const [snackMessage, setSnackMessage] = useState(null);
    const [sortOptions, setSortOptions] = useState(null);
    const [filterOptions, setFilterOptions] = useState(null);
    const [fetchingParams, setFetchingParams] = useState({
        pagination: true,
        page: 1,
        itemsPerPage: 8
    });
    const modalRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    
    const fetch = async () => {
        let params =  {...fetchingParams};
        if (sortOptions !== null) {
            params[`order[${sortOptions.property}]`] = sortOptions.order
        }
        if (filterOptions !== null) {
            if (filterOptions['available'] !== undefined) {
                params['available'] = filterOptions['available']
            }
            if (filterOptions['beforeDate'] !== undefined) {
                params['creationDate[before]'] = filterOptions['beforeDate']
            }
            if (filterOptions['afterDate'] !== undefined) {
                params['creationDate[after]'] = filterOptions['afterDate']
            }
        }
        
        const { data } = await server.get(
            routes.DELIVERERS, 
            {
                params: params
            });  
        setDeliverers(data['hydra:member']);
        setHydraView(data['hydra:view']);
    }

    const deleteDeliverer = async (delivererId) => {
        try {
            const data = await server.delete(
                routes.DELIVERERS + '/' + delivererId
            );
            if (data.status === 204) {
                setSnackMessage('Livreur supprimé avec succès !');
                if (deliverers.length === 1) {
                    setFetchingParams({
                        pagination: true,
                        page: fetchingParams.page > 1 ? fetchingParams.page - 1 : fetchingParams.page,
                        itemsPerPage: fetchingParams.itemsPerPage
                    });
                } else {
                    fetch();
                }
            }
        } catch (exception) {
            console.log(exception);
        }
    }

    const closeModal = () => {
        setDelivererToEdit(null);
    }

    useEffect(() => {
        // Nothing to do
        if (location.state === null) {
            return;
        }
        // Creation case
        if (location.state['created'] !== undefined) {
            navigate(paths.LIST_PATH, { replace: true });
            setSnackMessage('Livreur créé avec succès !');
            return;
        }
        // Modification case
        if (location.state['modified'] !== undefined) {
            navigate(paths.LIST_PATH, { replace: true });
            setSnackMessage('Livreur modifié avec succès !');
            return;
        }
    }, [delivererToEdit]);

    useEffect(() => {
        fetch();
    }, [fetchingParams, sortOptions, filterOptions]);

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
                    location={location}
                /> :
                null
            }
            {
                snackMessage ?
                <SuccessMessage message={snackMessage} callback={() => setSnackMessage(null)} /> :
                null
            }
            <FetchOptionsTabs 
                setSortOptionsCallback={setSortOptions} 
                setFilterOptionsCallback={setFilterOptions}
            />
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