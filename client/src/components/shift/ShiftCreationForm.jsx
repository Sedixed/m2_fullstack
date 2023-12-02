import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import paths from "../../constants/paths";
import routes from "../../constants/routes";
import server from "../../apis/server";

import '../../styles/CreationForm.css';
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";

const ShiftCreationForm = () => {
    const [name, setName] = useState('');
    const [startingDate, setStartingDate] = useState('');
    const [endingDate, setEndingDate] = useState('');
    const [delivererId, setDelivererId] = useState(null);
    const [error, setError] = useState('');
    const [deliverers, setDeliverers] = useState(null);

    const navigate = useNavigate();

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

    const onFormSubmit = (e) => {
        e.preventDefault();
        // Call API
        const create = async () => {
            let startingTime = new Date(startingDate).getTime();
            let endingTime = new Date(endingDate).getTime();
            let mustCancel = false;
            if (delivererId) {
                let deliverer = deliverers.find(d => d.id == delivererId)
                deliverer.shifts.every(shift => {
                    let shiftStartingTime = new Date(shift.startingDate).getTime();
                    let shiftEndingTime = new Date(shift.endingDate).getTime();
                    if ((startingTime > shiftStartingTime && 
                        startingTime < shiftEndingTime) ||
                        (endingTime > shiftStartingTime && 
                        endingTime < shiftEndingTime)
                    ) { 
                        setError(`Ce livreur a déjà une tournée de prévue du ${new Date(shift.startingDate).toLocaleDateString()} au ${new Date(shift.endingDate).toLocaleDateString()} !`);
                        mustCancel = true;
                        return;
                    }
                });
            }

            if (mustCancel) {
              return;
            }

            if (startingTime > endingTime) {
              setError('La date de fin de la livraison doit être ultérieure à la date de début !');
              return;
            }

            const data = await server.post(
                routes.SHIFTS,
                {
                    name: name,
                    startingDate: startingDate,
                    endingDate: endingDate,
                    deliverer: delivererId ? `/api/deliverers/${delivererId}` : null
                }
            );
            
            if (data.status === 201) {
                navigate(paths.SHIFTS_LIST_PATH, {
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

    if (!deliverers) {
      return <Loader />
    }

    const renderedDeliverers = deliverers.map(
      deliverer => <option key={deliverer.id} value={deliverer.id}>{deliverer.name}</option>
    )

    return (
        <>
            <ErrorMessage 
                additionalClassName="creation-error-message" 
                errorMessage={error} 
                callback={() => setError('')}
            />
            <div className="ui container creation-form shift">
                <h1 className="ui header centered">Nouvelle tournée</h1>
                <form onSubmit={onFormSubmit} className="ui form">
                    <div className="field">
                        <label>Nom</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={e => setName(e.target.value)}
                            maxLength="32"
                            minLength="3"
                            required
                        />
                    </div>
                    
                    <div className="field">
                        <label>Date de début</label>
                        <input 
                            type="date" 
                            value={startingDate} 
                            onChange={e => setStartingDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field">
                        <label>Date de fin</label>
                        <input 
                            type="date" 
                            value={endingDate} 
                            onChange={e => setEndingDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field">
                        <label>Livreur</label>
                        <select 
                            className="ui fluid dropdown"
                            onChange={e => setDelivererId(e.target.value)}
                        >   
                            <option value="">Aucun</option>
                            {renderedDeliverers}
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

export default ShiftCreationForm;