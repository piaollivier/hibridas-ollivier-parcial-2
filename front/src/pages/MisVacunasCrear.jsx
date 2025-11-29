import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../context/SessionContext";

const MisVacunasCrear = () => {
  const navigate = useNavigate();
  const { userApp } = useUsuario();

  const [form, setForm] = useState({
    nombre: "",
    previene: "",
    edad_aplicacion: "",
    dosis: "",
    grupo: "",
    obligatoria: false,
    fecha_colocacion: "",
  });

  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/api/grupos")
      .then((res) => res.json())
      .then((data) => setGrupos(data))
      .catch(() => console.log("Error al obtener grupos"));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      ...form,
      userId: userApp?._id,
    };

    fetch("http://localhost:3333/api/vacunas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al crear vacuna");
        return res.json();
      })
      .then(() => navigate("/mis-vacunas"))
      .catch((err) => console.error(err));
  };

  return (
    <main className="mis-vacunas-crear">
      <div className="card-auth">
        
        <div style={{ display: "flex", justifyContent: "start", alignItems: "center", gap: "16px" }}>
          <button className="boton" onClick={() => navigate(-1)}>Volver</button>
        </div>

        <h1 className="card-auth__title">Cargar mi vacuna</h1>

        <form onSubmit={handleSubmit} className="form-vacuna">

          <label>
            Nombre de la vacuna
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              placeholder="Ingresar nombre de la vacuna"
            />
          </label>

          <label>
            Previene
            <input
              name="previene"
              value={form.previene}
              onChange={handleChange}
              required
              placeholder="Ingresar qué previene"
            />
          </label>

          <label>
            Edad de aplicación recomendada
            <input
              name="edad_aplicacion"
              value={form.edad_aplicacion}
              onChange={handleChange}
              placeholder="Ingresar edad"
            />
          </label>

          <label>
            Dosis aplicada
            <input
              name="dosis"
              value={form.dosis}
              onChange={handleChange}
              placeholder="Ingresar dosis"
            />
          </label>

          <label>
            Grupo / categoría
            <select
              name="grupo"
              value={form.grupo}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar grupo</option>
              {grupos.map((g) => (
                <option key={g._id} value={g.nombre}>
                  {g.nombre}
                </option>
              ))}
            </select>
          </label>

          <label>
            Fecha de colocación
            <input
              type="date"
              name="fecha_colocacion"
              value={form.fecha_colocacion}
              onChange={handleChange}
            />
          </label>

          <label className="form-vacuna__checkbox">
            <input
              type="checkbox"
              name="obligatoria"
              checked={form.obligatoria}
              onChange={handleChange}
            />
            Obligatoria
          </label>

          <button type="submit" className="btn-primary-auth">
            Guardar cambios
          </button>

        </form>
      </div>
    </main>
  );
};

export default MisVacunasCrear;
