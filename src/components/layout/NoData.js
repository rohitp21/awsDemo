import React, { Component } from 'react';
import SleekSlider from '../Plugins/SleekSlider';
import ApiService from '../../services/APIService';
import * as Constants from '../../data/Constants';
import { withRouter } from "react-router-dom";
import UtilClass from '../SupportingJs/Util'
import { Button, Input } from "reactstrap";
import BlockUi from "react-block-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSignInAlt,
    faUserCircle,
    faKey,
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
//let data = undefined;
//set withcredeintial true
axios.defaults.withCredentials = true;
var data = []
class NoData extends Component {
    _dataContext = new ApiService();
    _dataContextUtil = new UtilClass();
    state = {
        aws_input_string: ''
    }
    async getComplianceData() {
        let param = { "account": "887220118845", "start_date": "2020-07-14T00:00:00", "end_date": "2020-07-14T23:59:59.999999" }
        let data2 = await this._dataContext.postMethod(Constants.URL12, param);
        data = data2.data;
    }
    constructor(props) {
        super(props)
    }
    onDiscover = async (event) => {
        // let respdata=  {
        //     "data": [
        //         {
        //             "account_id": "992975533141",
        //             "name": "kapstonellc"
        //         },
        //         {
        //             "account_id": "904821997617",
        //             "name": "AWSReservedSSO_AWSReadOnlyAccess_30d4222fe09952f0/amrish.mishra@kapstonellc.com"
        //         }
        //     ],
        //     "message": "Discovery Started",
        //     "status": 200
        // }
        // this.props.history.push('/aws_accounts', respdata);
        this.blockUi();
        let url = localStorage.getItem('apiURL')
        //await axios.get(Constants.URLSERVER+'discover').then(response => {
        await axios.get(window.location.origin + '/api/' + 'discover').then(response => {
            console.log(response);
            let respdata = response.data
            this.props.history.push('/aws_accounts', respdata);
        }).catch(error => {
            let respdata = "NE"
            console.log(error);
        })
        this.unBlockUi();

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
                <BlockUi tag="div" blocking={this.state.isLoading} />
                {

                    this.props.showCompliance !== undefined && this.props.showCompliance === "0" &&
                    <>
                        {/* <div className="wave-container dashboard-container container my-4 noDataContainer text-center h-auto">
                            <div className="row nodataHome">
                                <div className="col-md-12 p-0">
                                    <h4 className="posAbs p-2"> Welcome to Kapstone Cloud Security Analytics</h4>
                                    <SleekSlider />
                                </div>
                                
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0C2461" fill-opacity="1" d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,224C840,245,960,267,1080,256C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                        </div> */}
                        <div className="dashboard-container container my-5 p-5 noDataContainer text-center h-auto">
                            <h4 className=""> We Provide cloud solutions for following platforms and many more..</h4>
                            <div className="row text-center nodataHome mt-4">
                                <div className="cloudLogoContainer col-md-3 border-right-1">
                                    <img style={{ boxShadow: '0px 7px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(201 216 255)', borderRadius: '10px' }} className="img-fluid" alt="awsCloudLogo" src={require("../assets/img/awsCloudLogo.png")} />
                                </div>
                                <div className="cloudLogoContainer col-md-3 border-right-1">
                                    <img className="img-fluid" alt="ociCloudLogo" src={require("../assets/img/ociCloudLogo.png")} />
                                </div>
                                <div className="cloudLogoContainer col-md-3 border-right-1">
                                    <img className="img-fluid" alt="azzureCloudLogo" src={require("../assets/img/azzureCloudLogo.png")} />
                                </div>
                                <div className="cloudLogoContainer col-md-3">
                                    <img className="img-fluid" alt="gcpCloudLogo" src={require("../assets/img/gcpCloudLogo.png")} />
                                </div>
                                <div className="col-md-12 mt-5">
                                    <Input
                                        className="optin form-control"
                                        defaultValue={this.state.aws_input_string}
                                        onChange={(e) => {
                                            this.setState({ aws_input_string: e.target.value });
                                        }}
                                        type="text"
                                        placeholder="Enter input for AWS Accounts"
                                    />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <Button
                                        className="animated infinite pulse button btn-md btn-info"
                                        onClick={this.onDiscover}
                                    >
                                        Discover
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        )
    }
}
export default withRouter(NoData)