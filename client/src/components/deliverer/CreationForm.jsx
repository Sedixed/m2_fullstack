import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import paths from "../../constants/paths";
import routes from "../../constants/routes";
import server from "../../apis/server";

import '../../styles/CreationForm.css';
import ErrorMessage from "../ErrorMessage";

const CreationForm = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [visibleHelp, setVisibleHelp] = useState(false);
    const availableRef = useRef();
    const navigate = useNavigate();

    const onFormSubmit = (e) => {
        e.preventDefault();
        // Call API
        const create = async () => {
            const { data } = await server.post(
                routes.DELIVERER_CREATE,
                null,
                {
                    params: {
                        name: name,
                        availability: availableRef.current.checked
                    },
                }
            );

            if (data.status === 201) {
                navigate(paths.LIST_PATH, { 
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

    return (
        <React.Fragment>
            <ErrorMessage additionalClassName="creation-error-message" errorMessage={error} callback={() => setError('')}/>
            <div className="ui container creation-form">
                <h1 className="ui header centered">Nouveau livreur</h1>
                <form onSubmit={onFormSubmit} className="ui form">
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
                            defaultChecked
                        />
                        <label>Disponible</label>
                        </div>
                    </div>
                    
                    <button className="ui red button" type="submit">
                        Ajouter
                    </button>
                </form>
            </div>
        </React.Fragment>
    );
};

export default CreationForm;