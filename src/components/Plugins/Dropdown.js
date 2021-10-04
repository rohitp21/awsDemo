import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default class Dropdown1 extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            accountsList: this.props.accountsList
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
            <div>

                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                     <FontAwesomeIcon icon={faUserCircle} color="#0C2461"/> Accounts
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header className="p-1">
                            <button type="button" id="showTablaue" className="fs14 btn btn-secondary btn-sm w-100 border-radius-0 bgBlue"><FontAwesomeIcon icon={faPlusSquare} color="#ffffff"/> Create New</button></DropdownItem>
                        <DropdownItem divider />
                        {this.state.accountsList && this.state.accountsList.map((item, i) =>
                            <DropdownItem onClick={() => alert(JSON.stringify(item))}>
                                <img className="img-fluid smallImg1" alt={item.cloud_platform}  src={require("../assets/img/" + item.cloud_platform + "LogoSm" + ".png")} /> &nbsp;
                                {item.name}
                            </DropdownItem>
                        )
                        }
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}