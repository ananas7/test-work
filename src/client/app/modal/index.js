import React from 'react';

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return <div>
            <div className="modal fade" id={this.props.modalId} tabIndex="-1" role="dialog" aria-labelledby={this.props.modalId + "Label"} aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={this.props.modalId + "Label"}>{this.props.h5}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" value={this.props.name} onChange={this.props.handleChange} placeholder="name" name={this.props.inputName} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" value={this.props.departmentId} onChange={this.props.handleChange} placeholder="departmentId" name={this.props.inputDepartmentId} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={this.props.save} type="button" className="btn btn-primary">Save changes</button>
                            <div style={{
                                paddingTop: '8px'
                            }}>
                                <div
                                    style={{
                                        display: (this.props.alertShow ? '' : 'none'),
                                        textAlign: 'center'
                                    }}
                                    className={"alert " + this.props.alertClass}
                                    role="alert"
                                >{this.props.alertText}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

module.exports = Modal;