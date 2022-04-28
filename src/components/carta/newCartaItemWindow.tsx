import React, { FormEvent, useEffect, useState } from "react";
import { genericFetch } from "../miscelaneous/fetchData";
import type { InsertNewItemType } from "../carta/carta";
import './window.css';


export function NewCartaItemWindow ({setNewItemVisible}: any) {
    const {getCartaCategories, postNewItem, postNewItemPhoto} = genericFetch();

    const [categories, setCategories] = useState<string[]>([]);
    const [itemCat, setItemCat] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState(0);
    const [itemPhoto, setItemPhoto] = useState<File>();
    const [itemPhotoURL, setItemPhotoURL] = useState<string>('');

    useEffect(() => {
        /* fetch('http://0.0.0.0:3099/cartaCategories')
        .then(result => result.json())
        .then(result => {
            setCategories(result);
        }); */

       getCartaCategories().then(response => setCategories(response))
    }, []);

    useEffect(() => {
        
    }, [itemPhoto]);

    function closeWindow(){
        setNewItemVisible(false);
    }

    
    function onSubmit(event: FormEvent){
        event.preventDefault();
        if(itemPhoto){
            const newItemBody: InsertNewItemType = {
                nombre: itemCat,
                items: {
                    name: itemName,
                    price: itemPrice,
                    photo: itemPhotoURL
                }
            }
            var formData = new FormData();
            formData.append("cartaItem", itemPhoto);
            console.log(itemPhoto);
            /* fetch(`http://192.168.1.56:3099/cartaItemPhoto`, {
                method: 'POST',
                body: formData
            }) */
            postNewItemPhoto(formData).then(response => console.log(response));
            postNewItem(newItemBody).then(response => console.log(response));
        }
    }

    function addFile(event: React.ChangeEvent<HTMLInputElement>) {
        if(event.target.files){
            setItemPhoto(event.target.files[0]);
            setItemPhotoURL(event.target.files[0].name);
        }
        
    }
    

    // POR HACER - SUBIR FOTOS DE ARTÍCULOS
    

    return (
       <div className="popup-window">
            <div id='firstRow'>
                <button className='closeButton' onClick={closeWindow}>X</button>
            </div>
            <div id='secondRow'>
                <select onChange={(event) => setItemCat(event.target.value)} id='categoriaPlato'>
                    {
                        categories.map((cat) => <option>{cat}</option>)
                    }
                </select>
                <label htmlFor="nombrePlato">Nombre</label>
                <input onChange={(event) => setItemName(event.target.value)} id='nombrePlato' placeholder="Nombre del plato..."></input>
                <label htmlFor="precioPlato">Precio</label>
                <input onChange={(event) => setItemPrice(parseFloat(event.target.value))} id='precioPlato' type='number'></input>
                
                <form encType="multipart/form-data" action="" onSubmit={(event) => onSubmit(event)}>
                    <input id="id-for-upload-file" onChange={(event) => addFile(event)} type="file"/>
                    <button type='submit' >Enviar foto</button>
                </form>


            </div>
        </div>
    )
}