import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./homeMenu.css";

export function LogIn() {
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { username, password } = document.forms[0];
  }
  return (
    <div className="container mainMenu">
      <div className="row">
        <Link className="link" to="/camarero">
          <button type="button" className="my-3 btn btn-lg boss container">
            <h1>Menú de camarero</h1>
          </button>
        </Link>
      </div>
      <div className="row">
        <Link className="link" to="/manager">
          <button type="button" className="my-3 btn btn-lg boss container">
            <h1>Menú de manager</h1>
          </button>
        </Link>
      </div>
      <div className="row">
        <Link className="link" to="/boss">
          <button type="button" className="my-3 btn btn-lg boss container">
            <h1>Menú de jefe</h1>
          </button>
        </Link>
      </div>
      <div className="h3 h-75 d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit}>
          <div className="row my-2">
            <label htmlFor="username">Usuario</label>
            <input
              name="username"
              placeholder="Nombre de usuario"
              type={"text"}
            ></input>
          </div>
          <div className="row my-2">
            <label htmlFor="password">Contraseña</label>
            <input
              name="password"
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
