import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { TextareaAutosize, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox } from '@material-ui/core';
import { Policy } from '@material-ui/icons';
import ApiService from '../../../services/APIService'
import * as Constants from '../../../data/Constants'
import UtilClass from "../../SupportingJs/Util"

export default class Modal2 extends Component {
    _dataContext = new ApiService();
    _dataContextUtil = new UtilClass();
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            content: this.props.content,
            heading: this.props.heading,
            type: this.props.type,
            data: this.props.data
        };
    }
    showModal = () => this.setState({
        modal: true
    });
    hideModal = () => this.setState({
        modal: false
    });
    submitIgnore = async () => {
        let param = {
            obj_id: localStorage.getItem('_id'),
            comment: document.getElementById('comment').value,
            service_name: this._dataContextUtil.toLowerCase(this.state.data.service),
            policy_name: this.state.data.fn,
            ignore: this.state.ignore
        }
        let data = await this._dataContext.postMethod(Constants.URL_COMMENT, param);
        let data2 = data.message;
        if (data2 && data2 == "Marked Successfully") {
            var url = window.location.href;
            this.hideModal()
            if (url.indexOf('/ds') >-1) {
                window.location.reload();
            } else {
                let ele = localStorage.getItem('acl');
                if (ele) {
                    document.getElementsByClassName(ele)[0].click()
                }
            }

            // window.location.reload();
        } else if (data2 && data2 === "NE") {
            //this.showToast(Constants.TOAST_NET_ERR, "error");
        } else {
            //this.showToast(Constants.TOAST_SOMETHING_WENT_WRONG, "error");
        }

    };
    policyIgnore = () => {
        this.setState({ ignore: !this.state.ignore })
    };
    componentDidMount() {
        if (this.props.data) {
            if (this.props.data.sa_comment) {
                this.setState({ comment: this.props.data.sa_comment.comment, ignore: this.props.data.sa_comment.ignore })
            }
        } else {
            this.setState({ comment: "", ignore: false })
        }
    }




    render() {
        return (
            <Modal size="md" isOpen={this.state.modal}>
                <ModalHeader className="text-center">
                    <span className="mx-auto">{this.state.heading ? this.state.heading : null}</span>
                </ModalHeader>
                <ModalBody className="text-center">
                    <div className="row my-4 text-center">
                        {this.state.type && this.state.type === "saCommentPol" ?
                            <div className="mx-auto">
                                <FormControl component="fieldset">
                                    {/* <FormLabel component="legend">Ignore this Policy?</FormLabel> */}
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.ignore}
                                                onChange={() => this.policyIgnore()}
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="Ignore?"
                                    />
                                    <TextareaAutosize id="comment" aria-label="empty textarea" defaultValue={this.state.comment && this.state.comment} className="custWidth2" placeholder="Enter Reason(Optional)" />
                                </FormControl>
                            </div>
                            :
                            <span className="mx-auto">{this.state.content ? this.state.content : null}</span>
                        }

                    </div>
                    {this.state.type && this.state.type === "sessExp" &&
                        <button type="button" className="btn btn-info" onClick={() => window.location.reload()}>Ok</button>

                    }
                    {this.state.type && this.state.type === "saCommentPol" &&
                        <div>
                            <button type="button" className="btn btn-info mr-1" onClick={() => this.submitIgnore()}>Submit</button>
                            <button type="button" className="btn btn-info ml-1" onClick={this.hideModal}>Cancel</button>
                        </div>

                    }
                </ModalBody>
            </Modal>
        );
    }
}