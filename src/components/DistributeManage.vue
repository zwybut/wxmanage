<template>
	<div class='main'>
		<div class='mainL l'>
			<div class="mainLTitle title">
				<span>单位选择</span>
			</div>
			<div class="mainLContent content">
			<el-menu
				class="distribute_menu"
				unique-opened
				@open="open"
				@close="open"
				@select="select"
				:default-openeds="openedsMenuNode"
				:default-active = 'activeMenuNode'
				>
				<el-submenu v-for="(item,index) in fatherNode" :key="index" :index="item.id" >
					<div slot="title" style="position:relative;">
						<span>{{item.name}}</span>
						<div class="menu_btns r" style="position:absolute;top:0;left:232px;">
							<el-tooltip class="item" effect="dark" content="组信息修改" placement="top">
							<span class="menubtn option" @click="groupOptions($event)"></span>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="删除客户端组" placement="top">
							<span class="menubtn delete" @click="groupDeleteEvent($event)"></span>
							</el-tooltip>
						</div>
					</div>
					<div
					v-loading="childloading"
					element-loading-text="拼命加载中"
					element-loading-spinner="el-icon-loading"
					element-loading-background="rgba(255, 255, 255, 1)">
						<el-menu-item v-for="(item,index) in childrenNode" :key="index" :index="item.nId" class="usingItem unitList clear" >
							<i class="num">{{parseInt(index)+1}}</i>
							<div class="menu_content clear l">
								<span class="unitName">{{item.nName}}</span><span class="dateTime">{{item.lastTm}}</span><span>{{item.edition}}</span>
							</div>
							<div class="menu_btns l">
								<el-tooltip class="item" effect="dark" content="启用停用" placement="top">
								<span :class="'menubtn use '+item.isUsing" @click="use"></span>
								</el-tooltip>
								<el-tooltip class="item" effect="dark" content="信息修改" placement="top">
								<span class="menubtn option" @click="options"></span>
								</el-tooltip>
								<el-tooltip class="item" effect="dark" content="删除客户端" placement="top">
								<span class="menubtn delete" @click="deleteEvent"></span>
								</el-tooltip>


							</div>
						</el-menu-item>
						<el-menu-item  :index="'add'+item.id" class="unitList addChildNode">
								<i class="el-icon-circle-plus"></i><span class="unitName">添加子节点</span>
						</el-menu-item>
					</div>
				</el-submenu>
				<el-menu-item index="addGroup" class="unitList addGroupNode">
					<i class="el-icon-circle-plus"></i><span class="unitName">添加父级</span>
				</el-menu-item>
			</el-menu>
			</div>
		</div>
		<div class='mainC l'>
			<div class="mainCTitle title">
				<span>分发站点</span>
				<el-button size="small" class="allDeleteBtn" @click="deleteAllSite" type="danger" plain>删除全部</el-button>
			</div>
			<div class="mainCContent content">
				<el-table
				class="table"
			    :data="tableData"
			    border
			    style="width: 100%"
			    size="small"
					:height="clientHeight"
			    v-loading="tableloading"
			    element-loading-text="拼命加载中"
					element-loading-spinner="el-icon-loading"
					element-loading-background="rgba(255, 255, 255, 1)">
					<el-table-column
						prop="stcd"
						label="站码"
						align="center">
					</el-table-column>
					<el-table-column
						prop="stnm"
						label="站名"
						align="center">
					</el-table-column>
					<el-table-column
						prop="sttp"
						label="站类"
						align="center">
					</el-table-column>
					<el-table-column
						prop="xian"
						label="县区"
						align="center">
					</el-table-column>
			      <el-table-column
			      label="操作"
			      align="center">
			      	 <template slot-scope="scope">
				        <el-button type="text" size="small" class="deleteBtn" @click="deleteSite(scope)"></el-button>
				     </template>
			      </el-table-column>
				</el-table>
			</div>
		</div>
		<div class='mainR l'>
			<div class="mainRTitle title">
				<span>站点选择</span>
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
		<el-dialog title="节点分发管理" :visible.sync="option" width="400px">
			<el-form :model="optionForm" class="distributeOption clear">
				<el-form-item label="节点编号" :label-width="formLabelWidth" size="small" v-if="addGroup">
					<el-input v-model="optionForm.id" size="small" disabled></el-input>
				</el-form-item>
				<el-form-item label="节点名称" :label-width="formLabelWidth" size="small" v-if="addGroup">
					<el-input v-model="optionForm.name" size="small"></el-input>
				</el-form-item>
				
				<div v-else>
					<el-form-item label="父级节点" :label-width="formLabelWidth" size="small">
						<el-input v-model="faterNodeName" size="small" disabled></el-input>
					</el-form-item>
					<el-form-item label="分发编号" :label-width="formLabelWidth" size="small">
						<el-input v-model="optionForm.nId" size="small" :disabled="disabled"></el-input>
					</el-form-item>
					<el-form-item label="分发名称" :label-width="formLabelWidth" size="small">
						<el-input v-model="optionForm.nName" size="small" ></el-input>
					</el-form-item>
					<el-form-item label="序列号" :label-width="formLabelWidth" size="small">
						<el-input v-model="optionForm.pcId" size="small" ></el-input>
					</el-form-item>
					<el-form-item label="启用标识" :label-width="formLabelWidth" size="small">
						<el-checkbox v-model="optionForm.isUsing"></el-checkbox>
						<span>不启用的节点不会进行分发</span>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="sureOption" size="small" class="buttons sureBtn">确 定</el-button>
				<el-button @click="cancleOption" size="small" class="buttons">取 消</el-button>
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
	      tableData: [],
	      props: {
			label: 'label',
			children: 'children'
		  },
		treeNode: [],
		hadChecked: {},
		tableloading: false,
		treeloading: false,
		childloading: false,
		clientHeight: 0,
		defaultProps: {											//tree配置
			children: 'children',
			label: 'label'
		},
		fatherNode:[],
		childrenNode:[],
		nId:'',
		showNode: [''],								//默认第一个tree节点展开
		option: false,
		optionForm:{},
		faterNodeName:'',
		groupId:'',
		addGroup: false,
		formLabelWidth:'76px',
		checkedIcon: true,
		getCheckedKeys: [],		//已选中的添加站点列表（tree）
		tree_input: '',
		disabled: true,
		activeMenuNode: '',
		activeNode:'',
		openedsMenuNode: []
    }
  },
  watch: {
		tree_input:{  								//监听tree搜索
			handler:function(val,oldval){
				this.$refs.tree.filter(val)
			}
		}
	},
  methods: {
	//tree节点过滤
	filterNode (value, data) {
		if (!value) return true;
		return data.label.indexOf(value) !== -1
	},
	//选中客户端时的函数
	//判断是否为添加
	//若是生成时间戳做为nId
	//若否则调用获取该客户端table的函数
	select (nId,a,b) {
		console.log(a,b)
		this.nId = nId
		this.optionForm = {}
		if(nId.indexOf("add") >= 0){
			this.disabled = false
			this.tableData = []
			this.treeNode = []
			this.option = true
			let tm = new Date()
			let Year = tm.getFullYear()
			let Month = tm.getMonth() + 1
			let Day = tm.getDate()
			let Hours = tm.getHours()
			let Minutes = tm.getMinutes()
			let Seconds = tm.getSeconds()
			let Milliseconds = tm.getMilliseconds()
			let randomId = Year.toString()+Month.toString()+Day.toString()+Hours.toString()+Minutes.toString()+Seconds.toString()+Milliseconds.toString()
			if(nId == 'addGroup'){
				this.addGroup = true
				this.optionForm.id = randomId
			}else{
				this.addGroup = false
				this.optionForm.nId = randomId
				this.optionForm.groupId = this.groupId
			}
		}else{
			this.disabled = true
			this.getTableData(nId)
		}
	},
	//客户端组打开时的函数，获取组内的客户端
	open (id) {
		console.log(id)
		this.childrenNode = []
		this.optionForm = {}
		this.childloading = true
		this.$http.get(this.baseUrl + 'nodeManage/nodeList/' + id, qs.stringify({}))
		.then((res) => {
			console.log(res)
			if(res.data.code == 0){
				let data = res.data.data
				let arr = []
				for (let i = 0; i< data.length; i++) {
					let obj = data[i]
					obj.nId = data[i].nId.toString()
					arr.push(obj)
				}
				this.childrenNode = arr
				this.groupId = id
				this.optionForm.id = id
				for (let j = 0;j <this.fatherNode.length; j++) {
					if(this.fatherNode[j].id == id){
						this.faterNodeName = this.fatherNode[j].name
						this.optionForm.name = this.fatherNode[j].name
					}
				}
				this.childloading = false
				 setTimeout(() => {
					if(data[0]){
						this.activeNode = data[0].nId
						this.nId = data[0].nId

					}
				}, 300)
			}
		}).catch((err) => {
			console.log(err)
		})
	},
	//客户端启用停用函数
	use (event) {
		let thisNode = event.target
		let isUsing
		if(thisNode.className.indexOf('true') == -1){
			thisNode.classList.add('true')
			isUsing = true
		}else{
			thisNode.classList.remove('true')
			isUsing = false
		}
		setTimeout(() => {
			this.$http.put(this.baseUrl + 'nodeManage/node', qs.stringify({nId: this.nId, isUsing: isUsing}))
			.then((res) => {
				if(res.data.code == 0){
					this.$message({
						type: 'success',
						message: '修改成功!'
					})
					this.option = false
				}else{
					this.$message({
						type: 'info',
						message: '修改失败!'
					})
				}
			}).catch((err) => {
				console.log(err)
			})
		}, 30)

	},
	//客户端组设置函数显示设置窗
	groupOptions ($event){
		console.log($event)
		// $event.cancelBubble=true
		// $event.stopPropagation()
		this.disabled = true
		this.addGroup = true
		this.option = true
		this.nId = ''
	},
	//客户端组删除函数
	groupDeleteEvent ($event) {
		// $event.cancelBubble=true
		// $event.stopPropagation()
		setTimeout(()=> {
			this.$confirm('此操作将删除该客户端组, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$http.delete(this.baseUrl + 'nodeManage/deleteNodeGroup/' + this.groupId, qs.stringify({}))
				.then((res) => {
					if(res.data.code == 0){
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
						this.getGroupAtBegin()
					}else{
						this.$message({
							type: 'info',
							message: '删除失败'
						})
					}
				}).catch((err) => {
					console.log(err)
				})
			}).catch(() => {})
		}, 30)
	},
	options () {
		setTimeout(() => {
			this.option = true
			this.addGroup = false
			let nId = this.nId
			this.$http.get(this.baseUrl + 'nodeManage/node/' + nId, qs.stringify({}))
			.then((res) => {
				if(res.data.code == 0){
					this.optionForm = res.data.data
					this.optionForm.isUsing = res.data.data.isUsing == "true"?true:false
				}
			}).catch((err) => {
				console.log(err)
			}).catch(() => {})
		},30)
	},
	//设置窗提交函数
	sureOption (){
		if(this.nId == ''){
			console.log(this.optionForm)
			this.$http.put(this.baseUrl + 'nodeManage/updateNodeGroup', qs.stringify(this.optionForm))
			.then((res) => {
				console.log(res)
				if(res.data.code == 0){
					this.$message({
						type: 'success',
						message: '修改成功!'
					})
					this.getGroupAtBegin()
					this.option = false

				}else{
					this.$message({
						type: 'info',
						message: '修改失败!'
					})
				}
			}).catch((err) => {
				console.log(err)
			})
		}else{
			if(this.nId.indexOf("add") >= 0){
				if(this.nId == 'addGroup'){
					this.$http.post(this.baseUrl + 'nodeManage/addNodeGroup', qs.stringify(this.optionForm))
					.then((res) => {
						console.log(res)
						if(res.data.code == 0){
							this.$message({
								type: 'success',
								message: '添加成功!'
							})
							this.option = false
							this.getGroupAtBegin()
						}else{
							this.$message({
								type: 'info',
								message: '添加失败!'
							})
						}
					}).catch((err) => {
						console.log(err)
					})
				}else{
					this.$http.post(this.baseUrl + 'nodeManage/node', qs.stringify(this.optionForm))
					.then((res) => {
						console.log(res)
						if(res.data.code == 0){
							this.$message({
								type: 'success',
								message: '添加成功!'
							})
							this.option = false
							this.open(this.optionForm.groupId)
						}else{
							this.$message({
								type: 'info',
								message: '添加失败!'
							})
						}
					}).catch((err) => {
						console.log(err)
					})
				}
			}else{
				this.$http.put(this.baseUrl + 'nodeManage/node', qs.stringify(this.optionForm))
				.then((res) => {
					if(res.data.code == 0){
						this.$message({
							type: 'success',
							message: '修改成功!'
						})
						this.option = false
						console.log(this.groupId)
						this.open(this.groupId)
					}else{
						this.$message({
							type: 'info',
							message: '修改失败!'
						})
					}
				}).catch((err) => {
					console.log(err)
				})

			}
		}

	},
	cancleOption (){
		this.option = false
	},
	//客户端删除函数
	deleteEvent () {
		this.$confirm('此操作将删除该客户端, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			this.$http.delete(this.baseUrl + 'nodeManage/node/' + this.nId, qs.stringify({}))
			.then((res) => {
				this.open(this.groupId)
				if (res.data.code == 0) {
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
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
	//删除客户端下的分发站点
  	deleteSite (scope) {
        let stcd = scope.row.stcd
			this.$confirm('此操作将删除该分发站点, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				console.log(this.nId, stcd)
				this.$http.delete(this.baseUrl + 'nodeManage/nodeToStcd/'+this.nId+'/'+stcd, qs.stringify({}))
				.then((res) => {
					console.log(res)
					if(res.data.code == 0){
						this.getTableData(this.nId)
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
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
	  //删除所有分发站点
	deleteAllSite () {
		this.$confirm('此操作将删除该节点所有的分发站点, 是否继续?', '提示', {				//删除弹出窗
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			this.$http.delete(this.baseUrl + 'nodeManage/nodeToStcd/deltedeAll/'+ this.nId, qs.stringify({}))
			.then((res) => {
				console.log(res)
				if (res.data.code === 0 ) {
					this.getTableData(this.nId)										//刷新用户关注站点table
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
	//确定添加分发站点
	sureChoose () {
		let massage = ''
		let type = ''
		console.log(this.getCheckedKeys)
		if (this.getCheckedKeys.length) {
			massage = '此操作将添加节点分发站点, 是否继续?'
			type = 'success'
		}else{
			massage = '请先选择需要添加的分发站点'
			type = 'info'
		}
		this.$confirm(massage, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: type
		}).then(() => {
		if(this.getCheckedKeys.length){
			this.tableloading = true
			this.treeloading = true
			for (var i = 0;i < this.getCheckedKeys.length; i++) {
				let stcd = this.getCheckedKeys[i]
				this.$http.post(this.baseUrl + 'nodeManage/nodeToStcd', qs.stringify({stcd: stcd, nId: this.nId}))
				.then((res) => {
					console.log(res)
					if(res.data.code === 0){
						this.$message({
							type: 'success',
							message: '添加成功'
						})
						this.getCheckedKeys = []
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
				this.getTableData(this.nId)
				this.$refs.tree.setCheckedNodes([])
			}, 1000)
			 			//刷新用户关注站点table
		}
		}).catch(() => {})
	},
    treeCheckChange (data, checked, indeterminate) {				//获取treexuan选中的叶子节点存到getCheckedKeys中
		this.getCheckedKeys = this.$refs.tree.getCheckedKeys(true)
	},
	//获取客户端对应的tree
    getTreeNode () {
		
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
			
     	}).catch(function (err) {
        console.log(err)
      })
    },
    addStationToList (val) {
      if (val.data.code === 0) {
        let data = val.data.data
        let arr = []
        let  arrForTree= {}
        let tableData = []
        for (let i = 0;i < data.length;i++) {
          let obj = data[i]
          tableData.push(obj)
          arrForTree[data[i].stcd] = ''
        }
        this.tableData = tableData
		this.hadChecked = arrForTree
		this.getTreeNode() 
      }
    },
	//获取客户端的分发站点table
    getTableData (nId) {
		this.tableloading = false
		this.treeloading = false
		if(nId){
			this.$http.get(this.baseUrl + 'nodeManage/nodeToStcd/' + nId, qs.stringify({}))
			.then((res) => {
				this.tableData = res.data.data
				this.addStationToList(res)
			}).catch(function (err) {
				console.log(err)
			})
		}
      	
	},
	activeMenu () {
		this.$store.commit('activeMenu', '6')
	},
	getClientHeight () {
		this.clientHeight = parseInt(this.getClientAtBegin() + 42)
	},
	//获取客户端组s
	getGroupAtBegin () {
		this.openedsMenuNode = []
		// this.activeMenuNode = ''
		this.tableloading = true
		this.treeloading = true
		this.$http.get(this.baseUrl + 'nodeManage/nodeGroup', qs.stringify({}))
		.then((res) => {
			if(res.data.code == 0){
				let data = res.data.data
				let arr = []
				this.open(data[0].id)
				for (let i = 0; i< data.length; i++) {
					arr.push(data[i])
				}
				this.fatherNode = arr
				setTimeout(() => {
					this.getTableData(this.activeNode)
					this.activeMenuNode = this.activeNode
					this.openedsMenuNode.push(data[0].id)
				}, 1000)
			}
		}).catch((err) => {
			console.log(err)
		})
	}
  },
  created: function () {
	this.activeMenu()
	this.getGroupAtBegin()
	this.getClientHeight()
	console.log(this.openedsMenuNode)
  }
}
</script>

<style scoped>
	.main{
		overflow:hidden;
		height:calc(100% - 60px);
	}
	.mainL{
		width:390px;
		height:100%;
	}
	.mainC{
		width:calc(100% - 560px - 40px - 90px);
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
		overflow:hidden;
	}
	.distribute_menu{
		width:calc(100% - 36px);
		margin-left:18px;
		height:calc(100% - 36px);
		margin-top:18px;
		border:1px solid #e6e6e6;
		overflow:auto;
	}
	.distribute_menu .num{
		display:inline-block;
		width:20px;
		height:20px;
		line-height:20px;
		text-align:center;
		text-decoration:none;
		border-radius:50%;
		background:#1877ED;
		color:#fff;
		position:absolute;
		top:50%;
		margin-top:-10px;
		left:20px;
	}
	.el-icon-circle-plus{
		display:inline-block;
		width:20px;
		height:20px;
		text-decoration:none;
		border-radius:50%;
		position:absolute;
		top:50%;
		margin-top:-10px;
		left:20px;
	}
	.distribute_menu .menu_content{
		margin-left:20px;
		margin-right:0;
		width:190px;
		height:100%;
	}
	.menu_content span{
		float:left;
		font-size:12px;
		line-height:24px;
	}
	.menu_content .unitList{
		height:64px !important;
	}
	.menu_content span.unitName{
		width:200px;
		margin-top:8px;
	}
	.menu_content span.dateTime{
		margin-right:10px;
	}
	.menu_btns .menubtn{
		display:inline-block;
		width:18px;
		height:18px;
		border-radius:50%;
		margin-left:5px;
	}
	.menu_btns .use{
		background:url(../assets/distribute_on.png)no-repeat center;
	}
	.menu_btns .use.true{
		background:url(../assets/distribute_off.png)no-repeat center;
	}
	.menu_btns .option{
		background:url(../assets/distribute_option.png)no-repeat center;
	}
	.menu_btns .delete{
		background:url(../assets/distribute_delete.png)no-repeat center;
	}

	.menu_btns .use:hover,.el-menu-item.is-active .use{
		background:url(../assets/distribute_on_active.png)no-repeat center;
	}
	.menu_btns .use.true:hover,.el-menu-item.is-active .use.true{
		background:url(../assets/distribute_off_active.png)no-repeat center;
	}
	.menu_btns .option:hover,.el-menu-item.is-active .option{
		background:url(../assets/distribute_option_hover.png)no-repeat center;
	}
	.menu_btns .delete:hover,.el-menu-item.is-active .delete{
		background:url(../assets/distribute_delete_hover.png)no-repeat center;
	}
	.el-menu-item{
		position:relative;
	}
	.el-menu-item.is-active{
		border:1px solid #1877ED;
		background:#fff;
	}
	.addChildNode .unitName{
		margin-left:20px;
	}
	.mainCContent{
		padding-top:18px;
		height:calc(100% - 40px - 20px);
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
		margin-right:0;
		margin-top:-2px;
		background:url(../assets/delete.png)no-repeat center;
	}
  .chartBtn{
    display:inline-block;
		width:20px;
		height:20px;
		margin-right:0;
		margin-top:-2px;
		background:url(../assets/distribute_chart.png)no-repeat center;
    background-size:cover;
  }
	.el-tree {
		height:100%;
	}
	.sureBtn{
		margin-right:20px;
	}
	.sureChoose{
		float:right;
		width:100%;
	}
	.hiddenBtn{
		padding: 12px;
		background:url(../assets/user_search.png)no-repeat center;
		float:right;
		margin-top:6px;
		margin-right:6px;
	}
	.allDeleteBtn{
		float:right;
		margin-top:6px;
		margin-right:20px;
		padding:6px 12px;
	}
	.addGroupNode{
		height:40px;
		background:#f1f1f1;
	}
	.addGroupNode .unitName{
		line-height:40px;
		float:left;
	}
	
</style>
