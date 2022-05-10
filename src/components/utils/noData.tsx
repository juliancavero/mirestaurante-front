import { useEffect, useState } from 'react';
import './noData.css';

type noDataPropsType = {
    str: string;
    happyGhost?: boolean;
}
export function NoData(props: noDataPropsType){

    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 3000);
    }, [])
    const imag = (
        <div className="row noDataContainer pt-3">
        <div className='row d-flex justify-content-center'><h1 className='noDataText col-6'>{props.str}</h1></div>
        { !props.happyGhost ? 
            <div className='row d-flex justify-content-center'><img className='noDataImg' alt='No data found... yet' src='/images/nodataghost.png'></img></div>
            : <div className='row d-flex justify-content-center'><img className='noDataImg' alt='No data found... yet' src='/images/nodatahappyghost.png'></img></div> }
        </div>
    )

    const loadingImage = (
        <div className='row d-flex justify-content-center pt-5'>
            <img className='noDataImg' src='/images/loading.gif' alt='loading...'></img>
        </div>
    )
    
    return (
        <div className='row noDataContainer pt-3'>
            { loading ? loadingImage: imag}
        </div>
    )
}