import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, Card, CardSubtitle, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import UtilClass from '../../SupportingJs/Util'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
export default class IdentityUsers extends Component {
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
        let detailCard = document.getElementsByClassName('detailCard')
        for (var i = 0; i < detailCard.length; i++) {
            detailCard[i].classList.remove("d-none")
            detailCard[i].classList.add("d-block")
            if (i === tab) {
                // detailCard[i].classList.remove("d-none")
            } else {
                detailCard[i].classList.remove("d-block")
                detailCard[i].classList.add("d-none")
            }
        }
    }
    showAll() {
        let elements = document.getElementsByClassName('innerA');
        let detailCard = document.getElementsByClassName('detailCard');
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
                    <Col xs="3" sm="3" md="3" className="bgWhite serviceThirdLevelUl">
                        <Nav vertical className="browserHeight1  bgWhite">
                            <NavItem>
                                <NavLink
                                    className={
                                        (this.state.showAll ? "active " : null)}

                                    onClick={() => {
                                        this.showAll()
                                    }}> Show All({this.state.data.length})</NavLink>
                            </NavItem>
                            {this.state.data ?
                                this.state.data.map((item, i) =>
                                    <NavItem >
                                        <NavLink className={'innerA ' +
                                            (this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                            // (this.state.showThis === item[1].name ? "active " : null)
                                        }
                                            onClick={() => {
                                                this.toggle(i);
                                            }}>{item[1].name}</NavLink>
                                    </NavItem>
                                )
                                :
                                null
                            }
                        </Nav>
                    </Col>
                    <Col xs="9" sm="9" md="9">
                        {/* select view  starts */}
                        <div className="dashboard-container container p-0  full_max_width">
                            <div className="row p-0">
                                <div className="col-md-12">
                                    <Breadcrumb tag="nav" listTag="div">
                                        <BreadcrumbItem className="link" onClick={() => this.props.history.push("/")} tag="a">Dashboard</BreadcrumbItem>
                                        <BreadcrumbItem className="link" onClick={() => this.props.history.goBack()} tag="a">{this.props.whichDataToFetch}</BreadcrumbItem>
                                        <BreadcrumbItem tag="a">{this.props.dbName}</BreadcrumbItem>
                                        <BreadcrumbItem active tag="span">Acc Id: {this.props.accId}</BreadcrumbItem>
                                    </Breadcrumb>
                                </div>
                            </div><hr />
                        </div>
                        {this.state.data ?
                            this.state.data.map((item, i) =>
                                <div
                                    className={
                                        "detailCard m-3 poseRelative " +
                                        // (this.state.showAll ? "d-block " : "d-none ") +
                                        // (this.state.showThis === item[1].name ? "d-block " : "d-none ")
                                        (this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                    }
                                    key={i}
                                >

                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={"panel" + i + "a" + "-content"}
                                            id={"panel" + i + "d" + "-header"}
                                        >
                                            <h5>{item[1].name}</h5>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className="px-2 py-1">
                                                <Divider />
                                                <div className="p-3">
                                                    <CardSubtitle className="pb-2 font-weight-500">Information</CardSubtitle>
                                                    <CardText className="mb-0">Name: {item[1].name}</CardText>
                                                    <CardText className="mb-0">ID: {item[1].id}</CardText>
                                                </div><hr />
                                                <div className="p-3">
                                                    <CardSubtitle className="font-weight-500">API Keys</CardSubtitle>
                                                    {
                                                        Object.entries(item[1].api_keys).map((item2, i) =>
                                                            <div>
                                                                <div className="m-1"><span className="font-weight-500">fingerprint:</span><span>{item2[1].fingerprint}</span>
                                                                </div>
                                                                <div className="m-1"><span className="font-weight-500">State:</span><span>{item2[1].state}</span></div>

                                                            </div>
                                                        )
                                                        // Object.keys(item[1].api_keys).map(function(objectKey, index) {
                                                        //     var temoObj = item[1].api_keys[objectKey];
                                                        //     Object.keys(temoObj).map(function(objectKey2, i2) {
                                                        //         var val =  temoObj[objectKey2];
                                                        //         var k = objectKey2;  
                                                        //     })
                                                        // })
                                                    }
                                                </div><hr />
                                                <div className="p-3">
                                                    <CardSubtitle className="font-weight-500">Groups</CardSubtitle>

                                                    <div>

                                                        <span>Administrator</span>

                                                    </div>

                                                </div>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            )
                            : null
                        }

                    </Col>
                </Row>

            </div>
        )
    }
}