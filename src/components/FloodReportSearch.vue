<template>
	<main class="main">
	<h2 class="l">原报文查询</h2>
	<div class="searchBox r">
			<el-date-picker
      v-model="timer"
      type="datetimerange"
      :picker-options="pickerOptions2"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      size="small"
      :unlink-panels='trueBoolen'
       class="dateTmeBox l"
       @change="search"
       value-format="yyyy-MM-dd HH:mm:ss" :clearable="falseBoolen">
     </el-date-picker>
	      <el-select v-model="valueSttp" placeholder="站类选择" size="small" class="l select" @change="search" clearable >
		    <el-option
		      v-for="item in optionsSttp"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
		  <el-input v-model="phcd" placeholder="请输入人员/站名/站码" class="phcd l" size="small"></el-input>
		  <el-button type="primary" size="small" class="l" @click="search">查询</el-button>
		</div>
		<el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%;margin-top:20px"
      class="l table"
      stripe
      :height="clientHeight"
      v-loading="tableloading"
     element-loading-text="拼命加载中"
     element-loading-spinner="el-icon-loading"
     element-loading-background="rgba(255, 255, 255, 1)">
      <el-table-column
        prop="realName"
        label="报汛人员"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        prop="stnm"
        label="站名"
        align="center"
        width="110"
        >
      </el-table-column>
      <el-table-column
        prop="stcd"
        label="站码"
        sortable
        align="center"
        width="130"
        >
      </el-table-column>
      <el-table-column
        prop="tm"
        label="时间"
        align="center"
        sortable
        width="180"
        >
      </el-table-column>
      <el-table-column
        prop="sttp"
        label="站类"
        align="center"
        width="80"
        >
      </el-table-column>
      <el-table-column
        prop="rptContent"
        label="报汛内容"
        align="center"
        :show-overflow-tooltip='trueBoolen'
        >
      </el-table-column>
      <el-table-column
        prop="modiTime"
        label="报汛时间"
        align="center"
        sortable
        width="180"
        >
      </el-table-column>
      <el-table-column
        prop="option"
        label="操作"
        align="center"
        width="136"
        >
        <template slot-scope="scope">
        	<el-button type="text" size="small" @click="replyRow(scope)">回复</el-button>
	        <!-- <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small"> 删除</el-button>       -->
      	</template>
      </el-table-column>
    </el-table>
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
  name: 'FloodReportSearch',
  data () {
    return {
      falseBoolen: false,  
      trueBoolen: true,                       //为true的布尔值
      pickerOptions2: {                       //时间选择器
        shortcuts: [{                         //时间选择器自定义时间段
          text: '今天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      timer: [],                         //时间选择器的时间
      optionsSttp: [{                    //站类选择器
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
      valueSttp: '',                    //站点选择器选中值
      tableData: [],                    //table数据
      phcd: '',                         //模糊查询
      total: 333,                       //分页器数据总条数
      currentPage:1,                    //分页器选中页码
      pagesize:50,                      //分页器每页显示的数量
      tableloading:false,
      replyForm: {                      //回复弹窗数据
      	name: '',
        content: '',
        openId:'',
      },
      reply: false,                       //回复弹窗显示控制
      formLabelWidth: '72px',             //label的统一宽度
      clientHeight: 0                     //table可视区高度
    }
  },
  methods: {
    sureReply () {
      this.reply = false
      let openId = this.replyForm.openId
      let content = this.replyForm.content
      console.log(content)
      this.$http.post(this.baseUrl + 'WXUser/wxuser/' + 'o-jv3sg21FVq9nMxBxdp7anJ8IDM', qs.stringify({'data': content}))
      .then((res) => {
        console.log(res)
        if (res.data.code === 0) {
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
    },
    cancleReply () {                      //取消回复
  	  this.reply = false
  	  this.audit = false
  	},
    replyRow (scope) {                    //回复弹窗显示
			let that = this
  	  this.reply = true
  	  this.replyForm.name = scope.row.realName
  	  this.replyForm.openId= scope.row.openId
  	},
  	handleSizeChange (size) {             //选择分页器每页显示的数量
      this.pagesize = size
    },
    handleCurrentChange (currentPage){    //分页器页码选择
      this.currentPage = currentPage
    },
  	search () {                           //查询
  	  console.log(this.timer)
  	  if(this.timer){
  	  	this.getTableData(this.timer[0],this.timer[1],this.valueSttp,this.phcd)
  	  }else{
  	  	this.getTableData(null,null,this.valueSttp,this.phcd)
  	  }
  	},
  	deleteRow (index,val) {               //删除信息
  		console.log(val[index])
      let id = val[index].id
      let that = this
      this.$confirm('此操作将永久删除该报汛信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(this.baseUrl + 'BXInfo/RGBX_RPT/'+id, qs.stringify({}))
        .then(function (res) {
          console.log(res)
          val.splice(index,1)             //删除此条
          that.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(function (err) {
          console.log(err)
          that.$message({
            type: 'info',
            message: '删除失败'
          })
        })
      }).catch(() => {})
  	},
    getNowATime (tm) {
      let now = new Date(tm)
      let year = now.getFullYear()
      let month = now.getMonth()+1
      let day = now.getDate()
      let hour = now.getHours()
      let minutes = now.getMinutes()
      let seconds = now.getSeconds()
      return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds
    },
		time(){
        this.timer = []
        let now = new Date().getTime()
        let yet = now - 1000*3600*24*3
        this.getNowATime(yet)
        this.getNowATime(now)
        this.timer = [this.getNowATime(yet),this.getNowATime(now)]
        setTimeout(() => {
          this.getTableData(this.getNowATime(yet), this.getNowATime(now),null,null)
        }, 30);

    },
  	getTableData (startTime, endTime, sttp, phcd) {             //获取报汛table数据
    this.tableData = []
  	  this.tableloading = true
      let that = this
      console.log(startTime, endTime, sttp, phcd)
      this.$http.post(this.baseUrl + 'BXInfo/RGBX_RPT', qs.stringify({startTm: startTime, endTm: endTime, sttp: sttp, phcd: phcd}))
      .then((res) => {
      	 console.log(res)
      	if(res.data.code === 0 ){
      	  // console.log(res.data.data)
          let data = res.data.data
          that.total = data.length
          let arr = []
          if(data.length){
            for (var i = 0; i < data.length; i++) {
              let obj = data[i]
              obj.tm = that.timeTrans(data[i].tm)
							obj.sttp = this.sttpTransform(data[i].sttp)
              obj.modiTime = that.timeTrans(data[i].modiTime)
              arr.push(obj)
            }
            that.tableData = arr
          }
      	}
      	that.tableloading = false
      }).catch((err) => {
        console.log(err)
      })
    },
    activeMenu () {
      this.$store.commit('activeMenu', '4')             //将header默认选中为报汛信息查询
    },
		getClientHeight () {                    //获取table可视区高度
			this.clientHeight = this.getClientAtBegin()
		}
  },
  created: function () {
    this.activeMenu()
		this.time()
  	this.getClientHeight()
  }
}
</script>

<style>
	.main{
		height:100%;
	}
	.dateTmeBox{
		width:280px;
		margin-right:20px;
	}
	.select{
		width:190px;
		margin-right:20px;
	}
	.phcd{
		width:190px;
	}
	.table{
		width:100%;
		margin-top:10px;
		height:calc(100% - 180px);
		overflow-x: hidden;
	}
	.block{
		margin-top:30px;
	}
</style>
