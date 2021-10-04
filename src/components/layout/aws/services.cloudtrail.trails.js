import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
//import Data from '../../data/ociData.json'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
export default class CloudTrailTrails extends Component {
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
            displaybleData: this.props.displayableData,
            displaybleData2: this.props.displayableData2,
            id_suffix: this.props.id_suffix
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
        let elements = document.querySelectorAll('.serviceThirdLevelUl .nav-link');
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
                                        <NavLink className={'bt-1 blackColor-1 innerA font-weight-500 bg1'
                                            // (this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                            // (this.state.showThis == item[1].name ? "active " : null)
                                        }
                                            onClick={() => {
                                                this.toggle(item[0] + '_' + i);
                                            }}>{item[1].name}
                                        </NavLink>
                                        <Nav vertical className="bgWhite ml-2">
                                            {
                                                Object.entries(item[1].trails).map((trails, j) =>
                                                    <NavItem key={j}>
                                                        <NavLink className={'innerA ' +
                                                            (trails[1][this.state.id_suffix] !== undefined &&
                                                                //this.state.displaybleData &&
                                                                //this.state.displaybleData.includes(item[0]) &&
                                                                this.state.displaybleData2 &&
                                                                this.state.displaybleData2.includes(trails[0])
                                                                ? "d-block"
                                                                : "d-none")
                                                        }
                                                            onClick={() => {
                                                                this.toggle(trails[0] + '_' + i + '_' + j);
                                                            }}>
                                                            {trails[1].name}

                                                        </NavLink>
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
                        <div className="dashboard-container container p-0  full_max_width">
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
                                        Object.entries(item[1].trails).map((trails, j) =>
                                            <div key={i + '_' + j}
                                                className={
                                                    (item[0] + '_' + i) +
                                                    " " +
                                                    (trails[0] + '_' + i + '_' + j) +
                                                    " detailCard " +
                                                    // (this.state.showAll ? "d-block " : "d-none ") +
                                                    // (this.state.showThis == item[1].name ? "d-block " : "d-none ")
                                                    //(this.state.displaybleData && this.state.displaybleData.includes(item[0]) && this.state.displaybleData2 && this.state.displaybleData2.includes(trails[0])  ? "d-block" : "d-none")
                                                    (trails[1][this.state.id_suffix] !== undefined &&
                                                        //this.state.displaybleData &&
                                                        //this.state.displaybleData.includes(item[0]) &&
                                                        this.state.displaybleData2 &&
                                                        this.state.displaybleData2.includes(trails[0])
                                                        ? "d-block"
                                                        : "d-none")
                                                }
                                            >
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls={"panel" + i + '_' + j + "a" + "-content"}
                                                        id={"panel" + i + '-' + j + "d" + "-header"}
                                                        >
                                                        <h5>{trails[1].name}</h5>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Divider/>
                                                                <h6>Information</h6>
                                                            <div>
                                                            {trails[1].scout_link &&
                                                            <ListGroup key={i}>
                                                                <ListGroupItem>{item[1].region}</ListGroupItem>
                                                                <ListGroupItem>multi-region trail</ListGroupItem>
                                                            </ListGroup>
                                                           
                                                            }
                                                             </div>
                                                            {!trails[1].scout_link &&
                                                            <ListGroup key={i}>
                                                                <ListGroupItem className="pb-2 font-weight-500">Logging:{trails[1].IsLogging ? "Enebled" : "Disabled"}</ListGroupItem>
                                                                <ListGroupItem className="pb-2 font-weight-500">Start Logging Time:{trails[1].StartLoggingTime}</ListGroupItem>
                                                                <ListGroupItem className="pb-2 font-weight-500">Stop Logging Time:{trails[1].StopLoggingTime}</ListGroupItem>
                                                                <ListGroupItem className="pb-2 font-weight-500">Multi Region:{trails[1].IsMultiRegionTrail ? "True" : "False"}</ListGroupItem>
                                                                <ListGroupItem className="pb-2 font-weight-500">Management Events:{trails[1].ManagementEventsEnabled ? "True" : "False"}</ListGroupItem>
                                                                <ListGroupItem className="pb-2 font-weight-500">Data Events:{trails[1].DataEventsEnabled ? "True" : "False"}</ListGroupItem>
                                                                <ListGroupItem className="pb-2 font-weight-500">Include Global Services:{trails[1].IncludeGlobalServiceEvents ? "True" : "False"}</ListGroupItem>
                                                                <ListGroupItem className="pb-2 font-weight-500">Destination S3 Bucket Name:{trails[1].bucket_id}</ListGroupItem>
                                                                <ListGroupItem className="pb-2 font-weight-500">Log File Validation Enabled:{trails[1].LogFileValidationEnabled ? "True" : "False"}</ListGroupItem>
                                                                <ListGroupItem className="pb-2 font-weight-500">KMS Key: {trails[1].KMSKeyId !== null ? "True" : "False"}</ListGroupItem>
                                                            </ListGroup>
                                                            }
                                                        </AccordionDetails>
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