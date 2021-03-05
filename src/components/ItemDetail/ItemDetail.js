import React, {useState, useContext} from 'react';
import ItemCount from '../ItemCount/ItemCount';
import Button from '../Button/Button';
import {CartContext} from '../../context/CartContext';
import './ItemDetail.css';

export default function ItemDetail({item}) {

    const [counter, setCounter] = useState(1);
    const {cart, addToCart} = useContext(CartContext);

    const agregarAlCarrito = () => {
        addToCart (item, counter);
    }
    const comprar = () => {
        addToCart (item, counter);
    }
    const handleUpdate = (count) => {
        setCounter(count);
    }

    const cartCount = () => {
        let cant = 0;
        let itemIdx = cart.findIndex(cartItem => cartItem.prod.id === item.id);
        if (itemIdx !== -1) {
            cant = cart[itemIdx].cant;
        }
        return cant;
    }
    if (item) {
        return (
            <div id="productInfo" className="m-4">
                <div className=" d-flex flex-wrap justify-content-center">
                    
                    <div className="d-flex justify-content-center flex-grow-1 p-4">
                        <img src={item.image} alt="" className="adaptVW productImage p-3"/>
                    </div>

                    <div className="adaptVW d-flex flex-column flex-grow-1 m-4 pr-lg-4 align-items-center justify-content-center productDetail">
                        <h4>
                            {(item.title).toUpperCase()}
                        </h4>
                        <h3 className="productDetail">
                            ${item.price}
                        </h3>
                        <div className="adaptVW buyingActions p-4">
                            {item.stock - cartCount() === 0 ? <div>Producto sin Stock</div> :
                            <>
                                <ItemCount initial="1" min="1" max={item.stock - cartCount()} onAdd={agregarAlCarrito} onUpdate={handleUpdate}/>
                                <div className="mt-3 shadow">
                                    <Button label={`Agregar al carrito ${counter}`} action={comprar} outlined/>
                                </div>
                            </>
                            }
                        </div>
                    </div>
                </div>
                <div id="productDescription" className="pt-5 m-5">
                    {item.description}
                </div>
            </div>
        )
    }

    return <></>
    
}
