import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import UtilClass from '../../SupportingJs/Util'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
export default class IamPasswordPolicy extends Component {
    _dataContextUtil = new UtilClass();
    constructor(props) {
        debugger
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
                    {/* <Col xs="3" sm="3" md="3" className="bgWhite serviceThirdLevelUl p-0">
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
                                        <NavLink className={'bt-1 innerA font-weight-500 bg1 ' +
                                            (this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                            // (this.state.showThis == item[1].name ? "active " : null)
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
                    </Col> */}
                    <Col xs="12" sm="12" md="12">
                        {/* select view  starts */}
                        <div className="dashboard-container p-0  full_max_width">
                            <div className="row p-0">
                                <div className="col-md-12">
                                    <Breadcrumb tag="nav" listTag="div">
                                        <BreadcrumbItem className="link" onClick={() => this.props.history.push("/")} tag="a">Dashboard</BreadcrumbItem>
                                        <BreadcrumbItem className="link" onClick={() => this.props.history.goBack()} tag="a"> {this.props.whichDataToFetch} Dashboard</BreadcrumbItem>
                                        <BreadcrumbItem tag="a">{this.props.dbName}</BreadcrumbItem>
                                        <BreadcrumbItem active tag="span">Acc ID: {this.props.accId}</BreadcrumbItem>
                                    </Breadcrumb>

                                </div>
                            </div><hr />
                        </div>
                        {this.state.data &&
                            <div
                                className={
                                    " detailCard poseRelative "
                                    // (this.state.showAll ? "d-block " : "d-none ") +
                                    // (this.state.showThis == item[1].name ? "d-block " : "d-none ")
                                }

                            >
                                <Accordion open={0}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        >
                                            <h5>Password Policy</h5>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                                <div className="p-3">
                                                <ListGroup>
                                                    {
                                                        this.state.data.map((item, i) =>
                                                            <ListGroupItem><span className="font-weight-600">{item[0]} :</span>

                                                                {typeof (item[1]) == "boolean" &&

                                                                    <span>{item[1] ? "Yes" : "No"}</span>
                                                                }
                                                                {typeof (item[1]) != "boolean" &&

                                                                    <span>{item[1]}</span>
                                                                }

                                                            </ListGroupItem>
                                                        )
                                                    }
                                                    </ListGroup>
                                                </div>

                                            </AccordionDetails>
                              
                                {/* <span onClick={(event) => this._dataContextUtil.toggleHeight(event)} className='posAbs moreDetailsBtn'>
                                    <img className="img-fluid" src={require("../../assets/updown.svg")} />
                                </span> */}
                                </Accordion>
                            </div>
                        }

                    </Col>
                </Row>

            </div>
        )
    }
}