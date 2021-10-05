import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faUserCircle,
  faCalendarAlt,
  faFlag,
  faExclamationTriangle,
  faCogs,
  faCodeBranch,
  faListAlt,
  faCloud,
  faHistory,
  faIdCard,
  faChartBar,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../layout/Header";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  TabContent,
  TabPane,
  ButtonGroup,
  Nav,
  NavItem,
  NavLink,
  Button,
  Row,
  Col,
  Table,
  Input
} from "reactstrap";
import NoData from "../layout/NoData";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ApiService from "../../services/APIService";
import * as Constants from "../../data/Constants";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { Bar } from "react-chartjs-2";
import classnames from "classnames";
import LineChart from "../graphs/LineChart";
import StackedBar1 from "../graphs/StackedBar1";
import TabluePoc1 from "./TabluePoc1";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import UtilClass from "../SupportingJs/Util";
import CIS_Dashboard from "./CIS_Dashboard";
import * as namesMapping from "../../data/namesMapping";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
//import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandMore from '@material-ui/icons/ExpandMore';
const optionsDateWiseFilter = [
  'none',
  'Day-Wise',
  'Date-Range',
];
//const url = "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en&:display_count=y&:origin=viz_share_link"
const url =
  "https://public.tableau.com/views/COVID-19HumanResources/COVID-19HRDashboard?:language=en&:display_count=y&:origin=viz_share_link";

