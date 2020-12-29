import React, { useEffect, useState }from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore } from '../../firebase';
import ItemList from '../ItemList/ItemList';
import Spinner from '../Spinner/Spinner';

export default function Category() {

    const params = useParams();
    const [products, setProducts] = useState ([]);
    const [loading, setLoading] = useState (true);

    useEffect(() => {

        setLoading(true);
        const db = getFirestore();
        const categoryItems = db.collection("items").where("categoryId", "==", params.categoryId);

        categoryItems.get().then( (result) => {

            if (result.size === 0) {
                console.log('No results!');
              } else {
                let items = result.docs.map (doc => {
                  return {id: doc.id, ...doc.data()};
                });
                setProducts(items);
              }

        }).catch( (error) => {
            console.log(`Se produjo un error al obtener los items de la categoria "${params.categoryId}"`, error)
        }).finally ( () => {
            setLoading(false);
        });
        
    }, [params]);

    if (loading) {
        return (
            <Spinner/>
        );
    }

    return (
        <div id="home">
            <div className="d-flex flex-column justify-content-center">
                <div id="welcomeMessage" className="p-3 welcomeCard rounded shadow m-4">
                    <h2>
                        {params.categoryId.charAt(0).toUpperCase().concat(params.categoryId.substring(1))}
                    </h2>
                </div>
            </div>
            <div>
                <ItemList items={products}/>
            </div>
        </div>
    )
}

