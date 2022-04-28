import {  FormEvent, useEffect, useState } from "react";
import { genericFetch } from "../utils/fetchData";
import { NewItemType } from "../utils/types";

type props = {
    setVisibility: (val: boolean) =>  void;
}
export function NewItemWindow({setVisibility}: props){
    const { getCartaCategories, postNewItem, postNewItemPhoto } = genericFetch();

    const [ categories, setCategories ] = useState<string[]>();
    const [ itemPhoto, setItemPhoto ] = useState<File>();
    const [ itemCat, setItemCat ] = useState<string>();
    const [ itemName, setItemName ] = useState<string>();
    const [ itemPrice, setItemPrice ] = useState<number>();
    const [ itemPhotoUrl, setItemPhotoUrl ] = useState<string>();

    useEffect(() => {
        getCartaCategories().then(response => setCategories(response));
    }, [])


    function addFile(files: FileList | null) {
        if(files){
            setItemPhoto(files[0]);
            setItemPhotoUrl(files[0].name);
        }
    }
    
    function alert(message: string){
        window.alert(message);
    }
    
    function onSubmit(event: FormEvent){
        event.preventDefault();

        if(itemCat && itemName && itemPrice && itemPhotoUrl && itemPhoto){
            const itemBody: NewItemType = {
                name: itemCat,
                items: {
                    name: itemName,
                    price: itemPrice,
                    photo: itemPhotoUrl
                }
            }

            var formData = new FormData();
            formData.append("cartaItemPhoto", itemPhoto);
            postNewItemPhoto(formData).then(response => response.ok ? alert('Foto almacenada correctamente') : alert('Hubo un problema al subir la foto'));
            postNewItem(itemBody).then(response => response.ok ? alert(`Nuevo item ${itemBody.items.name} añadido a la carta`) : alert('Hubo un problema al subir el item a la carta'));
        } else {
            window.alert("Some data is missing! Item not created");
        }

        return true;
    }

    return (
        <div className="popup-window">
            <div id='firstRow'>
                <button className='closeButton' onClick={() => setVisibility(false)}>X</button>
            </div>
            <div id='secondRow'>
                <select defaultValue={categories ? categories[0] : ''} onChange={(event) => setItemCat(event.target.value)}>
                    {
                        categories?.map((category) => <option>{category}</option>)
                    }
                </select>
                <label htmlFor="nombrePlato">Nombre</label>
                <input onChange={(event) => setItemName(event.target.value)} id='nombrePlato' placeholder="Nombre del plato..."></input>
                <label htmlFor="precioPlato">Precio</label>
                <input onChange={(event) => setItemPrice(parseFloat(event.target.value))} id='precioPlato' type='number'></input>
                
                <form encType="multipart/form-data" action="" onSubmit={(event) => onSubmit(event)}>
                    <input onChange={(event) => addFile(event.target.files)} type="file"/>
                    <button type='submit' >Enviar foto</button>
                </form>
            </div>
        </div>
    )
}