import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css'


const Header = () => {
    const [loggedInUser , setLoggedInUser] = useContext(userContext)
    return (
        <div className='header'>
            <img src={logo} alt="" />
            <nav>
                <Link className='link' to="/shop">Shop</Link>
                <Link className='link' to="/review">Review Order</Link>
                <Link className='link' to="/manage">Managing Directory</Link> 
                <button onClick={() => setLoggedInUser({})}>Sign Out</button>   
            </nav>
        </div>
    );
};

export default Header;