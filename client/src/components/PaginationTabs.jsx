import React from "react";

import '../styles/PaginationTabs.css';

const PaginationTabs = ({ currentPage, hydraView, callback }) => {
    
    const parseViewElement = (viewElement) => {
        const urlParams = new URLSearchParams(viewElement);
        return {
            pagination: true,
            page: urlParams.get('page'),
            itemsPerPage: urlParams.get('itemsPerPage')
        };
    };

    return (
        <div className="ui center aligned container pagination-tabs">
            <div className="ui buttons">
                <button 
                    className="ui button"
                    onClick={() => callback(parseViewElement(hydraView['hydra:first']))}
                    disabled={
                        hydraView['hydra:first'] === undefined || 
                        currentPage == parseViewElement(hydraView['hydra:first']).page
                    }
                >
                    <i className="icon angle double left"></i>
                </button>

                <button 
                    className="ui button"
                    onClick={
                        hydraView['hydra:previous'] ?
                        () => callback(parseViewElement(hydraView['hydra:previous'])) :
                        null
                    }
                    disabled={hydraView['hydra:previous'] === undefined}
                >
                    <i className="icon angle left"></i>
                </button>

                <button className="ui button">{currentPage}</button>

                <button 
                    className="ui button"
                    onClick={
                        hydraView['hydra:next'] ?
                        () => callback(parseViewElement(hydraView['hydra:next'])) :
                        null
                    }
                    disabled={hydraView['hydra:next'] === undefined}
                >
                    <i className="icon angle right"></i>
                </button>

                <button 
                    className="ui button"
                    onClick={() => callback(parseViewElement(hydraView['hydra:last']))}
                    disabled={
                        hydraView['hydra:last'] === undefined || 
                        currentPage == parseViewElement(hydraView['hydra:last']).page
                    }
                >
                    <i className="icon angle double right"></i>
                </button>
            </div>
        </div>
    );
}

export default PaginationTabs;