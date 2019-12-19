import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


class FinAtencion extends Component {


    constructor(props) {
        super(props);
        this.state = {
            width: 0, height: 0, value: '', items: [], clienteActual: ''
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }


    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        var clienteActual = JSON.parse(localStorage.getItem('clienteActual'));
        var estriados = JSON.parse(localStorage.getItem('estriados'));
        this.setState({
            clienteActual: clienteActual, estriados
        })
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }


    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    async onPress() {
        await localStorage.setItem('estriados',0);
        window.location.href = '/asistencia';
    }

    logout() {
        document.getElementById('logout').style.background = "#CFD3D3";
        setTimeout(function () {
            document.getElementById('logout').style.background = "white";
        }, 100);
        window.location.href = '/herramienta';
    }

    saveAtencion() {

        return fetch('http://ec2-3-17-109-251.us-east-2.compute.amazonaws.com:8080/serviceatencion/saveatencion', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                asistente: this.state.clienteActual,
                id: 0
            }),
        });
    }

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, backgroundColor: '#DDDDDD', height: this.state.height }}>
                    <div style={styles.title}>
                        <div style={{ fontSize: this.state.height / 20, color: 'white' }}>FIN ATENCION</div>
                    </div>
                    <div style={styles.scroller}>
                        <div style={styles.correct}>
                            <br></br>
                            <div style={{ fontSize: this.state.height / 30 }}>Ha completado el palet nº 111 con {this.state.estriados} piezas estriadas </div>
                            <div style={{ textAlign: 'center', marginTop: '3%' }}><FontAwesomeIcon style={{ alignItems: 'center' }} icon={faCheckCircle} color="green" size="6x" /></div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: '10%' }}>
                        <div id='logout' style={styles.logout} onClick={() => this.logout()}>
                            <FontAwesomeIcon icon={faArrowLeft} style={{ width: '3vw', height: '3vw', color: "#383D3D" }} />
                        </div>
                    </div>
                </div>
                <div style={{ flex: '1', backgroundColor: '#CFD3D3', height: this.state.height, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: this.state.height / 15, color: '#383D3D', marginTop: '10%', fontWeight: 'bold', textAlign: 'center' }}>
                        Al presionar confirma el ticket
                        </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '50%' }}>
                        <div onClick={() => this.onPress()} style={styles.number}>
                            <div style={{ fontSize: this.state.height / 15, fontWeight: 'bold', color: '#383D3D' }}>Fin Atencion</div>
                        </div>
                    </div>
                </div>
            </div>
        );
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%'
    },
    number: {
        marginTop: '2%',
        marginBottom: '5%',
        backgroundColor: 'white',
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        boxShadow: '0px 10px #383D3D',
    },
    correct: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: '10px',
        boxShadow: '0px 10px #383D3D',
        paddingLeft: '2%',
    },
    footer: {
        marginTop: '5%',
        marginLeft: '10%',
        marginRight: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '15%',
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


export default FinAtencion;
