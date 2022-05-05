/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { genericFetch } from "../../utils/fetchData";
import { CartaType } from "../../utils/types";
import { CartaCategory } from "./cartaCategory";
import Table from 'react-bootstrap/Table';
import { NoData } from "../../utils/noData";

export function Carta(){
    const { getCartaData } = genericFetch();
    
    const [ carta, setCarta ] = useState<CartaType>([]);

    useEffect(() => {
        getCartaData().then(response => setCarta(response));
    }, []);

    return (
        <div className="cartaContainer">

            { carta.length > 0 ? 
                <div className="container" id='carta'>
                    <Table id='tablaCarta' responsive>
                    {
                        carta.map((category) => (
                            <CartaCategory name={category.name} items={category.items} />
                        ))
                    }
                    </Table>
                </div>
            : <NoData str="Aún no hay datos en la carta... Contacta con un Manager para solucionar este problema." />}
            
        </div>
    )
}