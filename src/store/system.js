
import { setBaseUrl } from '@/config.js'
const systemConfig = {
    state: {
        collapse: false,
        pwdCollapse:false,
        asideWidth:165,
        headerHeight:40,
        hostContentWidthRate:1,
        clientWidth:document.body.clientWidth,
        clientHeight:document.body.clientHeight,
        theme:'black',
        baseUrl: setBaseUrl()

    },
    getters: {
        mainHeight: state => {
          return state.clientHeight- state.headerHeight;
        }
    },
    mutations: {
        CHANGE_SET: (state, value) => {
            if(value==undefined){
                state.collapse = !state.collapse;
            }else{
                state.collapse = value ? true : false;
            }
            var oldWidth = state.asideWidth==50?50:165;
            var newWidth = state.collapse?50:165;
            var i =1,walks=1;
            function walk(){       
                    if(i<=walks){
                        state.asideWidth  = oldWidth+ (newWidth-oldWidth)*(i++)/walks;
                        window.requestAnimationFrame(walk);
                    }
            }
            walk();
        },
        HostContentWidthRate_SET: (state, value) => {
            state.hostContentWidthRate = value;
        },
        THEME_SET: (state, value) => {
            state.theme = value;
        },
        RESIZE_SET: (state, value) => {
            state.clientWidth = value.clientWidth;
            state.clientHeight = value.clientHeight;
        },
        PWD_SET:(state,value)=>{
            state.pwdCollapse=value;    
        }    
    },
    actions: {
        setCollapse({ commit },value) {
            commit('CHANGE_SET',value);
        },
        setPwd({commit},value){
            commit('PWD_SET',value);
        },
        setHostContentWidthRate({commit},value){
            commit('HostContentWidthRate_SET',value);
        },
        setTheme({commit},value){
            commit('THEME_SET',value);
        },
        setResize({commit},value){
            commit('RESIZE_SET',value);
        },
    }
}

export default systemConfig