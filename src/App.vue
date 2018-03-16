<template>
  <div id="app">
    <!-- 头部导航 -->
    <header class="header" v-if="showHeader()">
    	<img class="logo l" src="./assets/wx_logo.png"/>
    	<span id="" class="sysTitle l" >微信报汛管理系统</span>
    <el-menu
		  class="el-menu-demo l"
		  mode="horizontal"
		  background-color="#1670e0"
		  text-color="#fff"
		  active-background-color="#0c58b6"
		  active-text-color="#fff"
		  :default-active="activeMenu"
		  >
		  <el-menu-item index="1"><router-link to="/FloodReportUser">报汛用户管理</router-link></el-menu-item>
		  <el-menu-item index="2"><router-link to="/SiteManage">用户站点绑定</router-link></el-menu-item>
		  <el-menu-item index="3"><router-link to="/SiteInfo">站点配置</router-link></el-menu-item>
		  <el-menu-item index="4"><router-link to="/FloodReportSearch">原报文查询</router-link></el-menu-item>
			<el-menu-item index="6"><router-link to="/DistributeManage">分发管理</router-link></el-menu-item>
		  <!-- <el-menu-item index="7"><router-link to="/OperationLog">用户日志查询</router-link></el-menu-item> -->
		  <el-menu-item index="8"><router-link to="/UserManage">管理员信息管理</router-link></el-menu-item>
			<el-menu-item index="9"><router-link to="/MenuManage">公众号菜单配置</router-link></el-menu-item>
		</el-menu>
		<span class="userImage r"></span>
		<el-dropdown class="r" @command='handleCommand'>
		  <span class="el-dropdown-link">
		    <i class="el-icon-arrow-down el-icon--left"></i>欢迎您，{{showLoginName()}}
		  </span>
		  <el-dropdown-menu slot="dropdown">
				<el-dropdown-item command='xg'>修改密码</el-dropdown-item>
		    <el-dropdown-item command='zx'>用户注销</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
    </header>
		<el-dialog title="用户密码修改" :visible.sync="dialogFormVisible" id="passwordChange" width="500px">
			<el-form :model="form" :rules="rules" ref="form">
				<el-form-item label="用户名" :label-width="formLabelWidth">
					<el-input type="text" v-model="form.userName" auto-complete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldPassworld">
					<el-input type="password" v-model="form.oldPassworld" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassworld_1">
					<el-input type="password" v-model="form.newPassworld_1" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码" :label-width="formLabelWidth" prop="newPassworld_2">
					<el-input type="password" v-model="form.newPassworld_2" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('form')" size="small">重置</el-button>
				<el-button type="primary" @click="submitForm('form')" size="small" class='buttons'>确 定</el-button>
				<el-button @click="dialogFormVisible = false" size="small" class='buttons'>取 消</el-button>
				
			</div>
		</el-dialog>
    <main >
    	<router-view></router-view>
    </main>

		
  </div>
  </template>
<script>
	import Vue from 'vue'
	import Element from 'element-ui'
	import qs from 'qs'
	Vue.use(Element)
