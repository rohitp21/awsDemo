import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Nav, NavItem, NavLink, CardText, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import UtilClass from '../../SupportingJs/Util'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider } from '@material-ui/core';
export default class EC2RegionsInstances extends Component {
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
                                                                        className={
                                                                            (this.state.displaybleData && this.state.displaybleData.includes(instances[0]) ? "d-block" : "d-none")
                                                                        }
                                                                    >
                                                                        <NavLink onClick={() => {
                                                                            this.toggle(instances[0] + '_' + i + '_' + j + '_' + k);
                                                                        }} className="fs14">{instances[1].name}</NavLink>
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
                                                        <div key={i + '_' + j + '_' + k}
                                                            className={
                                                                (item[0] + '_' + i) +
                                                                " " +
                                                                (vpcs[0] + '_' + i + '_' + j) +
                                                                " detailCard poseRelative " +
                                                                (instances[0] + '_' + i + '_' + j + '_' + k) +
                                                                " " +
                                                                // (this.state.showAll ? "d-block " : "d-none ") +
                                                                // (this.state.showThis === item[1].name ? "d-block " : "d-none ")
                                                                (this.state.displaybleData && this.state.displaybleData.includes(instances[0]) ? "d-block" : "d-none")
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
                                                                    <h5>{instances[1].name}</h5>
                                                            </AccordionSummary>
                                                                    <AccordionDetails>
                                                                            <div>
                                                                                <Divider className="mb-3"/>
                                                                                <h5>Information</h5>
                                                                                <ListGroup key={ 'list-'+ i}>
                                                                                    <ListGroupItem className="mb-0"><span className="font-weight-500">ID: </span>{instances[1].id}</ListGroupItem>
                                                                                    <ListGroupItem className="mb-0"><span className="font-weight-500">Region: </span>{item[0]}</ListGroupItem>
                                                                                    <ListGroupItem className="mb-0"><span className="font-weight-500">VPC: </span>{vpcs[0]}</ListGroupItem>
                                                                                    <ListGroupItem className="mb-0"><span className="font-weight-500">Reservation ID: </span>{instances[1].reservation_id}</ListGroupItem>
                                                                                    <ListGroupItem className="mb-0"><span className="font-weight-500">Monitoring: </span>{instances[1].monitoring_enabled ? "Enebled" : "Disabled"}</ListGroupItem>
                                                                                    <ListGroupItem className="mb-0"><span className="font-weight-500">Access Key Name: </span>{instances[1].KeyName}</ListGroupItem>
                                                                                    <ListGroupItem className="mb-0"><span className="font-weight-500">State: </span>{instances[1].State.Name}</ListGroupItem>
                                                                                    <ListGroupItem className="mb-0"><span className="font-weight-500">Instance Type: </span>{instances[1].InstanceType}</ListGroupItem>
                                                                                    <ListGroupItem className="mb-0"><span className="font-weight-500">Up Since: </span>{instances[1].LaunchTime}</ListGroupItem>
                                                                                </ListGroup>
                                                                            <div className="p-3">
                                                                                {
                                                                                    Object.entries(instances[1].network_interfaces).length > 0 &&
                                                                                    <>
                                                                                        <h5 className="pb-2 font-weight-500">Network interfaces</h5>
                                                                                        {
                                                                                            Object.entries(instances[1].network_interfaces).map((item, n) =>
                                                                                                <>
                                                                                                    <CardText className="mb-0"><span className="font-weight-500">{item[0]}</span></CardText>
                                                                                                    {
                                                                                                        item[1].Association != null &&
                                                                                                        Object.entries(item[1].Association).map((item2, m) =>
                                                                                                            <CardText className="mb-0"><span className="font-weight-500">{item2[0]}:</span> <span>{item2[1]}</span></CardText>

                                                                                                        )
                                                                                                    }
                                                                                                    {
                                                                                                        item[1].PrivateIpAddresses != null &&
                                                                                                        item[1].PrivateIpAddresses.map((item3, r) =>
                                                                                                            <CardText className="mb-0"><span className="font-weight-500">PrivateIpAddress:</span> <span>{item3.PrivateIpAddress}</span></CardText>

                                                                                                        )
                                                                                                    }
                                                                                                    {
                                                                                                        item[1].Groups != null &&
                                                                                                        item[1].Groups.map((item4, r) =>
                                                                                                            <CardText className="mb-0"><span className="font-weight-500">Security groups:</span> <span>{item4.GroupId}</span></CardText>

                                                                                                        )
                                                                                                    }
                                                                                                </>
                                                                                            )
                                                                                        }
                                                                                    </>
                                                                                }

                                                                            </div><hr />
                                                                            <div className="p-3">
                                                                                {
                                                                                    Object.entries(instances[1].metadata_options).length > 0 &&
                                                                                    <>
                                                                                        <h5 className="pb-2 font-weight-500">Metadata Options</h5>
                                                                                        {


                                                                                            Object.entries(instances[1].metadata_options).map(([key, val]) =>
                                                                                                <>
                                                                                                    <CardText className="mb-0"><span className="font-weight-500">{key}: </span><span>{val}</span></CardText>
                                                                                                </>
                                                                                            )



                                                                                        }
                                                                                    </>
                                                                                }

                                                                            </div>

                                                                            {
                                                                                instances[1].user_data != null &&
                                                                                <div className="p-3">
                                                                                    <hr />
                                                                                    <>
                                                                                        <h5 className="pb-2 font-weight-500">User Data</h5>
                                                                                        {
                                                                                            <code className="mb-0">
                                                                                                {
                                                                                                    Object.entries(instances[1].user_data).map(([key, val]) =>
                                                                                                        <>
                                                                                                            {val === '\n' ?
                                                                                                                <span><br /></span>
                                                                                                                :
                                                                                                                <span>{val}</span>
                                                                                                            }


                                                                                                        </>



                                                                                                    )

                                                                                                }
                                                                                            </code>
                                                                                        }
                                                                                    </>

                                                                                </div>
                                                                            }
                                                                            {
                                                                                Object.entries(instances[1].user_data_secrets).length > 0
                                                                                &&
                                                                                <div className="p-3">
                                                                                    <hr />
                                                                                    <>
                                                                                        <h5 className="pb-2 font-weight-500">Potential Secrets</h5>
                                                                                        {
                                                                                            Object.entries(instances[1].user_data_secrets).map(([key, val]) =>
                                                                                                <>
                                                                                                    {
                                                                                                        <>
                                                                                                            <CardText className="mb-0"><span className="font-weight-500">{key}</span></CardText>
                                                                                                            {
                                                                                                                val.map((item, i) =>
                                                                                                                    <div className="ml-2">{item}</div>
                                                                                                                )
                                                                                                            }
                                                                                                        </>

                                                                                                    }


                                                                                                </>



                                                                                            )
                                                                                        }


                                                                                    </>

                                                                                </div>
                                                                            }

                                                                        </div>

                                                                    </AccordionDetails>
                                                                </Accordion>
                                                        </div>
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