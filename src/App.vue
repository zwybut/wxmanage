<template>
  <div id="app">
	<router-view/>
  </div>
  </template>
<script>
	import Vue from 'vue'
	import Element from 'element-ui'
	import qs from 'qs'
	Vue.use(Element)
export default {
	name: 'app',
	methods:{
	myBrowser(){
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
		var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器  
		var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器  
		var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器  
		var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器  
		var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器  
		var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器  
		if (!isChrome) {

			this.$alert('检测到您的浏览器版本存在兼容问题，请用Chrome浏览器打开。', '浏览器版本检测', {
				confirmButtonText: '确定',
				callback: action => {
					// this.$message({
					// type: 'info',
					// message: `action: ${ action }`
					// })
				}
			})
		}  
	},

	},
	mounted (){
		this.myBrowser()
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
