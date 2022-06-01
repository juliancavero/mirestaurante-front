import { useEffect, useState } from "react";
import { genericFetch } from "../../utils/fetchData";
import { v4 as uuidv4 } from "uuid";

export function NewEmployee() {
  const { putNewPassword, getPassword } = genericFetch();
  const [password, setPassword] = useState<string>();

  function generateNewPassword() {
    setPassword(uuidv4().slice(0, 5));
  }

  useEffect(() => {
    getPassword().then((resp) => {
      setPassword(resp.password);
    });
  }, []);

  useEffect(() => {
    if (password) {
      putNewPassword(password);
    }
  }, [password]);
  return (
    <div className="row col m-3 rounded px-4 py-2 registerEmployeeBox">
      <h3>
        Los empleados se darán de alta en la página de registro de la
        plataforma, introduciendo la clave de confirmación.
      </h3>
      <div className="row mt-3">
        <div className="col-md-3">
          <h2>Clave de confirmación: </h2>
        </div>
        <div className="col-md-7 offset-md-2">
          <div className="row d-flex">
            <button onClick={generateNewPassword} className="btn btn-warning">
              <h1>{password}</h1>
            </button>
            <p>
              Para generar una nueva clave de confirmación, haz click en el
              botón.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
