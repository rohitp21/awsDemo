import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import UtilClass from '../../SupportingJs/Util'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class Elbv2Listener extends Component {
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
            displayableData: this.props.displayableData,
            displayableData2: this.props.displayableData2,
            displayableData3: this.props.displayableData3,
            displayableData4: this.props.displayableData4,

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
                                    className={'font-weight-500 '
                                        // (this.state.showAll ? "active " : null)
                                    }
                                    onClick={() => {
                                        this.showAll()
                                    }}> Show All({this.state.data.length})</NavLink>
                                {/* <hr className="mb-0" /> */}
                            </NavItem>


                            {this.state.data ?
                                this.state.data.map((item, i) =>
                                    <NavItem key={i}>
                                        <NavLink className={'blackColor-1 innerA font-weight-500 bg1 bt-1'} onClick={() => this.toggle(item[0] + '_' + i)}>{item[1].name}
                                        </NavLink>
                                        <Nav vertical className="bgWhite ml-2">
                                            {
                                                item[1] && Object.entries(item[1].vpcs).map((v, j) =>
                                                    <NavItem key={j}>
                                                        <NavLink className={'innerA '}
                                                            onClick={() => this.toggle(v[0] + '_' + i + '_' + j)}>
                                                            {v[1].name}
                                                        </NavLink>
                                                        <Nav vertical className="bgWhite  ml-4">
                                                            {
                                                                v[1] && Object.entries(v[1].lbs).map((lbs, k) =>
                                                                    <NavItem key={k} className={"hhh"
                                                                    }>
                                                                        <NavLink onClick={() => { this.toggle(lbs[1].name + '_' + i + '_' + j + '_' + k) }} className="fs14">{lbs[1].name}</NavLink>
                                                                        <Nav vertical className="bgWhite  ml-4">
                                                                            {
                                                                                lbs[1] && Object.entries(lbs[1].listeners).map((listener, l) =>
                                                                                    <NavItem key={l} className={
                                                                                        (this.state.displayableData &&
                                                                                            this.state.displayableData2 &&
                                                                                            this.state.displayableData3 &&
                                                                                            this.state.displayableData4 &&
                                                                                            this.state.displayableData.includes(item[0]) &&
                                                                                            this.state.displayableData2.includes(v[0]) &&
                                                                                            this.state.displayableData3.includes(lbs[0]) &&
                                                                                            this.state.displayableData4.includes(listener[0])
                                                                                            ? "d-block" : "d-none")
                                                                                    }>
                                                                                        <NavLink onClick={() => {
                                                                                            this.toggle(listener[0] + '_' + i + '_' + j + '_' + k + '_' + l);
                                                                                        }} className="fs14">{listener[0]}</NavLink>
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
                        <div className="dashboard-container p-0  full_max_width">
                            <div className="row p-0">
                                <div className="col-md-12">
                                    <Breadcrumb tag="nav" listTag="div">
                                        <BreadcrumbItem className="link" onClick={() => this.props.history.push("/")} tag="a">Dashboard</BreadcrumbItem>
                                        <BreadcrumbItem className="link text-capitalize" onClick={() => this.props.history.goBack()} tag="a"> {this.props.whichDataToFetch} Dashboard</BreadcrumbItem>
                                        <BreadcrumbItem tag="a">{this.props.dbName}</BreadcrumbItem>
                                        <BreadcrumbItem active tag="span">Acc ID: {this.props.accId}</BreadcrumbItem>
                                    </Breadcrumb>
                                </div>
                            </div><hr />
                        </div>
                        {this.state.data ?
                            this.state.data.map((item, i) =>
                                <>
                                    {item[1] && Object.entries(item[1].vpcs).map((v, j) =>
                                        v[1] && Object.entries(v[1].lbs).map((lbs, k) =>
                                            lbs[1] && Object.entries(lbs[1].listeners).map((listener, l) =>
                                                <div key={i + '_' + j + '_' + k + '_' + l}
                                                    className={
                                                        (item[0] + '_' + i) +
                                                        " " +
                                                        (v[0] + '_' + i + '_' + j) +
                                                        " detailCard poseRelative " +
                                                        (lbs[1].name + '_' + i + '_' + j + '_' + k) +
                                                        " " +
                                                        listener[0] + '_' + i + '_' + j + '_' + k + '_' + l +
                                                        " " +
                                                        (this.state.displayableData &&
                                                            this.state.displayableData2 &&
                                                            this.state.displayableData3 &&
                                                            this.state.displayableData4 &&
                                                            this.state.displayableData.includes(item[0]) &&
                                                            this.state.displayableData2.includes(v[0]) &&
                                                            this.state.displayableData3.includes(lbs[0]) &&
                                                            this.state.displayableData4.includes(listener[0])
                                                            ? "d-block" : "d-none")
                                                    }

                                                >
                                                    {/* <span onClick={(event) => this._dataContextUtil.toggleHeight(event)} className='posAbs moreDetailsBtn'>
                                                        <img className="img-fluid" src={require("../../assets/updown.svg")} />
                                                    </span> */}
                                                    <Accordion>
                                                        <AccordionSummary
                                                         expandIcon={<ExpandMoreIcon />}
                                                         aria-controls={"panel" + i + '_' + j + "a" + "-content"}
                                                         id={"panel" + i + '_' + j + "d" + "-header"}
                                                         >
                                                            <h5 className="border_bottom_header p-3 font-weight-500">{item[0]}/{lbs[1].name}/{listener[0]}</h5>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <div className="px-2 py-1">
                                                                    {
                                                                        listener[1] && Object.entries(listener[1]).map(([k, v]) =>
                                                                            <div>
                                                                                {k &&
                                                                                    typeof (v) != 'object' &&
                                                                                    <div>{k} : {v} <hr /></div>
                                                                                    ||
                                                                                    <>
                                                                                        <div className="mt-1">{k} -</div>
                                                                                        {
                                                                                            typeof (v) === 'object' && Array.isArray(v) && v.map((item2, i2) =>
                                                                                                typeof (item2) === 'object' && !Array.isArray(item2) && Object.entries(item2).map(([k2, v2]) =>
                                                                                                    typeof (v2) != 'object' &&
                                                                                                    <div className="ml-2">{k2} : {v2}</div>
                                                                                                    ||
                                                                                                    <>
                                                                                                        <div className="mt-1">{k2} -</div>
                                                                                                        {
                                                                                                            typeof (v2) === 'object' && !Array.isArray(v2) && Object.entries(v2).map(([k3, v3]) =>
                                                                                                                <>
                                                                                                                    <div className="ml-2">{k3}</div>
                                                                                                                    {
                                                                                                                        v3 && typeof (v3) === 'object' && !Array.isArray(v3) && Object.entries(v3).map(([k4, v4]) =>
                                                                                                                            <div className="ml-4 mt-1">{k4} - {typeof (v4) === 'boolean' && v4 ? 'Yes' : 'No'}</div>
                                                                                                                        )
                                                                                                                        ||
                                                                                                                        v3 && typeof (v3) === 'object' && Array.isArray(v3) && Object.entries(v3).map(([k4, v4]) =>
                                                                                                                            <>
                                                                                                                                <div className="ml-4">{k3}</div>
                                                                                                                                {v4 && typeof (v4) === 'object' && !Array.isArray(v4) && Object.entries(v4).map(([k5, v5]) =>
                                                                                                                                    <div className="ml-4 mt-1">{k5}: {v5}</div>
                                                                                                                                )
                                                                                                                                }
                                                                                                                            </>

                                                                                                                        )
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
                                    )
                                    }
                                </>
                            )
                            : null
                        }
                    </Col>
                </Row>
            </div >
        )
    }
}