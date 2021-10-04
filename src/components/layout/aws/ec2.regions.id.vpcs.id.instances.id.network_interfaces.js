import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, CardText, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import UtilClass from '../../SupportingJs/Util'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
export default class EC2RegionsVpcsNetworkInterface extends Component {
    _dataContextUtil = new UtilClass();
    constructor(props) {

        super(props);
        console.log(this.props)
        this.state = {
            data: this.props.data,
            showAll: true,
            showThis: undefined
        }

    }
    async componentDidMount() {
        this.getData()
    }
    getData = () => {// api
        this.setState({
            displaybleData: this.props.displayableData,
            displaybleData2: this.props.displayableData2,
            displaybleData3: this.props.displayableData3
        })
    }
    toggle(tab) {
        let detailCard1 = document.querySelectorAll('.detailCard')
        let detailCard2 = document.getElementsByClassName(tab);
        for (var i = 0; i < detailCard1.length; i++) {
            detailCard1[i].classList.remove("d-block")
            detailCard1[i].classList.add("d-none")
        }
        for (var i = 0; i < detailCard2.length; i++) {
            detailCard2[i].classList.remove("d-none")
            detailCard2[i].classList.add("d-block");
        }


    }
    showAll() {
        // this.setState({
        //     showThis: undefined,
        //     showAll: true
        // })
        let detailCard = document.querySelectorAll('.detailCard')
        let elements = document.querySelectorAll('.serviceThirdLevelUl .nav-item');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove("d-none")
        }
        for (var i = 0; i < detailCard.length; i++) {
            detailCard[i].classList.remove("d-none")
        }
    }
    render() {

        return (

            <div>
                <Row>
                    <Col xs="3" sm="3" md="3" className="bgWhite serviceThirdLevelUl p-0">
                        <Nav vertical className="bgWhite">
                            <NavItem>
                                <NavLink
                                    className={'font-weight-500 ' +
                                        (this.state.showAll ? "active " : null)}

                                    onClick={() => {
                                        this.showAll()
                                    }}> Show All({this.state.data.length})</NavLink>
                                <hr className="mb-0" />
                            </NavItem>
                            {this.state.data ?
                                this.state.data.map((item, i) =>
                                    <NavItem key={i}>
                                        <NavLink className={'blackColor-1 innerA font-weight-500 bg1'
                                            // (this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                            // (this.state.showThis === item[1].name ? "active " : null)
                                        }
                                            onClick={() => {
                                                this.toggle(item[0] + '_' + i);
                                            }}>{item[0]}
                                        </NavLink>
                                        <Nav vertical className="bgWhite ml-2">
                                            {
                                                Object.entries(item[1].vpcs).map((vpcs, j) =>
                                                    <NavItem key={j}>
                                                        <NavLink className={'innerA '
                                                            // (this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                                            // (this.state.showThis === item[1].name ? "active " : null)
                                                        }
                                                            onClick={() => {
                                                                this.toggle(vpcs[0] + '_' + i + '_' + j);
                                                            }}>
                                                            {vpcs[0]}


                                                        </NavLink>
                                                        <Nav vertical className="bgWhite  ml-4">
                                                            {
                                                                Object.entries(vpcs[1].instances).map((instances, k) =>
                                                                    <NavItem key={k}
                                                                    >
                                                                        <NavLink onClick={() => {
                                                                            this.toggle(instances[0] + '_' + i + '_' + j + '_' + k);
                                                                        }} className="fs14">{instances[1].name}</NavLink>
                                                                        <Nav vertical className="bgWhite  ml-4">
                                                                            {
                                                                                Object.entries(instances[1].network_interfaces).map((network_interface, l) =>
                                                                                    <NavItem key={l}
                                                                                    >
                                                                                        <NavLink onClick={() => {
                                                                                            this.toggle(network_interface[0] + '_' + i + '_' + j + '_' + k + '_' + l);
                                                                                        }} className={
                                                                                            (this.state.displaybleData && this.state.displaybleData2 && this.state.displaybleData3 && this.state.displaybleData.includes(vpcs[0]) && this.state.displaybleData2.includes(instances[0]) && this.state.displaybleData3.includes(network_interface[0]) ? "d-block" : "d-none")
                                                                                        }>{network_interface[0]}</NavLink>
                                                                                    </NavItem>
                                                                                )
                                                                            }
                                                                        </Nav>
                                                                    </NavItem>
                                                                )
                                                            }
                                                        </Nav>
                                                    </NavItem>
                                                )

                                            }
                                        </Nav>


                                    </NavItem>
                                )
                                :
                                null
                            }
                        </Nav>
                    </Col>
                    <Col xs="9" sm="9" md="9">
                        {/* select view  starts */}
                        <div className="dashboard-container p-0  full_max_width">
                            <div className="row p-0">
                                <div className="col-md-12">
                                    <Breadcrumb tag="nav" listTag="div">
                                        <BreadcrumbItem className="link" onClick={() => this.props.history.push("/")} tag="a">Dashboard</BreadcrumbItem>
                                        <BreadcrumbItem className="link" onClick={() => this.props.history.goBack()} tag="a"> {this.props.whichDataToFetch} Dashboard</BreadcrumbItem>
                                        <BreadcrumbItem tag="a">{this.props.dbName}</BreadcrumbItem>
                                        <BreadcrumbItem active tag="span">Acc Id: {this.props.accId}</BreadcrumbItem>
                                    </Breadcrumb>

                                </div>
                            </div><hr />
                        </div>
                        {this.state.data ?
                            this.state.data.map((item, i) =>
                                <>
                                    {
                                        Object.entries(item[1].vpcs).map((vpcs, j) =>
                                            <>
                                                {
                                                    Object.entries(vpcs[1].instances).map((instances, k) =>
                                                        Object.entries(instances[1].network_interfaces).map((network_interface, l) =>
                                                            <div key={i + '_' + j + '_' + k + '_' + l}
                                                                className={
                                                                    (item[0] + '_' + i) +
                                                                    " " +
                                                                    (vpcs[0] + '_' + i + '_' + j) +
                                                                    " detailCard " +
                                                                    (instances[0] + '_' + i + '_' + j + '_' + k) +
                                                                    " " +
                                                                    (network_interface[0] + '_' + i + '_' + j + '_' + k + '_' + l) +
                                                                    " " +
                                                                    (this.state.displaybleData && this.state.displaybleData2 && this.state.displaybleData3 && this.state.displaybleData.includes(vpcs[0]) && this.state.displaybleData2.includes(instances[0]) && this.state.displaybleData3.includes(network_interface[0]) ? "d-block" : "d-none")
                                                                }

                                                            >
                                                                <Accordion>
                                                                    <AccordionSummary
                                                                        expandIcon={<ExpandMoreIcon />}
                                                                        aria-controls={"panel" + i + '_' + j + "a" + "-content"}
                                                                        id={"panel" + i + '_' + j + "d" + "-header"}
                                                                    >
                                                                        <h5>{network_interface[0]}</h5>
                                                                    </AccordionSummary>
                                                                    <AccordionDetails>

                                                                        <div className="px-2 py-1">
                                                                            <Divider />
                                                                            {
                                                                                network_interface[1] && Object.entries(network_interface[1]).map(([k, v]) =>
                                                                                    <div>
                                                                                        {k &&
                                                                                            typeof (v) !== 'object' &&
                                                                                            <div> <span>{k}:{(typeof (v) === 'boolean' && v === true ? 'Yes' : 'No') || v === null ? 'None' : v}</span></div>
                                                                                            ||
                                                                                            <>
                                                                                                <div className="mt-1">{k} -</div>
                                                                                                {
                                                                                                    typeof (v) === 'object' && Array.isArray(v) && v.map((item2, i2) =>
                                                                                                        typeof (item2) === 'object' && !Array.isArray(item2) && Object.entries(item2).map(([k2, v2]) =>
                                                                                                            typeof (v2) !== 'object' &&
                                                                                                            <div className="ml-2">{k2} : {(typeof (v2) === 'boolean' && v2 == true ? 'Yes' : 'No') || (typeof (v2) === 'string' && v2 === null ? 'None' : v2)}</div>
                                                                                                            ||
                                                                                                            <>
                                                                                                                <div className="mt-1">{k2} -</div>
                                                                                                                {
                                                                                                                    typeof (v2) === 'object' && !Array.isArray(v2) && Object.entries(v2).map(([k3, v3]) =>
                                                                                                                        <>
                                                                                                                            <div className="ml-2">{k3}:</div>
                                                                                                                            {
                                                                                                                                v3 && typeof (v3) === 'object' && !Array.isArray(v3) ?
                                                                                                                                    Object.entries(v3).map(([k4, v4]) =>
                                                                                                                                        <div className="ml-4 mt-1">{k4} - {(typeof (v4) === 'boolean' && v4 == true ? 'Yes' : 'No') || (typeof (v4) === 'string' && v4 === null ? 'None' : v4)}</div>
                                                                                                                                    )
                                                                                                                                    : null
                                                                                                                            }
                                                                                                                            {

                                                                                                                                v3 && typeof (v3) === 'object' && Array.isArray(v3) ?
                                                                                                                                    Object.entries(v3).map(([k4, v4]) =>
                                                                                                                                        <>
                                                                                                                                            <div className="ml-4">{k3}</div>
                                                                                                                                            {v4 && typeof (v4) === 'object' && !Array.isArray(v4) && Object.entries(v4).map(([k5, v5]) =>
                                                                                                                                                <div className="ml-4 mt-1">{k5}: {(typeof (v5) === 'boolean' && v5 == true ? 'Yes' : 'No') || (typeof (v5) === 'string' && v5 === null ? 'None' : v5)}</div>
                                                                                                                                            )
                                                                                                                                            }

                                                                                                                                        </>

                                                                                                                                    ) : null
                                                                                                                            }
                                                                                                                            {
                                                                                                                                <span className  = "ml-1"> {typeof (v3) === 'boolean' ? v3 === true ? 'Yes' : 'No' : null}</span>
                                                                                                                            }
                                                                                                                            {
                                                                                                                                <span className  = "ml-1"> {typeof (v3) === 'string' ? v3 : "none"}</span>
                                                                                                                            }


                                                                                                                        </>
                                                                                                                    )
                                                                                                                }
                                                                                                            </>
                                                                                                        )
                                                                                                    )}
                                                                                            </>

                                                                                        }
                                                                                    </div>
                                                                                )
                                                                            }

                                                                        </div>
                                                                    </AccordionDetails>
                                                                </Accordion>
                                                            </div>
                                                        )
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </>
                            )
                            : null
                        }

                    </Col>
                </Row>

            </div>
        )
    }
}