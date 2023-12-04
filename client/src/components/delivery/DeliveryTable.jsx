import React from "react";

import '../../styles/DeliveryTable.css';

const DeliveryTable = ({ 
  deliveries, 
  editionCallback,
  deletionCallback
}) => {
  const renderedDeliveries = deliveries.map(d =>
    (
      <tr key={d.id}>
        <td className="center aligned">{d.pickUpAdress}</td>
        <td className="center aligned">{d.dropOffAdress}</td>
        <td className="center aligned">{d.shift ? d.shift.name : 'Aucune'}</td>
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
    )
  )

  return (
    <div className="ui container delivery-table">
      <table className="ui celled table">
        <thead>
          <tr>
            <th className="center aligned">Adresse de ramassage</th>
            <th className="center aligned">Adresse de dépôt</th>
            <th className="center aligned">Tournée associée</th>
            <th className="center aligned">Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderedDeliveries}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryTable;