import appMain from "@/components/appMain.vue";

const dpComponents = {
    install: function (Vue) {
        Vue.component('appMain', appMain);        
    }
}

// 导出组件
export default dpComponents