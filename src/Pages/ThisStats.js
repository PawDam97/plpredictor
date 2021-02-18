import React, { Component } from "react";
import '../Styles/TeamTable.css';
import '../Styles/Stats.css';
import '../Styles/LiveTable.css'
import '../Styles/Results.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Wrapper from '../Config/Wrapper';
import Footer from '../Components/Footer';
import Aktualne from '../Images/aktualne.png'
class ThisStats extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            tables: [],
            results: [],
            topscorers: []
        }
        this.generateTableData1 = this.generateTableData1.bind(this);
    }
    async componentDidMount() {
        var response = await fetch('http://localhost:8080/tableLive/tableLive');
        var body = await response.json();
        var response2 = await fetch('http://localhost:8080/lastFixture/lastFixture');
        var body2 = await response2.json();
        var response3 = await fetch('http://localhost:8080/playerLive/playerLive');
        var body3 = await response3.json();
        console.log(body2);
        this.setState({ tables: body, results: body2, topscorers: body3, loading: false });
    }
    generateTableData1() {
        let res = [];
        let tableData1 = this.state.tables;
        for (var i = 0; i < 20; i++) {
            var matches = tableData1[i].matchesPlayedHome + tableData1[i].matchesPlayedAway;
            res.push(
                <tr >
                    <td key={tableData1[i].position}>{tableData1[i].position}</td>
                    <td key={tableData1[i].clubName}>{tableData1[i].clubName}</td>
                    <td key={tableData1[i].matches_played_home}>{matches}</td>
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
                    <td key={tableData1[i].goalsScoredHome}>{tableData1[i].goalsScoredHome}</td>
                    <td key={tableData1[i].goalsLostHome}>{tableData1[i].goalsLostHome}</td>
                    <td key={tableData1[i].goalsScoredAway}>{tableData1[i].goalsScoredAway}</td>
                    <td key={tableData1[i].goalsLostAway}>{tableData1[i].goalsLostAway}</td>
                    <td key={tableData1[i].points}>{tableData1[i].points}</td>
                </tr>
            )
        }
        return res;
    }
    generateTableResults() {
        let res2 = [];
        let tableData2 = this.state.results;
        var kolejka = tableData2[1].roundNumber;
        for (var i = 0; i < 50; i++) {
            var date = tableData2[i].date.slice(0, 10);
            var hour = tableData2[i].date.slice(11, 16);
            if (tableData2[i].roundNumber != kolejka) {
                res2.push(
                    <tr>
                        <td><hr className="Linia2" /></td>
                        <td><hr className="Linia2" /></td>
                        <td><hr className="Linia2" /></td>
                        <td><hr className="Linia2" /></td>
                        <td><hr className="Linia2" /></td>
                        <td><hr className="Linia2" /></td>
                    </tr>

                )
                kolejka = tableData2[i].roundNumber;
            }
            res2.push(
                <tr >
                    <td key={tableData2[i].roundNumber}>{tableData2[i].roundNumber}</td>
                    <td key={tableData2[i].date}>{date}</td>
                    <td key={tableData2[i].date}>{hour}(GMT+0)</td>
                    <td key={tableData2[i].homeTeam}>{tableData2[i].homeTeam}</td>
                    <td key={tableData2[i].fulltime}>{tableData2[i].fulltime} ({tableData2[i].halftime})</td>
                    <td key={tableData2[i].awayTeam}>{tableData2[i].awayTeam}</td>
                </tr>
            )

        }
        return res2;
    }
    generateTableTopscorers() {
        let res3 = [];
        let tableData = this.state.topscorers;
        for (var i = 0; i < 20; i++) {
            res3.push(
                <tr >
                    <td key={i}>{i + 1}</td>
                    <td key={tableData[i].firstname}>{tableData[i].firstname}</td>
                    <td key={tableData[i].lastname}>{tableData[i].lastname}</td>
                    <td key={tableData[i].teamName}>{tableData[i].teamName}</td>
                    <td key={tableData[i].minutesPlayed}>{tableData[i].minutesPlayed}</td>
                    <td key={tableData[i].shoots}>{tableData[i].shoots}</td>
                    <td key={tableData[i].penalties}>{tableData[i].penalties}</td>
                    <td key={tableData[i].totalGoals}>{tableData[i].totalGoals}</td>
                </tr>
            )
        }
        return res3;
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
                                <img className="Ikona" alt="img" src={Aktualne} />
                                <Tabs className="tabsy1">
                                    <TabList className="tabsy">
                                        <Tab ><div >Tabela</div></Tab>
                                        <Tab>Statystyki zespołów</Tab>
                                        <Tab>Klasyfikacja strzelców</Tab>
                                        <Tab>Wyniki</Tab>
                                    </TabList>
                                    <hr className="Linia" />
                                    <TabPanel >
                                        <div class="row">
                                            <div class="col">
                                                <div className="tekst">
                                                    <h3>Tabela rozgrywek</h3>

                                                    <table className="table1Live" role="table">
                                                        <thead >
                                                            <tr className="tablehead" role="row">
                                                                <th role="columnheader">Pozycja</th>
                                                                <th role="columnheader">Nazwa Drużyny</th>
                                                                <th role="columnheader">Mecze</th>
                                                                <th role="columnheader">Zwycięstwa</th>
                                                                <th role="columnheader">Remisy</th>
                                                                <th role="columnheader">Porażki</th>
                                                                <th role="columnheader">Punkty</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
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

                                                    <table className="LiveTable" role="table">
                                                        <thead >
                                                            <tr className="tablehead" role="row">
                                                                <th role="columnheader">Pozycja</th>
                                                                <th role="columnheader">Nazwa Drużyny</th>
                                                                <th role="columnheader">Gole zyskane</th>
                                                                <th role="columnheader">Gole stracone</th>
                                                                <th role="columnheader">Rezultat goli</th>
                                                                <th role="columnheader">Gole strzelone dom</th>
                                                                <th role="columnheader">Gole stracone dom</th>
                                                                <th role="columnheader">Gole strzelone wyjazd</th>
                                                                <th role="columnheader">Gole stracone wyjazd</th>
                                                                <th role="columnheader">Punkty</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody >
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
                                                    <h3>Klasyfikacja strzelców</h3>

                                                    <table className="ScorersLive" role="table">
                                                        <thead >
                                                            <tr className="tablehead" role="row">
                                                                <th role="columnheader">Pozycja</th>
                                                                <th role="columnheader">Imie</th>
                                                                <th role="columnheader">Nazwisko</th>
                                                                <th role="columnheader">Zespół</th>
                                                                <th role="columnheader">Minuty</th>
                                                                <th role="columnheader">Strzały</th>
                                                                <th role="columnheader">Rzuty karne</th>
                                                                <th role="columnheader">Bramki</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody >
                                                            {this.generateTableTopscorers()}
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
                                                    <h3>Ostatnie wyniki</h3>

                                                    <table className="results" role="table">
                                                        <thead>
                                                            <tr role="row">
                                                                <th role="columnheader">Kolejka</th>
                                                                <th role="columnheader">Data</th>
                                                                <th role="columnheader">Godzina</th>
                                                                <th role="columnheader">Dom</th>
                                                                <th role="columnheader">Wynik (do przerwy)</th>
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

export default ThisStats;