class CloudDashboard extends Component {
  _dataContext = new ApiService();
  _dataContextUtil = new UtilClass();
  //_toastContext = new Toast();
  state = {
    summary: [],
    accIdList: [],
    cloudTypeList: [],
    dateFilter: 1,
    date1: undefined,
    date2: undefined,
    isLoading: false,
    providerType: "",
    category: [],
    activeTab: "3",
    activeTabDateRange: "1",
    showCompliance: "0",
    showTablaue: "0",
    activeComp: "default",
    tabData: [],
    dropdownOpen: false,
    accountsList: [],
    anchorEl: null,
    anchorEl2: null,
    selectedCat: "All",
    ServiceData: this.props.location.state.data,
    accId:this.props.location.state.data.accId
  };



  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }


  showToast = (toastText, type) => {
    if (type === "success") {
      toast.success(toastText, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (type === "error") {
      toast.error(toastText, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (type === "warning") {
      toast.warning(toastText, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (type === "info") {
      toast.info(toastText, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };



  async componentDidMount() {
    // this.setState({
    //   ServiceData: {
    //     "data": {
    //       "_id": "5f90481f760ee0d4e4c7eaa8",
    //       "metadata": {
    //         "analytics": {
    //           "emr": {
    //             "resources": {
    //               "clusters": {
    //                 "cols": 2,
    //                 "path": "services.emr.regions.id.vpcs.id.clusters",
    //                 "callbacks": [
    //                   [
    //                     "match_security_groups_and_resources_callback",
    //                     {
    //                       "status_path": [
    //                         "Status",
    //                         "State"
    //                       ],
    //                       "sg_list_attribute_name": [
    //                         "Ec2InstanceAttributes",
    //                         "EmrManagedMasterSecurityGroup"
    //                       ],
    //                       "sg_id_attribute_name": ""
    //                     }
    //                   ],
    //                   [
    //                     "match_security_groups_and_resources_callback",
    //                     {
    //                       "status_path": [
    //                         "Status",
    //                         "State"
    //                       ],
    //                       "sg_list_attribute_name": [
    //                         "Ec2InstanceAttributes",
    //                         "EmrManagedSlaveSecurityGroup"
    //                       ],
    //                       "sg_id_attribute_name": ""
    //                     }
    //                   ]
    //                 ],
    //                 "full_path": "services.emr.regions.id.vpcs.id.clusters",
    //                 "script": "services.emr.regions.vpcs.clusters",
    //                 "count": 0
    //               }
    //             }
    //           }
    //         },
    //         "management": {
    //           "cloudformation": {
    //             "resources": {
    //               "stacks": {
    //                 "cols": 2,
    //                 "path": "services.cloudformation.regions.id.stacks",
    //                 "callbacks": [
    //                   [
    //                     "match_roles_and_cloudformation_stacks_callback",
    //                     {}
    //                   ]
    //                 ],
    //                 "full_path": "services.cloudformation.regions.id.stacks",
    //                 "script": "services.cloudformation.regions.stacks",
    //                 "count": 21
    //               }
    //             }
    //           },
    //           "cloudtrail": {
    //             "resources": {
    //               "regions": {
    //                 "cols": 2,
    //                 "path": "services.cloudtrail.regions",
    //                 "full_path": "services.cloudtrail.regions",
    //                 "script": "services.cloudtrail.regions",
    //                 "count": 16
    //               },
    //               "trails": {
    //                 "cols": 2,
    //                 "path": "services.cloudtrail.regions.id.trails",
    //                 "full_path": "services.cloudtrail.regions.id.trails",
    //                 "script": "services.cloudtrail.regions.trails",
    //                 "count": 80
    //               }
    //             }
    //           },
    //           "cloudwatch": {
    //             "resources": {
    //               "alarms": {
    //                 "cols": 2,
    //                 "path": "services.cloudwatch.regions.id.alarms",
    //                 "full_path": "services.cloudwatch.regions.id.alarms",
    //                 "script": "services.cloudwatch.regions.alarms",
    //                 "count": 18
    //               }
    //             },
    //             "summaries": {
    //               "statistics": {
    //                 "cols": 1,
    //                 "path": "services.cloudwatch.statistics"
    //               }
    //             }
    //           },
    //           "config": {
    //             "resources": {
    //               "regions": {
    //                 "cols": 2,
    //                 "path": "services.config.regions",
    //                 "full_path": "services.config.regions",
    //                 "script": "services.config.regions",
    //                 "count": 16
    //               },
    //               "recorders": {
    //                 "path": "services.config.regions.id.recorders",
    //                 "full_path": "services.config.regions.id.recorders",
    //                 "script": "services.config.regions.recorders",
    //                 "count": 3
    //               },
    //               "rules": {
    //                 "path": "services.config.regions.id.rules",
    //                 "full_path": "services.config.regions.id.rules",
    //                 "script": "services.config.regions.rules",
    //                 "count": 108
    //               }
    //             }
    //           }
    //         },
    //         "messaging": {
    //           "sns": {
    //             "resources": {
    //               "topics": {
    //                 "cols": 2,
    //                 "path": "services.sns.regions.id.topics",
    //                 "full_path": "services.sns.regions.id.topics",
    //                 "script": "services.sns.regions.topics",
    //                 "count": 11
    //               }
    //             }
    //           },
    //           "ses": {
    //             "resources": {
    //               "identities": {
    //                 "cols": 2,
    //                 "path": "services.ses.regions.id.identities",
    //                 "full_path": "services.ses.regions.id.identities",
    //                 "script": "services.ses.regions.identities",
    //                 "count": 6
    //               }
    //             }
    //           },
    //           "sqs": {
    //             "resources": {
    //               "queues": {
    //                 "cols": 2,
    //                 "path": "services.sqs.regions.id.queues",
    //                 "full_path": "services.sqs.regions.id.queues",
    //                 "script": "services.sqs.regions.queues",
    //                 "count": 11
    //               }
    //             }
    //           }
    //         },
    //         "network": {
    //           "vpc": {
    //             "resources": {
    //               "network_acls": {
    //                 "cols": 2,
    //                 "path": "services.vpc.regions.id.vpcs.id.network_acls",
    //                 "callbacks": [
    //                   [
    //                     "match_network_acls_and_subnets_callback",
    //                     {}
    //                   ],
    //                   [
    //                     "process_network_acls_callback",
    //                     {}
    //                   ]
    //                 ],
    //                 "full_path": "services.vpc.regions.id.vpcs.id.network_acls",
    //                 "script": "services.vpc.regions.vpcs.network_acls",
    //                 "count": 38
    //               },
    //               "vpcs": {
    //                 "cols": 2,
    //                 "path": "services.vpc.regions.id.vpcs",
    //                 "full_path": "services.vpc.regions.id.vpcs",
    //                 "script": "services.vpc.regions.vpcs",
    //                 "count": 38
    //               },
    //               "flow_logs": {
    //                 "hidden": true,
    //                 "path": "services.vpc.regions.id.flow_logs",
    //                 "callbacks": [
    //                   [
    //                     "sort_vpc_flow_logs_callback",
    //                     {}
    //                   ],
    //                   [
    //                     "match_roles_and_vpc_flowlogs_callback",
    //                     {}
    //                   ]
    //                 ],
    //                 "full_path": "services.vpc.regions.id.flow_logs",
    //                 "script": "services.vpc.regions.flow_logs",
    //                 "count": 4
    //               },
    //               "subnets": {
    //                 "cols": 2,
    //                 "path": "services.vpc.regions.id.vpcs.id.subnets",
    //                 "full_path": "services.vpc.regions.id.vpcs.id.subnets",
    //                 "script": "services.vpc.regions.vpcs.subnets",
    //                 "count": 77
    //               },
    //               "peering_connections": {
    //                 "hidden": true,
    //                 "path": "services.vpc.regions.id.peering_connections",
    //                 "callbacks": [
    //                   [
    //                     "process_vpc_peering_connections_callback",
    //                     {}
    //                   ]
    //                 ],
    //                 "full_path": "services.vpc.regions.id.peering_connections",
    //                 "script": "services.vpc.regions.peering_connections",
    //                 "count": 0
    //               }
    //             }
    //           },
    //           "route53": {
    //             "resources": {
    //               "domains": {
    //                 "cols": 2,
    //                 "path": "services.route53.regions.id.domains",
    //                 "full_path": "services.route53.regions.id.domains",
    //                 "script": "services.route53.regions.domains",
    //                 "count": 0
    //               },
    //               "hosted_zones": {
    //                 "cols": 2,
    //                 "path": "services.route53.regions.id.hosted_zones",
    //                 "full_path": "services.route53.regions.id.hosted_zones",
    //                 "script": "services.route53.regions.hosted_zones",
    //                 "count": 3
    //               }
    //             }
    //           },
    //           "directconnect": {
    //             "resources": {
    //               "connections": {
    //                 "cols": 2,
    //                 "path": "services.directconnect.connections",
    //                 "full_path": "services.directconnect.connections",
    //                 "script": "services.directconnect.connections",
    //                 "count": 0
    //               }
    //             }
    //           }
    //         },
    //         "compute": {
    //           "summaries": {
    //             "external attack surface": {
    //               "cols": 1,
    //               "path": "service_groups.compute.summaries.external_attack_surface",
    //               "callbacks": [
    //                 [
    //                   "merge",
    //                   {
    //                     "attribute": "external_attack_surface"
    //                   }
    //                 ]
    //               ]
    //             }
    //           },
    //           "ec2": {
    //             "resources": {
    //               "instances": {
    //                 "cols": 2,
    //                 "path": "services.ec2.regions.id.vpcs.id.instances",
    //                 "callbacks": [
    //                   [
    //                     "match_instances_and_subnets_callback",
    //                     {}
    //                   ]
    //                 ],
    //                 "full_path": "services.ec2.regions.id.vpcs.id.instances",
    //                 "script": "services.ec2.regions.vpcs.instances",
    //                 "count": 38
    //               },
    //               "security_groups": {
    //                 "cols": 2,
    //                 "path": "services.ec2.regions.id.vpcs.id.security_groups",
    //                 "full_path": "services.ec2.regions.id.vpcs.id.security_groups",
    //                 "script": "services.ec2.regions.vpcs.security_groups",
    //                 "count": 170
    //               },
    //               "volumes": {
    //                 "cols": 2,
    //                 "path": "services.ec2.regions.id.volumes",
    //                 "full_path": "services.ec2.regions.id.volumes",
    //                 "script": "services.ec2.regions.volumes",
    //                 "count": 46
    //               },
    //               "snapshots": {
    //                 "cols": 2,
    //                 "path": "services.ec2.regions.id.snapshots",
    //                 "full_path": "services.ec2.regions.id.snapshots",
    //                 "script": "services.ec2.regions.snapshots",
    //                 "count": 46
    //               },
    //               "network_interfaces": {
    //                 "path": "services.ec2.regions.id.vpcs.id.network_interfaces",
    //                 "hidden": true,
    //                 "callbacks": [
    //                   [
    //                     "match_security_groups_and_resources_callback",
    //                     {
    //                       "sg_list_attribute_name": [
    //                         "Groups"
    //                       ],
    //                       "sg_id_attribute_name": "GroupId"
    //                     }
    //                   ]
    //                 ],
    //                 "full_path": "services.ec2.regions.id.vpcs.id.network_interfaces",
    //                 "script": "services.ec2.regions.vpcs.network_interfaces",
    //                 "count": 50
    //               },
    //               "images": {
    //                 "cols": 2,
    //                 "path": "services.ec2.regions.id.images",
    //                 "full_path": "services.ec2.regions.id.images",
    //                 "script": "services.ec2.regions.images",
    //                 "count": 18
    //               }
    //             },
    //             "summaries": {
    //               "external attack surface": {
    //                 "cols": 1,
    //                 "path": "services.ec2.external_attack_surface",
    //                 "callbacks": [
    //                   [
    //                     "list_ec2_network_attack_surface_callback",
    //                     {
    //                       "path": "services.ec2.regions.id.vpcs.id.instances.id.network_interfaces.id.PrivateIpAddresses"
    //                     }
    //                   ]
    //                 ]
    //               }
    //             }
    //           },
    //           "elb": {
    //             "resources": {
    //               "elbs": {
    //                 "cols": 2,
    //                 "path": "services.elb.regions.id.vpcs.id.elbs",
    //                 "callbacks": [
    //                   [
    //                     "match_security_groups_and_resources_callback",
    //                     {
    //                       "status_path": [
    //                         "Scheme"
    //                       ],
    //                       "sg_list_attribute_name": [
    //                         "security_groups"
    //                       ],
    //                       "sg_id_attribute_name": "GroupId"
    //                     }
    //                   ],
    //                   [
    //                     "get_lb_attack_surface",
    //                     {}
    //                   ]
    //                 ],
    //                 "full_path": "services.elb.regions.id.vpcs.id.elbs",
    //                 "script": "services.elb.regions.vpcs.elbs",
    //                 "count": 0
    //               },
    //               "elb_policies": {
    //                 "cols": 2,
    //                 "path": "services.elb.regions.id.elb_policies",
    //                 "full_path": "services.elb.regions.id.elb_policies",
    //                 "script": "services.elb.regions.elb_policies",
    //                 "count": 0
    //               }
    //             },
    //             "summaries": {
    //               "external attack surface": {
    //                 "cols": 1,
    //                 "path": "services.elb.external_attack_surface"
    //               }
    //             }
    //           },
    //           "elbv2": {
    //             "resources": {
    //               "lbs": {
    //                 "cols": 2,
    //                 "path": "services.elbv2.regions.id.vpcs.id.lbs",
    //                 "callbacks": [
    //                   [
    //                     "match_security_groups_and_resources_callback",
    //                     {
    //                       "status_path": [
    //                         "State",
    //                         "Code"
    //                       ],
    //                       "sg_list_attribute_name": [
    //                         "security_groups"
    //                       ],
    //                       "sg_id_attribute_name": "GroupId"
    //                     }
    //                   ],
    //                   [
    //                     "get_lb_attack_surface",
    //                     {}
    //                   ]
    //                 ],
    //                 "full_path": "services.elbv2.regions.id.vpcs.id.lbs",
    //                 "script": "services.elbv2.regions.vpcs.lbs",
    //                 "count": 0
    //               }
    //             },
    //             "summaries": {
    //               "external attack surface": {
    //                 "cols": 1,
    //                 "path": "services.elbv2.external_attack_surface"
    //               }
    //             }
    //           },
    //           "awslambda": {
    //             "resources": {
    //               "functions": {
    //                 "path": "services.awslambda.regions.id.functions",
    //                 "callbacks": [
    //                   [
    //                     "match_security_groups_and_resources_callback",
    //                     {
    //                       "status_path": [
    //                         "runtime"
    //                       ],
    //                       "sg_list_attribute_name": [
    //                         "VpcConfig",
    //                         "SecurityGroupIds"
    //                       ]
    //                     }
    //                   ]
    //                 ],
    //                 "full_path": "services.awslambda.regions.id.functions",
    //                 "script": "services.awslambda.regions.functions",
    //                 "count": 78
    //               }
    //             }
    //           }
    //         },
    //         "security": {
    //           "iam": {
    //             "resources": {
    //               "groups": {
    //                 "cols": 2,
    //                 "path": "services.iam.groups",
    //                 "full_path": "services.iam.groups",
    //                 "script": "services.iam.groups",
    //                 "count": 16
    //               },
    //               "policies": {
    //                 "cols": 2,
    //                 "path": "services.iam.policies",
    //                 "full_path": "services.iam.policies",
    //                 "script": "services.iam.policies",
    //                 "count": 254
    //               },
    //               "roles": {
    //                 "cols": 2,
    //                 "path": "services.iam.roles",
    //                 "full_path": "services.iam.roles",
    //                 "script": "services.iam.roles",
    //                 "count": 262
    //               },
    //               "users": {
    //                 "cols": 2,
    //                 "path": "services.iam.users",
    //                 "full_path": "services.iam.users",
    //                 "script": "services.iam.users",
    //                 "count": 33
    //               },
    //               "credential_reports": {
    //                 "cols": 2,
    //                 "path": "services.iam.credential_reports",
    //                 "full_path": "services.iam.credential_reports",
    //                 "script": "services.iam.credential_reports",
    //                 "count": 34
    //               }
    //             },
    //             "summaries": {
    //               "permissions": {
    //                 "cols": 1,
    //                 "path": "services.iam.permissions"
    //               },
    //               "password_policy": {
    //                 "cols": 1,
    //                 "path": "services.iam.password_policy"
    //               }
    //             }
    //           },
    //           "acm": {
    //             "resources": {
    //               "certificates": {
    //                 "cols": 2,
    //                 "path": "services.acm.regions.id.certificates",
    //                 "full_path": "services.acm.regions.id.certificates",
    //                 "script": "services.acm.regions.certificates",
    //                 "count": 0
    //               }
    //             }
    //           },
    //           "kms": {
    //             "resources": {
    //               "keys": {
    //                 "path": "services.kms.regions.id.keys",
    //                 "full_path": "services.kms.regions.id.keys",
    //                 "script": "services.kms.regions.keys",
    //                 "count": 57
    //               }
    //             }
    //           },
    //           "secretsmanager": {
    //             "resources": {
    //               "secrets": {
    //                 "cols": 2,
    //                 "path": "services.secretsmanager.regions.id.secrets",
    //                 "full_path": "services.secretsmanager.regions.id.secrets",
    //                 "script": "services.secretsmanager.regions.secrets",
    //                 "count": 4
    //               }
    //             }
    //           }
    //         },
    //         "database": {
    //           "summaries": {
    //             "external attack surface": {
    //               "cols": 1,
    //               "path": "service_groups.database.summaries.external_attack_surface",
    //               "callbacks": [
    //                 [
    //                   "merge",
    //                   {
    //                     "attribute": "external_attack_surface"
    //                   }
    //                 ]
    //               ]
    //             }
    //           },
    //           "dynamodb": {
    //             "resources": {
    //               "tables": {
    //                 "path": "services.dynamodb.regions.id.tables"
    //               }
    //             }
    //           },
    //           "elasticache": {
    //             "resources": {
    //               "clusters": {
    //                 "cols": 2,
    //                 "path": "services.elasticache.regions.id.vpcs.id.clusters",
    //                 "callbacks": [
    //                   [
    //                     "match_security_groups_and_resources_callback",
    //                     {
    //                       "status_path": [
    //                         "CacheClusterStatus"
    //                       ],
    //                       "sg_list_attribute_name": [
    //                         "SecurityGroups"
    //                       ],
    //                       "sg_id_attribute_name": "SecurityGroupId"
    //                     }
    //                   ],
    //                   [
    //                     "get_db_attack_surface",
    //                     {}
    //                   ]
    //                 ],
    //                 "full_path": "services.elasticache.regions.id.vpcs.id.clusters",
    //                 "script": "services.elasticache.regions.vpcs.clusters",
    //                 "count": 0
    //               },
    //               "parameter_groups": {
    //                 "cols": 2,
    //                 "path": "services.elasticache.regions.id.parameter_groups",
    //                 "full_path": "services.elasticache.regions.id.parameter_groups",
    //                 "script": "services.elasticache.regions.parameter_groups",
    //                 "count": 203
    //               },
    //               "security_groups": {
    //                 "no_exceptions": true,
    //                 "cols": 2,
    //                 "path": "services.elasticache.regions.id.security_groups",
    //                 "full_path": "services.elasticache.regions.id.security_groups",
    //                 "script": "services.elasticache.regions.security_groups",
    //                 "count": 0
    //               },
    //               "subnet_groups": {
    //                 "cols": 2,
    //                 "path": "services.elasticache.regions.id.vpcs.id.subnet_groups",
    //                 "full_path": "services.elasticache.regions.id.vpcs.id.subnet_groups",
    //                 "script": "services.elasticache.regions.vpcs.subnet_groups",
    //                 "count": 1
    //               }
    //             }
    //           },
    //           "rds": {
    //             "resources": {
    //               "instances": {
    //                 "cols": 2,
    //                 "path": "services.rds.regions.id.vpcs.id.instances",
    //                 "callbacks": [
    //                   [
    //                     "match_security_groups_and_resources_callback",
    //                     {
    //                       "status_path": [
    //                         "DBInstanceStatus"
    //                       ],
    //                       "sg_list_attribute_name": [
    //                         "VpcSecurityGroups"
    //                       ],
    //                       "sg_id_attribute_name": "VpcSecurityGroupId"
    //                     }
    //                   ],
    //                   [
    //                     "get_db_attack_surface",
    //                     {}
    //                   ]
    //                 ],
    //                 "full_path": "services.rds.regions.id.vpcs.id.instances",
    //                 "script": "services.rds.regions.vpcs.instances",
    //                 "count": 0
    //               },
    //               "security_groups": {
    //                 "no_exceptions": true,
    //                 "cols": 2,
    //                 "path": "services.rds.regions.id.security_groups",
    //                 "full_path": "services.rds.regions.id.security_groups",
    //                 "script": "services.rds.regions.security_groups",
    //                 "count": 16
    //               },
    //               "snapshots": {
    //                 "cols": 2,
    //                 "path": "services.rds.regions.id.vpcs.id.snapshots",
    //                 "full_path": "services.rds.regions.id.vpcs.id.snapshots",
    //                 "script": "services.rds.regions.vpcs.snapshots",
    //                 "count": 6
    //               },
    //               "parameter_groups": {
    //                 "cols": 2,
    //                 "path": "services.rds.regions.id.parameter_groups",
    //                 "full_path": "services.rds.regions.id.parameter_groups",
    //                 "script": "services.rds.regions.parameter_groups",
    //                 "count": 9
    //               },
    //               "subnet_groups": {
    //                 "cols": 2,
    //                 "path": "services.rds.regions.id.vpcs.id.subnet_groups",
    //                 "full_path": "services.rds.regions.id.vpcs.id.subnet_groups",
    //                 "script": "services.rds.regions.vpcs.subnet_groups",
    //                 "count": 3
    //               }
    //             },
    //             "summaries": {
    //               "external attack surface": {
    //                 "cols": 1,
    //                 "path": "services.rds.external_attack_surface"
    //               }
    //             }
    //           },
    //           "redshift": {
    //             "resources": {
    //               "clusters": {
    //                 "cols": 2,
    //                 "path": "services.redshift.regions.id.vpcs.id.clusters",
    //                 "callbacks": [
    //                   [
    //                     "match_security_groups_and_resources_callback",
    //                     {
    //                       "status_path": [
    //                         "ClusterStatus"
    //                       ],
    //                       "sg_list_attribute_name": [
    //                         "VpcSecurityGroups"
    //                       ],
    //                       "sg_id_attribute_name": "VpcSecurityGroupId"
    //                     }
    //                   ],
    //                   [
    //                     "get_db_attack_surface",
    //                     {}
    //                   ]
    //                 ],
    //                 "full_path": "services.redshift.regions.id.vpcs.id.clusters",
    //                 "script": "services.redshift.regions.vpcs.clusters",
    //                 "count": 1
    //               },
    //               "parameter_groups": {
    //                 "cols": 2,
    //                 "path": "services.redshift.regions.id.parameter_groups",
    //                 "full_path": "services.redshift.regions.id.parameter_groups",
    //                 "script": "services.redshift.regions.parameter_groups",
    //                 "count": 3
    //               },
    //               "security_groups": {
    //                 "cols": 2,
    //                 "path": "services.redshift.regions.id.security_groups",
    //                 "full_path": "services.redshift.regions.id.security_groups",
    //                 "script": "services.redshift.regions.security_groups",
    //                 "count": 0
    //               }
    //             },
    //             "summaries": {
    //               "external attack surface": {
    //                 "cols": 1,
    //                 "path": "services.redshift.external_attack_surface"
    //               }
    //             }
    //           }
    //         },
    //         "storage": {
    //           "efs": {
    //             "hidden": true,
    //             "resources": {
    //               "file_systems": {
    //                 "path": "services.efs.regions.id.file_systems",
    //                 "callbacks": [
    //                   [
    //                     "match_security_groups_and_resources_callback",
    //                     {
    //                       "status_path": [
    //                         "LifeCycleState"
    //                       ],
    //                       "sg_list_attribute_name": [
    //                         "security_groups"
    //                       ]
    //                     }
    //                   ]
    //                 ]
    //               }
    //             }
    //           },
    //           "s3": {
    //             "resources": {
    //               "buckets": {
    //                 "cols": 2,
    //                 "path": "services.s3.buckets",
    //                 "full_path": "services.s3.buckets",
    //                 "script": "services.s3.buckets",
    //                 "count": 93
    //               }
    //             }
    //           }
    //         }
    //       },
    //       "timestamp": "2020-07-14 19:49:38.939000",
    //       "summary": [
    //         {
    //           "checked_items": 0,
    //           "flagged_items": 0,
    //           "max_level": "warning",
    //           "rules_count": 2,
    //           "resources_count": 0,
    //           "name": "acm"
    //         },
    //         {
    //           "checked_items": 0,
    //           "flagged_items": 0,
    //           "max_level": "warning",
    //           "rules_count": 0,
    //           "resources_count": 78,
    //           "name": "awslambda"
    //         },
    //         {
    //           "checked_items": 21,
    //           "flagged_items": 1,
    //           "max_level": "danger",
    //           "rules_count": 1,
    //           "resources_count": 21,
    //           "name": "cloudformation"
    //         },
    //         {
    //           "checked_items": 259,
    //           "flagged_items": 9,
    //           "max_level": "danger",
    //           "rules_count": 7,
    //           "resources_count": 80,
    //           "name": "cloudtrail"
    //         },
    //         {
    //           "checked_items": 172,
    //           "flagged_items": 154,
    //           "max_level": "danger",
    //           "rules_count": 15,
    //           "resources_count": 29,
    //           "name": "cloudwatch"
    //         },
    //         {
    //           "checked_items": 16,
    //           "flagged_items": 13,
    //           "max_level": "warning",
    //           "rules_count": 1,
    //           "resources_count": 111,
    //           "name": "config"
    //         },
    //         {
    //           "checked_items": 0,
    //           "flagged_items": 0,
    //           "max_level": "warning",
    //           "rules_count": 0,
    //           "resources_count": 0,
    //           "name": "directconnect"
    //         },
    //         {
    //           "checked_items": 11031,
    //           "flagged_items": 806,
    //           "max_level": "danger",
    //           "rules_count": 27,
    //           "resources_count": 368,
    //           "name": "ec2"
    //         },
    //         {
    //           "checked_items": 0,
    //           "flagged_items": 0,
    //           "max_level": "warning",
    //           "rules_count": 0,
    //           "resources_count": 0,
    //           "name": "efs"
    //         },
    //         {
    //           "checked_items": 0,
    //           "flagged_items": 0,
    //           "max_level": "warning",
    //           "rules_count": 0,
    //           "resources_count": 0,
    //           "name": "elasticache"
    //         },
    //         {
    //           "checked_items": 0,
    //           "flagged_items": 0,
    //           "max_level": "warning",
    //           "rules_count": 3,
    //           "resources_count": 0,
    //           "name": "elb"
    //         },
    //         {
    //           "checked_items": 0,
    //           "flagged_items": 0,
    //           "max_level": "warning",
    //           "rules_count": 4,
    //           "resources_count": 0,
    //           "name": "elbv2"
    //         },
    //         {
    //           "checked_items": 0,
    //           "flagged_items": 0,
    //           "max_level": "warning",
    //           "rules_count": 0,
    //           "resources_count": 0,
    //           "name": "emr"
    //         },
    //         {
    //           "checked_items": 3914,
    //           "flagged_items": 134,
    //           "max_level": "danger",
    //           "rules_count": 32,
    //           "resources_count": 599,
    //           "name": "iam"
    //         },
    //         {
    //           "checked_items": 0,
    //           "flagged_items": 0,
    //           "max_level": "warning",
    //           "rules_count": 0,
    //           "resources_count": 57,
    //           "name": "kms"
    //         },
    //         {
    //           "checked_items": 6,
    //           "flagged_items": 0,
    //           "max_level": "warning",
    //           "rules_count": 8,
    //           "resources_count": 34,
    //           "name": "rds"
    //         },
    //         {
    //           "checked_items": 9,
    //           "flagged_items": 8,
    //           "max_level": "danger",
    //           "rules_count": 6,
    //           "resources_count": 3,
    //           "name": "redshift"
    //         },
    //         {
    //           "checked_items": 0,
    //           "flagged_items": 0,
    //           "max_level": "warning",
    //           "rules_count": 3,
    //           "resources_count": 3,
    //           "name": "route53"
    //         },
    //         {
    //           "checked_items": 1449,
    //           "flagged_items": 436,
    //           "max_level": "warning",
    //           "rules_count": 19,
    //           "resources_count": 93,
    //           "name": "s3"
    //         },
    //         {
    //           "checked_items": 16,
    //           "flagged_items": 6,
    //           "max_level": "warning",
    //           "rules_count": 4,
    //           "resources_count": 6,
    //           "name": "ses"
    //         },
    //         {
    //           "checked_items": 98,
    //           "flagged_items": 0,
    //           "max_level": "warning",
    //           "rules_count": 7,
    //           "resources_count": 11,
    //           "name": "sns"
    //         },
    //         {
    //           "checked_items": 84,
    //           "flagged_items": 46,
    //           "max_level": "danger",
    //           "rules_count": 7,
    //           "resources_count": 11,
    //           "name": "sqs"
    //         },
    //         {
    //           "checked_items": 421,
    //           "flagged_items": 290,
    //           "max_level": "warning",
    //           "rules_count": 8,
    //           "resources_count": 4,
    //           "name": "vpc"
    //         },
    //         {
    //           "checked_items": 0,
    //           "flagged_items": 0,
    //           "max_level": "warning",
    //           "rules_count": 0,
    //           "resources_count": 4,
    //           "name": "secretsmanager"
    //         }
    //       ]
    //     }
    //   }
    // }
    // )
  }
  blockUi = () => {
    this.setState({
      isLoading: true,
    });
  };
  unBlockUi = () => {
    this.setState({
      isLoading: false,
    });
  };
  goToServiceDashboard = (serviceName) => {
    localStorage.setItem("cpro", this.state.providerType);
    //localStorage.setItem("whichTab", i);
    // this.props.history.push(`/ds/${this.state.accId}`, {
    //   labels2: this.state.labels2,
    //   accId: this.state.accId,
    //   activeComp: this.state.activeComp,
    // });
    //this.props.history.push(`/ds/${this.state.accId}`);
    this.props.history.push(`/ds/${this.state.accId}`, {
      accId: this.state.accId,
      serviceName:serviceName
    });
  };
  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClickListItem2 = event => {
    this.setState({ anchorEl2: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null, anchorEl2: null });
  };
  render() {
    const { anchorEl, anchorEl2 } = this.state;
    return (
      <div>
        <Header />
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
        <BlockUi tag="div" blocking={this.state.isLoading} />

        {this.state.ServiceData && this.state.ServiceData.summary && (
          <>
            <div className="dashboard-container p-0 my-2">
              <Card>

                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >



                    <>
                      <div className="dashboard-container  my-4">
                        <Card>
                          <CardHeader

                            title="Reports"
                            subheader=""
                          />
                          <CardContent>
                            <div className="table-container row">
                              <Table hover className="">
                                <thead>
                                  <tr>
                                    <th>Service</th>
                                    <th className="text-center">
                                      # of Resources
                                    </th>
                                    <th className="text-center">
                                      # of Rules
                                    </th>
                                    <th className="text-center">
                                      # of Findings
                                    </th>
                                    <th className="text-center">
                                      # of Checks
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.ServiceData.summary.map((item, i) => (
                                    <tr
                                      key={i}
                                      onClick={() =>
                                        this.goToServiceDashboard(item.name)
                                      }
                                      className={
                                        "cursorP sIconContainer " +
                                        (item.checked_items === 0 &&
                                          item.flagged_items === 0
                                          ? "default "
                                          : " ") +
                                        (item.checked_items > 0 &&
                                          item.flagged_items === 0
                                          ? "success "
                                          : " ") +
                                        (item.flagged_items > 0 &&
                                          item.max_level === "warning"
                                          ? "warning "
                                          : " ") +
                                        (item.flagged_items > 0 &&
                                          item.max_level === "danger"
                                          ? "danger "
                                          : " ") +
                                        item.name
                                      }
                                      // className={
                                      //   "cursorP sIconContainer "}
                                    >
                                      {/* {this.state.providerType === "aws" ? ( */}
                                        <td>
                                          {/* <img
                                              className="img-fluid"
                                              alt={item.name}
                                              src={require("../assets/img/aws/" +
                                                item.name +
                                                ".svg")}
                                            />
                                            &nbsp;
                                            {namesMapping.awsServiceNames.hasOwnProperty(
                                              item.name
                                            )
                                              ? namesMapping.awsServiceNames[
                                              item.name
                                              ]
                                              : item.name} */}
                                              <img
                                              className="img-fluid"
                                              alt={item.name}
                                              src={require("../assets/img/aws/" +
                                                item.name +
                                                ".svg")}
                                            />
                                            &nbsp;
                                          {item.name}
                                        </td>
                                      {/* ) : null} */}
                                      <td className="text-center">
                                        {item.resources_count}
                                      </td>
                                      <td className="text-center">
                                        {item.rules_count}
                                      </td>
                                      <td className="text-center">
                                        {item.flagged_items}
                                      </td>
                                      <td className="text-center">
                                        {item.checked_items}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </>

                  </Typography>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(CloudDashboard);
