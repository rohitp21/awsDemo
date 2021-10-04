import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Table, Nav, NavItem, NavLink, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import UtilClass from '../../SupportingJs/Util'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
export default class S3Buckets extends Component {
    _dataContextUtil = new UtilClass();
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            data: this.props.data,
            showAll: true,
            showThis: undefined,
            displaybleData: this.props.displayableData
        }
    }
    async componentDidMount() {
        //this.getData()
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
                                            // (this.state.showThis === item[1].name ? "active " : null)
                                        }
                                            onClick={() => {
                                                this.toggle(item[0] + '_' + i);
                                            }}>{item[1].name}
                                        </NavLink>
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
                                        <BreadcrumbItem className="link" onClick={() => this.props.history.goBack()} tag="a"> {this.props.whichDataToFetch} Dashboard</BreadcrumbItem>
                                        <BreadcrumbItem tag="a">{this.props.dbName}</BreadcrumbItem>
                                        <BreadcrumbItem active tag="span">Acc Id: {this.props.accId}</BreadcrumbItem>
                                    </Breadcrumb>
                                </div>
                            </div><hr />
                        </div>
                        {this.state.data ?
                            this.state.data.map((item, i) =>
                                <div key={i}
                                    className={
                                        (item[0] + '_' + i) +
                                        " detailCard poseRelative " +
                                        // (this.state.showAll ? "d-block " : "d-none ") +
                                        // (this.state.showThis === item[1].name ? "d-block " : "d-none ")
                                        (this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                    }
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
                                                <Divider/>
                                                    <div className="pt-3">
                                                        <h4>Information</h4>
                                                        <div>
                                                        <ListGroup key={i}>
                                                            <ListGroupItem className="pb-2 font-weight-500">Region: {item[1].name}</ListGroupItem>
                                                            <ListGroupItem className="pb-2 font-weight-500">Created on: {item[1].CreationDate}</ListGroupItem>
                                                            <ListGroupItem className="pb-2 font-weight-500">Logging: {item[1].logging}
                                                            </ListGroupItem>
                                                            <ListGroupItem className="pb-2 font-weight-500">Default encryption: {item[1].default_encryption_enabled ? "True" : "False"}</ListGroupItem>
                                                            <ListGroupItem className="pb-2 font-weight-500">Versioning: {item[1].versioning_status_enabled ? "True" : "False"}</ListGroupItem>
                                                            <ListGroupItem className="pb-2 font-weight-500">MFA Delete: {item[1].version_mfa_delete_enabled ? "True" : "False"}</ListGroupItem>
                                                            <ListGroupItem className="pb-2 font-weight-500">Secure transport: {item[1].secure_transport_enabled ? "True" : "False"}</ListGroupItem>
                                                            <ListGroupItem className="pb-2 font-weight-500">Static website hosting: {item[1].web_hosting_enabled ? "True" : "False"}</ListGroupItem>
                                                        </ListGroup>
                                                        </div>
                                                    </div>
                                                    <Divider/>
                                                    <div className="pt-3">
                                                        <h5>Bucket Policy</h5>
                                                        <code className="mb-0">{
                                                            item[1].policy && Object.entries(JSON.stringify(item[1].policy.Statement)).map(([key, val]) =>
                                                                <>
                                                                    {val === '{' || val === '}' || val === '[' || val === ']' || val === ',' ?
                                                                        <span>{val}<br /></span>
                                                                        :
                                                                        <span>{val}</span>
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                            {!item[1].policy && <span>No Data Available</span>

                                                            }
                                                        </code>
                                                    </div>
                                                    {item[1].grantees && Object.entries(item[1].grantees).length > 0 &&
                                                        <>
                                                            <Divider />
                                                            <div className="pt-3">
                                                                <h5>Bucket  ACLs</h5>
                                                                <div className="table-container row cust-boxShadow-2 w-100 mx-auto">
                                                                    <Table size="sm" >
                                                                        <thead>
                                                                            <tr>
                                                                                <th className="text-center"></th>
                                                                                <th className="text-center">List</th>
                                                                                <th className="text-center">Upload/Delete</th>
                                                                                <th className="text-center">View Permissions</th>
                                                                                <th className="text-center">Edit Permissions</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                Object.entries(item[1].grantees).map((item, i) =>
                                                                                    <tr key={i}>
                                                                                        <td className="text-center word-break fs14">{item[1].DisplayName}</td>
                                                                                        <td className="text-center">
                                                                                            <>
                                                                                                {item[1].read ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
                                                                                            </>
                                                                                        </td>
                                                                                        <td className="text-center">
                                                                                            <>
                                                                                                {item[1].write ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
                                                                                            </>
                                                                                        </td>
                                                                                        <td className="text-center">
                                                                                            <>
                                                                                                {item[1].read_acp ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
                                                                                            </>
                                                                                        </td>
                                                                                        <td className="text-center">
                                                                                            <>
                                                                                                {item[1].write_acp ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
                                                                                            </>
                                                                                        </td>
                                                                                    </tr>
                                                                                )

                                                                            }
                                                                        </tbody>
                                                                    </Table>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                    {item[1].groups && Object.entries(item[1].groups).length > 0 &&
                                                        <>
                                                            <hr />
                                                            <div className="pt-3">
                                                                <h5> Groups with access via IAM policies</h5>
                                                                <div className="table-container row cust-boxShadow-2 w-100 mx-auto">
                                                                    <Table size="sm">
                                                                        <thead>
                                                                            <tr>
                                                                                <th className="text-center">Groups Name</th>
                                                                                <th className="text-center">Policy Name</th>
                                                                                <th className="text-center">Condition?</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                item[1].groups && Object.entries(item[1].groups).map((group, i) =>
                                                                                    group[1].policies && Object.entries(group[1].policies).map((policy, i) =>
                                                                                        <tr key={i}>
                                                                                            <td className="text-center word-break fs14">{group[0]}</td>
                                                                                            <td className="text-center word-break fs14">{policy[0]}</td>
                                                                                            <td className="text-center word-break fs14">{policy[1].condition ? "True" : "False"}</td>
                                                                                        </tr>
                                                                                    )
                                                                                )

                                                                            }
                                                                        </tbody>
                                                                    </Table>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                    {item[1].roles && Object.entries(item[1].roles).length > 0 &&
                                                        <>
                                                            <hr />
                                                            <div className="pt-3">
                                                                <h5> Roles with access via IAM policies</h5>
                                                                <div className="table-container row cust-boxShadow-2 w-100 mx-auto">
                                                                    <Table size="sm">
                                                                        <thead>
                                                                            <tr>
                                                                                <th className="text-center">Role Name</th>
                                                                                <th className="text-center">Policy Name</th>
                                                                                <th className="text-center">Condition?</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                item[1].roles && Object.entries(item[1].roles).map((roles, i) =>
                                                                                    roles[1].policies && Object.entries(roles[1].policies).map((policy, i) =>
                                                                                        <tr key={i}>
                                                                                            <td className="text-center word-break fs14">{roles[0]}</td>
                                                                                            <td className="text-center word-break fs14">{policy[0]}</td>
                                                                                            <td className="text-center word-break fs14">{policy[1].condition ? "True" : "False"}</td>
                                                                                        </tr>
                                                                                    )
                                                                                )

                                                                            }
                                                                        </tbody>
                                                                    </Table>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                    {Object.entries(item[1].users).length > 0 &&
                                                        <>
                                                            <hr />
                                                            <div className="pt-3">
                                                                <h5> Users with access via IAM policies</h5>
                                                                <div className="table-container row cust-boxShadow-2 w-100 mx-auto">
                                                                    <Table size="sm">
                                                                        <thead>
                                                                            <tr>
                                                                                <th className="text-center">User Name</th>
                                                                                <th className="text-center">Policy Name</th>
                                                                                <th className="text-center">Condition?</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                Object.entries(item[1].users).map((users, i) =>
                                                                                    Object.entries(users[1].policies).map((policy, i) =>
                                                                                        <tr key={i}>
                                                                                            <td className="text-center word-break fs14">{users[0]}</td>
                                                                                            <td className="text-center word-break fs14">{policy[0]}</td>
                                                                                            <td className="text-center word-break fs14">{policy[1].condition ? "True" : "False"}</td>
                                                                                        </tr>
                                                                                    )
                                                                                )

                                                                            }
                                                                        </tbody>
                                                                    </Table>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </AccordionDetails>
                                                    {/* <span onClick={(event) => this._dataContextUtil.toggleHeight(event)} className='posAbs moreDetailsBtn'>
                                        <img className="img-fluid" src={require("../../assets/updown.svg")} />
                                    </span> */}
                                            </Accordion>
                                
                                </div>
                            )
                            : null
                        }
                    </Col>
                </Row>
            </div >
        )
    }
}