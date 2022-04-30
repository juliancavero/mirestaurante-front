import {  FormEvent, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { genericFetch } from "../utils/fetchData";
import './carta.css';


type props = {
    setVisibility: (val: boolean) =>  void;
}
export function NewCategoryWindow({setVisibility}: props){
    const { getCartaCategories, postNewCategory } = genericFetch();
    
    const [ categories, setCategories ] = useState<string[]>();
    const [ newCategoryName, setNewCategoryName ] = useState<string>();

    useEffect(() => {
        getCartaCategories().then(response => setCategories(response));
    }, [])
    
    function checkEmptyData(){
        if(!newCategoryName) {
            window.alert('Category cannot be empty!')
            return false;
        }
        return true;
    }

    function onSubmit(event: FormEvent){
        event.preventDefault();

        if(!checkEmptyData()) return;

        if(newCategoryName){
            const itemBody = {
                name: newCategoryName
            }
            postNewCategory(itemBody).then(response => {
                (response.ok) ? 
                window.alert('Categoría creada correctamente') :
                window.alert('Algo falló en la creación de la categoría');
                window.location.reload();
            })            
        }
    }

    return (
        <div className="popup-window">
            <div className="row" id='firstRow'>
                <h1 className="col-lg-9 m-auto">Crear nueva categoría en Carta</h1>
                <button className='col-lg-1 ms-auto closeButton' id='catPlato' onClick={() => setVisibility(false)}>X</button>
            </div>

            <div className="row">
                <div className="col-md-8 m-auto">
                <table className="table">
                    <tr><th>Categorías existentes actualmente</th></tr>
                    {
                        categories?.map((cat) => <tr className="row fila"><td className="col-lg-8 m-auto">{cat}</td></tr>)
                    }
                </table>
                </div>
                
            </div>
            
            <div className="row mt-4 m-3" id='thirdRow'>
                <form action="" onSubmit={(event) => onSubmit(event)}>
                    <input className="col-lg-6"  onChange={(event) => setNewCategoryName(event.target.value)} type='text' />
                    <button className="col-lg-6" type='submit' >Crear nueva categoría</button>
                </form>
            </div>
        </div>
    )
}