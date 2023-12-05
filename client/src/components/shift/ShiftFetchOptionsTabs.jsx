import React, { useEffect, useState } from "react";

import Loader from "../Loader";
import server from "../../apis/server";
import routes from "../../constants/routes";

const ShiftFetchOptionsTabs = ({
  setFilterOptionsCallback
}) => {
  const [delivererFiltering, setDelivererFiltering] = useState(false);
  const [delivererId, setDelivererId] = useState(null);
  const [dateFiltering, setDateFiltering] = useState(false);
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [deliverers, setDeliverers] = useState(null);

  useEffect(() => {
    const fetchDeliverers = async () => {
      const { data } = await server.get(
        routes.DELIVERERS, 
        {
          params: {
            pagination: false
          }
        }
      );  
      setDeliverers(data['hydra:member']);
    }
    fetchDeliverers();
  }, []);

  useEffect(() => {
    if (delivererFiltering || dateFiltering) {
      let filterParams = {};
      if (delivererFiltering && delivererId) {
        filterParams['deliverer'] = delivererId
      }
      if (dateFiltering) {
        if (startingDate !== '') {
          filterParams['startingDate'] = startingDate
        }
        if (endingDate !== '') {
          filterParams['endingDate'] = endingDate
        }
      }
      setFilterOptionsCallback(filterParams);
    } else {
      setFilterOptionsCallback(null);
    }
  }, [
    delivererFiltering,
    delivererId,
    dateFiltering, 
    startingDate, 
    endingDate
  ]);

  if (!deliverers) {
    return <Loader />
  }

  const renderedDateFilterButtons = () => {
    if (!dateFiltering) {
      return null;
    }

    return (
      <div className="date-opts">
        <div className="ui labeled input">
          <div className="ui label">
            Date de début
          </div>
          <input type="date" value={startingDate} onChange={e => setStartingDate(e.target.value)}/>
        </div>
        <div className="ui labeled input">
          <div className="ui label">
            Date de fin
          </div>
          <input type="date" value={endingDate} onChange={e => setEndingDate(e.target.value)}/>
        </div>
      </div>
    )
  }

  const renderedDelivererDropdown = () => {
    if (!delivererFiltering) {
      return null;
    }

    const renderedDeliverers = deliverers.map(
      deliverer => <option key={deliverer.id} value={deliverer.id}>{deliverer.name}</option>
    )

    return (
      <select 
        className="ui fluid dropdown"
        onChange={e => setDelivererId(e.target.value)}
        defaultValue={delivererId}
      >   
        <option value="">Tous</option>
        {renderedDeliverers}
      </select>
    )
  }
    
  return (
    <div className="fetch-options-tabs">
      <p className="label">Filtrer par</p>
      <div className="filter-group">
        <div className="ui buttons">
          <button 
            className={`ui medium button ${delivererFiltering ? 'darken' : ''}`}
            onClick={() => {
              setDelivererFiltering(!delivererFiltering);
            }}
          >
            Livreur
          </button>
          <button 
            className={`ui medium button ${dateFiltering ? 'darken' : ''}`}
            onClick={() => setDateFiltering(!dateFiltering)}
          >
            Date de début/fin
          </button>
        </div>
        {renderedDateFilterButtons()}
        {renderedDelivererDropdown()}
      </div>

      <button 
        className="ui medium black icon button ml-20"
        onClick={() => {
          setDelivererFiltering(false);
          setDelivererId(null);
          setDateFiltering(false);
          setStartingDate('');
          setEndingDate('');
        }}
      >
        Réinitialiser
      </button>
    </div>
  );
}

export default ShiftFetchOptionsTabs;