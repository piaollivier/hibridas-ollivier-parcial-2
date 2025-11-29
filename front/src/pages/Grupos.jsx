import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Grupos() {
  const [grupos, setGrupos] = useState([]);

  const obtenerGrupos = () => {
    fetch("http://localhost:3333/api/grupos")
      .then((res) => res.json())
      .then((data) => setGrupos(data))
      .catch(() => console.log("Error al obtener grupos"));
  };

  useEffect(() => {
    obtenerGrupos();
  }, []);

  const eliminarGrupo = (id) => {
    fetch(`http://localhost:3333/api/grupos/${id}`, {
      method: "DELETE",
    })
      .then(() => obtenerGrupos())
      .catch(() => console.log("Error al borrar grupo"));
  };

  return (
    <main className="mis-vacunas-crear">
      <div className="card-auth">

        <h1 className="card-auth__title">Grupos</h1>


        {grupos.length === 0 ? (
          <p>No hay grupos cargados.</p>
        ) : (
          <ul className="lista-vacunas">
            {grupos.map((g) => (
              <li key={g._id} className="vacuna-item">
                <h3>{g.nombre}</h3>

                <div className="btns">
                  <button
                    onClick={() => eliminarGrupo(g._id)}
                    className="btn-borrar"
                  >
                    Eliminar
                  </button>

                  <Link to={`/grupos/editar/${g._id}`} className="btn-editar">
                    Editar
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div style={{ marginBottom: "20px" }}>
          <Link to="/grupos/nuevo" className="btn-primary-auth">
            Crear nuevo grupo
          </Link>
        </div>

      </div>
    </main>
  );
}
