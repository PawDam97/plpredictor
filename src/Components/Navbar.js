import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../Images/logo white.png'
import { NavLink } from 'react-router-dom';
import '../Styles/Navbar.css';
const activeStyle = { color: "#000000" };
function SNavbar() {
    return (
        <div className="navbarr">
            <Navbar className="NavbarFully" collapseOnSelect expand="lg" variant="dark">
                <Navbar.Brand href="#home"><img className="logo" alt="img" src={logo} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <div className="NavOptions">
                        <Nav className="mr-auto">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown">
                                    <NavLink className="Historical" to="/Data/" activeClassName="nav-item nav-link active" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Poprzednie sezony</NavLink>
                                    <div className="zakladki">
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                            <NavLink className="dropdown-item" to="/Data/2020" activeStyle={activeStyle}>2019/2020</NavLink>
                                            <div className="dropdown-divider"></div>
                                            <NavLink className="dropdown-item" to="/Data/2019" activeStyle={activeStyle}>2018/2019</NavLink>
                                            <div className="dropdown-divider"></div>
                                            <NavLink className="dropdown-item" to="/Data/2018" activeStyle={activeStyle}>2017/2018</NavLink>
                                            <div className="dropdown-divider"></div>
                                            <NavLink className="dropdown-item" to="/Data/2017" activeStyle={activeStyle}>2016/2017</NavLink>
                                            <div className="dropdown-divider"></div>
                                            <NavLink className="dropdown-item" to="/Data/2016" activeStyle={activeStyle}>2015/2016</NavLink>
                                        </div>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <NavLink to="/ThisStats" activeClassName="nav-item nav-link active" className="Predict" >Obecny sezon</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to="/" activeClassName="nav-item nav-link active" className="Main" >Strona główna</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/MatchPredict" activeClassName="nav-item nav-link active" className="Predict" >Predykcja spotkania</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/QuePredict" activeClassName="nav-item nav-link active" className="PredictQue" >Następna kolejka</NavLink>
                                </li>
                            </ul>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div >
    )
}

export default SNavbar;