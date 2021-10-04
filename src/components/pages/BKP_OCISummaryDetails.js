import React, { Component } from 'react'
import { Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import OCISummaryType from '../layout/oci/OCISummaryType';
import UtilClass from '../SupportingJs/Util'
var apiData = [
    {
        "type": "summary"
    },
    {
        "type": "identity"
    },
    {
        "type": "announcement"
    },
    {
        "type": "cost"
    },
    {
        "type": "region",
        "region": "regionname1"
    },
    {
        "type": "region",
        "region": "regionname2"
    }
];
export default class OCISummaryDetails extends Component {
    _dataContextUtil = new UtilClass();
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: 0,
        };
    }

    toggle(tab, which) {
        
        //if (this.state.activeTab !== tab) {
        //localStorage.setItem("whichTab",tab)
        this.setState({
            activeTab: tab,
            whichData: which
        });
        //}
        this.getData();
    }
    getData = async () => {//second api
        debugger
        var apiData2 =
            [
                {
                    "data": "compartment_wise"
                },
                {
                    "data": "regions_wise"
                },
                {
                    "data": "total"
                }
            ]
        this.setState({
            data2: apiData2
        });

    }
    async componentDidMount() {
        this.toggle(0,undefined)
        this.setState({
            data: apiData
        })
    }

    render() {
        return (
            <div className="dashboard-container container">
                <Row>
                    <Col xs="2" sm="1" md="1" className="bgWhite p-0 cust-boxShadow-1">
                        <Nav tabs vertical pills className="bgWhite verticalTab browserHeight1 summaryDetailsOCI">
                            <NavItem>

                                <NavLink
                                    className="backToDashboardIcon"
                                    onClick={() => {
                                        this.props.history.push("/")
                                    }}
                                >
                                    <img className="img-fluid" src={require("../assets/four-squares.svg")} />

                                </NavLink>
                            </NavItem>
                            {
                                this.state.data ?
                                    this.state.data.map((item, i) =>
                                        <NavItem className={"sIconContainer " + item.type} key={i}>

                                            <NavLink
                                                className={classnames({ active: this.state.activeTab == i })}
                                                onClick={() => {
                                                    this.toggle(i, item.type);
                                                }}
                                            >
                                                <div>
                                                    {
                                                        item != undefined &&

                                                        <>
                                                            <img className="img-fluid" src={require("../assets/img/oci/OCIDetails/" + item.type + ".svg")} /><br />
                                                            <span className="fs14">{this._dataContextUtil.toTitleCase(item.type != "region" ? item.type : item.region)}</span>
                                                        </>

                                                    }
                                                </div>
                                            </NavLink>
                                        </NavItem>
                                    )
                                    :
                                    <div>No Data Available</div>
                            }
                        </Nav>
                    </Col>
                    <Col xs="10" sm="11" md="11">

                        <div>
                            {
                                this.state.data ?
                                    <div>
                                        {this.state.whichData}

                                        <OCISummaryType data={this.state.apiData2} whichData={this.state.whichData} />

                                        {/* <ShowOCIDataSummary data={this.state.summaryData} /> */}

                                    </div>

                                    :
                                    null
                            }
                        </div>

                    </Col>
                </Row>
            </div>
        )
    }
}
