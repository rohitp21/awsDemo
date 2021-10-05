import React, { Component } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Header from '../layout/Header'
import ServiceFinding from '../layout/ServiceFinding';
import * as namesMapping from '../../data/namesMapping'
export default class DashboardService extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            //activeTab: Number(localStorage.getItem("whichTab")),
            //labels: this.props.location.state.labels2,
            //accId: this.props.location.state.accId,
            //activeComp: this.props.location.state.activeComp,
            accId:this.props.location.state.accId,
            serviceName:this.props.location.state.serviceName
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            localStorage.setItem("whichTab", tab)
            this.setState({
                activeTab: tab
            });
        }
    }
    async componentDidMount() {
        //this.getLabelsData()
    }
    // getLabelsData = () => {// api
    //     this.setState({ labels: this.props.location.state.labels2 })
    // }
    render() {
        // console.log("zzzzzzz"+this.state.labels);
        return (
            <>
            <Header/>
            <div className="dashboard-container ">
                <Row className="w-100">
                    {/* <Col xs="2" sm="1" md="1" className="bgWhite cust-boxShadow-1 pr-0">
                        <Nav tabs vertical pills className="bgWhite verticalTab browserHeight1">
                            <NavItem>

                                <NavLink
                                    className="backToDashboardIcon"
                                    onClick={() => {
                                        this.props.history.push("/")
                                    }}
                                >
                                    <img className="img-fluid" alt="four-squares" src={require("../assets/four-squares.svg")} />

                                </NavLink>
                            </NavItem>
                            {
                                this.state.labels ?
                                    this.state.labels.map((item, i) =>
                                        <NavItem className="sIconContainer" key={i}>

                                            <NavLink
                                                className={classnames(item.level, { active: this.state.activeTab === i })}
                                                onClick={() => {
                                                    this.toggle(i);
                                                }}
                                            >
                                                {localStorage.getItem("cpro") === 'aws' ?
                                                    <img className="img-fluid" alt={item.label} src={require("../assets/img/aws/" + item.label + ".svg")} />
                                                    : null
                                                }
                                                {localStorage.getItem("cpro") === 'oci' ?
                                                    <img className="img-fluid" alt={item.label} src={require("../assets/img/oci/" + item.label + ".svg")} />
                                                    :
                                                    null
                                                }
                                                {localStorage.getItem("cpro") === 'azure' ?
                                                    <img className="img-fluid"  alt={item.label} src={require("../assets/img/azure/" + item.label + ".svg")} />
                                                    :
                                                    null
                                                }

                                                <div>

                                                    {localStorage.getItem("cpro") === 'aws' ? (namesMapping.awsServiceNames.hasOwnProperty(item.label) ? namesMapping.awsServiceNames[item.label] : item.label) : null}

                                                    {localStorage.getItem("cpro") === 'oci' ? (namesMapping.ociServiceNames.hasOwnProperty(item.label) ? namesMapping.ociServiceNames[item.label] : item.label) : null}
                                                    {localStorage.getItem("cpro") === 'azure' ? (namesMapping.azureServiceNames.hasOwnProperty(item.label) ? namesMapping.azureServiceNames[item.label] : item.label) : null}
                                                </div>
                                            </NavLink>
                                        </NavItem>
                                    )
                                    :
                                    null
                            }
                        </Nav>
                    </Col> */}
                    <Col xs="12" sm="12" md="12">

                        {/* <TabContent activeTab={this.state.activeTab}>
                            {
                                this.state.labels ?
                                    this.state.labels.map((item, i) =>
                                        <TabPane key={i} tabId={i}>
                                            {this.state.activeTab === i ?
                                                <ServiceFinding activeComp={this.state.activeComp} labels={this.state.labels} accountId={this.state.accId} whichDataToFetch={item.label} activeTab={this.state.activeTab} />
                                                :
                                                null
                                            }
                                        </TabPane>
                                    )
                                    :
                                    null
                            }
                        </TabContent>
                        
 */}
  <TabContent>
                           
                                                <ServiceFinding accId={this.state.accId} serviceName={this.state.serviceName}/>
                                               
                        </TabContent>


                    </Col>
                </Row>
            </div>
            </>
        )
    }
}
