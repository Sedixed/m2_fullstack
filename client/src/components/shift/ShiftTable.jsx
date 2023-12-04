import React from "react";

import '../../styles/ShiftTable.css';

const ShiftTable = ({ 
  shifts, 
  editionCallback,
  deletionCallback
}) => {
  const renderedShifts = shifts.map(s =>
    (
      <tr key={s.id}>
        <td className="center aligned">{s.name}</td>
        <td className="center aligned">{new Date(s.startingDate).toLocaleDateString()}</td>
        <td className="center aligned">{new Date(s.endingDate).toLocaleDateString()}</td>
        <td className="center aligned">{s.deliveries.length}</td>
        <td className="center aligned">{s.deliverer ? s.deliverer.name : 'Aucun'}</td>
        <td className="center aligned actions">
          <i 
            className="icon pencil alternate edit"
            onClick={() => editionCallback(s)}
          ></i>
          <i 
            className="icon trash alternate delete"
            onClick={() => deletionCallback(s.id)}
          ></i>
        </td>
      </tr>
    )
  )

  return (
    <div className="ui container shift-table">
      <table className="ui celled table">
        <thead>
            <tr>
              <th className="center aligned">Nom</th>
              <th className="center aligned">Date de début</th>
              <th className="center aligned">Date de fin</th>
              <th className="center aligned">Nombre de livraisons</th>
              <th className="center aligned">Livreur</th>
              <th className="center aligned">Actions</th>
            </tr>
        </thead>
        <tbody>
          {renderedShifts}
        </tbody>
      </table>
    </div>
  );
};

export default ShiftTable;