import Vue from 'vue'
import Vuex from 'vuex'
import sys from './system'
import user from './user'
import perms from './perms'
import view from './view'
Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        sys,
        user,
        perms,
        view       
    }
})

export default store