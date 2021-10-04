import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import UtilClass from '../../SupportingJs/Util';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
export default class SesIdentities extends Component {
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
                                        <NavLink className={'bt-1 blackColor-1 innerA font-weight-500 bg1'
                                            // (this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                            // (this.state.showThis ===  item[1].name ? "active " : null)
                                        }
                                            onClick={() => {
                                                this.toggle(item[0] + '_' + i);
                                            }}>{item[1].name}
                                        </NavLink>
                                        <Nav vertical className="bgWhite ml-2">
                                            {
                                                Object.entries(item[1].identities).map((identities, j) =>
                                                    <NavItem key={j}>
                                                        <NavLink className={'innerA ' +
                                                            (this.state.displaybleData && this.state.displaybleData.includes(identities[0]) ? "d-block" : "d-none")
                                                            // (this.state.showThis ===  item[1].name ? "active " : null)
                                                        }
                                                            onClick={() => {
                                                                this.toggle(identities[0] + '_' + i + '_' + j);
                                                            }}>
                                                            {identities[1].name}

                                                        </NavLink>
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
                                        Object.entries(item[1].identities).map((identities, j) =>
                                            <div key={i + '_' + j}
                                                className={
                                                    (item[0] + '_' + i) +
                                                    " " +
                                                    (identities[0] + '_' + i + '_' + j) +
                                                    " detailCard poseRelative " +
                                                    // (this.state.showAll ? "d-block " : "d-none ") +
                                                    // (this.state.showThis ===  item[1].name ? "d-block " : "d-none ")
                                                    (this.state.displaybleData && this.state.displaybleData.includes(identities[0]) ? "d-block" : "d-none")
                                                }
                                            >
                                                <Accordion open={j}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls={"panel" + i + "a" + "-content"}
                                                    id={"panel" + i + "d" + "-header"}
                                                    >
                                                        <h5>{identities[1].name}</h5>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Divider/>
                                                                <div className="pt-3">
                                                                    <h5>DKIM Configuration</h5>
                                                                 <ListGroup key={i}>
                                                                    <ListGroupItem className="pb-2 font-weight-500">Enabled: {identities[1].DkimEnabled ? "True" : "False"}</ListGroupItem>
                                                                    <ListGroupItem className="pb-2 font-weight-500">Verification Status: {identities[1].DkimVerificationStatus}</ListGroupItem>
                                                                </ListGroup>
                                                                </div>
                                                            <Divider/>
                                                                <div className="pt-3">
                                                                    <h5>Policies({identities[1].policies_count})</h5>
                                                                    {
                                                                        Object.entries(identities[1].policies).map(([key, val]) =>
                                                                            <>
                                                                                <div>
                                                                                    {key &&
                                                                                        <div>
                                                                                            {key}<br />
                                                                                            <code className="mb-0">{
                                                                                                Object.entries(JSON.stringify(val.Statement)).map(([key, val]) =>
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


                                                                </div>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                {/* <span onClick={(event) => this._dataContextUtil.toggleHeight(event)} className='posAbs moreDetailsBtn'>
                                                    <img className="img-fluid" src={require("../../assets/updown.svg")} />
                                                </span> */}

                                            </div>
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