
import store from '@/store/index'
import $http from "@/api/fetch";
import api from '@/api/api';

/**
 * 核心页面数据
 * 模板数据、主机数据等
 **/
const view = {
    state: {
        templateList:[],//选中资源时,列出的模板列表
        hostList:[],//选中模板时,列出的主机列表
    },
    mutations: {
        TEMPLATELIST_STATE: (state, params) => {
            state.templateList = params;                
        },
        HOSTLIST_STATE: (state, params) => {
            state.hostList = params;                
        }
    },
    actions: {
        getTemplateList({ commit },params) {
            return new Promise((resolve, reject) => {
                $http.post(api.getTemplateList, { id:params.id})
                    .then(res => {
                        if (res.code == '200') {
                            commit('TEMPLATELIST_STATE',res.data);
                        }
                        resolve(res);
                    }).catch(error => {
                        reject(error);
                    })
            })
        },
        getHostList({ commit },params) {
            return new Promise((resolve, reject) => {
                $http.post(api.getHostList, { id:params.id})
                    .then(res => {
                        if (res.code == '200') {
                            commit('HOSTLIST_STATE',res.data);
                        }
                        resolve(res);
                    }).catch(error => {
                        reject(error);
                    })
            })
        },
    },
}

export default view