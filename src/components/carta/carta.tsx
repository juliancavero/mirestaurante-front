
import React, { useEffect, useState } from "react";
import { genericFetch } from "../miscelaneous/fetchData";
import './carta.css';
import { CartaCategory } from "./cartaCategory";
import { NewCartaItemWindow } from "./newCartaItemWindow";

export type CartaType = Categoria[];

export type Categoria = {
    name: string;
    items: Item[];
}
export type InsertNewItemType = {
    nombre: string;
    items: ItemSendType;
}
export type Item = {
    name: string;
    price: number;
    photo: string;
}

export type ItemSendType = {
    name: string;
    price: number;
    photo: string;
}

export function Carta () {
    const {getCartaData} =  genericFetch();
    const [newItemVisible, setNewItemVisible] = useState(false);
    const [carta, setCarta] = useState<CartaType>([]);

    useEffect(() => {
        /* fetch('http://192.168.0.20:3099/carta')
        .then(response => response.json())
        .then(response => {
            setCarta(response);
        }) */
       getCartaData().then(response => setCarta(response));
    }, []);

    
    return(
        <div className="cartaContainer">
            <button onClick={() => setNewItemVisible(true)}>
                Añadir Item
            </button>
            {newItemVisible ? <NewCartaItemWindow setNewItemVisible={setNewItemVisible} /> : null}
            <div className="carta">
                <table>
                    {
                        carta.map((category) => 
                            <CartaCategory cat={category} />
                        )
                    }
                </table>
            </div>
        </div>
    )
}