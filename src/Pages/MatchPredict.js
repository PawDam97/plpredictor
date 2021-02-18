import React, { Component } from "react";
import '../Styles/Main.css';
import Select from 'react-select';
import Wrapper from '../Config/Wrapper';
import Footer from '../Components/Footer';
import Prediction from '../Images/predykcja2.png'
import Question from '../Images/question.png'

class MatchPredict extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            firstvalue: '',
            secondvalue: '',
            home: 'Dom',
            away: 'Wyjazd',
            homelive: 'Dom',
            awaylive: 'Wyjazd',
            predictionHome: [],
            predictionAway: [],
            wavgPredictionHome: [],
            wavgPredictionAway: [],
            shortPredictionHome: [],
            shortPredictionAway: [],
            person: null,
            winner: '',
            wavgWinner: '',
            shortWinner: '',
            chancesAVG: '',
            chancesWAVG: '',
            chancesSHORT: '',
            weights: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    async componentDidMount() {
        var response = await fetch('http://localhost:8080/TeamsStrengths');
        var exam = await response.json();
        var response2 = await fetch('http://localhost:8080/Weights');
        var exam2 = await response2.json();
        this.setState({ person: exam, weights: exam2, loading: false });
    }
    handleChange(event) {
        this.setState({ firstvalue: event.value });
    }
    handleChange2(event) {
        this.setState({ secondvalue: event.value });
    }

    handlePrint = (e) => {
        e.preventDefault();
        this.fullPrediction(this.state.firstvalue, this.state.secondvalue);
        this.lastThreePrediction(this.state.firstvalue, this.state.secondvalue);
        this.wavgFullPrediction(this.state.firstvalue, this.state.secondvalue);
    };
    silnia(n) {
        var result = 1;
        for (var i = 1; i <= n; i++) {
            result = result * i;
        }
        return result;
    }
    predictedResult() {
        var pHomeResult = Number(this.state.predictionHome[0]);
        var goalsHome = Number(0);
        var pAwayResult = Number(this.state.predictionAway[0]);
        var goalsAway = Number(0);
        var remis = Number(0);
        var zwyciestwoDom = Number(0);
        var zwyciestwoWyjazd = Number(0);
        for (var k = 1; k <= 6; k++) {
            if (pHomeResult < this.state.predictionHome[k]) {
                pHomeResult = Number(this.state.predictionHome[k]);
                goalsHome = Number(k);
            }
            if (pAwayResult < this.state.predictionAway[k]) {
                pAwayResult = Number(this.state.predictionAway[k]);
                goalsAway = Number(k);
            }
        }
        if (goalsHome > goalsAway) {
            this.setState({ winner: "Prognozowany zwycięzca: " + this.state.home.clubName + " wynikiem " + goalsHome + " : " + goalsAway });
        }
        if (goalsHome < goalsAway) {
            this.setState({ winner: "Prognozowany zwycięzca: " + this.state.away.clubName + " wynikiem " + goalsHome + " : " + goalsAway });
        }
        if (goalsHome === goalsAway) {
            this.setState({ winner: "Prognozowany remis wynikiem " + goalsHome + " : " + goalsAway });
        }
        for (let i = 0; i <= 8; i++) {
            var chance = this.state.predictionHome[i] * this.state.predictionAway[i];
            remis += chance
        }
        for (let i = 1; i <= 8; i++) {
            for (let x = 0; x < i; x++) {
                var homewinchance = this.state.predictionHome[i] * this.state.predictionAway[x];
                var awaywinchance = this.state.predictionHome[x] * this.state.predictionAway[i];
                zwyciestwoDom += homewinchance;
                zwyciestwoWyjazd += awaywinchance;
            }
        }
        this.setState({ chancesAVG: this.state.home.clubName + ": " + parseFloat(Math.round(zwyciestwoDom) / 100).toFixed(2) + "%, " + this.state.away.clubName + ": " + parseFloat(Math.round(zwyciestwoWyjazd) / 100).toFixed(2) + "%, Remis: " + parseFloat(Math.round(remis) / 100).toFixed(2) + "%." });
    }
    wavgPredictedResult() {
        var pHomeResult = Number(this.state.wavgPredictionHome[0]);
        var goalsHome = Number(0);
        var pAwayResult = Number(this.state.wavgPredictionAway[0]);
        var goalsAway = Number(0);
        var remiss = Number(0);
        var zwyciestwoDom = Number(0);
        var zwyciestwoWyjazd = Number(0);
        for (var k = 1; k <= 7; k++) {
            if (pHomeResult < this.state.wavgPredictionHome[k]) {
                pHomeResult = Number(this.state.wavgPredictionHome[k]);
                goalsHome = Number(k);
            }
            if (pAwayResult < this.state.wavgPredictionAway[k]) {
                pAwayResult = Number(this.state.wavgPredictionAway[k]);
                goalsAway = Number(k);
            }
        }
        if (goalsHome > goalsAway) {
            this.setState({ wavgWinner: "Prognozowany zwycięzca: " + this.state.home.clubName + " wynikiem " + goalsHome + " : " + goalsAway });
        }
        if (goalsHome < goalsAway) {
            this.setState({ wavgWinner: "Prognozowany zwycięzca: " + this.state.away.clubName + " wynikiem " + goalsHome + " : " + goalsAway });
        }
        if (goalsHome === goalsAway) {
            this.setState({ wavgWinner: "Prognozowany remis wynikiem " + goalsHome + " : " + goalsAway });
        }
        for (let i = 0; i <= 8; i++) {
            var chance = this.state.wavgPredictionHome[i] * this.state.wavgPredictionAway[i];
            remiss += chance
        }
        for (let i = 1; i <= 8; i++) {
            for (let x = 0; x < i; x++) {
                var homewinchance = this.state.wavgPredictionHome[i] * this.state.wavgPredictionAway[x];
                var awaywinchance = this.state.wavgPredictionHome[x] * this.state.wavgPredictionAway[i];
                zwyciestwoDom += homewinchance;
                zwyciestwoWyjazd += awaywinchance;
            }
        }
        this.setState({ chancesWAVG: this.state.home.clubName + ": " + parseFloat(Math.round(zwyciestwoDom) / 100).toFixed(2) + "%, " + this.state.away.clubName + ": " + parseFloat(Math.round(zwyciestwoWyjazd) / 100).toFixed(2) + "%, Remis: " + parseFloat(Math.round(remiss) / 100).toFixed(2) + "%." });
    }
    shortPredictedResult() {
        var pHomeResult = Number(this.state.shortPredictionHome[0]);
        var goalsHome = Number(0);
        var pAwayResult = Number(this.state.shortPredictionAway[0]);
        var goalsAway = Number(0);
        var remis = Number(0);
        var zwyciestwoDom = Number(0);
        var zwyciestwoWyjazd = Number(0);
        for (var k = 1; k <= 6; k++) {
            if (pHomeResult < this.state.shortPredictionHome[k]) {
                pHomeResult = Number(this.state.shortPredictionHome[k]);
                goalsHome = Number(k);
            }
            if (pAwayResult < this.state.shortPredictionAway[k]) {
                pAwayResult = Number(this.state.shortPredictionAway[k]);
                goalsAway = Number(k);
            }
        }

        if (goalsHome > goalsAway) {
            this.setState({ shortWinner: "Prognozowany zwycięzca: " + this.state.home.clubName + " wynikiem " + goalsHome + " : " + goalsAway });
        }
        if (goalsHome < goalsAway) {
            this.setState({ shortWinner: "Prognozowany zwycięzca: " + this.state.away.clubName + " wynikiem " + goalsHome + " : " + goalsAway });
        }
        if (goalsHome === goalsAway) {
            this.setState({ shortWinner: "Prognozowany remis wynikiem " + goalsHome + " : " + goalsAway });
        }
        for (let i = 0; i <= 8; i++) {
            var chance = this.state.shortPredictionHome[i] * this.state.shortPredictionAway[i];
            remis += chance
        }
        for (let i = 1; i <= 8; i++) {
            for (let x = 0; x < i; x++) {
                var homewinchance = this.state.shortPredictionHome[i] * this.state.shortPredictionAway[x];
                var awaywinchance = this.state.shortPredictionHome[x] * this.state.shortPredictionAway[i];
                zwyciestwoDom += homewinchance;
                zwyciestwoWyjazd += awaywinchance;
            }
        }
        this.setState({ chancesSHORT: this.state.home.clubName + ": " + parseFloat(Math.round(zwyciestwoDom) / 100).toFixed(2) + "%, " + this.state.away.clubName + ": " + parseFloat(Math.round(zwyciestwoWyjazd) / 100).toFixed(2) + "%, Remis: " + parseFloat(Math.round(remis) / 100).toFixed(2) + "%." });
    }
    async fullPrediction(homeTeam, awayTeam) {
        this.setState({ predictionHome: [], predictionAway: [] })
        var response1 = await fetch('http://localhost:8080/TeamsStrengths/' + homeTeam);
        var exam1 = await response1.json();
        this.setState({ home: exam1, loading: false });
        var response2 = await fetch('http://localhost:8080/TeamsStrengths/' + awayTeam);
        var exam2 = await response2.json();
        this.setState({ away: exam2, loading: false });
        var response3 = await fetch('http://localhost:8080/tableLive/tableLive/' + homeTeam);
        var exam3 = await response3.json();
        this.setState({ homelive: exam3, loading: false });
        var response4 = await fetch('http://localhost:8080/tableLive/tableLive/' + awayTeam);
        var exam4 = await response4.json();
        this.setState({ awaylive: exam4, loading: false });
        var avgOffHome = (this.state.home.offHome_15_16 + this.state.home.offHome_16_17 + this.state.home.offHome_17_18 + this.state.home.offHome_18_19 + this.state.home.offHome_19_20
            + this.state.homelive[0].offHome) / (this.state.home.seasonsPlayed + 1);
        var avgDeffAway = (this.state.away.deffAway_15_16 + this.state.away.deffAway_16_17 + this.state.away.deffAway_17_18 + this.state.away.deffAway_18_19 +
            this.state.away.deffAway_19_20 + this.state.awaylive[0].deffAway) / (this.state.away.seasonsPlayed + 1);
        var avgHomeTeamGoals = (this.state.home.goalsScoredHome_15_16 + this.state.home.goalsScoredHome_16_17 + this.state.home.goalsScoredHome_17_18 + this.state.home.goalsScoredHome_18_19 +
            this.state.home.goalsScoredHome_19_20 + this.state.homelive[0].goalsScoredHome) / (this.state.homelive[0].matchesPlayedHome + this.state.home.roundMatchsPlayed);

        var avgOffAway = (this.state.away.offAway_15_16 + this.state.away.offAway_16_17 + this.state.away.offAway_17_18 + this.state.away.offAway_18_19 + this.state.away.offAway_19_20
            + this.state.awaylive[0].offAway) / (this.state.away.seasonsPlayed + 1);
        var avgDeffHome = (this.state.home.deffHome_15_16 + this.state.home.deffHome_16_17 + this.state.home.deffHome_17_18 + this.state.home.deffHome_18_19 +
            this.state.home.deffHome_19_20 + this.state.homelive[0].deffHome) / (this.state.home.seasonsPlayed + 1);
        var avgAwayTeamGoals = (this.state.away.goalsScoredAway_15_16 + this.state.away.goalsScoredAway_16_17 + this.state.away.goalsScoredAway_17_18 + this.state.away.goalsScoredAway_18_19 +
            this.state.away.goalsScoredAway_19_20 + this.state.awaylive[0].goalsScoredAway) / (this.state.awaylive[0].matchesPlayedAway + this.state.away.roundMatchsPlayed);

            var predictedHomeGoals = avgOffHome * avgDeffAway * avgHomeTeamGoals;
            var predictedAwayGoals = avgOffAway * avgDeffHome * avgAwayTeamGoals;
            
            var tab = [];
            var tab2 = [];
            var i = 0;
            for (i = 0; i <= 8; i++) {
                var poissonHome = ((Math.pow(predictedHomeGoals, i) * Math.pow(Math.E, -predictedHomeGoals)) / this.silnia(i)) * 100;
                tab[i] = parseFloat(Math.round(poissonHome * 100) / 100).toFixed(2);
                var poissonAway = ((Math.pow(predictedAwayGoals, i) * Math.pow(Math.E, -predictedAwayGoals)) / this.silnia(i)) * 100;
                tab2[i] = parseFloat(Math.round(poissonAway * 100) / 100).toFixed(2);
            }
            for (i = 0; i < tab.length; i++) {
                this.setState({ predictionHome: this.state.predictionHome.concat([tab[i]]) });
                this.setState({ predictionAway: this.state.predictionAway.concat([tab2[i]]) });
            }
            this.predictedResult();
    }

    async wavgFullPrediction(homeTeam, awayTeam) {
        this.setState({ wavgPredictionHome: [], wavgPredictionAway: [] })
        var response1 = await fetch('http://localhost:8080/TeamsStrengths/' + homeTeam);
        var exam1 = await response1.json();
        this.setState({ home: exam1, loading: false });
        var response2 = await fetch('http://localhost:8080/TeamsStrengths/' + awayTeam);
        var exam2 = await response2.json();
        this.setState({ away: exam2, loading: false });
        var response3 = await fetch('http://localhost:8080/tableLive/tableLive/' + homeTeam);
        var exam3 = await response3.json();
        this.setState({ homelive: exam3, loading: false });
        var response4 = await fetch('http://localhost:8080/tableLive/tableLive/' + awayTeam);
        var exam4 = await response4.json();
        this.setState({ awaylive: exam4, loading: false });
        var wavgOffHome, wavgDeffHome, wavgDeffAway, wavgOffAway, wavgHomeTeamGoals, wavgAwayTeamGoals;
        if (homeTeam === 63 || homeTeam === 62) {
            wavgOffHome = ((this.state.home.offHome_15_16 * 0.3) + (this.state.home.offHome_16_17 * 0.4) + (this.state.home.offHome_17_18 * 0.6) + (this.state.home.offHome_18_19 * 0.7) + (this.state.home.offHome_19_20 * 1)
                + (this.state.homelive[0].offHome * 1)) / (this.state.home.seasonsPlayed + 1);
            wavgDeffAway = ((this.state.away.deffAway_15_16 * 0.4) + (this.state.away.deffAway_16_17 * 0.5) + (this.state.away.deffAway_17_18 * 0.8) + (this.state.away.deffAway_18_19 * 1.1) +
                (this.state.away.deffAway_19_20 * 1.6) + (this.state.awaylive[0].deffAway * 1.6)) / (this.state.away.seasonsPlayed + 1);
            wavgHomeTeamGoals = ((this.state.home.goalsScoredHome_15_16 * 0.3) + (this.state.home.goalsScoredHome_16_17 * 0.4) + (this.state.home.goalsScoredHome_17_18 * 0.6) + (this.state.home.goalsScoredHome_18_19 * 0.7) +
                (this.state.home.goalsScoredHome_19_20 * 1) + (this.state.homelive[0].goalsScoredHome * 1)) / (this.state.homelive[0].matchesPlayedHome + this.state.home.roundMatchsPlayed);

            wavgOffAway = ((this.state.away.offAway_15_16 * 0.4) + (this.state.away.offAway_16_17 * 0.5) + (this.state.away.offAway_17_18 * 0.8) + (this.state.away.offAway_18_19 * 1.1) + (this.state.away.offAway_19_20 * 1.6)
                + (this.state.awaylive[0].offAway * 1.6)) / (this.state.away.seasonsPlayed + 1);
            wavgDeffHome = ((this.state.home.deffHome_15_16 * 0.3) + (this.state.home.deffHome_16_17 * 0.4) + (this.state.home.deffHome_17_18 * 0.6) + (this.state.home.deffHome_18_19 * 0.7) +
                (this.state.home.deffHome_19_20 * 1) + (this.state.homelive[0].deffHome * 1)) / (this.state.home.seasonsPlayed + 1);
            wavgAwayTeamGoals = ((this.state.away.goalsScoredAway_15_16 * 0.4) + (this.state.away.goalsScoredAway_16_17 * 0.5) + (this.state.away.goalsScoredAway_17_18 * 0.8) + (this.state.away.goalsScoredAway_18_19 * 1.1) +
                (this.state.away.goalsScoredAway_19_20 * 1.6) + (this.state.awaylive[0].goalsScoredAway * 1.6)) / (this.state.awaylive[0].matchesPlayedAway + this.state.away.roundMatchsPlayed);

        } else if (awayTeam === 63 || awayTeam === 62) {
            wavgOffHome = ((this.state.home.offHome_15_16 * 0.4) + (this.state.home.offHome_16_17 * 0.5) + (this.state.home.offHome_17_18 * 0.8) + (this.state.home.offHome_18_19 * 1.1) + (this.state.home.offHome_19_20 * 1.6)
                + (this.state.homelive[0].offHome * 1.6)) / (this.state.home.seasonsPlayed + 1);
            wavgDeffAway = ((this.state.away.deffAway_15_16 * 0.3) + (this.state.away.deffAway_16_17 * 0.4) + (this.state.away.deffAway_17_18 * 0.6) + (this.state.away.deffAway_18_19 * 0.7) +
                (this.state.away.deffAway_19_20 * 1) + (this.state.awaylive[0].deffAway * 1)) / (this.state.away.seasonsPlayed + 1);
            wavgHomeTeamGoals = ((this.state.home.goalsScoredHome_15_16 * 0.4) + (this.state.home.goalsScoredHome_16_17 * 0.5) + (this.state.home.goalsScoredHome_17_18 * 0.8) + (this.state.home.goalsScoredHome_18_19 * 1.1) +
                (this.state.home.goalsScoredHome_19_20 * 1.6) + (this.state.homelive[0].goalsScoredHome * 1.6)) / (this.state.homelive[0].matchesPlayedHome + this.state.home.roundMatchsPlayed);

            wavgOffAway = ((this.state.away.offAway_15_16 * 0.3) + (this.state.away.offAway_16_17 * 0.4) + (this.state.away.offAway_17_18 * 0.6) + (this.state.away.offAway_18_19 * 0.7) + (this.state.away.offAway_19_20 * 1)
                + (this.state.awaylive[0].offAway * 1)) / (this.state.away.seasonsPlayed + 1);
            wavgDeffHome = ((this.state.home.deffHome_15_16 * 0.4) + (this.state.home.deffHome_16_17 * 0.5) + (this.state.home.deffHome_17_18 * 0.8) + (this.state.home.deffHome_18_19 * 1.1) +
                (this.state.home.deffHome_19_20 * 1.6) + (this.state.homelive[0].deffHome * 1.6)) / (this.state.home.seasonsPlayed + 1);
            wavgAwayTeamGoals = ((this.state.away.goalsScoredAway_15_16 * 0.3) + (this.state.away.goalsScoredAway_16_17 * 0.4) + (this.state.away.goalsScoredAway_17_18 * 0.6) + (this.state.away.goalsScoredAway_18_19 * 0.7) +
                (this.state.away.goalsScoredAway_19_20 * 1) + (this.state.awaylive[0].goalsScoredAway * 1)) / (this.state.awaylive[0].matchesPlayedAway + this.state.away.roundMatchsPlayed);

        } else {
            wavgOffHome = ((this.state.home.offHome_15_16 * this.state.weights[0].s2015_16) + (this.state.home.offHome_16_17 * this.state.weights[0].s2016_17) + (this.state.home.offHome_17_18 * this.state.weights[0].s2017_18) + (this.state.home.offHome_18_19 * this.state.weights[0].s2018_19) + (this.state.home.offHome_19_20 * this.state.weights[0].s2019_20)
                + (this.state.homelive[0].offHome * this.state.weights[0].s2020_21)) / (this.state.home.seasonsPlayed + 1);
            wavgDeffAway = ((this.state.away.deffAway_15_16 * this.state.weights[0].s2015_16) + (this.state.away.deffAway_16_17 * this.state.weights[0].s2016_17) + (this.state.away.deffAway_17_18 * this.state.weights[0].s2017_18) + (this.state.away.deffAway_18_19 * this.state.weights[0].s2018_19) +
                (this.state.away.deffAway_19_20 * this.state.weights[0].s2019_20) + (this.state.awaylive[0].deffAway * this.state.weights[0].s2020_21)) / (this.state.away.seasonsPlayed + 1);
            wavgHomeTeamGoals = ((this.state.home.goalsScoredHome_15_16 * this.state.weights[0].s2015_16) + (this.state.home.goalsScoredHome_16_17 * this.state.weights[0].s2016_17) + (this.state.home.goalsScoredHome_17_18 * this.state.weights[0].s2017_18) + (this.state.home.goalsScoredHome_18_19 * this.state.weights[0].s2018_19) +
                (this.state.home.goalsScoredHome_19_20 * this.state.weights[0].s2019_20) + (this.state.homelive[0].goalsScoredHome * this.state.weights[0].s2020_21)) / (this.state.homelive[0].matchesPlayedHome + this.state.home.roundMatchsPlayed);

            wavgOffAway = ((this.state.away.offAway_15_16 * this.state.weights[0].s2015_16) + (this.state.away.offAway_16_17 * this.state.weights[0].s2016_17) + (this.state.away.offAway_17_18 * this.state.weights[0].s2017_18) + (this.state.away.offAway_18_19 * this.state.weights[0].s2018_19) + (this.state.away.offAway_19_20 * this.state.weights[0].s2019_20)
                + (this.state.awaylive[0].offAway * this.state.weights[0].s2020_21)) / (this.state.away.seasonsPlayed + 1);
            wavgDeffHome = ((this.state.home.deffHome_15_16 * this.state.weights[0].s2015_16) + (this.state.home.deffHome_16_17 * this.state.weights[0].s2016_17) + (this.state.home.deffHome_17_18 * this.state.weights[0].s2017_18) + (this.state.home.deffHome_18_19 * this.state.weights[0].s2018_19) +
                (this.state.home.deffHome_19_20 * this.state.weights[0].s2019_20) + (this.state.homelive[0].deffHome * this.state.weights[0].s2020_21)) / (this.state.home.seasonsPlayed + 1);
            wavgAwayTeamGoals = ((this.state.away.goalsScoredAway_15_16 * this.state.weights[0].s2015_16) + (this.state.away.goalsScoredAway_16_17 * this.state.weights[0].s2016_17) + (this.state.away.goalsScoredAway_17_18 * this.state.weights[0].s2017_18) + (this.state.away.goalsScoredAway_18_19 * this.state.weights[0].s2018_19) +
                (this.state.away.goalsScoredAway_19_20 * this.state.weights[0].s2019_20) + (this.state.awaylive[0].goalsScoredAway * this.state.weights[0].s2020_21)) / (this.state.awaylive[0].matchesPlayedAway + this.state.away.roundMatchsPlayed);
        }
        var predictedHomeGoals = wavgOffHome * wavgDeffAway * wavgHomeTeamGoals;
        var predictedAwayGoals = wavgOffAway * wavgDeffHome * wavgAwayTeamGoals;

        var tab = [];
        var tab2 = [];
        var i = 0;
        for (i = 0; i <= 8; i++) {
            var poissonHome = ((Math.pow(predictedHomeGoals, i) * Math.pow(Math.E, -predictedHomeGoals)) / this.silnia(i)) * 100;
            tab[i] = parseFloat(Math.round(poissonHome * 100) / 100).toFixed(2);
            var poissonAway = ((Math.pow(predictedAwayGoals, i) * Math.pow(Math.E, -predictedAwayGoals)) / this.silnia(i)) * 100;
            tab2[i] = parseFloat(Math.round(poissonAway * 100) / 100).toFixed(2);
        }
        for (i = 0; i < tab.length; i++) {
            this.setState({ wavgPredictionHome: this.state.wavgPredictionHome.concat([tab[i]]) });
            this.setState({ wavgPredictionAway: this.state.wavgPredictionAway.concat([tab2[i]]) });
        }
        this.wavgPredictedResult();
    }

    async lastThreePrediction(homeTeam, awayTeam) {
        this.setState({ shortPredictionHome: [], shortPredictionAway: [] })
        var response1 = await fetch('http://localhost:8080/TeamsStrengths/' + homeTeam);
        var exam1 = await response1.json();
        this.setState({ home: exam1, loading: false });
        var response2 = await fetch('http://localhost:8080/TeamsStrengths/' + awayTeam);
        var exam2 = await response2.json();
        this.setState({ away: exam2, loading: false });
        var response3 = await fetch('http://localhost:8080/tableLive/tableLive/' + homeTeam);
        var exam3 = await response3.json();
        this.setState({ homelive: exam3, loading: false });
        var response4 = await fetch('http://localhost:8080/tableLive/tableLive/' + awayTeam);
        var exam4 = await response4.json();
        this.setState({ awaylive: exam4, loading: false });

        var shortAvgOffHome = (this.state.home.offHome_18_19 + this.state.home.offHome_19_20 + this.state.homelive[0].offHome) / (this.state.home.shortSeasonsPlayed + 1);
        var shortAvgDeffAway = (this.state.away.deffAway_18_19 + this.state.away.deffAway_19_20 + this.state.awaylive[0].deffAway) / (this.state.away.shortSeasonsPlayed + 1);
        var shortAvgHomeTeamGoals = (this.state.home.goalsScoredHome_18_19 + this.state.home.goalsScoredHome_19_20 + this.state.homelive[0].goalsScoredHome) / (this.state.homelive[0].matchesPlayedHome + this.state.home.shortRoundMatchsPlayed);

        var shortAvgOffAway = (this.state.away.offAway_18_19 + this.state.away.offAway_19_20 + this.state.awaylive[0].offAway) / (this.state.away.shortSeasonsPlayed + 1);
        var shortAvgDeffHome = (this.state.home.deffHome_18_19 + this.state.home.deffHome_19_20 + this.state.homelive[0].deffHome) / (this.state.home.shortSeasonsPlayed + 1);
        var shortAvgAwayTeamGoals = (this.state.away.goalsScoredAway_18_19 + this.state.away.goalsScoredAway_19_20 + this.state.awaylive[0].goalsScoredAway) / (this.state.awaylive[0].matchesPlayedAway + this.state.away.shortRoundMatchsPlayed);

        var shortPredictedHomeGoals = shortAvgOffHome * shortAvgDeffAway * shortAvgHomeTeamGoals;
        var shortPredictedAwayGoals = shortAvgOffAway * shortAvgDeffHome * shortAvgAwayTeamGoals;

        var tab = [];
        var tab2 = [];
        var i = 0;
        for (i = 0; i <= 8; i++) {
            var poissonHome = ((Math.pow(shortPredictedHomeGoals, i) * Math.pow(Math.E, -shortPredictedHomeGoals)) / this.silnia(i)) * 100;
            tab[i] = parseFloat(Math.round(poissonHome * 100) / 100).toFixed(2);
            var poissonAway = ((Math.pow(shortPredictedAwayGoals, i) * Math.pow(Math.E, -shortPredictedAwayGoals)) / this.silnia(i)) * 100;
            tab2[i] = parseFloat(Math.round(poissonAway * 100) / 100).toFixed(2);
        }
        for (i = 0; i < tab.length; i++) {
            this.setState({ shortPredictionHome: this.state.shortPredictionHome.concat([tab[i]]) });
            this.setState({ shortPredictionAway: this.state.shortPredictionAway.concat([tab2[i]]) });
        }
        this.shortPredictedResult();
    }

    render() {
        const { loading } = this.state;

        if (loading) {
            return <Wrapper><div className="loading">Wczytywanie danych...</div>;</Wrapper>
        }

        let option = []
        if (this.state.person.length > 0) {
            this.state.person.forEach(role => {
                let roleDate = {}
                roleDate.value = role.id
                roleDate.label = role.clubName
                option.push(roleDate)

            })
        }
        return (
            <Wrapper>
                <div className="Maine">
                    <div class="container">

                        <div class="row">

                            <div class="col-13 col-md-7">
                                <div className="tytul">
                                    <h2> Jak to działa</h2>

                                </div>
                                <div className="tekst">
                                    Całość predykcji opiera się na inżynierii danych oraz zastosowaniu rozkładu Poissona. Do wyboru mamy 2 zbiory danych wyliczanych za pomocą
                                    średniej arytmetycznej: tabele z ostatnich 6 sezonów, tabele na przestrzeni ostatnich 3 sezonów oraz jeden zbiór wykorzystujący średnią
                                    ważoną na przestrzeni ostatnich 6 sezonów. Oczywiście pod uwage brany jest cały czas aktualny sezon na żywo. Wszystko po to aby dać możliwość
                                    jak najdokładniejszej predykcji. Jeśli chodzi o wzór upraszczając, pod uwage są brane bramki strzelone oraz stracone przez dane zespoły z podzieleniem
                                    na dom/wyjazd podzielone przez średnią ligi, ogolna średnia bramek strzelonych przez zespół oraz liczba bramek, jakie dany zespół ma szanse zdobyć. Tabela ukazuje
                                    procent szans na strzelenie danej ilości bramek przez zespół z wybranym rywalem, natomiast poniżej mamy widoczny najbardziej prawdopodobny wynik.
                        </div>
                            </div>
                            <div class="col-5 col-md-5"><img className="Ikonka2" alt="img" src={Prediction} /></div>
                        </div>

                        <div className="row">
                            <div class="col">
                                <div className="tytul2">
                                    Wybierz drużyny:
                            </div>
                            </div>
                        </div>

                        <div class="row">

                            <div class="col-lg-4">
                                <div className="tytul2">
                                    Dom
                            </div>
                                <div class="form-group">
                                    <Select onChange={this.handleChange} options={option} />
                                </div>
                            </div>
                            <div class="col-lg-4 ">
                                <div className="versus">
                                    VS
                         </div>
                            </div>
                            <div class="col-lg-4">
                                <div className="tytul2">
                                    Wyjazd
                            </div>
                                <div class="form-group">
                                    <Select onChange={this.handleChange2} options={option} />
                                </div>
                            </div>
                        </div>
                        <div class="row">

                            <div class="col">
                                <div className="buttonn">
                                    <a href="#sd" onClick={this.handlePrint} class="button1">Typuj wynik</a>
                                </div>
                            </div>
                        </div>
                        <hr className="Linia" />


                        <h2> Prognozowany wynik:</h2>

                        <div className="tab-pane active" id="pag1" role="tabpanel">
                            <div className="sv-tab-panel">
                                <div className="tabbable-panel">
                                    <div className="tabbable-line tabs-below">
                                        <div className="ilosckontent">
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="tab_below_1">
                                                    <div class="row">
                                                        <div class="col-2">
                                                            <img className="question1" alt="img" src={Question} /><br />
                                                            <img className="question2" alt="img" src={Question} />
                                                        </div>
                                                        <div class="col-8 ">
                                                            <div className="tekst">
                                                                <table className="tablePrediction" role="table">
                                                                    <thead >
                                                                        <tr className="tablehead" role="row">
                                                                            <th role="columnheader">Liczba bramek</th>
                                                                            <th role="columnheader">{!this.state.home.clubName ? "Dom" : this.state.home.clubName}</th>
                                                                            <th role="columnheader">{!this.state.away.clubName ? "Wyjazd" : this.state.away.clubName}</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody >
                                                                        <tr role="row">
                                                                            <td role="cell">0</td>
                                                                            <td role="cell">{!this.state.predictionHome[0] ? "?" : this.state.predictionHome[0] + "%"}</td>
                                                                            <td role="cell">{!this.state.predictionAway[0] ? "?" : this.state.predictionAway[0] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">1</td>
                                                                            <td role="cell">{!this.state.predictionHome[1] ? "?" : this.state.predictionHome[1] + "%"}</td>
                                                                            <td role="cell">{!this.state.predictionAway[1] ? "?" : this.state.predictionAway[1] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">2</td>
                                                                            <td role="cell">{!this.state.predictionHome[2] ? "?" : this.state.predictionHome[2] + "%"}</td>
                                                                            <td role="cell">{!this.state.predictionAway[2] ? "?" : this.state.predictionAway[2] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">3</td>
                                                                            <td role="cell">{!this.state.predictionHome[3] ? "?" : this.state.predictionHome[3] + "%"}</td>
                                                                            <td role="cell">{!this.state.predictionAway[3] ? "?" : this.state.predictionAway[3] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">4</td>
                                                                            <td role="cell">{!this.state.predictionHome[4] ? "?" : this.state.predictionHome[4] + "%"}</td>
                                                                            <td role="cell">{!this.state.predictionAway[4] ? "?" : this.state.predictionAway[4] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">5</td>
                                                                            <td role="cell">{!this.state.predictionHome[5] ? "?" : this.state.predictionHome[5] + "%"}</td>
                                                                            <td role="cell">{!this.state.predictionAway[5] ? "?" : this.state.predictionAway[5] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">6</td>
                                                                            <td role="cell">{!this.state.predictionHome[6] ? "?" : this.state.predictionHome[6] + "%"}</td>
                                                                            <td role="cell">{!this.state.predictionAway[6] ? "?" : this.state.predictionAway[6] + "%"}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                {!this.state.winner ? "" : <div className="szanse">
                                                                    {this.state.winner}<br /><br />
                                                                    Procentowe szanse: <br />
                                                                    {this.state.chancesAVG}
                                                                </div>}
                                                            </div>
                                                        </div>
                                                        <div class="col-2">
                                                            <img className="question3" alt="img" src={Question} />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="tab-pane" id="tab_below_2">
                                                    <div class="row">
                                                        <div class="col-2">
                                                            <img className="question1" alt="img" src={Question} /><br />
                                                            <img className="question2" alt="img" src={Question} />
                                                        </div>
                                                        <div class="col-8 ">
                                                            <div className="tekst">
                                                                <table className="tablePrediction" role="table">
                                                                    <thead >
                                                                        <tr className="tablehead" role="row">
                                                                            <th role="columnheader">Liczba bramek</th>
                                                                            <th role="columnheader">{!this.state.home.clubName ? "Dom" : this.state.home.clubName}</th>
                                                                            <th role="columnheader">{!this.state.away.clubName ? "Wyjazd" : this.state.away.clubName}</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody >
                                                                        <tr role="row">
                                                                            <td role="cell">0</td>
                                                                            <td role="cell">{!this.state.shortPredictionHome[0] ? "?" : this.state.shortPredictionHome[0] + "%"}</td>
                                                                            <td role="cell">{!this.state.shortPredictionAway[0] ? "?" : this.state.shortPredictionAway[0] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">1</td>
                                                                            <td role="cell">{!this.state.shortPredictionHome[1] ? "?" : this.state.shortPredictionHome[1] + "%"}</td>
                                                                            <td role="cell">{!this.state.shortPredictionAway[1] ? "?" : this.state.shortPredictionAway[1] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">2</td>
                                                                            <td role="cell">{!this.state.shortPredictionHome[2] ? "?" : this.state.shortPredictionHome[2] + "%"}</td>
                                                                            <td role="cell">{!this.state.shortPredictionAway[2] ? "?" : this.state.shortPredictionAway[2] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">3</td>
                                                                            <td role="cell">{!this.state.shortPredictionHome[3] ? "?" : this.state.shortPredictionHome[3] + "%"}</td>
                                                                            <td role="cell">{!this.state.shortPredictionAway[3] ? "?" : this.state.shortPredictionAway[3] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">4</td>
                                                                            <td role="cell">{!this.state.shortPredictionHome[4] ? "?" : this.state.shortPredictionHome[4] + "%"}</td>
                                                                            <td role="cell">{!this.state.shortPredictionAway[4] ? "?" : this.state.shortPredictionAway[4] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">5</td>
                                                                            <td role="cell">{!this.state.shortPredictionHome[5] ? "?" : this.state.shortPredictionHome[5] + "%"}</td>
                                                                            <td role="cell">{!this.state.shortPredictionAway[5] ? "?" : this.state.shortPredictionAway[5] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">6</td>
                                                                            <td role="cell">{!this.state.shortPredictionHome[6] ? "?" : this.state.shortPredictionHome[6] + "%"}</td>
                                                                            <td role="cell">{!this.state.shortPredictionAway[6] ? "?" : this.state.shortPredictionAway[6] + "%"}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                {!this.state.winner ? "" : <div className="szanse">
                                                                    {this.state.shortWinner}<br /><br />
                                                                    Procentowe szanse: <br />
                                                                    {this.state.chancesSHORT}
                                                                </div>}
                                                            </div>
                                                        </div>
                                                        <div class="col-2">
                                                            <img className="question3" alt="img" src={Question} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane" id="tab_below_3">
                                                    <div class="row">
                                                        <div class="col-2">
                                                            <img className="question1" alt="img" src={Question} /><br />
                                                            <img className="question2" alt="img" src={Question} />
                                                        </div>
                                                        <div class="col-8 ">
                                                            <div className="tekst">
                                                                <table className="tablePrediction" role="table">
                                                                    <thead >
                                                                        <tr className="tablehead" role="row">
                                                                            <th role="columnheader">Liczba bramek</th>
                                                                            <th role="columnheader">{!this.state.home.clubName ? "Dom" : this.state.home.clubName}</th>
                                                                            <th role="columnheader">{!this.state.away.clubName ? "Wyjazd" : this.state.away.clubName}</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody >
                                                                        <tr role="row">
                                                                            <td role="cell">0</td>
                                                                            <td role="cell">{!this.state.wavgPredictionHome[0] ? "?" : this.state.wavgPredictionHome[0] + "%"}</td>
                                                                            <td role="cell">{!this.state.wavgPredictionAway[0] ? "?" : this.state.wavgPredictionAway[0] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">1</td>
                                                                            <td role="cell">{!this.state.wavgPredictionHome[1] ? "?" : this.state.wavgPredictionHome[1] + "%"}</td>
                                                                            <td role="cell">{!this.state.wavgPredictionAway[1] ? "?" : this.state.wavgPredictionAway[1] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">2</td>
                                                                            <td role="cell">{!this.state.wavgPredictionHome[2] ? "?" : this.state.wavgPredictionHome[2] + "%"}</td>
                                                                            <td role="cell">{!this.state.wavgPredictionAway[2] ? "?" : this.state.wavgPredictionAway[2] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">3</td>
                                                                            <td role="cell">{!this.state.wavgPredictionHome[3] ? "?" : this.state.wavgPredictionHome[3] + "%"}</td>
                                                                            <td role="cell">{!this.state.wavgPredictionAway[3] ? "?" : this.state.wavgPredictionAway[3] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">4</td>
                                                                            <td role="cell">{!this.state.wavgPredictionHome[4] ? "?" : this.state.wavgPredictionHome[4] + "%"}</td>
                                                                            <td role="cell">{!this.state.wavgPredictionAway[4] ? "?" : this.state.wavgPredictionAway[4] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">5</td>
                                                                            <td role="cell">{!this.state.wavgPredictionHome[5] ? "?" : this.state.wavgPredictionHome[5] + "%"}</td>
                                                                            <td role="cell">{!this.state.wavgPredictionAway[5] ? "?" : this.state.predictionAway[5] + "%"}</td>
                                                                        </tr>
                                                                        <tr role="row">
                                                                            <td role="cell">6</td>
                                                                            <td role="cell">{!this.state.wavgPredictionHome[6] ? "?" : this.state.wavgPredictionHome[6] + "%"}</td>
                                                                            <td role="cell">{!this.state.wavgPredictionAway[6] ? "?" : this.state.wavgPredictionAway[6] + "%"}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                {!this.state.winner ? "" : <div className="szanse">
                                                                    {this.state.wavgWinner}<br /><br />
                                                                    Procentowe szanse: <br />
                                                                    {this.state.chancesWAVG}
                                                                </div>}
                                                            </div>
                                                        </div>
                                                        <div class="col-2">
                                                            <img className="question3" alt="img" src={Question} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div className="iloscsezonow">
                                                <ul className="nav nav-tabs" role="tablist">
                                                    <li >
                                                        <a className="nav-link active" href="#tab_below_1" data-toggle="tab">
                                                            Sześć sezonów </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#tab_below_2" data-toggle="tab">
                                                            Trzy sezony </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#tab_below_3" data-toggle="tab">
                                                            Średnia ważona </a>
                                                    </li>

                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <hr className="Linia" />
                        <h2>Statystyki z obecnego sezonu:</h2>
                        <br />
                        {!this.state.homelive[0].matchesPlayedHome ? <h4>Nie wybrano zespołów.</h4> : <table className="headStats" >
                            <thead>
                                <tr role="row">
                                    <th role="columnheader"></th>
                                    <th role="columnheader">Gospodarz : Przyjezdny</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr><td>Zespoły</td><td>{this.state.homelive[0].clubName} : {this.state.awaylive[0].clubName}</td></tr>
                                <tr><td>Rozegrane spotkania</td><td>{!this.state.homelive[0].matchesPlayedHome ? "" : this.state.homelive[0].matchesPlayedHome + this.state.homelive[0].matchesPlayedAway} : {!this.state.homelive[0].matchesPlayedHome ? "" : this.state.awaylive[0].matchesPlayedHome + this.state.awaylive[0].matchesPlayedAway}</td></tr>
                                <tr><td>Pozycja w lidze</td><td>{this.state.homelive[0].position} : {this.state.awaylive[0].position}</td></tr>
                                <tr><td>Punkty</td><td>{this.state.homelive[0].points} : {this.state.awaylive[0].points}</td></tr>
                                <tr><td>Zwycięstwa</td><td>{this.state.homelive[0].wins} : {this.state.awaylive[0].wins}</td></tr>
                                <tr><td>Remisy</td><td>{this.state.homelive[0].draws} : {this.state.awaylive[0].draws}</td></tr>
                                <tr><td>Porażki</td><td>{this.state.homelive[0].losses} : {this.state.awaylive[0].losses}</td></tr>
                                <tr><td>Gole strzelone</td><td>{this.state.homelive[0].goalsScored} : {this.state.awaylive[0].goalsScored}</td></tr>
                                <tr><td>Gole stracone</td><td>{this.state.homelive[0].goalsLost} : {this.state.awaylive[0].goalsLost}</td></tr>
                            </tbody>
                        </table>}
                        <br />
                    </div>
                </div>
                <footer><Footer /></footer>
            </Wrapper >
        )
    }
}

export default MatchPredict;