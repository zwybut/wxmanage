<template>
	<div class="login">
	<header>
		<div style="width:1366px;margin:0 auto;overflow:hidden"><img src="../assets/login.png" alt="" class="l logo"/>
		<h2 class="l title">微信报汛管理系统</h2>
		<p class='r clock'>
			<span>{{date}}</span>
			<span></span>
		</p></div>
	</header>
	<main class="middle clear">
		<div style="width:1366px;margin:0 auto;" class="clear">
		<img class='l' src="../assets/loginPic.png" style="margin-top:148px;margin-left:270px;height:290px;width:400px"/>
		<div class="loginBox r">
			<h3>用户登陆</h3>
			<el-form status-icon :model="numberValidateForm" ref="numberValidateForm" label-width="0" class="demo-ruleForm" :rules="rules">
			  <el-form-item
        prop="userName">
			    <!-- <el-input type="userName" v-model="numberValidateForm.userName" auto-complete="off" placeholder='请输入账号'></el-input> -->
          <el-cascader
            expand-trigger="hover"
            :options="areaChoose"
             v-model="numberValidateForm.userName"
            size="small"
            class="username"
            placeholder="请选择账号">
          </el-cascader>
			  </el-form-item>
			  <el-form-item
			    prop="passWord">
			    <el-input type="password" v-model="numberValidateForm.passWord" auto-complete="off" placeholder='请输入密码'></el-input>
			  </el-form-item>
			  <el-form-item
			    prop="code">
			    <el-input type="text" v-model.number="numberValidateForm.code" auto-complete="off" class="code" placeholder='请输入验证码'></el-input>
			    <img v-bind:src="codeSrc" alt="" style="border:1px solid #e6e6e6;width:102px;height:38px;cursor:pointer" class="r" @click="codeChange"/>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('numberValidateForm')">登陆</el-button>
			  </el-form-item>
			</el-form>
		</div>
		</div>
	</main>
	<footer>
		<p>版权所有 微信管理系统 ©Copyright 2003-2018. All Rights Reserved.</p>
		<p>浙ICP备15010216号-1</p>
	</footer>
	</div>
</template>

