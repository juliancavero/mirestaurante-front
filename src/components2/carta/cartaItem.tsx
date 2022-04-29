import { ip } from "../utils/fetchData";
import { ItemResponse } from "../utils/types";


export function CartaItem(props: ItemResponse){

    const { name, price, photo } = props;
    
    return (
            <tr className="row content">
                <td className="col-md-6 m-auto">{name}</td>
                <td className="col-md-3 m-auto">{price} €</td>
                <td className="col-md-3"><img className="cartaImage" alt={name} src={ip+'/statics/'+photo}></img></td>
            </tr>
    )
}