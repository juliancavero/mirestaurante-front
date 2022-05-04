import { Link } from "react-router-dom";
import './homeMenu.css';

export function HomeMenu(){

    return (
       <div className="container mainMenu">
                <div className="row">
                    <Link className='link' to='/camarero'><button type='button' className="my-3 btn btn-lg boss container"><h1>Menú de camarero</h1></button></Link>
                </div>
                <div className="row">
                    <Link className='link' to='/manager'><button type='button' className="my-3 btn btn-lg boss container"><h1>Menú de manager</h1></button></Link>
                </div>
                <div className="row">
                    <Link className='link' to='/boss'><button type='button' className="my-3 btn btn-lg boss container"><h1>Menú de jefe</h1></button></Link>
                </div>
        </div>
    )
}