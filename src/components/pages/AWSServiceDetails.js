import React, { Component } from 'react'
import { TabContent, TabPane, Nav, NavItem, Table, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Header from '../layout/Header'
import ServiceFinding from '../layout/ServiceFinding';
import * as namesMapping from '../../data/namesMapping'
import * as Constants from "../../data/Constants";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
import axios from 'axios';
import { BreadcrumbItem, Breadcrumb } from "reactstrap";
import BlockUi from "react-block-ui";
//let data = undefined;
//set withcredeintial true
axios.defaults.withCredentials = true;
export default class AWSServiceDetails extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            accId: this.props.location.state.accId,
            serviceName: this.props.location.state.serviceName
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            localStorage.setItem("whichTab", tab)
            this.setState({
                activeTab: tab
            });
        }
    }
    blockUi = () => {
        this.setState({
            isLoading: true,
        });
    };
    unBlockUi = () => {
        this.setState({
            isLoading: false,
        });
    };
    async componentDidMount() {
        this.blockUi();
        await axios.get(Constants.URLSERVER + "getresources/" + this.state.serviceName + "-" + this.state.accId).then(response => {
            console.log(response);

            let respdata = response.data.data
            this.setState({ ServiceData: respdata })
            this.unBlockUi();
            if (respdata && respdata != "NE") {
                //window.scrollTo(0, 0);
                //this.setState({ ServiceData: respdata })

            } else if (respdata && respdata === "NE") {
                this.showToast(Constants.TOAST_NET_ERR, "error");
            } else {
                this.showToast(Constants.TOAST_SOMETHING_WENT_WRONG, "error");
            }

        }).catch(error => {
            let respdata = "NE"
            console.log(error);
        })
    }
    render() {
        return (
            <><BlockUi tag="div" blocking={this.state.isLoading} />
                <Header />
                <div className="col-md-12">
                    <Breadcrumb tag="nav" listTag="div">
                        <BreadcrumbItem
                            className="link"
                            onClick={() => this.props.history.push("/")}
                            tag="a"
                        >
                            Go to Discover
                        </BreadcrumbItem>
                        <BreadcrumbItem className="text-capitalize link" tag="a" onClick={() => this.props.history.goBack()}>
                            Services
                        </BreadcrumbItem>
                        <BreadcrumbItem active tag="span">
                            Account ID: {this.state.accId}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <Divider />
                <div className="dashboard-container container">
                    <Row className="w-100">
                        <h5 className="mx-auto">Region Wise {
                            this.state.serviceName == 's3' ?
                                <span > Buckets</span>
                                :
                                <span > Volumes</span>
                        }</h5>
                        <Col xs="12" sm="12" md="12" className="mt-3">

                            {
                                this.state.ServiceData && Object.entries(this.state.ServiceData).map((item, i) => (
                                    Object.entries(item[1]).map((serv, j) =>
                                        serv[1] && serv[1].length > 0 &&
                                        <Accordion>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <span>{serv[0]}  </span>
                                                {
                                                    this.state.serviceName == 's3' ?
                                                        <span className="float-right"> Total Buckets :{serv[1].length} </span>
                                                        :
                                                        <span className="float-right"> Total Volumes :{serv[1].length} </span>
                                                }
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="px-2 py-1">
                                                    <Divider />
                                                    {
                                                        serv[1] &&

                                                        <Table hover className="text-center">
                                                            <thead>
                                                                <tr>

                                                                    <th className="text-center">
                                                                        Volume Name
                                                                    </th>
                                                                    <th className="text-center">
                                                                        Encrypted ?
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    Object.entries(serv[1]).map((serv2, s) =>
                                                                        <tr>
                                                                            <td>{serv2[1]['Name']}</td>
                                                                            <td>
                                                                                {serv2[1]['encrypted'] == false ? <span className="colorDanger">No</span> : <span className="colorSuccess">Yes</span>}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }
                                                            </tbody>
                                                        </Table>

                                                    }

                                                </div>
                                            </AccordionDetails>
                                        </Accordion>


                                    )
                                ))

                            }







                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}
