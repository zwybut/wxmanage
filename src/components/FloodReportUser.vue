<template>
	<main class='main'>
		<div class="l titleL"><h2>报汛用户管理</h2></div>
		<div class="r titleR">
			<el-cascader
		    expand-trigger="hover"
		    :options="areaChoose"
		    v-model="addvcd"
		    @change="change"
		     class="select l"
		     size="small"
		     clearable
		     placeholder="地区选择">
		  </el-cascader>
		  <el-select size="small" v-model="state" placeholder="用户状态" class='select l' @change="change" clearable>
		    <el-option
		      v-for="item in userStatus"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
		  <el-input size="small" class='phcd l' v-model="phcd" placeholder="请输入用户名/单位/手机号"></el-input>
		  <el-button class="searchBtn l" size="small" type="primary" @click='change'>查询</el-button>
		</div>
		<div class="l table">
			<el-table
			stripe
	      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
	      style="width: 100%"
				:cell-class-name="tableCellClassName"
				:height="clientHeight"
				v-loading="tableloading"
				element-loading-text="拼命加载中"
				element-loading-spinner="el-icon-loading"
				element-loading-background="rgba(255, 255, 255, 1)"
				>
	      <el-table-column
	        prop="realName"
	        label="用户名"
	       	align="center"
	       	width="120">
	      </el-table-column>
	      <el-table-column
	        prop="sex"
	        label="性别"
	        align="center"
	        width="80">
	      </el-table-column>
	      <el-table-column
	        prop="department"
	        label="所属单位"
	        align="center"
					:show-overflow-tooltip='trueBoolen'>
	      </el-table-column>
	      <el-table-column
	        prop="addvnm"
	        label="所在地区"
	        align="center">
	      </el-table-column>
	      <el-table-column
	        prop="cellPhone"
	        label="手机号码"
	        align="center">
	      </el-table-column>
	      <el-table-column
	        prop="tm"
	        label="注册时间"
					sortable
	        align="center"
	        width="200">
	      </el-table-column>
	      <el-table-column
	        prop="state"
					sortable
	        label="审核状态"
	        align="center">
					 <!-- <template slot-scope="scope">
						<span v-bind:style="{'color': fontColor(tableData[scope.$index].state)}">{{tableData[scope.$index].state}}</span>
					</template> -->
	      </el-table-column>
	      <el-table-column
	        prop="comment"
	        label="备注说明"
	        align="center">
	      </el-table-column>
	      <el-table-column
	        prop="options"
	        label="操作"
	        align="center">
	        <template slot-scope="scope">
		        <el-button type="text" size="small" @click="auditRow(scope)">{{scope.row.word}}</el-button>
		        <el-button type="text" size="small" @click="replyRow(scope)">回复</el-button>
						<el-button type="text" size="small" @click="optionRow(scope)">配置</el-button>
		        <el-button type="text" size="small" @click="deleteRow(scope)">删除</el-button>
		      </template>
	      </el-table-column>
	    </el-table>
		</div>
		<div class="block r">
	    <el-pagination
	      :page-sizes="[5, 10, 20, 50]"
	      :page-size="pagesize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="total"
	      :current-page="currentPage"
	      @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
	    </el-pagination>
	  </div>
	  <el-dialog title="审核" :visible.sync="audit" width="400px">
	  <el-form :model="auditForm">
	    <el-form-item label="报汛人员" :label-width="formLabelWidth">
	      <el-input v-model="auditForm.name" size="small" readonly></el-input>
	    </el-form-item>
	    <el-form-item label="审核状态" :label-width="formLabelWidth">
	       <el-select v-model="auditForm.status" placeholder="更改审核状态" size="small" style="width:100%;">
	        <el-option  label="审核不通过" value="-2"></el-option>
	        <el-option  label="审核通过" value="1"></el-option>
	      </el-select>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button type="primary" @click="sureReply" size="small" class="buttons">确 定</el-button>
	    <el-button @click="cancleReply" size="small" class="buttons">取 消</el-button>
	  </div>
	</el-dialog>
	  <el-dialog title="发送消息" :visible.sync="reply" width="550px">
	  <el-form :model="replyForm">
	    <el-form-item label="接收人员" :label-width="formLabelWidth">
	      <el-input v-model="replyForm.name" size="small" readonly></el-input>
	    </el-form-item>
	    <el-form-item label="消息内容" :label-width="formLabelWidth" style="height:54px">
	      <el-input v-model="replyForm.content" type="textarea" size="small" ></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button type="primary" @click="sureReply" size="small" class="buttons">确 定</el-button>
	    <el-button @click="cancleReply" size="small" class="buttons">取 消</el-button>
	  </div>
	</el-dialog>
	</main>
