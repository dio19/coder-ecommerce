import React, {useState, useEffect} from 'react';
import ItemDetail from '../ItemDetail/ItemDetail';
import Spinner from '../Spinner/Spinner';
import { useParams } from 'react-router-dom';
import { getFirestore } from '../../firebase';
import './ItemDetailContainer.css';

export default function ItemDetailContainer() {

    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState({});
    const [itemExist, setItemExist] = useState(true);

    useEffect(() => {

        const db = getFirestore();
        const collection = db.collection("items");
        const item = collection.doc(params.id);

        item.get().then( (doc) => {

            if (!doc.exists) {
                setItemExist(false);
            } else {
                setItem ({id: doc.id, ...doc.data()});
            }

        }).catch( (error) => {
            console.log(`Se produjo un error al obtener el item ${params.id}`, error)
        }).finally ( () => {
            setLoading(false);
        });
        
    }, [params]);

    return (
        <>
        { loading  ? <Spinner/> :
            <div id="itemDetailContainer" className="d-flex">
                { itemExist ? <ItemDetail item={item}/> : 
                <div id="itemError" className="d-flex flex-column card mx-auto align-self-center">
                    <div className="card-header"><h3 className="text-center">Error</h3></div>
                    <div className="card-body m-auto">{`No existe ningun item con el id ${params.id}`}</div>
                </div>
                }
            </div>
        }
        </>
    )

}