import { fadeInAnimation } from "./estilos";
import './areYouSureWindow.css';
type props = {
    createConfirmationWindow: () => void;
    setConfirmation: (val: boolean) => void;
    goodOption: string;
    badOption: string;
}

export function AreYouSureWindow({setConfirmation, createConfirmationWindow, goodOption, badOption}: props){


    return (
        <div className="row">
            <div className={'col-sm-5 popup ' + fadeInAnimation}>
                <div className="d-flex justify-content-center m-auto my-3">
                    <div className="h1">¿Estás seguro?</div>
                </div>
                <div className="row m-auto d-flex justify-content-around mb-4">
                    <button className="col-md-5 btn btn-success" onClick={() => setConfirmation(true)}>{goodOption}</button>
                    <button className="col-md-3 btn btn-danger" onClick={createConfirmationWindow}>{badOption}</button>
                </div>
            </div>
        </div>
        
    )
}