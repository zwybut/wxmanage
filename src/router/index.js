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
import BasicInfo from '@/components/SiteInfo/BasicInfo'
import FloodProjectCustom from '@/components/SiteInfo/FloodProjectCustom'
import FloodNumOption from '@/components/SiteInfo/FloodNumOption'
import DistributeManage from '@/components/DistributeManage'
import MenuManage from '@/components/MenuManage'
Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [{
        path: '/DataSearch',
        name: 'DataSearch',
        component: DataSearch
    }, {
        path: '/FloodReportSearch',
        name: 'FloodReportSearch',
        component: FloodReportSearch
    }, {
        path: '/FloodReportUser',
        name: 'FloodReportUser',
        meta: {
            requireAuth: true
        },
        component: FloodReportUser
    }, {
        path: '/',
        component: Login
    }, {
        path: '/Login',
        name: 'Login',
        component: Login
    }, {
        path: '/OperationLog',
        name: 'OperationLog',
        component: OperationLog
    }, {
        path: '/SiteInfo',
        name: 'SiteInfo',
        component: SiteInfo,
        children: [{
            path: 'BasicInfo',
            name: 'BasicInfo',
            component: BasicInfo
        }, {
            path: 'FloodProjectCustom',
            name: 'FloodProjectCustom',
            component: FloodProjectCustom
        }, {
            path: 'FloodNumOption',
            name: 'FloodNumOption',
            component: FloodNumOption
        }]
    }, {
        path: '/SiteManage',
        name: 'SiteManage',
        component: SiteManage
    }, {
        path: '/DistributeManage',
        name: 'DistributeManage',
        component: DistributeManage
    }, {
        path: '/UserManage',
        name: 'UserManage',
        component: UserManage
    }, {
        path: '/MenuManage',
        name: 'MenuManage',
        component: MenuManage
    }]
})