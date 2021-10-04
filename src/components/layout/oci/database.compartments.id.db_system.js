import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, Card, CardSubtitle, CardTitle, CardBody, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import UtilClass from '../../SupportingJs/Util'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
export default class DBSystems extends Component {
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
        let elements = document.querySelectorAll('.serviceThirdLevelUl .nav-item,.serviceThirdLevelUl .nav-link');
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
                                    }
                                    onClick={() => {
                                        this.showAll()
                                    }}> Show All({this.state.data.length})</NavLink>
                            </NavItem>


                            {this.state.data ?
                                this.state.data.map((item, i) =>
                                    <NavItem key={i}>
                                        <NavLink className={'blackColor-1 innerA font-weight-500 bg1 bt-1'
                                        }
                                            onClick={() => {
                                                this.toggle(item[0] + '_' + i);
                                            }}>{item[1].name}
                                        </NavLink>
                                        <Nav vertical className="bgWhite ml-2">
                                            {
                                                item[1] && Object.entries(item[1].db_system).map((v, j) =>
                                                    <NavItem key={j}>
                                                        <NavLink className={'innerA ' +
                                                            (this.state.displaybleData && this.state.displaybleData.includes(v[0]) ? "d-block" : "d-none")
                                                        }
                                                            onClick={() => {
                                                                this.toggle(v[0] + '_' + i + '_' + j);
                                                            }}>
                                                            {v[1].display_name}


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


                                                    <div key={i + '_' + j}
                                                        className={
                                                            (item[0] + '_' + i) +
                                                            " " +
                                                            (v[0] + '_' + i + '_' + j) +
                                                            " detailCard poseRelative " +
                                                            (this.state.displaybleData && this.state.displaybleData.includes(v[0]) ? "d-block" : "d-none")
                                                        }

                                                    >
                                                        <Accordion>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls={"panel" + i + '_' + j + "a" + "-content"}
                                                                id={"panel" + i + '_' + j + "d" + "-header"}
                                                            >
                                                                <h5>{v[1].display_name}</h5>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <div className="px-2 py-1">
                                                                    <Divider />
                                                                    <div className="p-3">
                                                                        <h4 className="pb-2 font-weight-500">Information</h4>


                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">ID:</span> {v[1].id ? v[1].id : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Availability Domain:</span> {v[1].availability_domain ? v[1].availability_domain : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Backup Subnet Id:</span> {v[1].backup_subnet_id ? v[1].backup_subnet_id : "None"}</CardSubtitle>

                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Cluster Name:</span> {v[1].cluster_name ? v[1].cluster_name : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Compartment Id:</span> {v[1].compartment_id ? v[1].compartment_id : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Data Storage Percentage:</span> {v[1].data_storage_percentage ? v[1].data_storage_percentage : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Data Storage Size In Gbs:</span> {v[1].data_storage_size_in_gbs ? v[1].data_storage_size_in_gbs : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Database Edition:</span> {v[1].database_edition ? v[1].database_edition : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Disk Redundancy:</span> {v[1].disk_redundancy ? v[1].disk_redundancy : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Domain:</span> {v[1].domain ? v[1].domain : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Last Maintenance Run Id:</span> {v[1].last_maintenance_run_id ? v[1].last_maintenance_run_id : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Last Patch History Entry Id:</span> {v[1].last_patch_history_entry_id ? v[1].last_patch_history_entry_id : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">License Model:</span> {v[1].license_model ? v[1].license_model : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Listener Port:</span> {v[1].listener_port ? v[1].listener_port : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Maintenance Window:</span> {v[1].maintenance_window ? v[1].maintenance_window : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Next Maintenance Run_id:</span> {v[1].next_maintenance_run_id ? v[1].next_maintenance_run_id : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Node Count:</span> {v[1].node_count ? v[1].node_count : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Scan DNS Record Id:</span> {v[1].scan_dns_record_id ? v[1].scan_dns_record_id : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Shape:</span> {v[1].shape ? v[1].shape : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Sparse Diskgroup:</span> {v[1].sparse_diskgroup ? v[1].sparse_diskgroup : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Created on:</span> {v[1].time_created ? v[1].time_created : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Db Home Id:</span> {v[1].db_home_id ? v[1].db_home_id : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">lifecycle state:</span> {v[1].lifecycle_state ? v[1].lifecycle_state : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">lifecycle details:</span> {v[1].lifecycle_details ? v[1].lifecycle_details : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Recovary Storage Size In Gb:</span> {v[1].reco_storage_size_in_gb ? v[1].reco_storage_size_in_gb : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">CPU Core Count:</span> {v[1].cpu_core_count ? v[1].cpu_core_count : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Time Zone:</span> {v[1].time_zone ? v[1].time_zone : "None"}</CardSubtitle>
                                                                        <CardSubtitle className="pb-2"><span className="font-weight-500">Version:</span> {v[1].version ? v[1].version : "None"}</CardSubtitle>

                                                                    </div><hr />
                                                                    <div className="p-3">
                                                                        <h4 className="pb-2 font-weight-500">Defined Tags ({Object.entries(v[1].defined_tags).length})</h4>
                                                                        {Object.entries(v[1].defined_tags).length !== 0 ?

                                                                            Object.entries(v[1].defined_tags).map(([key, val]) =>
                                                                                <div>

                                                                                    <span>{key}</span>
                                                                                </div>
                                                                            )
                                                                            :
                                                                            "None"

                                                                        }

                                                                    </div><hr />
                                                                    <div className="p-3">
                                                                        <h4 className="pb-2 font-weight-500">Freeform Tags ({Object.entries(v[1].freeform_tags).length})</h4>

                                                                        {v[1].freeform_tags ?

                                                                            Object.entries(v[1].freeform_tags).map(([key, val]) =>
                                                                                <div>

                                                                                    <span>{key}: </span><span>{val ? val : "None"}</span>
                                                                                </div>
                                                                            )
                                                                            :
                                                                            "None"

                                                                        }

                                                                    </div><hr />
                                                                    <div className="p-3">

                                                                        <h4 className="pb-2 font-weight-500">Fault Domains  ({v[1].fault_domains.length})</h4>
                                                                        {v[1].fault_domains.length > 0 ?

                                                                            v[1].fault_domains.map((val, i) =>
                                                                                <div>

                                                                                    <span>{val}</span>
                                                                                </div>
                                                                            )
                                                                            :
                                                                            "None"

                                                                        }

                                                                    </div><hr />
                                                                    <div className="p-3">

                                                                        <h4 className="pb-2 font-weight-500">SSH Public Keys ({v[1].ssh_public_keys.length})</h4>
                                                                        {v[1].ssh_public_keys.length > 0 ?

                                                                            v[1].ssh_public_keys.map((val, i) =>
                                                                                <div>

                                                                                    <span>{val}</span>
                                                                                </div>
                                                                            )
                                                                            :
                                                                            "None"

                                                                        }

                                                                    </div><hr />
                                                                    <div className="p-3">
                                                                        <h4 className="pb-2 font-weight-500">Db System Options  ({Object.entries(v[1].db_system_options).length})</h4>
                                                                        {Object.entries(v[1].db_system_options) ?

                                                                            Object.entries(v[1].db_system_options).map(([key, val]) =>
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