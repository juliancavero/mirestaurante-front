import './deletebutton.css';

type buttonprops = {
    assignedClass?: string;
    showConfirmationWindow?: () => void;
}
export function DeleteButton({assignedClass = '', showConfirmationWindow}: buttonprops){
    return (
        <button onClick={showConfirmationWindow} className={'close ' + assignedClass}>X</button>
    )
}