import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

class Maquina extends Component {

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, value: '', items: [] };
    this.onPressNumber = this.onPressNumber.bind(this);
    this.onPressArrow = this.onPressArrow.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.getMaquinas();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  onPressMaquina(item) {
    localStorage.setItem('maquinaActual', JSON.stringify(item));
    window.location.href = '/herramienta';
  }

  onPressNumber(number) {
    if (this.state.value.length === 3) return;
    document.getElementById(number).style.background = "#CFD3D3";
    setTimeout(function () {
      document.getElementById(number).style.background = "white";
    }, 100);
    this.setState({ value: this.state.value + number }, () => {
      this.filterMaquinas();
    });
  }

  logout() {
    document.getElementById('logout').style.background = "#CFD3D3";
    setTimeout(function () {
      document.getElementById('logout').style.background = "white";
    }, 100);
    window.location.href = '/';
  }

  onPressArrow() {
    if (this.state.value.length == 0) return;
    document.getElementById('arrow').style.background = "#CFD3D3";
    setTimeout(function () {
      document.getElementById('arrow').style.background = "#FFC107";
    }, 100);
    this.setState({ value: this.state.value.slice(0, -1) }, () => {
      this.filterMaquinas();
    });
  }

  cleanMaquinas() {
    let items = this.state.items;
    for (var i = 0; i < this.state.items.length; i++) {
      items[i].hiden = false;
    }
    this.setState({ items: items });
  }

  filterMaquinas() {
    if (this.state.value.length === 0) {
      this.cleanMaquinas();
      return;
    }
    let items = this.state.items;
    for (var i = 0; i < this.state.items.length; i++) {
      for (var j = 0; j < this.state.value.length; j++) {
        if (this.state.value[j] != (this.state.items[i].nombre.toString()).substring(j + 1, j + 2)) {
          items[i].hiden = true;
          break;
        }
        items[i].hiden = false;
      }
    }
    this.setState({ items: items });
  }

  getMaquinas() {
    return fetch('http://ec2-3-17-109-251.us-east-2.compute.amazonaws.com:8080/servicemaquina/getmaquinas')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ items: responseJson })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (localStorage.getItem('clienteActual') !== undefined) {
      return (
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, backgroundColor: '#DDDDDD', height: this.state.height }}>
            <div style={styles.title}>
              <div style={{ fontSize: this.state.height / 20, color: 'white' }}>Maquina</div>
            </div>
            <div style={styles.scroller}>
              {this.state.items.map((item) => {
                if (item.hiden == false || item.hiden == undefined) {
                  return (
                    <div style={styles.item} onClick={() => this.onPressMaquina(item)}>
                      <div style={{ fontSize: this.state.height / 20 }}>{item.nombre}</div>
                    </div>
                  );
                }
              })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', marginRight: '10%' }}>
              <div id='logout' style={styles.logout} onClick={() => this.logout()}>
                <FontAwesomeIcon icon={faArrowLeft} style={{ width: '3vw', height: '3vw', color: "#383D3D" }} />
              </div>
            </div>
          </div>
          <div style={{ flex: 1, backgroundColor: '#CFD3D3', height: this.state.height }}>
            <div style={styles.titleCalculator}>
              <div style={{ fontSize: this.state.height / 15, color: 'white', marginLeft: '2%', fontWeight: 'bold' }}>P{this.state.value}</div>
            </div>
            <div style={styles.calculatorRow}>
              <div id='1' onClick={() => this.onPressNumber('1')} style={styles.number}>
                <div style={{ fontSize: this.state.height / 20, fontWeight: 'bold', color: '#383D3D' }}>1</div>
              </div>
              <div id='2' onClick={() => this.onPressNumber('2')} style={styles.number}>
                <div style={{ fontSize: this.state.height / 20, fontWeight: 'bold', color: '#383D3D' }}>2</div>
              </div>
              <div id='3' onClick={() => this.onPressNumber('3')} style={styles.number}>
                <div style={{ fontSize: this.state.height / 20, fontWeight: 'bold', color: '#383D3D' }}>3</div>
              </div>
            </div>
            <div style={styles.calculatorRow}>
              <div id='4' onClick={() => this.onPressNumber('4')} style={styles.number}>
                <div style={{ fontSize: this.state.height / 20, fontWeight: 'bold', color: '#383D3D' }}>4</div>
              </div>
              <div id='5' onClick={() => this.onPressNumber('5')} style={styles.number}>
                <div style={{ fontSize: this.state.height / 20, fontWeight: 'bold', color: '#383D3D' }}>5</div>
              </div>
              <div id='6' onClick={() => this.onPressNumber('6')} style={styles.number}>
                <div style={{ fontSize: this.state.height / 20, fontWeight: 'bold', color: '#383D3D' }}>6</div>
              </div>
            </div>
            <div style={styles.calculatorRow}>
              <div id='7' onClick={() => this.onPressNumber('7')} style={styles.number}>
                <div style={{ fontSize: this.state.height / 20, fontWeight: 'bold', color: '#383D3D' }}>7</div>
              </div>
              <div id='8' onClick={() => this.onPressNumber('8')} style={styles.number}>
                <div style={{ fontSize: this.state.height / 20, fontWeight: 'bold', color: '#383D3D' }}>8</div>
              </div>
              <div id='9' onClick={() => this.onPressNumber('9')} style={styles.number}>
                <div style={{ fontSize: this.state.height / 20, fontWeight: 'bold', color: '#383D3D' }}>9</div>
              </div>
            </div>
            <div style={styles.calculatorRow}>
              <div id='arrow' onClick={() => this.onPressArrow()} style={styles.back}>
                <div style={{ fontSize: this.state.height / 20, color: '#383D3D' }}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </div>
              </div>
              <div id='0' onClick={() => this.onPressNumber('0')} style={styles.number}>
                <div style={{ fontSize: this.state.height / 20, fontWeight: 'bold', color: '#383D3D' }}>0</div>
              </div>
              <div style={styles.ok}>
                <div style={{ fontSize: this.state.height / 20, color: '#383D3D' }}>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      window.location.href = '/';
    }

  }
}

