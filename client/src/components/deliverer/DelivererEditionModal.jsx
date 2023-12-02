import React, { useRef, useState } from "react";

import routes from "../../constants/routes";
import server from "../../apis/server";
import ErrorMessage from "../ErrorMessage";
import '../../styles/EditionModal.css';

const DelivererEditionModal = ({ 
    deliverer, 
    modalRef,
    closeModal,
    refetchCallback,
    location
}) => {
    const [name, setName] = useState(deliverer.name);
    const [error, setError] = useState('');
    const [visibleHelp, setVisibleHelp] = useState(false);
    const availableRef = useRef();

    const save = async () => {
        const data = await server.patch(
            routes.DELIVERERS + '/' + deliverer.id,
            {
                name: name,
                available: availableRef.current.checked
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

    return (
        <div className="ui dimmer active edition-modal-dimmer">
            <div ref={modalRef} className="ui modal active edition-modal">
                <i 
                    className="close icon"
                    onClick={closeModal}
                ></i>
                <div className="edition-modal-header header">
                    {deliverer.name}
                </div>
                <div className="content">
                    <ErrorMessage 
                        additionalClassName="creation-error-message" 
                        errorMessage={error} 
                        callback={() => setError('')}
                    />
                    <form onSubmit={null} className="ui form">
                        <div className="field">
                            <label>Nom complet</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={e => setName(e.target.value)}
                                onMouseEnter={_ => setVisibleHelp(true)}
                                onMouseLeave={_ => setVisibleHelp(false)}
                                maxLength="32"
                                minLength="3"
                                placeholder={deliverer.name}
                                required
                            />
                            <div className={`ui teal left pointing label visible-help-label ${visibleHelp ? '' : 'hidden'}`}>
                                3 - 32 caractères
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui checkbox">
                            <input 
                                type="checkbox" 
                                ref={availableRef}
                                defaultChecked={deliverer.available}
                            />
                            <label>Disponible</label>
                            </div>
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

export default DelivererEditionModal;