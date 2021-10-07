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
import UtilClass from '../SupportingJs/Util'
import * as Constants from "../../data/Constants";
import logo from "../assets/kapstone-logo.png";
import { Divider } from "@material-ui/core";
export default class Login extends Component {



  render() {
    return (
      <div>Test</div>
    )
  }
}
