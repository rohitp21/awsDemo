import { ThreeSixty } from "@material-ui/icons";
import axios from "axios";
import UtilClass from '../../components/SupportingJs/Util'
import ApiService from "../../services/APIService";
// import { SERVER_API_URL } from 'app/config/constants';

//const TIMEOUT = 1 * 60 * 1000;
//axios.defaults.timeout = TIMEOUT;

const setupAxiosInterceptors = (onUnauthenticated) => {
    const _dataContext = new ApiService();
    const _dataContextUtil = new UtilClass();
    const onRequestSuccess = (config) => {
        const ct0xk3n = localStorage.getItem('ct0xk3n')
        const crt0xk3n = localStorage.getItem('crt0xk3n')
        if (ct0xk3n) {
            config.headers = {
                'X-SEC-ANA': ct0xk3n,
                'X-SEC-REF': crt0xk3n
            }
        }
        return config;
    };
    const onResponseSuccess = (response) => response;
    const onResponseError = async (err) => {
        let status = err.status || (err.response ? err.response.status : 0);
        if (status === 401 && localStorage.getItem('cfrt') == undefined) {// ths is for refresh token
            localStorage.setItem('cfrt', '1');
            let tempStatus = await _dataContext.refreshTokenApi()
            if (tempStatus == 200) {
                status = tempStatus
                window.location.reload();
            }
        }
        if (status === 401 && localStorage.getItem('cfrt') == '1') {
            //implement refresh token api --f 401 then sesson expre
            console.log(err.response);
            localStorage.clear()
            _dataContextUtil.showAlert("Session Expired", "Your Session Expired,Please login again!","sessExp",undefined);
            //alert("Oops! Your session is expired,Please login again!")
            localStorage.setItem('isAuthenticated', "false")
            //window.location.reload();
            onUnauthenticated();
        }
        return Promise.reject(err);
    };
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;