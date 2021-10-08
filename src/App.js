import React, { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './components/pages/Dashboard';
import DashboardService from './components/pages/DashboardService';
import FindingDetails from './components/pages/FindingDetails';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import OCISummaryDetails from './components/layout/oci/OCIReports/OCISummaryDetails';
import Login from './components/auth/Login'
import Test from './components/auth/Test'
import ScrollTop from './components/Plugins/ScrollTop'
import ComplianceDashboard from './components/pages/ComplianceDashboard';
import CloudDashboard from './components/pages/CloudDashboard';
import AWSServices from './components/pages/AWSServices';
import AWSServiceDetails from './components/pages/AWSServiceDetails';
import AWSServiceDetails2 from './components/pages/AWSServiceDetails2';
import TabluePoc1 from './components/pages/TabluePoc1';
import setupAxiosInterceptors from './components/SupportingJs/Interceptor';
import CreateNewAcc from './components/pages/CreateNewAcc';
//const store = createStore(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
function App() {
  //setupAxiosInterceptors()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    //let apiURL = window.location.href;
    //localStorage.setItem('apiURL', apiURL);
    if (localStorage.getItem('isAuthenticated') && localStorage.getItem('isAuthenticated') === 'true') {
      setIsAuthenticated(true)
      //access token expired or not
      //if not expired continue

      //if expired excecute below logic

      //if refresh token expired or not
      //if expired post call on login page(auto logout)
      //if not expired post call on token refresh api

      //notes:

      //if on login call OR on refresh token call = succesful add to local storage 
      //access token exp time = 24 hrs
      //refresh token exp time = 15 days (in hrs)

      //if authenticated 
      //set CSRF header from cookie(value of cookie name - sec_ana with  header name - X-SEC-ANA)

    } else if (localStorage.getItem('isAuthenticated') == null) {
      //history.push("/")
    }
  });
  return (
    // <Provider store={store}>
    <Router>
      {/* <Router> */}
      <div className="App">
        <ScrollTop />
        {/* {isAuthenticated && 
          <Header />
        } */}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/">
            {isAuthenticated ? <Dashboard /> : <Login />}
          </Route>
          {/* <Route exact path="/" component={Dashboard} /> */}
          <Route path="/cloudDashboard" component={CloudDashboard} />
          <Route path="/awsservices" component={AWSServices} />
          <Route path="/aws-services-details/:id" component={AWSServiceDetails} />
          <Route path="/aws-services-details-2" component={AWSServiceDetails2} />
          <Route path="/ds/:id" component={DashboardService} />
          {/* <Route path="/fs/:id" component={FindingDetails} /> */}
          <Route path="/fs" component={FindingDetails} />
          <Route path="/complianceDashBoard/:id" component={ComplianceDashboard} />
          <Route path="/summaryDetailsOci/:id" component={OCISummaryDetails} />
          <Route path="/aws_accounts" component={TabluePoc1} />
          <Route path="/createNewAcc" component={CreateNewAcc} />
        </Switch>
      </div>
    </Router>
    // </Provider>
  );
}

export default App;
