/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { Component } from "react";
import '../../Styles/PreviousStats.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Wrapper from '../../Config/Wrapper';
import Footer from '../../Components/Footer';
import last from '../../Images/last2.png';
import '../../Styles/FootbalerTable.css';
class d2019 extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            tables: [],
            players: [],
        }
        this.generateTableData1 = this.generateTableData1.bind(this);
        this.generateTableStats = this.generateTableStats.bind(this);
        this.generatePlayerGoals = this.generatePlayerGoals.bind(this);
    }
    async componentDidMount() {
        var response = await fetch('http://localhost:8080/TableFour');
        var response2 = await fetch('http://localhost:8080/PlayerFour');
        var body = await response.json();
        var body2 = await response2.json();
        console.log(body);
        console.log(body2);
        this.setState({ tables: body, players: body2, loading: false });
    }
    generateTableData1() {
        let res = [];
        let tableData1 = this.state.tables;
        for (var i = 0; i < 20; i++) {
            res.push(
                <tr >
                    <td key={tableData1[i].position}>{tableData1[i].position}</td>
                    <td key={tableData1[i].clubName}>{tableData1[i].clubName}</td>
                    <td key={tableData1[i].wins}>{tableData1[i].wins}</td>
                    <td key={tableData1[i].draws}>{tableData1[i].draws}</td>
                    <td key={tableData1[i].losses}>{tableData1[i].losses}</td>
                    <td key={tableData1[i].points}>{tableData1[i].points}</td>
                </tr>
            )
        }
        return res;
    }

    generateTableStats() {
        let res = [];
        let tableData1 = this.state.tables;
        for (var i = 0; i < 20; i++) {
            res.push(
                <tr >
                    <td key={tableData1[i].position}>{tableData1[i].position}</td>
                    <td key={tableData1[i].clubName}>{tableData1[i].clubName}</td>
                    <td key={tableData1[i].goalsScored}>{tableData1[i].goalsScored}</td>
                    <td key={tableData1[i].goalsLost}>{tableData1[i].goalsLost}</td>
                    <td key={tableData1[i].goalsDifference}>{tableData1[i].goalsDifference}</td>
                    <td key={tableData1[i].yellowCards}>{tableData1[i].yellowCards}</td>
                    <td key={tableData1[i].redCards}>{tableData1[i].redCards}</td>
                    <td key={tableData1[i].points}>{tableData1[i].points}</td>
                </tr>
            )
        }
        return res;
    }
    generateTableStatsBeniamins() {
        let res = [];
        let tableData1 = this.state.tables;
        for (var i = 21; i < 24; i++) {
            res.push(
                <tr >
                    <td key={tableData1[i].position}>{tableData1[i].position}</td>
                    <td key={tableData1[i].clubName}>{tableData1[i].clubName}</td>
                    <td key={tableData1[i].goalsScored}>{tableData1[i].goalsScored}</td>
                    <td key={tableData1[i].goalsLost}>{tableData1[i].goalsLost}</td>
                    <td key={tableData1[i].goalsDifference}>{tableData1[i].goalsDifference}</td>
                    <td key={tableData1[i].yellowCards}>{tableData1[i].yellowCards}</td>
                    <td key={tableData1[i].redCards}>{tableData1[i].redCards}</td>
                    <td key={tableData1[i].points}>{tableData1[i].points}</td>
                </tr>
            )
        }
        return res;
    }
    generatePlayerGoals() {
        let res = [];
        let tableData2 = this.state.players;
        for (var i = 0; i < 10; i++) {
            res.push(
                <tr >
                    <td key={tableData2[i].position}>{tableData2[i].position}</td>
                    <td key={tableData2[i].name}>{tableData2[i].name}</td>
                    <td key={tableData2[i].surname}>{tableData2[i].surname}</td>
                    <td key={tableData2[i].club}>{tableData2[i].club}</td>
                    <td key={tableData2[i].goals}>{tableData2[i].goals}</td>
                </tr>
            )
        }
        return res;
    }
    generatePlayerCleansheets() {
        let res = [];
        let tableData2 = this.state.players;
        for (var i = 40; i < 50; i++) {
            res.push(
                <tr >
                    <td key={tableData2[i].position}>{tableData2[i].position}</td>
                    <td key={tableData2[i].name}>{tableData2[i].name}</td>
                    <td key={tableData2[i].surname}>{tableData2[i].surname}</td>
                    <td key={tableData2[i].club}>{tableData2[i].club}</td>
                    <td key={tableData2[i].cleanSheets}>{tableData2[i].cleanSheets}</td>
                </tr>
            )
        }
        return res;
    }
    generatePlayerAssists() {
        let res = [];
        let tableData2 = this.state.players;
        for (var i = 10; i < 20; i++) {
            res.push(
                <tr >
                    <td key={tableData2[i].position}>{tableData2[i].position}</td>
                    <td key={tableData2[i].name}>{tableData2[i].name}</td>
                    <td key={tableData2[i].surname}>{tableData2[i].surname}</td>
                    <td key={tableData2[i].club}>{tableData2[i].club}</td>
                    <td key={tableData2[i].assists}>{tableData2[i].assists}</td>
                </tr>
            )
        }
        return res;
    }
    generatePlayerYellow() {
        let res = [];
        let tableData2 = this.state.players;
        for (var i = 20; i < 30; i++) {
            res.push(
                <tr >
                    <td key={tableData2[i].position}>{tableData2[i].position}</td>
                    <td key={tableData2[i].name}>{tableData2[i].name}</td>
                    <td key={tableData2[i].surname}>{tableData2[i].surname}</td>
                    <td key={tableData2[i].club}>{tableData2[i].club}</td>
                    <td key={tableData2[i].yellowCards}>{tableData2[i].yellowCards}</td>
                </tr>
            )
        }
        return res;
    }
    generatePlayerRed() {
        let res = [];
        let tableData2 = this.state.players;
        for (var i = 30; i < 40; i++) {
            res.push(
                <tr >
                    <td key={tableData2[i].position}>{tableData2[i].position}</td>
                    <td key={tableData2[i].name}>{tableData2[i].name}</td>
                    <td key={tableData2[i].surname}>{tableData2[i].surname}</td>
                    <td key={tableData2[i].club}>{tableData2[i].club}</td>
                    <td key={tableData2[i].redCards}>{tableData2[i].redCards}</td>
                </tr>
            )
        }
        return res;
    }
    render() {
        const { loading } = this.state;

        if (loading) {
            return <Wrapper><div className="loading">Wczytywanie danych...</div>;</Wrapper>
        }
        return (
            <Wrapper>
                <div className="ThisStats">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <img className="Ikona2" alt="img" src={last} />
                                <Tabs className="tabsy1">
                                    <TabList className="tabsy">
                                        <Tab ><div >Tabela</div></Tab>
                                        <Tab>Statystyki zespołów</Tab>
                                        <Tab>Statystyki piłkarzy</Tab>
                                        <Tab>Beniaminki</Tab>
                                    </TabList>
                                    <hr className="Linia" />
                                    <TabPanel >
                                        <div className="sezon">Sezon 2018/2019</div>
                                        <div class="row">
                                            <div class="col">
                                                <div className="tekst">
                                                    <h3>Tabela rozgrywek</h3>

                                                    <table className="table1" role="table">
                                                        <thead role="rowgroup">
                                                            <tr className="tablehead" role="row">
                                                                <th role="columnheader">Pozycja</th>
                                                                <th role="columnheader">Nazwa Drużyny</th>
                                                                <th role="columnheader">Zwycięstwa</th>
                                                                <th role="columnheader">Remisy</th>
                                                                <th role="columnheader">Porażki</th>
                                                                <th role="columnheader">Punkty</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody role="rowgroup">
                                                            {this.generateTableData1()}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div class="row">
                                            <div class="col">
                                                <div className="tekst">
                                                    <h3>Statystyki zespołów</h3>

                                                    <table className="table2" role="table">
                                                        <thead role="rowgroup">
                                                            <tr className="tablehead" role="row">
                                                                <th role="columnheader">Pozycja</th>
                                                                <th role="columnheader">Nazwa Drużyny</th>
                                                                <th role="columnheader">Gole zyskane</th>
                                                                <th role="columnheader">Gole stracone</th>
                                                                <th role="columnheader">Rezultat goli</th>
                                                                <th role="columnheader">Żółte kartki</th>
                                                                <th role="columnheader">Czerwone kartki</th>
                                                                <th role="columnheader">Punkty</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody role="rowgroup">
                                                            {this.generateTableStats()}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div class="row">
                                            <div class="col">
                                                <div className="tekst">

                                                    <div className="tab-pane active" id="pag1" role="tabpanel">
                                                        <div className="sv-tab-panel">
                                                            <div className="tabbable-panel">
                                                                <div className="tabbable-line tabs-below">
                                                                    <div className="ilosckontent">
                                                                        <div className="tab-content">
                                                                            <div className="tab-pane active" id="tab_below_1">
                                                                                <h2>Top 10 goli</h2>
                                                                                <table className="table3" role="table">
                                                                                    <thead role="rowgroup">
                                                                                        <tr className="tablehead" role="row">
                                                                                            <th role="columnheader">Pozycja</th>
                                                                                            <th role="columnheader">Imie</th>
                                                                                            <th role="columnheader">Nazwisko</th>
                                                                                            <th role="columnheader">Klub</th>
                                                                                            <th role="columnheader">Suma</th>

                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody role="rowgroup">
                                                                                        {this.generatePlayerGoals()}
                                                                                    </tbody>
                                                                                </table>

                                                                            </div>
                                                                            <div className="tab-pane" id="tab_below_2">
                                                                                <h2>Top 10 asyst</h2>
                                                                                <table className="table3" role="table">
                                                                                    <thead role="rowgroup">
                                                                                        <tr className="tablehead" role="row">
                                                                                            <th role="columnheader">Pozycja</th>
                                                                                            <th role="columnheader">Imie</th>
                                                                                            <th role="columnheader">Nazwisko</th>
                                                                                            <th role="columnheader">Klub</th>
                                                                                            <th role="columnheader">Suma</th>

                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody role="rowgroup">
                                                                                        {this.generatePlayerAssists()}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                            <div className="tab-pane" id="tab_below_3">
                                                                                <h2>Top 10 czyste konta</h2>
                                                                                <table className="table3" role="table">
                                                                                    <thead role="rowgroup">
                                                                                        <tr className="tablehead" role="row">
                                                                                            <th role="columnheader">Pozycja</th>
                                                                                            <th role="columnheader">Imie</th>
                                                                                            <th role="columnheader">Nazwisko</th>
                                                                                            <th role="columnheader">Klub</th>
                                                                                            <th role="columnheader">Suma</th>

                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody role="rowgroup">
                                                                                        {this.generatePlayerCleansheets()}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                            <div className="tab-pane" id="tab_below_4">
                                                                                <h2>Top 10 zółtych kartek</h2>
                                                                                <table className="table3" role="table">
                                                                                    <thead role="rowgroup">
                                                                                        <tr className="tablehead" role="row">
                                                                                            <th role="columnheader">Pozycja</th>
                                                                                            <th role="columnheader">Imie</th>
                                                                                            <th role="columnheader">Nazwisko</th>
                                                                                            <th role="columnheader">Klub</th>
                                                                                            <th role="columnheader">Suma</th>

                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody role="rowgroup">
                                                                                        {this.generatePlayerYellow()}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                            <div className="tab-pane" id="tab_below_5">
                                                                                <h2>Top 10 czerwonych kartek</h2>
                                                                                <table className="table3" role="table">
                                                                                    <thead role="rowgroup">
                                                                                        <tr className="tablehead" role="row">
                                                                                            <th role="columnheader">Pozycja</th>
                                                                                            <th role="columnheader">Imie</th>
                                                                                            <th role="columnheader">Nazwisko</th>
                                                                                            <th role="columnheader">Klub</th>
                                                                                            <th role="columnheader">Suma</th>

                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody role="rowgroup">
                                                                                        {this.generatePlayerRed()}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="ilosctabs">
                                                                        <ul className="nav nav-tabs" role="tablist">
                                                                            <li >
                                                                                <a className="nav-link active" href="#tab_below_1" data-toggle="tab">
                                                                                    Gole </a>
                                                                            </li>
                                                                            <li className="nav-item">
                                                                                <a className="nav-link" href="#tab_below_2" data-toggle="tab">
                                                                                    Asysty </a>
                                                                            </li>
                                                                            <li className="nav-item">
                                                                                <a className="nav-link" href="#tab_below_3" data-toggle="tab">
                                                                                    Czyste Konta </a>
                                                                            </li>
                                                                            <li className="nav-item">
                                                                                <a className="nav-link" href="#tab_below_4" data-toggle="tab">
                                                                                    Żółte kartki </a>
                                                                            </li>
                                                                            <li className="nav-item">
                                                                                <a className="nav-link" href="#tab_below_5" data-toggle="tab">
                                                                                    Czerwone kartki </a>
                                                                            </li>

                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="sezon">Dane zespołów które po sezonie awansowały do Premier League.</div>
                                        <div class="row">
                                            <div class="col">
                                                <div className="tekst">

                                                    <div className="tab-pane active" id="pag1" role="tabpanel">
                                                        <div className="sv-tab-panel">
                                                            <div className="tabbable-panel">
                                                                <div className="tabbable-line tabs-below">
                                                                    <div className="ilosckontent">
                                                                        <div className="tab-content">

                                                                            <h2>Statystyki zespołów</h2>

                                                                            <table className="table2" role="table">
                                                                                <thead role="rowgroup">
                                                                                    <tr className="tablehead" role="row">
                                                                                        <th role="columnheader">Pozycja</th>
                                                                                        <th role="columnheader">Nazwa Drużyny</th>
                                                                                        <th role="columnheader">Gole zyskane</th>
                                                                                        <th role="columnheader">Gole stracone</th>
                                                                                        <th role="columnheader">Rezultat goli</th>
                                                                                        <th role="columnheader">Żółte kartki</th>
                                                                                        <th role="columnheader">Czerwone kartki</th>
                                                                                        <th role="columnheader">Punkty</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody role="rowgroup">
                                                                                    {this.generateTableStatsBeniamins()}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
                <footer><Footer /></footer>
            </Wrapper>

        )
    }
}

export default d2019;