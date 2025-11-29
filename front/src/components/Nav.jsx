import { Link } from "react-router-dom";
import { useUsuario, useLogout } from "../context/SessionContext";

export default function Nav() {
  const { userApp } = useUsuario();
  const logout = useLogout();

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-logo">
          <Link to="/">Mistomed</Link>
        </div>

        <div className="navbar-links">

          <Link to="/">Home</Link>

          {!userApp ? (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/register" className="login-btn">
                Registrate
              </Link>
            </>
          ) : (
            <>
              <Link to="/mi-perfil" className="user-email">
                {userApp.email}
              </Link>

              <Link to="/vacunas">Vacunas</Link>
              <Link to="/mis-vacunas">Mis Vacunas</Link>
              <Link to="/grupos">Grupos</Link>
              <span
                onClick={logout}
                className="navbar-link-fake"
                style={{ cursor: "pointer" }}
              >
                Logout
              </span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
