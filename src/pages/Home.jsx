import { useContext } from "react";
import { useState } from "preact/hooks";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Contexto from "../context/Contexto";

const Home = () => {
  const navigate = useNavigate();
  const { usuario, cerrar_sesion } = useContext(Contexto);
  const [idPersonaje, setIdPersonaje] = useState("");
  const [errorId, setErrorId] = useState("");

  const nombreUsuario =
    typeof usuario === "string"
      ? usuario
      : usuario?.usuario || usuario?.nombre || usuario?.correo || "";

  const logout = () => {
    cerrar_sesion();
    Swal.fire({
      icon: "success",
      title: "Cerrando sesión!",
      text: "Estás siendo redirigido",
    }).then(() => {
      navigate("/login");
    });
  };

  const buscarPorId = (evento) => {
    evento.preventDefault();
    const id = idPersonaje.trim();

    if (!/^[1-9]\d*$/.test(id)) {
      setErrorId("Ingresa un número de ID válido.");
      return;
    }

    setErrorId("");
    navigate(`/personaje/${id}`);
  };

  return (
    <>
      <section className="buscador-id tarjeta p-3 p-md-4 mb-4">
        <div className="row align-items-center g-3">
          <div className="col-md-5">
            <h2 className="h5 mb-1">Unidad 4</h2>
            <p className="text-muted small mb-0">
              Ingresa un número o abre <code>/personaje/1</code> directamente.
            </p>
          </div>
          <div className="col-md-7">
            <form onSubmit={buscarPorId}>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                </span>
                <input
                  type="number"
                  min="1"
                  className={`form-control ${errorId ? "is-invalid" : ""}`}
                  placeholder="Ejemplo: 1"
                  value={idPersonaje}
                  onInput={(evento) => setIdPersonaje(evento.currentTarget.value)}
                  aria-label="ID del personaje"
                  aria-invalid={Boolean(errorId)}
                  aria-describedby={errorId ? "error-id-personaje" : undefined}
                />
                <button type="submit" className="btn btn-morado px-4">
                  Buscar
                </button>
              </div>
              {errorId && (
                <div id="error-id-personaje" className="text-danger small mt-2">
                  {errorId}
                </div>
              )}
              <Link to="/personaje/1" className="small d-inline-block mt-2">
                Ver ejemplo: Rick Sanchez
              </Link>
            </form>
          </div>
        </div>
      </section>

      <section className="hero text-center p-5 mb-4">
        <h1 className="display-5 fw-bold">Bienvenido</h1>
        {nombreUsuario && <p className="fw-semibold mb-3">Usuario: {nombreUsuario}</p>}
        <div className="d-flex justify-content-center gap-2">
          {usuario && (
            <button onClick={logout} className="btn btn-danger">
              <i className="fa-solid fa-right-from-bracket me-1"></i> Cerrar sesión
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;