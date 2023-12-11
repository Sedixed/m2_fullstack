import React, { useEffect, useRef, useState } from "react";
import server from "../../apis/server.jsx";
import routes from "../../constants/routes.jsx";
import DeliveryTable from "./DeliveryTable.jsx";
import Loader from "../Loader.jsx";
import PaginationTabs from "../PaginationTabs.jsx";
import DeliveryEditionModal from "./DeliveryEditionModal.jsx";
import SuccessMessage from '../SuccessMessage.jsx';
import { useLocation, useNavigate } from "react-router-dom";
import paths from "../../constants/paths.jsx";

const DeliveriesList = () => {
  const [deliveries, setDeliveries] = useState(null);
  const [hydraView, setHydraView] = useState(null);
  const [deliveryToEdit, setDeliveryToEdit] = useState(null);
  const [snackMessage, setSnackMessage] = useState(null);
  const [fetchingParams, setFetchingParams] = useState({
    pagination: true,
    page: 1,
    itemsPerPage: 8
  });
  const modalRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
    
  const fetch = async () => {
    const { data } = await server.get(
      routes.DELIVERIES, 
      {
        params: fetchingParams
      }
    );  
    setDeliveries(data['hydra:member']);
    setHydraView(data['hydra:view']);
  }

  const deleteDelivery = async (deliveryId) => {
    try {
      const data = await server.delete(
        routes.DELIVERIES + '/' + deliveryId
      );
      if (data.status === 204) {
        setSnackMessage('Livraison supprimée avec succès !');
        if (deliveries.length === 1) {
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
    setDeliveryToEdit(null);
  }

  useEffect(() => {
    // Nothing to do
    if (location.state === null) {
      return;
    }
    // Creation case
    if (location.state['created'] !== undefined) {
      navigate(paths.DELIVERIES_LIST_PATH, { replace: true });
      setSnackMessage('Livraison créée avec succès !');
      return;
    }
    // Modification case
    if (location.state['modified'] !== undefined) {
      navigate(paths.DELIVERIES_LIST_PATH, { replace: true });
      setSnackMessage('Livraison modifiée avec succès !');
      return;
    }
  }, [deliveryToEdit]);

  useEffect(() => {
    fetch();
  }, [fetchingParams]);

  return (
    !deliveries ?
    <Loader /> :
    <>
      {
        deliveryToEdit ?
        <DeliveryEditionModal 
          modalRef={modalRef} 
          delivery={deliveryToEdit}
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

      <DeliveryTable 
        deliveries={deliveries} 
        editionCallback={setDeliveryToEdit}
        deletionCallback={deleteDelivery}
      />
      <PaginationTabs 
        currentPage={fetchingParams.page}
        hydraView={hydraView} 
        callback={setFetchingParams}
      />
    </>
  );
};

export default DeliveriesList;