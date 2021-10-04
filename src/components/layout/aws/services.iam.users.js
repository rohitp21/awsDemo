import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import UtilClass from '../../SupportingJs/Util';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';export default class IamUsers extends Component {
    _dataContextUtil = new UtilClass();
    constructor(props) {

        super(props);
        console.log(this.props)
        this.state = {
            data: this.props.data,
            showAll: true,
            showThis: undefined,
            policies: this.props.policies
        }

    }
    async componentDidMount() {
        this.getData()
    }
    getData = () => {// api
        this.setState({
            displaybleData: this.props.displayableData
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
        let elements = document.querySelectorAll('.serviceThirdLevelUl .nav-link');
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
                        <Nav vertical className="browserHeight1  bgWhite">
                            <NavItem>
                                <NavLink
                                    className={
                                        (this.state.showAll ? "active " : null)}

                                    onClick={() => {
                                        this.showAll()
                                    }}> Show All({this.state.data.length})</NavLink>
                            </NavItem>
                            {this.state.data ?
                                this.state.data.map((item, i) =>
                                    <NavItem key={i}>
                                        <NavLink className={'bt-1 innerA font-weight-500 ' +
                                            (this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                            // (this.state.showThis ===  item[1].name ? "active " : null)
                                        }
                                            onClick={() => {
                                                this.toggle(item[1].name + '_' + i);
                                            }}>{item[1].name}
                                        </NavLink>



                                    </NavItem>
                                )
                                :
                                null
                            }
                        </Nav>
                    </Col>
                    <Col xs="9" sm="9" md="9">
                        {/* select view  starts */}
                        <div className="dashboard-container container p-0  full_max_width">
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
                                <div
                                    className={
                                        (item[1].name + '_' + i) +
                                        " detailCard poseRelative " +
                                        // (this.state.showAll ? "d-block " : "d-none ") +
                                        // (this.state.showThis ===  item[1].name ? "d-block " : "d-none ")
                                        (this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                    }

                                >

                                    <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={"panel" + i + "a" + "-content"}
                                        id={"panel" + i + "d" + "-header"}
                                        >
                                                <h5>{item[1].name}</h5>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Divider className="mt-3"/>
                                                    <div className="pt-3">
                                                        <h5>Information</h5>
                                                        <p className="mb-0">Creation date: {item[1].CreateDate}</p>
                                                    </div>
                                                    <Divider />
                                                    <div className="pt-3">
                                                        <h5>Authentication methods</h5>
                                                        <div>
                                                            <div className="m-1"><span className="font-weight-600">Password enabled: </span><span>{item[1].hasOwnProperty("LoginProfile") ? "Yes" : "No"}</span>
                                                            </div>
                                                            <div className="m-1"><span className="font-weight-600">Multi-Factor enabled: </span><span>{item[1].MFADevices.length > 0 ? "Yes" : "No"}</span></div>
                                                            <div className="m-1"><span className="font-weight-600">Access Keys: {item[1].AccessKeys.length}</span><span>{item[1].AccessKeys.length > 0 &&
                                                                <div>
                                                                    {

                                                                        item[1].AccessKeys.map((item, i) =>
                                                                            <>
                                                                                <hr />
                                                                                <div>AccessKeyId: {item.AccessKeyId}</div>
                                                                                <div>Creation Date: {item.CreateDate}</div>
                                                                                <div>Status: {item.Status}</div>
                                                                            </>
                                                                        )

                                                                    }
                                                                    <>
                                                                        {item[1].AccessKeys.length > 0 &&
                                                                            <div className="font-weight-600"> Review the need for password-based and key-based authentication</div>

                                                                        }
                                                                        {item[1].AccessKeys.length > 1 &&
                                                                            <div className="font-weight-600">  Review the need for multiple active access keys

                                                                </div>

                                                                        }
                                                                    </>
                                                                </div>}
                                                            </span>
                                                            </div>

                                                        </div>
                                                    </div><hr />
                                                    <div className="p-3">
                                                        <h5>Groups({item[1].groups.length})</h5>
                                                        {
                                                            item[1].groups.length > 0 && item[1].groups.map((item, i) =>
                                                                <div>

                                                                    <div>{item}</div>

                                                                </div>
                                                            )

                                                        }
                                                    </div><hr />
                                                    <div className="p-3">
                                                        <h5>Inline Policies({item[1].inline_policies_count})</h5>
                                                        {
                                                            Object.entries(item[1].inline_policies).map((item2, i) =>
                                                                <>
                                                                    <div>
                                                                        {item2[0] &&
                                                                            <div>
                                                                                {item2[0]}<br />
                                                                                <code className="mb-0">{
                                                                                    Object.entries(JSON.stringify(item2[1].PolicyDocument)).map(([key, val]) =>
                                                                                        <>
                                                                                            {val ===  '{' || val ===  '}' || val ===  '[' || val ===  ']' || val ===  ',' ?
                                                                                                <span>{val}<br /></span>
                                                                                                :
                                                                                                <span>{val}</span>
                                                                                            }


                                                                                        </>

                                                                                    )
                                                                                }
                                                                                </code>

                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </>
                                                            )


                                                        }

                                                    </div><hr />
                                                    <div className="pt-3">
                                                        <h5>Managed Policies({item[1].policies_counts})</h5>
                                                        {
                                                            item[1].policies && item[1].policies.map((item, i) =>
                                                                <>
                                                                    <span>{item}<br /></span>
                                                                </>
                                                            )


                                                        }

                                                    </div>

                                                </AccordionDetails>
                                    </Accordion>
                                    {/* <span onClick={(event) => this._dataContextUtil.toggleHeight(event)} className='posAbs moreDetailsBtn'>
                                        <img className="img-fluid" src={require("../../assets/updown.svg")} />
                                    </span> */}
                                </div>
                            )
                            : null
                        }

                    </Col>
                </Row>

            </div >
        )
    }
}