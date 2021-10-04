import React, { Component } from 'react'
import { Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
//import Data from '../../data/ociData.json'
import { withRouter } from 'react-router-dom'
import UtilClass from '../../../SupportingJs/Util'

class OCISummaryType extends Component {
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
        //var link = document.getElementsByClassName('showOCILink2')[0];
        //link.click();

        this.setState({
            //data: apiData
        })

    }

    toggle(tab) {

        let data = this.state.data
        let displayableData = undefined
        for (var i = 0; i < data.length; i++) {
            if (data[i].type == this.state.whichData) {
                displayableData = data[i].data[tab]
            }
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
                <Row>
                    <Col xs="3" sm="3" md="3" className="bgWhite serviceThirdLevelUl">
                        <Nav vertical className="browserHeight1  bgWhite">
                            {this.state.data && this.state.data.map((item) =>
                                <NavItem >
                                    <NavLink className={'innerA showOCILink2'}
                                        onClick={() => { this.toggle(item.data) }}>{this._dataContextUtil.toTitleCase(item.data.replace(/[\-_]/g, " "))}</NavLink>
                                </NavItem>

                            )
                            }
                        </Nav>
                    </Col>
                    {/* <Col xs="9" sm="9" md="9">
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
                        {this.state.whichData == "region" && this.state.displayableData && typeof (this.state.displayableData) == "object" && !Array.isArray(this.state.displayableData) &&

                            < Card
                                className={
                                    "detailCard m-3 "
                                }

                            >
                                <CardTitle className="border_bottom_header p-3 font-weight-500">{this.state.displayableData.compartment_name}</CardTitle>

                                <CardBody className="">
                                    {
                                        Object.entries(this.state.displayableData).map(([k, v]) =>
                                            <>
                                                <CardTitle className="font-weight-500 fs16">{k}: </CardTitle>

                                                <CardBody>
                                                    {
                                                        typeof (v) == "string" && v ||

                                                        Array.isArray(v) && v.map((ele, e) =>
                                                            <div>

                                                                {
                                                                    typeof (ele) == "object" && Object.entries(ele).map(([k2, v]) =>
                                                                        <div className="ml-4">{typeof (v) == "string" && <div><span className="font-weight-500">{k2}: </span><span>{v}</span></div>}</div>
                                                                    )
                                                                }
                                                                <hr />
                                                            </div>
                                                        )




                                                    }


                                                </CardBody>

                                            </>

                                        )
                                    }

                                </CardBody>

                            </Card>


                        }

                        {this.state.whichData != "region" && this.state.displayableData && typeof (this.state.displayableData) == "object" && !Array.isArray(this.state.displayableData) &&

                            < Card
                                className={
                                    "detailCard m-3 "
                                }

                            >
                                <CardTitle className="border_bottom_header p-3 font-weight-500">{this.state.displayableData.name}</CardTitle>
                                <CardBody className="">
                                    {
                                        Object.entries(this.state.displayableData).map(([k, v]) =>
                                            //item && typeof (item) == "object" && !Array.isArray(item) && Object.entries(item).map(([k, v]) =>
                                            <div><span className="font-weight-500">{k}:</span> {v}</div>
                                        )

                                    }


                                </CardBody>
                            </Card>



                        }
                        {this.state.whichData != "region" && this.state.displayableData &&
                            typeof (this.state.displayableData) == "object" && Array.isArray(this.state.displayableData) && this.state.displayableData.map((item2, j) =>

                                < Card
                                    className={
                                        "detailCard m-3 "
                                    }

                                >
                                    <CardTitle className="border_bottom_header p-3 font-weight-500">{item2.tag_namespace_name != undefined && item2.tag_namespace_name || item2.name !== undefined && item2.name || item2.display_name !== undefined && item2.display_name || item2.id !== undefined && item2.id || item2.compartment_name !== undefined && item2.compartment_name}</CardTitle>
                                    <CardBody className="">
                                        {

                                            item2 && typeof (item2) == "object" && !Array.isArray(item2) && Object.entries(item2).map(([k, v]) =>
                                                <div>{
                                                    v && typeof (v) == "string" &&
                                                    <div><span className="font-weight-500">{this._dataContextUtil.toTitleCase(k.replace(/[\-_]/g, " "))}:</span> {v}</div>
                                                    ||

                                                    v && typeof (v) == "object" && Array.isArray(v) && v.map((item3, l) =>
                                                        <>
                                                            <div className="font-weight-500">{this._dataContextUtil.toTitleCase(k.replace(/[\-_]/g, " "))} - {++l}</div>
                                                            {
                                                                item3 && typeof (item3) == "object" && Object.entries(item3).map(([k2, v2]) =>
                                                                    <>

                                                                        <div className="ml-3"><span className="font-weight-500">{this._dataContextUtil.toTitleCase(k2.replace(/[\-_]/g, " "))}: </span>
                                                                            {
                                                                                v2 && typeof (v2) == "object" && Array.isArray(v2) && v2.map((item4, m) =>
                                                                                    <span>{this._dataContextUtil.toTitleCase(item4.replace(/[\-_]/g, " "))}: </span>
                                                                                )

                                                                                ||
                                                                                v2 && typeof (v2) == "string" &&
                                                                                <span>{v2}</span>

                                                                            }
                                                                        </div>
                                                                    </>

                                                                )

                                                                ||

                                                                item3 && typeof (item3) == "string" &&

                                                                <div><span className="font-weight-500">{this._dataContextUtil.toTitleCase(k.replace(/[\-_]/g, " "))}:</span> {item3}</div>
                                                            }</>

                                                    )

                                                    ||


                                                    v && typeof (v) == "object" && !Array.isArray(v) && Object.entries(v).map((item3, l) =>
                                                        <>
                                                            <div className="font-weight-500">{this._dataContextUtil.toTitleCase(k.replace(/[\-_]/g, " "))}</div>
                                                            <div className="font-weight-500 ml-3">{this._dataContextUtil.toTitleCase(item3[0].replace(/[\-_]/g, " "))}</div>
                                                            {
                                                                item3[1] && typeof (item3[1]) == "object" && Object.entries(item3[1]).map(([k2, v2]) =>
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



                    </Col> */}
                </Row>

            </div >
        )
    }
}
export default withRouter(OCISummaryType);