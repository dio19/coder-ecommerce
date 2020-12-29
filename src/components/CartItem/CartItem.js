import React from 'react';
import './CartItem.css';

export default function CartItem({item}) {
        return (
            <div id={item.prod.id} className="d-flex cartItem rounded mb-2">
                <img src={item.prod.image} alt="" className="rounded my-auto py-2" style={{height: '100px'}}/>
                <div className="d-flex flex-column flex-grow-1 p-3 justify-content-center">
                    <span className="productName">{item.prod.title}</span>
                    <span className="productPrice">${item.prod.price}</span>
                </div>
                <div className="d-flex flex-column p-3 justify-content-center">
                    <span className="productCount pr-3">x{item.cant}</span>
                </div>
            </div>
        )
}
