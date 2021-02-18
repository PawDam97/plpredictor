import React from 'react'
import '../Styles/Navbar.css';
import '../Styles/Main.css';
function Footer() {
    return (

        <div className="Footere">

            <div className="row">
                <div className="col">
                    <div className="stopkatekst">
                        Design i wykonanie: <br />
                    Paweł Damrath
                    </div>

                </div>
                <div className="stopkakontakt">
                    <a href="/Contact" activeClassName="nav-item nav-link active" className="Contact" >Kontakt</a>
                </div>
            </div>

        </div>

    )
}

export default Footer;