import React, { Component } from 'react'
import { Nav, NavItem, NavLink, Row, Col, Card, CardBody, CardTitle, Progress } from 'reactstrap';
import classnames from 'classnames';
import Header from '../layout/Header'
import * as namesMapping from '../../data/namesMapping'
import * as Constants from '../../data/Constants'
import BlockUi from 'react-block-ui';
import ApiService from '../../services/APIService'
import UtilClass from '../SupportingJs/Util'
import FindingDetails2 from './FindingDetails2';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faExclamationTriangle, faInfoCircle, faExclamationCircle, faPoll, faCheckCircle, faEye, faEyeSlash, faComment, faCommentSlash } from '@fortawesome/free-solid-svg-icons'
import CIS_Dashboard from '../pages/CIS_Dashboard'
import ReactTooltip from "react-tooltip";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Avatar, Divider } from "@material-ui/core";
export default class ComplianceDashboard extends Component {
    _dataContext = new ApiService();
    _dataContextUtil = new UtilClass();
    //_dataContexGetFinding = new GetFindngData();
    //_dataContexGetFinding = new FindingDetails22();

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            compData: undefined,
            groupWiseData: undefined
        };
    }

    async toggle(tab, whichComplinaceType, whichComplinace, linkClass) {
        this.setState({ selectedTab: tab })
        let activeRemove = document.querySelectorAll('.complianceTabs .nav-link.active')
        let activeAdd = document.getElementsByClassName(linkClass)

        if (activeRemove.length > 0) {
            activeRemove[0].classList.remove('active')
        }
        if (activeAdd.length > 0) {
            activeAdd[0].classList.add('active')
            localStorage.setItem('acl', linkClass);
        }
        if (tab === -1) {
            this.getComplianceData();
        } else {
            this.getControlsData(whichComplinace);
        }
        this.setState({ selectedCompanceType: whichComplinaceType, selectedCompance: whichComplinace })

    }
    async componentDidMount() {
        let sDateTemp = localStorage.getItem('sDate');
        if (sDateTemp) {
            let sDate = await this._dataContextUtil.sanitizeDate(new Date(sDateTemp));
            this.setState({ selectedDate: new Date(sDate + " 00:00:00") })
        }
        this.blockUi()
        let providerType = JSON.parse(localStorage.getItem('sA')).cloud_platform;
        let tabData = await this._dataContext.getMethod(Constants.URL11 + providerType);
        this.unBlockUi()
        if (tabData && tabData !== "NE") {
            this.setState({ tabData: tabData.data });
        } else if (tabData && tabData === 'NE') {
            //this.showToast(Constants.TOAST_NET_ERR, 'error')
        }
        else {
            //this.showToast(Constants.TOAST_SOMETHING_WENT_WRONG, 'error');
        }
        let firstNav = document.querySelectorAll('.controlWiseComplianceMain .nav-pills .nav-item .nav-link')[1];
        if (firstNav) {
            firstNav.click()
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
    async getComplianceData() {
        let accId = JSON.parse(localStorage.getItem('sA')).account_id;
        var stDate = undefined;
        var eDate = undefined
        if (this.state.selectedDate) {
            stDate = await this._dataContextUtil.sanitizeStartDateToISOString(this.state.selectedDate);
            eDate = await this._dataContextUtil.sanitizeEndDateToISOString(this.state.selectedDate);
        } else {
            stDate = await this._dataContextUtil.sanitizeStartDateToISOString(new Date("2020-07-14 00:00:00"));
            eDate = await this._dataContextUtil.sanitizeEndDateToISOString(new Date("2020-07-14 23:59:59:999"));
            //await this._dataContextUtil.sanitizeDate(new Date(date));
            this.setState({ selectedDate: new Date("2020-07-14" + " 00:00:00") })
        }
        let param = { "account": accId, "start_date": stDate, "end_date": eDate }
        this.blockUi()
        let compData = await this._dataContext.postMethod(Constants.URL12, param);

        this.unBlockUi()
        if (compData && compData !== "NE") {
            this.setState({ compData: compData.data, isOverview: true });
            localStorage.setItem('_id', compData['_id'])
            localStorage.setItem('sDate', new Date(stDate.substr(0, stDate.indexOf('T'))))
            localStorage.setItem('eDate', new Date(stDate.substr(0, stDate.indexOf('T'))))
        } else if (compData && compData === 'NE') {
            //this.showToast(Constants.TOAST_NET_ERR, 'error')
            this.showToast(Constants.TOAST_Data_Not_Available_Range, 'warning')
            let tempDate = await this._dataContextUtil.sanitizeDate(new Date(localStorage.getItem('sDate')));
            this.setState({ selectedDate: new Date(tempDate + " 00:00:00") })
        }
        else {
            this.showToast(Constants.TOAST_SOMETHING_WENT_WRONG, 'error');
            let tempDate = await this._dataContextUtil.sanitizeDate(new Date(localStorage.getItem('sDate')));
            this.setState({ selectedDate: new Date(tempDate + " 00:00:00") })
        }
    }
    async getControlsData(whichComplinace) {
        this.blockUi()
        let objectId = localStorage.getItem('_id');//JSON.parse(localStorage.getItem('sA'))['_id'];
        let cp = JSON.parse(localStorage.getItem('sA')).cloud_platform;
        let compData = await this._dataContext.getMethod(Constants.CONTROLS + '?cloud_provider=' + cp + '&compliance_id=' + whichComplinace + '&obj_id=' + objectId);
        this.unBlockUi()
        if (compData && compData !== "NE") {
            this.getProgressBarData(compData.data);
            if (this.state.selectedCompance === 'CIS v1.3.0' || this.state.selectedCompance == 'CIS v1.2.0' && compData.data.length > 1) {
                this.getGroupWiseData(compData.data)
            } else {
                this.setState({ groupWiseData: undefined });

            }

            this.setState({ compData: compData.data, isOverview: false });
        } else if (compData && compData === 'NE') {
            this.showToast(Constants.TOAST_NET_ERR, 'error')
        }
        else {
            this.showToast(Constants.TOAST_SOMETHING_WENT_WRONG, 'error');
        }
    }
    async getControlFindingData(e, item, clickedAccIndex) {
        let openedAllDiv = document.querySelectorAll('.findingDanger.Mui-expanded'); 
        let openedDiv = document.querySelectorAll('#findingAccContainer_' + clickedAccIndex + ' .Mui-expanded .MuiAccordion-rounded');
        for (let index = 0; index < openedAllDiv.length; index++) {
            openedAllDiv[index].click()
        }
        if (item.items.length === 0) {
            e.stopPropagation()
        }
        if (item.items.length > 0 && openedDiv.length === 0) {
            let obj_id = localStorage.getItem('_id');
            let path = item.display_path ? item.display_path : item.path;
            let id_suffix = item.id_suffix ? item.id_suffix : null;
            //let finalPath = item.path ? item.path : item.display_path;
            let param = { "obj_id": obj_id, "path": path, "items": item.items }
            this.blockUi()
            let findingData = await this._dataContext.postMethod(Constants.URL_FINDINGS, param);
            let tempData = findingData.data.services;
            this.unBlockUi()
            if (findingData && findingData !== "NE") {
                //let findingDataFinal = await this._dataContexGetFinding.getFindngData(findingData.data.services, finalPath)
                //let findingDataFinal = await this._dataContexGetFinding.getData(findingData.data.services, finalPath)
                var pathStr = path.split(".");
                tempData = tempData[pathStr[0]]
                this.setState({ clickedAccIndex: clickedAccIndex, findingData: tempData, pathToFetchData: path.substring(0, path.length - 3), items: item.items, id_suffix: id_suffix, isOverview: false });
            } else if (findingData && findingData === 'NE') {
                this.showToast(Constants.TOAST_NET_ERR, 'error')
            }
            else {
                this.showToast(Constants.TOAST_SOMETHING_WENT_WRONG, 'error');
            }
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
    getProgressBarData = (controlData) => {
        let greenCount = 0;
        let grayCount = 0;
        let redCount = 0;
        let nullCount = 0;
        let totalCount = controlData.length;
        for (let index = 0; index < controlData.length; index++) {
            const elemt = controlData[index];
            if (Object.entries(elemt.value).length > 0) {
                if (elemt.flag.Warn > 0) {
                    redCount += 1;
                } else if (elemt.flag.Safe > 0) {
                    greenCount += 1;
                } else {
                    grayCount += 1;
                }
            } else {
                nullCount += 1;
            }
        }
        this.setState({
            greenCount: greenCount,
            redCount: redCount,
            grayCount: grayCount,
            nullCount: nullCount,
            totalCount: totalCount,
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
    getGroupWiseData = (data) => {
        let groupWiseData = {}
        let iam = []
        let storage = []
        let logging = []
        let monitoring = []
        let networking = []
        let others = []
        if (this.state.selectedCompance === 'CIS v1.3.0') {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element.type[4] === "1") {
                    iam.push(element);
                } else if (element.type[4] === "2") {
                    storage.push(element);
                } else if (element.type[4] === "3") {
                    logging.push(element);
                } else if (element.type[4] === "4") {
                    monitoring.push(element);
                } else if (element.type[4] === "5") {
                    networking.push(element);
                } else {
                    others.push(element);
                }

            }
        } else if (this.state.selectedCompance == 'CIS v1.2.0') {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element.type[0] === "1") {
                    iam.push(element);
                } else if (element.type[0] === "2") {
                    logging.push(element);
                } else if (element.type[0] === "3") {
                    monitoring.push(element);
                } else if (element.type[0] === "4") {
                    networking.push(element);
                } else {
                    others.push(element);
                }

            }
        }

        if (iam.length > 0) {
            groupWiseData.iam = iam;

        }
        if (storage.length > 0) {
            groupWiseData.storage = storage;

        }
        if (logging.length > 0) {

            groupWiseData.logging = logging;
        }
        if (monitoring.length > 0) {
            groupWiseData.monitoring = monitoring;

        }
        if (networking.length > 0) {
            groupWiseData.networking = networking;

        }
        if (others.length > 0) {
            groupWiseData.others = others;

        }
        this.setState({
            groupWiseData: groupWiseData
        })
    }
    render() {
        return (
            <>
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
                <Header />
                <div className="controlWiseComplianceMain dashboard-container">
                    <Row>
                        <Col xs="2" sm="1" md="1" className="bgWhite cust-boxShadow-1 pr-0">
                            <Nav tabs vertical pills className="bgWhite verticalTab browserHeight1 complianceTabs">
                                <NavItem>
                                    <NavLink
                                        className="backToDashboardIcon p-3"
                                        onClick={() => this.props.history.push("/")}
                                    >
                                        <img className="img-fluid" alt="four-square" src={require("../assets/four-squares.svg")} />
                                    </NavLink>
                                </NavItem>
                                <NavItem className="sIconContainer">

                                    <NavLink className="overview" onClick={() => this.toggle(-1, undefined, undefined, 'overview')}>
                                        {/* <img className="img-fluid" src={require("../assets/img/" + this._dataContextUtil.toLowerCase(item.type) + ".png")} /> */}
                                        <div>
                                            <FontAwesomeIcon className="fs30" icon={faPoll} color="#0C2461" />
                                            <div className="tab-Title-2 mt-2">Overview</div>
                                        </div>
                                    </NavLink>
                                </NavItem>
                                {
                                    this.state.tabData ?
                                        this.state.tabData.map((item, i) =>
                                            <NavItem className="sIconContainer" key={i}>
                                                <NavLink
                                                    className={classnames(item.value.replace(/ /g, ""))} onClick={() => this.toggle(i, item.type, item.value, item.value.replace(/ /g, ""))}>
                                                    <img className="img-fluid" alt="img" src={require("../assets/img/" + this._dataContextUtil.toLowerCase(item.type) + ".png")} />
                                                    <div>
                                                        <div className="tab-Title-2 mt-2">{this._dataContextUtil.toUpperCase(item.value)}</div>
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
                            <div className="dashboard-container mt-2 full_max_width">
                                <div className="row">
                                    <div className="offset-md-10 col-md-2">
                                        <div className="dateFilterContainer poseRelative">
                                            <FontAwesomeIcon
                                                className="calenderIcon"
                                                color="#0C2461"
                                                icon={faCalendarAlt}
                                            />
                                            {this.state.selectedTab != -1 ?
                                                <DatePicker
                                                    placeholderText="Select Date"
                                                    selected={this.state.selectedDate}
                                                    // onChange={this.getSingleDataOnDateChange}
                                                    disabled={true}
                                                />
                                                :
                                                <DatePicker
                                                    placeholderText="Select Date"
                                                    selected={this.state.selectedDate}
                                                    onChange={this.getSingleDataOnDateChange}

                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Divider />

                            {
                                this.state.isOverview === true && this.state.compData !== undefined &&
                                <CIS_Dashboard data={this.state.compData} />

                            }

                            {this.state.isOverview === false && this.state.compData !== undefined ?
                                <div>
                                    {
                                        <Card className="my-2">
                                            <CardTitle className="card-header p-1 text-center">
                                                <h4><span>{this.state.selectedCompanceType ? this._dataContextUtil.toUpperCase(this.state.selectedCompanceType) : null}</span>  <span>{this.state.selectedCompance ? <span>- ({this.state.selectedCompance})</span> : null}</span></h4>
                                            </CardTitle>
                                            <CardBody>
                                                <Row className="controlsMetaData mb-3">
                                                    <Col md="3">
                                                        <span>Total Controls - </span>
                                                        <span className="badge badge-secondary">{this._dataContextUtil.convertNum(this.state.totalCount)}</span>
                                                    </Col>
                                                    <Col md="3">
                                                        <span>Set Correctly - </span>
                                                        <span className="badge badge-success">{this._dataContextUtil.convertNum(this.state.greenCount)}</span>
                                                    </Col>
                                                    <Col md="3">
                                                        <span>Not Set Correctly - </span>
                                                        <span className="badge badge-danger">{this._dataContextUtil.convertNum(this.state.redCount)}</span>
                                                    </Col>
                                                    {this.state.grayCount > 0 &&
                                                        <Col md="3">
                                                            <span>Not Applicable - </span>
                                                            <span className="badge badge-secondary">{this._dataContextUtil.convertNum(this.state.grayCount)}</span>
                                                        </Col>
                                                    }
                                                </Row>
                                                <Progress multi>
                                                    <Progress bar max={this.state.compData.length} />
                                                    <Progress max={this.state.compData.length} bar color="secondary" value={this.state.grayCount}>{this._dataContextUtil.convertNum(this.state.grayCount)}</Progress>
                                                    <Progress max={this.state.compData.length} animated bar color="success" value={this.state.greenCount}>{this._dataContextUtil.convertNum(this.state.greenCount)}</Progress>
                                                    <Progress max={this.state.compData.length} bar color="danger" value={this.state.redCount}>{this._dataContextUtil.convertNum(this.state.redCount)}</Progress>
                                                </Progress>

                                            </CardBody>
                                        </Card>

                                    }
                                    {this.state.groupWiseData ?
                                        Object.entries(this.state.groupWiseData).map((item, i) =>

                                            <div key={i} className="my-2 cntlWiseAccContainer poseRelative p-3 mt-5 borderBlue">
                                                <span className="controlGroupName">{this.state.selectedCompance == 'CIS v1.3.0' && namesMapping.cisGroupMapping_1_3_0[item[0]] || this.state.selectedCompance == 'CIS v1.2.0' && namesMapping.cisGroupMapping_1_2_0[item[0]]}</span>
                                                {item[1] && item[1].map((item2, j) =>
                                                    <Accordion disabled={item2.flag['Warn'] == 0 && item2.flag['Safe'] == 0 && item2.flag['N/A'] == 0}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls={("panel" + i + "-" + "a" + "-content").toString()}
                                                            id={("panel" + i + "d" + "-header").toString()}
                                                        >
                                                            <Typography className='custom-progress'>{item2.type} - &nbsp;{item2.description ? item2.description : 'No Description'}</Typography>
                                                            <Typography>
                                                                <span>
                                                                    <span data-tip={item2.flag['Warn'] + " Policies are not set correctly"}><FontAwesomeIcon icon={faExclamationCircle} color="#E42D38" /> <span style={{ color: '#E42D38' }}>{item2.flag['Warn']}</span></span>&nbsp;
                                                            <span data-tip={item2.flag['Safe'] + " Policies are set correctly"}> <FontAwesomeIcon icon={faCheckCircle} color="#62A420" /> <span style={{ color: '#62A420' }}>{item2.flag['Safe']}</span></span>&nbsp;
                                                            <span data-tip={item2.flag['N/A'] + " Policies are not applicable"}><FontAwesomeIcon icon={faInfoCircle} color="#8F8F8F" /> <span style={{ color: '#8F8F8F' }}>{item2.flag['N/A']}</span></span>
                                                                    <ReactTooltip place="right" type="dark" effect="float" />
                                                                </span>
                                                                {/* <FontAwesomeIcon icon={faPlusCircle} color="#0C2461" /> */}
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails id='custom-accordionDetails-root'>
                                                            {Object.entries(item2.value).length > 0 ?
                                                                Object.entries(item2.value).map((item3, k) =>
                                                                    Object.entries(item3[1]).length > 0 &&
                                                                    <div key={i + '_' + j + '_' + k} id={'findingAccContainer_' + i + '_' + j + '_' + k} className="my-2 findingAccContainer poseRelative">
                                                                        <span className="d-none">
                                                                            {item3[1]['fn'] = item3[0].match(new RegExp("findings." + "(.*)" + ""))[1]} </span>
                                                                        <div
                                                                            onClick={() => this._dataContextUtil.showAlert("Ignore and Add Comment below", " ", "saCommentPol", item3[1])}
                                                                            className="posAbs saCommentBox">

                                                                            {item3[1].sa_comment != undefined ?
                                                                                <>

                                                                                    {item3[1].sa_comment.comment ?
                                                                                        <FontAwesomeIcon
                                                                                            className="mr-1 fs12 clr_red1"
                                                                                            icon={faComment}
                                                                                        />
                                                                                        :
                                                                                        <FontAwesomeIcon
                                                                                            className="mr-1 fs12 text-color1"
                                                                                            icon={faCommentSlash}
                                                                                        />
                                                                                    }
                                                                                    {item3[1].sa_comment.ignore === true ?
                                                                                        <FontAwesomeIcon
                                                                                            className="mr-1 fs12 clr_red1"
                                                                                            icon={faEyeSlash}
                                                                                        />
                                                                                        :
                                                                                        <FontAwesomeIcon
                                                                                            className="mr-1 fs12 text-color1"
                                                                                            icon={faEye}
                                                                                        />
                                                                                    }
                                                                                </>
                                                                                :
                                                                                <>

                                                                                    <FontAwesomeIcon
                                                                                        className="mr-1 fs12 text-color1"
                                                                                        icon={faCommentSlash}
                                                                                    />
                                                                                    <FontAwesomeIcon
                                                                                        className="mr-1 fs12 text-color1"
                                                                                        icon={faEye}
                                                                                    />
                                                                                </>
                                                                            }


                                                                        </div>
                                                                        <Accordion disabled ={item3[1].warning_color != 'yellow' && item3[1].warning_color != 'red' ? true : false}>
                                                                            <AccordionSummary
                                                                                expandIcon={<ExpandMoreIcon />}
                                                                                aria-controls={("panel" + i + '-' + j + "a" + "-content").toString()}
                                                                                id={("panel" + i + '-' + j + "d" + "-header").toString()}
                                                                                onClick={(event) => this.getControlFindingData(event, item3[1], i + '_' + j + '_' + k)} className={[
                                                                                    item3[1].warning_color === 'grey' ? 'findingDefault disabledTextColor' : null ||
                                                                                        item3[1].warning_color === 'green' ? 'findingSuccess disabledTextColor' : null ||
                                                                                            item3[1].warning_color === 'yellow' ? 'findingDanger' : null ||
                                                                                                item3[1].warning_color === 'red' ? 'findingDanger' : null
                                                                                ]}
                                                                            >
                                                                                {item3[1].service} | {item3[1].dashboard_name} | {item3[1].description}

                                                                                {/* <FontAwesomeIcon id={'findingExpand_' + i + '_' + j} className="float-right my-1" icon={faPlusCircle} color="#0C2461" /> */}
                                                                            </AccordionSummary>
                                                                            <AccordionDetails id="custom-accordionDetails-root">
                                                                                {this.state.findingData && this.state.clickedAccIndex === i + '_' + j + '_' + k &&

                                                                                    <FindingDetails2
                                                                                        labels={[]}
                                                                                        accId={"demo"}
                                                                                        data={this.state.findingData}
                                                                                        items={this.state.items}
                                                                                        id_suffix={this.state.id_suffix}
                                                                                        activeTab={1}
                                                                                        pathToFetchData={this.state.pathToFetchData}
                                                                                        dbName={"demo"} />

                                                                                }
                                                                            </AccordionDetails>
                                                                        </Accordion>
                                                                    </div>
                                                                )
                                                                :
                                                                <div className="disabledTextColor text-center"><FontAwesomeIcon icon={faExclamationTriangle} color="#8F8F8F" /> No Data Available</div>
                                                            }
                                                        </AccordionDetails>
                                                    </Accordion>
                                                )}
                                            </div>

                                        )
                                        :
                                        this.state.compData.map((item, i) =>
                                            <div key={i} className="my-2 cntlWiseAccContainer">
                                                <Accordion disabled={item.flag['Warn'] == 0 && item.flag['Safe'] == 0 && item.flag['N/A'] == 0}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls={("panel" + i + '-' + "a" + "-content").toString()}
                                                        id={("panel" + i + '-' + "d" + "-header").toString()}
                                                    >
                                                        <h5 className="custom-progress fs18">{item.type} - &nbsp;{item.description ? item.description : 'No Description'}</h5>
                                                        <div className="float-right">
                                                            {/* <span>{
                                                            item.set_correctly === 'yes' ?
                                                                <><FontAwesomeIcon icon={faCheckCircle} color="#62A420" /> <span style={{ color: '#62A420 ' }}>Set Correctly</span></>
                                                                :
                                                                <><FontAwesomeIcon icon={faTimesCircle} color="#E42D38" /> <span style={{ color: '#E42D38 ' }}>Not Set Correctly</span></>
                                                        }</span>&nbsp; */}
                                                            <span>
                                                                <>
                                                                    <span data-tip={item.flag['Warn'] + " Policies are not set correctly"}><FontAwesomeIcon icon={faExclamationCircle} color="#E42D38" /> <span style={{ color: '#E42D38' }}>{item.flag['Warn']}</span></span>&nbsp;
                                                            <span data-tip={item.flag['Safe'] + " Policies are set correctly"}> <FontAwesomeIcon icon={faCheckCircle} color="#62A420" /> <span style={{ color: '#62A420' }}>{item.flag['Safe']}</span></span>&nbsp;
                                                            <span data-tip={item.flag['N/A'] + " Policies are not applicable"}><FontAwesomeIcon icon={faInfoCircle} color="#8F8F8F" /> <span style={{ color: '#8F8F8F' }}>{item.flag['N/A']}</span></span>
                                                                    <ReactTooltip place="right" type="dark" effect="float" />
                                                                </>
                                                            </span>
                                                            {/* <FontAwesomeIcon icon={faPlusCircle} color="#0C2461" /> */}
                                                        </div>
                                                    </AccordionSummary>
                                                    <AccordionDetails id='custom-accordionDetails-root'>
                                                        {Object.entries(item.value).length > 0 ?
                                                            Object.entries(item.value).map((item2, j) =>
                                                                Object.entries(item2[1]).length > 0 &&
                                                                <div key={i + '_' + j} id={'findingAccContainer_' + i + '_' + j} className="my-2 findingAccContainer poseRelative">
                                                                    <span className="d-none">
                                                                        {

                                                                            item2[1]['fn'] = item2[0].match(new RegExp("findings." + "(.*)" + ""))[1]
                                                                        }
                                                                    </span>
                                                                    <div
                                                                        onClick={() => this._dataContextUtil.showAlert("Ignore and Add Comment below", " ", "saCommentPol", item2[1])}
                                                                        className="posAbs saCommentBox">

                                                                        {item2[1].sa_comment != undefined ?
                                                                            <>

                                                                                {item2[1].sa_comment.comment ?
                                                                                    <FontAwesomeIcon
                                                                                        className="mr-1 fs12 clr_red1"
                                                                                        icon={faComment}
                                                                                    />
                                                                                    :
                                                                                    <FontAwesomeIcon
                                                                                        className="mr-1 fs12 text-color1"
                                                                                        icon={faCommentSlash}
                                                                                    />
                                                                                }
                                                                                {item2[1].sa_comment.ignore === true ?
                                                                                    <FontAwesomeIcon
                                                                                        className="mr-1 fs12 clr_red1"
                                                                                        icon={faEyeSlash}
                                                                                    />
                                                                                    :
                                                                                    <FontAwesomeIcon
                                                                                        className="mr-1 fs12 text-color1"
                                                                                        icon={faEye}
                                                                                    />
                                                                                }
                                                                            </>
                                                                            :
                                                                            <>

                                                                                <FontAwesomeIcon
                                                                                    className="mr-1 fs12 text-color1"
                                                                                    icon={faCommentSlash}
                                                                                />
                                                                                <FontAwesomeIcon
                                                                                    className="mr-1 fs12 text-color1"
                                                                                    icon={faEye}
                                                                                />
                                                                            </>
                                                                        }


                                                                    </div>
                                                                    <Accordion>
                                                                        <AccordionSummary
                                                                            expandIcon={<ExpandMoreIcon />}
                                                                            aria-controls={("panel" + i + '_' + j + "a" + "-content").toString()}
                                                                            id={("panel" + i + '_' + j + "d" + "-header").toString()}
                                                                            onClick={(event) => this.getControlFindingData(event, item2[1], i + '_' + j)} className={[
                                                                                item2[1].warning_color === 'grey' ? 'findingDefault disabledTextColor' : null ||
                                                                                    item2[1].warning_color === 'green' ? 'findingSuccess disabledTextColor' : null ||
                                                                                        item2[1].warning_color === 'yellow' ? 'findingDanger' : null ||
                                                                                            item2[1].warning_color === 'red' ? 'findingDanger' : null
                                                                            ]}
                                                                        >
                                                                            {item2[1].service} | {item2[1].dashboard_name} | {item2[1].description}

                                                                            {/* <FontAwesomeIcon id={'findingExpand_' + i + '_' + j} className="float-right my-1" icon={faPlusCircle} color="#0C2461" /> */}
                                                                        </AccordionSummary>
                                                                        <AccordionDetails id='custom-accordionDetails-root'>
                                                                            {this.state.findingData && this.state.clickedAccIndex === i + '_' + j &&

                                                                                <FindingDetails2
                                                                                    labels={[]}
                                                                                    accId={"demo"}
                                                                                    data={this.state.findingData}
                                                                                    items={this.state.items}
                                                                                    id_suffix={this.state.id_suffix}
                                                                                    activeTab={1}
                                                                                    pathToFetchData={this.state.pathToFetchData}
                                                                                    dbName={"demo"} />

                                                                            }
                                                                        </AccordionDetails>
                                                                    </Accordion>
                                                                </div>
                                                            )
                                                            :
                                                            <div className="disabledTextColor text-center"><FontAwesomeIcon icon={faExclamationTriangle} color="#8F8F8F" /> No Data Available</div>
                                                        }
                                                    </AccordionDetails>
                                                </Accordion>
                                            </div>
                                        )
                                    }

                                </div>
                                : null
                            }

                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}
