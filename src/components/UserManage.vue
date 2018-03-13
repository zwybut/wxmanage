<template>
	<main class="	main">
		<h2>管理员信息管理</h2>
		<div class="l table">
		<el-table
			:data="tableData"
			style="width: 100%"
			stripe
			:height="clientHeight"
			v-loading="tableloading"
			element-loading-text="拼命加载中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(255, 255, 255, 1)"
	      >
	      <el-table-column
	        prop="realName"
	        label="用户名"
	       	align="center">
	      </el-table-column>
	      <el-table-column
	        prop="ssdw"
	        label="所属单位"
	        align="center">
	      </el-table-column>
	      <el-table-column
	        prop="phone"
	        label="办公电话"
	        align="center">
	      </el-table-column>
	      <el-table-column
	        prop="cellphone"
	        label="手机号码"
	        align="center">
	      </el-table-column>
	      <el-table-column
	        prop="jurisdiction"
	        label="管辖区域"
	        align="center">
	      </el-table-column>
	      <el-table-column
	        prop="loginTime"
	        label="最近登陆时间"
					sortable
	        align="center">
	      </el-table-column>
	      	<el-table-column
		      prop="state"
		      label="账户启用"
		      align="center" 
					width="100"
		      >
	       <template slot-scope="scope">
		        <el-checkbox v-model='scope.row.state' @change="checkChange(scope) " class="myFlood"></el-checkbox>
		     </template>
	      </el-table-column>	     
	      <el-table-column
	        prop="options"
	        label="操作"
	        align="center"
					width="140">
	          <template slot-scope="scope">
		        <el-button type="text" size="small" @click="optionRow(scope)">修改</el-button>
						<el-button type="text" size="small" @click="passwordReset(scope)">密码重置</el-button>
		      </template>
	      </el-table-column>
	    </el-table>
		</div>
	  <el-dialog title="修改用户" :visible.sync="option" width="550px">
			<el-form :model="optionForm" class="optionForm clear">
				<el-form-item label="用户名" :label-width="formLabelWidth" size="small">
					<el-input v-model="optionForm.realName" size="small"></el-input>
				</el-form-item>
				<el-form-item label="所属单位" :label-width="formLabelWidth" size="small">
					<el-input v-model="optionForm.ssdw" size="small" ></el-input>
				</el-form-item>
				<el-form-item label="办公电话" :label-width="formLabelWidth" size="small">
					<el-input v-model="optionForm.phone" size="small" ></el-input>
				</el-form-item>
				<el-form-item label="手机号码" :label-width="formLabelWidth" size="small">
					<el-input v-model="optionForm.cellPhone" size="small" ></el-input>
				</el-form-item>
				<el-form-item label="管辖地区" :label-width="formLabelWidth" size="small">
					<el-input v-model="optionForm.jurisdiction" size="small" ></el-input>
				</el-form-item>
				<!-- <el-form-item label="用户密码" :label-width="formLabelWidth" size="small">
					<el-input v-model="optionForm.password" size="small" ></el-input>
				</el-form-item> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="sureOption" size="small" class="buttons sureBtn">确 定</el-button>
				<el-button @click="cancleOption" size="small" class="buttons">取 消</el-button>
			</div>
		</el-dialog>
		<el-dialog title="重置密码" :visible.sync="pswReset" width="350px" >
			<el-form :model="optionForm" class="optionForm clear">
				<el-form-item label="用户名" :label-width="formLabelWidth" size="small">
					<el-input v-model="optionForm.userName" size="small" disabled>{{}}</el-input>
				</el-form-item>
			</el-form>
			
			<p style="text-align:center;">此操作将重置该用户密码，是否确定?</p>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="sureReset" size="small" class="buttons sureBtn">确 定</el-button>
				<el-button @click="cancleOption" size="small" class="buttons">取 消</el-button>
			</div>
		</el-dialog>
	</main>

</template>

