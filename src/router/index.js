import Vue from 'vue'
import Router from 'vue-router'
import DataSearch from '@/components/DataSearch'
import FloodReportSearch from '@/components/FloodReportSearch'
import FloodReportUser from '@/components/FloodReportUser'
import Login from '@/components/Login'
import OperationLog from '@/components/OperationLog'
import SiteInfo from '@/components/SiteInfo'
import SiteManage from '@/components/SiteManage'
import UserManage from '@/components/UserManage'
import Home from '@/components/home'
import BasicInfo from '@/components/SiteInfo/BasicInfo'
import FloodProjectCustom from '@/components/SiteInfo/FloodProjectCustom'
import FloodNumOption from '@/components/SiteInfo/FloodNumOption'
import DistributeManage from '@/components/DistributeManage'
import MenuManage from '@/components/MenuManage'
Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [{
        path: '/',
        component: Login
    }, {
        path: '/Login',
        component: Login
    }, {
        path: '/home',
        component: Home,
        children: [{
            path: '/',
            component: FloodReportUser
        }, {
            path: '/DataSearch',
            component: DataSearch
        }, {
            path: '/FloodReportSearch',
            component: FloodReportSearch
        }, {
            path: '/FloodReportUser',
            meta: {
                requireAuth: true
            },
            component: FloodReportUser
        }, {
            path: '/OperationLog',
            component: OperationLog
        }, {
            path: '/SiteInfo',
            component: SiteInfo,
            children: [{
                path: 'BasicInfo',
                component: BasicInfo
            }, {
                path: 'FloodProjectCustom',
                component: FloodProjectCustom
            }, {
                path: 'FloodNumOption',
                component: FloodNumOption
            }]
        }, {
            path: '/SiteManage',
            component: SiteManage
        }, {
            path: '/DistributeManage',
            component: DistributeManage
        }, {
            path: '/UserManage',
            component: UserManage
        }, {
            path: '/MenuManage',
            component: MenuManage
        }]
    }]
})