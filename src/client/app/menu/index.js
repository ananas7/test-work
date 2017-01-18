import React from 'react';

class Menu extends React.Component {
    render () {
        return <nav>
            <ul className="nav navbar-default">
                <li><a href="#" id="btn-1" data-toggle="collapse" data-target="#submenu1" aria-expanded="false">Staff</a>
                    <ul className="nav collapse" id="submenu1" role="menu" aria-labelledby="btn-1">
                        <li><a href="#">Department</a></li>
                    </ul>
                </li>
            </ul>
        </nav>;
    }
}

module.exports = Menu;