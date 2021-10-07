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
        // this.blockUi();
        // await axios.get(Constants.URLSERVER + "getsummary/" + accId).then(response => {
        //     console.log(response);
        //     let respdata = response.data
        //     //this.props.history.push('/acc_data', respdata);
        //     respdata.data.accId = accId;
        //     //this.props.history.push('/cloudDashboard', respdata);
        //     this.props.history.push('/awsservices', respdata);
        // }).catch(error => {
        //     let respdata = "NE"
        //     console.log(error);
        // })
        // this.unBlockUi()
        this.props.history.push('/awsservices', {
            accId: accId
        });

    };
    blockUi = () => {
        this.setState({
            isLoading: true,
        });
    };
    unBlockUi = () => {
        this.setState({
            isLoading: false,
        });
    };

    render() {
        return (
            <div>
                <Header />
                <BlockUi tag="div" blocking={this.state.isLoading} />
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