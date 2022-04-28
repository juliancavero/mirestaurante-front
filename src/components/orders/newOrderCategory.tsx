import { useState } from "react"
import type { Categoria } from "../carta/carta";
import { OrderItem } from "./orderItem";
import './newOrderCategory.css';
import type {Item} from '../carta/carta'; 


type t10 = {
    setOrderCart: React.Dispatch<React.SetStateAction<Item[]>>;
    orderCart: Item[];
}

type Props = {
    cat: Categoria;
    expFunc: t10;
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
            <div className="catItems">
                {props.cat.items.map((item) =>
                    <OrderItem it={item} expFunc={props.expFunc}/>
                )}
            </div>
        )
    }

    return (
        <div id='newOrderCategory'>
            <button className="categoryButton" onClick={() => changeState()}><h1>{props.cat.nombre}</h1></button>
            {expanded ? renderItems() : null}
        </div>
    )
}