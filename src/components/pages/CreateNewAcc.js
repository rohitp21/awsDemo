import React, { Component } from "react";
import Header from "../layout/Header";
import NoData from "../layout/NoData";
import { withRouter } from "react-router-dom";
import ApiService from "../../services/APIService";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { ToastContainer, toast } from "react-toastify";
import UtilClass from "../SupportingJs/Util";
import * as Constants from "../../data/Constants";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
const currencies = [
  {
    value: 'aws',
    label: 'AWS',
  },
  {
    value: 'oci',
    label: 'OCI',
  },
  {
    value: 'azzure',
    label: 'Azzure',
  }
];

class CreateNewAcc extends Component {
  _dataContext = new ApiService();
  _dataContextUtil = new UtilClass();
  state = {
    tabValue: 0,
    openPopup: false,
  };
  handleClickPopupOpen = () => {
    this.setState({ openPopup: true });
  };

  handlePopupClose = () => {
    this.setState({ openPopup: false });
  };
  handleTabsChange = (event, tabValue) => {
    this.setState({ tabValue });
  };
  showToast = (toastText, type) => {
    if (type === 'success') {
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
    if (type === 'error') {
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
    if (type === 'warning') {
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
    if (type === 'info') {
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
  handleChangeName = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleChangeAKey = aKey => event => {
    this.setState({ [aKey]: event.target.value });
  };
  handleChangeSKey = sKey => event => {
    this.setState({ [sKey]: event.target.value });
  };
  createAccApi= async ()=>{
    let selectedCp = "";
    let name = this.state.name;
    if(this.state.tabValue==0){
      selectedCp="aws"
    }else if(this.state.tabValue==1){
      selectedCp="oci"
    }else if(this.state.tabValue==2){
      selectedCp="azzure"
    }
    
    let param={"name":name,"cloud_platform":selectedCp,
    "data": {"access_key":this.state.aKey,"secret_key":this.state.sKey}
  }
  let data = await this._dataContext.postMethod(Constants.CREATE_ACC, param);
  this.unBlockUi();
  if (data && data !== "NE") {
    this.handleClickPopupOpen()
  } else if (data && data === "NE") {
    console.log("network error")
    this.showToast(Constants.TOAST_NET_ERR, "error");
  } else {
    console.log("something went wrong")
    this.showToast(Constants.TOAST_SOMETHING_WENT_WRONG, "error");
  }
 }
  accCreatonSuccessDone =()=>{
    let url  = localStorage.getItem("cp") //localStorage.getItem("lvdurl")
    this.handlePopupClose()
    if (url) {
      window.location.replace(url)
    }else{
      this.props.history.goBack()
    }
  }
  render() {
    const { classes } = this.props;
    const { tabValue } = this.state;
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
        <Dialog
          open={this.state.openPopup}
          onClose={this.handlePopupClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
        >
          <DialogTitle id="alert-dialog-title">{"Your Account Onboarding is Successful !!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your account onboarded successfully.
              We are loading your data into this account.
              We will send you email notification once the data processing is done.
              Thank You!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={this.handlePopupClose} color="primary">
              
            </Button> */}
            <Button onClick={this.accCreatonSuccessDone} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <BlockUi tag="div" blocking={this.state.isLoading} />
        <div className="dashboard-container p-0 my-2">
          <form className={classes.container} noValidate autoComplete="off">
            <div className={classes.root}>

              <div className={classes.root}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={tabValue}
                    onChange={this.handleTabsChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    <Tab label="AWS" />
                    <Tab label="OCI" />
                    <Tab label="Azzure" />
                  </Tabs>
                </AppBar>
                {tabValue === 0 && <TabContainer>
                  Onboard AWS Account
                  <Grid container spacing={24}>
          <Paper className={[classes.paper,'mx-auto'].join(' ')}>
          <Typography variant="h5" gutterBottom>
       Enter Account  Details
      </Typography>
          <Grid item xs={12}>
          <TextField
              id="standard-name"
              label="Account Name"
              className={classes.textField}
              value={this.state.aName}
              onChange={this.handleChangeName('name')}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
              id="standard-name"
              label="Access Key"
              className={classes.textField}
              value={this.state.aKey}
              onChange={this.handleChangeAKey('aKey')}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
              id="standard-name"
              label="Secrete Key"
              className={classes.textField}
              value={this.state.sKey}
              onChange={this.handleChangeSKey('sKey')}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
          <Button onClick={()=>this.createAccApi()} variant="contained" color="primary" className={classes.button}>
              Add Account
              
          
      </Button>
          </Grid>
          </Paper>
        </Grid>
                  </TabContainer>}
                {tabValue === 1 && <TabContainer>Create OCI Account
                  <Grid container spacing={24}>
          <Paper className={[classes.paper,'mx-auto'].join(' ')}>
          <Typography variant="h5" gutterBottom>
       Commimg Soon
      </Typography>      
          </Paper>
        </Grid>
                  </TabContainer>}
                {tabValue === 2 && <TabContainer>Create Azzure Account
                  <Grid container spacing={24}>
          <Paper className={[classes.paper,'mx-auto'].join(' ')}>
          <Typography variant="h5" gutterBottom>
       Commimg Soon
      </Typography>      
          </Paper>
        </Grid>
                  </TabContainer>}

              </div>


            </div>







          </form>
        </div>

      </div>
    );
  }
}
CreateNewAcc.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withRouter((withStyles(styles)(CreateNewAcc)))
//export default withRouter(CreateNewAcc);
