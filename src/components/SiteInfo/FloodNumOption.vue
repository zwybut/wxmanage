<template>
	<main class="floodNumMain" 
	v-loading="dataloading"
	element-loading-text="拼命加载中"
	element-loading-spinner="el-icon-loading"
	element-loading-background="rgba(255, 255, 255, 1)">
		<div v-if="PP" class="contentBox">
			<div class="titleBox"><span class="optionName">雨量报汛</span><span class="optionNum">数值设置</span></div>			
			<div class="contentInput">
				<span class="label l">日蒸发量</span>
				<el-input  placeholder="" v-model.number="PPList.DYE.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="PPList.DYE.maxv" class="input" size="small" type="number"></el-input>
			</div>
			<el-button type="primary" :loading="loading" @click="changed" class="submitBtn" size="small">保存</el-button>	
		</div>
		<div v-if="RR" class="contentBox">
			<div class="titleBox"><span class="optionName">水库报汛</span><span class="optionNum">数值设置</span></div>	
			<div class="contentInput">
				<span class="label l">日蒸发量</span>
				<el-input  placeholder="" v-model.number="RRList.DYE.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="RRList.DYE.maxv" class="input" size="small" type="number"></el-input>
			</div>		
			<div class="contentInput">
				<span class="label l">瞬时水位</span>
				<el-input  placeholder="" v-model.number="RRList.Z.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="RRList.Z.maxv" class="input" size="small" type="number"></el-input>
			</div>	
			<div class="contentInput">
				<span class="label l">瞬时库容</span>
				<el-input  placeholder="" v-model.number="RRList.W.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="RRList.W.maxv" class="input" size="small" type="number"></el-input>
			</div>	
			<div class="contentInput">
				<span class="label l">瞬时入流</span>
				<el-input  placeholder="" v-model.number="RRList.INQ.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="RRList.INQ.maxv"  class="input" size="small" type="number"></el-input>
			</div>	
			<div class="contentInput">
				<span class="label l">瞬时出流</span>
				<el-input  placeholder="" v-model.number="RRList.OTQ.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="RRList.OTQ.maxv" class="input" size="small" type="number"></el-input>
			</div>	
			<div class="contentInput">
				<span class="label l">库下水位</span>
				<el-input  placeholder="" v-model.number="RRList.BLRZ.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="RRList.BLRZ.maxv" class="input" size="small" type="number"></el-input>
			</div>	
			<div class="contentInput">
				<span class="label l">开闸高度</span>
				<el-input  placeholder="" v-model.number="RRList.GTOPHGT.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="RRList.GTOPHGT.maxv" class="input" size="small" type="number"></el-input>
			</div>
			<div class="contentInput">
				<span class="label l">过闸流量</span>
				<el-input  placeholder="" v-model.number="RRList.GTQ.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="RRList.GTQ.maxv" class="input" size="small" type="number"></el-input>
			</div>	
			<el-button type="primary" :loading="loading" @click="changed" class="submitBtn" size="small">保存</el-button>	
		</div>
		<div v-if="ZZ" class="contentBox">
			<div class="titleBox"><span class="optionName">河道报汛</span><span class="optionNum">数值设置</span></div>
			<div class="contentInput">
				<span class="label l">日蒸发量</span>
				<el-input  placeholder="" v-model.number="ZZList.DYE.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="ZZList.DYE.maxv" class="input" size="small" type="number"></el-input>
			</div>		
			<div class="contentInput">
				<span class="label l">瞬时水位</span>
				<el-input  placeholder="" v-model.number="ZZList.Z.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="ZZList.Z.maxv" class="input" size="small" type="number"></el-input>
			</div>		
			<div class="contentInput">
				<span class="label l">流量</span>
				<el-input  placeholder="" v-model.number="ZZList.Q.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="ZZList.Q.maxv" class="input" size="small" type="number"></el-input>
			</div>	
			<div class="contentInput">
				<span class="label l">断面过水面积</span>
				<el-input  placeholder="" v-model.number="ZZList.XSA.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="ZZList.XSA.maxv" class="input" size="small" type="number"></el-input>
			</div>			
			<div class="contentInput">
				<span class="label l">断面平均流速</span>
				<el-input  placeholder="" v-model.number="ZZList.XSAVV.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="ZZList.XSAVV.maxv" class="input" size="small" type="number"></el-input>
			</div>	
			<div class="contentInput">
				<span class="label l">断面最大流速</span>
				<el-input  placeholder="" v-model.number="ZZList.XSMXV.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="ZZList.XSMXV.maxv" class="input" size="small" type="number"></el-input>
			</div>			
			<div class="contentInput">
				<span class="label l">闸上水位</span>
				<el-input  placeholder="" v-model.number="ZZList.UPZ.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="ZZList.UPZ.maxv" class="input" size="small" type="number"></el-input>
			</div>	
			<div class="contentInput">
				<span class="label l">闸下水位</span>
				<el-input  placeholder="" v-model.number="ZZList.DWZ.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="ZZList.DWZ.maxv" class="input" size="small" type="number"></el-input>
			</div>			
			<div class="contentInput">
				<span class="label l">总过闸流量</span>
				<el-input  placeholder="" v-model.number="ZZList.TGTQ.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="ZZList.TGTQ.maxv" class="input" size="small" type="number"></el-input>
			</div>	
			<el-button type="primary" :loading="loading" @click="changed" class="submitBtn" size="small">保存</el-button>	
		</div>
		<div v-if="TT" class="contentBox">
			<div class="titleBox"><span class="optionName">潮位报汛</span><span class="optionNum">数值设置</span></div>
			<div class="contentInput">
				<span class="label l">日蒸发量</span>
				<el-input  placeholder="" v-model.number="TTList.DYE.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="TTList.DYE.maxv" class="input" size="small" type="number"></el-input>
			</div>		
			<div class="contentInput">
				<span class="label l">高潮位</span>
				<el-input  placeholder="" v-model.number="TTList.HTDZ.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="TTList.HTDZ.maxv" class="input" size="small" type="number"></el-input>
			</div>			
			<div class="contentInput">
				<span class="label l">低潮位</span>
				<el-input  placeholder="" v-model.number="TTList.LTDZ.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="TTList.LTDZ.maxv" class="input" size="small" type="number"></el-input>
			</div>
			<el-button type="primary" :loading="loading" @click="changed" class="submitBtn" size="small">保存</el-button>				
		</div>
		<div v-if="DD" class="contentBox">
			<div class="titleBox"><span class="optionName">闸坝报汛</span><span class="optionNum">数值设置</span></div>
			<div class="contentInput">
				<span class="label l">日蒸发量</span>
				<el-input  placeholder="" v-model.number="DDList.DYE.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="DDList.DYE.maxv" class="input" size="small" type="number"></el-input>
			</div>		
			<div class="contentInput">
				<span class="label l">日均水位</span>
				<el-input  placeholder="" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" class="input" size="small" type="number"></el-input>
			</div>	
			<div class="contentInput">
				<span class="label l">瞬时水位</span>
				<el-input  placeholder="" v-model.number="DDList.Z.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="DDList.Z.maxv" class="input" size="small" type="number"></el-input>
			</div>	
			<div class="contentInput">
				<span class="label l">总过闸流量</span>
				<el-input  placeholder="" v-model.number="DDList.TGTQ.minv" class="input" size="small" type="number"></el-input><span style="margin:0 3px">-</span><el-input placeholder="" v-model.number="DDList.TGTQ.maxv" class="input" size="small" type="number"></el-input>
			</div>		
			<el-button type="primary" :loading="loading" @click="changed" class="submitBtn" size="small">保存</el-button>	
		</div>
	</main>
