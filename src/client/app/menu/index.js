import React from 'react';
import { Link } from 'react-router';

class Menu extends React.Component {
    render () {
        return <nav>
            <ul className="nav navbar-default">
                <li><Link to='/'>Main</Link></li>
                <li><a href="#" id="btn-1" data-toggle="collapse" data-target="#submenu" aria-expanded="false">Staff</a>
                    <ul className="nav collapse" id="submenu" role="menu" aria-labelledby="btn-1">
                        <li><Link to='/department'>Department</Link></li>
                    </ul>
                </li>
            </ul>
        </nav>;
    }
}

module.exports = Menu;