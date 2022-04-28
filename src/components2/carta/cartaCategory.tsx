import { CategoriaType } from "../utils/types"
import { CartaItem } from "./cartaItem";



export function CartaCategory(props: CategoriaType){
    const { name, items } = props;

    return (
        <div>
            <th className="title" colSpan={3}>
                {name}
            </th>
            {
                items.map((item) => (
                    <CartaItem
                        _id={item._id}
                        name={item.name}
                        price={item.price}
                        photo={item.photo}
                    />
                ))
            }
        </div>
    )
}