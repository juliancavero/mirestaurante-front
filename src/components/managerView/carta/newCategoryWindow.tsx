/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from "react";
import { DeleteButton } from "../../utils/DeleteButton";
import { fadeInAnimation } from "../../utils/estilos";
import { genericFetch } from "../../utils/fetchData";
import "./carta.css";

type props = {
  setVisibility: () => void;
};
export function NewCategoryWindow({ setVisibility }: props) {
  const { getCartaCategories, postNewCategory } = genericFetch();

  const [categories, setCategories] = useState<string[]>();
  const [newCategoryName, setNewCategoryName] = useState<string>();

  useEffect(() => {
    getCartaCategories().then((response) => setCategories(response));
  }, []);

  function checkEmptyData() {
    if (!newCategoryName) {
      window.alert("Category cannot be empty!");
      return false;
    }
    return true;
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (!checkEmptyData()) return;

    if (newCategoryName) {
      const itemBody = {
        name: newCategoryName,
      };
      postNewCategory(itemBody).then((response) => {
        window.alert("Categoría creada correctamente");
        window.location.reload();
      });
    }
  }

  return (
    <div className={"row col-md-6 p-3 popup-window " + fadeInAnimation}>
      <div className="row" id="firstRow">
        <h1 className="col-md-11 my-auto">Crear nueva categoría en Carta</h1>
        <DeleteButton
          assignedClass="col-md-1"
          showConfirmationWindow={setVisibility}
        />
      </div>

      <div className="row">
        <div className="col-md-8 m-auto">
          <table className="table existentCategories">
            <thead>
              <tr>
                <th>Categorías existentes actualmente</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((cat) => (
                <tr key={cat} className="row fila m-auto">
                  <td className="col-md-8 m-auto">{cat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row d-flex justify-content-around" id="thirdRow">
        <form action="" onSubmit={(event) => onSubmit(event)}>
          <input
            className="col-lg-5"
            onChange={(event) => setNewCategoryName(event.target.value)}
            type="text"
          />
          <button className="col-lg-5 btn-success" type="submit">
            Crear nueva categoría
          </button>
        </form>
      </div>
    </div>
  );
}
