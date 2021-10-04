import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, CardText, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import UtilClass from '../../SupportingJs/Util'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
export default class EC2RegionsVpcsSecurityGroups extends Component {
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
        // this.setState({
        //     showThis: undefined,
        //     showAll: true
        // })
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
                                    className={'font-weight-500 ' +
                                        (this.state.showAll ? "active " : null)}

                                    onClick={() => {
                                        this.showAll()
                                    }}> Show All({this.state.data.length})</NavLink>
                                <hr className="mb-0" />
                            </NavItem>
                            {this.state.data ?
                                this.state.data.map((item, i) =>
                                    <NavItem key={i}>
                                        <NavLink className={'blackColor-1 innerA font-weight-500 bg1'
                                            // (this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                            // (this.state.showThis === item[1].name ? "active " : null)
                                        }
                                            onClick={() => {
                                                this.toggle(item[0] + '_' + i);
                                            }}>{item[0]}
                                        </NavLink>
                                        <Nav vertical className="bgWhite ml-2">
                                            {
                                                Object.entries(item[1].vpcs).map((vpcs, j) =>
                                                    <NavItem key={j}>
                                                        <NavLink className={'innerA '
                                                            // (this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                                            // (this.state.showThis === item[1].name ? "active " : null)
                                                        }
                                                            onClick={() => {
                                                                this.toggle(vpcs[0] + '_' + i + '_' + j);
                                                            }}>
                                                            {vpcs[0]}


                                                        </NavLink>
                                                        <Nav vertical className="bgWhite  ml-4">
                                                            {
                                                                Object.entries(vpcs[1].security_groups).map((securty_group, k) =>
                                                                    <NavItem key={k} className={
                                                                        (this.state.displaybleData && this.state.displaybleData.includes(securty_group[0]) ? "d-block" : "d-none")
                                                                    }>
                                                                        <NavLink onClick={() => {
                                                                            this.toggle(securty_group[1].name + '_' + i + '_' + j + '_' + k);
                                                                        }} className="fs14">{securty_group[1].name}</NavLink>
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
                        {/* select view  starts */}
                        <div className="dashboard-container p-0  full_max_width">
                            <div className="row p-0">
                                <div className="col-md-12">
                                    <Breadcrumb tag="nav" listTag="div">
                                        <BreadcrumbItem className="link" onClick={() => this.props.history.push("/")} tag="a">Dashboard</BreadcrumbItem>
                                        <BreadcrumbItem className="link text-capitalize" onClick={() => this.props.history.goBack()} tag="a"> {this.props.whichDataToFetch} Dashboard</BreadcrumbItem>
                                        <BreadcrumbItem tag="a">{this.props.dbName}</BreadcrumbItem>
                                        <BreadcrumbItem active tag="span">Acc ID: {this.props.accId}</BreadcrumbItem>
                                    </Breadcrumb>

                                </div>
                            </div><hr />
                        </div>
                        {this.state.data ?
                            this.state.data.map((item, i) =>
                                <>
                                    {
                                        Object.entries(item[1].vpcs).map((vpcs, j) =>
                                            <>
                                                {
                                                    Object.entries(vpcs[1].security_groups).map((securty_group, k) =>
                                                        <div key={i + '_' + j + '_' + k}
                                                            className={
                                                                (item[0] + '_' + i) +
                                                                " " +
                                                                (vpcs[0] + '_' + i + '_' + j) +
                                                                " detailCard poseRelative " +
                                                                (securty_group[1].name + '_' + i + '_' + j + '_' + k) +
                                                                " " +
                                                                // (this.state.showAll ? "d-block " : "d-none ") +
                                                                // (this.state.showThis === item[1].name ? "d-block " : "d-none ")
                                                                (this.state.displaybleData && this.state.displaybleData.includes(securty_group[0]) ? "d-block" : "d-none")
                                                            }

                                                        >
                                                            <Accordion>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls={"panel" + i + '-' + j + "a" + "-content"}
                                                                id={"panel" + i + '-' + j + "d" + "-header"}
                                                                >
                                                                <h5>{securty_group[1].name}</h5>
                                                            </AccordionSummary>
                                                                    <AccordionDetails>
                                                                        <Divider className="mb-3"/>                                                                   
                                                                            <div>
                                                                            <h5>Information</h5>
                                                                                <ListGroup key={i}>
                                                                                <ListGroupItem><span className="font-weight-600">ID: </span>{securty_group[1].id}</ListGroupItem>
                                                                                <ListGroupItem><span className="font-weight-600">Region: </span>{item[0]}</ListGroupItem>
                                                                                <ListGroupItem><span className="font-weight-600">VPC: </span>{vpcs[0]}</ListGroupItem>
                                                                                <ListGroupItem><span className="font-weight-600">Description: </span>{securty_group[1].description}</ListGroupItem>
                                                                                </ListGroup>
                                                                            </div>
                                                                            <Divider className="mb-3 mt-3"/>                                                                            <div className="p-3">
                                                                                <h5>Egress Rules</h5>
                                                                                {
                                                                                    Object.entries(securty_group[1].rules.egress.protocols).map((protocols, k) =>
                                                                                        <>
                                                                                            <CardText className="mb-0 ml-5 font-weight-500">{protocols[0]}</CardText>
                                                                                            {
                                                                                                Object.entries(protocols[1]).map((protocol, l) =>
                                                                                                    <>
                                                                                                        <CardText className="mb-0 ml-10">{protocol[0]}</CardText>
                                                                                                        {
                                                                                                            Object.entries(protocol[1]).map((ports, l) =>
                                                                                                                <>
                                                                                                                    <CardText className="mb-0 ml-15 font-weight-500">{ports[0]}</CardText>
                                                                                                                    {
                                                                                                                        Object.entries(ports[1]).map((port, l) =>
                                                                                                                            <>
                                                                                                                                <CardText className="mb-0 ml-20">IP Addresses</CardText>
                                                                                                                                {
                                                                                                                                    Object.entries(port[1]).map((ips, l) =>
                                                                                                                                        <>
                                                                                                                                            <CardText className="mb-0 ml-25">{ips[1].CIDR}</CardText>
                                                                                                                                        </>
                                                                                                                                    )
                                                                                                                                }

                                                                                                                            </>
                                                                                                                        )
                                                                                                                    }
                                                                                                                </>
                                                                                                            )
                                                                                                        }
                                                                                                    </>
                                                                                                )
                                                                                            }

                                                                                        </>
                                                                                    )
                                                                                }
                                                                                {securty_group[1].name === "default" &&

                                                                                    <CardText className="my-3 ml-5 font-weight-500"><FontAwesomeIcon icon={faExclamationTriangle} /> Default security groups should have no rules.</CardText>
                                                                                }
                                                                            </div>
                                                                            <Divider className="mb-3"/>
                                                                            <div className="p-3">
                                                                                <h5>Ingress Rules</h5>
                                                                                {
                                                                                    Object.entries(securty_group[1].rules.ingress.protocols).map((protocols, k) =>
                                                                                        <>
                                                                                            <CardText className="mb-0 ml-5 font-weight-500">{protocols[0]}</CardText>
                                                                                            {
                                                                                                Object.entries(protocols[1]).map((protocol, l) =>
                                                                                                    <>
                                                                                                        <CardText className="mb-0  ml-10">{protocol[0]}</CardText>
                                                                                                        {
                                                                                                            Object.entries(protocol[1]).map((ports, l) =>
                                                                                                                <>
                                                                                                                    <CardText className="mb-0  ml-15 font-weight-500">{ports[0]}</CardText>
                                                                                                                    {
                                                                                                                        Object.entries(ports[1]).map((port, l) =>
                                                                                                                            <>
                                                                                                                                <CardText className="mb-0  ml-20">IP Addresses</CardText>
                                                                                                                                {
                                                                                                                                    Object.entries(port[1]).map((ips, l) =>
                                                                                                                                        <>
                                                                                                                                            <CardText className="mb-0 ml-25">{ips[1].CIDR}</CardText>
                                                                                                                                        </>
                                                                                                                                    )
                                                                                                                                }

                                                                                                                            </>
                                                                                                                        )
                                                                                                                    }
                                                                                                                </>
                                                                                                            )
                                                                                                        }
                                                                                                    </>
                                                                                                )
                                                                                            }

                                                                                        </>
                                                                                    )
                                                                                }
                                                                                {securty_group[1].name === "default" &&

                                                                                    <CardText className="my-3 ml-5 font-weight-500"><FontAwesomeIcon icon={faExclamationTriangle} /> Default security groups should have no rules.</CardText>
                                                                                }
                                                                            </div>
                                                                            <Divider className="mb-3"/>
                                                                            <div className="p-3">
                                                                                <h5>Usage</h5>
                                                                                {securty_group[1].hasOwnProperty("used_by") ?

                                                                                    securty_group[1].used_by.ec2.resource_type.network_interfaces.map((usage, u) =>
                                                                                        <CardText key={u} className="mb-0"><span>{usage}</span></CardText>
                                                                                    )
                                                                                    :
                                                                                    <CardText className="mb-0"><span>This security group is not in use</span></CardText>
                                                                                }

                                                                            </div>
                                                                        </AccordionDetails>

                                                                    </Accordion>
                                                            {/* <span onClick={(event) => this._dataContextUtil.toggleHeight(event)} className='posAbs moreDetailsBtn'>
                                                                <img className="img-fluid" src={require("../../assets/updown.svg")} />
                                                            </span> */}
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

            </div>
        )
    }
}