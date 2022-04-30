import type { Categoria } from './carta';
import { CartaItem } from './cartaItem';

type props = {
    cat: Categoria;
}

export function CartaCategory (props: props) {
    
    return (
        <div>
            <th className='title' colSpan={3}>
                {props.cat.name}
            </th>
            {props.cat.items.map((item) => 
                <CartaItem it={item}/>
            )}
        </div>
    )
}