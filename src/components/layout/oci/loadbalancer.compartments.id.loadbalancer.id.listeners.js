import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, Card, CardSubtitle, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import UtilClass from '../../SupportingJs/Util'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
export default class LoadBalListener extends Component {
    _dataContextUtil = new UtilClass();
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            data: this.props.data,
            showAll: true,
            showThis: undefined
        }
    }
    async componentDidMount() {
        this.getData()
    }
    getData = () => {// api
        this.setState({
            displaybleData: this.props.displayableData
        })
    }
    toggle(tab) {
        let detailCard1 = document.querySelectorAll('.detailCard')
        let detailCard2 = document.getElementsByClassName(tab);
        for (var i = 0; i < detailCard1.length; i++) {
            detailCard1[i].classList.remove("d-block")
            detailCard1[i].classList.add("d-none")
        }
        for (var i = 0; i < detailCard2.length; i++) {
            detailCard2[i].classList.remove("d-none")
            detailCard2[i].classList.add("d-block");
        }
    }
    showAll() {
        let detailCard = document.querySelectorAll('.detailCard')
        let elements = document.querySelectorAll('.serviceThirdLevelUl .nav-item');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove("d-none")
        }
        for (var i = 0; i < detailCard.length; i++) {
            detailCard[i].classList.remove("d-none")
        }
    }
    render() {
        return (
            <div>
                <Row>
                    <Col xs="3" sm="3" md="3" className="bgWhite serviceThirdLevelUl p-0">
                        <Nav vertical className="bgWhite">
                            <NavItem>
                                <NavLink
                                    className={'font-weight-500 '
                                        // (this.state.showAll ? "active " : null)
                                    }
                                    onClick={() => {
                                        this.showAll()
                                    }}> Show All({this.state.data.length})</NavLink>
                                {/* <hr className="mb-0" /> */}
                            </NavItem>


                            {this.state.data ?
                                this.state.data.map((item, i) =>
                                    <NavItem key={i}>
                                        <NavLink className={'blackColor-1 innerA font-weight-500 bg1 bt-1'
                                            // (this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                            // (this.state.showThis == item[1].name ? "active " : null)
                                        }
                                            onClick={() => {
                                                this.toggle(item[0] + '_' + i);
                                            }}>{item[1].name}
                                        </NavLink>
                                        <Nav vertical className="bgWhite ml-2">
                                            {
                                                item[1] && Object.entries(item[1].loadbalancer).map((v, j) =>
                                                    <NavItem key={j}>
                                                        <NavLink className={'innerA '
                                                            //(this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                                            // (this.state.showThis == item[1].name ? "active " : null)
                                                        }
                                                            onClick={() => {
                                                                this.toggle(v[0] + '_' + i + '_' + j);
                                                            }}>
                                                            {v[1].name}


                                                        </NavLink>
                                                        <Nav vertical className="bgWhite  ml-4">
                                                            {
                                                                v[1] && Object.entries(v[1].listeners).map((sl, k) =>
                                                                    <NavItem key={k} className={
                                                                        (this.state.displaybleData && this.state.displaybleData.includes(sl[0]) ? "d-block" : "d-none")
                                                                    }>
                                                                        <NavLink onClick={() => {
                                                                            this.toggle(sl[1].name + '_' + i + '_' + j + '_' + k);
                                                                        }} className="fs14">{sl[1].name}</NavLink>
                                                                    </NavItem>
                                                                )
                                                            }
                                                        </Nav>
                                                    </NavItem>
                                                )

                                            }
                                        </Nav>


                                    </NavItem>
                                )
                                :
                                null
                            }
                        </Nav>
                    </Col>
                    <Col xs="9" sm="9" md="9">
                        <div className="dashboard-container container p-0  full_max_width">
                            <div className="row p-0">
                                <div className="col-md-12">
                                    <Breadcrumb tag="nav" listTag="div">
                                        <BreadcrumbItem className="link" onClick={() => this.props.history.push("/")} tag="a">Dashboard</BreadcrumbItem>
                                        <BreadcrumbItem className="link" onClick={() => this.props.history.goBack()} tag="a"> {this.props.whichDataToFetch} Dashboard</BreadcrumbItem>
                                        <BreadcrumbItem tag="a">{this.props.dbName}</BreadcrumbItem>
                                        <BreadcrumbItem active tag="span">Acc Id: {this.props.accId}</BreadcrumbItem>
                                    </Breadcrumb>
                                </div>
                            </div><hr />
                        </div>
                        {this.state.data ?
                            this.state.data.map((item, i) =>
                                <>
                                    {
                                        Object.entries(item[1].loadbalancer).map((v, j) =>
                                            <>
                                                {
                                                    Object.entries(v[1].listeners).map((sl, k) =>
                                                        <div key={i + '_' + j + '_' + k}
                                                            className={
                                                                (item[0] + '_' + i) +
                                                                " " +
                                                                (v[0] + '_' + i + '_' + j) +
                                                                " detailCard poseRelative " +
                                                                (sl[1].name + '_' + i + '_' + j + '_' + k) +
                                                                " " +
                                                                (this.state.displaybleData && this.state.displaybleData.includes(sl[0]) ? "d-block" : "d-none")
                                                            }

                                                        >
                                                            <Accordion>
                                                                <AccordionSummary
                                                                    expandIcon={<ExpandMoreIcon />}
                                                                    aria-controls={"panel" + i + '_' + j + '_' + k  + "a" + "-content"}
                                                                    id={"panel" + + i + '_' + j + '_' + k  + "d" + "-header"}
                                                                >
                                                                    <h5>{sl[1].name}</h5>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <div className="px-2 py-1">
                                                                        <Divider />
                                                                        <div className="p-3">
                                                                            <CardSubtitle className="pb-2 font-weight-500">Information</CardSubtitle>
                                                                            <CardText className="mb-0"><span className="font-weight-500">Default Backend Set Name: </span>{sl.default_backend_set_name ? "Yes" : "No"}</CardText>
                                                                            <CardText className="mb-0"><span className="font-weight-500">Hostname Names: </span>{sl.hostname_names ? sl.hostname_names : "None"}</CardText>
                                                                            <CardText className="mb-0"><span className="font-weight-500">Path Route Set Name: </span>{sl.path_route_set_name ? sl.path_route_set_name : "None"}</CardText>
                                                                            <CardText className="mb-0"><span className="font-weight-500">Port: </span>{sl.port ? sl.port : "None"}</CardText>
                                                                            <CardText className="mb-0"><span className="font-weight-500">Protocol: </span>{sl.protocol ? sl.protocol : "None"}</CardText>
                                                                            <CardText className="mb-0"><span className="font-weight-500">Connection Configuration: </span>
                                                                                {sl.connection_configuration ?

                                                                                    Object.entries(sl.connection_configuration).map(([key, val]) =>
                                                                                        <div>

                                                                                            <span>{key}: </span><span>{val ? val : "None"}</span>
                                                                                        </div>
                                                                                    )
                                                                                    :
                                                                                    "None"

                                                                                }

                                                                            </CardText>
                                                                            <CardText className="mb-0"><span className="font-weight-500">Rule Set Names: </span>
                                                                                {sl.rule_set_names && sl.rule_set_names.length > 0 ?

                                                                                    sl.rule_set_names.map((val) =>
                                                                                        <div>
                                                                                            <span>{val}</span>
                                                                                        </div>
                                                                                    )
                                                                                    :
                                                                                    "None"

                                                                                }

                                                                            </CardText>
                                                                            <CardText className="mb-0"><span className="font-weight-500">SSL_Configuration: </span>
                                                                                {sl.ssl_configuration ?

                                                                                    Object.entries(sl.ssl_configuration).map(([key, val]) =>
                                                                                        <div>

                                                                                            <span>{key}: </span><span>{val ? val : "None"}</span>
                                                                                        </div>
                                                                                    )
                                                                                    :
                                                                                    "None"

                                                                                }

                                                                            </CardText>
                                                                        </div>
                                                                    </div>
                                                                </AccordionDetails>
                                                            </Accordion>


                                                        </div>

                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </>
                            )
                            : null
                        }
                    </Col>
                </Row>
            </div >
        )
    }
}