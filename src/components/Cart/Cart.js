import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {getFirestore} from '../../firebase';
import * as firebase from 'firebase/app';

import {CartContext} from '../../context/CartContext';
import CartItem from '../CartItem/CartItem';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Spinner from '../Spinner/Spinner';
import Modal from '../Modal/Modal';

import './Cart.css';

export default function Cart() {

    const {cart, cartLength, cartPrice, dropCart} = useContext(CartContext);
    const [formData, setFormData] = useState({name:'', lastname:'', phone: '', email: '', emailConfirm: ''});
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({title: '', body: ''});

    const validateFormFieldsSize = () => {

        for (let prop in formData){
            if (formData[prop].length === 0) {
                return false;
            }
        }

        return true;

    }

    const validateEmail = () => {

        if (formData.email !== formData.emailConfirm) {
            return false;
        }

        return true;

    }

    const updateStock = ( boughtProducts ) => {

        const db = getFirestore();
        const batch = db.batch();
        let itemRef;

        for (let prod of boughtProducts) {
            itemRef = db.collection("items").doc(prod.id);
            batch.update (itemRef, {
                stock: firebase.firestore.FieldValue.increment(-prod.cant)
            });
        }

        return batch.commit();
    }

    const confirmarCompra = () => {

        if (!validateEmail()) {
            setModal({title: 'Verifica los datos del formulario:', body: 'Los emails ingresados no coinciden'});
            document.getElementById('cartModalTrigger').click();
            return;
        }

        setLoading (true);

        const db = getFirestore();
        const orders = db.collection("orders");

        let newOrder = {
            buyer: {
                name: formData.name,
                lastname: formData.lastname,
                phone: Number(formData.phone),
                email: formData.email
            },
            items: cart.map (
                item => {return {
                    cant: item.cant,
                    id: item.prod.id,
                    price: item.prod.price,
                    title: item.prod.title
                }}
            ),
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            total: cartPrice(),
            status: "generada"
        }

        updateStock(newOrder.items).then(() => {
            console.log ("El stock se actualizo correctamente");
            return orders.add(newOrder);
        }).then( newDoc => {
            setModal({title: 'Gracias por tu compra', body: `El ID de tu Orden es ${newDoc.id}`});
        }).catch (error => {
            console.log("Hubo un error al generar la orden o actualizar el stock", error);
        }).finally (()=> {
            setFormData({name:'', lastname:'', phone: '', email: '', emailConfirm: ''});
            dropCart();
            setLoading (false);
            document.getElementById('cartModalTrigger').click();
        });

    }

    const updateState = (event) => {
        let newValue = event.target.value;
        switch (event.target.id) {
            case 'nameInput':
                setFormData ( prevData => ({...prevData, name: newValue}));
                break;
            case 'lastnameInput':
                setFormData ( prevData => ({...prevData, lastname: newValue}));
                break;
            case 'phoneInput':
                setFormData ( prevData => ({...prevData, phone: newValue}));
                break;
            case 'emailInput':
                setFormData ( prevData => ({...prevData, email: newValue}));
                break;
            case 'emailConfirmInput':
                setFormData ( prevData => ({...prevData, emailConfirm: newValue}));
                break;
            default:
                console.log ('There\'s not a handler for the provided input');
        }
    }

    return (
            <div className="d-flex flex-column justify-content-center align-content-center m-4">

                {loading ? <Spinner/> :

                    <>

                    <Modal id="cartModal" triggerId="cartModalTrigger" title={modal.title} body={modal.body}/>

                    <div id="cartHeader" className="p-3 welcomeCard rounded shadow flex-grow-1">
                    <h2>Carrito de Compras</h2>
                    </div>

                    {cartLength() > 0 ? 
                    <div className="d-flex flex-wrap justify-content-center">
                    <div className="d-flex flex-column flex-grow-1 mx-2 my-4">
                        {cart.map ((item) => 
                            <CartItem item={item} key={item.prod.id}></CartItem>
                        )}
                        <div id="total" className="welcomeCard d-flex rounded p-3 mt-auto">
                            <div className="">TOTAL</div>
                            <div className="d-flex flex-column ml-auto">
                                <span className="productCount">${cartPrice()}</span>
                            </div>
                        </div>
                    </div>
                    <div id="checkout" className="align-self-center d-flex flex-column flex-grow-1 mx-2 my-4 p-4">
                        <h5 className="align-self-center">CHECKOUT</h5>
                        <div id="checkoutForm" className="pt-4 my-3">
                            <Input type="text" label="Nombre:" id="nameInput" data={formData.name} changeAction={updateState}></Input>
                            <Input type="text" label="Apellido:" id="lastnameInput" data={formData.lastname} changeAction={updateState}></Input>
                            <Input type="number" label="Telefono:" id="phoneInput" data={formData.phone} changeAction={updateState}></Input>
                            <Input type="email" label="Email:" id="emailInput" data={formData.email} changeAction={updateState}></Input>
                            <Input type="email" label="Repite tu Email:" id="emailConfirmInput" data={formData.emailConfirm} changeAction={updateState}></Input>
                        </div>
                            <Button label="Realizar Compra" action={confirmarCompra} disabled={!validateFormFieldsSize()}/>
                    </div>
                    </div>
                    :

                    <div id="emptyCartMsg" className="mt-5 d-flex flex-column card mx-auto align-self-center">
                        <div className="card-header"><h4 className="text-center">Tu carrito esta vacio</h4></div>
                        <div className="card-body m-auto">
                            <Link to="/">
                                <Button label="Elegi tu estilo"></Button>
                            </Link>
                        </div>
                    </div>
                    
                    }
                    </>

                }


            </div>        
    )
}
