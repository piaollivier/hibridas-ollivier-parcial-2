import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GruposCrear() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3333/api/grupos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre }),
    })
      .then((res) => res.json())
      .then(() => navigate("/grupos"))
      .catch(() => console.log("Error al crear grupo"));
  };

  return (
    <main className="mis-vacunas-crear">
      <div className="card-auth">
        
        

        <h1 className="card-auth__title">Nuevo grupo</h1>

        <form onSubmit={handleSubmit} className="form-vacuna">
          <label>
            Nombre del grupo
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Embarazadas, Adultos, Adolescentes..."
              required
            />
          </label>

          <button type="submit" className="btn-primary-auth">
            Guardar grupo
          </button>
          <button className="boton" onClick={() => navigate(-1)}>Volver</button>
        </form>
      </div>
    </main>
  );
}
