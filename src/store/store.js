import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        addvcd: [], //地区列表
        show: false, //header显示控制
        loginName: '', //登陆用户名
        activeMenu: '1', //当前默认选中的页面
        siteStcd: '', //选中的站点stcd
        siteSttp: '' //选中的站点sttp
    },
    getters: {
        getUser: state => state.floodReportUser
    },
    mutations: {
        siteStcd: (state, siteStcd) => {
            state.siteStcd = siteStcd
        },
        siteSttp: (state, siteSttp) => {
            state.siteSttp = siteSttp
        },
        show: (state, show) => {
            state.show = show
        },
        loginName: (state, loginName) => {
            state.loginName = loginName
        },
        addvcd: (state, addvcd) => {
            state.addvcd = addvcd
        },
        activeMenu: (state, activeMenu) => {
            state.activeMenu = activeMenu
        }
    }
})