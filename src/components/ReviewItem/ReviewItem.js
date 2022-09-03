import React from 'react';

const ReviewItem = (Props) => {
    const {name,quantity,key,price} = Props.product;
    const productItemStyle = {
        borderBottom:'2px solid lightgray',
        marginBottom: '10px',
        paddingBottom:'10px',
        marginLeft: '20px'
    }
    return (
        <div style={productItemStyle}>
            <h3 className='product-name'>{name}</h3>
            <h5>Quantity: {quantity}</h5>
            <p><small>${price}</small></p>
            <br />
            <button onClick={() => Props.removeItems(key)} className='main-button'>Remove</button>
        </div>
    );
};

export default ReviewItem;