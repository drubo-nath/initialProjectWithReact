import React from 'react';


const Cart = (props) => {
    const carts = props.carts
    const total = carts.reduce((total,cart) => total + (cart.price*cart.quantity) , 0);
    const formateNumber = (num) => { const presision = num.toFixed(2); return Number(presision)}
    let shippingCost = 0;
    if(total>100){
        shippingCost = 7.99;
    }
    else if(total>0){
        shippingCost = 13.99;
    }
    const grandTotal = total+shippingCost+total/10;
   
    return (
        <div>
            <h3>Order Summary</h3>
            <p>Items Ordered: {carts.length}</p>
            <p>Product Price: {formateNumber(total)}</p>
            <p>Shipping Cost: {shippingCost}</p>
            <p>Tax + VAT: {formateNumber(total/10)}</p>
            <p>Total Price: {formateNumber(grandTotal)}</p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;

