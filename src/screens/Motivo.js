import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

class Motivo extends Component {

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, clienteActual: undefined, itemsCambio: [], itemsControl: [], itemsSinStock: [] };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    var clienteActual = localStorage.getItem('clienteActual');
    var tipoAsistencia = localStorage.getItem('tipoAsistencia');
    this.setState({ clienteActual: JSON.parse(clienteActual) })
    this.setState({ tipoAsistencia: tipoAsistencia })
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.getMotivosCambio();
    this.getMotivosControl();
    this.getMotivosSinStock();
  }

  getMotivosCambio() {
    return fetch('http://ec2-3-17-109-251.us-east-2.compute.amazonaws.com:8080/servicemotivo/getmotivos?tipoAtencion=CAMBIO')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ itemsCambio: responseJson })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getMotivosControl() {
    return fetch('http://ec2-3-17-109-251.us-east-2.compute.amazonaws.com:8080/servicemotivo/getmotivos?tipoAtencion=CONTROL')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ itemsControl: responseJson })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getMotivosSinStock() {
    return fetch('http://ec2-3-17-109-251.us-east-2.compute.amazonaws.com:8080/servicemotivo/getmotivos?tipoAtencion=SINSTOCK')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ itemsSinStock: responseJson })
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

  logout() {
    document.getElementById('logout').style.background = "#CFD3D3";
    setTimeout(function () {
      document.getElementById('logout').style.background = "white";
    }, 100);
    window.location.href = '/asistencia';
  }


  render() {
    if (this.state.clienteActual !== undefined) {
      return (
        <div style={{ backgroundColor: '#CFD3D3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: this.state.height }}>
          <div style={styles.title}>
            <div style={{ fontSize: this.state.height / 20, color: 'white' }}>{this.state.tipoAsistencia.toUpperCase()}</div>
          </div>
          <div style={styles.scroller}>
            {this.state.tipoAsistencia === 'control' ?
              <ListaItems items={this.state.itemsControl} height={this.state.height} /> : this.state.tipoAsistencia === 'cambio' ?
                <ListaItems items={this.state.itemsCambio} height={this.state.height} /> : <ListaItems items={this.state.itemsSinStock} height={this.state.height} />}
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
    marginLeft: '5%',
    marginRight: '5%',
    overflow: 'auto',
    height: '90%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    backgroundColor: '#A52929',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '3%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    borderRadius: '10px'
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
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "100%",
    flex: "1",
  }
}

class ListaItems extends Component {

  items() {

    const col1 = [], col2 = [];

    this.props.items.forEach((item, i) => {
      if (i % 2 === 0) {
        col1.push(<div onClick={() => this.onPressMotivo(item)} style={styles.number}>
          <div style={{ textAlign: 'center', fontSize: this.props.height / 20, fontWeight: 'bold', color: '#383D3D' }}>{item.nombre}</div>
        </div>);
      } else {
        col2.push(<div onClick={() => this.onPressMotivo(item)} style={styles.number}>
          <div style={{ textAlign: 'center', fontSize: this.props.height / 20, fontWeight: 'bold', color: '#383D3D' }}>{item.nombre}</div>
        </div>);
      }
    });
    return <div style={styles.row}>
      <div style={styles.column}>
      {col1}</div>
      <div style={styles.column}>
      {col2}</div></div>;
  }

  onPressMotivo(item) {
    localStorage.setItem('motivoActual', JSON.stringify(item));
    if(!localStorage.getItem('herramentistaActual')) {
      window.location.href = '/herramentista';
    } else {
      window.location.href = '/finatencion';
    }
  }

  render() {
    return (
      <>
        {this.props.items.length > 0 ? this.items() : <></>}
      </>)
  }
}


export default Motivo;