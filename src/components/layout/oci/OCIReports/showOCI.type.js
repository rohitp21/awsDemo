import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Card, Table, CardTitle, CardBody, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import { withRouter } from 'react-router-dom'
import UtilClass from '../../../SupportingJs/Util'
import ApiService from '../../../../services/APIService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight, faBars } from '@fortawesome/free-solid-svg-icons'
class ShowOCIDataTypes extends Component {
    _dataContext = new ApiService();
    _dataContextUtil = new UtilClass();
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            dataToShow: undefined,
            displayableData: undefined,
            whichData: this.props.whichData

        }


    }
    async componentDidMount() {
        var active = document.querySelectorAll('.hamburgerContainer li label')[0];
        if(active){
            active.click()
        }

    }
    async componentDidUpdate() {
        let activateFirstMenu2 = document.querySelectorAll('.group0')[0];
        if (activateFirstMenu2) {
            activateFirstMenu2.click()
        }

    }
    collapseThis() {
        this.setState({
            isOpen: true
        })
    }
    async toggle(event, tab) {
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

        let data = this.state.data
        // let displayableData = undefined
        // if (tab !== "User Policies") {
        //     for (var i = 0; i < data.length; i++) {
        //         if (data[i].type === this.state.whichData) {
        //             displayableData = data[i].data[tab]
        //         }
        //     }
        // } else {
        //     displayableData = await this._dataContext.getMethod("http://52.86.28.156:8000/cloudguard/oci/report/user_policy");
        //     let a = 0;
        // }
        let displayableData = data[tab];
        this.setState({
            dataToShow: tab,
            displayableData: displayableData
        })


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
                                    <li className={"group" + i}>
                                        <input id={"group" + i} type="checkbox" hidden />
                                        <label className="d-flex custWidth2" onClick={(event) => {
                                            this.toggle(event, item[0]);
                                        }} htmlFor={"group" + i}><div className="fl">{this._dataContextUtil.toTitleCase(item[0].replace(/[\-_]/g, " "))[0]}</div><div className="rl">{this._dataContextUtil.toTitleCase(item[0].replace(/[\-_]/g, " ")).substr(1)}</div></label>
                                    </li>
                                )
                                }
                            </ul>
                        </nav>
                    </Col>
                    {/* <Col xs="3" sm="3" md="3" className="bgWhite serviceThirdLevelUl">
                        <Nav vertical className="browserHeight1  bgWhite">

                            {this.state.data && Object.entries(this.state.data).map((item, i) =>
                                item &&

                                <NavItem >
                                    <NavLink className={'innerA showOCILink2 ' + this._dataContextUtil.toTitleCase(item[0].replace(/[\-_]/g, " "))}
                                        onClick={() => {
                                            this.toggle(item[0]);
                                        }}>{this._dataContextUtil.toTitleCase(item[0].replace(/[\-_]/g, " "))}</NavLink>
                                </NavItem>

                            )
                            }
                        </Nav>
                    </Col> */}
                    <Col xs="9" sm="9" md="11" className="p-0 adjustable2">
                        {this.state.dataToShow &&
                            <div className="dashboard-container container p-0  full_max_width">
                                <div className="row p-0">
                                    <div className="col-md-12">
                                        <Breadcrumb tag="nav" listTag="div">
                                            <BreadcrumbItem active tag="span">{this._dataContextUtil.toTitleCase(this.state.whichData.replace(/[\-_]/g, " "))}</BreadcrumbItem>
                                            <BreadcrumbItem active tag="span">{this._dataContextUtil.toTitleCase(this.state.dataToShow.replace(/[\-_]/g, " "))}</BreadcrumbItem>
                                        </Breadcrumb>
                                    </div>
                                </div><hr />
                            </div>
                        }
                        {this.state.displayableData && this.state.dataToShow === "idp_group_users" && typeof (this.state.displayableData) === "string" &&
                            < Card
                                className={
                                    "detailCard m-3 "
                                }

                            >
                                <CardTitle className="border_bottom_header p-3 font-weight-500">{this._dataContextUtil.toTitleCase(this.state.dataToShow.replace(/[\-_]/g, " "))}</CardTitle>
                                <CardBody className="">
                                    {
                                        <div className="table-container row cust-boxShadow-2 w-100 mx-auto">
                                            <Table size="sm" >
                                                <thead>
                                                    <tr>
                                                        {Object.entries(JSON.parse(this.state.displayableData)[0]).map(([key]) =>
                                                            <th className="text-center">{key}</th>
                                                        )
                                                        }
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {JSON.parse(this.state.displayableData).map((item) =>
                                                        <tr>
                                                            {Object.entries(item).map(([, val]) =>
                                                                <td className="text-center">{val ? val : "-"}</td>
                                                            )
                                                            }
                                                        </tr>
                                                    )
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>


                                    }


                                </CardBody>
                            </Card>

                        }

                        {this.state.whichData !== "region" && this.state.displayableData && this.state.dataToShow !== "User Policies" && typeof (this.state.displayableData) === "object" && !Array.isArray(this.state.displayableData) &&

                            < Card
                                className={
                                    "detailCard m-3 "
                                }

                            >
                                <CardTitle className="border_bottom_header p-3 font-weight-500">{this.state.displayableData.name}</CardTitle>
                                <CardBody className="">
                                    {
                                        Object.entries(this.state.displayableData).map(([k, v]) =>
                                            //item && typeof (item) === "object" && !Array.isArray(item) && Object.entries(item).map(([k, v]) =>
                                            <div><span className="font-weight-500">{k}:</span> {v}</div>
                                        )

                                    }


                                </CardBody>
                            </Card>



                        }
                        {this.state.whichData !== "region" && this.state.dataToShow !== "User Policies" && this.state.displayableData &&
                            typeof (this.state.displayableData) === "object" && Array.isArray(this.state.displayableData) && this.state.displayableData.map((item2) =>

                                < Card
                                    className={
                                        "detailCard m-3 "
                                    }

                                >
                                    <CardTitle className="border_bottom_header p-3 font-weight-500">{item2.tag_namespace_name !== undefined && item2.tag_namespace_name || item2.name !== undefined && item2.name || item2.display_name !== undefined && item2.display_name || item2.id !== undefined && item2.id || item2.compartment_name !== undefined && item2.compartment_name}</CardTitle>
                                    <CardBody className="">
                                        {

                                            item2 && typeof (item2) === "object" && !Array.isArray(item2) && Object.entries(item2).map(([k, v]) =>
                                                <div>{
                                                    v && typeof (v) === "string" &&
                                                    <div><span className="font-weight-500">{this._dataContextUtil.toTitleCase(k.replace(/[\-_]/g, " "))}:</span> {v}</div>
                                                    ||

                                                    v && typeof (v) === "object" && Array.isArray(v) && v.map((item3, l) =>
                                                        <>
                                                            <div className="font-weight-500">{this._dataContextUtil.toTitleCase(k.replace(/[\-_]/g, " "))} - {++l}</div>
                                                            {
                                                                item3 && typeof (item3) === "object" && Object.entries(item3).map(([k2, v2]) =>
                                                                    <>

                                                                        <div className="ml-3"><span className="font-weight-500">{this._dataContextUtil.toTitleCase(k2.replace(/[\-_]/g, " "))}: </span>
                                                                            {
                                                                                v2 && typeof (v2) === "object" && Array.isArray(v2) && v2.map((item4) =>
                                                                                    <div className="ml-4"><FontAwesomeIcon className="text-color1 fs12" icon={faHandPointRight} /> {this._dataContextUtil.toTitleCase(item4.replace(/[\-_]/g, " "))}</div>
                                                                                )

                                                                                ||
                                                                                v2 && typeof (v2) === "string" &&
                                                                                <span>{v2}</span>

                                                                            }
                                                                        </div>
                                                                    </>

                                                                )

                                                                ||

                                                                item3 && typeof (item3) === "string" &&

                                                                <div><span className="font-weight-500">{this._dataContextUtil.toTitleCase(k.replace(/[\-_]/g, " "))}:</span> {item3}</div>
                                                            }</>

                                                    )

                                                    ||


                                                    v && typeof (v) === "object" && !Array.isArray(v) && Object.entries(v).map((item3) =>
                                                        <>
                                                            <div className="font-weight-500">{this._dataContextUtil.toTitleCase(k.replace(/[\-_]/g, " "))}</div>
                                                            <div className="font-weight-500 ml-3">{this._dataContextUtil.toTitleCase(item3[0].replace(/[\-_]/g, " "))}</div>
                                                            {
                                                                item3[1] && typeof (item3[1]) === "object" && Object.entries(item3[1]).map(([k2, v2]) =>
                                                                    <>
                                                                        <div className="ml-5"><span className="font-weight-500">{this._dataContextUtil.toTitleCase(k2.replace(/[\-_]/g, " "))}:</span> {v2}</div>
                                                                    </>
                                                                )
                                                            }
                                                        </>

                                                    )

                                                }
                                                </div>
                                            )

                                        }


                                    </CardBody>

                                </Card>
                            )


                        }
                        {this.state.whichData !== "region" && this.state.dataToShow === "User Policies" && this.state.displayableData &&

                            < Card
                                className={
                                    "detailCard m-3 "
                                }

                            >
                                <div className="table-container row cust-boxShadow-2 w-100 mx-auto">

                                    <Table size="sm" >
                                        <thead>
                                            <tr>
                                                <th className="text-center">Username/Name</th>
                                                <th className="text-center">Provider Name</th>
                                                <th className="text-center">MFA Activated</th>
                                                <th className="text-center">Time Created</th>
                                                <th className="text-center">Groups</th>
                                                <th className="text-center">Federated</th>
                                                <th className="text-center">Group Mapping</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.displayableData.data.map((item, i) =>
                                                    <tr key={i}>
                                                        <td className="text-center word-break fs14">{item.name ? item.name : "None"}</td>
                                                        <td className="text-center">
                                                            <>
                                                                {item.provider_name ? item.provider_name : "none"}
                                                            </>
                                                        </td>
                                                        <td className="text-center">
                                                            <>
                                                                {item.mfa_activated ? item.mfa_activated : "None"}
                                                            </>
                                                        </td>
                                                        <td className="text-center">
                                                            <>
                                                                {item.time_created ? item.time_created : "none"}
                                                            </>
                                                        </td>
                                                        <td className="text-center">
                                                            <>
                                                                {item.groups ? item.groups : "None"}
                                                            </>
                                                        </td>
                                                        <td className="text-center">
                                                            <>
                                                                {item.federated ? item.federated : "None"}
                                                            </>
                                                        </td>
                                                        <td className="text-center">
                                                            <>
                                                                {item.group_mapping ? item.group_mapping : "None"}
                                                            </>
                                                        </td>
                                                    </tr>
                                                )

                                            }
                                        </tbody>
                                    </Table>
                                </div></ Card>
                        }



                    </Col>
                </Row>

            </div >
        )
    }
}
export default withRouter(ShowOCIDataTypes);