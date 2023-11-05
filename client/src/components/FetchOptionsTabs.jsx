import React, { useEffect, useState } from "react";

import '../styles/FetchOptionsTabs.css';

const FetchOptionsTabs = ({
    setSortOptionsCallback
}) => {
    const [sortProperty, setSortProperty] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        setSortOptionsCallback(
            sortProperty ?
            {
                property: sortProperty,
                order: sortOrder
            } :
            null
        )
        
    }, [sortOrder, sortProperty]);

    return (
        <div className="fetch-options-tabs">
            <p>Trier par</p>
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
            </div>
            <button 
                className="ui medium icon button"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
                <i className={`angle ${sortOrder === 'asc' ? 'up' : 'down'} icon`}></i>
            </button>

            <button 
                className="ui medium black icon button"
                onClick={() => {
                    setSortProperty(null);
                    setSortOrder('asc');
                }}
            >
                Réinitialiser
            </button>
            
        </div>
        
    );
}

export default FetchOptionsTabs;