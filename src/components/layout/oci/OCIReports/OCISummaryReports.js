import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Card, Table, CardTitle, CardBody, Row, Col, Input } from 'reactstrap';
//import Data from '../../data/ociData.json'
import { withRouter } from 'react-router-dom'
import UtilClass from '../../../SupportingJs/Util'
import ApiService from '../../../../services/APIService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faBars } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from "react-tooltip";

class OCISummaryReports extends Component {
    _dataContext = new ApiService();
    _dataContextUtil = new UtilClass();
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            whichData: this.props.whichData,
            modal: false,
            place: "top",
            type: "dark",
            effect: "float",
            condition: false,
            collapse: 0,
            cards: [1, 2, 3, 4, 5],
            adjustIcon: "1",
            selectDefault: "subnet"
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
    showModal = (modalType) => {
        this.setState({
            modal: true,
            modalType: modalType
        });
    }

    adjustMainWidth1 = () => {
        var adjustable1 = document.querySelectorAll('.adjustable1')
        var adjustable2 = document.querySelectorAll('.adjustable2')
        adjustable1[0].classList.add('hideAdjustable1')
        adjustable2[0].classList.remove('col-md-10')
        adjustable2[0].classList.add('col-md-12')
        this.setState({
            adjustIcon: "2"

        })

    }
    adjustMainWidth2 = () => {
        var adjustable1 = document.querySelectorAll('.adjustable1')
        var adjustable2 = document.querySelectorAll('.adjustable2')
        adjustable1[0].classList.remove('hideAdjustable1')
        adjustable2[0].classList.remove('col-md-12')
        adjustable2[0].classList.add('col-md-10')
        this.setState({
            adjustIcon: "1"

        })

    }

    showNetworkData = (event) => {
        let selectedVal = event.target.value;
        this.setState({ selectDefault: selectedVal })
        let csNet = document.getElementsByClassName('cs_network')
        for (let i = 0; i < csNet.length; i++) {
            csNet[i].classList.remove('d-block')
            csNet[i].classList.add('d-none')
        }
        let csNet2 = document.getElementsByClassName(selectedVal)
        for (let i = 0; i < csNet2.length; i++) {
            csNet2[i].classList.remove('d-none')
            csNet2[i].classList.add('d-block')
        }
    }





    hideModal = () => this.setState({
        modal: false
    });

