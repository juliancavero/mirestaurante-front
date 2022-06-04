import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { genericFetch } from "../utils/fetchData";
import "./homeMenu.css";
import { NotFoundUser } from "./notFoundUser";

export function LogIn() {
  const [alreadyLogged, setAlreadyLogged] = useState(false);

  useEffect(() => {
    const role = window.localStorage.getItem("role");
    if (role) {
      setAlreadyLogged(true);
    }
  });
  return (
    <>
      <AlreadyLoggedHandler show={alreadyLogged} />
      <LoginHandler show={!alreadyLogged} />
    </>
  );
}
type LoginHandlerProps = {
  show: boolean;
};
function LoginHandler({ show }: LoginHandlerProps) {
  const [notFoundUserShow, setNotFoundUserShow] = useState(false);
  const [message, setMessage] = useState("");
  if (!show) return null;
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { loginServer } = genericFetch();
    const { username, password } = document.forms[0];
    const body = {
      userName: username.value,
      password: password.value,
    };
    loginServer(body).then((respuesta) => {
      if ("token" in respuesta && respuesta.token) {
        const saveToken = handleLocalStorage(respuesta.token);
        if (!saveToken) {
          return window.alert("Fallo al almacenar las credenciales.");
        } else {
          setNotFoundUserShow(true);
          setMessage("Login correcto");
          handleRedirect();
        }
      } else if ("userName" in respuesta) {
        setMessage("Credenciales de acceso incorrectas");
        setNotFoundUserShow(true);
      }
    });
  }

  function handleRedirect() {
    const role = window.localStorage.getItem("role");
    switch (role) {
      case "Waiter":
        window.location.assign("/camarero");
        break;
      case "Manager":
        window.location.assign("/manager");
        break;
      case "Owner":
        window.location.assign("/boss");
        break;
      default:
        window.location.assign("/");
        break;
    }
  }
  function handleLocalStorage(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const res = JSON.parse(window.atob(base64));
    if ("userName" in res && "role" in res) {
      window.localStorage.setItem("userName", res.userName);
      window.localStorage.setItem("role", res.role);
      return true;
    }
    return false;
  }

  return (
    <div className="container mainMenu">
      <div className="h3 h-75 d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit}>
          <div className="row my-2">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              placeholder="Nombre de usuario"
              type={"text"}
            ></input>
          </div>
          <div className="row my-2">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              placeholder="Contraseña"
              type={"password"}
            ></input>
          </div>
          <div className="row my-3">
            <NotFoundUser show={notFoundUserShow} message={message} />
            <button type={"submit"}>Log In</button>
          </div>
          <div className="d-flex justify-content-end my-2">
            <Link to={"/register"}>Regístrate</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

type AlreadyProps = {
  show: boolean;
};
function AlreadyLoggedHandler({ show }: AlreadyProps) {
  if (!show) return null;
  return <Navigate to={"/"} replace />;
}
