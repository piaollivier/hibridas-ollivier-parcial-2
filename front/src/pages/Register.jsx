import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("El email y la contraseña son obligatorios");
      return;
    }

    if (!form.confirmPassword) {
      setError("La confirmación de la contraseña es obligatoria");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const body = {
      email: form.email,
      password: form.password,
        confirmPassword: form.confirmPassword,
      username: form.username, 

    };

    setError("");

    fetch("http://localhost:3333/api/userApp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        let data = null;
        try {
          data = await res.json();
        } catch {
        }

        if (!res.ok) {
          throw new Error(
            data?.error || "No se pudo registrar el usuario"
          );
        }

        return data;
      })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error("ERROR REGISTER FRONT >>>", err);
        setError(err.message || "No se pudo registrar el usuario");
      });
  };

  return (
    <main className="mis-vacunas-crear">
      <div className="card-auth" style={{ maxWidth: "480px" }}>
        <h1 className="card-auth__title">Crear cuenta</h1>

        {error && (
          <p
            style={{
              backgroundColor: "#fde2e2",
              color: "#b3261e",
              padding: "8px",
              borderRadius: "8px",
              marginBottom: "16px",
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="form-vacuna">
          <label>
            Nombre de usuario (opcional)
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Ingresar nombre de usuario"
            />
          </label>

          <label>
            Correo electrónico
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Ingresar correo"
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Ingresar contraseña"
            />
          </label>

          <label>
            Confirmar contraseña
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Repetir contraseña"
            />
          </label>

          <button type="submit" className="btn-primary-auth">
            Registrarme
          </button>

          <p
            style={{
              marginTop: "12px",
              fontSize: "0.9rem",
              textAlign: "center",
            }}
          >
            ¿Ya tenés cuenta?{" "}
            <Link
              to="/login"
              style={{
                color: "#06385f",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
