import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2';

export default class BarChart extends Component {
    constructor(props) {
        super(props);  
        this.state={
            data:{
                labels: [],
                datasets: [
                    {
                        label: '',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: []
                    }
                ]
            }
        }  
    }
    async componentDidMount(){
        
        
        this.setState(
           {
            
                data:{
                    labels: this.props.labels,
                    datasets: [
                        {
                            label: '',
                            backgroundColor: this.props.colr,
                            borderColor: this.props.colr,
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            data: this.props.data,
                        }
                    ]
                }
             
           } 
        )
        //data.labels = this.props.labels
        //data.datasets[0].data = this.props.data
        
        //this.setState({data:data})
    }
    render() {
        return (
            <div style={{height:'320px'}}>
                <Bar
                    data={this.state.data}
                    width={30}
                    height={300}
                    options={{
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
                        legend:{
                         display:false
                        }
                    }}
                />
            </div>
        )
    }
}