<script>
import qs from 'qs'
	export default{
  name: 'UserManage',
  data () {
    return {
      tableData: [],							//用户数据
			clientHeight: 0,						//table可视区高度
			tableloading: false,
			option: false,							//设置弹窗显示控制
			pswReset: false,
			formLabelWidth: '72px',			//表单label宽度统一
			optionForm: {								//设置弹窗数据
      	realName: '',
        ssdw: '',
        phone: '',
				cellPhone: '',
				jurisdiction: '',
				password: '',
				addvcd: '',
				userName:''
			},
			userName:''
    }
  },
  methods: {
    checkChange (scope) {						//账户是否启用
			let userName = scope.row.userName
			let state = scope.row.state === true?1:0
			this.$http.put(this.baseUrl + 'userManage/user/'+userName, qs.stringify({state:state}))
      .then((res) => {
				if(res.data.code === 0){
					if(state){
						this.$message({
							type: 'success',
							message: '账户已启用!'
						})
					}else{
						this.$message({
							type: 'info',
							message: '账户已停用!'
						})
					}
				}
      }).catch(function (err) {
        console.log(err)
      })
    },
    activeMenu () {									//设置header默认选中为用户管理
      this.$store.commit('activeMenu', '8')
    },
    getTableInfo () {								//获取用户列表
			this.tableloading = true
      this.$http.get(this.baseUrl + 'userManage/user', qs.stringify({}))
      .then(res => {
        if (res.data.code === 0) {
          let data = res.data.data
					console.log(data)
          let tableData = []
          for (var i=0;i < data.length; i++) {
            let obj = data[i]
            obj.realName = data[i].realname == null||''?'-':data[i].realname
            obj.ssdw = data[i].ssdw == null?'-':data[i].ssdw
            obj.phone = data[i].phone == null?'-':data[i].phone
            obj.cellphone = data[i].cellphone == null?'-':data[i].cellphone
            obj.loginTime = this.timeTrans(data[i].loginTm)
            obj.jurisdiction = data[i].addvnm
            obj.state = data[i].state === 1?true:false
            tableData.push(obj)
          }
					this.tableData = tableData
					this.tableloading = false
        }	
      }).catch(function (err) {
				console.log(err)
      })
    },
		getClientHeight () {								//获取tablek可视区高度
			this.clientHeight = this.getClientAtBegin()
		},
		sureReset () {
			this.$http.post(this.baseUrl + 'userManage/user/'+this.optionForm.userName, qs.stringify({}))
      .then((res) => {
				console.log(res)
				if(res.data.code == 0){
					this.$message({
						type: 'success',
						message: '重置成功!'
					})
					this.cancleOption()
				}else{
					this.$message({
						type: 'info',
						message: '重置失败!权限不足'
					})
				}
				
      }).catch((err) => {
				console.log(err)
				this.$message({
					type: 'info',
					message: '重置失败!'
				})
      })
		},
		passwordReset (scope) {
			this.pswReset = true
			console.log(scope)
			this.optionForm = scope.row
		},
		optionRow (scope) {									//用户修改弹窗内容
			this.option = true
			console.log(scope)
			this.optionForm = scope.row
		},
  	sureOption () {											//用户修改提交
			let userName = this.optionForm.userName
			console.log(this.optionForm)
			this.$http.put(this.baseUrl + 'userManage/user/'+userName, qs.stringify({
				realName:this.optionForm.realName,
				ssdw:this.optionForm.ssdw,
				phone:this.optionForm.phone,
				cellPhone:this.optionForm.cellPhone,
				addvnm:this.optionForm.jurisdiction,
			}))
      .then((res) => {
				console.log(res)
				this.getTableInfo()								//刷新用户列表内容
				this.option = false
				this.$message({
					type: 'success',
					message: '修改成功!'
				})
      }).catch((err) => {
				console.log(err)
				this.$message({
					type: 'info',
					message: '修改失败!'
				})
      })
		},
  	cancleOption () {										//取消修改
			this.option = false
			this.pswReset = false
		}
  },
  created: function () {
    this.activeMenu()
		this.getTableInfo()
		this.getClientHeight()
  }
}
</script>
	
<style scoped>
	.table{
		width:100%;
	}
	h2{
		margin-bottom:20px;
	}
	.buttons{
		width:110px;
	}
	.sureBtn{
		margin-right:20px;
	}
</style>