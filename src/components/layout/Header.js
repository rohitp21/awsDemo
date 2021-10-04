import React, { Component } from 'react'
import logo from '../assets/logo.PNG'; // with import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faPlusSquare, faUserCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ApiService from "../../services/APIService";
import UtilClass from "../SupportingJs/Util";
import * as Constants from "../../data/Constants";
import { withRouter } from "react-router-dom";
import "react-block-ui/style.css";
import BlockUi from "react-block-ui";
import { ToastContainer, toast } from "react-toastify";
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
  // Button,
  Row,
  Col,
  Table,
  Input
} from "reactstrap";
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});
class Header extends Component {
  _dataContext = new ApiService();
  _dataContextUtil = new UtilClass();
  state = {
    accountsList: undefined,
    openL: false,
    anchorEl: null,
    openPopup: false,
  }
  handleClickPopupOpen = (account_id, id) => {
    this.setState({ account_id: account_id, _id: id, openPopup: true });
  };

  handlePopupClose = () => {
    this.setState({ openPopup: false });
  };
  handleClickL = index => {
    this.setState(state => ({ openL: !state.openL, whichExpand: index }));
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  getAccList = async () => {
    let data2 = await this._dataContext.getMethod(Constants.URL1_1);
    if (data2 && data2 !== "NE") {
      this.setState({ accountsList: data2.data });
    } else if (data2 && data2 === "NE") {
      console.log("network error")
      //this.showToast(Constants.TOAST_NET_ERR, "error");
    } else {
      console.log("something went wrong")
      //this.showToast(Constants.TOAST_SOMETHING_WENT_WRONG, "error");
    }
  }
  componentDidMount = async () => {
    //await this.getAccList()
   
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
  navigateToDashboard = async (item) => {
    localStorage.setItem("sA", JSON.stringify(item));
    this.props.history.push(`/cloudDashboard/${item.account_id}`);
    localStorage.setItem("lvdurl", window.location.href)
    window.location.reload();
  }
  navigateToDefaultDashboard = async (item) => {
    localStorage.setItem("sA", JSON.stringify(item));
    this.props.history.push(`/cloudDashboard/${item.account_id}`);
    localStorage.setItem("lvdurl", window.location.href)
    window.location.reload();
  }
  navigateToComplianceDashboard = async (item) => {
    localStorage.setItem("sA", JSON.stringify(item));
    this.props.history.push(`/complianceDashboard/${item.account_id}`);
    //this.props.history.push(`/cloudDashboard/${item.account_id}`);
    localStorage.setItem("lvdurl", window.location.href)
    window.location.reload();
  }
  navigateToOCIDashboard = async (item) => {
    localStorage.setItem("sA", JSON.stringify(item));
    this.props.history.push(`/summaryDetailsOci/${item.account_id}`);
    localStorage.setItem("lvdurl", window.location.href)
    window.location.reload();
  }
  navigateToTableauDashboard = async (item) => {
    localStorage.setItem("sA", JSON.stringify(item));
    localStorage.setItem("lvdurl", window.location.href)
    this.props.history.push("/tableauReports");
  }
  deleteAcc = async () => {
    let tempUrl = Constants.DEl_ACC + this.state._id + '/' + this.state.account_id;

    let data2 = await this._dataContext.deleteMethod(tempUrl);
    this.blockUi();
    if (data2 && data2 !== "NE") {
      this.unBlockUi();
      this.showToast(Constants.TOAST_ACC_DEL_SUCCSESS, "sucess");
      this.handlePopupClose()
      localStorage.removeItem('sA')
      window.location.replace(localStorage.getItem('cp'))
    } else if (data2 && data2 === "NE") {
      console.log("network error")
      this.showToast(Constants.TOAST_NET_ERR, "error");
      this.unBlockUi();
    } else {
      console.log("something went wrong")
      this.showToast(Constants.TOAST_SOMETHING_WENT_WRONG, "error");
      this.unBlockUi();
    }
  }

  toggleDropDown = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };
  logout = () => {
    localStorage.clear();
    this.props.history.push("/")
    window.location.reload();
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
  render() {
    const { anchorEl } = this.state;

    return (
      <div className="app-header">
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
        <Dialog
          open={this.state.openPopup}
          onClose={this.handlePopupClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Alert: Delete Account"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.deleteAcc} color="primary">
              Yes
            </Button>
            <Button onClick={this.handlePopupClose} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
        <div className="logo-container float-left"><img className="img-fluid" alt="logo" src={logo} /></div>

        <ul className="float-right d-flex mt-3">
          {this.state.accountsList != undefined && (
            <li className="mr-2 list-unstyled">

              <div>
                <Button className="custMUiDropDown"
                  aria-owns={anchorEl ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  {localStorage.getItem("sA") ? (
                    <>
                      <img
                        className="img-fluid smallImg1"
                        alt="cloud"
                        src={require("../assets/img/" +
                          JSON.parse(localStorage.getItem("sA"))
                            .cloud_platform +
                          "LogoSm" +
                          ".png")}
                      />
                        &nbsp;
                        <span>
                        {JSON.parse(localStorage.getItem("sA")).name}
                      </span>
                    </>
                  ) : (
                      <>
                        <FontAwesomeIcon
                          id="selcAccIcon"
                          icon={faUserCircle}
                          color="#0C2461"
                        />
                        <span id="selcAccText">Select Account</span>
                      </>
                    )}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  {/* <MenuItem onClick={this.handleClose}>Profile</MenuItem>
    <MenuItem onClick={this.handleClose}>My account</MenuItem>
    <MenuItem onClick={this.handleClose}>Logout</MenuItem> */}
                  <List
                    component="nav"
                    subheader={<ListSubheader component="div">Account Lists</ListSubheader>}

                  >

                    {/* <ListItem button>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText  primary="Drafts" />
                    </ListItem> */}

                    {this.state.accountsList.map((item, i) =>
                      <>
                        <ListItem button onClick={() => this.handleClickL(i)}>
                          <ListItemIcon>
                            {/* <InboxIcon /> */}
                            <img
                              className="img-fluid smallImg1"
                              alt="cloud_platform"
                              src={require("../assets/img/" +
                                item.cloud_platform +
                                "LogoSm" +
                                ".png")}
                            />
                          </ListItemIcon>
                          &nbsp;
                          <ListItemText primary={item.name} />
                          {this.state.openL && this.state.whichExpand === i ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.openL && this.state.whichExpand === i} timeout="auto" unmountOnExit>
                          <List className="custCollpase" component="div" disablePadding>
                            <ListItem button onClick={() => this.navigateToDefaultDashboard(item)}>
                              <ListItemIcon>
                                <StarBorder />
                              </ListItemIcon>
                              <ListItemText primary="Default Dashboard" />
                            </ListItem>
                            <ListItem button onClick={() => this.navigateToComplianceDashboard(item)}>
                              <ListItemIcon>
                                <StarBorder />
                              </ListItemIcon>
                              <ListItemText primary="Compliance Dashboard" />
                            </ListItem>
                            {
                              item.cloud_platform == 'oci' &&
                              <ListItem button onClick={() => this.navigateToOCIDashboard(item)}>
                                <ListItemIcon>
                                  <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="OCI Reports" />
                              </ListItem>
                            }

                            <ListItem button onClick={() => this.navigateToTableauDashboard(item)}>
                              <ListItemIcon>
                                <StarBorder />
                              </ListItemIcon>
                              <ListItemText primary="Tableau Reports" />
                            </ListItem>
                          </List>
                          <List className="px-4">

                            <button
                              type="button"
                              id="deleteAcc"
                              class="fs14 btn btn-secondary btn-sm w-100 border-radius-0 bgRed"
                              onClick={() => this.handleClickPopupOpen(item.account_id, item._id)}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} color="#ffffff" />{" "}
                        Delete Account
                      </button>
                          </List>
                          <Divider />
                        </Collapse>
                      </>
                    )}

                  </List>
                  <Divider />
                  <List component="nav">
                    <ListItem button>
                      <button
                        type="button"
                        id="showTablaue"
                        class="fs14 btn btn-secondary btn-sm w-100 border-radius-0 bgBlue"
                        onClick={() => this.props.history.push("/createNewAcc")}
                      >
                        <FontAwesomeIcon icon={faPlusSquare} color="#ffffff" />{" "}
                        Create New
                      </button>
                    </ListItem>
                  </List>
                </Menu>
              </div>
            </li>
          )}
          {/* {this.state.accountsList != undefined && (
            <li className="mr-2 list-unstyled">
              <Dropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggleDropDown}
              >
                <DropdownToggle caret>
                  {localStorage.getItem("sA") ? (
                    <>
                      <img
                        className="img-fluid smallImg1"
                        alt="cloud"
                        src={require("../assets/img/" +
                          JSON.parse(localStorage.getItem("sA"))
                            .cloud_platform +
                          "LogoSm" +
                          ".png")}
                      />
                        &nbsp;
                        <span>
                        {JSON.parse(localStorage.getItem("sA")).name}
                      </span>
                    </>
                  ) : (
                      <>
                        <FontAwesomeIcon
                          id="selcAccIcon"
                          icon={faUserCircle}
                          color="#0C2461"
                        />
                        <span id="selcAccText">Select Account</span>
                      </>
                    )}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header className="p-1">
                    <button
                      type="button"
                      id="showTablaue"
                      class="fs14 btn btn-secondary btn-sm w-100 border-radius-0 bgBlue"
                    >
                      <FontAwesomeIcon icon={faPlusSquare} color="#ffffff" />{" "}
                        Create New
                      </button>
                  </DropdownItem>
                  <DropdownItem divider />
                  {this.state.accountsList &&
                    this.state.accountsList.map((item, i) => (
                      <DropdownItem
                        className="fs14"
                        onClick={(event) =>
                          this.navigateToDashboard(item, event.target)
                        }
                      >
                        <img
                          className="img-fluid smallImg1"
                          alt="cloud_platform"
                          src={require("../assets/img/" +
                            item.cloud_platform +
                            "LogoSm" +
                            ".png")}
                        />{" "}
                          &nbsp;
                        <span>{item.name}</span>
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            </li>
          )} */}
          <li className="mr-2 list-unstyled">
            <span onClick={this.logout} className="logoutStyle"><FontAwesomeIcon className="" size="sm" color="#ffffff" icon={faPowerOff} /> Logout</span>
          </li>


        </ul>
      </div>
    )
  }
}
// Header.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };
export default withRouter(Header);