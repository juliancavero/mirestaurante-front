/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { genericFetch } from "../utils/fetchData";
import { CartaType } from "../utils/types";
import { CartaCategory } from "./cartaCategory";
import { NewItemWindow } from "./newItemWindow";
import Table from 'react-bootstrap/Table';
import { NewCategoryWindow } from "./newCategoryWindow";

export function Carta(){
    const { getCartaData } = genericFetch();
    
    const [ carta, setCarta ] = useState<CartaType>([]);
    const [ newItemWindow, setNewItemWindow ] = useState(false);
    const [ newCategoryWindow, setNewCategoryWindow ] = useState(false);

    useEffect(() => {
        getCartaData().then(response => setCarta(response));
    }, []);

    return (
        <div className="cartaContainer">
            <button id='addNewItem' className='modifyCartaButton' onClick={() => setNewItemWindow(true)}>Añadir Item</button>
            <button id='addNewCategory' className='modifyCartaButton' onClick={() => setNewCategoryWindow(true)}>Añadir Categoría</button>

            { newItemWindow ? <NewItemWindow setVisibility={setNewItemWindow} /> : null }
            { newCategoryWindow ? <NewCategoryWindow setVisibility={setNewCategoryWindow} /> : null }

            <div className="container" id='carta'>
                <Table id='tablaCarta' responsive>
                {
                    carta.map((category) => (
                        <CartaCategory name={category.name} items={category.items} />
                    ))
                }
                </Table>
            </div>
        </div>
    )
}