import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

class Linea extends Component {

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, herramentistaActual: undefined, items: [] };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    var herramentistaActual = localStorage.getItem('herramentistaActual');
    this.setState({ herramentistaActual: JSON.parse(herramentistaActual) })
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.getClientes();

  }

  getClientes() {
    return fetch('http://ec2-3-17-109-251.us-east-2.compute.amazonaws.com:8080/servicelinea/getlineas')
      .then((response) => response.json())
      .then((responseJson) => {
        var items = [];

        responseJson.forEach((item, index) => {
          if (index % 2) {
            items.push([responseJson[index - 1], responseJson[index]]);
          }
          else if (index == responseJson.length - 1) {
            items.push([responseJson[index], undefined]);
          }
        });

        this.setState({ items: items })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  onPress(asistecia) {
    document.getElementById(asistecia).style.background = "#CFD3D3";
    setTimeout(function () {
      document.getElementById(asistecia).style.background = "white";
    }, 100);
    localStorage.setItem('tipoAtencion', asistecia);
    window.location.href = '/cliente';
  }

  logout() {
    document.getElementById('logout').style.background = "#CFD3D3";
    setTimeout(function () {
      document.getElementById('logout').style.background = "white";
    }, 100);
    window.location.href = '/';
  }

  render() {
    if (this.state.herramentistaActual != undefined) {
      return (
        <div style={{ backgroundColor: '#CFD3D3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: this.state.height }}>
          <div style={styles.title}>
            <div style={{ fontSize: this.state.height / 15, color: 'white', textAlign: 'center' }}>
              Bienvenido {this.state.herramentistaActual.nombre} {this.state.herramentistaActual.apellido}, Nº de legajo: {this.state.herramentistaActual.legajo}
            </div>
            <div style={{ fontSize: this.state.height / 15, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
              ¿Qué tipo de asistencia requiere la herramienta?
            </div>
          </div>

          <div style={styles.scroller}>
            {this.state.items.map((item) => {
              return (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={styles.number}>
                    <div style={{ fontSize: this.state.height / 10, fontWeight: 'bold', color: '#383D3D' }}>{item[0].nombre}</div>
                  </div>
                  {item[1] != undefined ?
                    (<div style={styles.number}>
                      <div style={{ fontSize: this.state.height / 10, fontWeight: 'bold', color: '#383D3D' }}>{item[1].nombre}</div>
                    </div>) : (<div style={styles.number} />)}
                </div>
              );
            }
            )}
          </div>
          <div>
            <div id='logout' style={styles.logout} onClick={() => this.logout()}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ width: '50px', height: '50px', color: "#383D3D" }} />
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div>Loading...</div>
      )
    }

  }
}

let styles = {
  scroller: {
    margin: '0 auto',
    marginTop: '5%',
    marginLeft: '10%',
    marginRight: '10%',
    overflow: 'auto',
    height: '60%'
  },
  title: {
    height: '20%',
    marginTop: '1%'
  },
  number: {
    marginTop: '1%',
    marginLeft: '2%',
    marginRight: '5%',
    marginBottom: '5%',
    backgroundColor: 'white',
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    boxShadow: '0px 10px #383D3D',
    height: '30%'
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

export default Linea;