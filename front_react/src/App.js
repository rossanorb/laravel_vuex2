import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import Imoveis from './pages/Imoveis';
import Contratos from './pages/Contratos';
import 'bootstrap/dist/css/bootstrap.css';

import { Link } from "react-router-dom";

function App() {
  return (
    <div id="wrapper">
        <Router>
        <header>
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Imóveis</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/contratos">Contratos</Link>                    
                </li>
            </ul>
        </header>
        <main role="main">
                <Switch>
                    <Route exact path="/" component={Imoveis} />
                    <Route exact path="/contratos" component={Contratos} />
                </Switch>
            <footer className="container">
                <p>2017-2020 Company, Inc. Privacy Terms</p>
            </footer>
        </main>
        </Router>        
        <Loading />
    </div>
  );
}

export default App;