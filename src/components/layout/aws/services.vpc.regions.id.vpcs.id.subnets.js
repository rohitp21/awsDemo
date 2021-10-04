import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, ListGroup, ListGroupItem,Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import UtilClass from '../../SupportingJs/Util'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
export default class VpcSubnets extends Component {
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
                        <Nav vertical className="   bgWhite">
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
                                                                Object.entries(vpcs[1].subnets).map((subnet, k) =>
                                                                    <NavItem key={k} className={
                                                                        (this.state.displaybleData && this.state.displaybleData.includes(subnet[0]) ? "d-block" : "d-none")
                                                                    }>
                                                                        <NavLink onClick={() => {
                                                                            this.toggle(subnet[1].name + '_' + i + '_' + j + '_' + k);
                                                                        }} className="fs14">{subnet[1].name}</NavLink>
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
                                        Object.entries(item[1].vpcs).map((vpcs, j) =>
                                            <>
                                                {
                                                    Object.entries(vpcs[1].subnets).map((subnet, k) =>
                                                        <div key={i + '_' + j + '_' + k}
                                                            className={
                                                                (item[0] + '_' + i) +
                                                                " " +
                                                                (vpcs[0] + '_' + i + '_' + j) +
                                                                " detailCard poseRelative " +
                                                                (subnet[1].name + '_' + i + '_' + j + '_' + k) +
                                                                " " +
                                                                // (this.state.showAll ? "d-block " : "d-none ") +
                                                                // (this.state.showThis === item[1].name ? "d-block " : "d-none ")
                                                                (this.state.displaybleData && this.state.displaybleData.includes(subnet[0]) ? "d-block" : "d-none")
                                                            }

                                                        >
                                                            <Accordion>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls={"panel" + i + '-' + j + '-' + k+ "a" + "-content"}
                                                                id={"panel" + i + '-' + j + '-' + k + "d" + "-header"}
                                                                >
                                                                    <h5>{subnet[1].name}</h5>
                                                                    </AccordionSummary>
                                                                    <AccordionDetails>
                                                                        <Divider/>
                                                                            <div className="pt-3">
                                                                                <h5>Information</h5>
                                                                                <ListGroup key={i}>
                                                                                <ListGroupItem ><span className="font-weight-600">ID: </span>{subnet[1].id}</ListGroupItem>
                                                                                <ListGroupItem ><span className="font-weight-600">VPC Id: </span>{subnet[1].VpcId}</ListGroupItem>
                                                                                <ListGroupItem ><span className="font-weight-600">Availability Zone: </span>{subnet[1].AvailabilityZone}</ListGroupItem>
                                                                                <ListGroupItem ><span className="font-weight-600">CIDR Block: </span>{subnet[1].CidrBlock}</ListGroupItem>
                                                                                <ListGroupItem ><span className="font-weight-600">IPv6 CIDR Block: </span>{subnet[1].CidrBlockv6 ? subnet[1].CidrBlockv6 : "None"}</ListGroupItem>
                                                                                <ListGroupItem ><span className="font-weight-600">Public IP on Launch: </span>{subnet[1].MapPublicIpOnLaunch ? "True" : "False"}</ListGroupItem>
                                                                                </ListGroup>
                                                                            </div>
                                                                            {
                                                                                subnet[1].instances &&
                                                                                <>
                                                                                    <Divider/>
                                                                                    < div className="pt-3">
                                                                                        <h5>Instances ({subnet[1].instances.length})</h5>
                                                                                        {subnet[1].instances.map((instance, i) =>
                                                                                            <div>{instance}</div>
                                                                                        )}
                                                                                    </div>
                                                                                </>
                                                                            }
                                                                            {
                                                                                subnet[1].flow_logs.length > 0 &&
                                                                                <>
                                                                                    <Divider />
                                                                                    < div className="pt-3">
                                                                                        <h5>Instances ({subnet[1].flow_logs.length})</h5>
                                                                                        {subnet[1].flow_logs.map((flow_log, i) =>
                                                                                            <div>{flow_log.name}</div>
                                                                                        )}
                                                                                    </div>
                                                                                </>
                                                                            }

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

            </div >
        )
    }
}
