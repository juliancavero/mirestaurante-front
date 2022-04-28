import type { Item } from "./carta"
import { url } from '../miscelaneous/fetchData';
type props = {
    it: Item;
}

export function CartaItem (props: props) {

    return (
       <tr className="content">
           <td>{props.it.name}</td>
           <td>{props.it.price}</td>
           <td><img alt={props.it.name} src={url+'/public/images/'+props.it.photo} /></td>
       </tr>
    )
}