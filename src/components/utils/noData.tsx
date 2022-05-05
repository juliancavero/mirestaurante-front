import './noData.css';

type noDataPropsType = {
    str: string;
    happyGhost?: boolean;
}
export function NoData(props: noDataPropsType){

    return (
        <div className="row noDataContainer pt-3">
            <div className='row d-flex justify-content-center'><h1 className='noDataText col-6'>{props.str}</h1></div>
            { !props.happyGhost ? 
                <div className='row d-flex justify-content-center'><img className='noDataImg' alt='No data found... yet' src='/images/nodataghost.png'></img></div>
            : <div className='row d-flex justify-content-center'><img className='noDataImg' alt='No data found... yet' src='/images/nodatahappyghost.png'></img></div> }
        </div>
    )
}