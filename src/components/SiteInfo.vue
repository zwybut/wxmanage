<template>
	<main class='main clear'>
		<div class='mainL l'>
			<div class="mainLTitle title">
				<span>站点选择</span>
				<el-popover
				ref="popover"
				placement="left"
				width="150"
				trigger="click">
					<el-input v-model="tree_input" placeholder="模糊查询" size="small" width="70"></el-input>
				</el-popover>
				<el-button v-popover:popover class="hiddenBtn"></el-button>
			</div>
			<div class="mainLContent content">
				<el-tree
					ref="tree"
					:data="treeNode"
					:props="defaultProps"
					node-key="label"
					:default-expanded-keys="showNode"
					accordion
					:highlight-current='trueBoolean'
					@node-click="handleNodeClick"
					:filter-node-method="filterNode"
					v-loading="treeloading"
					element-loading-text="拼命加载中"
					element-loading-spinner="el-icon-loading"
					element-loading-background="rgba(255, 255, 255, 1)">
				</el-tree>
			</div>
		</div>
		<div class='mainR l'>
			<div separator="/" class="breadcrumb">
				<span>{{third}}</span> ( <span>{{first}}</span> · <span>{{second}}</span> ) 
			</div>
			<el-menu :default-active="activeIndex"
				class="el-menu-demo"
				mode="horizontal"
				active-text-color="#fff">
			  <el-menu-item index="1"><router-link to="/SiteInfo/BasicInfo" class="tabs">基本站点信息</router-link></el-menu-item>
			  <el-menu-item index="2"><router-link to="/SiteInfo/FloodProjectCustom" class="tabs">报汛项目定制</router-link></el-menu-item>
			  <el-menu-item index="3"><router-link to="/SiteInfo/FloodNumOption" class="tabs">报汛数值设置</router-link></el-menu-item>
			</el-menu>
			<router-view></router-view>
		</div>
	</main>
</template>

<script>
import qs from 'qs'
export default{
  name: 'SiteInfo',
  data () {
    return {
      activeIndex: '1',										//子页面默认显示index
      defaultProps: {											//tree配置
        children: 'children',
        label: 'label'
			},
			tree_input: '',											//tree查询
      treeNode: [],												//tree数据
			showNode: [''],											//默认第一个tree节点展开
      treeloading: false,
      trueBoolean: true,
			first: '',													//站点所属地区
			second: '',													//站点类别
			third: ''														//站点名称
    }
    
	},
	watch: {
		tree_input:{  								//监听tree搜索
			handler:function(val,oldval){
				this.$refs.tree.filter(val)
			}
		}, 
	},
  methods: {
		filterNode(value, data) {
			if (!value) return true
			return data.label.indexOf(value) !== -1
		},
    handleNodeClick (data,node,self) {							//tree点击函数
      if(data.stcd){
				// this.$router.push({path: '/SiteInfo/BasicInfo'})
				console.log(node)
				this.first = node.parent.parent.data.label							//将名称等信息赋值
				this.second = node.parent.data.label
				this.third = node.data.label
        this.activeIndex = '1'
				console.log(data.stcd)
				console.log(data.sttp)
				this.$store.commit('siteStcd',data.stcd)							//站点stcd存到store中
				this.$store.commit('siteSttp',data.sttp)							//站点sttp存到store中
      }
    },
		activeMenu () {																	//将header默认显示页设为站点信息
      this.$store.commit('activeMenu', '3')
    },
    getTreeNode () {														//获取tree
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
				let first = treeData[0].children
				let second = first[0].children
				let show = second[0].label
				let STTP = second[0].sttp
				let STCD = second[0].stcd
				console.log(STTP)
				console.log(STCD)
				this.showNode.push(show) 			
				setTimeout(()=>{
					this.first = treeData[0].label
					this.second = first[0].label
					this.third = show
					this.$refs.tree.setCurrentKey(show)												//设置tree默认第一个选中
					this.$store.commit('siteStcd',STCD)												//将stcd存储至store
					this.$store.commit('siteSttp',STTP)                       //将sttp存储至store
				}, 50)
        this.treeloading = false
         this.$router.push('/SiteInfo/BasicInfo')										//展示站点基础信息
     	}).catch(function (err) {
        console.log(err)
      })
    },

  },
  created: function () {
    this.activeMenu()
    this.getTreeNode()
  },
	mounted: function(){
	}
}
</script>

<style scoped>
  .main{
		overflow:visible;
		height:calc(100% - 60px)
	}
	.mainL{
		width:260px;
		height:100%;
		margin-right:20px;
	}
	.mainR{
		width:calc(100% - 260px - 20px);
		height:100%;
		overflow:visible
	}
	.breadcrumb{
		top:-20px;
		left:0px;
		height:38px;
		width:calc(100% - 20px);
		border:1px solid #e6e6e6;
		background:#fafafa;
		line-height:38px;
		padding-left:20px;
		margin-bottom:20px;
	}
	.mainLContent{
		overflow-y:auto;
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
	.el-menu-demo{
		border:1px solid #e6e6e6;
	}
	.el-menu--horizontal>.el-menu-item{
		width:180px !important;
		height:40px !important;
		line-height:40px !important;
		padding:0;
		text-align: center;
		border-right:1px solid #e6e6e6;
	}
	.el-menu--horizontal>.el-menu-item.is-active{
		background:#1877ed !important;
	}
	.el-dropdown{
		margin-top:20px;
		margin-right:8px;
		color:#fff;
	}
	.content{
		border:1px solid #e6e6e6;
		border-top:0;
		height:calc(100% - 40px - 2px)
	}
	.tabs{
		height:40px;
	}
	.hiddenBtn{
		padding: 12px;
		background:url(../assets/user_search.png)no-repeat center;
		float:right;
		margin-top:6px;
		margin-right:6px;
	}
</style>