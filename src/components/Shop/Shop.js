import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10)
    const [products,setProducts] = useState(first10);
    const [carts,setCart] = useState([])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find( product => product.key === existingKey);
            product.quantity = savedCart[existingKey]
            return product;
        })
        setCart(previousCart)
    },[])
    const handleAddProduct = (product) => {
        //console.log('add product',product)
        let count;
        const sameProduct = carts.find(pd => pd.key === product.key)
        
        if(sameProduct){
            product.quantity = product.quantity+1;
            const others = carts.filter(pd => pd.key !== product.key)
            const newCart = [...others,product];
            setCart(newCart);
            count = product.quantity
        }
        else{
            count = 1 
            product.quantity = count;
            const newCart = [...carts,product];
            setCart(newCart);
           
        }
        
        // const sameProduct = newCart.filter(pd => pd.key === product.key)
        // const count = sameProduct.length
        addToDatabaseCart(product.key,count)
    }

    return (
        <div className='div-container'>
            <div className="product-container">
                {
                products.map(product => <Product showAddToCart='true' product={product} key={product.key} handleAddProduct={handleAddProduct} ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart carts={carts}>
                    <Link to='/review'><button className='main-button'>Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;