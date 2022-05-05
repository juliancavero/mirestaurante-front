/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { genericFetch } from "../../utils/fetchData";
import { CartaType } from "../../utils/types";
import { CartaCategory } from "./cartaCategory";
import { NewItemWindow } from "./newItemWindow";
import Table from 'react-bootstrap/Table';
import { NewCategoryWindow } from "./newCategoryWindow";
import { NoData } from "../../utils/noData";

export function Carta(){
    const { getCartaData } = genericFetch();
    
    const [ carta, setCarta ] = useState<CartaType>([]);
    const [ newItemWindow, setNewItemWindow ] = useState(false);
    const [ newCategoryWindow, setNewCategoryWindow ] = useState(false);
    const [ showEditOptions, setShowEditOptions ] = useState(false);
    const [ showDeleteOptions, setShowDeleteOptions ] = useState(false);
    useEffect(() => {
        getCartaData().then(response => setCarta(response));
    }, []);

    function showEditMenu(){
        setShowEditOptions(!showEditOptions);
        setShowDeleteOptions(!showDeleteOptions);
    }
    return (
        <div className="cartaContainer">
            <div className="container" id='carta'>
                <div className="d-flex justify-content-end align-items-center">
                    <h1 className="me-3">Editar Carta</h1><button className="" onClick={showEditMenu}><img className="smallImg" src="/images/edit.png" alt="Edit icon"></img></button>
                </div>
                { showEditOptions ? 
                    <div>
                        <button id='addNewItem' className='modifyCartaButton' onClick={() => setNewItemWindow(true)}>Añadir Item</button>
                        <button id='addNewCategory' className='modifyCartaButton' onClick={() => setNewCategoryWindow(true)}>Añadir Categoría</button>

                        { newItemWindow ? <NewItemWindow setVisibility={setNewItemWindow} /> : null }
                        { newCategoryWindow ? <NewCategoryWindow setVisibility={setNewCategoryWindow} /> : null }
                    </div>
                : null}
                { carta.length > 0 ? 
                    
                        <Table id='tablaCarta' responsive>
                        {
                            carta.map((category) => (
                                <CartaCategory name={category.name} items={category.items} showDeleteOptions={showDeleteOptions} />
                            ))
                        }
                        </Table>
                    
                : <NoData str="Aún no hay datos en la carta... Contacta con un Manager para solucionar este problema." />}
            </div>
        </div>
    )
}