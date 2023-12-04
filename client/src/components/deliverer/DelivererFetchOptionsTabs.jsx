import React, { useEffect, useState } from "react";

import '../../styles/DelivererFetchOptionsTabs.css';

const DelivererFetchOptionsTabs = ({
  setSortOptionsCallback,
  setFilterOptionsCallback
}) => {
  const [sortProperty, setSortProperty] = useState(null);
  const [availableFiltering, setAvailableFiltering] = useState(false);
  const [creationDateFiltering, setCreationDateFiltering] = useState(false);
  const [available, setAvailable] = useState(true);
  const [beforeDate, setBeforeDate] = useState('');
  const [afterDate, setAfterDate] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setSortOptionsCallback(
      sortProperty ?
      {
        property: sortProperty,
        order: sortOrder
      } :
      null
    );

    if (availableFiltering || creationDateFiltering) {
      let filterParams = {};
      if (availableFiltering) {
        filterParams['available'] = available
      }
      if (creationDateFiltering) {
        if (beforeDate !== '') {
          filterParams['beforeDate'] = beforeDate
        }
        if (afterDate !== '') {
          filterParams['afterDate'] = afterDate
        }
      }
      setFilterOptionsCallback(filterParams);
    } else {
      setFilterOptionsCallback(null);
    }
  }, [
    sortOrder, 
    sortProperty, 
    availableFiltering, 
    creationDateFiltering, 
    available, 
    beforeDate, 
    afterDate
  ]);

  const renderedAvailableFilterButtons = () => {
    if (!availableFiltering) {
      return null;
    }

    return (
      <div 
        className="ui medium icon button available-opts"
        onClick={() => setAvailable(!available)}
      >
        <i className={`icon ${available ? 'checkmark green' : 'close red'}`}></i>
      </div>
    );    
  }

  const renderedDateFilterButtons = () => {
    if (!creationDateFiltering) {
      return null;
    }

    return (
      <div className="date-opts">
        <div className="ui labeled input">
          <div className="ui label">
            Avant le
          </div>
          <input type="date" value={beforeDate} onChange={e => setBeforeDate(e.target.value)}/>
        </div>
        <div className="ui labeled input">
          <div className="ui label">
            Après le
          </div>
          <input type="date" value={afterDate} onChange={e => setAfterDate(e.target.value)}/>
        </div>
      </div>
    )
  }
    
  return (
    <div className="fetch-options-tabs">
      <p className="label">Trier par</p>
      <div className="ui buttons">
        <button 
          className={`ui medium button ${sortProperty === 'name' ? 'darken' : ''}`}
          onClick={() => setSortProperty('name')}
        >
          Nom
        </button>
        <button 
          className={`ui medium button ${sortProperty === 'creationDate' ? 'darken' : ''}`}
          onClick={() => setSortProperty('creationDate')}
        >
          Date de création
        </button>
        <button 
          className={`ui medium button ${sortProperty === 'shiftsCount' ? 'darken' : ''}`}
          onClick={() => setSortProperty('shiftsCount')}
        >
          Nombre de tournées
        </button>
      </div>

      <button 
        className="ui medium icon button ml-20 mr-50"
         onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        <i className={`angle ${sortOrder === 'asc' ? 'up' : 'down'} icon`}></i>
      </button>

      <p className="label">Filtrer par</p>
      <div className="filter-group">
        <div className="ui buttons">
          <button 
            className={`ui medium button ${availableFiltering ? 'darken' : ''}`}
            onClick={() => setAvailableFiltering(!availableFiltering)}
          >
            Disponibilité
          </button>
          <button 
            className={`ui medium button ${creationDateFiltering ? 'darken' : ''}`}
            onClick={() => setCreationDateFiltering(!creationDateFiltering)}
          >
            Date de création
          </button>
        </div>
        {renderedDateFilterButtons()}
        {renderedAvailableFilterButtons()}
      </div>

      <button 
        className="ui medium black icon button ml-20"
        onClick={() => {
          setSortProperty(null);
          setSortOrder('asc');
          setAvailableFiltering(false);
          setCreationDateFiltering(false);
          setAvailable(true);
        }}
      >
        Réinitialiser
      </button>
    </div>
  );
}

export default DelivererFetchOptionsTabs;