import React, { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import Spinner from '../Spinner/Spinner';
import {getFirestore} from '../../firebase';

// export const products = [
//     {id: 'as5d5e66wd', title: 'nike shoe', price: 15000, stock: 35, image: 'https://i.pinimg.com/originals/2e/09/f8/2e09f8b14c1dbf80e78fcc93359dbf20.png' },
//     {id: 'as5d5e63wd', title: 'sport shoe', price: 17000, stock: 32, image: 'https://images.nike.com/is/image/DotCom/924423_010_A?$AFI$&hei=1000&wid=1000' },
//     {id: 'as7d5e63wd', title: 'grey shoe', price: 14000, stock: 13, image: 'https://cdn.shopify.com/s/files/1/0064/1102/6535/products/EG7693_FTW_photo_side-lateral-center_transparent_2048x2048.png?v=1592325922' },
//     {id: 'as7d5e94wd', title: 'adidas shoe', price: 12000, stock: 37, image: 'https://www.pgatoursuperstore.com/dw/image/v2/BCFG_PRD/on/demandware.static/-/Sites-master-catalog-pgatss/default/dw77d9578c/Tennis/Tennis-Footwear/Mens-Tennis-Footwear/Adidas/2000000010891/FX5809_FTW_photo_side-lateral-center_transparent.png?sw=767&sh=767&sm=fit' },
//     {id: 'as7d5e93wd', title: 'colours shoe', price: 12000, stock: 33, image: 'https://images.footlocker.com/is/image/FLEU/314205620504_01?wid=763&hei=538&fmt=png-alpha' },
//     {id: 'as7d5e97wd', title: 'green shoe', price: 16000, stock: 17, image: 'https://cdn.vox-cdn.com/thumbor/iZYm4Bz7MAqb25UyD4dFxO9L2ZM=/0x0:2000x2000/1200x800/filters:focal(840x840:1160x1160)/cdn.vox-cdn.com/uploads/chorus_image/image/64780547/MSUMens.0.png' }
//   ]

export default function Home(props) {

    const [products, setProducts] = useState ([]);

    useEffect(() => {

      let mounted = true;

      const db = getFirestore();
      const itemCollection = db.collection("items");
  
      itemCollection.get().then( result => {
  
        if (result.size === 0) {
          console.log('No results!');
        } else {
          let items = result.docs.map (doc => {
            return {id: doc.id, ...doc.data()};
          });
          if (mounted) {
            setProducts(items);
          }
        }
  
      }).catch( error => {
        console.log("Error searching items", error);
      });
      console.log('products', products)
      return () => mounted = false;

    })


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
            <ItemList items={products}/>
        </div>
    )
}

