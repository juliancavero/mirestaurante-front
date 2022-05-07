import { useState } from "react"
import { OrderItem } from './orderItem';
import { CategoriaType, ItemCart } from '../../utils/types';
import { fadeInAnimation } from "../../utils/estilos";

type props = {
    setOrderCart: React.Dispatch<React.SetStateAction<ItemCart[]>>;
    orderCart: ItemCart[];
    cat: CategoriaType
}

export function NewOrderCategory({setOrderCart, orderCart, cat}: props) {

    const [ expanded, setExpanded ] = useState(false);

    function changeState () {
        setExpanded(!expanded);
    }

    function renderItems(){
        return (
            <div className={"catItems " + fadeInAnimation}>
                {cat.items.map((item) =>
                    <OrderItem itemPassed={item} setOrderCart={setOrderCart} orderCart={orderCart}/>
                )}
            </div>
        )
    }

    return (
        <div id='newOrderCategory'>
            <button className="categoryButton btn-success" onClick={changeState}><h1>{cat.name}</h1></button>
            {expanded ? renderItems() : null}
        </div>
    )
}