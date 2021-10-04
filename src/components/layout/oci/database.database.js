import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, Card, CardSubtitle, CardTitle, CardBody, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import UtilClass from '../../SupportingJs/Util'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
export default class OCIDatabase extends Component {
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
        this.showAll()
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
                                                item[1] && Object.entries(item[1].db_system).map((v, j) =>
                                                    <NavItem key={j}>
                                                        <NavLink className={'innerA '
                                                            //(this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                                            // (this.state.showThis == item[1].name ? "active " : null)
                                                        }
                                                            onClick={() => {
                                                                this.toggle(v[0] + '_' + i + '_' + j);
                                                            }}>
                                                            {v[1].display_name}


                                                        </NavLink>
                                                        <Nav vertical className="bgWhite  ml-4">
                                                            {
                                                                v[1] && v[1].databases.map((db, k) =>
                                                                    <NavItem key={k} className={
                                                                        (this.state.displaybleData && this.state.displaybleData.includes(v[0]) ? "d-block" : "d-none")
                                                                    }>
                                                                        <NavLink onClick={() => {
                                                                            this.toggle(db.db_name + '_' + i + '_' + j + '_' + k);
                                                                        }} className="fs14">{db.db_name}</NavLink>
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
                                        Object.entries(item[1].db_system).map((v, j) =>
                                            <>
                                                {
                                                    v[1].databases.map((db, k) =>

                                                        <div key={i + '_' + j + '_' + k}
                                                            className={
                                                                (item[0] + '_' + i) +
                                                                " " +
                                                                (v[0] + '_' + i + '_' + j) +
                                                                " detailCard poseRelative " +
                                                                (db.db_name + '_' + i + '_' + j + '_' + k) +
                                                                " " +
                                                                (this.state.displaybleData && this.state.displaybleData.includes(v[0]) ? "d-block" : "d-none")
                                                            }

                                                        >

                                                            <Accordion>
                                                                <AccordionSummary
                                                                    expandIcon={<ExpandMoreIcon />}
                                                                    aria-controls={"panel" + i + '_' + j + "a" + "-content"}
                                                                    id={"panel" + i + '_' + j + "d" + "-header"}
                                                                >
                                                                    <h5>{db.db_name}</h5>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <div className="px-2 py-1">
                                                                        <Divider />
                                                                        <div className="p-3">
                                                                            <h4 className="pb-2 font-weight-500">Information</h4>


                                                                            <CardSubtitle className="pb-2"><span className="font-weight-500">ID:</span> {db.id ? db.id : "None"}</CardSubtitle>
                                                                            <CardSubtitle className="pb-2"><span className="font-weight-500">Created on:</span> {db.time_created ? db.time_created : "None"}</CardSubtitle>
                                                                            <CardSubtitle className="pb-2"><span className="font-weight-500">Db System Id:</span> {db.db_system_id ? db.db_system_id : "None"}</CardSubtitle>
                                                                            <CardSubtitle className="pb-2"><span className="font-weight-500">Db Home Id:</span> {db.db_home_id ? db.db_home_id : "None"}</CardSubtitle>
                                                                            <CardSubtitle className="pb-2"><span className="font-weight-500">lifecycle state:</span> {db.lifecycle_state ? db.lifecycle_state : "None"}</CardSubtitle>
                                                                            <CardSubtitle className="pb-2"><span className="font-weight-500">lifecycle details:</span> {db.lifecycle_details ? db.lifecycle_details : "None"}</CardSubtitle>
                                                                            <CardSubtitle className="pb-2"><span className="font-weight-500">Recovery Window In Days:</span> {db.recovery_window_in_days ? db.recovery_window_in_days : "None"}</CardSubtitle>
                                                                            <CardSubtitle className="pb-2"><span className="font-weight-500">Ncharacter Set:</span> {db.ncharacter_set ? db.ncharacter_set : "None"}</CardSubtitle>
                                                                            <CardSubtitle className="pb-2"><span className="font-weight-500">Auto Backup Enabled:</span> {db.auto_backup_enabled ? "Yes" : "No"}</CardSubtitle>
                                                                            <CardSubtitle className="pb-2"><span className="font-weight-500">Db Unique Name:</span> {db.db_unique_name ? db.db_unique_name : "None"}</CardSubtitle>
                                                                            <CardSubtitle className="pb-2"><span className="font-weight-500">Db Workload:</span> {db.db_workload ? db.db_workload : "None"}</CardSubtitle>
                                                                            <CardSubtitle className="pb-2"><span className="font-weight-500">Last Backup Timestamp:</span> {db.last_backup_timestamp ? db.last_backup_timestamp : "None"}</CardSubtitle>
                                                                            <CardSubtitle className="pb-2"><span className="font-weight-500">VM Cluster Id:</span> {db.vm_cluster_id ? db.vm_cluster_id : "None"}</CardSubtitle>
                                                                            <CardSubtitle className="pb-2"><span className="font-weight-500">PDb Name:</span> {db.pdb_name ? db.pdb_name : "None"}</CardSubtitle>


                                                                        </div><hr />
                                                                        <div className="p-3">
                                                                            <h4 className="pb-2 font-weight-500">Defined Tags ({Object.entries(db.defined_tags).length})</h4>
                                                                            {
                                                                                Object.entries(db.defined_tags).length > 0 && Object.entries(db.defined_tags).map((tags, s) =>
                                                                                    <div>
                                                                                        <CardSubtitle className="pb-2">{tags[0]} </CardSubtitle>
                                                                                    </div>
                                                                                )
                                                                            }

                                                                        </div><hr />
                                                                        <div className="p-3">
                                                                            <h4 className="pb-2 font-weight-500">Freeform Tags ({Object.entries(db.freeform_tags).length})</h4>
                                                                            {
                                                                                Object.entries(db.freeform_tags).length > 0 && Object.entries(db.freeform_tags).map((tags, s) =>
                                                                                    <div>
                                                                                        <CardSubtitle className="pb-2 font-weight-500">{tags[1]} </CardSubtitle>
                                                                                    </div>
                                                                                )
                                                                            }

                                                                        </div><hr />
                                                                        <div className="p-3">

                                                                            <h4 className="pb-2 font-weight-500">Db Backup Config  ({Object.entries(db.db_backup_config).length})</h4>
                                                                            {db.db_backup_config ?

                                                                                Object.entries(db.db_backup_config).map(([key, val]) =>
                                                                                    <div>

                                                                                        <span>{key}: </span><span>{val ? val : "None"}</span>
                                                                                    </div>
                                                                                )
                                                                                :
                                                                                "None"

                                                                            }

                                                                        </div><hr />
                                                                        <div className="p-3">
                                                                            <h4 className="pb-2 font-weight-500">Connection Strings  ({Object.entries(db.connection_strings).length})</h4>
                                                                            {db.connection_strings ?

                                                                                Object.entries(db.connection_strings).map(([key, val]) =>
                                                                                    <div>

                                                                                        <span className="font-weight-500">{key}: </span>
                                                                                        <span>
                                                                                            {
                                                                                                val && typeof (val) == "object" && <div className="ml-4">
                                                                                                    {Object.entries(val).map(([key, val]) =>
                                                                                                        <div><span className="font-weight-500">{key}: </span><span >{val}</span></div>
                                                                                                    )}

                                                                                                </div>

                                                                                                ||

                                                                                                val && typeof (val) == "string" && <span>{val}</span>





                                                                                            }

                                                                                        </span>
                                                                                    </div>
                                                                                )
                                                                                :
                                                                                "None"

                                                                            }

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