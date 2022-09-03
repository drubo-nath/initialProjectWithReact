import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import image from '../../images/giphy.gif'
import { useNavigate } from 'react-router-dom';

const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlaced , setOrderPlace] = useState(false);
    const removeItems = (productKey) => {
        console.log('clicked',productKey)
            const newCart = cart.filter(pd => pd.key !== productKey);
            setCart(newCart);
            removeFromDatabaseCart(productKey);
    }
    const history = useNavigate()
    const handleProceedCheckout = () =>{
       history('/shipment')
    }
    useEffect(()=> {
        const savedCart = getDatabaseCart()
        
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts)
    },[])
    
    let thankyou;
    if(orderPlaced){
        thankyou = <img src={image} alt="" />
    }
    return (
        <div className='div-container'>
            <div className='product-container'>
                <h1 style={{textAlign:"center"}} >This is Review Section </h1>
                {
                    cart.map(product => <ReviewItem removeItems={removeItems} key={product.key} product={product}></ReviewItem>)
                }
                {thankyou}
            </div>
            <div className="cart-container">
                <Cart carts={cart}>
                    <button onClick={handleProceedCheckout} className='main-button'>Proceed Checkout</button>
                </Cart>
            </div>
        
        </div>
    );
};

export default Review;