import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/white.png';
import CartIcon from '../CartIcon/CartIcon';
import './NavBar.css';

export default function NavBar() {
    
    return (
        <nav id="navbar" className="navbar navbar-expand-sm navbar-dark bg-light shadow sticky-top">

            {/*Logo*/}

            <Link to="/">
                <div className="navbar-brand">
                    <img src={logo} alt="CHD" height="50px"/>
                </div>
            </Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>

            {/*Secciones*/}

            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown text-center">
                        <div className="nav-link dropdown-toggle" data-toggle="dropdown">Categorias</div>
                        <div className="dropdown-menu">
                            <Link to={`/categories/urbanas`}>
                                <div className="dropdown-item">Urbanas</div>
                            </Link>
                            <Link to={`/categories/skate`}>
                                <div className="dropdown-item">Skate</div>
                            </Link>
                            <Link to={`/categories/tennis`}>
                                <div className="dropdown-item">Tennis</div>
                            </Link>
                        </div>
                    </li>
                </ul>
                
                <CartIcon/>

            </div>
        </nav>
    )
}