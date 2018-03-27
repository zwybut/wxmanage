<template>
<div class="basicForm">
<el-form :label-position="labelPosition" label-width="82px" :rules="rules" :model="ruleForm" ref="ruleForm" size="small" class=" clear">
  <el-form-item label="站点名称" prop="stnm">
    <el-input v-model="ruleForm.stnm" class="basicInput"></el-input>
  </el-form-item>
  <el-form-item label="站点编码" prop="stcd">
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
    <el-input v-model="ruleForm.lgtd" class="basicInput LGTD TD" placeholder="东经"></el-input><span class="l" style="margin:0 4px;">,</span>
    <el-input v-model="ruleForm.lttd" class="basicInput LTTD TD" placeholder="北纬"></el-input>
  </el-form-item>
  <el-form-item label="站点类别" prop="sttp">
    <el-select v-model="ruleForm.sttp" placeholder="请选择活动区域" class="basicInput" >
      <el-option
        v-for="item in sttpOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="行政区划" prop="addvcd">
    <el-cascader
		    expand-trigger="hover"
		    :options="areaChoose"
        @change="addvcdchange"
		    v-model="addvcdVal"
		     class="basicInput l"
		     size="small"
		     clearable
		     placeholder="地区选择">
		  </el-cascader>
    <!-- <el-input v-model.number="ruleForm.addvcd" class="basicInput"></el-input> -->
  </el-form-item>
  <el-form-item label="报汛等级">
    <el-select v-model="ruleForm.frgrd" placeholder="报汛等级" class="basicInput" >
      <el-option
        v-for="item in frgrdOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="报汛项目">
    <el-select v-model="itemValue" multiple placeholder="请选择报汛项目" class="basicInput" size="small">
      <el-option
        v-for="item in itemOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
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
  <el-form-item label="交换单位" prop="locality">
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
<el-button type="primary" :loading="loading" @click="changed" class="submitBtn" size="small">保存</el-button>
</div>
</template>

