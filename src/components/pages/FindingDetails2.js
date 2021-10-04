import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import IdentityPolicies from '../layout/oci/identity.policies'
import IdentityUsers from '../layout/oci/identity.users'
import EC2RegionsVpcsSecurityGroups from '../layout/aws/services.ec2.regions.id.vpcs.id.security_groups'
import EC2RegionsSnapshots from '../layout/aws/services.ec2.regions.id.snapshots'
import EC2RegionsVolumes from '../layout/aws/services.ec2.regions.id.volumes'
import EC2RegionsInstances from '../layout/aws/services.ec2.regions.id.instances'
import IamCredentialReports from '../layout/aws/services.iam.credential_reports'
import IamRoles from '../layout/aws/services.iam.roles'
import IamUsers from '../layout/aws/services.iam.users'
import IamGroups from '../layout/aws/services.iam.groups'
import IamPasswordPolicy from '../layout/aws/services.iam.password_policy'
import IamPolicies from '../layout/aws/services.iam.policies'
import CloudTrailTrails from '../layout/aws/services.cloudtrail.trails'
import CloudTrailRegions from '../layout/aws/services.cloudtrail.regions'
import CloudFormationStacks from '../layout/aws/services.cloudformation.stacks'
import ConfigRegions from '../layout/aws/services.config.regions'
import RedshiftParametersGroups from '../layout/aws/services.redshift.regions.id.parameter_groups'
import SesIdentities from '../layout/aws/services.ses.regions.id.identities.js'
import S3Buckets from '../layout/aws/services.s3.buckets'
import VpcNetworkAcls from '../layout/aws/services.vpc.regions.id.vpcs.id.network_acls'
import VpcSubnets from '../layout/aws/services.vpc.regions.id.vpcs.id.subnets'
import SqsQueues from '../layout/aws/services.sqs.queue'
import ObjectStorageBuckets from '../layout/oci/objectstorage.buckets'
import BlockStorageBlockVolume from '../layout/oci/blockstorage.blockvolume'
import OCIDatabase from '../layout/oci/database.database'
import VcnSLISR from '../layout/oci/vcn.compartments.id.vcn.id.security_lists.id.ingress_security_rules'
import LoadBalListener from '../layout/oci/loadbalancer.compartments.id.loadbalancer.id.listeners'
import DBSystems from '../layout/oci/database.compartments.id.db_system'
import ComputeInstances from '../layout/oci/compute.compartments.id.instances'
import VcnNsgIR from '../layout/oci/vcn.compartments.id.vcn.id.nsg.id.ingress_rules'
import Elbv2Listener from '../layout/aws/elbv2.regions.id.vpcs.id.lbs.id.listeners.id.Protocol'
import Elbv2Attribute from '../layout/aws/elbv2.regions.id.vpcs.id.lbs.id.Attribute'

