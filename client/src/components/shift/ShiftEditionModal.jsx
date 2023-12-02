import React, { useRef, useState, useEffect } from "react";

import routes from "../../constants/routes";
import server from "../../apis/server";
import ErrorMessage from "../ErrorMessage";
import '../../styles/EditionModal.css';
import Loader from "../Loader";

const ShiftEditionModal = ({ 
    shift, 
    modalRef,
    closeModal,
    refetchCallback,
    location
}) => {
    const [name, setName] = useState(shift.name);
    const [startingDate, setStartingDate] = useState(new Date(shift.startingDate).toISOString().split('T')[0]);
    const [endingDate, setEndingDate] = useState(new Date(shift.endingDate).toISOString().split('T')[0]);
    const [delivererId, setDelivererId] = useState(shift.deliverer ? shift.deliverer.id : null);
    const [error, setError] = useState('');
    const [deliverers, setDeliverers] = useState(null);

    useEffect(() => {
      const fetch = async () => {
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
      fetch();
  }, []);

    const save = async () => {
        const data = await server.patch(
            routes.SHIFTS + '/' + shift.id,
            {
              name: name,
              startingDate: startingDate,
              endingDate: endingDate,
              deliverer: delivererId ? `/api/deliverers/${delivererId}` : null
            },
            {
                headers: {
                    'Content-Type': 'application/merge-patch+json'
                }
            }
        );
        
        if (data.status === 200) {
            location.state = {
                modified: true
            }
            closeModal();
            refetchCallback();
        } else {
            setError(data.message);
        }
    }

    if (!deliverers) {
      return (
        <div className="ui dimmer active edition-modal-dimmer">
          <Loader />
        </div>
      )
    }

    const renderedDeliverers = deliverers.map(
      deliverer => <option key={deliverer.id} value={deliverer.id}>{deliverer.name}</option>
    )

    return (
        <div className="ui dimmer active edition-modal-dimmer">
            <div ref={modalRef} className="ui modal active edition-modal">
                <i 
                    className="close icon"
                    onClick={closeModal}
                ></i>
                <div className="edition-modal-header header">
                    {shift.name}
                </div>
                <div className="content">
                    <ErrorMessage 
                        additionalClassName="creation-error-message" 
                        errorMessage={error} 
                        callback={() => setError('')}
                    />
                    <form onSubmit={null} className="ui form">
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
                                defaultValue={delivererId}
                            >   
                                <option value="">Aucun</option>
                                {renderedDeliverers}
                            </select>
                        </div>
                    </form>
                </div>
                <div className="actions">
                    <div 
                        className="ui black deny button"
                        onClick={closeModal}
                    >
                        Annuler
                    </div>
                    <div 
                        className="ui positive right labeled icon button"
                        onClick={save}
                    >
                        Enregistrer
                        <i className="checkmark icon"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShiftEditionModal;