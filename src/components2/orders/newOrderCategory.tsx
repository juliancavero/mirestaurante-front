import { useState } from "react"
import { OrderItem } from './orderItem';
import { Item, CategoriaType } from '../utils/types';
import { fadeInAnimation } from "../estilos";


type t10 = {
    setOrderCart: React.Dispatch<React.SetStateAction<Item[]>>;
    orderCart: Item[];
}

type Props = {
    cat: CategoriaType;
    passOrderCart: t10;
}

export function NewOrderCategory(props: Props) {

    const [expanded, setExpanded] = useState(false);

    function changeState () {
        if(expanded){
            setExpanded(false);
        } else {
            setExpanded(true);
        }
    }

    function renderItems(){
        return (
            <div className={"catItems " + fadeInAnimation}>
                {props.cat.items.map((item) =>
                    <OrderItem it={item} expFunc={props.passOrderCart}/>
                )}
            </div>
        )
    }

    return (
        <div id='newOrderCategory'>
            <button className="categoryButton btn-success" onClick={() => changeState()}><h1>{props.cat.name}</h1></button>
            {expanded ? renderItems() : null}
        </div>
    )
}