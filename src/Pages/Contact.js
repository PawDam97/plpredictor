import React, { Component } from "react";
import '../Styles/Contact.css';
import Wrapper from '../Config/Wrapper';
import Footer from '../Components/Footer';
import react from '../Images/react.png';
import mysql from '../Images/mysql.png';
import nodejs from '../Images/nodejs.png';
import axios from "axios";

class MatchPredict extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            feedback: '',
            to_address: 'plpredictor.service@gmail.com',
            subject: 'Zgloszenie ze strony'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.name = this.name.bind(this);
        this.email = this.email.bind(this);
        this.feedback = this.feedback.bind(this);
    }

    name(event) {
        this.setState({ name: event.target.value })
    }
    email(event) {
        this.setState({ email: event.target.value })
    }
    feedback(event) {
        this.setState({ feedback: event.target.value })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {
            to_address: this.state.to_address,
            subject: 'Zgloszenie plpredictor - ' + this.state.name,
            body: this.state.feedback + ".  Email nadawcy:  " + this.state.email,
        };
        axios.post(`http://localhost:8080/send`, data)
            .then((Result) => {
                alert('Wiadomość wysłana pomyślnie')
                window.location.replace("http://localhost:3000/Contact");
            })
    }
    render() {

        return (
            <Wrapper>
                <div className="Maine">
                    <div class="container">
                        <div className="tytulcontact">
                            Masz pytania? <br />
                        Skontaktuj się z nami!
                        </div>
                        <div class="row">
                            <div class="col">
                                <div className="formularz">
                                    <form onSubmit={this.handleSubmit}>
                                        <input name="name" onChange={this.name} type="text" className="feedback-input" placeholder="Imie" title="Podaj swoje imie lub nick" required />
                                        <input name="email" onChange={this.email} type="text" pattern="[A-Za-z0-9-.,]{2,}@[A-Za-z0-9-]{2,}[.]{1}[a-zA-Z]{2,}" className="feedback-input" title="Podaj swój adres email" placeholder="Email" required />
                                        <textarea onChange={this.feedback} name="text" className="feedback-input" placeholder="Twoja wiadomość" title="Wpisz wiadomość" required></textarea>
                                        <input type="submit" value="Wyślij" />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="tytulcontact">
                            Strona wykonana w oparciu o technologie:
                        </div>
                        <div class="row">
                            <div class="col">
                                <img className="Ikonacontact" alt="img" src={react} /><br />
                                <div className="tekstcontact">
                                    Frontend - React.js
                            </div>
                            </div>
                            <div class="col">
                                <img className="Ikonacontact2" alt="img" src={mysql} /><br />
                                <div className="tekstcontact">
                                    Baza danych MySQL
                                </div>
                            </div>
                            <div class="col">
                                <img className="Ikonacontact3" alt="img" src={nodejs} /><br />
                                <div className="tekstcontact">
                                    Backend - Spring boot
                            </div>
                            </div>
                        </div>
                        <div className="tytulcontact">
                            Grafiki wykonane przy uzyciu:
                        </div>
                        <div class="row">
                            <div class="col">
                                <div className="tekstcontact">
                                    Free Logo Maker - logomakr.com
                                </div>
                            </div>
                        </div>

                    </div>

                </div >
                <footer><Footer /></footer>
            </Wrapper >
        )
    }
}

export default MatchPredict;