export default class FindingDetails2 extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '',
            // lables: this.props.location.state.labels,
            accId: this.props.location !== undefined ? this.props.location.state.accId : this.props.accId,
            pathToFetchData: this.props.location ? this.props.location.state.pathToFetchData : this.props.pathToFetchData,
        };
    }

    toggle(tab) {
        localStorage.setItem("whichTab", tab)
        this.props.history.goBack()
    }
    async componentWillMount() {
        this.getData()
        this.setState({
            activeTab: this.props.location ? this.props.location.state.activeTab : this.props.activeTab
        })
    }
    getData = () => {// api
        //let tempData = Data.services;
        //let data = undefined;

        let tempData = this.props.location ? this.props.location.state.data : this.props.data
        let items = this.props.location ? this.props.location.state.items : this.props.items
        this.setState({ items: items })
        let id_suffix = this.props.location ? this.props.location.state.id_suffix : this.props.id_suffix
        var pathStr = this.state.pathToFetchData;

        var pass_policy_pos = pathStr.indexOf(".password_policy");//check for password policy

        var serviceNameIndex = pathStr.indexOf('.');
        var pathAfterService = pathStr.substring(serviceNameIndex, serviceNameIndex.length);
        var finalPath = pathAfterService.replace('.', '');
        if (finalPath === "regions.id.vpcs.id.security_groups") {

        }
        // var splitted = pathAfterService.split('.id');
        // for(let i=0;i<splitted.length;i++){
        //     let removedDot = splitted[i].replace('.','');
        //     let a =  tempData[removedDot];

        // }


        var res = pathStr.split(".");
        var displayableData = [];
        var displayableData2 = [];
        var displayableData3 = [];
        var displayableData4 = [];
        let tempData2 = tempData[res[1]];
        let data = Object.entries(tempData2);

        if (items.length > 0) {
            if (localStorage.getItem('cpro') === 'aws' || JSON.parse(localStorage.getItem('sA')).cloud_platform === 'aws') {
                if (this.state.pathToFetchData === "ec2.regions.id.vpcs.id.security_groups") {
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "security_groups")
                                displayableData.push(res[i + 1]);
                        }
                        //var result = items[e].match(/(?<=security_groups.\s*).*?(?=\s*.rules)/gs);

                    }
                } else if (this.state.pathToFetchData === "ec2.regions.id.snapshots") {
                    for (let e = 0; e < items.length; e++) {
                        var result = items[e].replace(new RegExp('.*' + "snapshots."), '');
                        displayableData.push(result);
                    }
                } else if (this.state.pathToFetchData === "ec2.regions.id.volumes") {
                    for (let e = 0; e < items.length; e++) {
                        var result = items[e].replace(new RegExp('.*' + "volumes."), '');
                        displayableData.push(result);
                    }
                } else if (this.state.pathToFetchData === "ec2.regions.id.vpcs.id.instances") {
                    for (let e = 0; e < items.length; e++) {
                        //var result = items[e].match(/(?<=instances.\s*).*?(?=\s*id_suffix)/gs);
                        var test = items[e];
                        var firstvariable = "instances.";
                        var secondvariable = '.' + id_suffix;
                        var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                        displayableData.push(result[1]);
                    }
                }
                else if (this.state.pathToFetchData === "iam.roles") {
                    this.setState({ policies: tempData.policies });
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "roles")
                                displayableData.push(res[i + 1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "iam.users") {
                    this.setState({ policies: tempData.policies });
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "users")
                                displayableData.push(res[i + 1]);
                        }
                    }
                } else if (this.state.pathToFetchData === "iam.groups") {
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "groups")
                                displayableData.push(res[i + 1]);
                        }
                    }
                } else if (this.state.pathToFetchData === "iam.credential_reports") {
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "credential_reports")
                                displayableData.push(res[i + 1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "iam.policies") {
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "policies")
                                displayableData.push(res[i + 1]);
                        }
                    }
                } else if (this.state.pathToFetchData === "cloudtrail.regions.id.trails") {
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");

                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "regions") {
                                displayableData.push(res[i + 1]);
                            } else if (res[i] === "trails") {
                                displayableData2.push(res[i + 1]);
                            }
                        }


                    }
                }
                else if (this.state.pathToFetchData === "cloudtrail.regions") {
                    for (let e = 0; e < items.length; e++) {
                        var test = items[e];
                        var firstvariable = "regions.";
                        var secondvariable = '.' + id_suffix;
                        var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                        displayableData.push(result[1]);
                    }
                }
                else if (this.state.pathToFetchData === "cloudformation.regions.id.stacks") {
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "stacks")
                                displayableData.push(res[i + 1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "sqs.regions.id.queues") {
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "queues")
                                displayableData.push(res[i + 1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "config.regions") {
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "regions")
                                displayableData.push(res[i + 1]);
                        }
                        // for (var j = 0; j < this.state.data.length; j++) {
                        //     for (var k = 0; k < res.length; k++) {

                        //     }

                        // }
                    }
                } else if (this.state.pathToFetchData === "redshift.regions.id.parameter_groups") {
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "parameter_groups")
                                displayableData.push(res[i + 1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "ses.regions.id.identities") {
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "identities")
                                displayableData.push(res[i + 1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "s3.buckets") {
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "buckets")
                                displayableData.push(res[i + 1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "vpc.regions.id.vpcs.id.network_acls") {
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "network_acls")
                                displayableData.push(res[i + 1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "vpc.regions.id.vpcs.id.subnets") {
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "subnets")
                                displayableData.push(res[i + 1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "elbv2.regions.id.vpcs.id.lbs") {
                    if (items[0].indexOf('.listeners.') > -1) {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var result = test.match(new RegExp(".regions." + "(.*)" + ".vpcs."));
                            displayableData.push(result[1]);
                            var result2 = test.match(new RegExp(".vpcs." + "(.*)" + ".lbs."));
                            displayableData2.push(result2[1]);
                            var result3 = test.match(new RegExp(".lbs." + "(.*)" + ".listeners."));
                            displayableData3.push(result3[1]);
                            var result4 = test.match(new RegExp(".listeners." + "(.*)" + ".Protocol"));
                            displayableData4.push(result4[1]);
                        }
                    }
                    if (items[0].indexOf('.attributes.') > -1) {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var result = test.match(new RegExp(".regions." + "(.*)" + ".vpcs."));
                            displayableData.push(result[1]);
                            var result2 = test.match(new RegExp(".vpcs." + "(.*)" + ".lbs."));
                            displayableData2.push(result2[1]);
                            var result3 = test.match(new RegExp(".lbs." + "(.*)" + ".attributes."));
                            displayableData3.push(result3[1]);
                            var result4 = test.match(new RegExp(".attributes." + "(.*)" + ""));
                            displayableData4.push(result4[1]);
                        }
                    }

                }


            }
            if (localStorage.getItem('cpro') === 'oci' || JSON.parse(localStorage.getItem('sA')).cloud_platform) {
                if (this.state.pathToFetchData === "identity.policies") {
                    this.setState({ policies: tempData.policies });
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "policies")
                                displayableData.push(res[i + 1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "identity.users") {
                    this.setState({ policies: tempData.policies });
                    for (let e = 0; e < items.length; e++) {
                        var str = items[e];
                        var res = str.split(".");
                        for (var i = 0; i < res.length; i++) {
                            if (res[i] === "users")
                                displayableData.push(res[i + 1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "objectstorage.compartments.id.buckets") {
                    if (id_suffix) {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var firstvariable = "buckets.";
                            var secondvariable = '.' + id_suffix;
                            var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                            displayableData.push(result[1]);
                        }
                    } else {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var firstvariable = "buckets.";
                            var secondvariable = '';
                            var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                            displayableData.push(result[1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "blockstorage.compartments.id.blockvolumes") {
                    if (id_suffix) {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var firstvariable = "blockvolumes.";
                            var secondvariable = '.' + id_suffix;
                            var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                            displayableData.push(result[1]);
                        }
                    } else {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var firstvariable = "blockvolumes.";
                            var secondvariable = '';
                            var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                            displayableData.push(result[1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "database.compartments.id.db_system.id.databases") {
                    if (id_suffix) {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var firstvariable = "db_system.";
                            var secondvariable = '.databases';
                            var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                            displayableData.push(result[1]);
                        }
                    } else {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var firstvariable = "databases.";
                            var secondvariable = '';
                            var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                            displayableData.push(result[1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "database.compartments.id.db_system") {
                    if (id_suffix) {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var firstvariable = "db_system.";
                            var secondvariable = '.domain';
                            var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                            displayableData.push(result[1]);
                        }
                    } else {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var firstvariable = "db_system.";
                            var secondvariable = '';
                            var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                            displayableData.push(result[1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "compute.compartments.id.instances") {
                    if (id_suffix) {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var firstvariable = "instances.";
                            var secondvariable = '.' + id_suffix;
                            var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                            displayableData.push(result[1]);
                        }
                    } else {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var firstvariable = "instances.";
                            var secondvariable = '';
                            var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                            displayableData.push(result[1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "vcn.compartments.id.vcn.id.security_lists.id.ingress_security_rules") {
                    if (id_suffix) {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var firstvariable = "security_lists.";
                            var secondvariable = '.' + id_suffix;
                            var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                            displayableData.push(result[1]);
                        }
                    } else {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var firstvariable = "security_lists.";
                            var secondvariable = '.ingress_security_rules';
                            var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                            displayableData.push(result[1]);
                            var result2 = test.match(new RegExp(secondvariable + '.' + "(.*)" + ""));
                            displayableData2.push(result2[1]);
                            var result3 = test.match(new RegExp("compartments." + "(.*)" + ".vcn"));
                            displayableData3.push(result3[1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "vcn.compartments.id.vcn.id.nsg.id.ingress_rules") {
                    if (id_suffix) {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var firstvariable = "security_lists.";
                            var secondvariable = '.' + id_suffix;
                            var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                            displayableData.push(result[1]);
                        }
                    } else {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var result = test.match(new RegExp(".vcn." + "(.*)" + ".nsg"));
                            displayableData.push(result[1]);
                            var result2 = test.match(new RegExp("nsg." + '.' + "(.*)" + ".ingress_rules"));
                            displayableData2.push(result2[1]);
                            var result3 = test.match(new RegExp("ingress_rules." + "(.*)" + ""));
                            displayableData3.push(result3[1]);
                        }
                    }
                }
                else if (this.state.pathToFetchData === "loadbalancer.compartments.id.loadbalancer.id.listeners") {
                    if (id_suffix) {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var firstvariable = "listeners.";
                            var secondvariable = '.' + id_suffix;
                            var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                            displayableData.push(result[1]);
                        }
                    } else {
                        for (let e = 0; e < items.length; e++) {
                            var test = items[e];
                            var firstvariable = "listeners.";
                            var secondvariable = '';
                            var result = test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
                            displayableData.push(result[1]);
                        }
                    }
                }

            }

        }


        this.setState({
            data: data,
            labels: this.props.location ? this.props.location.state.labels : this.props.labels,
            dbName: this.props.location ? this.props.location.state.dbName : this.props.dbName,
            displayableData: displayableData,
            displayableData2: displayableData2,
            displayableData3: displayableData3,
            displayableData4: displayableData4,
            pass_policy_pos: pass_policy_pos,
            id_suffix: id_suffix
        })
    }
    render() {
        return (
            <div className="dashboard-container cust-boxShadow-1">
                <Row>

                    <Col className="dashboardsMainRightSection">

                        <div activeTab={this.state.activeTab}>
                            {(localStorage.getItem('cpro') === 'oci' || JSON.parse(localStorage.getItem('sA')).cloud_platform === 'oci') &&
                                <div>
                                    {this.state.pathToFetchData === "identity.policies" &&
                                        <IdentityPolicies dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "identity.users" &&
                                        <IdentityUsers dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "objectstorage.compartments.id.buckets" &&
                                        <ObjectStorageBuckets dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "blockstorage.compartments.id.blockvolumes" &&
                                        <BlockStorageBlockVolume dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "database.compartments.id.db_system.id.databases" &&
                                        <OCIDatabase dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "database.compartments.id.db_system" &&
                                        <DBSystems dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "compute.compartments.id.instances" &&
                                        <ComputeInstances dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }




                                    {this.state.pathToFetchData === "vcn.compartments.id.vcn.id.security_lists.id.ingress_security_rules" &&
                                        <VcnSLISR dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData3={this.state.displayableData3} displayableData2={this.state.displayableData2} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "vcn.compartments.id.vcn.id.nsg.id.ingress_rules" &&
                                        <VcnNsgIR dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData3={this.state.displayableData3} displayableData2={this.state.displayableData2} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "loadbalancer.compartments.id.loadbalancer.id.listeners" &&
                                        <LoadBalListener dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }



                                </div>
                            }
                            {(localStorage.getItem('cpro') === 'aws' || JSON.parse(localStorage.getItem('sA')).cloud_platform === 'aws') &&
                                <div>
                                    {this.state.pathToFetchData === "ec2.regions.id.vpcs.id.security_groups" &&
                                        <EC2RegionsVpcsSecurityGroups dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "ec2.regions.id.snapshots" &&
                                        <EC2RegionsSnapshots dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "ec2.regions.id.volumes" &&
                                        <EC2RegionsVolumes dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "ec2.regions.id.vpcs.id.instances" &&
                                        <EC2RegionsInstances dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "iam.roles" &&
                                        <IamRoles policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />

                                    }
                                    {this.state.pathToFetchData === "iam.users" &&
                                        <IamUsers policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />

                                    }
                                    {this.state.pathToFetchData === "iam.groups" &&
                                        <IamGroups policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />

                                    }
                                    {this.state.pathToFetchData === "iam.credential_reports" &&
                                        <IamCredentialReports policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />

                                    }
                                    {this.state.pathToFetchData === "iam.password_policy" &&
                                        <IamPasswordPolicy policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />

                                    }
                                    {this.state.pathToFetchData === "iam.policies" &&
                                        <IamPolicies policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "cloudtrail.regions.id.trails" &&
                                        <CloudTrailTrails history={this.props.history} policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} displayableData2={this.state.displayableData2} id_suffix={this.state.id_suffix} />
                                    }
                                    {this.state.pathToFetchData === "cloudtrail.regions" &&
                                        <CloudTrailRegions history={this.props.history} policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} id_suffix={this.state.id_suffix} />
                                    }
                                    {this.state.pathToFetchData === "cloudformation.regions.id.stacks" &&
                                        <CloudFormationStacks history={this.props.history} policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "sqs.regions.id.queues" &&
                                        <SqsQueues policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "config.regions" &&
                                        <ConfigRegions policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "redshift.regions.id.parameter_groups" &&
                                        <RedshiftParametersGroups policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "ses.regions.id.identities" &&
                                        <SesIdentities policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "s3.buckets" &&
                                        <S3Buckets policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "vpc.regions.id.vpcs.id.network_acls" &&
                                        <VpcNetworkAcls policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "vpc.regions.id.vpcs.id.subnets" &&
                                        <VpcSubnets policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }

                                    {this.state.pass_policy_pos && this.state.pass_policy_pos > -1 &&
                                        <IamPasswordPolicy policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} />
                                    }
                                    {this.state.pathToFetchData === "elbv2.regions.id.vpcs.id.lbs" && this.state.items[0].indexOf('.listeners.') > -1 &&
                                        <Elbv2Listener history={this.props.history} policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} displayableData2={this.state.displayableData2} displayableData3={this.state.displayableData3} displayableData4={this.state.displayableData4} />
                                    }
                                    {this.state.pathToFetchData === "elbv2.regions.id.vpcs.id.lbs" && this.state.items[0].indexOf('.attributes.') > -1 &&
                                        <Elbv2Attribute history={this.props.history} policies={this.state.policies} dbName={this.state.dbName} data={this.state.data} whichDataToFetch={this.props.location ? this.props.location.state.whichDataToFetch : this.props.whichDataToFetch} accId={this.props.location ? this.props.location.state.accId : this.props.accId} displayableData={this.state.displayableData} displayableData2={this.state.displayableData2} displayableData3={this.state.displayableData3} displayableData4={this.state.displayableData4} />
                                    }


                                </div>
                            }
                        </div>

                    </Col>
                </Row>
            </div>
        )
    }
}
