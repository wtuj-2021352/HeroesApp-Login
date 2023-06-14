import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../../hooks/useForm";
import { apiLogin } from "../api/apiAuthUser";

export const LoginPage = () => {

  //Pasamos los datos al useForm y usamos el onInputChange para obtenerlos
  const { email, password, onInputChange, onResetForm } = useForm({
    email: '',
    password: '',
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = () => {
    const lastPath = localStorage.getItem('lastPath') || '/';
    login('Victor Cancinos');
    navigate(lastPath, {
      replace: true
    })
  }

  const onSubmitLogin = async(event) => {
    event.preventDefault();
    //console.log(`Email:"${email} y password: ${password} `);
    const result = await apiLogin(email, password);
    //console.log(result.data.nombre);
    if (result === false) return null;

    const lastPath = localStorage.getItem('lastPath') || '/';
    login(result.data.nombre, result.data.rol);
    navigate(lastPath, {
      replace: true
    })
    onResetForm();
  }

  return (
    <>
      <div className="container mt-5">
        <h1>Login</h1>
        <hr />
        <form onSubmit={onSubmitLogin}>
          <div className="mb-3">
            <label className="form-label">Correo Electronico</label>
            <input type="email"
              className="form-control"
              aria-describedby="emailHelp"
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary"
          >
            Login
          </button>
        </form>

      </div>
    </>
  )
}