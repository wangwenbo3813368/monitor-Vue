import store from '@/store/index'
import { Encrypt } from "@/untils/aes";
import $http from "@/api/fetch";
import api from '@/api/api';
import { routes, ansycRoutes } from '@/router/routes'
/*
 * 
 * @param {异步路由表} ansycRoutes 
 * @param {数据库权限拉取} perms 
 */

function checkIsDynamicPath(path){
    var ary = path.split("/");
    if(ary[ary.length-1].indexOf(":")==0){
       return true;
    }
    return false;
 }

function getDynamicPath(path){
   var ary = path.split("/");
   if(ary[ary.length-1].indexOf(":")==0){
       var tempAry = ary.slice(0,ary.length-1);
       var tempPath = tempAry.join("/")
       return tempPath;
   }
   return path;
}


/**
 * 递归处理角色权限
 */
function getansycRoutes(tmpRoutes, perms) {
     let aa=perms.split(',');
    const result = tmpRoutes.filter(route => {
        if (aa.indexOf(route.path) != -1) {
            if (route.children != undefined) {
                   let cc=aa.join(',');
                route.children = getansycRoutes(route.children,cc);
            }
            return true;
        }else{
            if(checkIsDynamicPath(route.path)){
                if (route.children != undefined) {
                    let cc=aa.join(',');
                     route.children = getansycRoutes(route.children,cc);
                    }
                var flag =false;
                var tempPath = getDynamicPath(route.path);
                aa.forEach(function(item){
                      if(item.indexOf(tempPath)!=-1){
                        flag =true;
                        return false;
                      }

                });
                return flag;
            }
        }
        return false;
    })
    return result;
}
const perm = {
    state: {
        routers: routes,
        addRouters: [],
        perms: false,//判断是否刷新过页面,
        permsList: null,
    },
    mutations: {

        SET_ROUTERS: (state, obj) => {
            state.routers = routes.concat(obj.asRouters);//设置路由表
            state.addRouters = obj.asRouters;//动态路由表
            state.perms = true;//登录状态
            state.permsList = obj.permsList;//权限字符串  

        },
        CLEAR_ROUTERS: (state) => {
            state.routers = routes;
            state.addRouters = [];
            state.perms = false;
            state.permsList = null;
            localStorage.setItem('sessionKey','');
            localStorage.setItem('userName','');
            window.location.reload();//此处退出vuex状态不刷新，目前发现重载页面可以处理。。
        }
    },
    actions: {
        setRouters({ commit }) {
            return new Promise((resolve, reject) => {//动态加载路由权限
                $http.post(api.getPerms)
                    .then(res => {
                        console.log("权限获取",res)
                        let asRouters;
                        if (res.body.perms == '*') {
                            asRouters = ansycRoutes;
                        } else {
                            asRouters = getansycRoutes(ansycRoutes,res.body.perms);//递归过滤
                        }
                        commit('SET_ROUTERS', {
                            asRouters: asRouters,
                            permsList: res.body.perms,
                            baseUrl:res.body.url
                        });
                        resolve(res);
                    }).catch(error => {
                        reject(error);
                    })
            })
        },
        loginOut({ commit }) {
            return new Promise((resolve, reject) => {
                $http.post(api.loginOut).then(res=>{
                    if(res.code=='200'){
                        commit('CLEAR_ROUTERS');
                    } 
                    resolve(res);
                }).catch(error=>{
                    reject(error);
                })     
            })
        }
    }

}

export default perm