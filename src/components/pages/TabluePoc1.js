import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faExternalLinkAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Collapse, NavLink, Col, Table } from 'reactstrap';//later make seperate component
import { withRouter } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";
import ApiService from '../../services/APIService'
import UtilClass from '../SupportingJs/Util'
import BlockUi from 'react-block-ui';
import * as Constants from '../../data/Constants';
import 'react-block-ui/style.css';
import Header from "../layout/Header";
import axios from 'axios';
import { BreadcrumbItem, Breadcrumb } from "reactstrap";
import Divider from '@material-ui/core/Divider';
//let data = undefined;
//set withcredeintial true
axios.defaults.withCredentials = true;
class TabluePoc1 extends Component {
    _dataContext = new ApiService();
    _dataContextUtil = new UtilClass();
    constructor(props) {
        super(props);

    }
    state = {
        isOpen: true,
        accList: undefined,
        accList: this.props.location.state.data,
    }
    onAccClick = async (accId) => {
        await axios.get(Constants.URLSERVER + "getsummary/" + accId).then(response => {
            console.log(response);
            let respdata = response.data
            //this.props.history.push('/acc_data', respdata);
            respdata.data.accId = accId;
            //this.props.history.push('/cloudDashboard', respdata);
            this.props.history.push('/awsservices', respdata);
        }).catch(error => {
            let respdata = "NE"
            console.log(error);
        })
         //this.props.history.push('/acc_data', {'accId':accId});

    };
    // async componentDidMount() {
    //     this.setState({ accList: [
    //             {
    //                 "_id": "5f73199724d04ed2cc3c2ff1",
    //                 "name": "AWS DEV 1",
    //                 "alias": "tricksvibe",
    //                 "account_id": "887220118845",
    //                 "cloud_platform": "aws",
    //                 "expired": true,
    //                 "created_at": "2020-09-29 16:49:26.053000",
    //                 "updated_at": "2020-09-29 16:49:26.053000"
    //             },
    //             {
    //                 "_id": "5f731cac24d04ed2cc3c2ff3",
    //                 "name": "AWS DEV 2",
    //                 "alias": "kapstoneoci",
    //                 "account_id": "ocid1.tenancy.oc1..aaaaaaaacudtc5lvvcuvpme3nutywjxxreo3g2e2mwsj4vy2djwpihyvb37q",
    //                 "cloud_platform": "oci",
    //                 "expired": true,
    //                 "created_at": "2020-09-29 16:49:26.053000",
    //                 "updated_at": "2020-09-29 16:49:26.053000"
    //             },
    //             {
    //                 "_id": "5f731cdb24d04ed2cc3c2ff4",
    //                 "name": "AWS DEV 3",
    //                 "alias": "mishraamrish",
    //                 "account_id": "ocid1.tenancy.oc1..aaaaaaaaln6gnfrdfpmw2z7piftu2f66dxvwpagqdqvrpqwhrht6kcr6mg6q",
    //                 "cloud_platform": "oci",
    //                 "expired": true,
    //                 "created_at": "2020-09-29 16:49:26.053000",
    //                 "updated_at": "2020-09-29 16:49:26.053000"
    //             },
    //             {
    //                 "_id": "5f77727424d04ed2cc3c2ff5",
    //                 "name": "AWS DEV 4",
    //                 "alias": "mishraamrish",
    //                 "account_id": "46974511-52b7-442e-bbaa-f9b4f963e645",
    //                 "cloud_platform": "azure",
    //                 "expired": true,
    //                 "created_at": "2020-09-29 16:49:26.053000",
    //                 "updated_at": "2020-09-29 16:49:26.053000"
    //             },
    //             {
    //                 "_id": "5ff7183091687be571178275",
    //                 "name": "AWS DEV 5",
    //                 "alias": "kapstonellc",
    //                 "account_id": "904821997617",
    //                 "cloud_platform": "aws",
    //                 "expired": false,
    //                 "created_at": "2021-01-07 14:18:24.608000",
    //                 "updated_at": "2021-01-07 14:18:24.608000"
    //             }
    //         ]
    //      })



    // }

    render() {
        return (
            <div>
                <Header />
                <div className="col-md-12">
                        <Breadcrumb tag="nav" listTag="div">
                            <BreadcrumbItem
                                className="link"
                                onClick={() => this.props.history.push("/")}
                                tag="a"
                            >
                                Go to Discover
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <Divider />
                <div className="dashboard-container noDataContainer  custWidth1 h-100">
                   
                    <span className="collapsible_Container">
                        <FontAwesomeIcon className="float-right" onClick={this.toggleCD} icon={faChevronDown} />
                    </span>
                    <div className="mx-auto p-2 text-center">List of AWS Accounts</div>
                    <Col md="12" className="p-0">
                        <div className="table-container table-responsive row  w-100 mx-auto">
                            {/* {this.props.data && this.props.data.length > 0 ? */}


                            <Collapse isOpen={this.state.isOpen}>
                                <Table hover className="complianceStandardTable">
                                    <thead>
                                        <tr>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.accList && this.state.accList.map((item, i) =>
                                            <tr key={i}>
                                                <td><NavLink className="linkStyle" onClick={() => this.onAccClick(item.account_id)}>AWS Account Id: {this._dataContextUtil.toUpperCase(item.account_id)} <FontAwesomeIcon className="fs12" icon={faExternalLinkAlt} /></NavLink></td>
                                            </tr>

                                        )
                                        }
                                    </tbody>
                                </Table>
                            </Collapse>
                            {/* : */}
                            {/* <div className="text-center my-5">Loading....</div> */}
                            {/* } */}
                        </div>
                    </Col>
                </div>

            </div>
        )
    }
}
export default withRouter(TabluePoc1)