<script>
import qs from 'qs'
export default{
  name: 'login',
  data () {
    var code = (rule, value, callback) => {
      if (this.passIf === '验证码错误') {
        callback(new Error('验证码错误'))
        this.passIf = ''
      } else if (value === '') {
        callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    var userName = (rule, value, callback) => {
      if (this.passIf === '用户不存在') {
        callback(new Error('用户不存在'))
        this.passIf = ''
      } else if (value.length == 0) {
        callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    var passWord = (rule, value, callback) => {
      if (this.passIf === '密码错误') {
        callback(new Error('密码错误'))
        this.passIf = ''
      } else if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      date: '',
      time: '',
      areaChoose:[],
      numberValidateForm: {
        userName: [],
        passWord: '',
        code: ''
      },
      rules: {
        userName: [
          {validator: userName, required: true}
        ],
        passWord: [
          {validator: passWord, required: true}
        ],
        code: [
          {validator: code, required: true}
        ]
      },
      codeSrc: '',
      passIf: ''
    }
  },
  methods: {
    postData () {									//获取地区信息
      this.$http.get(this.notAuthUrl + 'util/addvcdTree', qs.stringify({}))
      .then((res) => {
        this.areaChoose = res.data.data
        console.log(res)
        this.areaChoose.unshift({'label':'浙江省','value':'330000'})
      }).catch((err) => {
        console.log(err)
      })
    },
    codeChange () {
      console.log(this.$store.state.baseJson)
      this.codeSrc = this.notAuthUrl + 'util/code?tm=' + new Date().getTime()
    },
    getTime () {
      let todayDate = new Date()
      let dateyear = todayDate.getFullYear()
      let datemonth = todayDate.getMonth() + 1 >= 10 ? todayDate.getMonth() + 1 : '0' + (todayDate.getMonth() + 1)
      let datedate = todayDate.getDate() >= 10 ? todayDate.getDate() : '0' + todayDate.getDate()
      let datehour = todayDate.getHours() >= 10 ? todayDate.getHours() : '0' + todayDate.getHours()
      let getminute = todayDate.getMinutes() >= 10 ? todayDate.getMinutes() : '0' + todayDate.getMinutes()
      let getsecond = todayDate.getSeconds() >= 10 ? todayDate.getSeconds() : '0' + todayDate.getSeconds()
      let dateweek
      switch (todayDate.getDay()) {
        case 0:dateweek = '星期日'
          break
        case 1:dateweek = '星期一'
          break
        case 2:dateweek = '星期二'
          break
        case 3:dateweek = '星期三'
          break
        case 4:dateweek = '星期四'
          break
        case 5:dateweek = '星期五'
          break
        case 6:dateweek = '星期六'
          break
      }
      console.log(datemonth)
      let str = dateyear + '年' + datemonth + '月' + datedate + '日 ' + dateweek
      let str1 = datehour + ':' + getminute + ':' + getsecond
      this.date = str
      this.time = str1
    },
    setTime () {
      setInterval(this.getTime, 1000)
    },
    headerHide () {
      this.$store.commit('show', false)
    },
    submitForm (formName) {
      this.passIf = ''
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let userName = ''
          if(this.numberValidateForm.userName[1]){
            userName = this.numberValidateForm.userName[1]
          }
          else{
            if(this.numberValidateForm.userName[0]){
              userName = this.numberValidateForm.userName[0]
            }
            else return
          }
            console.log(userName)
          this.$http.post(this.notAuthUrl + 'util/'+userName+'/login/'+this.numberValidateForm.code, qs.stringify({password: this.$sha1(this.numberValidateForm.passWord)}))
          .then( (res)=> {
            let code = res.data.code
            console.log(res)
            if (code === 0) {
              this.$router.push('/home')
              this.$store.commit('show', true)
              this.$store.commit('loginName', this.numberValidateForm.userName)
              let sStorage = window.sessionStorage
              sStorage['loginName'] = userName
            } else {
              if (code === -2) {
                this.passIf = '验证码错误'
                this.numberValidateForm.code = ''
              } else if (code === -4) {
                this.passIf = '用户不存在'
                this.numberValidateForm.userName = []
                this.numberValidateForm.code = ''
              } else if (code === -5) {
                this.passIf = '密码错误'
                this.numberValidateForm.passWord = ''
                this.numberValidateForm.code = ''
              }
              this.codeChange()
            }
          }).catch( (err)=> {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    userOff () {								//用户注销
      this.$http.post(this.baseUrl + 'userManage/logout',{})
        .then((res) => {
          console.log(res)
          let sStorage = window.sessionStorage		//清除sessionStorage中的用户名
          sStorage.clear()
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  mounted: function () {
    // this.userOff()
    this.postData()
    this.getTime()
    // this.setTime()
    let sStorage = window.sessionStorage					//清除sessionStorage中的用户名
    sStorage.clear()
    this.codeChange()
  }
}
</script>

<style scoped>
.username{
  width:100%;
}
.login{
	width:100%;
	height:100%;
	background:#f5f5f5;
}
header{
	height:60px;
	background:#fff;
}
.middle{
	height:calc(100% - 60px - 50px - 35px);
}
footer{
	height:50px;
	background:#fff;
	padding-top:35px;
}
footer p{
	text-align:center;
	line-height:20px;
	margin:0;
}
.logo{
   margin-left:180px;
}
.title{
	margin-left:5px;
	line-height:30px;
	margin-top:15px;
  width:200px;
}
.clock{
	display: block;
	line-height:24px;
	font-size:12px;
	width:200px;
	margin:0 180px 0 0;
}
.clock span{
	display:block;
	text-align: right;
	margin-top:20px;
}
.loginBox{
	width:calc(315px - 66px);
	height:345px;
	background:#fff;
	margin-top:126px;
	padding:0 33px;
	border:1px solid #e6e6e6;
	margin-right:180px;
}
.code{
	width:130px;
}
.el-button{
	width:100%;
	margin-top:20px;
	background:#176ad4;
}
</style>
