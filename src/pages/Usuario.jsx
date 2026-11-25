import { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Contexto from '../context/Contexto';

const Usuario = () => {
  const { nombre } = useParams();
  const navigate = useNavigate();
  const { cerrar_sesion } = useContext(Contexto);

  const logout = () => {
    cerrar_sesion();
    navigate('/login');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="tarjeta p-5 text-center">
          <span className="icono-circulo mb-3"><i className="fa-solid fa-user"></i></span>
          <h1 className="h3">Usuario: {nombre}</h1>
          <p className="text-muted">Esta página lee el nombre desde la URL: <code>/usuario/{nombre}</code></p>
          <Link to="/personajes" className="btn btn-morado me-2">Ver personajes</Link>
          <button type="button" className="btn btn-outline-morado" onClick={logout}>Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
};

export default Usuario;
