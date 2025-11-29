import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUsuario } from "../context/SessionContext";

const MisVacunasEditar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3333/api/grupos")
      .then((res) => res.json())
      .then((data) => setGrupos(data))
      .catch(() => console.log("Error obteniendo grupos"));
  }, []);

  useEffect(() => {
    if (!userApp?._id) return;

    fetch(`http://localhost:3333/api/vacunas/${id}?userId=${userApp._id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar vacuna");
        return res.json();
      })
      .then((data) => {
        setForm({
          nombre: data.nombre || "",
          previene: data.previene || "",
          edad_aplicacion: data.edad_aplicacion || "",
          dosis: data.dosis || "",
          grupo: data.grupo || "",
          obligatoria: !!data.obligatoria,
          fecha_colocacion: data.fecha_colocacion
            ? data.fecha_colocacion.slice(0, 10)
            : "",
        });
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar la vacuna");
        setCargando(false);
      });
  }, [id, userApp]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `http://localhost:3333/api/vacunas/${id}?userId=${userApp._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error al editar vacuna");
        return res.json();
      })
      .then(() => navigate("/mis-vacunas"))
      .catch(() => setError("No se pudo guardar la edición"));
  };

  if (cargando) return <p>Cargando vacuna...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="mis-vacunas-crear">
      <div className="card-auth">
        <div style={{ display: "flex", justifyContent: "start", gap: "16px" }}>
          <button className="boton" onClick={() => navigate(-1)}>
            ⬅️ Volver
          </button>
        </div>

        <h1 className="card-auth__title">Editar vacuna</h1>

        <form onSubmit={handleSubmit} className="form-vacuna">
          <label>
            Nombre de la vacuna
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Previene
            <input
              name="previene"
              value={form.previene}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Edad de aplicación recomendada
            <input
              name="edad_aplicacion"
              value={form.edad_aplicacion}
              onChange={handleChange}
            />
          </label>

          <label>
            Dosis aplicada
            <input
              name="dosis"
              value={form.dosis}
              onChange={handleChange}
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

export default MisVacunasEditar;
