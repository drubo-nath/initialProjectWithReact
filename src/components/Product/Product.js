import React from 'react';
import { Link } from 'react-router-dom';
import './product.css'

const Product = (props) => {
    const {img,name,price,seller,stock,key} = props.product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className="product-inside">
                <h4 className="product-name"><Link to={'/product/'+key}>{name}</Link></h4>
                <br />
                <small>by: {seller}</small>
                <br />
                <p> Price : ${price}</p>
                <p>Only {stock} left in stock - Order Soon</p>
                { props.showAddToCart==='true' && <button
                    className="main-button"
                    onClick={() => {props.handleAddProduct(props.product)}}>
                    Add to the Cart
                </button>}

            </div>
        </div>
    );
};

export default Product;