import axios from "axios";
import { Modal } from "antd";
export default class Axios {
    static ajax(options) {
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById("ajaxLoading");
            loading.style.display = "block";
        }
        let baseApi = ''
        if (options.data.isMock) {
            baseApi = "https://mobile-ms.uat.homecreditcfc.cn/mock/6204f860e491190027bbaf31/mockapi";
        } else {
            baseApi = " https://mobile-ms.uat.homecreditcfc.cn/mock/6204f860e491190027bbaf31/mockapi";
        }
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then(response => {
                let loading;
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById("ajaxLoading");
                    loading.style.display = "none";
                }
                if (response.status === 200) {
                    let res = response.data;
                    if (res.code === 0) {
                        resolve(res)
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.msg
                        })
                    }
                } else {
                    reject(response.data)
                }
            })
        })
    }
}