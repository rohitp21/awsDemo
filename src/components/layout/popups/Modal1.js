import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, Card, CardTitle, CardText, CardBody } from 'reactstrap';
import FindingDetails2 from '../../../components/pages/FindingDetails2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowCircleLeft,faShieldAlt} from '@fortawesome/free-solid-svg-icons'
export default class Modal1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            findings: this.props.data.findings,
            toggleFinding: true
        };
    }
    showModal = () => this.setState({
        modal: true
    });
    hideModal = () => this.setState({
        modal: false
    });
    showFinding = (items, path, dbName, id_suffix) => {
        if (items.length === 0) {
            return;
        }
        let tempPath = path.substring(0, path.length - 3);
        this.setState({
            toggleFinding: false,
            labels: [],
            accId: localStorage.getItem("accId"),
            whichDataToFetch: "demo",
            pathToFetchData: tempPath,
            dbName: dbName,
            activeTab: 1,
            data: this.props.data,
            items: items,
            id_suffix: id_suffix
        });
    }
    getData = () => {
        return <FindingDetails2
            labels={this.state.labels}
            accId={this.state.accId}
            data={this.state.data}
            items={this.state.items}
            id_suffix={this.state.id_suffix}
            activeTab={this.state.activeTab}
            pathToFetchData={this.state.pathToFetchData}
            dbName={this.state.dbName}
        />
    }

    render() {
        return (
            <Modal size="lg" isOpen={this.state.modal}>
                <ModalHeader>{this.props.serviceName} Findings  (<span>{this.props.date}</span>) <button type="button" className="close" onClick={this.hideModal}><span aria-hidden="true">×</span></button>
                </ModalHeader>
                <ModalBody>
                    <div className="row my-4">
                        {this.state.findings && this.state.toggleFinding &&
                            Object.entries(this.state.findings).map((item, i) =>
                                <div key={i} className="col-md-4 p-0">
                                    <Card className="m-2">
                                        <CardBody id="qwert" className={['serviceCard',
                                            item[1].flagged_items === 0 && item[1].checked_items === 0 ? 'findingDefault' : null,
                                            item[1].flagged_items === 0 && item[1].checked_items > 0 ? 'findingSuccess disabledTextColor' : null,
                                            item[1].flagged_items > 0 && item[1].checked_items > 0 && item[1].level === 'warning' ? 'findingWarning' : null,
                                            item[1].flagged_items > 0 && item[1].checked_items > 0 && item[1].level === 'danger' ? 'findingDanger' : null,
                                        ]}
                                            onClick={() => this.showFinding(item[1].items, item[1].display_path ? item[1].display_path : item[1].path, item[1].dashboard_name, item[1].id_suffix)}
                                        >
                                            <CardTitle className="font-weight-500 fs14">{item[1].description}</CardTitle>
                                            <CardText><span className="font-weight-500"></span> {item[1].dashboard_name} checked: <span className="font-weight-500">{item[1].checked_items}</span></CardText>
                                            <CardText><span className="font-weight-500"></span> {item[1].dashboard_name} flagged: <span className="font-weight-500">{item[1].flagged_items}</span></CardText>
                                            {item[1].control_no && <div className="posAbs"><FontAwesomeIcon icon={faShieldAlt}/> <span className="font-weight-500">{item[1].control_no}</span></div>}
                                        </CardBody>
                                    </Card>
                                </div>
                            )
                        }
                        {this.state.findings && !this.state.toggleFinding &&
                            <>
                                <div><button onClick={()=>this.setState({toggleFinding:true})} className="btn btn-sm buttonStyle1"><FontAwesomeIcon icon={faArrowCircleLeft}/> Back</button></div>
                                {this.getData()}
                            </>
                        }
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}