import React, { useState } from "react";
import { Link } from "react-router-dom";
import { genericFetch } from "../utils/fetchData";
import { HandleResponseComponent } from "./handleResponseComponent";
import "./homeMenu.css";

export function RegisterPage() {
  const { registerUser } = genericFetch();
  const [message, setMessage] = useState("");
  const [showSuccessfullLogin, setShowSuccessfullLogin] = useState(false);
  const [showUsernameExists, setShowUsernameExists] = useState(false);
  const [showWrongKey, setShowWrongKey] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { username, password, nombre, dni, secretKey } = document.forms[0];
    const bod = {
      userName: username.value,
      password: password.value,
      name: nombre.value,
      dni: dni.value,
      secretKey: secretKey.value,
    };
    registerUser(bod).then((resp) => {
      handleStatusCode(resp);
    });
  }

  function handleStatusCode(resp: any) {
    if ("secretKey" in resp) {
      handleResponse(403);
    } else if ("userName" in resp) {
      handleResponse(405);
    } else if ("dni" in resp) {
      handleResponse(200);
    }
  }

  function handleResponse(code: number) {
    switch (code) {
      case 200:
        successfullLogin();
        break;
      case 403:
        wrongKey();
        break;
      case 405:
        existingUserHandler();
        break;
    }
  }

  function successfullLogin() {
    setMessage("Usuario registrado con éxito");
    setShowSuccessfullLogin(true);
    setInterval(() => window.location.assign("/"), 2500);
  }

  function wrongKey() {
    setMessage("Clave de confirmación incorrecta");
    setShowWrongKey(true);
  }

  function existingUserHandler() {
    setMessage("Ya existe este nombre de usuario");
    setShowUsernameExists(true);
  }

  return (
    <div className="h3 h-75 d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit}>
        <div className="row my-2">
          <label htmlFor="nombre">Nombre del trabajador</label>
          <input
            required
            id="nombre"
            placeholder="Nombre..."
            type={"text"}
          ></input>
        </div>
        <div className="row my-2">
          <label htmlFor="username">Usuario</label>
          <input
            required
            name="username"
            placeholder="Nombre de usuario..."
            type={"text"}
          ></input>
          <HandleResponseComponent
            color={"red"}
            show={showUsernameExists}
            message={message}
          />
        </div>
        <div className="row my-2">
          <label htmlFor="dni">DNI</label>
          <input
            required
            pattern="^[0-9]{8}[a-zA-Z]{1}$"
            name="dni"
            placeholder="12345678X"
            type={"text"}
          ></input>
        </div>
        <div className="row my-2">
          <label htmlFor="password">Contraseña</label>
          <p className="instructions">Introduce al menos 5 caracteres</p>
          <input
            required
            pattern="^[a-zA-Z0-9_@!?|\\\/\-]{5,}$"
            name="password"
            placeholder="Contraseña..."
            type={"password"}
          ></input>
        </div>
        <div className="row my-2">
          <label htmlFor="secretKey">Clave de confirmación</label>
          <input required name="secretKey" placeholder="" type={"text"}></input>
          <HandleResponseComponent
            color={"red"}
            show={showWrongKey}
            message={message}
          />
        </div>
        <div className="row my-3">
          <button type={"submit"}>Registro</button>
        </div>
        <HandleResponseComponent
          color={"green"}
          show={showSuccessfullLogin}
          message={message}
        />
      </form>
    </div>
  );
}
