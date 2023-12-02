import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import '../styles/Header.css';
import paths from "../constants/paths";

const Header = () => {
    const [currentTab, setCurrentTab] = useState(paths.DELIVERERS);
    const navigate = useNavigate();

    const updateTab = (path) => {
        setCurrentTab(path);
        navigate(path);
    }

    useEffect(() => {
        setCurrentTab(window.location.pathname)
    }, []);

    return (
        <div className="ui secondary pointing menu c-header">
            <div className="ui buttons right-spacing">
                <button 
                    className={`ui ${currentTab === paths.DELIVERERS_LIST_PATH ? 'active' : ''} button`} 
                    onClick={() => updateTab(paths.DELIVERERS_LIST_PATH)}
                >
                    Livreurs
                </button>
                <button 
                    className={`ui ${currentTab === paths.DELIVERERS_CREATE_PATH ? 'active' : ''} icon button`} 
                    onClick={() => updateTab(paths.DELIVERERS_CREATE_PATH)}
                >
                    <i className="icon plus alternate"></i>
                </button>
            </div>

            <div className="ui buttons right-spacing">
                <button 
                    className={`ui ${currentTab === paths.SHIFTS_LIST_PATH ? 'active' : ''} icon button`} 
                    onClick={() => updateTab(paths.SHIFTS_LIST_PATH)}
                >
                    Tournées
                </button>
                <button 
                    className={`ui ${currentTab === paths.SHIFTS_CREATE_PATH ? 'active' : ''} icon button`}
                    onClick={() => updateTab(paths.SHIFTS_CREATE_PATH)}
                >
                    <i className="icon plus alternate"></i>
                </button>
            </div>

            <div className="ui buttons right-spacing">
                <button 
                    className={`ui ${currentTab === paths.DELIVERIES_LIST_PATH ? 'active' : ''} button`} 
                    onClick={() => updateTab(paths.DELIVERIES_LIST_PATH)}
                >
                    Livraisons
                </button>
                <button 
                    className={`ui ${currentTab === paths.DELIVERIES_CREATE_PATH ? 'active' : ''} icon button`} 
                    onClick={() => updateTab(paths.DELIVERIES_CREATE_PATH)}
                >
                    <i className="icon plus alternate"></i>
                </button>
            </div>

            <div className="right text menu">
                <div className="ui item">
                    <span style={{ marginRight: '0.5rem' }}>Work in progress</span>
                    <i className="heart icon catch-icon" />
                </div>
            </div>
        </div>
    );
};

export default Header;