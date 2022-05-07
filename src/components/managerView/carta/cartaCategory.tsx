import { useEffect, useState } from "react";
import { AreYouSureWindow } from "../../utils/areYouSureWindow";
import { DeleteButton } from "../../utils/DeleteButton";
import { genericFetch } from "../../utils/fetchData";
import { CategoriaType } from "../../utils/types"
import { CartaItem } from "./cartaItem";

type CategoriaManagerType = CategoriaType & {
    showDeleteOptions?: boolean;   
}

export function CartaCategory(props: CategoriaManagerType){
    const { name, items, showDeleteOptions } = props;
    const { deleteCartaCategory } = genericFetch();

    const [ confirmDeleteCategory, setConfirmDeleteCategory ] = useState(false);
    const [ confirmWindowVisible, setConfirmWindowVisible ] = useState(false);
    
    function windowVisible(){
        setConfirmWindowVisible(!confirmWindowVisible);
    }

    useEffect(() => {
        if(confirmDeleteCategory){
            const bod = { name: name }
            deleteCartaCategory(bod).then(response => {
                    window.alert('Categoría ' + name + ' borrada correctamente.');
                    window.location.reload();
            })
        }
    }, [confirmDeleteCategory])
    
    return (
        <div>
            <tr className="row title bg-success">
                <td className="col-md-11" colSpan={3}>{name}</td>
                { showDeleteOptions ? <DeleteButton showConfirmationWindow={windowVisible} assignedClass="col-md-1 d-flex justify-content-center"/> : null}
                { confirmWindowVisible ?
                    <AreYouSureWindow
                        setConfirmation={setConfirmDeleteCategory}
                        createConfirmationWindow={windowVisible}
                        goodOption={'Borrar categoría ' + name + ` (Se perderán todos sus artículos)`}
                        badOption='Cancelar' />
                : null}
            </tr>
            {
                items.map((item) => (
                    <CartaItem
                        _id={item._id}
                        name={item.name}
                        price={item.price}
                        photo={item.photo}
                        showDeleteOptions={showDeleteOptions}
                    />
                ))
            }
        </div>
    )
}