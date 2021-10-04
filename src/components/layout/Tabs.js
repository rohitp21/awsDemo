import React, { Component } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faCodeBranch, faListAlt, faFlag, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import BarChart from './BarChart';
export default class CustTabs extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.labels);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '2',
      labels: this.props.labels,
      resGraphVal: this.props.resGraphVal,
      rulesGraphVal: this.props.rulesGraphVal,
      findingGraphVal: this.props.findingGraphVal,
      checksGraphVal: this.props.checksGraphVal,
      categoriesLables: this.props.categoriesLables,
      categoriesData: this.props.categoriesData
      // serviceCount: this.props.servicesCount,
      // resourceCount: this.props.resourceCount,
      // rulesCount: this.props.rulesCount,
      // findingsCount: this.props.findingsCount,
      // checksCount: this.props.checksCount
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }
  render() {
    return (
      <div className="dashboard-container container p-0 my-4">

        <div className="tabsContainer cust-boxShadow-1">
          <Nav tabs className="custTab">
            <NavItem className="sameWidth5Blocks">
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                <div>
                  <div className="tab-Title-1">{this.props.servicesCount}
                    <FontAwesomeIcon className="float-right my-2" icon={faCogs} size="lg" color="#8F8F8F" />
                  </div>
                  <div className="tab-Title-2"># of Services</div>
                </div>
              </NavLink>
            </NavItem>
            <NavItem className="sameWidth5Blocks">
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                <div className="tab-Title-1">{this.props.resourceCount}
                  <FontAwesomeIcon className="float-right my-2" icon={faCodeBranch} size="lg" color="#8F8F8F" />
                </div>
                <div className="tab-Title-2"># of Resources</div>
              </NavLink>
            </NavItem>
            <NavItem className="sameWidth5Blocks">
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
              >
                <div className="tab-Title-1">{this.props.rulesCount}
                  <FontAwesomeIcon className="float-right my-2" icon={faListAlt} size="lg" color="#8F8F8F" />
                </div>
                <div className="tab-Title-2"># of Rules</div>
              </NavLink>
            </NavItem>
            <NavItem className="sameWidth5Blocks">
              <NavLink
                className={classnames({ active: this.state.activeTab === '4' })}
                onClick={() => { this.toggle('4'); }}
              >
                <div className="tab-Title-1">{this.props.findingsCount}
                  <FontAwesomeIcon className="float-right my-2" icon={faFlag} size="lg" color="#8F8F8F" />
                </div>
                <div className="tab-Title-2"># of Findings</div>
              </NavLink>
            </NavItem>
            <NavItem className="sameWidth5Blocks">
              <NavLink
                className={classnames({ active: this.state.activeTab === '5' })}
                onClick={() => { this.toggle('5'); }}
              >
                <div className="tab-Title-1">{this.props.checksCount}
                  <FontAwesomeIcon className="float-right my-2" icon={faExclamationTriangle} size="lg" color="#8F8F8F" />
                </div>
                <div className="tab-Title-2"># of Checks</div>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12" className="mt-3">
                  <BarChart colr='#32c5ff' labels={this.state.categoriesLables} data={this.state.categoriesData} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12" className="mt-3">
                  <BarChart colr='#e02020' labels={this.props.labels} data={this.state.resGraphVal} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12" className="mt-3">
                  <BarChart colr='#32c5ff' labels={this.props.labels} data={this.state.rulesGraphVal} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="4">
              <Row>
                <Col sm="12" className="mt-3">
                  <BarChart colr='#e02020' labels={this.props.labels} data={this.state.findingGraphVal} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="5">
              <Row>
                <Col sm="12" className="mt-3">

                  <BarChart colr='#32c5ff' labels={this.state.labels} data={this.state.checksGraphVal} />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div></div>
    );
  }
}
