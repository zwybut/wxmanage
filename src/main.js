// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import sha1 from 'js-sha1'
import { store } from './store/store'
import { config } from '../static/config.js'
import 'babel-polyfill'
import { utils } from './utils/index.js'
//将axios绑到原型上，方便继承
Vue.prototype.$http = axios
Vue.prototype.$sha1 = sha1
Vue.prototype.baseUrl = config.baseUrl
Vue.prototype.notAuthUrl = config.notAuthUrl
Vue.prototype.$utils = utils
    //以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false
    //解决ajax跨域请求
axios.defaults.withCredentials = true
    /* eslint-disable no-new */
    //时间格式转换函数
axios.interceptors.response.use((response) => {
    // token 已过期，重定向到登录页面  
    if (response.data.code == -4) {
        sessionStorage.clear()
        router.replace({
            path: '/Login',
            query: { redirect: router.currentRoute.fullPath }
        })
    }
    return response
}, (error) => {
    // Do something with response error  
    return Promise.reject(error)
})
Vue.prototype.timeTrans = (tm) => {
        let now = new Date(tm)
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        let date = now.getDate()
        let hour = now.getHours()
        let minute = now.getMinutes()
        let second = now.getSeconds()

        function andZero(tt) {
            if (tt < 10) {
                tt = '0' + tt
            }
            return tt
        }
        return year + "/" + andZero(month) + "/" + andZero(date) + " " + andZero(hour) + ":" + andZero(minute) + ":" + andZero(second)
    }
    //获取可视区高度函数
Vue.prototype.getClientAtBegin = () => {
    let height = document.body.clientHeight - 60 - 32 - 20 - 30 - 32 - 30 - 36
    return height
}
Vue.prototype.sttpTransform = (str) => {
    let sttp
    switch (str) {
        case 'PP':
            sttp = '雨量站'
            break;
        case 'RR':
            sttp = '水库站'
            break;
        case 'ZZ':
            sttp = '河道站'
            break;
        case 'DD':
            sttp = '闸坝站'
            break;
        case 'TT':
            sttp = '潮位站'
            break;
        case 'EE':
            sttp = '蒸发站'
            break;
        default:
            break;
    }
    return sttp
}
Vue.prototype.sttpTransformReturn = (str) => {
    let sttp
    switch (str) {
        case '雨量站':
            sttp = 'PP'
            break;
        case '水库站':
            sttp = 'RR'
            break;
        case '河道站':
            sttp = 'ZZ'
            break;
        case '闸坝站':
            sttp = 'DD'
            break;
        case '潮位站':
            sttp = 'TT'
            break;
        case '蒸发站':
            sttp = 'EE'
            break;
        default:
            break;
    }
    return sttp
}
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    template: '<App/>',
    components: { App }
})