import { fadeInAnimation } from "../../utils/estilos";

type props = {
    createConfirmationWindow: () => void;
    setConfirmation: (val: boolean) => void;
}

export function AreYouSureWindow({setConfirmation, createConfirmationWindow}: props){


    return (
        <div className={'popup-window ' + fadeInAnimation}>
            <div className="d-flex justify-content-center m-auto my-3">
                <div className="h1">¿Estás seguro?</div>
            </div>
            <div className="row m-auto d-flex justify-content-around mb-4">
                <button className="col-md-5 btn btn-success" onClick={() => setConfirmation(true)}>Marcar como pagado</button>
                <button className="col-md-3 btn btn-danger" onClick={createConfirmationWindow}>Volver</button>
            </div>
        </div>
    )
}