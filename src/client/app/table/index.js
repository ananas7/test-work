import React from 'react';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            name: '',
            departmentId: '',
            alertClass: '',
            alertText: '',
            alertShow: false
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDepartmentId = this.handleChangeDepartmentId.bind(this);
        this.add = this.add.bind(this);
    }
    componentDidMount() {
        this.props.ws.onopen = (event) => {
            this.props.ws.send(JSON.stringify({
                api: 'getList'
            }));
        };

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
                        break;
                    }
                    case 'create': {
                        this.setState({
                            alertClass: 'alert-success',
                            alertText: 'Success',
                            alertShow: true
                        });
                        setTimeout(() => {
                            this.setState({
                                alertClass: '',
                                alertText: '',
                                alertShow: false
                            });
                        }, 2000);
                        this.props.ws.send(JSON.stringify({
                            api: 'getList'
                        }));
                        break;
                    }
                    default:
                        break;
                }
            } else {
                if (data.api == 'create') {
                    this.setState({
                        alertClass: 'alert-danger',
                        alertText: 'Wrong',
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
                console.log(data.err);
            }
        };
    }
    handleChangeName(event) {
        this.setState({name: event.target.value});
    }
    handleChangeDepartmentId(event) {
        this.setState({departmentId: event.target.value});
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
    render () {
        let rows;
        if (this.state.rows.length > 0) {
            rows = this.state.rows.map((e) =>
                <tr key={e.id}>
                    <th>{e.id}</th>
                    <td>{e.department_id}</td>
                    <td>{e.name}</td>
                </tr>);
        }
        return <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Department Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalAdd">Add</button>
            <div className="modal fade" id="modalAdd" tabIndex="-1" role="dialog" aria-labelledby="modalAddLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalAddLabel">Add</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" value={this.state.name} onChange={this.handleChangeName} placeholder="name" name="name" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" value={this.state.departmentId} onChange={this.handleChangeDepartmentId} placeholder="departmentId" name="departmentId" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={this.add} type="button" className="btn btn-primary">Save changes</button>
                            <div style={{
                                paddingTop: '8px'
                            }}>
                                <div
                                    style={{
                                        display: (this.state.alertShow ? '' : 'none'),
                                        textAlign: 'center'
                                    }}
                                    className={"alert " + this.state.alertClass}
                                    role="alert"
                                >{this.state.alertText}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

module.exports = Table;