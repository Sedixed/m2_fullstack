import React from "react";

import '../../styles/DelivererTable.css';

const DelivererTable = ({ 
    deliverers, 
    editionCallback,
    deletionCallback
}) => {
    const renderedDeliverers = deliverers.map(d => {
        return (
            <tr key={d.id}>
                <td className="center aligned">{d.name}</td>
                <td className="center aligned">
                    <i className={`icon ${d.available ? 'checkmark green' : 'close red'}`}></i>
                </td>
                <td className="center aligned">
                    {new Date(d.creationDate).toLocaleDateString()}
                </td>
                <td className="center aligned actions">
                    <i 
                        className="icon pencil alternate edit"
                        onClick={() => editionCallback(d)}
                    ></i>
                    <i 
                        className="icon trash alternate delete"
                        onClick={() => deletionCallback(d.id)}
                    ></i>
                </td>
            </tr>
        );
    })
    return (
        <div className="ui container deliverer-table">
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th className="center aligned">Nom</th>
                        <th className="center aligned">Disponible</th>
                        <th className="center aligned">Date de création</th>
                        <th className="center aligned">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedDeliverers}
                </tbody>
            
                
            </table>
        </div>
    );
};

export default DelivererTable;