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
import axios from 'axios';
export default class Login extends Component {
  async componentDidMount() {
    let url = localStorage.getItem('apiURL')
    await axios.get(window.location.origin + "/api/" + "discover").then(response => {
      console.log(response);

      let respdata = response.data.data

      this.unBlockUi();
      if (respdata && respdata != "NE") {
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


  render() {
    return (
      <div>Test</div>
    )
  }
}
