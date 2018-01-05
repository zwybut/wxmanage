<template>
	<main class="main clear">
		<h2 class="l">用户日志查询</h2>
		<div class="searchBox r">			
			<el-date-picker
      v-model="value4"
      type="datetimerange"
      :picker-options="pickerOptions2"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      size="small"
       class="dateTmeBox l">
      </el-date-picker>
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
	      <el-select v-model="valueSttp" placeholder="站类选择" size="small" class="l select" clearable>
		    <el-option
		      v-for="item in optionsSttp"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
		  <el-input v-model="phcd" placeholder="模糊查询" class="phcd l" size="small"></el-input>
		  <el-button type="primary" size="small" class="l">查询</el-button>
		</div>
		<el-table
      :data="tableData"
      style="width: 100%;margin-top:20px"
      class="l table">
      <el-table-column
        prop="stnm"
        label="站名"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="stcd"
        label="站码"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="sttp"
        label="站类"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="FloodReporter"
        label="报汛人员"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="addvcd"
        label="所在地区"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="operationTime"
        label="操作时间"
        align="center"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="operationType"
        label="操作类型"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="operationStaff"
        label="操作人员"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="移动电话"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="option"
        label="操作"
        align="center"
        >
        <template slot-scope="scope">
	        <el-button
	          @click.native.prevent="deleteRow(scope.$index, tableData)"
	          type="text"
	          size="small">
	         删除
	        </el-button>
      	</template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      class="r "
      style="margin-top:36px;">
    </el-pagination>
	</main>
</template>

<script>
import qs from 'qs'
export default{
  name: 'OperationLog',
  data () {
    return {
      pickerOptions2: {
        shortcuts: [{
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
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value4: '',
      addvcd:[],
      areaChoose: [],
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
      valueSttp: '',
      phcd: '',
      tableData: [],
      currentPage4: 1
    }
  },
  methods: {
    change (){

    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    activeMenu () {
      this.$store.commit('activeMenu', '7')
    },
    postData () {									//获取地区信息
      this.$http.get(this.baseUrl + 'comm/addvcdTree', qs.stringify({}))
      .then((res) => {
        this.areaChoose = res.data.data
        this.$store.commit('addvcd', this.areaChoose) 										//地区信息存储至store
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created: function () {
    this.activeMenu()
    this.postData()
  }
}
</script>

<style scoped>
  .main{
		height:100%;
	}
	.dateTmeBox{
		margin-right:20px;
	}
	.select{
		width:170px;
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