import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./homeMenu.css";

export function LogIn() {
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { username, password } = document.forms[0];
    const body = JSON.stringify({
      userName: username.value,
      password: password.value,
    });
    fetch("http://localhost:3099/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    })
      .then((response) => response.json())
      .then((respuesta) => {
        if ("token" in respuesta) {
          const saveToken = handleLocalStorage(respuesta.token);
          if (!saveToken) {
            return window.alert("Fallo al almacenar las credenciales.");
          } else {
            handleRedirect();
          }
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
