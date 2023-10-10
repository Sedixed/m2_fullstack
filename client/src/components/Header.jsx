import React from "react";
import { Link } from "react-router-dom";

import '../styles/Header.css';
import paths from "../constants/paths";

const Header = () => {
    return (
        <div className="ui secondary pointing menu c-header">

            <Link to={paths.CREATE_PATH} className="item">
                Nouveau livreur
            </Link>

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