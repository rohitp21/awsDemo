import React, { Component } from "react";
import Header from "../layout/Header";
import NoData from "../layout/NoData";
import { withRouter } from "react-router-dom";
import ApiService from "../../services/APIService";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { ToastContainer, toast } from "react-toastify";
import UtilClass from "../SupportingJs/Util";

//const url = "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en&:display_count=y&:origin=viz_share_link"
const url =
  "https://public.tableau.com/views/COVID-19HumanResources/COVID-19HRDashboard?:language=en&:display_count=y&:origin=viz_share_link";

class Dashboard extends Component {
  _dataContext = new ApiService();
  _dataContextUtil = new UtilClass();
  state = {
    showCompliance: "0",
    compData: undefined,
  };
 componentDidMount(){
  if(localStorage.getItem('cp') == window.location.href){
    localStorage.removeItem('sA')
}
 }
  render() {
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
        {/* select account id starts */}
        <div className="dashboard-container p-0 my-2">
          <hr />
        </div>
        {/* select account id ends */}
        {/* {this.state.summary.length === 0 && ( */}
          <NoData
            data={this.state.compData}
            showCompliance={this.state.showCompliance}
          />
        {/* )} */}

        {/* {this.state.showTablaue === "1" && (
          <TabluePoc1 className="iFrameContainer" url={url} />
        )} */}
      </div>
    );
  }
}

export default withRouter(Dashboard);
