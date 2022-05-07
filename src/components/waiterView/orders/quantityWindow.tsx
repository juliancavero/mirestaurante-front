import React, { Dispatch, SetStateAction, useState } from "react";
import { DeleteButton } from "../../utils/DeleteButton";
import { ItemCart, ItemResponse } from "../../utils/types";
import './quantityWindow.css';

type QuantityWindowProps = {
    setItemQuantity: (quantity: number) => void;
    confirmationWindow: Dispatch<SetStateAction<boolean>>;
    setOrderCart: React.Dispatch<React.SetStateAction<ItemCart[]>>;
    orderCart: ItemCart[];
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    itemPassed: ItemResponse;
}

export function QuantityWindow({setItemQuantity, confirmationWindow, setOrderCart, orderCart, setActive, itemPassed}: QuantityWindowProps){

    const [ finalQuantity, setFinalQuantity ] = useState<number>(1);
    const [ rangeValue, setRangeValue ] = useState<string>();
    
    
    function closeWindow(){
        confirmationWindow(false);
    }


    function handleClick(){
        if(finalQuantity){
            setItemQuantity(finalQuantity);
            setActive(true);
            if(orderCart.filter(item => item.name === itemPassed.name).length > 0){
                setOrderCart(orderCart.filter(item => item.name !== itemPassed.name))
            } else {
                const newItem = {
                    name: itemPassed.name,
                    price: itemPassed.price,
                    photo: itemPassed.photo,
                    quantity: finalQuantity
                }
                setOrderCart([...orderCart, newItem])
            }
        }
        closeWindow();
    }

    function showRangeValue(event: React.FormEvent<HTMLInputElement>){
        setRangeValue(event.currentTarget.value);
    }

    return (
        <div className={'row col-md-4 p-3 popup-window '} >
                <div className="row">
                    <div className="row">
                        <h1 className="col-md-11 my-auto">¿Qué cantidad?</h1>
                        <DeleteButton assignedClass="col-md-1" showConfirmationWindow={closeWindow}/>
                    </div>
                    
                    <div className="row my-3">
                        <input
                            list="possibleQuantity"
                            defaultValue={1}
                            type='range'
                            min='0' max='10' step='0.5'
                            onChange={(event) => setFinalQuantity(parseFloat(event.target.value))}
                            onInput={(event) => showRangeValue(event)}
                        />
                    </div>
                    <div className="mb-3 d-flex justify-content-center"><button className="quantityButton">{rangeValue || finalQuantity}</button></div>
                    <div className="row d-flex justify-content-center">
                        <button onClick={handleClick} className="col-md-5" type={'button'}>Añadir item</button>
                    </div>
                </div>
        </div>
    )
}