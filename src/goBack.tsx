import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackArrow } from './backArrow.svg';

export function GoBack(){
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate(-1)}><BackArrow /></button>
        </div>
    )
}