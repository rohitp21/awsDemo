import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, Card, CardTitle, CardBody, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import UtilClass from '../../SupportingJs/Util'
import { Accordion } from "../../Plugins/Accordion";
export default class EC2RegionsVolumes extends Component {
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
        //

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
                                        <NavLink className={'bt-1 innerA font-weight-500 bg1'
                                            // (this.state.displaybleData && this.state.displaybleData.includes(item[0]) ? "d-block" : "d-none")
                                            // (this.state.showThis == item[1].name ? "active " : null)
                                        }
                                            onClick={() => {
                                                this.toggle(item[0] + '_' + i);
                                            }}>{item[0]}
                                        </NavLink>
                                        <Nav vertical className="bgWhite ml-2">
                                            {
                                                Object.entries(item[1].volumes).map((volumes, j) =>
                                                    <NavItem key={j}>
                                                        <NavLink className={'innerA ' +
                                                            (this.state.displaybleData && this.state.displaybleData.includes(volumes[0]) ? "d-block" : "d-none")
                                                            // (this.state.showThis == item[1].name ? "active " : null)
                                                        }
                                                            onClick={() => {
                                                                this.toggle(volumes[1].name + '_' + i + '_' + j);
                                                            }}>
                                                            {volumes[1].name}


                                                        </NavLink>
                                                        {/* <Nav vertical className="bgWhite  ml-4">
                                                            {
                                                                Object.entries(vpcs[1].security_groups).map((securty_group, k) =>
                                                                    <NavItem key={k} className={
                                                                        (this.state.displaybleData && this.state.displaybleData.includes(securty_group[0]) ? "d-block" : "d-none")
                                                                    }>
                                                                        <NavLink onClick={() => {
                                                                            this.toggle(securty_group[1].name + '_' + i + '_' + j + '_' + k);
                                                                        }} className="blackColor-1 fs14">{securty_group[1].name}</NavLink>
                                                                    </NavItem>
                                                                )
                                                            }
                                                        </Nav> */}
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
                        <div className="dashboard-container container p-0  full_max_width">
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
                                    {
                                        Object.entries(item[1].volumes).map((volumes, j) =>

                                            <Card key={i + '_' + j}
                                                className={
                                                    (item[0] + '_' + i) +
                                                    " " +
                                                    (volumes[1].name + '_' + i + '_' + j) +
                                                    " detailCard poseRelative " +
                                                    (this.state.displaybleData && this.state.displaybleData.includes(volumes[0]) ? "d-block" : "d-none")
                                                }

                                            >
                                                <Accordion>
                                                    <Accordion.Item>
                                                        <Accordion.Header>
                                                            <CardTitle className="border_bottom_header p-3 font-weight-500">{volumes[1].name}</CardTitle>
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            <CardBody className="p-0">
                                                                <div className="p-3">
                                                                    <h4 className="pb-2 font-weight-500">Attributes</h4>
                                                                    {


                                                                        Object.entries(volumes[1]).map(([key, val]) =>
                                                                            <>
                                                                                <div className="mb-0">
                                                                                    <span className="font-weight-500">{key}:</span>
                                                                                    {Array.isArray(val) &&
                                                                                        Object.entries(val).map((item, i) =>
                                                                                            <div className="ml-10">
                                                                                                <div>{i}</div>

                                                                                                {
                                                                                                    Object.entries(item[1]).map(([key, val]) =>
                                                                                                        <>
                                                                                                            <div><span>{key}:</span><span> {val}</span></div>
                                                                                                        </>
                                                                                                    )
                                                                                                }
                                                                                            </div>

                                                                                        )
                                                                                    }
                                                                                    {!Array.isArray(val) &&
                                                                                        <span> {val}</span>
                                                                                    }


                                                                                </div>
                                                                            </>
                                                                        )

                                                                    }
                                                                </div>

                                                            </CardBody>

                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                                {/* <span onClick={(event) => this._dataContextUtil.toggleHeight(event)} className='posAbs moreDetailsBtn'>
                                                    <img className="img-fluid" src={require("../../assets/updown.svg")} />
                                                </span> */}
                                            </Card>



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