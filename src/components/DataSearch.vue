<template>
	<main class="main">
	<h2 class="l">数据查询</h2>
	<div class="searchBox r">	
		<el-select v-model="valueAddvcd" placeholder="数据源选择" size="small" class="l select">
		    <el-option
		      v-for="item in optionsAddvcd"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
        <el-select v-model="valueAddvcd" placeholder="地区选择" size="small" class="l select">
		    <el-option
		      v-for="item in optionsAddvcd"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
	      <el-select v-model="valueSttp" placeholder="站类选择" size="small" class="l select">
		    <el-option
		      v-for="item in optionsSttp"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
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
		  <el-button type="primary" size="small" class="l" style="width:90px;">导出</el-button>
		</div>
		<el-table
    :data="tableData3"
    style="width: 100%;margin-top:20px;"
    class="l"
    size="small"
        >
    <el-table-column
      prop="stnm"
      label="站名"
      align="center">
    </el-table-column>
      <el-table-column
        prop="stcd"
        label="站码"
        align="center">
      </el-table-column>
        <el-table-column
          prop="sttp"
          label="站类"
         align="center">
        </el-table-column>
        <el-table-column
          prop="reportTime"
          label="上报时间"
          align="center">
        </el-table-column>
        <el-table-column label="日统计" align="center">
        	<el-table-column
          prop="daypp"
          label="雨量"
          align="center">
        </el-table-column>
        <el-table-column
          prop="daybb"
          label="蒸发"
          align="center">
        </el-table-column>
        <el-table-column
          prop="dayqq"
          label="天气"
          align="center">
        </el-table-column>
        <el-table-column
          prop="dayzz"
          label="水位"
          align="center">
        </el-table-column>
        </el-table-column>
        <el-table-column label="瞬时信息" align="center">
	        <el-table-column
	          prop="nowzz"
	          label="水位"
	          align="center">
	        </el-table-column>
	        <el-table-column
          prop="nowww"
          label="水势"
          align="center">
        </el-table-column>
        </el-table-column>
        <el-table-column label="旬统计" align="center">
        	<el-table-column
          prop="xunpp"
          label="雨量"
          align="center">
        </el-table-column>
        <el-table-column
          prop="xunzz"
          label="水位"
          align="center">
        </el-table-column>
        </el-table-column>
        <el-table-column label="月统计" align="center">
        	<el-table-column
          prop="monthpp"
          label="雨量"
          align="center">
        </el-table-column>
        <el-table-column
          prop="monthzz"
          label="水位"
          align="center">
        </el-table-column>
        </el-table-column>
  </el-table>
	</main>

</template>
<script>
  export default{
    name: 'DataSearch',
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
        optionsAddvcd: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        valueAddvcd: '',
        optionsSttp: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        valueSttp: '',
        tableData3: []
      }
    },
    methods: {
      activeMenu () {
        this.$store.commit('activeMenu', '5')
      }
    },
    created: function () {
      this.activeMenu()
    }
  }
</script>
<style>
	h2{
		width:100px;
	}
	.dateTmeBox{
		width:330px;
		margin-right:20px;
	}
	.select{
		width:190px;
		margin-right:20px;
	}
</style>
