<template>
	<div class='main'>
		<div class='mainL l'>
			<div class="mainLTitle title">
				<span>报汛用户</span>
				<el-popover
				ref="popover"
				placement="left"
				width="150"
				trigger="click">
					<el-input v-model="search_input" placeholder="输入姓名/电话/单位" size="small" width="70"></el-input>
				</el-popover>
				<el-button v-popover:popover class="hiddenBtn" id="hidden"></el-button>
			</div>
			<div class="mainLContent content"
			v-loading="listloading"
			element-loading-text="拼命加载中"
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(255, 255, 255, 1)">
				<ul>
					<li class='clear liNodes' @click="choose($event)" v-for='item in userList'><img :src="item.headimgurl" class='l img'></img>
						<div class='l'><span style="display:none">{{item.openId}}</span><span class="name">{{item.realName}}</span><span class="tel">{{item.cellPhone}}</span><br /><span class="adress">{{item.department}}</span></div>
						<span class='chat r' @click="reply = true"></span>
					</li>
				</ul>
			</div>
		</div>
		<div class='mainC l'>
			<div class="mainCTitle title">
				<span>用户报汛站点 ( 关注站点 : <span style="color:#1877ED;margin-left:0;">{{Num1}}</span>， 我的报汛 : <span style="color:#fa5555;margin-left:0;">{{Num2}}</span> )</span>
				<el-button size="small" class="allDeleteBtn" @click="deleteAllSite" type="danger" plain>删除全部</el-button>
			</div>
			<div class="mainCContent content">
				<el-table
				class="table"
			    :data="tableData"
			    border
				stripe
			    style="width: 100%"
			    size="small"
				:height="clientHeight"
			    v-loading="tableloading"
			    element-loading-text="拼命加载中"
				element-loading-spinner="el-icon-loading"
				element-loading-background="rgba(255, 255, 255, 1)">
			    <el-table-column
			      align="center"
			      prop="stcd"
			      label="站码">
			    </el-table-column>
			    <el-table-column
			      align="center"
			      prop="stnm"
			      label="站名">
			    </el-table-column>
			    <el-table-column
			      prop="sttp"
			      label="站类"
			      align="center">
			      </el-table-column>
			      <el-table-column
			      prop="item"
			      label="报汛项目"
			      align="center">
			      </el-table-column>
			      <el-table-column
			      prop="district"
			      label="县区"
			      align="center">
			      </el-table-column>
			      	<el-table-column
			      prop="mine"
			      label="我的报汛"
			      align="center"
			      >
			      	 <template slot-scope="scope">
				        <el-checkbox v-model='scope.row.mine' @change="checkChange(scope)" class="myFlood"></el-checkbox>
				     </template>
			      </el-table-column>
			      <el-table-column
			      label="操作"
			      align="center">
			      	 <template slot-scope="scope">
						   <el-button type="text" size="small" @click="siteOption(scope)">配置</el-button>
				           <el-button type="text" size="small" class="deleteBtn" @click="deleteSite(scope)"></el-button>
						
				     </template>
			      </el-table-column>
			    </el-table-column>
			  </el-table>
			</div>
		</div>
		<div class='mainR l'>
			<div class="mainRTitle title">
				<span>添加报汛站点</span>
				<el-popover
				ref="popover1"
				placement="left"
				width="150"
				trigger="click">
					<el-input v-model="tree_input" placeholder="模糊查询" size="small" width="70"></el-input>
				</el-popover>
				<el-button v-popover:popover1 class="hiddenBtn"></el-button>
			</div>
			<div class="mainRContent content">
				<el-tree
				  :data="treeNode"
				  :props="props"
				  node-key="stcd"
				  show-checkbox
				  accordion
				  @check-change="treeCheckChange"
				  v-loading="treeloading"
			     element-loading-text="拼命加载中"
					element-loading-spinner="el-icon-loading"
					element-loading-background="rgba(255, 255, 255, 1)"
					ref="tree"
					:filter-node-method="filterNode">
				</el-tree>
			</div>
			<el-button class="sureChoose" type="primary" @click="sureChoose" size="small">添加用户报汛站点</el-button>
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
	</div>
</template>

