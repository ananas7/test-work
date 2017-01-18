import React from 'react';
import Menu from './menu';
import Table from './table';
import Main from './main';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import BootstrapJs from 'bootstrap/dist/js/bootstrap.js';
require("../css/index.css");

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ws: new WebSocket('ws://localhost:3000/'),
            connect: false
        };
    }
    componentDidMount() {
        this.state.ws.onopen = () => {
            this.setState({
                connect: true
            })
        };
        this.state.ws.onclose = (event) => {
            console.log('Lost connection.');
        };
    }
    render() {
        const children = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
                ws: this.state.ws,
                connect: this.state.connect
            });
        });
        return <div className="container-fluid row">
            <div className="col-sm-3">
                <Menu />
            </div>
            <div className="col-sm-8">
                {children}
            </div>
        </div>;
    }
}

render(
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Main} />
            <Route path='department' component={Table} />
        </Route>
    </Router>, document.getElementById('app'));