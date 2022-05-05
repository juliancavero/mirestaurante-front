import { useState } from 'react';
import type { Item } from '../../utils/types';
import { ip } from '../../utils/fetchData';

type t10 = {
    setOrderCart: React.Dispatch<React.SetStateAction<Item[]>>;
    orderCart: Item[];
}

type props = {
    expFunc: t10;
    it: Item;
}

export function OrderItem (props: props) {

    const { setOrderCart, orderCart } = props.expFunc;
    const [active, setActive] = useState(false);
    
    function activeHandler(){
        if(active){
            setActive(false);
        } else {
            setActive(true);
        }
    }

    function addToCart(){
        const thisItem = {
            name: props.it.name,
            price: props.it.price,
            photo: props.it.photo
        }
        if(orderCart.find(it => it.name === props.it.name)){
            let cart = [...orderCart];
            setOrderCart(cart.filter(function(value, index, array){
                return value.name !== props.it.name;
            }))
        } else {
            setOrderCart([...orderCart, thisItem])
        }
    }
    

    return (
        <div onClick={function(event){activeHandler(); addToCart();}} className={'item'+ (active ? ' selected' : '')}>
            <img alt={props.it.name} src={ip+'/statics/'+props.it.photo}></img>
            <h3>{props.it.name} - {props.it.price}</h3>
        </div>
    )
}


