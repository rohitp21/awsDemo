import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faExternalLinkAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Collapse, NavLink, Col, Table } from 'reactstrap';//later make seperate component
import { withRouter } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";
import ApiService from '../../services/APIService'
import UtilClass from '../SupportingJs/Util'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

class Dashboard extends Component {
    _dataContext = new ApiService();
    _dataContextUtil = new UtilClass();
    constructor(props) {
        super(props)
    }
    state = {
        summary: [],
        accIdList: [],
        cloudTypeList: [],
        dateFilter: 1,
        date1: undefined,
        date2: undefined,
        isLoading: false,
        providerType: '',
        category: [],
        activeTab: '2',
        activeTabDateRange: '1',
        showCompliance: "0",
        isOpen: true
    }

    blockUi = () => {
        this.setState({
            isLoading: true
        })
    }
    unBlockUi = () => {
        this.setState({
            isLoading: false
        })
    }
    toggleCD = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    scrolldiv =()=> {
        window.scrollTo(0,
            this.findPosition(document.getElementById("inverseBorderedcis1.0.0")));
    }
    findPosition(obj) {
        var currenttop = 0;
        if (obj.offsetParent) {
            do {
                currenttop += obj.offsetTop;
            } while ((obj = obj.offsetParent));
            return [currenttop];
        }
    }
    render() {
        return (
            <div>
                <BlockUi tag="div" blocking={this.state.isLoading} />

                <div className="dashboard-container noDataContainer  custWidth1 h-100">
                    <span className="collapsible_Container">
                        <FontAwesomeIcon className="float-right" onClick={this.toggleCD} icon={faChevronDown} />
                    </span>
                    <div className="mx-auto p-2 text-left">Compliance  Overview</div>
                    <Col md="12" className="p-0">
                        <div className="table-container table-responsive row  w-100 mx-auto">
                            {this.props.data && this.props.data.length > 0 ?


                                <Collapse isOpen={this.state.isOpen}>
                                    <Table hover className="complianceStandardTable">
                                        <thead>
                                            <tr>
                                                <th>Compliance Standard</th>
                                                {/* <th>Description</th>
                                            <th>Policies</th> */}
                                                <th>Rules Count</th>
                                                <th><FontAwesomeIcon className="fs12" icon={faInfoCircle} /> Resources Count</th>
                                                <th><FontAwesomeIcon className="fs12 colorSuccess" icon={faInfoCircle} /> Checked Items</th>
                                                <th><FontAwesomeIcon className="fs12 colorWarning" icon={faInfoCircle} /> Flagged Items</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.data.map((item) =>
                                                <tr>
                                                    <td><NavLink className="linkStyle">{this._dataContextUtil.toUpperCase(item.compliance)} <FontAwesomeIcon className="fs12" icon={faExternalLinkAlt} /></NavLink></td>
                                                    <td>{item.rules_count}</td>
                                                    <td>{item.resources_count}</td>
                                                    <td>{item.checked_items}</td>
                                                    <td>{item.flagged_items}</td>
                                                </tr>

                                            )
                                            }
                                        </tbody>
                                    </Table>
                                </Collapse>
                                :
                                <div className="text-center my-5">Loading....</div>
                            }
                        </div>
                    </Col>
                </div>
            </div>
        )
    }
}
export default withRouter(Dashboard)

