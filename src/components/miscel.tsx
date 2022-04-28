import { IntervalHistogram } from "perf_hooks";
import React, { Component } from "react";
import { ImportOrExportSpecifier } from "typescript";
import './miscel.css';

type ButtonContent = {
    content: string;
    url: string;
}

type Fecha = {
    fecha: Date;
}


export function MenuButton(props: ButtonContent){

    function gotourl(){
        window.location.href = window.location.href + '/' + props.url;
    }

    return <button className='menuButton' onClick={gotourl}>{props.content}</button>
}