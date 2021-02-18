import React, { Component } from "react";
import '../Styles/Nextque.css';
import nextque from '../Images/nextque.png'
import Carousel from 'react-bootstrap/Carousel'
import Wrapper from '../Config/Wrapper';
import Footer from '../Components/Footer';

class QuePredict extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            nextques: []
        }
        this.generateTableResults = this.generateTableResults.bind(this);
    }

    async componentDidMount() {
        var response2 = await fetch('http://localhost:8080/nextFixture/nextFixture');
        var body2 = await response2.json();
        console.log(body2);
        this.setState({ nextques: body2, loading: false });
    }

    generateTableResults() {
        let res2 = [];
        let tableData2 = this.state.nextques;
        for (var i = 0; i < 10; i++) {
            var date = tableData2[i].date.slice(0, 10);
            var hour = tableData2[i].date.slice(11, 16);
            res2.push(
                <tr >
                    <td key={tableData2[i].roundNumber}>{tableData2[i].roundNumber}</td>
                    <td key={tableData2[i].date}>{date}</td>
                    <td key={tableData2[i].date}>{hour}(GMT+0)</td>
                    <td key={tableData2[i].homeTeam}>{tableData2[i].homeTeam}</td>
                    <td key={tableData2[i].awayTeam}>{tableData2[i].awayTeam}</td>
                </tr>
            )
        }
        return res2;
    }
    generateTableResults2() {
        let res2 = [];
        let tableData2 = this.state.nextques;
        for (var i = 10; i < 20; i++) {
            var date = tableData2[i].date.slice(0, 10);
            var hour = tableData2[i].date.slice(11, 16);
            res2.push(
                <tr >
                    <td key={tableData2[i].roundNumber}>{tableData2[i].roundNumber}</td>
                    <td key={tableData2[i].date}>{date}</td>
                    <td key={tableData2[i].date}>{hour}(GMT+0)</td>
                    <td key={tableData2[i].homeTeam}>{tableData2[i].homeTeam}</td>
                    <td key={tableData2[i].awayTeam}>{tableData2[i].awayTeam}</td>
                </tr>
            )
        }
        return res2;
    }
    generateTableResults3() {
        let res2 = [];
        let tableData2 = this.state.nextques;
        for (var i = 20; i < 30; i++) {
            var date = tableData2[i].date.slice(0, 10);
            var hour = tableData2[i].date.slice(11, 16);
            res2.push(
                <tr >
                    <td key={tableData2[i].roundNumber}>{tableData2[i].roundNumber}</td>
                    <td key={tableData2[i].date}>{date}</td>
                    <td key={tableData2[i].date}>{hour}(GMT+0)</td>
                    <td key={tableData2[i].homeTeam}>{tableData2[i].homeTeam}</td>
                    <td key={tableData2[i].awayTeam}>{tableData2[i].awayTeam}</td>
                </tr>
            )
        }
        return res2;
    }
    render() {
        const { loading } = this.state;

        if (loading) {
            return <Wrapper><div className="loading">Wczytywanie danych...</div>;</Wrapper>
        }
        return (
            <Wrapper >
                <div className="Maine">
                    <div class="container">
                        <div class="row">
                            <div class="col-3">
                                <img className="Ikonanextque" alt="img" src={nextque} />
                            </div>
                            <div class="col-9">
                                <div className="nextquetekst">
                                    Następne kolejki:
                        </div>
                            </div>
                            <hr className="Linia" />
                        </div>
                        <Carousel className="carousel">
                            <Carousel.Item>
                                <div class="row">
                                    <div class="col">
                                        <div className="tekst">
                                            <table className="nextque" role="table">
                                                <thead >
                                                    <tr role="row">
                                                        <th role="columnheader">Kolejka</th>
                                                        <th role="columnheader">Data</th>
                                                        <th role="columnheader">Godzina</th>
                                                        <th role="columnheader">Dom</th>
                                                        <th role="columnheader">Wyjazd</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    {this.generateTableResults()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div class="row">
                                    <div class="col">
                                        <div className="tekst">
                                            <table className="nextque" role="table">
                                                <thead >
                                                    <tr role="row">
                                                        <th role="columnheader">Kolejka</th>
                                                        <th role="columnheader">Data</th>
                                                        <th role="columnheader">Godzina</th>
                                                        <th role="columnheader">Dom</th>
                                                        <th role="columnheader">Wyjazd</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    {this.generateTableResults2()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div class="row">
                                    <div class="col">
                                        <div className="tekst">

                                            <table className="nextque" role="table">
                                                <thead >
                                                    <tr role="row">
                                                        <th role="columnheader">Kolejka</th>
                                                        <th role="columnheader">Data</th>
                                                        <th role="columnheader">Godzina</th>
                                                        <th role="columnheader">Dom</th>
                                                        <th role="columnheader">Wyjazd</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    {this.generateTableResults3()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </div>

                </div>
                <footer><Footer /></footer>
            </Wrapper >
        )
    }
}

export default QuePredict;

