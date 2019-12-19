import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

class Asistencia extends Component {

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, clienteActual: undefined, showNumber: false, estriados: 0, lisos: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    var clienteActual = localStorage.getItem('clienteActual');
    var estriados = localStorage.getItem('estriados');
    var lisos = localStorage.getItem('lisos');
    this.setState({ clienteActual: JSON.parse(clienteActual), estriados, lisos })
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  async onPress(asistecia) {
    document.getElementById(asistecia).style.background = "#CFD3D3";

    if (asistecia === 'estriado') {
      await this.setState({ estriados: +this.state.estriados + 1 });
      localStorage.setItem('estriados', +this.state.estriados);
    } else {
      await this.setState({ lisos: +this.state.lisos + 1 });
      localStorage.setItem('lisos', +this.state.lisos);
    }
    this.setState({ showNumber: true });

    window.location.href = '/herramienta';
  }

  logout() {
    document.getElementById('logout').style.background = "#CFD3D3";
    setTimeout(function () {
      document.getElementById('logout').style.background = "white";
    }, 100);
    window.location.href = '/';
  }


  render() {
    if (this.state.clienteActual !== undefined) {
      if (this.state.showNumber === true) {
        return (
          <>
            <div>{this.state.estriados}</div>
            <div>{this.state.lisos}</div>
          </>
        )
      }
      else {
        return (
          <div style={{ backgroundColor: '#CFD3D3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: this.state.height }}>
            <div style={styles.title}>
              <div style={{ fontSize: this.state.height / 15, color: '#383D3D', textAlign: 'center' }}>
                Bienvenido {this.state.clienteActual.nombre} {this.state.clienteActual.apellido}, Nº de legajo: {this.state.clienteActual.legajo}
              </div>
              <div style={{ fontSize: this.state.height / 15, color: '#383D3D', fontWeight: 'bold', textAlign: 'center' }}>
                ¿Qué modelo de pieza desea registrar?
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: "50%" }}>
                <div style={{ fontSize: this.state.height / 10, fontWeight: 'bold', color: '#383D3D', opacity: 0.5  }}>{this.state.estriados ? this.state.estriados : 0}</div>
                <div id='estriado' onClick={() => this.onPress('estriado')} style={styles.number}>
                  <div style={{ fontSize: this.state.height / 10, fontWeight: 'bold', color: '#383D3D' }}>Estriado</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: "50%" }}>
                <div style={{ fontSize: this.state.height / 10, fontWeight: 'bold', color: '#383D3D', opacity: 0.5 }}>{this.state.lisos ? this.state.lisos : 0}</div>
                <div id='liso' onClick={() => this.onPress('liso')} style={styles.number}>
                  <div style={{ fontSize: this.state.height / 10, fontWeight: 'bold', color: '#383D3D' }}>Liso</div>
                </div>
              </div>
            </div>
            <div>
              <div id='logout' style={styles.logout} onClick={() => this.logout()}>
                <FontAwesomeIcon icon={faArrowLeft} style={{ width: '50px', height: '50px', color: "#383D3D" }} />
              </div>
            </div>
          </div>
        );
      }
    }
    else {
      return (
        <div>Loading...</div>
      )
    }

  }
}

let styles = {
  title: {
    height: '20%',
    marginTop: '1%'
  },
  number: {
    marginTop: '5%',
    marginLeft: '2%',
    marginRight: '5%',
    backgroundColor: 'white',
    width: '80%',
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    boxShadow: '0px 10px #383D3D'
  },
  logout: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '2%',
    backgroundColor: 'white',
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50px',
  }
}

export default Asistencia;