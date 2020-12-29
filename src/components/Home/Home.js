import React, { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import Spinner from '../Spinner/Spinner';
import {getFirestore} from '../../firebase';

export default function Home(props) {

    //const [products, setProducts] = useState ([]);
    const products = [
      {id: 'as5d5e66wd', title: 'nike shoe', price: 15000, image: 'https://i.pinimg.com/originals/2e/09/f8/2e09f8b14c1dbf80e78fcc93359dbf20.png' },
      {id: 'as5d5e63wd', title: 'sport shoe', price: 17000, image: 'https://images.nike.com/is/image/DotCom/924423_010_A?$AFI$&hei=1000&wid=1000' },
      {id: 'as7d5e63wd', title: 'grey shoe', price: 14000, image: 'https://cdn.shopify.com/s/files/1/0064/1102/6535/products/EG7693_FTW_photo_side-lateral-center_transparent_2048x2048.png?v=1592325922' },
      {id: 'as7d5e93wd', title: 'colours shoe', price: 12000, image: 'https://fitanu.com/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/t/m/tmp181236.jpg' },
    ]
    // useEffect(() => {

    //   let mounted = true;

    //   const db = getFirestore();
    //   const itemCollection = db.collection("items");
  
    //   itemCollection.get().then( result => {
  
    //     if (result.size === 0) {
    //       console.log('No results!');
    //     } else {
    //       let items = result.docs.map (doc => {
    //         return {id: doc.id, ...doc.data()};
    //       });
    //       if (mounted) {
    //         setProducts(items);
    //       }
    //     }
  
    //   }).catch( error => {
    //     console.log("Error searching items", error);
    //   });
    //   console.log('products', products)
    //   return () => mounted = false;

    // })


    if (products.length === 0) {
        return (
            <Spinner/>
        );
    }

    return (
        <div id="home">
            <div className="d-flex flex-column justify-content-center">
            <div class="alert alert-primary alert-dismissible fade show" role="alert">
            <strong>Hola!</strong> {props.greeting}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            </div>
            <div>
                <ItemList items={products}/>
            </div>
        </div>
    )
}
