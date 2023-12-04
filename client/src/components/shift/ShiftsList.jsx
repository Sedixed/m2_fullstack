import React, { useEffect, useRef, useState } from "react";
import server from "../../apis/server.jsx";
import routes from "../../constants/routes.jsx";
import Loader from "../Loader.jsx";
import PaginationTabs from "../PaginationTabs.jsx";
import ShiftEditionModal from "./ShiftEditionModal.jsx";
import SuccessMessage from '../SuccessMessage.jsx';
import { useLocation, useNavigate } from "react-router-dom";
import paths from "../../constants/paths.jsx";
import ShiftTable from "./ShiftTable.jsx";
import ShiftFetchOptionsTabs from "./ShiftFetchOptionsTabs.jsx";

const ShiftsList = () => {
  const [shifts, setShifts] = useState(null);
  const [hydraView, setHydraView] = useState(null);
  const [shiftToEdit, setShiftToEdit] = useState(null);
  const [snackMessage, setSnackMessage] = useState(null);
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
    if (filterOptions !== null) {
      if (filterOptions['deliverer'] !== undefined) {
        params['deliverer.id'] = filterOptions['deliverer']
      }
      if (filterOptions['startingDate'] !== undefined) {
        params['startingDate'] = filterOptions['startingDate']
      }
      if (filterOptions['endingDate'] !== undefined) {
        params['endingDate'] = filterOptions['endingDate']
      }
    }

    const { data } = await server.get(
      routes.SHIFTS, 
      {
        params: params
      }
    );  
    setShifts(data['hydra:member']);
    setHydraView(data['hydra:view']);
  }

  const deleteShift = async (shiftId) => {
    try {
      const data = await server.delete(
        routes.SHIFTS + '/' + shiftId
      );
      if (data.status === 204) {
        setSnackMessage('Tournée supprimée avec succès !');
        if (shifts.length === 1) {
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
    setShiftToEdit(null);
  }

  useEffect(() => {
    // Nothing to do
    if (location.state === null) {
      return;
    }
    // Creation case
    if (location.state['created'] !== undefined) {
      navigate(paths.SHIFTS_LIST_PATH, { replace: true });
      setSnackMessage('Tournée créée avec succès !');
      return;
    }
    // Modification case
    if (location.state['modified'] !== undefined) {
      navigate(paths.SHIFTS_LIST_PATH, { replace: true });
      setSnackMessage('Tournée modifiée avec succès !');
      return;
    }
  }, [shiftToEdit]);

  useEffect(() => {
    fetch();
  }, [fetchingParams, filterOptions]);

  return (
    !shifts ?
    <Loader /> :
    <>
      {
        shiftToEdit ?
        <ShiftEditionModal 
          modalRef={modalRef} 
          shift={shiftToEdit}
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

      <ShiftFetchOptionsTabs setFilterOptionsCallback={setFilterOptions}/>

      <ShiftTable 
        shifts={shifts} 
        editionCallback={setShiftToEdit}
        deletionCallback={deleteShift}
      />
      <PaginationTabs 
        currentPage={fetchingParams.page}
        hydraView={hydraView} 
        callback={setFetchingParams}
      />
    </>
  );
};

export default ShiftsList;