<script>
import qs from 'qs'
  export default{
    name: 'BasicInfo',
    data () {
      let stcdValidator = (rule, value, callback) => {
        if (!value) {
          callback(new Error('站码不能为空'))
        }else{  
          console.log(value.length)
          if(value.length > 8){
            callback(new Error('站码不能超过8位'))
          }else{
            if( this.$store.state.addSite ){
              this.$http.get(this.baseUrl + 'stationInfo/authStcd/' + value, qs.stringify({}))
              .then((res) => {
                if(res.data.code != 0){
                  callback(new Error('站码已存在'))
                }else{
                  callback()
                }

              }).catch((err) => {
                console.log(err)
              })
            }
          }         
        }        
      }
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
          comments: '',
          
        },
        rules: {
          stnm: [
            { required: true, message: '站名不能为空！', trigger: 'blur' },
          ],
          sttp: [
            { required: true, message: '站类不能为空！', trigger: 'blur' },
          ],
          addvcd: [
            { required: true, message: '行政区划不能为空！', trigger: 'blur' },
          ],
          stcd: [
            {required: true,validator: stcdValidator, trigger: 'blur' , }
          ],
          locality: [
            { required: true, message: '交换单位不能为空', trigger: 'blur' }
          ],
        },
        areaChoose:[],
        itemValue:[],
        addvcdVal:[],
        frgrdOptions:[{
          value: '1',
          label: '中央报汛站'
        }, {
          value: '2',
          label: '省级重点报汛站'
        }, {
          value: '3',
          label: '省级一般报汛站'
        }, {
          value: '4',
          label: '其他报汛站'
        }, {
          value: '5',
          label: '山洪报汛站'
        }],
        sttpOptions:[{
          value: 'PP',
          label: '雨量站'
        }, {
          value: 'RR',
          label: '水库站'
        }, {
          value: 'ZZ',
          label: '河道站'
        }, {
          value: 'DD',
          label: '闸坝站'
        }, {
          value: 'TT',
          label: '潮位站'
        }, {
          value: 'EE',
          label: '蒸发站'
        }],
        itemOptions: [{
          value: 'P',
          label: '雨量'
        }, {
          value: 'Z',
          label: '水位'
        }, {
          value: 'Q',
          label: '流量'
        }, {
          value: 'E',
          label: '蒸发'
        }, {
          value: 'S',
          label: '墒情'
        }],
        loading: false
      }
    },
    computed: {
      
      addSite (){
        return this.$store.state.addSite
      },
      getSiteStcd() {                 //计算store中的siteStcd（stcd）
        return this.$store.state.siteStcd
      }
    },
    watch: {
      addSite (val0,val1) {
        console.log(val0,val1)
        if(val0 != val1){
          this.ruleForm = {}
          this.itemValue = []
          // this.areaChoose = []
          this.addvcdVal = []
        }
      },
      getSiteStcd(val){                 //监听stcd的变化
        if (val) {
          this.getSiteBasicInfo(val)      //触发获取站点基础信息的函数 
        }
      }
    },
    methods: {
      addvcdchange () {
        if(this.addvcdVal[1]){
          this.ruleForm.addvcd = this.addvcdVal[1]
        }else{
          this.ruleForm.addvcd = this.addvcdVal[0]
        }
        
        console.log(this.ruleForm.addvcd)
      },
      addvcdData () {									//获取地区信息
        this.$http.get(this.baseUrl + 'comm/addvcdTree', qs.stringify({}))
        .then((res) => {
          console.log(res)
          this.areaChoose = res.data.data
        }).catch((err) => {
          console.log(err)
        })
      },
      getSiteBasicInfo (stcd) {             //获取站点基础信息的函数
      this.addvcdVal = []
        this.$http.get(this.baseUrl + 'stationInfo/stationBaseInfo/'+stcd)
        .then((res) => {
          if(res.data.code === 0){
            let data = res.data.data
            
            let obj = data
            let fatherAddvcd
            if(data.addvcd.lastIndexOf('00')!=-1){
              fatherAddvcd = data.addvcd
            }
            else{
              fatherAddvcd = data.addvcd.substring(0,4)+'00'
            }
            this.addvcdVal.push(fatherAddvcd)
            this.addvcdVal.push(data.addvcd)
            if(data.esstym&&data.esstym.length === 6){
              obj.esstym = data.esstym.substring(0,4)+'-'+data.esstym.substring(4)
            }else{
              obj.esstym = null
            }
            if(data.bgfrym&&data.bgfrym.length === 6){
              obj.bgfrym = data.bgfrym.substring(0,4)+'-'+data.bgfrym.substring(4)
            }else{
              obj.bgfrym = null
            }
            this.ruleForm = obj
            if(data.item != null){
              this.itemValue = data.item.split('')
            }else{
              this.itemValue = []
            }
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      changed () {                            //修改站点基础信息后提交的函数
        this.loading = true
        let ruleForm = this.ruleForm
        if(ruleForm.esstym) ruleForm.esstym = ruleForm.esstym.split('-')[0]+ruleForm.esstym.split('-')[1]
        if(ruleForm.bgfrym) ruleForm.bgfrym = ruleForm.bgfrym.split('-')[0]+ruleForm.bgfrym.split('-')[1]
        for (let key in ruleForm) {
          if(ruleForm[key] == '' || ruleForm[key] == null){
            delete ruleForm[key]
          }
        }
        console.log(ruleForm)
        if(this.itemValue.length > 0){
          ruleForm.item = this.itemValue.join('')
        }
        if(this.$store.state.addSite){
          this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
              this.$http.post(this.baseUrl + 'stationInfo/stationBaseInfo', qs.stringify(ruleForm))
              .then((res) => {
                console.log(res)
                if(res.data.code === 0){
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  })
                  this.$store.commit('siteSttp',ruleForm.sttp)                       //将sttp存储至store
                  this.$store.commit('siteStcd',ruleForm.stcd)
                  this.$store.commit('newSiteObj',ruleForm)
                  this.$store.commit('addOrDeleteEnd',true)
                  this.$store.commit('addSite',false)
                  this.$router.push('/SiteInfo')
                }else{
                  this.$message({
                    type: 'info',
                    message: '添加失败!'+res.data.msg
                  })
                }
              }).catch((err) => {
                console.log(err)
                this.$message({
                  type: 'info',
                  message: '添加失败!'
                })
              })
            } else {
              this.$message({
                  type: 'info',
                  message: '基础数据存在错误无法提交!'
                })
              return false
            }
          })
        }else{
          this.$http.put(this.baseUrl + 'stationInfo/stationBaseInfo', qs.stringify(ruleForm))
          .then((res) => {
            if(res.data.code === 0){
              console.log(res)
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
            }else{
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
        }
        this.loading = false
      },
      getBasicBegin () {                       //打开时获取基础信息
        let siteStcd = this.$store.state.siteStcd
        if (siteStcd) {
          this.getSiteBasicInfo(siteStcd)
        }
      }
    },
    mounted(){
      this.addvcdData()
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
