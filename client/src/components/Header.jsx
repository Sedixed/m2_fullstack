import React from "react";

import '../styles/Header.css';

const Header = () => {
    return (
        <div className="ui secondary pointing menu c-header">

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