import React, { Component } from 'react'

import { FaGripLines } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import {Link} from 'react-router-dom'
import './css/Header.css'
import {DataContext} from './Context'



export class Header extends Component {
    static contextType = DataContext;

    state = {
        toggle: false
    }

    menuToggle = () =>{
        this.setState({toggle: !this.state.toggle})
    }


    render() {
        const {toggle} = this.state;
        const {cart} = this.context;
        return (
            <header>
                <div className="menu" onClick={this.menuToggle}>
                <FaGripLines style={{color: 'black', fontSize: '30px'}}/>
                </div>
                <div className="logo">
                    <h1><Link to="/">SHOESTORE</Link></h1>
                </div>
                <nav>
                    <ul className={toggle ? "toggle" : ""}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/product">Product</Link></li>
                   <li><Link to="/contact"></Link></li>
                        <li><Link to="/about"></Link></li>
                        <li><Link to="/login"></Link></li>
                        <li className="close" onClick={this.menuToggle}>
                        <FaRegWindowClose style={{color: 'black', fontSize: '20px'}}/>
                        </li>
                    </ul>
                    <div className="nav-cart">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                        <FaShoppingCart style={{color: 'black', fontSize: '30px' , margin: '3px'}}/>
                        </Link>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header
