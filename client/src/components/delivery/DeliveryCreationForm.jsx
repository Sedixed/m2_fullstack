import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import paths from "../../constants/paths";
import routes from "../../constants/routes";
import server from "../../apis/server";

import '../../styles/CreationForm.css';
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";

const DeliveryCreationForm = () => {
  const [pickUpAddress, setPickUpAddress] = useState('');
  const [dropOffAddress, setDropOffAddress] = useState('');
  const [shiftId, setShiftId] = useState(null);
  const [error, setError] = useState('');
  const [shifts, setShifts] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await server.get(
        routes.SHIFTS, 
        {
          params: {
            pagination: false
          }
        }
      );  
      setShifts(data['hydra:member']);
    }
    fetch();
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    // Call API
    const create = async () => {
      const data = await server.post(
        routes.DELIVERIES,
        {
          pickUpAdress: pickUpAddress,
          dropOffAdress: dropOffAddress,
          shift: shiftId ? `/api/shifts/${shiftId}` : null
        }
      );
      
      if (data.status === 201) {
        navigate(paths.DELIVERIES_LIST_PATH, {
          state: {
            created: true
          }
        });
      } else {
        setError(data.message);
      }
    };

    create();
  };

  if (!shifts) {
    return <Loader />;
  }

  const renderedShifts = shifts.map(
    shift => <option key={shift.id} value={shift.id}>{shift.name}</option>
  )

  return (
    <>
      <ErrorMessage 
        additionalClassName="creation-error-message" 
        errorMessage={error} 
        callback={() => setError('')}
      />
      <div className="ui container creation-form delivery">
        <h1 className="ui header centered">Nouvelle livraison</h1>
        <form onSubmit={onFormSubmit} className="ui form">
          <div className="field">
            <label>Adresse de ramassage</label>
            <input 
              type="text" 
              value={pickUpAddress} 
              onChange={e => setPickUpAddress(e.target.value)}
              required
            />
          </div>
            
          <div className="field">
            <label>Adresse de dépôt</label>
            <input 
              type="text" 
              value={dropOffAddress} 
              onChange={e => setDropOffAddress(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Tournée</label>
            <select 
              className="ui fluid dropdown"
              onChange={e => setShiftId(e.target.value)}
            >   
              <option value="">Aucune</option>
              {renderedShifts}
            </select>
          </div>
            
          <button className="ui red button" type="submit">
            Ajouter
          </button>
        </form>
      </div>
    </>
  );
};

export default DeliveryCreationForm;