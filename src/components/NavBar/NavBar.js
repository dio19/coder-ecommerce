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
                            <Link to={`/categories/camisas`}>
                                <div className="dropdown-item">Camisas</div>
                            </Link>
                            <Link to={`/categories/camperas`}>
                                <div className="dropdown-item">Camperas</div>
                            </Link>
                            <Link to={`/categories/jeans`}>
                                <div className="dropdown-item">Jeans</div>
                            </Link>
                        </div>
                    </li>
                </ul>
                
                <CartIcon/>

            </div>
        </nav>
    )
}