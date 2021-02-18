import React, { useContext } from 'react';
import Navbar from './Components/Navbar';
import Main from './Pages/Main';
import MatchPredict from './Pages/MatchPredict';
import QuePredict from './Pages/QuePredict';
import ThisStats from './Pages/ThisStats';
import Contact from './Pages/Contact';
import d2020 from './Pages/Previous/2020';
import d2019 from './Pages/Previous/2019';
import d2018 from './Pages/Previous/2018';
import d2017 from './Pages/Previous/2017';
import d2016 from './Pages/Previous/2016';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, __RouterContext } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
const App = () => {
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, locations => locations.pathname, {
    from: { opacity: 0, transform: "translate(100%,0)" },
    enter: { opacity: 1, transform: "translate(0%,0)" },
    leave: { opacity: 0, transform: "translate(-50%,0)" }
  });
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log("Pobrano dane")
      fetch('http://localhost:8080/tableLive/save')
      fetch('http://localhost:8080/nextFixture/delete')
      fetch('http://localhost:8080/nextFixture/saveFixture')
      fetch('http://localhost:8080/lastFixture/delete')
      fetch('http://localhost:8080/lastFixture/saveFixture')
      fetch('http://localhost:8080/playerLive/save')
    }, 14400000);
    return () => clearInterval(interval);
  }, []);


  return (
    < Switch >
      <div>
        <header>
          <Navbar />
        </header>

        <main>
          {transitions.map(({ item, props, key }) => (
            <animated.div key={key} style={props} >
              <Switch location={item}>
                <Route exact path="/" component={Main} />
                <Route path="/MatchPredict" component={MatchPredict} />
                <Route path="/QuePredict" component={QuePredict} />
                <Route path="/ThisStats" component={ThisStats} />
                <Route path="/Data/2020" component={d2020} />
                <Route path="/Data/2019" component={d2019} />
                <Route path="/Data/2018" component={d2018} />
                <Route path="/Data/2017" component={d2017} />
                <Route path="/Data/2016" component={d2016} />
                <Route path="/Contact" component={Contact} />
              </Switch>
            </animated.div>
          ))}
        </main>
      </div >

    </Switch >
  );
}

export default App;
