import React from 'react';
import Item from '../Item/Item';
import {Link} from 'react-router-dom';

export default function ItemList(props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'flexStart', flexWrap: 'wrap', margin: 15 }}>
            {props.items.map ((item) => 
                <Link to={`/item/${item.id}`} key={item.id}>
                    <Item item={item}></Item>
                </Link>)}
        </div>
    )
}