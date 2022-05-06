import './deletebutton.css';

type buttonprops = {
    assignedClass?: string;
    showConfirmationWindow?: () => void;
}
export function DeleteButton({assignedClass = '', showConfirmationWindow}: buttonprops){
    return (
        <button onClick={showConfirmationWindow} className={'close d-flex justify-content-center align-items-center ' + assignedClass}><img id='closeButtonImg' alt='Imagen de aspa para eliminar' src='/images/closeButton.png' /></button>
    )
}