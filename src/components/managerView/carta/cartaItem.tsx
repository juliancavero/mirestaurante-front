import { DeleteButton } from "../../utils/DeleteButton";
import { ip } from "../../utils/fetchData";
import { ItemResponse } from "../../utils/types";

type CartaItemManager = ItemResponse & {
    showDeleteOptions?: boolean;
}

export function CartaItem(props: CartaItemManager){

    const { name, price, photo, showDeleteOptions } = props;
    
    return (
            <tr className="row">
                <td className="col-md-5 m-auto">{name}</td>
                <td className="col-md-3 m-auto">{price} €</td>
                <td className="col-md-3 image-td"><img className="cartaImage  m-auto" alt={name} src={ip+'/statics/'+photo}></img></td>
                { showDeleteOptions ? <DeleteButton assignedClass="col-md-1"/> : null}
            </tr>
    )
}