/* eslint-disable react-hooks/exhaustive-deps */
import {  FormEvent, useEffect, useState } from "react";
import { genericFetch } from "../utils/fetchData";
import { NewItemType } from "../utils/types";
import './carta.css';

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
    
    function checkEmptyData(){
        if(!itemCat) {
            window.alert('Category not selected')
            return false;
        }
        if(!itemName) {
            window.alert('Name not selected')
            return false;
        }
        if(!itemPrice) {
            window.alert('Price not selected')
            return false;
        }
        if(!itemPhotoUrl) {
            window.alert('Something went wrong with the photo')
            return false;
        }
        if(!itemPhoto) {
            window.alert('Missing photo')
            return false;
        }
        return true;
    }
    function onSubmit(event: FormEvent){
        event.preventDefault();

        if(!checkEmptyData()) return;

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
            postNewItemPhoto(formData).then(response => {
                postNewItem(itemBody).then(response => {
                    window.alert('Artículo creado correctamente')
                    window.location.reload();
                })
            });
            
        }
    }

    return (
        <div className="popup-window">
            <div className="row" id='firstRow'>
                <h1 className="col-lg-9 m-auto">Insertar nuevo item en Carta</h1>
                <button className='col-sm-1 ms-auto closeButton' id='catPlato' onClick={() => setVisibility(false)}>X</button>
            </div>
            <div className="row" id='secondRow'>
                <label className="col-lg-4" htmlFor="catPlato">Categoría</label>
                <select className="col-lg-8" onChange={(event) => setItemCat(event.target.value)}>
                    <option></option>
                    {
                        categories?.map((category) => <option>{category}</option>)
                    }
                </select>
            </div>
            <div className="row m-3">
                <label className="col-lg-2" htmlFor="nombrePlato">Nombre</label>
                <input className="col-lg-4" onChange={(event) => setItemName(event.target.value)} id='nombrePlato' placeholder="Nombre del plato..."></input>
                <label className="col-lg-2" htmlFor="precioPlato">Precio</label>
                <input className="col-lg-4" onChange={(event) => setItemPrice(parseFloat(event.target.value))} id='precioPlato' type='number'></input>
            </div>
            <div className="row mt-4 m-3" id='thirdRow'>
                <form encType="multipart/form-data" action="" onSubmit={(event) => onSubmit(event)}>
                    <input className="col-lg-6"  onChange={(event) => addFile(event.target.files)} type="file"/>
                    <button className="col-lg-6" type='submit' >Subir Item</button>
                </form>
            </div>
        </div>
    )
}