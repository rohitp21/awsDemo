import React, { Component } from 'react'
import { Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ShowOCIDataSummary from '../../oci/OCIReports/showOCI.summary';
import ShowOCIDataTypes from '../../oci/OCIReports/showOCI.type';
import OCISummaryReports from '../../oci/OCIReports/OCISummaryReports'
import OCISummaryRegion from '../../oci/OCIReports/OCISummaryRegion'

import UtilClass from '../../../SupportingJs/Util'
import ApiService from '../../../../services/APIService'
import * as Constants from '../../../../data/Constants'
import BlockUi from 'react-block-ui';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../../Header';
//import ShowOCISummary from '../../oci/OCIReports/showOCI.summary';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt} from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default class OCISummaryDetails extends Component {
    _dataContext = new ApiService();
    _dataContextUtil = new UtilClass();
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: 0,
            //labels: this.props.location.state.labels2,
            //accId: this.props.location.state.accId,
        };
    }

    async toggle(tab, which) {
        //document.getElementsByClassName('User Policies')[0].click()
        if (this.state.activeTab !== tab) {
            //localStorage.setItem("whichTab",tab)
            this.setState({
                activeTab: tab
            });
        }

        if (which === "reports") {
            let _id = "5f05e831dfc6c3084bee07ff"//"5f09e6920b8ecc04f36c0917"//localStorage.getItem("_id");
            this.blockUi();
            let reportsData = await this._dataContext.getMethod(Constants.URL5 + '/' + _id);
            this.unBlockUi();
            this.setState({ reportsData: reportsData, whichData: which })
        } if (which === "summary") {//later check it type = summary
            let _id = "5f0db9bbb5f5218f1916d852"//"5f09e6920b8ecc04f36c0917"//localStorage.getItem("_id");
            this.blockUi();
            let reportsData = await this._dataContext.getMethod(Constants.URL6 + '/' + _id);
            this.unBlockUi();
            this.setState({ reportsData: reportsData.data, whichData: which })

        }
        if (which === "identity") {//later check it type = summary
            let _id = "5f0db9bbb5f5218f1916d852"//"5f09e6920b8ecc04f36c0917"//localStorage.getItem("_id");
            this.blockUi();
            let reportsData = await this._dataContext.getMethod(Constants.URL7 + '/' + _id);
            this.unBlockUi();
            this.setState({ reportsData: reportsData.data, whichData: which })

        }
        if (which === "regions") {//later check it type = summary
            let _id = "5f0db9bbb5f5218f1916d852"//"5f09e6920b8ecc04f36c0917"//localStorage.getItem("_id");
            this.blockUi();
            let reportsData = await this._dataContext.getMethod(Constants.URL9 + '/' + _id);
            this.unBlockUi();
            this.setState({ reportsData: reportsData.data, whichData: which })

        }
    }
    async componentDidMount() {
        let sDateTemp = localStorage.getItem('sDate');
        if (sDateTemp) {
            let sDate = await this._dataContextUtil.sanitizeDate(new Date(sDateTemp));
            this.setState({ selectedDate: new Date(sDate + " 00:00:00") })
        }else {
            //stDate = await this._dataContextUtil.sanitizeStartDateToISOString(new Date("2020-07-14 00:00:00"));
            //eDate = await this._dataContextUtil.sanitizeEndDateToISOString(new Date("2020-07-14 23:59:59:999"));
            //await this._dataContextUtil.sanitizeDate(new Date(date));
            this.setState({ selectedDate: new Date("2020-07-14" + " 00:00:00") })
        }

        let _id = "5f0db9bbb5f5218f1916d852"//"5f09e6920b8ecc04f36c0917"//localStorage.getItem("_id");
        this.blockUi();
        let data = await this._dataContext.getMethod(Constants.URL8 + '/' + _id);
        this.unBlockUi();
        

        if (data && data !== "NE") {
            this.showToast(Constants.TOAST_DATA_SUCCESS, 'success')
            data.data.types.push({ type: "reports" })// later remove this
        this.setState({ data: data.data })
        let activateFirstMenu = document.querySelectorAll('.active.nav-link')[0];
        if (activateFirstMenu) {
            activateFirstMenu.click()
        }
        } else if (data && data === 'NE') {
            this.showToast(Constants.TOAST_NET_ERR, 'error')
        }
        else {
            this.showToast(Constants.TOAST_SOMETHING_WENT_WRONG, 'error');
        }
        // let activateFirstMenu2 = document.querySelectorAll('.group0')[0];
        // if (activateFirstMenu2){
        //     activateFirstMenu2.click()
        // }
    }
    getComponentToRender = () => {
        if (this.state.whichData === "identity") {
            return <ShowOCIDataTypes whichData={this.state.whichData} data={this.state.reportsData} />
        } else if (this.state.whichData === "summary") {
            return <ShowOCIDataSummary whichData={this.state.whichData} data={this.state.reportsData} />
        } else if (this.state.whichData === "reports") {
            return <OCISummaryReports whichData={this.state.whichData} data={this.state.reportsData} />
        } else if (this.state.whichData === "regions") {
            return <OCISummaryRegion whichData={this.state.whichData} data={this.state.reportsData} />
        }
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
    showToast = (toastText, type) => {
        if (type === 'success') {
            toast.success(toastText, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (type === 'error') {
            toast.error(toastText, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (type === 'warning') {
            toast.warning(toastText, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (type === 'info') {
            toast.info(toastText, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    getSingleDataOnDateChange = async (date) => {
        if (date) {
            let sDate = await this._dataContextUtil.sanitizeDate(new Date(date));
            this.setState({ selectedDate: new Date(sDate + " 00:00:00") })
        }
        if (this.state.selectedTab) {
            if (this.state.selectedTab == -1) {
                this.getComplianceData();
            } else {
                this.getControlsData(this.state.selectedCompance);
            }
        }
    };

    render() {
        // console.log("zzzzzzz"+this.state.labels);
        return (
            <>
                <Header/>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <BlockUi tag="div" blocking={this.state.isLoading} />
                <div className="dashboard-container">
                    <Row>
                        <Col xs="2" sm="1" md="1" className="bgWhite cust-boxShadow-1">
                            <Nav tabs vertical pills className="bgWhite verticalTab browserHeight1 summaryDetailsOCI">
                                <NavItem>

                                    <NavLink
                                        className="backToDashboardIcon"
                                        onClick={() => {
                                            this.props.history.push("/")
                                        }}
                                    >
                                        <img className="img-fluid" src={require("../../../assets/four-squares.svg")} />

                                    </NavLink>
                                </NavItem>
                                {
                                    this.state.data ?
                                        this.state.data.types.map((item, i) =>
                                            <NavItem className="sIconContainer" key={i}>

                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab === i })}
                                                    onClick={() => {
                                                        this.toggle(i, item.type);
                                                    }}
                                                >
                                                    <div>
                                                        {
                                                            item.type !== undefined &&


                                                            <><img className="img-fluid" src={require("../../../assets/img/oci/OCIDetails/" + item.type + ".svg")} /><br /></>

                                                        }
                                                        <span className="fs12">{item.type ? this._dataContextUtil.toTitleCase(item.type) : "Summary"}</span>
                                                    </div>
                                                </NavLink>
                                            </NavItem>
                                        )
                                        :
                                        null
                                }
                            </Nav>
                        </Col>
                        <Col xs="10" sm="11" md="11">
                        <div className="dateFilterContainer poseRelative float-right mr-2">
                                            <FontAwesomeIcon
                                                className="calenderIcon"
                                                color="#0C2461"
                                                icon={faCalendarAlt}
                                            />
                                           
                                                <DatePicker
                                                    placeholderText="Select Date"
                                                    selected={this.state.selectedDate}
                                                    onChange={this.getSingleDataOnDateChange}
                                                />
                                            
                                        </div>
 
                            {this.getComponentToRender()}</Col>

                    </Row>
                </div>
            </>
        )
    }
}
