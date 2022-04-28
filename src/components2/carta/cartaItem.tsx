import { url } from "../utils/fetchData";
import { ItemResponse } from "../utils/types";


export function CartaItem(props: ItemResponse){

    const { _id, name, price, photo } = props;
    
    return (
        <div>
            <tr className="content">
                <td hidden>{_id.toString()}</td>
                <td>{name}</td>
                <td>{price} €</td>
                <td><img alt={name} src={url+'/public/images/'+photo}></img></td>
            </tr>
        </div>
    )
}