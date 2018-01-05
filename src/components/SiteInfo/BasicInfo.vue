<template>
<div class="basicForm">
<el-form :label-position="labelPosition" label-width="82px" :model="ruleForm" size="small" class=" clear">
  <el-form-item label="站点名称" >
    <el-input v-model="ruleForm.stnm" class="basicInput"></el-input>
  </el-form-item>
  <el-form-item label="站点编码">
    <el-input v-model="ruleForm.stcd" class="basicInput"></el-input>
  </el-form-item>
  <el-form-item label="河道名称">
    <el-input v-model="ruleForm.rvnm" class="basicInput"></el-input>
  </el-form-item>
  <el-form-item label="水系名称">
    <el-input v-model="ruleForm.hnnm" class="basicInput"></el-input>
  </el-form-item>
  <el-form-item label="流域名称">
    <el-input v-model="ruleForm.bsnm" class="basicInput"></el-input>
  </el-form-item>
  <el-form-item label="经纬度">
    <el-input v-model="ruleForm.lgtd" class="basicInput LGTD TD"></el-input><span class="l" style="margin:0 4px;">,</span>
    <el-input v-model="ruleForm.lttd" class="basicInput LTTD TD"></el-input>
  </el-form-item>
  <el-form-item label="站点类别" prop="region">
    <el-select v-model="ruleForm.sttp" placeholder="请选择活动区域" class="basicInput">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="行政区规划">
    <el-input v-model="ruleForm.addvcd" class="basicInput"></el-input>
  </el-form-item>
  <el-form-item label="报汛等级" prop="region">
    <el-select v-model="ruleForm.frgrd" placeholder="请选择活动区域" class="basicInput">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="报汛项目" prop="region">
    <el-input v-model="ruleForm.item" class="basicInput"></el-input>
  </el-form-item>
  <el-form-item label="拼音码">
    <el-input v-model="ruleForm.phcd" class="basicInput"></el-input>
  </el-form-item>
  <el-form-item label="隶属单位">
    <el-input v-model="ruleForm.atcunit" class="basicInput"></el-input>
  </el-form-item>
  <el-form-item label="管理单位">
    <el-input v-model="ruleForm.admauth" class="basicInput"></el-input>
  </el-form-item>
  <el-form-item label="交换单位">
    <el-input v-model="ruleForm.locality" class="basicInput"></el-input>
  </el-form-item>
  <el-form-item label="建站年月" >
    <el-date-picker type="month" placeholder="选择日期" v-model="ruleForm.esstym" style="width: 100%;"></el-date-picker>
  </el-form-item>
  <el-form-item label="始报年月" >
    <el-date-picker type="month" placeholder="选择日期" v-model="ruleForm.bgfrym" style="width: 100%;"></el-date-picker>
  </el-form-item>
  <el-form-item label="站点地址" class='special'>
    <el-input v-model="ruleForm.stlc" class="adressInput"></el-input>
  </el-form-item>
  <el-form-item label="备注说明" class="textArea">
    <el-input type="textarea" v-model="ruleForm.comments" class="textArea"></el-input>
  </el-form-item>
</el-form>
<el-button type="primary" :loading="loading" @click="changed" class="submitBtn" size="small">提交</el-button>
</div>
</template>

<script>
import qs from 'qs'
  export default{
    name: 'BasicInfo',
    data () {
      return {
        labelPosition: 'left',                 //label的对其方式
        ruleForm: {                            //站点基础信息每个对应的key
          stnm: '',
          stcd: '',
          rvnm: '',
          hnnm: '',
          bsnm: '',
          lgtd: '',
          lttd: '',
          sttp: '',
          addvcd: '',
          frgrd: '',
          item: '',
          phcd: '',
          atcunit: '',
          admauth: '',
          locality: '',
          esstym: '',
          bgfrym: '',
          stlc: '',
          comments: ''
        },                      
        loading: false
      }
    },  
    computed: {
      getSiteStcd() {                 //计算store中的siteStcd（stcd）
        return this.$store.state.siteStcd
      }
    },
    watch: {
      getSiteStcd(val){                 //监听stcd的变化
        console.log(val)
        if (val) {
          this.getSiteBasicInfo(val)      //触发获取站点基础信息的函数
        }
      }
    },
    methods: {
      getSiteBasicInfo (stcd) {             //获取站点基础信息的函数
        this.$http.get(this.baseUrl + 'stationInfo/stationBaseInfo/'+stcd)
        .then((res) => {
          console.log(res)
          if(res.data.code === 0){
            console.log(res.data.data)
            let data = res.data.data
            let obj = {}
            obj.stnm = data.stnm
            obj.stcd = data.stcd
            obj.rvnm = data.rvnm
            obj.hnnm = data.hnnm
            obj.bsnm = data.bsnm
            obj.lgtd = data.lgtd
            obj.lttd = data.lttd
            obj.sttp = data.sttp
            obj.addvcd = data.addvcd
            obj.frgrd = data.frgrd
            obj.phcd = data.phcd
            obj.atcunit = data.atcunit
            obj.admauth = data.admauth
            obj.locality = data.locality
            if(data.esstym&&data.esstym.length === 6){
              obj.esstym = data.esstym.substring(0,4)+'-'+data.esstym.substring(4)
            }else{
              obj.esstym = ''
            }
            if(data.bgfrym&&data.bgfrym.length === 6){
              obj.bgfrym = data.bgfrym.substring(0,4)+'-'+data.bgfrym.substring(4)
            }else{
              obj.bgfrym = ''
            }
            obj.stlc = data.stlc
            obj.item = data.item === null?'-':data.item
            obj.comments = data.comments
            this.ruleForm = obj
            console.log(obj)
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      changed () {                            //修改站点基础信息后提交的函数
        this.loading = true
        let ruleForm = JSON.parse(JSON.stringify(this.ruleForm))
        ruleForm.esstym = ruleForm.esstym.split('-')[0]+ruleForm.esstym.split('-')[1]
        ruleForm.bgfrym = ruleForm.bgfrym.split('-')[0]+ruleForm.bgfrym.split('-')[1]
        ruleForm.item = ruleForm.item === '-'?null:ruleForm.item
        console.log(ruleForm)
        this.$http.put(this.baseUrl + 'stationInfo/stationBaseInfo/', qs.stringify(ruleForm))
        .then((res) => {
          if(res.data.code === 0){
            this.loading = false
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }else{
            this.loading = false
            this.$message({
              type: 'info',
              message: '修改失败!'
            })
          }
        }).catch((err) => {
          console.log(err)
          this.$message({
            type: 'info',
            message: '修改失败!'
          })
        })
      },
      getBasicBegin () {                       //打开时获取基础信息
        let siteStcd = this.$store.state.siteStcd
        console.log(siteStcd)
        if (siteStcd) {
          this.getSiteBasicInfo(siteStcd)
        } 
      }
    },
    created: function () {
      this.getBasicBegin()
    }
  }
</script>
<style scoped>
	.basicInput{
		width:320px;
    float:left;
	}
	.adressInput{
		width:742px;
	}
	.basicForm{
		height:calc(100% - 40px - 80px - 3px);
		border:1px solid #e6e6e6;
		border-top:0;
		padding-top:20px;
    overflow-y:auto;
	}
	.el-form-item{
		width:402px;
		float:left;	
		margin-left:20px;
	}
  .submitBtn{
    float:right;
    margin-right:calc(100% - 742px - 82px - 20px);
    margin-bottom:20px;
  }
	.special{
		width:800px;
	}
	.textArea{
		width:742px;
	}
  .TD{
    width:154px;
  } 
  
</style>