<script>
	import qs from 'qs'
	export default{
	  name: 'SiteManage',
	  data () {
	    return {
			userList: [],			//用户列表数据
			tableData: [],			//用户关注站点table
	      	props: {				//table 配置属性
			label: 'label',
			children: 'children'
		  	},
			openId: '',
			treeNode: [],			//tree数据
			hadChecked: {},			//用户已关注站点hash
			tableloading: false,
			listloading: true,
			treeloading: false,
			clientHeight: 0,		//table可视区高度 用来切头
			search_input: '',		//用户搜索框
			tree_input: '',			//站点查询
			getCheckedKeys: [],		//已选中的添加站点列表（tree）
			reply: false,
			replyForm: {				//回复弹出窗对象
				name: '',
				content: ''
			},
			formLabelWidth: '72px',
			Num1:0,
			Num2:0
			}
		},
		methods: {
			transItemsName (item) {											
				let arr = item.split('')
				let itemName = []
				for(let i=0;i<arr.length;i++){
					switch (arr[i]) {
						case 'Z': itemName.push('水位')
						break
						case 'Q': itemName.push('流量')
						break
						case 'P': itemName.push('雨量')
						break
						case 'E': itemName.push('蒸发')
						break
					}
				}
				return itemName.join(' ')
			},
			siteOption(scope){
				console.log(scope)
				this.$store.commit('siteOption',true)
				this.$store.commit('siteObj',scope.row)
				this.$store.commit('activeMenu','3')
				this.$router.push('/SiteInfo')
			},
			sureReply () {												//审核弹出框提交操作
				let openId = this.openId
				let content = this.replyForm.content
				this.$http.post(this.baseUrl+'WXUser/wxuser/' + openId, qs.stringify({'data': content}))
				.then((res) => {
					console.log(res)
					this.replyForm.content = ''
					if (res.data.code === 0) {
						this.reply = false
						this.$message({
							type: 'success',
							message: '回复成功！'
						})
					}else{
						this.reply = false
						this.$message({
							type: 'info',
							message: '回复失败'
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			cancleReply () {										//弹出框取消按键操作
				this.reply = false
			},
			filterNode (value, data) {
				if (!value) return true;
        		return data.label.indexOf(value) !== -1
			},
			sureChoose () {			//添加用户关注站点
				let massage = ''
				let type = ''
				console.log(this.getCheckedKeys)
				if (this.getCheckedKeys.length) {
					massage = '此操作将添加用户关注站点, 是否继续?'
					type = 'success'
				}else{
					massage = '请先选择需要关注的站点'
					type = 'info'
				}
				this.$confirm(massage, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: type
				}).then(() => {
					let openId = this.openId					//将tree中选择的站点添加到关注站点中
					this.tableloading = true
					this.treeloading = true
					for (var i = 0;i < this.getCheckedKeys.length; i++) {
						let stcd = this.getCheckedKeys[i]
						this.$http.post(this.baseUrl + 'stationConfig/rgbx_user', qs.stringify({stcd: stcd, openId: openId}))
						.then((res) => {
							if(res.data.code === 0){
								this.$message({
									type: 'success',
									message: '添加成功'
								})

							}else{
								this.$message({
									type: 'info',
									message: '添加失败'
								})
							}
						}).catch((err) => {
							console.log(err)
							this.$message({
								type: 'info',
								message: '添加失败'
							})
						})
					}
					setTimeout(() => {
						this.getTableData (openId)
						this.$refs.tree.setCheckedNodes([])
					}, 1000)
				}).catch(() => {})
			},
			deleteAllSite () {
				let openId = this.openId
				this.$confirm('此操作将删除该用户所有关注站点, 是否继续?', '提示', {				//删除弹出窗
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.delete(this.baseUrl + 'stationConfig/rgbx_user/'+openId, qs.stringify({}))
					.then((res) => {
						console.log(res)
						if (res.data.code === 0 ) {
							this.getTableData (openId)										//刷新用户关注站点table
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
						}else{
							this.$message({
								type: 'info',
								message: '删除失败'
							});
						}
					}).catch((err) => {
						console.log(err)
						this.$message({
							type: 'info',
							message: '删除失败'
						});
					})
				}).catch(() => {})
			},
			deleteSite (scope) {								//删除用户关注站点
				let stcd = scope.row.stcd
				let addvcd = scope.row.addvcd
				let sttp = scope.row.sttp
				let index = scope.$index
				let openId = this.openId
				console.log(scope.row.stnm)
				this.$confirm('此操作将删除该关注站点, 是否继续?', '提示', {				//删除弹出窗
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
				this.$http.delete(this.baseUrl + 'stationConfig/rgbx_user/'+openId+'/'+stcd, qs.stringify({}))
				.then((res) => {
					console.log(res)
					if (res.data.code === 0 ) {
						this.getTableData (openId)										//刷新用户关注站点table
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}else{
						this.$message({
							type: 'info',
							message: '删除失败'
						});
					}
				}).catch((err) => {
					console.log(err)
					this.$message({
						type: 'info',
						message: '删除失败'
					});
				})
			}).catch(() => {})
			},
			checkChange (scope) {								//添加取消我的报汛
				let stcd = scope.row.stcd
				let openId = this.openId
				let poiType = scope.row.mine === true ? 1 : 0
				console.log(scope)
				this.$http.patch(this.baseUrl + 'stationConfig/rgbx_user', qs.stringify({stcd: stcd, openId: openId, poiType: poiType}))
				.then((res) => {
					console.log(res)
					if(res.data.code === 0){
						if (poiType) {
							this.$message({
								type: 'success',
								message: '成功添加我的报汛!'
							})
						}else{
							this.$message({
								type: 'info',
								message: '成功取消我的报汛!'
							})
						}
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
			},
			treeCheckChange (data, checked, indeterminate) {				//获取treexuan选中的叶子节点存到getCheckedKeys中
				this.getCheckedKeys = this.$refs.tree.getCheckedKeys(true)
			},
			getTreeNode () {									//获取用户对应的tree,已关注的站点不在tree中显示
				this.treeloading = true
				this.$http.get(this.baseUrl + 'comm/stationInfo', qs.stringify({}))
				.then((res) => {
					let data = res.data.data
					let resultData = {}
					var treeData = []
					for (let i = 0; i < data.length; i++) {
						var shi = data[i].shi
						if(resultData[shi]){
							resultData[shi].push(data[i])
						}
						else{
							var shiData = []
							shiData.push(data[i])
							resultData[shi] = shiData
							var childrenTree = {}
							childrenTree.label = shi
							childrenTree.id = data[i].addvcd
							childrenTree.children = []
							treeData.push(childrenTree)
						}
					}
					for (let i = 0; i < treeData.length; i++) {
						var stationList = resultData[treeData[i].label]
						var sttpTree = [{label:"雨量站",children:[]},{label:"水库站",children:[]},{label:"河道站",children:[]},
						{label:"闸坝站",children:[]},{label:"潮位站",children:[]},{label:"蒸发站",children:[]}]
						for (let j = 0; j < stationList.length; j++) {
							if(this.hadChecked[stationList[j].stcd] === ''){
								continue
							}
							var sttp = stationList[j].sttp
							sttp = sttp.slice(0,1)
							var stcdTree = {label:stationList[j].stnm,stcd:stationList[j].stcd,sttp:stationList[j].sttp,district:stationList[j].xian,item:stationList[j].item}
							switch(sttp){
								case "P" :
									sttpTree[0].children.push(stcdTree)
									break
								case "R" :
									sttpTree[1].children.push(stcdTree)
									break
								case "Z" :
									sttpTree[2].children.push(stcdTree)
									break
								case "D" :
									sttpTree[3].children.push(stcdTree)
									break
								case "T" :
									sttpTree[4].children.push(stcdTree)
									break
								case "E" :
									sttpTree[5].children.push(stcdTree)
									break
							}
						}
						for (let i = 0;i < sttpTree.length; i++) {
							if(!sttpTree[i].children.length){
								sttpTree.splice(i,1)
								i--
							}
						}
						treeData[i].children=sttpTree;
					}
					this.treeNode = treeData
					this.treeloading = false
				}).catch(function (err) {
					console.log(err)
				})
			},
			addStationToList (val) { 						//将已关注的站点添加到关注table中
				if (val.data.code === 0) {
					let data = val.data.data
					let arr = []
					let  arrForTree= {}
					let tableData = []
					this.tableData = []
					let Num1 = 0
					let Num2 = 0
					for (let i = 0;i < data.length;i++) {
						Num1 ++
						let obj = {}
						obj.shi = data[i].shi
						obj.stcd = data[i].stcd
						obj.stnm = data[i].stnm
						obj.sttp = this.sttpTransform(data[i].sttp)
						obj.district = data[i].xian
						obj.item = this.transItemsName(data[i].item)
						
						obj.mine = data[i].poiType === 1? true : false
						tableData.push(obj)
						arrForTree[data[i].stcd] = ''
						if(data[i].poiType == 1){
							Num2 ++
						}
					}
					this.Num1 = Num1
					this.Num2 = Num2
					this.tableData = tableData
					this.hadChecked = arrForTree    			//用户已关注站点的hash存储至hadChecked
					this.tableloading = false

				}
			},
			choose ($event) {								//用户点击切换
				this.tableloading = true
				let Li = document.getElementsByClassName('liNodes')
				let node = $event.currentTarget
				for (let i = 0; i < Li.length; i++) {
					Li[i].classList.remove('active')
				}
				node.classList.add('active')
				let nodeChild = node.children[1]
				let openId = nodeChild.children[0].innerHTML
				this.openId = openId
				this.replyForm.name = nodeChild.children[1].innerHTML
				this.getTableData (openId)

			},
			getTableData (openId) {							//获取用户关注站点table
				this.tableloading = true
				this.$http.get(this.baseUrl + 'stationConfig/stationInfo/'+openId, qs.stringify({}))
				.then((res) => {
					this.addStationToList(res)
					this.getTreeNode()
					console.log()
				}).catch(function (err) {
					console.log(err)
				})
			},
			activeMenu () {								//设置header默认选中为站点信息
				this.$store.commit('activeMenu', '2')
			},
			showFirstUser () {							//默认显示第一个用户的关注站点
				let Li = document.getElementsByClassName('liNodes')[0]
				if (Li) {
					Li.classList.add('active')
					let nodeChild = Li.children[1]
					let openId = nodeChild.children[0].innerHTML
					this.openId = openId
					this.getTableData(openId)
				}
			},
			userFilter () {
				if(this.$store.state.userOption){
					setTimeout(() => {
						this.search_input = this.$store.state.userObj.realName
						document.getElementById("hidden").click()
					}, 30)
					
				}
			},
			getUserList (phcd) {						//获取用户列表
				this.$http.post(this.baseUrl + 'WXUser/wxuser', qs.stringify({addvcd: null, sex: null, state: null, phcd: phcd}))
				.then((res) => {
					
					console.log(res.data)
					let data = res.data.data
					this.total = data.length
					let arr = []
					for (var i = 0; i < data.length ; i++) {
						if(data[i].state != 0&&data[i].state != -2){
							arr.push(data[i])
						}
					}
					this.userList = arr
					setTimeout(() => {
						this.showFirstUser()
						this.listloading = false
					}, 100)
				}).catch(function (err) {
					console.log(err)
				})
			},
			getClientHeight () {								//获取table可视区高度
				this.clientHeight = parseInt(this.getClientAtBegin() + 42)
			}
		},
		watch: {
			search_input:{  								//监听用户搜索输入
				handler:function(val,oldval){
					this.getUserList(val)					//根据输入获取用户列表
				}
			},
			tree_input:{  								//监听tree搜索
				handler:function(val,oldval){
					this.$refs.tree.filter(val)
				}
			},
		},
		created(){
			this.$store.commit('siteOption',false)
			this.activeMenu()
			this.getUserList()												//通过函数获取
			this.getClientHeight()
		},
		mounted() {
			this.userFilter()
		}
	}
</script>

<style scoped>
	.main{
		overflow:hidden;
		height:calc(100% - 60px);
	}
	.mainL{
		width:300px;
		height:100%;
	}
	.mainC{
		width:calc(100% - 560px - 40px);
		margin-left:20px;
		height:100%;
	}
	.mainR{
		width:260px;
		margin-left:20px;
		height:100%;
	}
	.title{
		height:38px;
		border:1px solid #e6e6e6;
		background:#fafafa;
	}
	.title span{
		line-height:38px;
		margin-left:20px
	}
	.content{
		border:1px solid #e6e6e6;
		border-top:0;
		height:calc(100% - 40px - 2px)
	}
	.mainLContent{
		overflow:auto;
	}
	.mainLContent ul{
		margin:0;
		padding:0;
	}
	.mainLContent li{
		padding:10px 0 10px 10px;
		cursor: pointer;
	}
	.mainLContent li img{
		display:inline-block;
		width:40px;
		height:40px;
		border-radius: 50%;
		margin-right:10px;
	}
	.mainLContent span{
		line-height:21px
	}
	.mainLContent .name{
		display:inline-block;
		font-size:13px;
		margin-right:5px;
		color:#1670E0;
		width:40px;
		font-weight:600;
	}
	.mainLContent .adress{
		color:#808080;
	}
	.mainLContent .chat{
		display:block;
		width:19px;
		height:18px;
		margin-top:12px;
		margin-right:20px;
		background:url(../assets/chat.png) no-repeat center;
	}
	.mainLContent li.active{
		background:#1877ED;
		color:#fff;
	}
	.mainLContent li.active .name,.mainLContent li.active .adress{
		color:#fff;
	}
	.mainLContent li.active .chat{
		color:#fff;
		background:url(../assets/chat_choose.png) no-repeat center;
	}
	.mainCContent{
		padding-top:18px;
		height:calc(100% - 40px - 20px)
	}
	.allDeleteBtn{
		float:right;
		margin-top:6px;
		margin-right:20px;
		padding:6px 12px;
	}
	.mainCContent .table{
		width:calc(100% - 36px) !important;
		margin:0 auto;
		height:calc(100% - 18px) !important;
	}
	.mainRContent{
		overflow:auto;
		height: calc(100% - 75px)
	}
	.deleteBtn{
		display:inline-block;
		width:20px;
		height:20px;
		background:url(../assets/delete.png)no-repeat center;
		padding:5px 16px;
	}
	.el-tree {
		height:100%;
	}
	.hiddenBtn{
		padding: 12px;
		background:url(../assets/user_search.png)no-repeat center;
		float:right;
		margin-top:6px;
		margin-right:6px;
	}
	.sureChoose{
		float:right;
		width:100%;
	}
	.el-dialog .el-dialog__body{
		padding:0 20px!important;
	}
</style>
