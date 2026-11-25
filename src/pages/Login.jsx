import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm.js';
import FormInput from '../components/FormInput.jsx';
import { alertaError, alertaExito } from '../utils/alerts.js';
import { buscarCredenciales } from '../utils/usuarios.js';
import Contexto from '../context/Contexto';

const inicial = { correo: '', password: '' };

const validar = (v) => {
  const e = {};
  if (!/^\S+@\S+\.\S+$/.test(v.correo)) e.correo = 'El campo correo es requerido y debe ser válido';
  if (!v.password) e.password = 'El campo contraseña es requerido!';
  return e;
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(Contexto);
  const { values, errors, handleChange, handleSubmit } = useForm(inicial, validar);

  const onSubmit = ({ correo, password }) => {
    const usuario = buscarCredenciales(correo, password);
    if (!usuario) {
      alertaError('Datos incorrectos', 'El correo o la contraseña no son válidos.');
      return;
    }

    login(usuario);
    alertaExito('Acceso correcto!', 'Estas siendo redirigido ...').then(() => {
      navigate('/');
    });
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="tarjeta p-4">
            <div className="text-center mb-3">
              <h1 className="h4">Iniciar sesión</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FormInput
                label="Correo"
                name="correo"
                type="email"
                icono="fa-envelope"
                placeholder="correo@ejemplo.com"
                value={values.correo}
                onChange={handleChange}
                error={errors.correo}
              />
              <FormInput
                label="Contraseña"
                name="password"
                type="password"
                icono="fa-key"
                placeholder="Tu contraseña"
                value={values.password}
                onChange={handleChange}
                error={errors.password}
              />
              <button type="submit" className="btn btn-morado w-100 mb-2">
                Iniciar Sesión
              </button>
            </form>

            <div className="text-center mt-2">
              <Link to="/registro" className="btn btn-outline-morado w-100 mb-2">
                Registrarse
              </Link>
              <Link to="/" className="small d-inline-block mt-1">
                <i className="fa-solid fa-arrow-left me-1"></i>Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;`  `