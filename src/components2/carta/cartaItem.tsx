import { ip } from "../utils/fetchData";
import { ItemResponse } from "../utils/types";


export function CartaItem(props: ItemResponse){

    const { name, price, photo } = props;
    
    return (
            <tr className="row">
                <td className="col-md-6 m-auto content">{name}</td>
                <td className="col-md-3 m-auto content">{price} €</td>
                <td className="col-md-3 content"><img className="cartaImage  m-auto" alt={name} src={ip+'/statics/'+photo}></img></td>
            </tr>
    )
}