</template>

<script>
import qs from 'qs'
  export default{
    name: 'FloodNumOption',
    data () {
      return {
        labelPosition: 'center',						//label对齐方式
        ZZ: false,										//以下5条为sttp对应的显示参数控制
		TT: false,
		RR: false,
		PP: true,
		DD: false,
		loading: false,
		dataloading:false,
		ZZList:{										//以下5个List用来存放5种sttp对应的参数具体内容
			DYE: {
				type: 'DYE',
				minv: '',
				maxv: '',
			},
			Z: {
				type: 'Z',
				minv: '',
				maxv: '',
			},
			Q: {
				type: 'Q',
				minv: '',
				maxv: '',
			},
			XSA: {
				type: 'XSA',
				minv: '',
				maxv: '',
			},
			XSAVV: {
				type: 'XSAVV',
				minv: '',
				maxv: '',
			},
			XSMXV: {
				type: 'XSMXV',
				minv: '',
				maxv: '',
			},
			TGTQ: {
				type: 'TGTQ',
				minv: '',
				maxv: '',
			},
			UPZ: {
				type: 'UPZ',
				minv: '',
				maxv: '',
			},
			DWZ: {
				type: 'DWZ',
				minv: '',
				maxv: '',
			}
		},
		TTList:{
			DYE: {
				type: 'DYE',
				minv: '',
				maxv: '',
			},
			LTDZ: {
				type: 'LTDZ',
				minv: '',
				maxv: '',
			},
			HTDZ: {
				type: 'HTDZ',
				minv: '',
				maxv: '',
			}
		},
		RRList:{
			DYE: {
				type: 'DYE',
				minv: '',
				maxv: '',
			},
			Z: {
				type: 'Z',
				minv: '',
				maxv: '',
			},
			W: {
				type: 'W',
				minv: '',
				maxv: '',
			},
			INQ: {
				type: 'INQ',
				minv: '',
				maxv: '',
			},
			OTQ: {
				type: 'OTQ',
				minv: '',
				maxv: '',
			},
			BLRZ: {
				type: 'BLRZ',
				minv: '',
				maxv: '',
			},
			GTOPHGT: {
				type: 'GTOPHGT',
				minv: '',
				maxv: '',
			},
			GTQ: {
				type: 'GTQ',
				minv: '',
				maxv: '',
			},
		},
		PPList:{
			DYE: {
				type: 'DYE',
				minv: '',
				maxv: '',
			}
		},
		DDList:{
			DYE: {
				type: 'DYE',
				minv: '',
				maxv: '',
			},
			Z: {
				type: 'Z',
				minv: '',
				maxv: '',
			},
			TGTQ: {
				type: 'TGTQ',
				minv: '',
				maxv: '',
			},
		}
      }
    },
	computed: {
		getSiteStcd() {									//计算store中的siteStcd（stcd）
			return this.$store.state.siteStcd
		},
		getSiteSttp() {									//计算store中的siteSttp（sttp）
			return this.$store.state.siteSttp
		}
	},
	watch: {
		getSiteStcd(val){								//监听stcd
			if (val) {
				this.getStationNumOption(val)			//stcd变化时获取参数
				let sttp = this.$store.state.siteSttp
				this.clearOption(sttp)					//清空参数
			}
		},
		getSiteSttp(val,oldVal){						//监听sttp
			this.selecter(val)
			this.clearOption(oldVal)
		}
	},
    methods: {
		clearOption (oldVal) {							//清空参数
			let objName = this.transListName(oldVal)
			let key
			for (key in this[objName]) {
				this[objName][key].maxv = ''
				this[objName][key].minv = ''
			}		
		},
		getStationNumOption (stcd) {					//获取站点对应的参数
			this.dataloading = true
			this.$http.get(this.baseUrl + 'stationInfo/wxbxcs/' + stcd, qs.stringify({}))
			.then((res) => {
				if(res.data.code === 0){
					let data = res.data.data
					if(data.length){
						let objName = this.transListName(data[0].sttp) 
						for (let i=0;i < data.length; i++) {
							this[objName][data[i].type].maxv = data[i].maxv
							this[objName][data[i].type].minv = data[i].minv
						}	
					}
					this.dataloading = false
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		changed () {									//保存站点参数
			 this.loading = true
			let sttp = this.$store.state.siteSttp
			let stcd = this.$store.state.siteStcd
			let objName = this.transListName(sttp)
			let key 
			let dataArr = []
			for (key in this[objName]) {
				dataArr.push(this[objName][key])
			}
			this.$http({
				headers: {'Content-Type': 'application/json;charset=UTF-8'},
				method: 'put',
				url: this.baseUrl + 'stationInfo/wxbxcs/'+stcd,
				data: dataArr
			})
			.then((res) => {
				this.loading = false
				if(res.data.code === 0){
					this.$message({
						type: 'success',
						message: '保存成功'
					})
				}else{
					this.$message({
						type: 'info',
						message: '保存失败'
					})
				}
			}).catch((err) => {
				console.log(err)
				this.$message({
					type: 'info',
					message: '保存失败'
				})
			})
		},
		selecter (val) {				//sttp过滤
			if (val) {
				if (val === 'PP') {
					this.ZZ = false
					this.TT = false,
					this.RR = false,
					this.PP = true,
					this.DD = false
				} else if (val.indexOf('Z') !== -1) {
					this.ZZ = true
					this.TT =false,
					this.RR = false,
					this.PP = false,
					this.DD = false
				} else if (val === 'TT') {
					this.ZZ = false
					this.TT = true,
					this.RR = false,
					this.PP = false,
					this.DD = false
				}	else if (val === 'RR') {
					this.ZZ = false
					this.TT = false,
					this.RR = true,
					this.PP = false,
					this.DD = false
				} else if (val === 'DD') {
					this.ZZ = false
					this.TT = false,
					this.RR = false,
					this.PP = false,
					this.DD = true
				}
			}
		},
		throughSelecter () {					//通过sttp过滤
			let sttp = this.$store.state.siteSttp
			this.selecter(sttp)
		},
		transListName (sttp) {                  //通过sttp转换
			let val = sttp.slice(0,1)
			let objName = ''
			switch (val) {
				case 'D': objName = 'DDList'
				break
				case 'Z': objName = 'ZZList'
				break
				case 'R': objName = 'RRList'
				break
				case 'P': objName = 'PPList'
				break
				case 'T': objName = 'TTList'
				break
			}
			return objName
		}
	},
	created: function(){
		this.throughSelecter()
		this.getStationNumOption(this.$store.state.siteStcd)
	}
}
</script>

<style scoped>
	.floodNumMain{
		padding-top:20px;
		padding-left:20px;
		padding-right:20px;
		border-top:0;
		border:1px solid #e6e6e6;
		border-top:0;
		height:calc(100% - 40px - 80px - 3px);
		overflow-y:auto;
		
	}
	.optionTitle{
		font-size:13px;
		font-weight: 700;
		line-height:40px;
		margin-right:32px;
		margin-left:20px;
	}
	.titleBox{
		overflow:hidden;
		width:953px;
	}
	.contentBox{
		margin-bottom:10px;
		padding-left:20px;
	}
	.optionName{
		width:160px;
		line-height:38px;
		height:38px;
		text-align: center;
		background:#fafafa;
		border:1px solid #e6e6e6;
		float:left;
	}
	.optionNum{
		width:790px;
		line-height:38px;
		height:38px;
		text-align: center;
		background:#fafafa;
		border:1px solid #e6e6e6;
		border-left:0;
		float:left;
	}
	.contentInput{
		border:1px solid #e6e6e6;
		border-top:0;
		width:951px;
		height:40px;
	}
	.label{
		display:inline-block;
		line-height:40px;
		height:40px;
		width:160px;
		text-align:center;
		border-right:1px solid #e6e6e6;
		margin-right:31px
	}
	.input{
		width:360px;
		margin-top:4px;
	}
	.submitBtn{
		margin-top:20px;
		margin-left:897px;
	}
</style>