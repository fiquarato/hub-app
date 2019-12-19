import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Herramentista from './screens/Herramentista';
import Cliente from './screens/Cliente';
import Maquina from './screens/Maquina';
import Herramienta from './screens/Herramienta';
import Asistencia from './screens/Asistencia';
import Motivo from './screens/Motivo';
import FinEstriado from './screens/FinEstriado'
import FinLiso from './screens/FinLiso'
class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Cliente} />
          <Route exact path="/herramentista" component={Herramentista} />
          <Route exact path="/maquina" component={Maquina} />
          <Route exact path="/herramienta" component={Herramienta} />
          <Route exact path="/asistencia" component={Asistencia} />
          <Route exact path="/motivo" component={Motivo} />
          <Route exact path="/fin-estriado" component={FinEstriado} />
          <Route exact path="/fin-liso" component={FinLiso} />
        </div>
      </Router>
    );
  }
}

export default App;