    async componentDidMount() {
        var active = document.querySelectorAll('.hamburgerContainer li label')[0];
        if(active){
            active.click()
        }
        //var link = document.querySelectorAll ('.tab-pane .showOCILink2')[0];
        //link.click();
        //let data  = Data
        //console.log("data is "+data)

    }
    showGroupData = (event) => {
        let userArray = JSON.parse(event.target.value)
        this.setState({ users: userArray })
        this.showModal("user")

    }
    showPolicyData = (val) => {
        let userArray = JSON.parse(val)
        this.setState({ users: userArray.statements })
        this.showModal("policy")
    }
    async toggle(tab,event) {
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

        let data = this.state.data.data
        let displayableData = undefined
        if (data.hasOwnProperty(tab)) {
            displayableData = data[tab]
        }
        this.setState({
            dataToShow: tab,
            displayableData: displayableData
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



                <Modal size="lg" isOpen={this.state.modal}>
                    <ModalHeader>

                        {this.state.modalType === "user" ? "Users" : <h5 className="">Policy Statements</h5>}


                        <button type="button" className="close" onClick={this.hideModal}><span aria-hidden="true">×</span></button></ModalHeader>
                    <ModalBody>
                        {this.state.modalType === "user" && this.state.users && this.state.users.map((item, i) => <div key={i}>{item}</div>)

                            ||

                            this.state.modalType === "policy" &&
                            <div className="table-container table-responsive row  w-100 mx-auto">

                                <Table striped size="sm" >
                                    <thead>
                                        <tr>
                                            {Object.entries(this.state.users[0]).map(([key]) =>
                                                < th className="">{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))}</th>

                                            )
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.users.map((stmt, s) =>
                                            <tr key={s}>
                                                <td>{stmt.permission_for}</td>
                                                <td>{stmt.permission_to}</td>
                                                <td>{stmt.permission_on}</td>
                                                <td>{stmt.permission_condition}</td>

                                            </tr>
                                        )
                                        }
                                    </tbody>
                                </Table>
                            </div>

                        }
                    </ModalBody>

                </Modal>
                <Row>
                    <Col xs="3" sm="3" md="1" className="bg1 serviceThirdLevelUl adjustable1 hamburgerContainer p-0">
                        <input className="d-none" type="checkbox" checked id="hamburger-checkbox" />
                        <label className="d-none hamburger-icon" htmlFor="hamburger-checkbox">
                            <span></span>
                        </label>
                        <nav id="hamburgerNav" className="nav" role="navigation" onMouseLeave={() => this.toggleHam(0)} onMouseEnter={() => this.toggleHam(1)}>
                            <ul className="nav__list">
                                <span id="hamIconContainer"><FontAwesomeIcon className="fs20 hamIcon" icon={faBars} /></span>
                                {this.state.data && Object.entries(this.state.data.data).map(([key]) =>
                                    <li>
                                        <input id={"group" + key} type="checkbox" hidden />
                                        <label className="d-flex custWidth2" onClick={(event) => {
                                            this.toggle(key,event);
                                        }} htmlFor={"group" + key}> 
                                        {/* <FontAwesomeIcon className="fs20" icon={faInfoCircle} /> &nbsp; &nbsp; &nbsp;  */}
                                        <div className="fl">{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))[0]}</div><div className="rl">{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " ")).substr(1)}</div></label>
                                    </li>
                                )
                                }
                            </ul>
                        </nav>
                    </Col>

                    {/* <Col xs="3" sm="3" md="2" className="p-0 bgWhite serviceThirdLevelUl adjustable1">
                        <Nav vertical className="browserHeight1  bgWhite">

                            {this.state.data && Object.entries(this.state.data.data).map(([key, Val]) =>

                                <NavItem >
                                    <NavLink className={'innerA showOCILink2 fs-14 plr-2px ' + this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))}
                                        onClick={() => {
                                            this.toggle(key);
                                        }}>{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))}</NavLink>
                                </NavItem>
                            )
                            }

                        </Nav>
                    </Col> */}
                    <Col xs="9" sm="9" md="11" className="adjustable2">
                        {this.props.whichData === "reports" && this.state.displayableData &&
                            <div className="dashboard-container container p-0  full_max_width">
                                <div className="row p-0">
                                    <div className="col-md-12">
                                        <Breadcrumb tag="nav" listTag="div">
                                            {/* {this.state.adjustIcon === "1" &&
                                                <FontAwesomeIcon className="adjustIcon" onClick={this.adjustMainWidth1} icon={faChevronCircleLeft} />
                                                ||

                                                <FontAwesomeIcon className="adjustIcon" onClick={this.adjustMainWidth2} icon={faChevronCircleRight} />
                                            } */}

                                            <BreadcrumbItem active tag="span">{this._dataContextUtil.toTitleCase(this.state.whichData.replace(/[\-_]/g, " "))}</BreadcrumbItem>
                                            <BreadcrumbItem active tag="span">{this._dataContextUtil.toTitleCase(this.state.dataToShow.replace(/[\-_]/g, " "))}</BreadcrumbItem>
                                        </Breadcrumb>
                                    </div>
                                </div><hr />
                            </div>
                        }

                        {this.props.whichData === "reports" && this.state.displayableData && typeof (this.state.displayableData) === 'object' && !Array.isArray(this.state.displayableData) &&




                            <div className="table-container mt-4">
                                {/* <div><span className="font-weight-500">{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))}:</span> {val}</div> */}

                                <Table hover className="cust-boxShadow-1">
                                    <thead>
                                        <tr>


                                            < th className="">Local Groups</th>
                                            < th className="">{"Federated Group <->  Local Group"}</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(this.state.displayableData).map(([key, val]) =>
                                            <tr>
                                                <td>{key}</td>
                                                <td>{val}</td>
                                            </tr>
                                        )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        }
                        {this.props.whichData === "reports" && this.state.displayableData && this.state.dataToShow === "policies" &&


                            this.state.displayableData.map((item) =>
                                <Card
                                    className={
                                        "detailCard"
                                    }

                                >
                                    <CardTitle className="border_bottom_header p-3 font-weight-500 mb-0">Compartment: {item.compartment}</CardTitle>

                                    <CardBody className="pt-0">


                                        {Object.entries(item).length > 0 && Object.entries(item).map((item2) =>
                                            item2[1] && typeof (item2[1]) === "object" &&
                                            <Card
                                                className={
                                                    "detailCard"
                                                }

                                            >
                                                <CardTitle className="border_bottom_header p-3 font-weight-500 fs16">{item2[0]} <div className="float-right">
                                                    {item2[1].groups.length > 0 ?
                                                        <Input type="select" name="select" id="exampleSelect" value="View Group Users" onChange={this.showGroupData}>
                                                            <option>View Group Users</option>
                                                            {
                                                                item2[1].groups.map((grp, g) =>
                                                                    <option value={JSON.stringify(grp.users)} key={g}>{grp.name}</option>
                                                                )
                                                            }
                                                        </Input>

                                                        : "No Groups have  been mapped"
                                                    }

                                                </div></CardTitle>

                                                <CardBody className="">

                                                    <div className="table-container table-responsive row  w-100 mx-auto">

                                                        <Table size="sm" >
                                                            <thead>
                                                                <tr>
                                                                    {Object.entries(item2[1].statements[0]).map(([key2]) =>
                                                                        key2 !== "permission_condition" &&
                                                                        < th className="">{this._dataContextUtil.toTitleCase(key2.replace(/[\-_]/g, " "))}</th>
                                                                    )
                                                                    }
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {item2[1].statements.map((stmt, s) =>
                                                                    <tr key={s}>
                                                                        <td>{stmt.permission_for}</td>
                                                                        <td>{stmt.permission_to}</td>
                                                                        <td className="">



                                                                            {/* <div id={"tool" + "_" + i + "_" + j + "_" + s} className="box arrow-left d-none">
                                                                                {stmt.permission_condition}
                                                                            </div> */}
                                                                            {stmt.permission_on}
                                                                            {stmt.permission_condition && stmt.permission_condition !== "N/A" &&
                                                                                <>

                                                                                    <a data-tip={stmt.permission_condition}><FontAwesomeIcon icon={faInfoCircle} /></a>

                                                                                    <ReactTooltip place="right" type="dark" effect="float" />
                                                                                </>
                                                                            }
                                                                        </td>
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




                                    </CardBody>


                                </Card>
                            )
                        }
                        {this.props.whichData === "reports" && this.state.displayableData && this.state.dataToShow === "users" &&

                            <div className="table-container table-responsive row  w-100 mx-auto mt-4">

                                <Table hover className="cust-boxShadow-1">
                                    <thead>
                                        <tr>
                                            {Object.entries(this.state.displayableData[0]).map(([key2]) =>

                                                < th className="">{this._dataContextUtil.toTitleCase(key2.replace(/[\-_]/g, " "))}</th>
                                            )
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.displayableData.map((user, u) =>
                                            <tr key={u}>
                                                {Object.entries(user).map(([, val2]) =>
                                                    <td className="">
                                                        <>
                                                            {typeof (val2) === "object" ?

                                                                val2.map((userItem) =>
                                                                    <div>{typeof (userItem) === "object" ?

                                                                        Object.entries(userItem).map(([key1, val1]) =>
                                                                            <div onClick={
                                                                                () => this.showPolicyData(JSON.stringify(val1))}> <span className="linkStyle">{key1 !== undefined ? key1 : "-"}</span></div>

                                                                        )

                                                                        : userItem}</div>

                                                                )




                                                                : val2}
                                                        </>
                                                    </td>
                                                )
                                                }
                                            </tr>
                                        )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        }
                        {this.props.whichData === "reports" && this.state.displayableData && this.state.dataToShow === "compute_summary" &&

                            <div className="table-container table-responsive row  w-100 mx-auto mt-4">

                                <Table hover className="cust-boxShadow-1" >
                                    <thead>
                                        <tr>
                                            {/* {Object.entries(this.state.displayableData[0]).map(([key2, val2]) =>
                                                        key2 && key2 !== "flag" &&
                                                        <th className="">
                                                            {key2 !== "network" ?

                                                                <span>{this._dataContextUtil.toTitleCase(key2.replace(/[\-_]/g, " "))}</span>
                                                                :
                                                                <Input type="select" name="select" id="exampleSelect" value={this.state.selectDefault} onChange={this.showNetworkData}>
                                                                    {
                                                                        Object.entries(val2).map(([netkey]) =>
                                                                            netkey &&
                                                                            <option value={netkey}>{this._dataContextUtil.toTitleCase(netkey.replace(/[\-_]/g, " "))}</option>
                                                                        )

                                                                    }
                                                                </Input>
                                                            }
                                                        </th>
                                                    )
                                                    } */}


                                            <th className="">Name</th>
                                            <th className="">Image</th>
                                            <th className="">Shape</th>
                                            <th className="">Compartment</th>
                                            <th className="">Region</th>
                                            <th className="">
                                                <Input type="select" name="select" id="exampleSelect" value={this.state.selectDefault} onChange={this.showNetworkData}>
                                                    <option value="subnet">Subnet</option>
                                                    <option value="vcn">VCN</option>
                                                    <option value="public_ip">Public IP</option>
                                                    <option value="fault_domain">Fault Domain</option>
                                                </Input>

                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.displayableData.map((compute_summary, u) =>
                                            <tr key={u} className={
                                                "cursorP " +
                                                (compute_summary.flag === 'warning' ? "danger" : " ")
                                            }>
                                                {/* {Object.entries(compute_summary).map(([key2, val2]) =>
                                                    key2 && key2 !== "flag" &&
                                                    <td className="">
                                                        <>
                                                            {
                                                                typeof (val2) === "object" ?

                                                                    Object.entries(val2).map(([keyNet, valNet]) =>
                                                                        <div className={[keyNet, keyNet === "subnet" ? "d-block cs_network " : "d-none cs_network "].join(' ')}>{valNet ? valNet : "none"}</div>

                                                                    )
                                                                    : val2}
                                                        </>
                                                    </td>
                                                )
                                                } */}
                                                <td className="">{compute_summary.name}</td>
                                                <td className="">{compute_summary.image}</td>
                                                <td className="">{compute_summary.shape}</td>
                                                <td className="">{compute_summary.compartment}</td>
                                                <td className="">{compute_summary.region_name}</td>
                                                <td className="">
                                                    {compute_summary.network && Object.entries(compute_summary.network).map((item) =>
                                                        <div className={[item[0], item[0] === "subnet" ? "d-block cs_network " : "d-none cs_network "].join(' ')}>{item[1]}</div>
                                                    )

                                                    }
                                                </td>
                                            </tr>
                                        )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        }





                    </Col>
                </Row>

            </div >
        )
    }
}
export default withRouter(OCISummaryReports);