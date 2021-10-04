import axios from 'axios';
import * as Constants from '../data/Constants'
import UtilClass from '../../src/components/SupportingJs/Util'
let data = undefined;
//set withcredeintial true
axios.defaults.withCredentials = true;
export default class ApiService {
    _dataContextUtil = new UtilClass();
    //XSECANA = this._dataContextUtil.check_cookie_name('sec_ana')
    //XSECANA_REFRESH = this._dataContextUtil.check_cookie_name('sec_ana_ref')
    // config = {
    //     headers: {
    //         'X-SEC-ANA': this.XSECANA
    //     }
    // }

    async getMethod(url) {
        // let status = await this.checkAuthorzedToken()//chec vald token
        // if (status == 401) {
        //     alert("Your sesson expired, Please login again!")
        // } else {
        data = undefined;
        await axios.get(url, this.config).then(response => {
            console.log(response);
            data = response.data
        }).catch(error => {
            data = "NE"
            console.log(error);
        })
        return data;
        //}

    }
    async getMethodParam(url, param1, val1) {
        data = undefined;
        await axios.get(url + '?' + param1 + '=' + val1).then(response => {
            console.log(response);
            data = response.data
        }).catch(error => {
            data = "NE"
            console.log(error);
        })
        return data;
    }
    async postMethod(url, param) {
        data = undefined;
        await axios.post(url, param).then(response => {
            console.log(response);
            data = response.data
        }).catch(error => {
            data = "NE"
            console.log(error);
        })
        return data;
    }
    async deleteMethod(url) {
        data = undefined;
        await axios.delete(url).then(response => {
            console.log(response);
            data = response.data
        }).catch(error => {
            data = "NE"
            console.log(error);
        })
        return data;
    }
    // async postMethod(url, param) {
    //     data = undefined;
    //     await axios.post(url, param, this.config).then(response => {
    //         console.log(response);
    //         data = response.data
    //     }).catch(error => {
    //         data = "NE"
    //         console.log(error);
    //     })
    //     return data;
    // }
    async refreshTokenApi() {//to check if valid request or not?
        data = undefined;
        await axios.post(Constants.URL_TOKEN_REF, {}).then(response => {
            console.log(response);
            data = response.status
            const ct0xk3n = this._dataContextUtil.check_cookie_name('sec_ana')
            
            localStorage.setItem('ct0xk3n',ct0xk3n);
            localStorage.removeItem('cfrt');
        }).catch(error => {
            data = "NE"
            console.log(error);
        })
        return data;
    }
}
