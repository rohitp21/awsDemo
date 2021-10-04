import React, { Component } from 'react'
import { Badge, Modal, ModalHeader, ModalBody, NavLink, Card, Table, CardSubtitle, CardTitle, CardBody, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import { withRouter } from 'react-router-dom'
import UtilClass from '../../../SupportingJs/Util'
import ApiService from '../../../../services/APIService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCloud, faExclamationCircle, faListAlt, faBars } from '@fortawesome/free-solid-svg-icons'
import { Accordion } from "../../../Plugins/Accordion";

class OCISummaryRegion extends Component {
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
            adjustIcon: "1"
        }



    }
    getModalData = (modalHeading, modalData) => {
        this.setState({
            modalData: JSON.parse(modalData),
            modalHeading: modalHeading
        })
        this.showModal();
    }
    showModal = () => {
        this.setState({
            modal: true
        });
    }



    getAdditionalData = (singleData, event) => {

        let allTags = document.querySelectorAll('.tagsLikeDataContainer .nav-link');
        for (let i = 0; i < allTags.length; i++) {
            allTags[i].classList.remove('active')

        }
        event.target.classList.add('active')
        //document.getElementById()
        console.log(event.target)
        this.setState({
            additionalData: singleData
        })

        let insideAccordian = event.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('insideAccordions')[0]
        if (insideAccordian !== undefined && insideAccordian !== null) {
            insideAccordian.classList.remove('d-none')
            insideAccordian.classList.add('d-block')
        }

    }
    showData = (k, mainSngleData, regionName, level1, level2) => {
        //hide all inside accordion
        let insideAccordions = document.getElementsByClassName('insideAccordions');
        for (let i = 0; i < insideAccordions.length; i++) {
            insideAccordions[i].classList.remove("d-block");
            insideAccordions[i].classList.add("d-none");
        }
        this.setState({
            mainSelectedData: mainSngleData,
            regionName: regionName,
            level1: level1,
            level2, level2,
            k: k
        })
    }


    hideModal = () => this.setState({
        modal: false
    });
    async toggle(tab) {

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
            document.getElementById('hamIconContainer').classList.add('hamIconActive');
            document.getElementById('hamburgerNav').classList.add('hamburgerContainerOpened');
        }

    }
    clearInsideAccordion = () => {
        let array1 = document.getElementsByClassName('insideAccordions');
        for (let i = 0; i < array1.length; i++) {
            array1[i].classList.remove('d-block');
            array1[i].classList.add('d-none');
        }
        //event.target.offsetParent.getElementsByClassName('insideAccordions')[0].classList.add('d-block')
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

                        {<h5 className="">{this.state.modalHeading && this._dataContextUtil.toTitleCase((this.state.modalHeading).replace(/[\-_]/g, " "))}</h5>}


                        <button type="button" className="close" onClick={this.hideModal}><span aria-hidden="true">×</span></button></ModalHeader>
                    <ModalBody>
                        {this.state.modalData && typeof (this.state.modalData) !== "object" &&
                            <div> {this.state.modalData}</div>
                        }
                        {this.state.modalData && typeof (this.state.modalData) === "object" && Array.isArray(this.state.modalData) &&
                            //this.state.modalData.map((item3, k) =>
                            // <ul>
                            //     {typeof (item3) !== "object" && <li>{this._dataContextUtil.toTitleCase((item3).replace(/[\-_]/g, " "))}</li>}
                            //     {typeof (item3) === "object" && Object.entries(item3).map(([k, v]) => <li>{this._dataContextUtil.toTitleCase((k).replace(/[\-_]/g, " "))}: {v}</li>)}
                            //     {/* <ul>
                            //         {val && typeof (val) === "object" && !Array.isArray(this.state.modalData) && Object.entries(val).map(([key2, val2]) =>
                            //             <li>{key2} :{val2}</li>
                            //         )}

                            //         {val && typeof (val) === "object" && Array.isArray(this.state.modalData) && val.map((item3, k) =>
                            //             <li>{item3}</li>
                            //         )}

                            //         {val && typeof (val) !== "object" &&
                            //             <li>{val}</li>
                            //         }
                            //     </ul> */}
                            // </ul>
                            this.state.modalData && typeof (this.state.modalData[0]) !== "string" &&
                            <div className="table-container">
                                <Table className="cust-boxShadow-1" hover size="sm" >
                                    <thead>
                                        <tr>
                                            {Object.entries(this.state.modalData[0]).map(([key]) =>
                                                < th className="">{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))}</th>
                                            )
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(this.state.modalData).map((itemj, j) =>
                                            <tr key={j}>
                                                {Object.entries(itemj[1]).map(([, v]) =>
                                                    < td className="">{typeof (v) === "string" && v || typeof (v) === "boolean" && v === true && "Yes" || typeof (v) === "boolean" && v === false && "No"}</td>
                                                )
                                                }

                                            </tr>
                                        )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                            ||
                            this.state.modalData && typeof (this.state.modalData[0]) === "string" &&
                            <ul>{this.state.modalData.map((itemk) => <li>{itemk}</li>)}</ul>
                            //)
                        }
                        {this.state.modalData && typeof (this.state.modalData) === "object" && !Array.isArray(this.state.modalData) &&
                            Object.entries(this.state.modalData).map(([key, val]) =>
                                <ul>
                                    <li>{key}</li>
                                    <ul>
                                        {val && typeof (val) === "object" && !Array.isArray(this.state.modalData) && Object.entries(val).map(([key2, val2]) =>
                                            <li>{key2} :{val2}</li>
                                        )}

                                        {val && typeof (val) === "object" && Array.isArray(this.state.modalData) && val.map((item3) =>
                                            <li>{item3}</li>
                                        )}

                                        {val && typeof (val) !== "object" &&
                                            <li>{val}</li>
                                        }
                                    </ul>


                                </ul>
                            )
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
                                {this.state.data && this.state.data.map((item, i) =>
                                    <li>
                                        <input id={"group" + i} type="checkbox" hidden />
                                        <label className="d-flex custWidth2" htmlFor={"group" + i}> 
                                        {/* <FontAwesomeIcon className="fs20" icon={faCloud} /> &nbsp; &nbsp;  */}
                                        <div className="fl">{this._dataContextUtil.toTitleCase(item.region[0])}</div><div className="rl">{item.region.substr(1)}</div></label>
                                        <ul className="group-list">
                                            {item && item.data && item.data.map((item2, j) =>
                                                <li>
                                                    <input id={"sub-group" + i + "_" + j} type="checkbox" hidden />
                                                    <label htmlFor={"sub-group" + i + "_" + j}>  <img className="img-fluid imgSize2" src={require("../../../assets/img/oci/OCIDetails/compartments.svg")} /> {item2.compartment_name}</label>
                                                    <ul className="sub-group-list">
                                                        {item2 && Object.entries(item2).map(([key, val]) =>
                                                            typeof (val) === "object" && key &&
                                                            < li >
                                                                <input id={"sub-sub-group" + i + "_" + j + "_" + key} type="checkbox" hidden />
                                                                <label htmlFor={"sub-sub-group" + i + "_" + j + "_" + key}><FontAwesomeIcon className="fs14" icon={faListAlt} /> {this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))}</label>
                                                                <ul className="sub-sub-group-list">
                                                                    {!Array.isArray(val) && Object.entries(val).map(([key2]) =>
                                                                        <li key={key2}><a onClick={() => this.showData(undefined, item2, item.region, key2, key)}><FontAwesomeIcon className="fs14" icon={faArrowRight} /> {typeof (val) === "object" && this._dataContextUtil.toTitleCase(key2.replace(/[\-_]/g, " "))}</a></li>
                                                                    )
                                                                    }
                                                                    {Array.isArray(val) && val.map((item3, k) =>
                                                                        <li key={k}><a onClick={() => this.showData(k, item2, item.region, item3.name && item3.name || item3.sum_info && item3.sum_info, key)}><FontAwesomeIcon className="fs14" icon={faArrowRight} /> {item3.name && this._dataContextUtil.toTitleCase(item3.name.replace(/[\-_]/g, " ")) || item3.sum_info && this._dataContextUtil.toTitleCase(item3.sum_info.replace(/[\-_]/g, " ")) || item3.id && item3.id}</a></li>
                                                                    )
                                                                    }
                                                                </ul>
                                                            </li>

                                                        )}
                                                    </ul>
                                                </li>
                                            )
                                            }
                                            {item && item.limits !== undefined &&
                                                <li className="limits">
                                                    <input id="sub-group-item" type="checkbox" hidden />
                                                    <label onClick={() => this.showData(undefined, item.limits, item.region, item.region, "Limits")} htmlFor="sub-group-item"><FontAwesomeIcon className="fs16" icon={faExclamationCircle} /> Limits</label>
                                                </li>
                                            }
                                        </ul>
                                    </li>
                                )
                                }
                            </ul>
                        </nav>
                    </Col>
                    <Col xs="9" sm="9" md="11" className="p-0 adjustable2">
                        {this.state.mainSelectedData && this.state.level2 !== "Limits" &&
                            <Card className={"detailCard m-3 "}>
                                <CardTitle className="border_bottom_header p-3 font-weight-500 mb-0"><FontAwesomeIcon className="fs20" icon={faCloud} /> &nbsp; {this.state.regionName}</CardTitle>
                                <CardBody className="">
                                    {Object.entries(this.state.mainSelectedData).map(([key, val]) =>//compaertment level
                                        val && typeof (val) !== "object" &&
                                        <CardSubtitle> <span className="font-weight-500">{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))}:</span> <span>{val}</span></CardSubtitle>
                                    )
                                    }
                                    <hr className="mb-2" />
                                    <h5>List of {this._dataContextUtil.toTitleCase(this.state.level2.replace(/[\-_]/g, " "))} {"->"} {this._dataContextUtil.toTitleCase(this.state.level1.replace(/[\-_]/g, " "))}</h5>

                                    {!Array.isArray(this.state.mainSelectedData[this.state.level2]) &&
                                        <Accordion>
                                            {this.state.mainSelectedData[this.state.level2][this.state.level1] &&
                                                this.state.mainSelectedData[this.state.level2][this.state.level1].map((item) =>
                                                    <Accordion.Item>
                                                        <Accordion.Header><NavLink onClick={(event) => this.clearInsideAccordion(event)}>{item.name !== undefined && item.name || item.id !== undefined && item.id || item.sum_info !== undefined && item.sum_info}</NavLink></Accordion.Header>
                                                        <Accordion.Body>
                                                            <div id="additionalDataMain">
                                                                {item && typeof (item) === "object" && !Array.isArray(item) && Object.entries(item).map(([key, val]) =>
                                                                    val && typeof (val) !== "object" &&
                                                                    <div> <span className="font-weight-500">{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))}:</span> <span>{val}</span></div>
                                                                )}


                                                                {/* <h5>Additional Data</h5>
                                                            */}

                                                                <div className="">
                                                                    <div className="mb-4 tagsLikeDataContainer">
                                                                        {item && typeof (item) === "object" && !Array.isArray(item) &&
                                                                            Object.entries(item).map(([key, val]) =>
                                                                                this.state.level2 === "network" && this.state.level1 === "vcn" && key === "data" &&
                                                                                Object.entries(item.data).map(([key2, val2]) =>
                                                                                    <NavLink
                                                                                        className={val2.length === 0 && "disabled "}
                                                                                        onClick={(event) => this.getAdditionalData(item.data[key2], event)}>{this._dataContextUtil.toTitleCase(key2.replace(/[\-_]/g, " "))} &nbsp;<Badge color="secondary">{val2.length}</Badge></NavLink>
                                                                                )
                                                                                ||
                                                                                this.state.level2 !== "network" && this.state.level1 !== "vcn" && key !== "data" &&
                                                                                //Object.entries(item).map((item2, j) =>
                                                                                val && typeof (val) === "object" &&
                                                                                <NavLink
                                                                                    className={Array.isArray(val) && val.length === 0 && "disabled " || !Array.isArray(val) && Object.entries(val).length === 0 && "disabled "}
                                                                                    onClick={(event) => this.getAdditionalData(item[key], event)}>{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))} &nbsp;<Badge color="secondary">{typeof (val) === "object" && Array.isArray(val) ? val.length : typeof (val) === "object" && !Array.isArray(val) && Object.entries(val).length}</Badge></NavLink>
                                                                                //)

                                                                            )
                                                                        }
                                                                    </div>
                                                                    <div className="insideAccordions">
                                                                        {this.state.additionalData && Array.isArray(this.state.additionalData) &&
                                                                            <Accordion>
                                                                                {this.state.additionalData.map((metaData) =>
                                                                                    <Accordion.Item>
                                                                                        <Accordion.Header><NavLink>{metaData.name && metaData.name || metaData.display_name && metaData.display_name || metaData.id && metaData.id}</NavLink></Accordion.Header>
                                                                                        <Accordion.Body>
                                                                                            {Object.entries(metaData).map(([key, val]) =>
                                                                                                val && typeof (val) !== "object" &&
                                                                                                <div> <span className="font-weight-500">{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))}:</span> <span>{val}</span></div>
                                                                                                ||
                                                                                                val && typeof (val) === "object" &&

                                                                                                <div> <NavLink className="font-weight-500 linkStyle p-0" onClick={() => this.getModalData(key, JSON.stringify(val))}>{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))} <span>({Array.isArray(val) ? val.length : Object.entries(val).length}</span>)</NavLink></div>
                                                                                            )
                                                                                            }
                                                                                        </Accordion.Body>
                                                                                    </Accordion.Item>
                                                                                )
                                                                                }
                                                                            </Accordion>
                                                                        }
                                                                        {this.state.additionalData && !Array.isArray(this.state.additionalData) &&
                                                                            <Accordion>
                                                                                {Object.entries(this.state.additionalData).map((metaData) =>
                                                                                    <Accordion.Item>
                                                                                        <Accordion.Header><NavLink>{metaData && metaData[0]}</NavLink></Accordion.Header>
                                                                                        <Accordion.Body>
                                                                                            {metaData[1] && Object.entries(metaData[1]).map(([key, val]) =>
                                                                                                val && typeof (val) !== "object" &&
                                                                                                <div> <span className="font-weight-500">{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))}:</span> <span>{val}</span></div>
                                                                                                ||
                                                                                                val && typeof (val) === "object" &&

                                                                                                <div> <NavLink className="font-weight-500 linkStyle p-0" onClick={() => this.getModalData(key, JSON.stringify(val))}>{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))} <span>({Array.isArray(val) ? val.length : Object.entries(val).length}</span>)</NavLink></div>
                                                                                            )
                                                                                            }
                                                                                        </Accordion.Body>
                                                                                    </Accordion.Item>
                                                                                )
                                                                                }
                                                                            </Accordion>
                                                                        }
                                                                    </div>


                                                                    {/* <hr className="mt-2 mb-2" /> */}
                                                                </div>
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                )
                                            }
                                        </Accordion>
                                        ||

                                        Array.isArray(this.state.mainSelectedData[this.state.level2]) && Object.entries(this.state.mainSelectedData[this.state.level2][this.state.k]).map(([k, v]) =>
                                            typeof (v) !== "object" &&

                                            <CardSubtitle> <span className="font-weight-500">{this._dataContextUtil.toTitleCase(k.replace(/[\-_]/g, " "))}:</span> <span>{v}</span></CardSubtitle>
                                            ||

                                            typeof (v) === "object" &&
                                            <Accordion>
                                                <Accordion.Item>
                                                    <Accordion.Header><NavLink>{this._dataContextUtil.toTitleCase(k.replace(/[\-_]/g, " "))}</NavLink></Accordion.Header>
                                                    <Accordion.Body>
                                                        <div id="additionalDataMain">
                                                            {v && typeof (v) === "object" && !Array.isArray(v) ?

                                                                Object.entries(v).map(([key, val]) =>
                                                                    val && typeof (val) !== "object" &&
                                                                    <div> <span className="font-weight-500">{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))}:</span> <span>{val}</span></div>
                                                                )
                                                                :
                                                                v && typeof (v) === "object" && Array.isArray(v) && v.map((tem) =>
                                                                    <Accordion>
                                                                        <Accordion.Item>
                                                                            <Accordion.Header><NavLink>{tem.name}</NavLink></Accordion.Header>
                                                                            <Accordion.Body>
                                                                                {tem && Object.entries(tem).map(([key, val]) =>
                                                                                    val && typeof (val) !== "object" &&
                                                                                    <div> <span className="font-weight-500">{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))}:</span> <span>{val}</span></div>

                                                                                )
                                                                                }
                                                                                <div className="tagsLikeDataContainer">
                                                                                    {tem && Object.entries(tem).map(([key, val]) =>
                                                                                        val && typeof (val) === "object" &&
                                                                                        <NavLink
                                                                                            className={Array.isArray(val) && val.length === 0 && "disabled " || !Array.isArray(val) && Object.entries(val).length === 0 && "disabled "}
                                                                                            onClick={() => this.getModalData(key, JSON.stringify(val))}>{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))} &nbsp;<Badge color="secondary">{typeof (val) === "object" && Array.isArray(val) ? val.length : typeof (val) === "object" && !Array.isArray(val) && Object.entries(val).length}</Badge></NavLink>
                                                                                    )
                                                                                    }
                                                                                </div>
                                                                            </Accordion.Body>
                                                                        </Accordion.Item>
                                                                    </Accordion>


                                                                )
                                                            }



                                                            {/* <h5>Additional Data</h5>
                                                            */}
                                                            <div className="">
                                                                <div className="mb-4 tagsLikeDataContainer">
                                                                    {v && typeof (v) === "object" && !Array.isArray(v) &&
                                                                        Object.entries(v).map(([key, val]) =>
                                                                            //Object.entries(item).map((item2, j) =>
                                                                            val && typeof (val) === "object" &&
                                                                            <NavLink
                                                                                className={Array.isArray(val) && val.length === 0 && "disabled " || !Array.isArray(val) && Object.entries(val).length === 0 && "disabled "}
                                                                                onClick={() => this.getModalData(key, JSON.stringify(val))}>{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))} &nbsp;<Badge color="secondary">{typeof (val) === "object" && Array.isArray(val) ? val.length : typeof (val) === "object" && !Array.isArray(val) && Object.entries(val).length}</Badge></NavLink>
                                                                            //)

                                                                        )
                                                                    }
                                                                </div>
                                                                {/* {this.state.additionalData && Array.isArray(this.state.additionalData) &&
                                                                    <Accordion>
                                                                        {this.state.additionalData.map((metaData, m) =>
                                                                            <Accordion.Item>
                                                                                <Accordion.Header>{metaData.name && metaData.name || metaData.display_name && metaData.display_name || metaData.id && metaData.id}</Accordion.Header>
                                                                                <Accordion.Body>
                                                                                    {Object.entries(metaData).map(([key, val]) =>
                                                                                        val && typeof (val) !== "object" &&
                                                                                        <div> <span className="font-weight-500">{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))}:</span> <span>{val}</span></div>
                                                                                        ||
                                                                                        val && typeof (val) === "object" &&

                                                                                        <div> <NavLink className="font-weight-500 linkStyle p-0" onClick={() => this.getModalData(key, JSON.stringify(val))}>{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))} <span>({Array.isArray(val) ? val.length : Object.entries(val).length}</span>)</NavLink></div>
                                                                                    )
                                                                                    }
                                                                                </Accordion.Body>
                                                                            </Accordion.Item>
                                                                        )
                                                                        }
                                                                    </Accordion>
                                                                }
                                                                {this.state.additionalData && !Array.isArray(this.state.additionalData) &&
                                                                    <Accordion>
                                                                        {Object.entries(this.state.additionalData).map((metaData, m) =>
                                                                            <Accordion.Item>
                                                                                <Accordion.Header>{metaData && metaData[0]}</Accordion.Header>
                                                                                <Accordion.Body>
                                                                                    {metaData[1] && Object.entries(metaData[1]).map(([key, val]) =>
                                                                                        val && typeof (val) !== "object" &&
                                                                                        <div> <span className="font-weight-500">{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))}:</span> <span>{val}</span></div>
                                                                                        ||
                                                                                        val && typeof (val) === "object" &&

                                                                                        <div> <NavLink className="font-weight-500 linkStyle p-0" onClick={() => this.getModalData(key, JSON.stringify(val))}>{this._dataContextUtil.toTitleCase(key.replace(/[\-_]/g, " "))} <span>({Array.isArray(val) ? val.length : Object.entries(val).length}</span>)</NavLink></div>
                                                                                    )
                                                                                    }
                                                                                </Accordion.Body>
                                                                            </Accordion.Item>
                                                                        )
                                                                        }
                                                                    </Accordion>
                                                                }
 */}

                                                                {/* <hr className="mt-2 mb-2" /> */}
                                                            </div>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>

                                            </Accordion>
                                        )
                                    }

                                </CardBody>
                            </Card>


                            ||
                            this.state.mainSelectedData && this.state.level2 === "Limits" &&

                            <div className="table-container">
                                <h5>Region : {this.state.regionName}</h5>
                                <hr className="mb-2" />
                                <Table hover className="cust-boxShadow-1 tableWithLessPadding">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Name</th>
                                            <th className="text-center">Description</th>
                                            <th className="text-center">Limit Name</th>
                                            <th className="text-center">Availability Domain</th>
                                            <th className="text-center">Scope Type</th>
                                            <th className="text-center">Value</th>
                                            <th className="text-center">Used</th>
                                            <th className="text-center">Available</th>
                                            {/* <th className="text-center">Region Name</th> */}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.mainSelectedData.map((item, i) =>
                                                <tr key={i} className={"cursorP sIconContainer "}>
                                                    <td className="text-center">{item.name ? item.name : "-"}</td>
                                                    <td className="text-center">{item.description ? item.description : "-"}</td>
                                                    <td className="text-center">{item.limit_name ? item.limit_name : "-"}</td>
                                                    <td className="text-center">{item.availability_domain ? item.availability_domain : "-"}</td>
                                                    <td className="text-center">{item.scope_type ? item.scope_type : "-"}</td>
                                                    <td className="text-center">{item.value ? item.value : "-"}</td>
                                                    <td className="text-center">{item.used ? item.used : "-"}</td>
                                                    <td className="text-center">{item.available ? item.available : "-"}</td>
                                                    {/* <td className="text-center">{item.region_name}</td> */}
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
export default withRouter(OCISummaryRegion);