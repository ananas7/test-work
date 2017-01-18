import React from 'react';
import Modal from '../modal';
const _ = require('lodash');

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            name: '',
            first: true,
            departmentId: '',
            alertClass: '',
            alertText: '',
            alertShow: false,
            updateName: '',
            updateDepartmentId: '',
            updateId: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.updateModal = this.updateModal.bind(this);
        this.alertShow = this.alertShow.bind(this);
    }
    componentDidUpdate() {
        if (this.props.connect && this.state.first) {
            this.props.ws.send(JSON.stringify({
                api: 'getList'
            }));
            this.setState({first: false});
        }
    }
    componentDidMount() {
        try {
            this.props.ws.send(JSON.stringify({
                api: 'getList'
            }));
        }
        catch(err) {
            console.log(err);
        }
        this.props.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (!data.err) {
                switch (data.api) {
                    case 'getList': {
                        this.setState({rows: data.data});
                        break;
                    }
                    case 'get': {
                        console.log(data);
                        break;
                    }
                    case 'update': {
                        this.alertShow('alert-success', 'Success');
                        this.props.ws.send(JSON.stringify({
                            api: 'getList'
                        }));
                        break;
                    }
                    case 'create': {
                        this.alertShow('alert-success', 'Success');
                        this.props.ws.send(JSON.stringify({
                            api: 'getList'
                        }));
                        break;
                    }
                    default:
                        break;
                }
            } else {
                if (data.api == 'create' || data.api == 'update' ) {
                    this.alertShow('alert-danger', 'Wrong');
                }
                console.log(data.err);
            }
        };
    }
    alertShow(className, text) {
        this.setState({
            alertClass: className,
            alertText: text,
            alertShow: true
        });
        setTimeout(() => {
            this.setState({
                alertClass: '',
                alertText: '',
                alertShow: false
            });
        }, 2000);
    }
    handleChange(event) {
        let newState = _.clone(this.state);
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }
    add() {
        this.props.ws.send(JSON.stringify({
            api: 'create',
            name: this.state.name,
            departmentId: this.state.departmentId
        }));
        this.setState({
            name: '',
            departmentId: ''
        });
    }
    updateModal(data) {
        this.setState({
            updateName: data.name,
            updateDepartmentId: data.department_id,
            updateId: data.id
        });
    }
    update() {
        this.props.ws.send(JSON.stringify({
            api: 'update',
            name: this.state.updateName,
            departmentId: this.state.updateDepartmentId,
            id: this.state.updateId
        }));
        this.setState({
            updateName: '',
            updateDepartmentId: '',
            updateId: ''
        });
    }
    render () {
        let rows;
        if (this.state.rows.length > 0) {
            rows = this.state.rows.map((e) =>
                <tr key={e.id}>
                    <th>{e.id}</th>
                    <td>{e.department_id}</td>
                    <td>{e.name}</td>
                    <td><button onClick={() => {this.updateModal(e)}} type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalUpdate">Update</button></td>
                </tr>);
        }
        return <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Department Id</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalAdd">Add</button>
            <Modal
                modalId="modalAdd"
                h5="Add"
                handleChange={this.handleChange}
                name={this.state.name}
                departmentId={this.state.departmentId}
                inputName="name"
                inputDepartmentId="departmentId"
                alertShow={this.state.alertShow}
                alertClass={this.state.alertClass}
                alertText={this.state.alertText}
                save={this.add}
            />
            <Modal
                modalId="modalUpdate"
                h5="Update"
                handleChange={this.handleChange}
                name={this.state.updateName}
                departmentId={this.state.updateDepartmentId}
                inputName="updateName"
                inputDepartmentId="updateDepartmentId"
                alertShow={this.state.alertShow}
                alertClass={this.state.alertClass}
                alertText={this.state.alertText}
                save={this.update}
            />
        </div>;
    }
}

module.exports = Table;