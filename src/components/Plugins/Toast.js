import React, { Component } from 'react'
import '../layout/azure/OCIReports/node_modules/react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
export default class Toast extends Component {
    notify = () => toast.success('Wow so easy!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false ,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    componentDidMount(){
        this.notify()
    }
    render() {
        return (
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
        )
    }
}
