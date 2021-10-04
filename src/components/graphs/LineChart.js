import React, { Component } from 'react'
import ReactDOM from "react-dom";
import { Line } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom'
import ApiService from '../../services/APIService'
import UtilClass from '../SupportingJs/Util'
import * as Constants from '../../data/Constants'
import Modal1 from '../layout/popups/Modal1'
import BlockUi from 'react-block-ui';

class LineChart extends Component {
    _dataContext = new ApiService();
    _dataContextUtil = new UtilClass();
    constructor(props) {
        super(props);
        if (this.props) {
            localStorage.setItem("accId", this.props.accId)
            localStorage.setItem("cpro", this.props.cpro)
            this.state = {
                modal: false,
                accId: this.props.accId,
                activeComp: localStorage.getItem("activeComp")
            };
        } else {
            this.state = {
                modal: true,
                accId: localStorage.getItem("accId"),
                activeComp: localStorage.getItem("activeComp")
            };
        }
    }

    showModal(date, data, serviceName) {
        const container = document.createElement("div");
        document.body.appendChild(container);
        ReactDOM.render(<Modal1 date={date} serviceName={serviceName} data={data} />, container);
        document.querySelector('.custBlockUi').remove();
    }
    blockUi = () => {
        this.setState({
            isLoading: true
        })
    }
    unBlockUi = () => {
        this.setState({
            isLoading: false
        })
    }

    goToServiceDashboard = async (date, av, service_name) => {
        let param = {};
        param.account_id = this.state.accId
        let tempDate = new Date(date);
        param.start_date = this._dataContextUtil.sanitizeDate(tempDate) + Constants.startDatePF
        param.end_date = this._dataContextUtil.sanitizeDate(tempDate) + Constants.endDatePF
        if (null != this.state.activeComp && this.state.activeComp != 'default') {
            param.compliance = this.state.activeComp
        }
        const container = document.createElement("div");
        container.classList.add('custBlockUi')
        const textNode = document.createTextNode("Please Wait....");
        document.body.appendChild(container);
        container.appendChild(textNode);
        let data = await this._dataContext.postMethod(Constants.URLSERVER2 + '/' + this._dataContextUtil.toLowerCase(service_name), param)
        this.unBlockUi();
        this.showModal(date, data.data, service_name)


    }



    render() {
        return (
            <>
                <BlockUi tag="div" blocking={this.state.isLoading} />
                <div className="bgWhite">
                    <Line id="myChart" data={this.props.graphData} height={500} options={{
                        onClick: //(event)=>this.goToServiceDashboard(),
                            function (evt) {
                                var activePoints = this.getElementsAtEventForMode(evt, 'point', this.options);
                                var firstPoint = activePoints[0];
                                if (firstPoint) {
                                    var date = this.data.labels[firstPoint._index];
                                    var value = this.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
                                    var label = this.data.datasets[firstPoint._datasetIndex].label;
                                    var a = new LineChart()
                                    a.goToServiceDashboard(date, value, label.replace(" ", ''))
                                }
                            },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            xAxes: [{
                                barPercentage: 0.4,
                                gridLines: {
                                    drawOnChartArea: false
                                }
                            },],
                            yAxes: [{
                                gridLines: {
                                    drawOnChartArea: false
                                }
                            }]
                        },
                        legend: {
                            onClick: function (e, legendItem) {
                                var index = legendItem.datasetIndex;
                                var ci = this.chart;
                                var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;

                                ci.data.datasets.forEach(function (e, i) {
                                    var meta = ci.getDatasetMeta(i);

                                    if (i !== index) {
                                        if (!alreadyHidden) {
                                            meta.hidden = meta.hidden === null ? !meta.hidden : null;
                                        } else if (meta.hidden === null) {
                                            meta.hidden = true;
                                        }
                                    } else if (i === index) {
                                        meta.hidden = null;
                                    }
                                });

                                ci.update();
                            },
                        },

                    }} />
                </div>
            </>
        );
    }
}
export default withRouter(LineChart)