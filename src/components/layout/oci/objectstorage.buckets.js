import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, Card, CardSubtitle, CardTitle, CardBody, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import UtilClass from '../../SupportingJs/Util'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
export default class ObjectStorageBuckets extends Component {
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
                                    onClick={() => {
                                        this.showAll()
                                    }}> Show All({this.state.data.length})</NavLink>
                                {/* <hr className="mb-0" /> */}
                            </NavItem>
                            {this.state.data &&
                                this.state.data.map((item, i) =>

                                    <NavItem key={i}>
                                        <NavLink className={'bt-1 innerA font-weight-500 bg1'
                                        }
                                            onClick={() => {
                                                this.toggle(item[0] + '_' + i);
                                            }}>{item[1].name}
                                        </NavLink>
                                        <Nav vertical className="bgWhite ml-2">
                                            {
                                                item[1] && Object.entries(item[1].buckets).map((bucket, j) =>
                                                    <NavItem key={bucket[0] + '_' + i + '_' + j}>
                                                        <NavLink className={'innerA ' +
                                                            (this.state.displaybleData && this.state.displaybleData.includes(bucket[0]) ? "d-block" : "d-none")
                                                        }
                                                            onClick={() => {
                                                                this.toggle(bucket[0] + '_' + i + '_' + j);
                                                            }}>{bucket[1].name ? bucket[1].name : bucket[1].fetch_id}
                                                        </NavLink>
                                                    </NavItem>
                                                )

                                            }
                                        </Nav>


                                    </NavItem>

                                )
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
                        {this.state.data &&
                            this.state.data.map((item, i) =>
                                item[1] && Object.entries(item[1].buckets).map((bucket, j) =>
                                    <Card key={bucket[0] + '_' + i + '_' + j}
                                        className={
                                            (item[0] + '_' + i) + " " +
                                            (bucket[0] + '_' + i + '_' + j) +
                                            " detailCard poseRelative " +
                                            (this.state.displaybleData && this.state.displaybleData.includes(bucket[0]) ? "d-block" : "d-none")
                                        }
                                    >
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls={"panel" + i + "a" + "-content"}
                                                id={"panel" + i + "d" + "-header"}
                                            >
                                                <h5>{bucket[1].name ? bucket[1].name : bucket[1].fetch_id}</h5>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="px-2 py-1">
                                                    <Divider />
                                                    <div className="p-3">
                                                        <h4 className="pb-2 font-weight-500">Information</h4>
                                                        <div>

                                                            <CardSubtitle className="pb-2 font-weight-500">Id: {bucket[1].id}
                                                                <CardSubtitle className="pb-2 font-weight-500">Created on: {bucket[1].time_created}</CardSubtitle>
                                                            </CardSubtitle>
                                                            <CardSubtitle className="pb-2 font-weight-500">Compartment Id: {bucket[1].compartment_id}</CardSubtitle>
                                                            <CardSubtitle className="pb-2 font-weight-500">Created By: {bucket[1].created_by}</CardSubtitle>
                                                            <CardSubtitle className="pb-2 font-weight-500">Name Space: {bucket[1].namespace}</CardSubtitle>
                                                            <CardSubtitle className="pb-2 font-weight-500">Storage Tier: {bucket[1].storage_tier}</CardSubtitle>
                                                            <CardSubtitle className="pb-2 font-weight-500">KMS Key: {bucket[1].kms_key_id != null ? "True" : "False"}</CardSubtitle>
                                                            <CardSubtitle className="pb-2 font-weight-500">Public Access Type: {bucket[1].public_access_type}</CardSubtitle>


                                                        </div>
                                                    </div><hr />
                                                    <div className="p-3">
                                                        <h4 className="pb-2 font-weight-500">Defined Tags ({Object.entries(bucket[1].defined_tags).length})</h4>
                                                        {
                                                            Object.entries(bucket[1].defined_tags).length > 0 && Object.entries(bucket[1].defined_tags).map((tags, s) =>
                                                                <div>
                                                                    <CardSubtitle className="pb-2">{tags[0]} </CardSubtitle>
                                                                </div>
                                                            )
                                                        }

                                                    </div><hr />
                                                    <div className="p-3">
                                                        <h4 className="pb-2 font-weight-500">Freeform Tags ({Object.entries(bucket[1].freeform_tags).length})</h4>
                                                        {
                                                            Object.entries(bucket[1].freeform_tags).length > 0 && Object.entries(bucket[1].freeform_tags).map((tags, s) =>
                                                                <div>
                                                                    <CardSubtitle className="pb-2 font-weight-500">{tags[1]} </CardSubtitle>
                                                                </div>
                                                            )
                                                        }

                                                    </div>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>




                                    </Card>
                                )
                            )
                        }
                    </Col>
                </Row>
            </div >
        )
    }
}