let styles = {
  title: {
    backgroundColor: '#A52929',
    marginTop: '5%',
    marginLeft: '10%',
    marginRight: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%',
    borderRadius: '10px'
  },
  scroller: {
    margin: '0 auto',
    marginTop: '5%',
    marginLeft: '10%',
    marginRight: '10%',
    overflow: 'auto',
    height: '50%'
  },
  item: {
    marginTop: '2%',
    height: '20%',
    marginLeft: '2%',
    marginRight: '5%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '2%',
    borderRadius: '20px 20px 0px 0px'
  },
  titleCalculator: {
    backgroundColor: '#383D3D',
    marginTop: '10%',
    marginLeft: '21%',
    marginRight: '23%',
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'center',
    height: '10%',
  },
  calculatorRow: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5%',
    marginLeft: '20%',
    marginRight: '20%',
  },
  number: {
    marginTop: '2%',
    marginLeft: '2%',
    marginRight: '5%',
    backgroundColor: 'white',
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    boxShadow: '0px 10px #383D3D'
  },
  back: {
    marginTop: '2%',
    marginLeft: '2%',
    marginRight: '5%',
    backgroundColor: '#FFC107',
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    boxShadow: '0px 10px #896303',
  },
  ok: {
    marginTop: '2%',
    marginLeft: '2%',
    marginRight: '5%',
    backgroundColor: '#28A745',
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    boxShadow: '0px 10px #15491F',
  },
  logout: {
    marginTop: '10%',
    marginLeft: '5%',
    backgroundColor: 'white',
    width: '6vw',
    height: '6vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '3vw',
  }
}


export default Maquina;
