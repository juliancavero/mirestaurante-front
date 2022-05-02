import './menuButton.css';

type ButtonContent = {
    content: string;
    url: string;
}

export function MenuButton(props: ButtonContent){

    function gotourl(){
        window.location.href = window.location.href + '/' + props.url;
    }

    return <button className='menuButton' onClick={gotourl}>{props.content}</button>
}