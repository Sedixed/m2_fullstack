import React from "react";

const DelivererTable = ({ deliverers }) => {
    const renderedDeliverers = deliverers.map(d => {
        return (
            <tr key={d.id}>
                <td>{d.name}</td>
                <td><i className={`icon ${d.available ? 'checkmark green' : 'close red'}`}></i></td>
                <td>{new Date(d.creationDate).toLocaleDateString()}</td>
            </tr>
        );
    })
    return (
        <div className="ui container">
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Disponible</th>
                        <th>Date de création</th>
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