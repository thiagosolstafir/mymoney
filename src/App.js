import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from './elements/Header'
import Index from './pages/Home'
import Movimentacoes from './pages/Movimentacoes'

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Route path="/" exact component={Index}/>
        <Route path="/movimentacoes/:data" component={Movimentacoes}/>
      </div>
    </Router>
  );
}

export default App;
