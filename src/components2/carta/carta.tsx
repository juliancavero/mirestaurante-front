import { useEffect, useState } from "react";
import { genericFetch } from "../utils/fetchData";
import { CartaType } from "../utils/types";
import { CartaCategory } from "./cartaCategory";
import { NewItemWindow } from "./newItemWindow";


export function Carta(){
    const { getCartaData } = genericFetch();
    
    const [ carta, setCarta ] = useState<CartaType>([]);
    const [ newItemWindow, setNewItemWindow ] = useState(false);

    useEffect(() => {
        getCartaData().then(response => setCarta(response));
    }, []);

    return (
        <div className="cartaContainer">
            <button onClick={() => setNewItemWindow(true)}>Añadir Item</button>

            { newItemWindow ? <NewItemWindow setVisibility={setNewItemWindow} /> : null }

            <div id='carta'>
                <table>
                {
                    carta.map((category) => (
                        <CartaCategory name={category.name} items={category.items} />
                    ))
                }
                </table>
            </div>
        </div>
    )
}