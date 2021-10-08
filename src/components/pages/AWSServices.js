import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faUserCircle,
  faCalendarAlt,
  faFlag,
  faExclamationTriangle,
  faCogs,
  faCodeBranch,
  faListAlt,
  faCloud,
  faHistory,
  faIdCard,
  faChartBar,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../layout/Header";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  TabContent,
  TabPane,
  ButtonGroup,
  Nav,
  NavItem,
  NavLink,
  Button,
  Row,
  Col,
  Table,
  Input
} from "reactstrap";
import NoData from "../layout/NoData";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiService from "../../services/APIService";
import * as Constants from "../../data/Constants";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { Bar } from "react-chartjs-2";
import classnames from "classnames";
import LineChart from "../graphs/LineChart";
import StackedBar1 from "../graphs/StackedBar1";
import TabluePoc1 from "./TabluePoc1";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import UtilClass from "../SupportingJs/Util";
import CIS_Dashboard from "./CIS_Dashboard";
import * as namesMapping from "../../data/namesMapping";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
//import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { BreadcrumbItem, Breadcrumb } from "reactstrap";
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
axios.defaults.withCredentials = true;
const optionsDateWiseFilter = [
  'none',
  'Day-Wise',
  'Date-Range',
];
//const url = "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en&:display_count=y&:origin=viz_share_link"
const url =
  "https://public.tableau.com/views/COVID-19HumanResources/COVID-19HRDashboard?:language=en&:display_count=y&:origin=viz_share_link";

class AWSServices extends Component {
  _dataContext = new ApiService();
  _dataContextUtil = new UtilClass();
  //_toastContext = new Toast();
  state = {
    summary: [],
    accIdList: [],
    cloudTypeList: [],
    dateFilter: 1,
    date1: undefined,
    date2: undefined,
    isLoading: false,
    providerType: "",
    category: [],
    activeTab: "3",
    activeTabDateRange: "1",
    showCompliance: "0",
    showTablaue: "0",
    activeComp: "default",
    tabData: [],
    dropdownOpen: false,
    accountsList: [],
    anchorEl: null,
    anchorEl2: null,
    selectedCat: "All",
    //ServiceData: this.props.location.state.data,
    accId: this.props.location.state.accId
  };



  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }


  showToast = (toastText, type) => {
    if (type === "success") {
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
    if (type === "error") {
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
    if (type === "warning") {
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
    if (type === "info") {
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
  };



  async componentDidMount() {
    this.blockUi();
    //let url = localStorage.getItem('apiURL');
        //await axios.get(Constants.URLSERVER + "getsummary/" + this.state.accId).then(response => {
          await axios.get(window.location.origin + "/api/" + "getsummary/" + this.state.accId).then(response => {
            console.log(response);
            let respdata = response.data.data
            this.setState({ServiceData:respdata})
            //this.props.history.push('/acc_data', respdata);
            respdata.data.accId = this.state.accId;
            //this.props.history.push('/cloudDashboard', respdata);
            //this.props.history.push('/awsservices', respdata);
        }).catch(error => {
            let respdata = "NE"
            console.log(error);
        })
        this.unBlockUi()
  }
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
  goToServiceDashboard = (serviceName) => {
    //localStorage.setItem("cpro", this.state.providerType);
    //localStorage.setItem("whichTab", i);
    // this.props.history.push(`/ds/${this.state.accId}`, {
    //   labels2: this.state.labels2,
    //   accId: this.state.accId,
    //   activeComp: this.state.activeComp,
    // });
    //this.props.history.push(`/ds/${this.state.accId}`);
    // this.props.history.push(`/ds/${this.state.accId}`, {
    //   accId: this.state.accId,
    //   serviceName:serviceName
    // });
    
    this.props.history.push(`/aws-services-details/${this.state.accId}`, {
      accId: this.state.accId,
      serviceName: serviceName
    });
  };
  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClickListItem2 = event => {
    this.setState({ anchorEl2: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null, anchorEl2: null });
  };
  render() {
    const { anchorEl, anchorEl2 } = this.state;
    return (
      <div>
        <Header />
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

        {this.state.ServiceData && (
          <>
            <div className="dashboard-container p-0 my-2">
              <div className="col-md-12">
                <Breadcrumb tag="nav" listTag="div">
                  <BreadcrumbItem
                    className="link"
                    onClick={() => this.props.history.push("/")}
                    tag="a"
                  >
                    Go to Discover
                  </BreadcrumbItem>
                  <BreadcrumbItem className="text-capitalize link" tag="a" onClick={() => this.props.history.goBack()}>
                    Account List
                  </BreadcrumbItem>
                  <BreadcrumbItem active tag="span">
                    Account ID: {this.state.accId}
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
              <Divider />
              <Card>

                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >



                    <>
                      <div className="dashboard-container  my-4">
                        <Card>
                          <CardHeader

                            title="Services"
                            subheader=""
                          />
                          <CardContent>
                            <div className="table-container row">
                              <Table hover className="">
                                <thead>
                                  <tr>
                                    <th>Service</th>
                                    <th className="text-center">
                                      Encrypted Count
                                    </th>
                                    <th className="text-center">
                                      Non Encrypted Count
                                    </th>
                                    <th className="text-center">
                                      Total Count
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.ServiceData.map((item, i) => (
                                    Object.entries(item).map((serv, j) =>


                                      <tr
                                        key={i}
                                        onClick={() =>
                                          this.goToServiceDashboard(serv[0])
                                        }

                                        className={
                                          "cursorP sIconContainer "}
                                      >
                                        {/* {this.state.providerType === "aws" ? ( */}
                                        <td>
                                          {/* <img
                                              className="img-fluid"
                                              alt={item.name}
                                              src={require("../assets/img/aws/" +
                                                item.name +
                                                ".svg")}
                                            />
                                            &nbsp;
                                            {namesMapping.awsServiceNames.hasOwnProperty(
                                              item.name
                                            )
                                              ? namesMapping.awsServiceNames[
                                              item.name
                                              ]
                                              : item.name} */}

                                          {serv[0]}
                                        </td>
                                        <td className="text-center">
                                          {serv[1]['Encrypted Count']}
                                        </td>
                                        <td className="text-center">
                                          {serv[1]['Total Count'] - serv[1]['Encrypted Count']}
                                        </td>
                                        <td className="text-center">
                                          {serv[1]['Total Count']}
                                        </td>
                                      </tr>
                                    )
                                  ))}

                                </tbody>
                              </Table>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </>

                  </Typography>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(AWSServices);
