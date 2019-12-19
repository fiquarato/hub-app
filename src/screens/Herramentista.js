import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

class Herramentista extends Component {

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, value: '', items: [] };
    this.onPressNumber = this.onPressNumber.bind(this);
    this.onPressArrow = this.onPressArrow.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.getHerramentistas();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  onPressHerramentista(item) {
    localStorage.setItem('herramentistaActual', JSON.stringify(item));
    window.location.href = '/finatencion';
  }

  onPressNumber(number) {
    if (this.state.value.length === 3) return;
    document.getElementById(number).style.background = "#CFD3D3";
    setTimeout(function () {
      document.getElementById(number).style.background = "white";
    }, 100);
    this.setState({ value: this.state.value + number }, () => {
      this.filterHerramentistas();
    });
  }

  onPressArrow() {
    if (this.state.value.length == 0) return;
    document.getElementById('arrow').style.background = "#CFD3D3";
    setTimeout(function () {
      document.getElementById('arrow').style.background = "#FFC107";
    }, 100);
    this.setState({ value: this.state.value.slice(0, -1) }, () => {
      this.filterHerramentistas();
    });
  }

  cleanHerramentistas() {
    let items = this.state.items;
    for (var i = 0; i < this.state.items.length; i++) {
      items[i].hiden = false;
    }
    this.setState({ items: items });
  }

  getHerramentistas() {
    return fetch('http://ec2-3-17-109-251.us-east-2.compute.amazonaws.com:8080/serviceusuario/getherramentistas')
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson.sort((a, b) => b.legajo === -1 ? -1 : (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));
        this.setState({ items: responseJson })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  logout() {
    localStorage.removeItem('herramentistaActual');
    document.getElementById('logout').style.background = "#CFD3D3";
    setTimeout(function () {
      document.getElementById('logout').style.background = "white";
    }, 100);
    window.location.href = '/motivo';
  }

  render() {
    if (this.state.items !== []) {
      return (
        <div style={{ backgroundColor: '#CFD3D3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: this.state.height }}>
          <div style={styles.title}>
            <div style={{ fontSize: this.state.height / 20, color: 'white' }}>RESPONSABLE DE HERRAMIENTAS</div>
          </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={styles.scroller}>
                <ListaItems items={this.state.items} height={this.state.height} />
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

    let mitad = Math.floor(this.props.items.length / 2);

    let array1 = this.props.items.slice(0, mitad);
    let array2 = this.props.items.slice(mitad);

    array1.forEach((item) => {
        col1.push(<div onClick={() => this.onPressMotivo(item)} style={{ ...styles.number, backgroundColor: item.legajo === -1 ? '#F4CB50' : 'white' }}>
          <div style={{ textAlign: 'center', fontSize: this.props.height / 20, fontWeight: 'bold', color: '#383D3D' }}>{item.apellido} {item.nombre}</div>
        </div>);
    });
    array2.forEach((item) => {
      col2.push(<div onClick={() => this.onPressMotivo(item)} style={{ ...styles.number, backgroundColor: item.legajo === -1 ? '#F4CB50' : 'white' }}>
        <div style={{ textAlign: 'center', fontSize: this.props.height / 20, fontWeight: 'bold', color: '#383D3D' }}>{item.apellido} {item.nombre}</div>
      </div>);
  });

    return <div style={styles.row}>
      <div style={styles.column}>
        {col1}</div>
      <div style={styles.column}>
        {col2}</div></div>;
  }

  onPressMotivo(item) {
    localStorage.setItem('herramentistaActual', JSON.stringify(item));
    window.location.href = '/finatencion';
  }

  render() {
    return (
      <>
        {this.props.items.length > 0 ? this.items() : <></>}
      </>)
  }
}

export default Herramentista;
