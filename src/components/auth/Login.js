import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserCircle,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "reactstrap"; //later make seperate component
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import BlockUi from "react-block-ui";
import ApiService from "../../services/APIService";
import UtilClass from '../../components/SupportingJs/Util'
import * as Constants from "../../data/Constants";
import logo from "../assets/kapstone-logo.png";
export default class Login extends Component {
  _dataContext = new ApiService();
  _dataContextUtil = new UtilClass();
  state = {
    isLoading: false,
    forgotPass: false,
    userId: "",
    password: "",
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
  triggerLogin = (event) => {
    if (event.keyCode === 13) {
      this.submtLoginForm();
    }
  };
  submtLoginForm = async () => {
    if (!this.state.userId) {
      this.showToast(Constants.TOAST_USERID_BLANK, "warning");
      return;
    } else if (!this.state.password) {
      this.showToast(Constants.TOAST_PASSWORD_BLANK, "warning");
      return;
    }
    let param = { email: this.state.userId, password: this.state.password };
    this.blockUi();
    //let data = await this._dataContext.postMethod(Constants.URL10, param);
    this.unBlockUi();
    //if (data && data !== "NE") {
      localStorage.setItem("isAuthenticated", "true");
      //const ct0xk3n = this._dataContextUtil.check_cookie_name('sec_ana')
      //const crt0xk3n = this._dataContextUtil.check_cookie_name('sec_ana_ref')
      //localStorage.setItem('ct0xk3n', ct0xk3n)
      //localStorage.setItem('crt0xk3n', crt0xk3n)
      localStorage.setItem('cp', window.location.href);
      //console.log('cokieeeeeee'+document.cookie)
      window.location.reload();
    //} else if (data && data === "NE") {
     // this.showToast(Constants.TOAST_DATA_COMBO_ERROR, "error");
    //} else {
      //this.showToast(Constants.TOAST_SOMETHING_WENT_WRONG, "error");
    //}
  };
  componentDidMount(){
    //let apiURL= window.location.href;
    //localStorage.setItem('apiURL',apiURL);
  }
  render() {
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
        {this.state.forgotPass === false && (
          <div className="dashboard-container container p-0 loginMainContainer">
            <div className="animated slideInLeft" id="square">
              <div className="animated bounceInUp" id="leftSquare">
                <div className="animated bounceInUp text-center" id="circle">
                  <img className="img-fluid" src={logo} />
                </div>

                <h2 id="title">
                  Welcome to <br />
                  Cloud Security Analytics
                </h2>
                {/* <h3 id="subtitle">You are moments away from your first adventure.</h3> */}
              </div>

              <div className="animated bounceInDown" id="rightSquare">
                <div id="container">
                  <h1 className="signup">Sign In</h1>
                  <div className="animated slideInLeft form">
                    <div className="poseRelative">
                      <FontAwesomeIcon
                        className="calenderIcon"
                        color="#0C2461"
                        icon={faUserCircle}
                      />
                      <Input
                        className="optin form-control mb-4"
                        onKeyUp={(event) => this.triggerLogin(event)}
                        defaultValue={this.state.userId}
                        onChange={(e) => {
                          this.setState({ userId: e.target.value });
                        }}
                        type="text"
                        placeholder="Enter Username"
                      />
                    </div>
                    <div className="poseRelative">
                      <FontAwesomeIcon
                        className="calenderIcon"
                        color="#0C2461"
                        icon={faKey}
                      />
                      <Input
                        className="optin form-control mb-4"
                        onKeyUp={(event) => this.triggerLogin(event)}
                        type="password"
                        onChange={(e) => {
                          this.setState({ password: e.target.value });
                        }}
                        defaultValue={this.state.password}
                        placeholder="Enter Password"
                      />
                    </div>
                    <Button
                      className="animated infinite pulse button btn-md btn-info mt-5"
                      onClick={this.submtLoginForm}
                    >
                      <FontAwesomeIcon
                        className=""
                        color="#ffffff"
                        icon={faSignInAlt}
                      />{" "}
                      Login
                    </Button>
                    {/* <h3 id="footer">Forgot Password? <span id="terms" onClick={() => this.setState({ forgotPass: true })}>Click here to Reset Password.</span></h3> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {this.state.forgotPass === true && (
          <div className="dashboard-container container p-0 loginMainContainer ">
            <div className="animated slideInLeft" id="square">
              <div className="animated bounceInUp" id="leftSquare">
                <div className="animated bounceInUp text-center" id="circle">
                  <img className="img-fluid" src={logo} />
                </div>

                <h2 id="title">
                  Welcome to <br />
                  Cloud Security Analytics
                </h2>
                {/* <h3 id="subtitle">You are moments away from your first adventure.</h3> */}
              </div>
              <div className="animated bounceInDown" id="rightSquare">
                <div id="container">
                  {/* <h1 className="signup">Reset Password</h1> */}
                  <div className="animated slideInLeft form">
                    <div className="poseRelative">
                      <FontAwesomeIcon
                        className="calenderIcon"
                        color="#0C2461"
                        icon={faKey}
                      />
                      <Input
                        className="optin form-control mb-4"
                        type="password"
                        placeholder="Old Password"
                      />
                    </div>
                    <div className="poseRelative">
                      <FontAwesomeIcon
                        className="calenderIcon"
                        color="#0C2461"
                        icon={faKey}
                      />
                      <Input
                        className="optin form-control mb-4"
                        type="password"
                        placeholder="New Password"
                      />
                    </div>
                    <div className="poseRelative">
                      <FontAwesomeIcon
                        className="calenderIcon"
                        color="#0C2461"
                        icon={faKey}
                      />
                      <Input
                        className="optin form-control mb-4"
                        type="password"
                        placeholder="Re-enter New Password"
                      />
                    </div>
                    <Button
                      className="animated infinite pulse button btn-md btn-info mt-5"
                      onClick={this.toggleCompliance}
                    >
                      <FontAwesomeIcon
                        className=""
                        color="#ffffff"
                        icon={faSignInAlt}
                      />{" "}
                      Reset Password
                    </Button>
                    <h3 id="footer">
                      Go back to{" "}
                      <span
                        id="terms"
                        onClick={() => this.setState({ forgotPass: false })}
                      >
                        Login
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