</template>
<script>
import qs from 'qs'
export default{
  name: 'FloodReportUser',
  data () {
    return {
      audit: false,				//控制审核弹出框显示隐藏
      reply: false,				//控制审核弹出框显示隐藏
      areaChoose: [],			//地区选择数据
      sixChoose: [{				//性别列表
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }],
      userStatus: [{			//审核状态列表
        value: 1,
        label: '启用'
      }, {
        value: 0,
        label: '未审核'
      }, {
        value: -1,
        label: '停用'
      }, {
        value: -2,
        label: '审核不通过'
      }],
      addvcd: [],					//地区选择数据
      sex: '',						//性别
      state: '',					//审核状态选则
      phcd: '',						//模糊查询
      tableData: [],			//table数据
      length: '',
      replyForm: {				//回复弹出窗对象
      	name: '',
        content: '',
        openId:'',
      },
      auditForm: {				//审核弹出框对象
      	name: '',
        status:'',				//审核状态
        openId:'',
        id: ''
      },
      formLabelWidth: '72px',	//弹出框表单label统一宽度
      total: 333,					//分页器显示总条数
      currentPage:1, 			//设置分页器默认显示第几页
      pagesize:20, 				//设置分页器默认每页显示数
			trueBoolen: true,		//为true的布尔值
			clientHeight: 0,		//table可视区高度
			tableloading:false	//table载入动画
    }
  },
  methods: {
		tableCellClassName({row, column, rowIndex, columnIndex}) {	//对用户状态进行分类添加不同classname
			if (columnIndex === 6) {
				if(row.state === '启用'){
					return 'success-cell'
				}else if(row.state === '停用'){
					return 'stop-cell'
				}else if(row.state === '未审核'){
					return 'no-cell'
				}else if(row.state === '审核未通过'){
					return 'fail-cell'
				}
				return ''
			}
    },
  	handleSizeChange (size) { 				//改变分页器每页显示数量
      this.pagesize = size
    },
    handleCurrentChange (currentPage){ 				//分页器换页
      this.currentPage = currentPage
    },
  	sureReply () {												//审核弹出框提交操作
			if (this.audit) {
				this.audit = false
				let state = this.auditForm.status
				let openId = this.auditForm.openId
				//let id = this.auditForm.id
				console.log(openId)
				this.$http.patch(this.baseUrl + 'WXUser/wxuser/' + openId, qs.stringify({state: state}))
				.then((res) => {
					console.log(res)
					if (res.data.code == 0) {
						this.change()
						this.$message({
							type: 'success',
							message: '审核已完成'
						})
					}else{
						this.$message({
							type: 'info',
							message: '操作失败'
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			}else{
				this.reply = false
				let openId = this.replyForm.openId
				let content = this.replyForm.content
				console.log(openId)
				this.$http.post(this.baseUrl+'WXUser/wxuser/' + openId, qs.stringify({'data': content}))
				.then((res) => {
					console.log(res)
					if (res.data.code === 0) {
						this.change()
						this.$message({
							type: 'success',
							message: '回复成功！'
						})
					}else{
						this.$message({
							type: 'info',
							message: '回复失败'
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			}
  	},
  	cancleReply () {										//弹出框取消按键操作
  	  this.reply = false
  	  this.audit = false
  	},
  	auditRow (scope) {									//三种按键分类（启用、停用、审核）
  	  this.auditForm.name = scope.row.realName
  	  this.auditForm.openId = scope.row.openId
  	  this.auditForm.id = scope.$index
			let sureMessage = ''
			let key = ''
			if (scope.row.state === '未审核'||scope.row.state === '审核未通过') {
				this.audit = true									//审核未通过或未审核显示审核弹出窗
				this.auditForm.status = ''
			}else {															//停用启用发起请求
				let state = ''
				if (scope.row.state === '停用'){
					state = 1
					sureMessage = '已启用该用户'
					key = '启用'
				}else {
					state = -1
					sureMessage = '已停用该用户'
					key = '停用'
				}
				this.$confirm('是否'+key+'该报汛用户?', '提示', { cancelButtonText: '取消', confirmButtonText: '确定', type: 'info'})
				.then(() => { //+scope.row.openId
				console.log(scope.row.openId)
					this.$http.patch(this.baseUrl + 'WXUser/wxuser/'+scope.row.openId, qs.stringify({state: state}))
					.then((res) => {
						console.log(res)
						if (res.data.code == 0) {
							this.change() 						//用来刷新table状态
							this.$message({
								type: 'success',
								message: sureMessage
							})
						}else{
							this.$message({
								type: 'info',
								message: '操作失败'
							})
						}
					}).catch((err) => {
						console.log(err)
						this.$message({
							type: 'info',
							message: '操作失败'
						})
					})
				}).catch((err) => {})
			}
  	},
		optionRow (scope) {
			console.log(scope)
			this.$store.commit('userOption',true)
			this.$store.commit('userObj',scope.row)
			this.$router.push('/SiteManage')
			this.$store.commit('activeMenu', '2')
		},
  	replyRow (scope) {										//回复按键
			console.log(scope)
  	  this.reply = true
  	  this.replyForm.name = scope.row.realName
			this.replyForm.content = ''
  	  this.replyForm.openId= scope.row.openId
  	},
    deleteRow (scope) {										//删除按键
      this.$confirm('此操作将永久删除该报汛用户, 是否继续?', '删除提示', { cancelButtonText: '取消', confirmButtonText: '确定', type: 'warning'})
      .then(() => {
        let openId = scope.row.openId
        console.log(openId)
        this.$http.delete(this.baseUrl + 'WXUser/wxuser/' + openId, qs.stringify({}))
        .then((res) => {
					console.log(res)
					if (res.data.code == 0) {
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
						this.change()
					}else{
						this.$message({
							type: 'info',
							message: '删除失败'
						})
					}
        }).catch((err) => {
					console.log(err)
					this.$message({
						type: 'info',
						message: '删除失败'
					})
      	})
     }).catch(() => {})
    },
    change () {										//刷新table函数
      this.getTableBagin(this.addvcd[1], this.sex, this.state, this.phcd)
    },
    postData () {									//获取地区信息
      this.$http.get(this.baseUrl + 'comm/addvcdTree', qs.stringify({}))
      .then((res) => {
        this.areaChoose = res.data.data
        this.$store.commit('addvcd', this.areaChoose) 										//地区信息存储至store
      }).catch((err) => {
        console.log(err)
      })
    },
    getTableBagin (addvcd, sex, state, phcd) {  										//获取table数据函数
			this.tableloading = true
      this.$http.post(this.baseUrl + 'WXUser/wxuser', qs.stringify({addvcd: addvcd, sex: sex, state: state, phcd: phcd}))
      .then((res) => {
        let data = res.data.data
        this.total = data.length
        let arr = []
        for (var i = 0; i < data.length ; i++) {
          let obj = data[i]
					obj.tm = this.timeTrans(data[i].tm)
          var str = ''
          switch (data[i].state) {
            case '1': str = '启用'
							obj.word = '停用'
              break
            case '0': str = '未审核'
							obj.word = '审核'
              break
            case '-1': str = '停用'
							obj.word = '启用'
              break
            case '-2': str = '审核未通过'
							obj.word = '审核'
              break
          }
          obj.state = str
          obj.comment = data[i].comment === null?'-':data[i].comment
          arr.push(obj)
        }
        this.tableData = arr
        this.tableloading = false
      }).catch(function (err) {
        console.log(err)
      })
		},
		getClientHeight () {													//获取table可视区高度
			this.clientHeight = this.getClientAtBegin()
		}
  },
  created: function () {
		this.$store.commit('activeMenu', '1')
		this.$store.commit('userOption',false)
		this.getTableBagin(null, null, null, null)
		this.postData()
		this.getClientHeight()
  }
}
</script>
<style>
	.main{
		overflow:hidden;
		height:100%;
	}
	.main h2{
		display:inline-block;
	}
	.main .num{
		margin-left:5px;
	}
	.select{
		width:160px;
		margin-left:18px;
	}
	.phcd{
		width:190px;
		margin-left:18px;
		border-radius: 0px;
	}
	.searchBtn{
		width:90px;
		border-radius: 0px;
	}
	.table{
		width:100%;
		margin-top:10px;
		height:calc(100% - 180px);
		overflow: hidden;
	}
	.block{
		margin-top:30px;
	}
	.buttons{
		width:110px;
	}
	.el-dialog .el-dialog__body{
		padding:0 20px!important;
	}
</style>
