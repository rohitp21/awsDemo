import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink,  Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
//import Data from '../../data/ociData.json'
import UtilClass from '../../SupportingJs/Util'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
export default class EC2RegionsSnapshots extends Component {
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
        //
        debugger
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
                    <Col xs="2" sm="2" md="2" className="bgWhite serviceThirdLevelUl p-0">
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
                                        <NavLink className={'bt-1 innerA font-weight-500 bg1'
                                            // (this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                            // (this.state.showThis == item[1].name ? "active " : null)
                                        }
                                            onClick={() => {
                                                this.toggle(item[0] + '_' + i);
                                            }}>{item[0]}
                                        </NavLink>
                                        <Nav vertical className="bgWhite ml-2">
                                            {
                                                Object.entries(item[1].snapshots).map((snapshots, j) =>
                                                    <NavItem key={j}>
                                                        <NavLink className={'innerA '
                                                            // (this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                                            // (this.state.showThis == item[1].name ? "active " : null)
                                                        }
                                                            onClick={() => {
                                                                this.toggle(snapshots[0] + '_' + i + '_' + j);
                                                            }}>
                                                            {snapshots[0]}


                                                        </NavLink>
                                                        {/* <Nav vertical className="bgWhite  ml-4">
                                                            {
                                                                Object.entries(vpcs[1].security_groups).map((securty_group, k) =>
                                                                    <NavItem key={k} className={
                                                                        (this.state.displaybleData && this.state.displaybleData.includes(securty_group[0]) ? "d-block" : "d-none")
                                                                    }>
                                                                        <NavLink onClick={() => {
                                                                            this.toggle(securty_group[1].name + '_' + i + '_' + j + '_' + k);
                                                                        }} className="blackColor-1 fs14">{securty_group[1].name}</NavLink>
                                                                    </NavItem>
                                                                )
                                                            }
                                                        </Nav> */}
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
                    <Col xs="10" sm="10" md="10">
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
                            </div>
                            <Divider/>
                        </div>
                        {this.state.data ?
                            this.state.data.map((item, i) =>
                                <>
                                    {
                                        Object.entries(item[1].snapshots).map((snapshots, j) =>

                                            <div key={i + '_' + j}
                                                className={
                                                    (item[0] + '_' + i) +
                                                    " " +
                                                    (snapshots[0] + '_' + i + '_' + j) +
                                                    " detailCard poseRelative " +
                                                    (this.state.displaybleData && this.state.displaybleData.includes(snapshots[0]) ? "d-block" : "d-none")
                                                }

                                            >
                                                <Accordion>
                                                <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls={"panel" + i + '-' + j + "a" + "-content"}
                                                        id={"panel" + i + '-' + j + "d" + "-header"}
                                                        >
                                                            <h5>{snapshots[1].name}</h5>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <div className="mt-3">
                                                                <h5>Information</h5>
                                                                <ListGroup key={i}>
                                                                <ListGroupItem><span className="font-weight-500">ID: </span>{snapshots[1].id}</ListGroupItem>
                                                                <ListGroupItem><span className="font-weight-500">Date: </span>{snapshots[1].StartTime}</ListGroupItem>
                                                                <ListGroupItem><span className="font-weight-500">Description: </span>{snapshots[1].Description}</ListGroupItem>
                                                                <ListGroupItem><span className="font-weight-500">State: </span>{snapshots[1].State}</ListGroupItem>
                                                                <ListGroupItem><span className="font-weight-500">Encrypted: </span>{snapshots[1].Encrypted && snapshots[1].Encrypted ? "Yes" : "No"}</ListGroupItem>
                                                                <ListGroupItem><span className="font-weight-500">Volume: </span>{snapshots[1].VolumeId}</ListGroupItem>
                                                                <ListGroupItem><span className="font-weight-500">Is public: </span>{snapshots[1].public ? "yes" : "No"}</ListGroupItem>
                                                                </ListGroup>
                                                            </div>
                                                        </AccordionDetails>

                                                {/* <span onClick={(event) => this._dataContextUtil.toggleHeight(event)} className='posAbs moreDetailsBtn'>
                                                    <img className="img-fluid" src={require("../../assets/updown.svg")} />
                                                </span> */}
                                                    </Accordion>
                                            </div>

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