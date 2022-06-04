import React, { useEffect, useState } from "react";
import "./reservationWindow.css";
import { TableType } from "../../utils/types";
import { UpdateTable } from "./updateTable";

type TablePropsType = {
  props: TableType;
};

export function Table({ props }: TablePropsType) {
  const { id, status, size } = props;

  const [windowVisible, setWindowVisible] = useState(false);
  const [bootstrapColor, setBootstrapColor] = useState("");

  useEffect(() => {
    switch (status) {
      case "Available":
        setBootstrapColor("btn btn-success");
        break;
      case "Reserved":
        setBootstrapColor("btn btn-secondary");
        break;
      case "Taken":
        setBootstrapColor("btn btn-darkRed");
    }
  }, [status]);

  function closeWindow() {
    setWindowVisible(!windowVisible);
  }

  return (
    <div className="eachTable">
      <div className="row">
        <h2 className="col m-auto">Mesa {id}</h2>
      </div>
      <div className="row">
        <button
          style={{ width: 4 + size * 2 + "rem", height: "8rem" }}
          className={bootstrapColor + " buttonTable"}
          onClick={() => setWindowVisible(true)}
        >
          {size}
        </button>
      </div>
      {windowVisible ? (
        <UpdateTable props={props} closeWindow={closeWindow} />
      ) : null}
    </div>
  );
}
