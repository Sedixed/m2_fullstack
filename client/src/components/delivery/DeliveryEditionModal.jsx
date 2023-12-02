import React, { useRef, useState, useEffect } from "react";

import routes from "../../constants/routes";
import server from "../../apis/server";
import ErrorMessage from "../ErrorMessage";
import '../../styles/EditionModal.css';
import Loader from "../Loader";

const DeliveryEditionModal = ({ 
    delivery, 
    modalRef,
    closeModal,
    refetchCallback,
    location
}) => {
    const [pickUpAddress, setPickUpAddress] = useState(delivery.pickUpAdress);
    const [dropOffAddress, setDropOffAddress] = useState(delivery.dropOffAdress);
    const [shiftId, setShiftId] = useState(delivery.shift ? delivery.shift.id : null);
    const [error, setError] = useState('');
    const [shifts, setShifts] = useState(null);

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

    const save = async () => {
        const data = await server.patch(
            routes.DELIVERIES + '/' + delivery.id,
            {
                pickUpAdress: pickUpAddress,
                dropOffAdress: dropOffAddress,
                shift: shiftId ? `/api/shifts/${shiftId}` : null
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

    if (!shifts) {
      return (
        <div className="ui dimmer active edition-modal-dimmer">
          <Loader />
        </div>
      )
    }

    const renderedShifts = shifts.map(
      shift => <option key={shift.id} value={shift.id}>{shift.name}</option>
    )

    return (
        <div className="ui dimmer active edition-modal-dimmer">
            <div ref={modalRef} className="ui modal active edition-modal">
                <i 
                    className="close icon"
                    onClick={closeModal}
                ></i>
                <div className="edition-modal-header header">
                    Livraison
                </div>
                <div className="content">
                    <ErrorMessage 
                        additionalClassName="creation-error-message" 
                        errorMessage={error} 
                        callback={() => setError('')}
                    />
                    <form onSubmit={null} className="ui form">
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
                                defaultValue={shiftId}
                            >   
                                <option value="">Aucune</option>
                                {renderedShifts}
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

export default DeliveryEditionModal;