import React, { Component } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Header from '../layout/Header'
import ServiceFinding from '../layout/ServiceFinding';
import * as namesMapping from '../../data/namesMapping'
import { BreadcrumbItem, Breadcrumb, Input } from "reactstrap";
export default class AWSServiceDetails2 extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            // accId:this.props.location.state.accId,
            // serviceName:this.props.location.state.serviceName
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
    async componentDidMount() {

    }

    render() {

        return (
            <>
                <Header />
                <div className="dashboard-container ">
                    <Row className="w-100">
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
                                    Dashboard
                                </BreadcrumbItem>
                                <BreadcrumbItem active tag="span">
                                    Account ID: {this.props.accId}
                                </BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <Col xs="12" sm="12" md="12">

                            aa



                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}
