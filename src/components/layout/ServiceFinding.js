import React, { Component } from "react";
import { BreadcrumbItem, Breadcrumb, Input } from "reactstrap";
import { withRouter } from "react-router-dom";
import ApiService from "../../services/APIService";
import * as Constants from "../../data/Constants";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faShieldAlt, faEye, faEyeSlash, faComment, faCommentSlash } from "@fortawesome/free-solid-svg-icons";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Avatar, Divider } from "@material-ui/core";
import UtilClass from "../SupportingJs/Util"
import ReactTooltip from "react-tooltip";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
//let data = undefined;
//set withcredeintial true
axios.defaults.withCredentials = true;
const levelFilter = [
  'All',
  'Good',
  'Warning',
  "Danger"
];
class ServiceFinding extends Component {
  _dataContext = new ApiService();
  _dataContextUtil = new UtilClass();
  constructor(props) {
    super(props);
    this.state = {
      findings: undefined,
      isLoading: false,
      anchorEl: null,
      selLevelndex: 0,
      selectedDate: undefined,
      accId: this.props.accId,
      serviceName: this.props.serviceName
    };
  }
  async componentDidMount() {
    // let sDateTemp = localStorage.getItem('sDate');
    // if (sDateTemp) {
    //   let sDate= await this._dataContextUtil.sanitizeDate(new Date(sDateTemp));
    //   this.setState({ selectedDate: new Date(sDate + " 00:00:00") })
    // }
    //let data = Data.services;//Data.summary;

    this.blockUi();
    //let _id = localStorage.getItem("_id");
    // let data1 = await this._dataContext.getMethod(
    //   Constants.URLSERVER2 +
    //   "/" +
    //   this.props.whichDataToFetch +
    //   "/" +
    //   _id +
    //   "/" +
    //   this.props.activeComp
    // );
    // let data = data1.data;
    //this.unBlockUi();

    //this.getData();
    // if (data && data != "NE") {
    //   //this.showToast(Constants.TOAST_DATA_SUCCESS, 'success')
    //   window.scrollTo(0, 0);
    //   for (var { } in data) {
    //     let findingsObj = data.findings;
    //     let findings = Object.keys(findingsObj).map((i) => findingsObj[i]);
    //     let findingsName = Object.entries(findingsObj)
    //     for (let index = 0; index < findingsName.length; index++) {
    //       const element = findingsName[index];
    //       for (let j = 0; j < findings.length; j++) {
    //         if (index == j) {
    //           findings[j].fn = element[0]
    //         }
    //       }


    //     }
    //     this.setState({ findings: findings, data: data });
    //   }
    // } else if (data && data === "NE") {
    //   this.showToast(Constants.TOAST_NET_ERR, "error");
    // } else {
    //   this.showToast(Constants.TOAST_SOMETHING_WENT_WRONG, "error");
    // }

    await axios.get(Constants.URLSERVER+"getresources/" + this.props.serviceName + "-" + this.props.accId).then(response => {
      console.log(response);
      
      let respdata = response.data.data
     
      this.unBlockUi();
      if (respdata && respdata != "NE") {
        debugger
        window.scrollTo(0, 0);
        for (var { } in respdata) {
          let findingsObj = respdata.findings;
          let findings = Object.keys(findingsObj).map((i) => findingsObj[i]);
          let findingsName = Object.entries(findingsObj)
          for (let index = 0; index < findingsName.length; index++) {
            const element = findingsName[index];
            for (let j = 0; j < findings.length; j++) {
              if (index == j) {
                findings[j].fn = element[0]
              }
            }
          }
          this.setState({ findings: findings, data: respdata });
        }
      } else if (respdata && respdata === "NE") {
        this.showToast(Constants.TOAST_NET_ERR, "error");
      } else {
        this.showToast(Constants.TOAST_SOMETHING_WENT_WRONG, "error");
      }

    }).catch(error => {
      let respdata = "NE"
      console.log(error);
    })
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
  getData = () => {
    // api
    //this.setState({ labels: this.props.location.state.labels })
  };
  filterByLevel = (ndex) => {
    //const node = this.myRef.current;
    let selectedVal = ndex;
    this.setState({ selLevelndex: selectedVal - 1 })
    let allTargets = document.getElementsByClassName("serviceCard");
    if (allTargets.length > 0) {
      for (let i = 0; i < allTargets.length; i++) {
        allTargets[i].parentElement.parentElement.style = "display:block";
      }
      if (selectedVal === 2) {
        let allTargets = document.getElementsByClassName("serviceCard");
        for (let i = 0; i < allTargets.length; i++) {
          if (allTargets[i].classList.contains("findingSuccess") === false) {
            allTargets[i].parentElement.parentElement.style = "display:none";
          }
        }
      }
      if (selectedVal === 3) {
        let allTargets = document.getElementsByClassName("serviceCard");
        for (let i = 0; i < allTargets.length; i++) {
          if (allTargets[i].classList.contains("findingWarning") === false) {
            allTargets[i].parentElement.parentElement.style = "display:none";
          }
        }
      }
      if (selectedVal === 4) {
        let allTargets = document.getElementsByClassName("serviceCard");
        for (let i = 0; i < allTargets.length; i++) {
          if (allTargets[i].classList.contains("findingDanger") === false) {
            allTargets[i].parentElement.parentElement.style = "display:none";
          }
        }
      }
    }
    // for(let i=0;i<findings.length;i++){
    //     if(findings[i]. )
    // }
    this.handleClose()
  };
  goToFindingDetails = (items, path, dbName, id_suffix) => {
    //disable click
    if (this.state.serviceName === 's3') {
return
    }

    if (items.length === 0) {
      return;
    }

    let tempPath = path.substring(0, path.length - 3); //common pattern in findings?? to remove .id?

    //this.props.history.push('/ds')
    // this.props.history.push(`/fs/:${this.props.accountId}`, {
    //   labels: this.props.labels,
    //   accId: this.props.accountId,
    //   whichDataToFetch: this.props.whichDataToFetch,
    //   pathToFetchData: tempPath,
    //   dbName: dbName,
    //   activeTab: this.props.activeTab,
    //   data: this.state.data,
    //   items: items,
    //   id_suffix: id_suffix,
    // });
    this.props.history.push('/fs', {
      //labels: this.props.labels,
      accId: this.props.accountId,
      accId: this.props.accId,
      whichDataToFetch: this.props.serviceName,
      pathToFetchData: tempPath,
      serviceName: this.props.serviceName,
      dbName: dbName,
      //activeTab: this.props.activeTab,
      data: this.state.data,
      items: items,
      id_suffix: id_suffix,
    });
  };
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
  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  getSingleDataOnDateChange = async (date) => {
    if (date) {
      let sDate = await this._dataContextUtil.sanitizeDate(new Date(date));
      this.setState({ selectedDate: new Date(sDate + " 00:00:00") })
    }
  };
  render() {
    const { anchorEl } = this.state;
    return (
      <div>
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
        {/* select view  starts */}
        <div className="dashboard-container mt-2 full_max_width">
          <div className="row">
            <div className="col-md-8">
              <Breadcrumb tag="nav" listTag="div">
                <BreadcrumbItem
                  className="link"
                  onClick={() => this.props.history.push("/")}
                  tag="a"
                >
                  Dashboard
                </BreadcrumbItem>
                 <BreadcrumbItem className="text-capitalize link" tag="a" onClick={() => this.props.history.goBack()}>
                  {this.state.serviceName} Dashboard
                </BreadcrumbItem>
                <BreadcrumbItem active tag="span">
                  Account ID: {this.props.accId}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div className="col-md-4">
              <div className="d-inline-flex float-right selectLabelContainer">
                {/* <Label className="" for="exampleSelect">Select View</Label> */}
                <List component="nav">
                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="Cat Filter"
                    onClick={this.handleClickListItem}
                  >

                    <ListItemText
                      primary="Select Level"
                      secondary={levelFilter[this.state.selLevelndex]}
                    />
                    <ListItemIcon>
                      <ExpandMore />
                    </ListItemIcon>
                  </ListItem>
                </List>
                <Menu
                  id="lock-menu2"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >

                  {levelFilter.map((option, index) => (

                    <MenuItem
                      key={option}
                      selected={index === this.state.selLevelndex}
                      onClick={event => this.filterByLevel(index + 1)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
                {/* <Input
                  type="select"
                  name="select"
                  onChange={this.filterByLevel}
                >
                  <option value="1">All</option>
                  <option value="2">Good</option>
                  <option value="3">Warning</option>
                  <option value="4">Error</option>
                </Input> */}
              </div>
            </div>
            <div className="col-md-0">

              {/* <DatePicker
                placeholderText="Select Date"
                selected={this.state.selectedDate}
                onChange={this.getSingleDataOnDateChange}
              /> */}
            </div>
          </div>
          {/*  select view ends */}
          <Divider />
          <div className="col-12">
            <div className="row  mx-auto">
              {/* {this.props.whichDataToFetch === "blockstorage" &&
                        <div className="col-md-4 p-0">
                            <Card className="m-2">
                                <CardBody id="qwert" className='serviceCard findingSuccess disabledTextColor'>
                                    <CardTitle className="font-weight-500 fs14">Blockvolumes having backups without expiry dates</CardTitle>
                                    <CardText><span className="font-weight-500"></span> Blockvolumes checked: <span className="font-weight-500">3</span></CardText>
                                    <CardText><span className="font-weight-500"></span> Blockvolumes flagged: <span className="font-weight-500">0</span></CardText>
                                </CardBody>
                            </Card>
                        </div>
                    } */}
              {this.props.whichDataToFetch === "loadbalancer" && (
                <div className="col-md-4 p-0">
                  <Card className="m-2">
                    <CardContent
                      id="qwert"
                      className="serviceCard findingDefault disabledTextColor"
                    >
                      <h6 className="font-weight-500 fs14">
                        Load Balancer has bad health
                      </h6>
                      <div>
                        <span className="font-weight-500"></span> Load Balancer
                        checked: <span className="font-weight-500">0</span>
                      </div>
                      <div>
                        <span className="font-weight-500"></span> Load Balancer
                        flagged: <span className="font-weight-500">0</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              {/* {this.props.whichDataToFetch === "compute" &&
                        <div className="col-md-4 p-0">
                            <Card className="m-2">
                                <CardBody id="qwert" className='serviceCard findingSuccess disabledTextColor'>
                                    <CardTitle className="font-weight-500 fs14">Boot Volume is not using Gold Image</CardTitle>
                                    <CardText><span className="font-weight-500"></span> Boot Volume checked: <span className="font-weight-500">4</span></CardText>
                                    <CardText><span className="font-weight-500"></span> Boot Volume flagged: <span className="font-weight-500">0</span></CardText>
                                </CardBody>
                            </Card>
                            <Card className="m-2">
                                <CardBody id="qwert" className='serviceCard findingSuccess disabledTextColor'>
                                    <CardTitle className="font-weight-500 fs14">List All VM's  where shape not equal to 2.1</CardTitle>
                                    <CardText><span className="font-weight-500"></span> Rules checked: <span className="font-weight-500">4</span></CardText>
                                    <CardText><span className="font-weight-500"></span> Rules flagged: <span className="font-weight-500">0</span></CardText>
                                </CardBody>
                            </Card>
                        </div>
                    } */}

              {this.state.findings
                ? this.state.findings.map((item, i) => (
                  <div key={i} className="col-md-4 p-0">
                    <Card className="m-1 card-custom-font">
                      <div
                        onClick={() => this._dataContextUtil.showAlert("Ignore and Add Comment below?", " ", "saCommentPol", item)}
                        className="posAbs saCommentBox d-none">

                        {item.sa_comment != undefined ?
                          <>

                            {item.sa_comment.comment ?
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
                            {item.sa_comment.ignore === true ?
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

                        <span>
                          <span data-tip="aaa"></span>
                          <ReactTooltip place="top" type="dark" effect="float" />
                        </span>
                      </div>
                      <CardContent
                        id="qwert"
                        className={[
                          "serviceCard",
                          item.flagged_items === 0 && item.checked_items === 0
                            ? "findingDefault"
                            : null,
                          item.flagged_items === 0 && item.checked_items > 0
                            ? "findingSuccess disabledTextColor"
                            : null,
                          item.flagged_items > 0 &&
                            item.checked_items > 0 &&
                            item.level === "warning"
                            ? "findingWarning"
                            : null,
                          item.flagged_items > 0 &&
                            item.checked_items > 0 &&
                            item.level === "danger"
                            ? "findingDanger"
                            : null,
                            this.state.serviceName === 's3'
                            ? "disabledTextColor"
                            : null
                        ]}
                        onClick={() =>
                          this.goToFindingDetails(
                            item.items,
                            item.display_path ? item.display_path : item.path,
                            item.dashboard_name,
                            item.id_suffix
                          )
                        }
                      >

                        <div className="card-title">{item.description}</div>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            {item.dashboard_name} checked:
                            <Avatar>
                              {item.checked_items}
                            </Avatar>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            {item.dashboard_name} flagged:
                            <Avatar>{item.flagged_items}</Avatar>
                          </li>
                          {item.control_no && (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <div className="posAbs">
                                <FontAwesomeIcon
                                  className="posAbs"
                                  icon={faShieldAlt}
                                />
                              </div>
                              <Avatar>
                                {item.control_no}
                              </Avatar>
                            </li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                ))
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(ServiceFinding);