export default {
	name: 'app',
	data () {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'))
			} else {
				callback()
			}
		};
		var validatePass1 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'))
			}else {
				if (this.form.newPassworld_2 !== '') {
					this.$refs.form.validateField('newPassworld_2')
				}
				callback()
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'))
			} else if (value !== this.form.newPassworld_1) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		};
    return {
			activeMenu: '1',           //设置header默认选中为报汛用户查询
			dialogFormVisible: false,
			form: {
					userName:'',
					oldPassworld:'',
					newPassworld_1:'',
					newPassworld_2:''
        },
			formLabelWidth: '80px',
			rules: {
				oldPassworld: [
					{ validator: validatePass, trigger: 'blur' }
				],
				newPassworld_1: [
					{ validator: validatePass1, trigger: 'blur' }
				],
				newPassworld_2: [
					{ validator: validatePass2, trigger: 'blur' }
				]
			}
		}
	},
	computed: {
		active() {                 //activeMenu
			return this.$store.state.activeMenu
		}
	},
	watch: {
		dialogFormVisible(val){
			if(!val){
				this.resetForm('form')
			}
		},
		active(val){                 //监听
			if (val) {
				console.log(val)
				this.setActiveMenu()      
			}
		}
	},
  methods: {
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		submitForm(formName) {
			
			this.$refs[formName].validate((valid) => {
				if (valid) {				
					this.$http.post(this.baseUrl + 'userManage/user/' + this.form.userName, qs.stringify({password:this.$sha1(this.form.oldPassworld),newPassword:this.$sha1(this.form.newPassworld_2)}))
					.then((res) => {
						console.log(res)
						if(res.data.code == 0){
							this.$message({
								type: 'success',
								message: '修改成功!'
							})
							this.dialogFormVisible = false
						}else if(res.data.code == -5){
							this.$message({
								type: 'info',
								message: '密码错误请重试!'
							})
						}else{
							this.$message({
								type: 'info',
								message: '修改失败!'
							})
						}
					}).catch((err) => {
						console.log(err)
					})
				} else {
					this.$message({
						type: 'info',
						message: '新密码不一致!'
					})
					return false
				}
			});
		},
    showHeader () {							//控制header是否显示
      return this.$store.state.show
    },
    showLoginName () {					//显示登陆名
      let sStorage = window.sessionStorage			//从sessionStorage获取用户登陆名
      return sStorage['loginName']
		},
		handleCommand(command){
			if(command == 'zx'){
				this.userOff()
			}else if(command == 'xg'){
				this.dialogFormVisible = true
				let sStorage = window.sessionStorage
			if (sStorage['loginName']) {							//存在，将store中的show置为true
				this.form.userName = sStorage['loginName']
      } else {																//不存在，跳转至登陆页面
        this.$router.push('/Login')
      }
				
			}
		},
    userOff () {								//用户注销
	  this.$http.post(this.baseUrl + 'userManage/logout',{})
      .then((res) => {
		console.log(res)
		this.$router.push('/Login')
		this.$store.commit('show', false)
		let sStorage = window.sessionStorage		//清除sessionStorage中的用户名
		sStorage.clear()
      }).catch((err) => {
        console.log(err)
      })

    },
    getStorage () {										//获取sessionStorage中的用户名
      let sStorage = window.sessionStorage
      if (sStorage['loginName']) {							//存在，将store中的show置为true
        this.$store.commit('show', true)
      } else {																//不存在，跳转至登陆页面
        this.$router.push('/Login')
      }
		},
		setActiveMenu () {							//设置header默认选中为store中的activeMenu对应的页面
			this.activeMenu = this.$store.state.activeMenu
		}
  },
  mounted: function () {
		this.setActiveMenu()
    this.getStorage()
  }
}
</script>
<style>
	html,body{
		margin:0;
		width:100%;
		height:100%;
		font-size:12px;
		color:#000;
		overflow:hidden;
	}
	#app{
		height:100%;
		position:relative;
	}
	main{
		height:calc(100% - 60px)
	}
	h2{
		color:#000;
		margin:0;
		width:200px !important;
	}
	a{
		text-decoration: none;
	}
	b,i{
		font-style:normal;
		font-size:12px;
	}
	ul,li{
		list-style: none;
	}
	.l{
		float:left;
	}
	.r{
		float:right;
	}
	.clear{
		overflow:hidden;
		clear:both;
	}
	.header{
		height:60px;
		background:#1670e0;
		color:#fff;
	}
	.logo{
		width:34px;
		height:27px;
		margin-top:16px;
		margin-left:39px;
	}
	.sysTitle{
		font-size:16px;
		line-height:60px;
		margin-left:8px;
		color:#fff;
		margin-right:38px;
	}
	.el-menu--horizontal>.el-menu-item{
		/* width:96px !important; */
		padding:0 14px;
		text-align: center;
		border:0 !important;
	}
	.distribute_menu>.el-menu-item{
		/* width:96px !important; */
		padding-left:60px !important;
	}
	.el-menu--horizontal>.el-menu-item.is-active{
		background:#0c58b6 !important;
	}
	.el-submenu__title{
		height:40px !important;
		line-height:40px !important;
	}
	#app .el-dropdown{
		margin-top:20px;
		margin-right:8px;
		color:#fff;
	}
	.el-menu-item a{
		display:block;
		height:60px;
		width:100%;
		text-decoration: none;
	}
	.userImage{
		width:24px;
		height:24px;
		display:block;
		border-radius:50%;
		background:#fff;
		margin-right:39px;
		margin-top:18px;
	}
	.main{
		margin:30px;
		margin-bottom:0;
	}
	.el-input .el-input__inner,.el-checkbox .el-checkbox__inner,.el-textarea .el-textarea__inner, .el-button {
			border-radius: 0;
	}
	.el-input__inner{
		height:32px !important;
	}
	.el-select__tags{
		margin-top:2px;
	}
	.el-table .stop-cell {
		color:#efae22;
	}
	.el-table .success-cell {
		color:#459b20;
	}
	.el-table .no-cell {
		color:#808080;
	}
	.el-table .fail-cell {
		color: red;
	}
	.el-table__body-wrapper {
		overflow-x:hidden;
	}
	.el-table__row td{
		padding:6px 0;
	}
	.optionForm .el-form-item{
		float:left;
	}
	.optionForm .el-input {
		width:174px;
		margin-right:9px;
	}
	.el-breadcrumb__inner, .el-breadcrumb__inner a{
		font-weight:400;
		color:#000;
	}
	.el-tree-node__content{
		height:40px;
	}
	.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
		background-color:rgba(24,119,237,1);
		color:#fff;
	}
	.el-tree-node__label{
		font-size:12px;
	}
	.el-dialog__title,.el-message-box__title{
		font-size:14px;
	}
	.el-dialog__header{
		padding: 8px 15px 8px 15px;
		border-bottom:1px solid #e6e6e6;
		background:#fafafa;
		margin-bottom:20px;
	}
	.el-dialog__headerbtn,.el-message-box__headerbtn{
		top: 11px;
		right: 10px;
	}
	.el-dialog__body{
		padding:0 20px;
	}
	.el-dialog__body .el-form-item{
		margin-bottom:10px;
	}
	.el-dialog__footer{
		padding:10px 20px 20px;
	}
	.el-message-box__status.el-icon-warning {
		color: #F6536E;
		font-size: 35px!important;
	}
	.el-message-box__message{
		margin-left:10px;
	}
	.el-message-box {
		border-radius: 0px;
	}
	.el-message-box__header{
		padding: 12px 15px;
		border-bottom:1px solid #e6e6e6;
		background:#fafafa;
		margin-bottom:20px;
	}
	.el-message-box__content{
		margin-bottom:10px;
	}
	.el-message-box__btns .el-button{
		width:110px;
	}
	.el-form{
		font-size:12px;
	}
	.el-form-item{
		height:32px;
	}
	.el-form-item.textArea{
		height:50px;
	}
	.el-form-item__label{
		font-size:12px;
	}
	.el-select{
		height:29px;
	}
	.el-input--small {
    font-size: 13px;
	}
	.el-popover{
		min-width:0;
		padding:0;
	}
	.el-button+.el-button {
    margin-left: 0px;
	}
	.el-submenu .el-menu-item{
		height:66px !important;
		line-height: 66px;
		padding:0;
	}
	.el-tooltip__popper{
		max-width:400px !important;
		line-height:18px;
		letter-spacing:1px;
	}
	.el-submenu__title{
		border-bottom:1px solid #e6e6e6;
		overflow:hidden;
	}
	.el-menu-item.unitList{
		border-bottom:1px solid #e6e6e6;
	}
	.el-submenu.is-active .el-submenu__title {
    border-bottom-color: #e6e6e6;
	}
	.el-picker-panel .el-picker-panel__link-btn{
		margin-left:20px;
	}
  .el-loading-mask{
    z-index:1000;
  }
	div::-webkit-scrollbar,ul::-webkit-scrollbar{  
        width:6px;  
        height:4px;  
	}  
	div::-webkit-scrollbar-track,ul::-webkit-scrollbar-track{  
			background: #f6f6f6;  
			border-radius:2px;  
	}  
	div::-webkit-scrollbar-thumb,ul::-webkit-scrollbar-thumb{  
			background: #aaa;  
			border-radius:2px;  
	}  
	div::-webkit-scrollbar-thumb:hover,ul::-webkit-scrollbar-thumb:hover{  
			background: #747474;  
	}  
	div::-webkit-scrollbar-corner,ul::-webkit-scrollbar-corner{  
			background: #f6f6f6;  
	}  
	#passwordChange .el-form-item{
		margin-bottom:20px;
	}
	#passwordChange .el-form-item__error{
		padding-top:0;
	}
	.distribute_menu .el-submenu__title{
		background:#f1f1f1;
	}
</style>
