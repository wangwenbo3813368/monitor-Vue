import axios from "axios";
export default {
    data() {
        return {
            loading: true,//遮罩
            id: this.$route.query.id,//id
            type: this.$route.query.type,//操作类型
            dataInfo: {},//基础表单信息
            form: this.$refs['form']//
        }
    },
    methods: {
        /**
         * 获取数据方法
         * @param {number} id 
         * @param {object} obj 
         */
 
        /**
         * @param {booealn} state 是否继续添加
         * @param {string} url 添加方法的api地址 
         * @param {object} params 添加的参数
         * @param {string} dialog 需要关闭的弹出窗
         * @param {string} backUrl ，返回列表的路由地址
         * @param {string} sync ，异步响应 前端操作后 页面直接响应 ，后端返回结果成功 什么都不做，失败则做相关处理
         * 
         * @for  reset是异步页面中用于补偿下一步操作依赖上一步 refresh是异步页面中出现后台失败或者错误用于刷新页面
         */
        saveDataInfo(state, url, params, dialog,backUrl,sync) {
            this.loading = true;
            if(sync==true){
                this.loading = false;
                this[dialog] =false;
            }
            axios.post(url, params)
                .then(res => {
                    console.log("res:",res);
                    if (res.status == true) {
                        if(sync!=true){
                          this.successMessage('操作成功');
                        }
                        if (state){
                            if(dialog!=""){
                                this[dialog] =false;
                            }
                            this.reset(res.data);
                        } else {
                           if(backUrl!=null&&backUrl!=""){
                                setTimeout(() => {
                                    this.routerLink(backUrl);
                                }, 1000);
                           }
                        }
                    }else{
                        this.errorMessage('操作失败');
                        if(this.refresh instanceof 'function'){
                            this.refresh();
                        }
                    }
                    this.loading = false;
                }).catch(error => {
                     console.log("error:",error);
                     this.errorMessage('操作失败,请检查登录是否失效')
                     if(this.refresh instanceof Function){
                        this.refresh();
                     }
                     this.loading = false; })
        },
        /**
         * 
         * @param {string} type 判断添加还是修改 save，update 
         */
        isType(type) {
            return this.type == type ? true : false;
        }
    }

}