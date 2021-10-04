import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Card, Table, CardTitle, CardBody, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import UtilClass from '../../../SupportingJs/Util'
class ShowOCIDataSummary extends Component {
    _dataContextUtil = new UtilClass();
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            dataToShow: undefined,
            displayableData: undefined
        }


    }
    async componentDidMount() {
        var active = document.querySelectorAll('.hamburgerContainer li label')[0];
        if(active){
            active.click()
        }

    }

    toggleHam = (toggleFlag) => {
        if (toggleFlag === 0) {
            document.getElementById('hamIconContainer').classList.remove('hamIconActive');
            document.getElementById('hamburgerNav').classList.remove('hamburgerContainerOpened');
            var checkboxes = document.querySelectorAll('#hamburgerNav input[type="checkbox"]');
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false
            }

        }
        else {
            document.getElementById('hamburgerNav').classList.add('hamburgerContainerOpened');
            document.getElementById('hamIconContainer').classList.add('hamIconActive');
        }

    }

    toggle(tab,event) {
        if (event.target.classList.contains('rl') || event.target.classList.contains('fl')) {
            var active = document.querySelectorAll('.hamburgerContainer li label');
            if (active.length > 0) {
                for (let i = 0; i < active.length; i++) {
                    active[i].classList.remove('active')
                }
            }
            event.target.parentElement.classList.add('active')
        } else {
            var active = document.querySelectorAll('.hamburgerContainer li label');
            if (active.length > 0) {
                for (let i = 0; i < active.length; i++) {
                    active[i].classList.remove('active')
                }
            }
            event.target.classList.add('active')
        }

        this.setState({
            dataToShow: tab,
            displayableData: this.state.data[tab]
        })


    }
    showAll() {
        let elements = document.getElementsByClassName('innerA');
        let detailCard = document.getElementsByClassName('detailCard');
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
                <Col xs="3" sm="3" md="1" className="bg1 serviceThirdLevelUl adjustable1 hamburgerContainer p-0">
                        <input className="d-none" type="checkbox" checked id="hamburger-checkbox" />
                        <label className="d-none hamburger-icon" htmlFor="hamburger-checkbox">
                            <span></span>
                        </label>
                        <nav id="hamburgerNav" className="nav" role="navigation" onMouseLeave={() => this.toggleHam(0)} onMouseEnter={() => this.toggleHam(1)}>
                            <ul className="nav__list">
                            <span id="hamIconContainer"><FontAwesomeIcon className="fs20 hamIcon" icon={faBars} /></span>
                            {this.state.data && Object.entries(this.state.data).map((item, i) =>
                                    <li>
                                        <input id={"group" + i} type="checkbox" hidden />
                                        <label className="d-flex custWidth2" onClick={(event) => {
                                            this.toggle(item[0],event);
                                        }} htmlFor={"group" + i}> 
                                        {/* <FontAwesomeIcon className="fs20" icon={faInfoCircle} /> &nbsp; &nbsp; &nbsp;  */}
                                        <div className="fl">{this._dataContextUtil.toTitleCase(item[0].replace(/[\-_]/g, " "))[0]}</div>
                                        <div className="rl">{this._dataContextUtil.toTitleCase(item[0].replace(/[\-_]/g, " ")).substr(1)}</div>
                                        
                                        </label>
                                    </li>
                                )
                                }
                            </ul>
                        </nav>
                    </Col>
                    {/* <Col xs="3" sm="3" md="3" className="bgWhite serviceThirdLevelUl">
                        <Nav vertical className="browserHeight1  bgWhite">
                            <NavItem>

                            </NavItem>
                            {this.state.data ?
                                Object.entries(this.state.data).map((item, i) =>
                                    <NavItem >
                                        <NavLink className={'innerA showOCILink '

                                        }
                                            onClick={() => {
                                                this.toggle(item[0]);
                                            }}>{this._dataContextUtil.toTitleCase(item[0].replace(/[\-_]/g, " "))}</NavLink>
                                    </NavItem>
                                )
                                :
                                null
                            }
                        </Nav>
                    </Col> */}
                    <Col xs="9" sm="9" md="11" className="p-0 adjustable2">
                        <div className="dashboard-container container p-0  full_max_width">
                            <div className="row p-0">
                                <div className="col-md-12">
                                    <Breadcrumb tag="nav" listTag="div">
                                        <BreadcrumbItem active tag="span">Summary</BreadcrumbItem>
                                        <BreadcrumbItem active tag="span">{this.state.dataToShow}</BreadcrumbItem>
                                    </Breadcrumb>
                                </div>
                            </div><hr />
                        </div>
                        {this.state.data && this.state.dataToShow === "data" &&
                            this.state.displayableData.map((item) =>
                                <Card
                                    className={
                                        "detailCard m-3 "
                                    }

                                >
                                    <CardTitle className="border_bottom_header p-3 font-weight-500">{item.compartment_name}</CardTitle>
                                    <CardBody className="">
                                        {
                                            item && Object.entries(item).map(([key, val]) =>

                                                < div className="mb-0" > <span className="font-weight-500">{this._dataContextUtil.toTitleCase(key)}:</span>{
                                                    val && typeof (val) != "string" &&
                                                    <div className="table-container  table-responsive row w-100 mt-2 mx-auto">
                                                        <Table hover size="sm" >
                                                            <thead>
                                                                <tr>
                                                                    <th className="">Type</th>
                                                                    <th className="">Size</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    val.map((k) =>
                                                                        <tr>
                                                                            <td className="">{this._dataContextUtil.toTitleCase(k.type.replace(/[\-_]/g, " "))}</td>
                                                                            <td className="">{k.size}</td>
                                                                        </tr>
                                                                    )
                                                                }

                                                            </tbody>
                                                        </Table>
                                                    </div>

                                                    ||

                                                    val && typeof (val) === "string" && <span> {val} </span>

                                                }</div>

                                            )

                                        }

                                    </CardBody>
                                </Card>

                            )
                        }
                        {this.state.data && this.state.dataToShow === "regions_totals" &&
                            Object.entries(this.state.displayableData).map((item) =>
                                <Card
                                    className={
                                        "detailCard m-3 "
                                    }

                                >
                                    <CardTitle className="border_bottom_header  font-weight-500">{item[0]}</CardTitle>
                                    <CardBody className="">

                                        <div className="table-container row cust-boxShadow-2 w-100 mx-auto">
                                            <Table size="sm" >
                                                <thead>
                                                    <tr>
                                                        <th className="">Type</th>
                                                        <th className="">Size</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        item[1] && item[1].map((key) =>
                                                            <tr>
                                                                <td className="">{key.type}</td>
                                                                <td className="">{key.size}</td>
                                                            </tr>
                                                        )
                                                    }


                                                </tbody>
                                            </Table>
                                        </div>


                                    </CardBody>
                                </Card>

                            )
                        }

                        {this.state.data && this.state.dataToShow === "total" && this.state.displayableData &&
                            <Card
                                className={
                                    "detailCard m-3 "
                                }

                            >
                                <CardTitle className="border_bottom_header  font-weight-500">Totals</CardTitle>
                                <CardBody className="">


                                    <div className="table-container row cust-boxShadow-2 w-100 mx-auto">
                                        <Table size="sm" >
                                            <thead>
                                                <tr>
                                                    <th className="">Type</th>
                                                    <th className="">Size</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.displayableData.map((key) =>
                                                        <tr>
                                                            <td className="">{key.type}</td>
                                                            <td className="">{key.size}</td>
                                                        </tr>
                                                    )
                                                }


                                            </tbody>
                                        </Table>
                                    </div>


                                </CardBody>
                            </Card>


                        }

                    </Col>
                </Row>

            </div >
        )
    }
}
export default withRouter(ShowOCIDataSummary);