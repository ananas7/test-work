import React from 'react';
import Menu from './menu';
import Table from './table';
import {render} from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import BootstrapJs from 'bootstrap/dist/js/bootstrap.js';
require("../css/index.css");

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ws: new WebSocket('ws://localhost:3000/')
        };
    }
    componentDidMount() {
        this.state.ws.onclose = (event) => {
            console.log('Lost connection.');
        };
    }
    render() {
        return <div className="row">
            <div className="col-sm-3">
                <Menu />
            </div>
            <div className="col-sm-8">
                <Table ws={this.state.ws}/>
            </div>
        </div>;
    }
}

render(<App/>, document.getElementById('app'));