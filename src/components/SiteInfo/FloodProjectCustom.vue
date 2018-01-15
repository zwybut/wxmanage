<template>
	<main class="projectMain"
	v-loading="dataloading"
	element-loading-text="拼命加载中"
	element-loading-spinner="el-icon-loading"
	element-loading-background="rgba(255, 255, 255, 1)">
		<div class="" v-if="ZZ">	
			<div class="projectBox">
				<span class="projectName">日统计</span>
				<div  class="checkList">		
			    <el-checkbox label="日降雨量" v-model="ZZcheckList['ST_PPTN_R|DRP']" alt="ST_PPTN_R|DRP" @change="checkChange"></el-checkbox>
			    <el-checkbox label="目前天气" v-model="ZZcheckList['ST_PPTN_R|WTH']" alt="ST_PPTN_R|WTH" @change="checkChange"></el-checkbox>
					<el-checkbox label="日蒸发量" v-model="ZZcheckList['ST_DAYEV_R|DYE']" alt="ST_DAYEV_R|DYE" type="DYE" @change="checkChange"></el-checkbox>
			    <el-checkbox label="蒸发器类型" v-model="ZZcheckList['ST_DAYEV_R|EPTP']" alt="ST_DAYEV_R|EPTP" @change="checkChange"></el-checkbox>
			    <el-checkbox label="日均水位" v-model="ZZcheckList['ST_RVAV_R__D|AVZ']" alt="ST_RVAV_R__D|AVZ" @change="checkChange"></el-checkbox>
			    <el-checkbox label="日均流量" v-model="ZZcheckList['ST_RVAV_R__D|AVQ']" alt="ST_RVAV_R__D|AVQ" @change="checkChange"></el-checkbox>
			  </div>
			</div>	
			<div class="projectBox">
				<span class="projectName">瞬时信息</span>
				<div  class="checkList">		
			    <el-checkbox label="瞬时水位" v-model="ZZcheckList['ST_RIVER_R|Z']" alt="ST_RIVER_R|Z" type="Z" @change="checkChange"></el-checkbox>
					<el-checkbox label="水势" v-model="ZZcheckList['ST_RIVER_R|WPTN']" alt="ST_RIVER_R|WPTN" @change="checkChange"></el-checkbox>
			    <el-checkbox label="流量" v-model="ZZcheckList['ST_RIVER_R|Q']" alt="ST_RIVER_R|Q" type="Q" @change="checkChange"></el-checkbox>
			    <el-checkbox label="断面过水面积" v-model="ZZcheckList['ST_RIVER_R|XSA']" alt="ST_RIVER_R|XSA" type="XSA" @change="checkChange"></el-checkbox>
			    <el-checkbox label="断面平均流速" v-model="ZZcheckList['ST_RIVER_R|XSAVV']" alt="ST_RIVER_R|XSAVV" type="XSAVV" @change="checkChange"></el-checkbox>
			    <el-checkbox label="断面最大流速" v-model="ZZcheckList['ST_RIVER_R|XSMXV']" alt="ST_RIVER_R|XSMXV" type="XSMXV" @change="checkChange"></el-checkbox>
			    <el-checkbox label="河水特征值" v-model="ZZcheckList['ST_RIVER_R|FLWCHRCD']" alt="ST_RIVER_R|FLWCHRCD" @change="checkChange"></el-checkbox>
			    <el-checkbox label="测流方式" v-model="ZZcheckList['ST_RIVER_R|MSQMT']" alt="ST_RIVER_R|MSQMT" @change="checkChange"></el-checkbox>
			    <el-checkbox label="测积方法" v-model="ZZcheckList['ST_RIVER_R|MSAMT']" alt="ST_RIVER_R|MSAMT" @change="checkChange"></el-checkbox>
			    <el-checkbox label="测速方法" v-model="ZZcheckList['ST_RIVER_R|MSVMT']" alt="ST_RIVER_R|MSVMT" @change="checkChange"></el-checkbox>
			  </div>
			</div>
			<div class="projectBox">
				<span class="projectName">旬统计</span>
				<div  class="checkList">		
			    <el-checkbox label="旬降雨量" v-model="ZZcheckList['ST_PSTAT_R__X|ACCP']" alt="ST_PSTAT_R__X|ACCP" @change="checkChange"></el-checkbox>
					<el-checkbox label="旬平均水位" v-model="ZZcheckList['ST_RVAV_R__X|AVZ']" alt="ST_RVAV_R__X|AVZ" @change="checkChange"></el-checkbox>
			    <el-checkbox label="旬均流量" v-model="ZZcheckList['ST_RVAV_R__X|AVQ']" alt="ST_RVAV_R__X|AVQ" @change="checkChange"></el-checkbox>
			  </div>
			</div>	
			<div class="projectBox">
				<span class="projectName">月统计</span>
				<div  class="checkList">		
			    <el-checkbox label="月降雨量" v-model="ZZcheckList['ST_PSTAT_R__Y|ACCP']" alt="ST_PSTAT_R__Y|ACCP" @change="checkChange"></el-checkbox>
					<el-checkbox label="月平均水位" v-model="ZZcheckList['ST_RVAV_R__Y|AVZ']" alt="ST_RVAV_R__Y|AVZ" @change="checkChange"></el-checkbox>
			    <el-checkbox label="月均流量" v-model="ZZcheckList['ST_RVAV_R__Y|AVQ']" alt="ST_RVAV_R__Y|AVQ" @change="checkChange"></el-checkbox>
			  </div>
			</div>	
		</div>
		<div class="" v-if="TT">		
			<div class="projectBox">
				<span class="projectName">日统计</span>
				<div  class="checkList">		
					<el-checkbox label="日降雨量" v-model="TTcheckList['ST_PPTN_R|DRP']" alt="ST_PPTN_R|DRP" @change="checkChange"></el-checkbox>
			    <el-checkbox label="目前天气" v-model="TTcheckList['ST_PPTN_R|WTH']" alt="ST_PPTN_R|WTH" @change="checkChange"></el-checkbox>
					<el-checkbox label="日蒸发量" v-model="TTcheckList['ST_DAYEV_R|DYE']" alt="ST_DAYEV_R|DYE" type="DYE" @change="checkChange"></el-checkbox>
					<el-checkbox label="蒸发器类型" v-model="TTcheckList['ST_DAYEV_R|EPTP']" alt="ST_DAYEV_R|EPTP" @change="checkChange"></el-checkbox>
			  </div>
			</div>	
			<div class="projectBox">
				<span class="projectName">水位</span>
				<div  class="checkList">		
					<el-checkbox label="瞬时水位" v-model="TTcheckList['ST_RIVER_R|Z']" alt="ST_RIVER_R|Z" type="Z" @change="checkChange"></el-checkbox>
					<el-checkbox label="水势" v-model="TTcheckList['ST_RIVER_R|WPTN']" alt="ST_RIVER_R|WPTN" @change="checkChange"></el-checkbox>
			  </div>
			</div>
			<div class="projectBox">
				<span class="projectName">高高潮位</span>
				<div  class="checkList">		
			    <el-checkbox label="观测时间" v-model="TTcheckList['ST_TIDE_R__HH|TM']" alt="ST_TIDE_R__HH|TM" @change="checkChange"></el-checkbox>
			    <el-checkbox label="瞬时水位" v-model="TTcheckList['ST_TIDE_R__HH|TDZ']" alt="ST_TIDE_R__HH|TDZ" type="HTDZ" @change="checkChange"></el-checkbox>
			  </div>
			</div>		
			<div class="projectBox">
				<span class="projectName">低高潮位</span>
				<div  class="checkList">		
			    <el-checkbox label="观测时间" v-model="TTcheckList['ST_TIDE_R__LH|TM']" alt="ST_TIDE_R__LH|TM" @change="checkChange"></el-checkbox>
			    <el-checkbox label="瞬时水位" v-model="TTcheckList['ST_TIDE_R__LH|TDZ']" alt="ST_TIDE_R__LH|TDZ" type="HTDZ" @change="checkChange"></el-checkbox>
			  </div>
			</div>	
			<div class="projectBox">
				<span class="projectName">低低潮位</span>
				<div  class="checkList">		
			    <el-checkbox label="观测时间" v-model="TTcheckList['ST_TIDE_R__LL|TM']" alt="ST_TIDE_R__LL|TM" @change="checkChange"></el-checkbox>
			    <el-checkbox label="瞬时水位" v-model="TTcheckList['ST_TIDE_R__LL|TDZ']" alt="ST_TIDE_R__LL|TDZ" type="LTDZ" @change="checkChange"></el-checkbox>
			  </div>
			</div>	
			<div class="projectBox">
				<span class="projectName">高低潮位</span>
				<div  class="checkList">		
					<el-checkbox label="观测时间" v-model="TTcheckList['ST_TIDE_R__HL|TM']" alt="ST_TIDE_R__HL|TM" @change="checkChange"></el-checkbox>
			    <el-checkbox label="瞬时水位" v-model="TTcheckList['ST_TIDE_R__HL|TDZ']" alt="ST_TIDE_R__HL|TDZ" type="LTDZ" @change="checkChange"></el-checkbox>
			  </div>
			</div>
			<div class="projectBox">
				<span class="projectName">旬统计</span>
				<div  class="checkList">		
					<el-checkbox label="旬降雨量" v-model="TTcheckList['ST_PSTAT_R__X|ACCP']" alt="ST_PSTAT_R__X|ACCP" @change="checkChange"></el-checkbox>
					<el-checkbox label="旬平均高潮位" v-model="TTcheckList['ST_TIDEAV_R__X|AVHTDZ']" alt="ST_TIDEAV_R__X|AVHTDZ" @change="checkChange"></el-checkbox>
			    <el-checkbox label="旬平均低潮位" v-model="TTcheckList['ST_TIDEAV_R__X|AVLTDZ']" alt="ST_TIDEAV_R__X|AVLTDZ" @change="checkChange"></el-checkbox>
			  </div>
			</div>	
			<div class="projectBox">
				<span class="projectName">月统计</span>
				<div  class="checkList">		
					<el-checkbox label="月降雨量" v-model="TTcheckList['ST_PSTAT_R__Y|ACCP']" alt="ST_PSTAT_R__Y|ACCP" @change="checkChange"></el-checkbox>
					<el-checkbox label="月平均高潮位" v-model="TTcheckList['ST_TIDEAV_R__Y|AVHTDZ']" alt="ST_TIDEAV_R__Y|AVHTDZ" @change="checkChange"></el-checkbox>
			    <el-checkbox label="月平均低潮位" v-model="TTcheckList['ST_TIDEAV_R__Y|AVLTDZ']" alt="ST_TIDEAV_R__Y|AVLTDZ" @change="checkChange"></el-checkbox>
			  </div>
			</div>
		</div>
		<div class="" v-if="RR">	
			<div class="projectBox">
				<span class="projectName">日统计</span>
				<div  class="checkList">		
			    <el-checkbox label="日降雨量" v-model="RRcheckList['ST_PPTN_R|DRP']" alt="ST_PPTN_R|DRP" @change="checkChange"></el-checkbox>
			    <el-checkbox label="目前天气" v-model="RRcheckList['ST_PPTN_R|WTH']" alt="ST_PPTN_R|WTH" @change="checkChange"></el-checkbox>
					<el-checkbox label="日蒸发量" v-model="RRcheckList['ST_DAYEV_R|DYE']" alt="ST_DAYEV_R|DYE" type="DYE" @change="checkChange"></el-checkbox>
			    <el-checkbox label="蒸发器类型" v-model="RRcheckList['ST_DAYEV_R|EPTP']" alt="ST_DAYEV_R|EPTP" @change="checkChange"></el-checkbox>
			    <el-checkbox label="日均库水位" v-model="RRcheckList['ST_RSVRAV_R__D|AVRZ']" alt="ST_RSVRAV_R__D|AVRZ" @change="checkChange"></el-checkbox>
			    <el-checkbox label="日均库蓄水量" v-model="RRcheckList['ST_RSVRAV_R__D|AVW']" alt="ST_RSVRAV_R__D|AVW" @change="checkChange"></el-checkbox>
			    <el-checkbox label="日均入库流量" v-model="RRcheckList['ST_RSVRAV_R__D|AVINQ']" alt="ST_RSVRAV_R__D|AVINQ" @change="checkChange"></el-checkbox>
			    <el-checkbox label="日均总出库流量" v-model="RRcheckList['ST_RSVRAV_R__D|AVOTQ']" alt="ST_RSVRAV_R__D|AVOTQ" @change="checkChange"></el-checkbox>
			  </div>
			</div>			
			<div class="projectBox">
				<span class="projectName">瞬时信息</span>
				<div  class="checkList">		
			    <el-checkbox label="瞬时水位" v-model="RRcheckList['ST_RSVR_R|RZ']" alt="ST_RSVR_R|RZ" type="Z" @change="checkChange"></el-checkbox>
			    <el-checkbox label="水势" v-model="RRcheckList['ST_RSVR_R|RWPTN']" alt="ST_RSVR_R|RWPTN" @change="checkChange"></el-checkbox>
			    <el-checkbox label="瞬时库容(百万)" v-model="RRcheckList['ST_RSVR_R|W']" alt="ST_RSVR_R|W" type="W" @change="checkChange"></el-checkbox>
			    <el-checkbox label="瞬时入流" v-model="RRcheckList['ST_RSVR_R|INQ']" alt="ST_RSVR_R|INQ" type="INQ" @change="checkChange"></el-checkbox>
			    <el-checkbox label="瞬时出流" v-model="RRcheckList['ST_RSVR_R|OTQ']" alt="ST_RSVR_R|OTQ" type="OTQ" @change="checkChange"></el-checkbox>
			    <el-checkbox label="库下水位" v-model="RRcheckList['ST_RSVR_R|BLRZ']" alt="ST_RSVR_R|BLRZ" type="BLRZ" @change="checkChange"></el-checkbox>
			    <el-checkbox label="水情特征" v-model="RRcheckList['ST_RSVR_R|RWCHRCD']" alt="ST_RSVR_R|RWCHRCD" @change="checkChange"></el-checkbox>
			    <el-checkbox label="测流方法" v-model="RRcheckList['ST_RSVR_R|MSQMT']" alt="ST_RSVR_R|MSQMT" @change="checkChange"></el-checkbox>
			  </div>
			</div>	
			<div class="projectBox">
				<span class="projectName">旬统计</span>
				<div  class="checkList">		
			    <el-checkbox label="旬降雨量" v-model="RRcheckList['ST_PSTAT_R__X|ACCP']" alt="ST_PSTAT_R__X|ACCP" @change="checkChange"></el-checkbox>
			    <el-checkbox label="旬均库水位" v-model="RRcheckList['ST_RSVRAV_R__X|AVRZ']" alt="ST_RSVRAV_R__X|AVRZ" @change="checkChange"></el-checkbox>
			    <el-checkbox label="旬平均蓄水量" v-model="RRcheckList['ST_RSVRAV_R__X|AVW']" alt="ST_RSVRAV_R__X|AVW" @change="checkChange"></el-checkbox>
			    <el-checkbox label="旬平均入库流量" v-model="RRcheckList['ST_RSVRAV_R__X|AVINQ']" alt="ST_RSVRAV_R__X|AVINQ" @change="checkChange"></el-checkbox>
			    <el-checkbox label="旬均总出库流量" v-model="RRcheckList['ST_RSVRAV_R__X|AVOTQ']" alt="ST_RSVRAV_R__X|AVOTQ" @change="checkChange"></el-checkbox>
			  </div>
			</div>	
			<div class="projectBox">
				<span class="projectName">月统计</span>
				<div  class="checkList">		
			    <el-checkbox label="月降雨量" v-model="RRcheckList['ST_PSTAT_R__Y|ACCP']" alt="ST_PSTAT_R__Y|ACCP" @change="checkChange"></el-checkbox>
			    <el-checkbox label="月均库水位" v-model="RRcheckList['ST_RSVRAV_R__Y|AVRZ']" alt="ST_RSVRAV_R__Y|AVRZ" @change="checkChange"></el-checkbox>
			    <el-checkbox label="月平均蓄水量" v-model="RRcheckList['ST_RSVRAV_R__Y|AVW']" alt="ST_RSVRAV_R__Y|AVW" @change="checkChange"></el-checkbox>
			    <el-checkbox label="月平均入库流量" v-model="RRcheckList['ST_RSVRAV_R__Y|AVINQ']" alt="ST_RSVRAV_R__Y|AVINQ" @change="checkChange"></el-checkbox>
			    <el-checkbox label="月均总出库流量" v-model="RRcheckList['ST_RSVRAV_R__Y|AVOTQ']" alt="ST_RSVRAV_R__Y|AVOTQ" @change="checkChange"></el-checkbox>
			  </div>
			</div>	
			<div class="projectBox">
				<span class="projectName">闸门信息</span>
				<div  class="checkList">		
			    <el-checkbox label="开闸数量" v-model="RRcheckList['ST_GATE_R|GTOPNUM']" alt="ST_GATE_R|GTOPNUM" @change="checkChange"></el-checkbox>
			    <el-checkbox label="开闸高度" v-model="RRcheckList['ST_GATE_R|GTOPHGT']" alt="ST_GATE_R|GTOPHGT" type="GTOPHGT" @change="checkChange"></el-checkbox>
			    <el-checkbox label="过闸流量" v-model="RRcheckList['ST_GATE_R|GTQ']" alt="ST_GATE_R|GTQ" type="GTQ" @change="checkChange"></el-checkbox>
			    <el-checkbox label="测量方法" v-model="RRcheckList['ST_GATE_R|MSQMT']" alt="ST_GATE_R|MSQMT" @change="checkChange"></el-checkbox>
			  </div>
			</div>
		</div>
		<div class="" v-if="PP">		
			<div class="projectBox">
				<span class="projectName">日统计</span>
				<div  class="checkList">		
			    <el-checkbox label="日雨量" v-model="PPcheckList['ST_PPTN_R|DRP']" alt="ST_PPTN_R|DRP" @change="checkChange"></el-checkbox>
			    <el-checkbox label="目前天气" v-model="PPcheckList['ST_PPTN_R|WTH']" alt="ST_PPTN_R|WTH" @change="checkChange"></el-checkbox>
					<el-checkbox label="日蒸发量" v-model="PPcheckList['ST_DAYEV_R|DYE']" alt="ST_DAYEV_R|DYE" type="DYE" @change="checkChange"></el-checkbox>
			    <el-checkbox label="蒸发器类型" v-model="PPcheckList['ST_DAYEV_R|EPTP']" alt="ST_DAYEV_R|EPTP" @change="checkChange"></el-checkbox>
			  </div>
			</div>	
			<div class="projectBox">
				<span class="projectName">旬统计</span>
				<div  class="checkList">		
			    <el-checkbox label="旬降雨量" v-model="PPcheckList['ST_PSTAT_R__X|ACCP']" alt="ST_PSTAT_R__X|ACCP" @change="checkChange"></el-checkbox>
			  </div>
			</div>	
			<div class="projectBox">
				<span class="projectName">月统计</span>
				<div  class="checkList">		
			    <el-checkbox label="月降雨量" v-model="PPcheckList['ST_PSTAT_R__Y|ACCP']" alt="ST_PSTAT_R__Y|ACCP" @change="checkChange"></el-checkbox>
			  </div>
			</div>		
		</div>
		<div class="" v-if="DD">		
			<div class="projectBox">
				<span class="projectName">日统计</span>
				<div  class="checkList">		
					<el-checkbox label="日降雨量" v-model="DDcheckList['ST_PPTN_R|DRP']" alt="ST_PPTN_R|DRP" @change="checkChange"></el-checkbox>
			    <el-checkbox label="目前天气" v-model="DDcheckList['ST_PPTN_R|WTH']" alt="ST_PPTN_R|WTH" @change="checkChange"></el-checkbox>
					<el-checkbox label="日蒸发量" v-model="DDcheckList['ST_DAYEV_R|DYE']" alt="ST_DAYEV_R|DYE" type="DYE" @change="checkChange"></el-checkbox>
			    <el-checkbox label="蒸发器类型" v-model="DDcheckList['ST_DAYEV_R|EPTP']" alt="ST_DAYEV_R|EPTP" @change="checkChange"></el-checkbox>
			    <el-checkbox label="日均水位" v-model="DDcheckList['ST_RVAV_R__D|AVZ']" alt="ST_RVAV_R__D|AVZ" @change="checkChange"></el-checkbox>
			  </div>
			</div>	
			<div class="projectBox">
				<span class="projectName">瞬时信息</span>
				<div  class="checkList">		
			    <el-checkbox label="瞬时水位" v-model="DDcheckList['ST_RIVER_R|Z']" alt="ST_RIVER_R|Z" type="Z" @change="checkChange"></el-checkbox>
					<el-checkbox label="总过闸流量" v-model="DDcheckList['ST_WAS_R|TGTQ']" alt="ST_WAS_R|TGTQ" type="TGTQ" @change="checkChange"></el-checkbox>
					<el-checkbox label="闸水特征值" v-model="DDcheckList['ST_WAS_R|SWCHRCD']" alt="ST_WAS_R|SWCHRCD" @change="checkChange"></el-checkbox>
					<el-checkbox label="水势" v-model="DDcheckList['ST_RIVER_R|WPTN']" alt="ST_RIVER_R|WPTN" @change="checkChange"></el-checkbox>
					<el-checkbox label="测流方式" v-model="DDcheckList['ST_RIVER_R|MSQMT']" alt="ST_RIVER_R|MSQMT" @change="checkChange"></el-checkbox>
			  </div>
			</div>	
			<div class="projectBox">
				<span class="projectName">旬统计</span>
				<div  class="checkList">		
			    <el-checkbox label="旬降雨量" v-model="DDcheckList['ST_PSTAT_R__X|ACCP']" alt="ST_PSTAT_R__X|ACCP" @change="checkChange"></el-checkbox>
					<el-checkbox label="旬平均水位" v-model="DDcheckList['ST_RVAV_R__X|AVZ']" alt="ST_RVAV_R__X|AVZ" @change="checkChange"></el-checkbox>
			  </div>
			</div>
			<div class="projectBox">
				<span class="projectName">月统计</span>
				<div  class="checkList">		
			    <el-checkbox label="月降雨量" v-model="DDcheckList['ST_PSTAT_R__Y|ACCP']" alt="ST_PSTAT_R__Y|ACCP" @change="checkChange"></el-checkbox>
					<el-checkbox label="月平均水位" v-model="DDcheckList['ST_RVAV_R__Y|AVZ']" alt="ST_RVAV_R__Y|AVZ" @change="checkChange"></el-checkbox>
			  </div>
			</div>		
		</div>
	</main>

</template>

<script>
import qs from 'qs'
	export default{
		name: 'FloodProjectCustom',
		data () {
			return {
				ZZ: false,									//以下5条用来控制5种sttp对应显示的配置内容
				TT: false,
				RR: false,
				PP: true,
				DD: false,
				dataloading: false,
				DDcheckList: {							//以下5个checkList用来存放5种sttp对应的配置具体内容
					'ST_PPTN_R|DRP':false,
					'ST_PPTN_R|WTH':false,
					'ST_DAYEV_R|DYE':false,
					'ST_DAYEV_R|EPTP':false,
					'ST_RVAV_R__D|AVZ':false,
					'ST_RIVER_R|Z':false,
					'ST_WAS_R|TGTQ':false,
					'ST_WAS_R|SWCHRCD':false,
					'ST_RIVER_R|WPTN':false,
					'ST_RIVER_R|MSQMT':false,
					'ST_PSTAT_R__X|ACCP':false,
					'ST_RVAV_R__X|AVZ':false,
					'ST_PSTAT_R__Y|ACCP':false,
					'ST_RVAV_R__Y|AVZ':false
				},
				PPcheckList: {
					'ST_PPTN_R|DRP': false,
					'ST_PPTN_R|WTH': false,
					'ST_DAYEV_R|DYE': false,
					'ST_DAYEV_R|EPTP': false,
					'ST_PSTAT_R__X|ACCP': false,
					'ST_PSTAT_R__Y|ACCP': false
				},
				RRcheckList: {
					'ST_PPTN_R|DRP': false,
					'ST_PPTN_R|WTH': false,
					'ST_DAYEV_R|DYE': false,
					'ST_DAYEV_R|EPTP': false,
					'ST_RSVRAV_R__D|AVRZ': false,
					'ST_RSVRAV_R__D|AVW': false,
					'ST_RSVRAV_R__D|AVINQ': false,
					'ST_RSVRAV_R__D|AVOTQ': false,
					'ST_RSVR_R|RZ': false,
					'ST_RSVR_R|RWPTN': false,
					'ST_RSVR_R|W': false,
					'ST_RSVR_R|INQ': false,
					'ST_RSVR_R|OTQ': false,
					'ST_RSVR_R|BLRZ': false,
					'ST_RSVR_R|RWCHRCD': false,
					'ST_RSVR_R|MSQMT': false,
					'ST_PSTAT_R__X|ACCP': false,
					'ST_RSVRAV_R__X|AVRZ': false,
					'ST_RSVRAV_R__X|AVW': false,
					'ST_RSVRAV_R__X|AVINQ': false,
					'ST_RSVRAV_R__X|AVOTQ': false,
					'ST_PSTAT_R__Y|ACCP': false,
					'ST_RSVRAV_R__Y|AVRZ': false,
					'ST_RSVRAV_R__Y|AVW': false,
					'ST_RSVRAV_R__Y|AVINQ': false,
					'ST_RSVRAV_R__Y|AVOTQ': false,
					'ST_GATE_R|GTOPNUM': false,
					'ST_GATE_R|GTOPHGT': false,
					'ST_GATE_R|GTQ': false,
					'ST_GATE_R|MSQMT': false
				},
				TTcheckList: {
					'ST_PPTN_R|DRP':false,
					'ST_PPTN_R|WTH':false,
					'ST_DAYEV_R|DYE':false,
					'ST_DAYEV_R|EPTP':false,
					'ST_RIVER_R|Z':false,
					'ST_RIVER_R|WPTN':false,
					'ST_TIDE_R__HH|TM':false,
					'ST_TIDE_R__HH|TDZ':false,
					'ST_TIDE_R__LH|TM':false,
					'ST_TIDE_R__LH|TDZ':false,
					'ST_TIDE_R__LL|TM':false,
					'ST_TIDE_R__LL|TDZ':false,
					'ST_TIDE_R__HL|TM':false,
					'ST_TIDE_R__HL|TDZ':false,
					'ST_PSTAT_R__X|ACCP':false,
					'ST_TIDEAV_R__X|AVHTDZ':false,
					'ST_TIDEAV_R__X|AVLTDZ':false,
					'ST_PSTAT_R__Y|ACCP':false,
					'ST_TIDEAV_R__Y|AVHTDZ':false,
					'ST_TIDEAV_R__Y|AVLTDZ':false
				},
				ZZcheckList: {
					'ST_PPTN_R|DRP': false,
					'ST_PPTN_R|WTH': false,
					'ST_DAYEV_R|DYE': false,
					'ST_DAYEV_R|EPTP': false,
					'ST_RVAV_R__D|AVZ': false,
					'ST_RVAV_R__D|AVQ': false,
					'ST_RIVER_R|Z': false,
					'ST_RIVER_R|WPTN': false,
					'ST_RIVER_R|Q': false,
					'ST_RIVER_R|XSA': false,
					'ST_RIVER_R|XSAVV': false,
					'ST_RIVER_R|XSMXV': false,
					'ST_RIVER_R|FLWCHRCD': false,
					'ST_RIVER_R|MSQMT': false,
					'ST_RIVER_R|MSAMT': false,
					'ST_RIVER_R|MSVMT': false,
					'ST_PSTAT_R__X|ACCP': false,
					'ST_RVAV_R__X|AVZ': false,
					'ST_RVAV_R__X|AVQ': false,
					'ST_PSTAT_R__Y|ACCP': false,
					'ST_RVAV_R__Y|AVZ': false,
					'ST_RVAV_R__Y|AVQ': false
				}
			}
		},  
		computed: {
			getSiteStcd() {											//计算store中的siteStcd（stcd）
				return this.$store.state.siteStcd
			},
			getSiteSttp() {											//计算store中的siteSttp（sttp）
				return this.$store.state.siteSttp
			}
		},
		watch: {
			getSiteStcd(val){									//监听stcd变化
				if (val) {
					let sttp = this.$store.state.siteSttp
					this.clearChecked(sttp)				//清除配置按钮选中状态
					this.getCheckd()							
				}
			},
			getSiteSttp(val,oldVal){
				this.selecter(val)
				this.clearChecked(oldVal)
			}
		},
		methods: {
			selecter (val) {								//sttp过滤显示对应配置内容
				if (val) {
					if (val === 'PP') {
						this.ZZ = false
						this.TT = false
						this.RR = false
						this.PP = true
						this.DD = false
						this.formName = 'DDcheckList'
					} else if (val.indexOf('Z') !== -1) {
						this.ZZ = true
						this.TT =false
						this.RR = false
						this.PP = false
						this.DD = false
						this.formName = 'DDcheckList'
					} else if (val === 'TT') {
						this.ZZ = false
						this.TT = true
						this.RR = false
						this.PP = false
						this.DD = false
						this.formName = 'DDcheckList'
					}	else if (val === 'RR') {
						this.ZZ = false
						this.TT = false
						this.RR = true
						this.PP = false
						this.DD = false
						this.formName = 'DDcheckList'
					} else if (val === 'DD') {
						this.ZZ = false
						this.TT = false
						this.RR = false
						this.PP = false
						this.DD = true
						this.formName = 'DDcheckList'
					}
				}
			},
			throughSelecter () {							//通过sttp过滤
				let sttp = this.$store.state.siteSttp
				this.selecter(sttp)
			},
			checkChange (val,change) {					//配置状态改变
				let method = ''
				if(val){
					method = 'add'
				}else{
					method = 'delete'
				}
				let filedKey = change.target.parentNode.parentNode.getAttribute('alt')						//获取保存在标签内的自定义属性filedKey
				let type = change.target.parentNode.parentNode.getAttribute('type')								//获取保存在标签内的自定义属性type
				console.log(filedKey,type,method)
				let stcd = this.$store.state.siteStcd
				this.$http.post(this.baseUrl + 'stationInfo/wxbxxm/' + stcd, qs.stringify({filedKey: filedKey,type: type, method: method}))
				.then((res) => {
					if (res.data.code === 0) {
						if(method === 'add'){
							this.$message({
								type: 'success',
								message: '站点项目配置成功'
							})
						}else{
							this.$message({
								type: 'success',
								message: '取消站点项目配置成功'
							})
						}
						
					}else{
						this.$message({
							type: 'info',
							message: '站点项目配置失败'
						})
					}
					
				}).catch((err) => {
					console.log(err)
				})
			},
			getCheckd () {								//获取站点对应的配置内容
				this.dataloading = true
				let stcd = this.$store.state.siteStcd
				this.$http.get(this.baseUrl + 'stationInfo/wxbxxm/' + stcd, qs.stringify({}))
				.then((res) => {		
					if (res.data.code === 0) {
						this.dataloading = false
						let data = res.data.data
						if(data.length){
							let objName = this.transListName(data[0].sttp)
							let key
							for (let i = 0 ; i < data.length;i++) {
								this[objName][data[i]['filedKey']] = true
							}	
						}					
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			clearChecked (oldVal) {													//清除选中状态
				let objName = this.transListName(oldVal)
				let key
				for (key in this[objName]) {
					this[objName][key] = false
				}		
			},
			transListName (sttp) {											//转换sttp
				let val = sttp.slice(0,1)
				let objName = ''
				switch (val) {
					case 'D': objName = 'DDcheckList'
					break
					case 'Z': objName = 'ZZcheckList'
					break
					case 'R': objName = 'RRcheckList'
					break
					case 'P': objName = 'PPcheckList'
					break
					case 'T': objName = 'TTcheckList'
					break
				}
				return objName
			}
		},
		created: function () {
			this.throughSelecter()
			this.getCheckd()
		}
}
</script>

<style scoped>
	.projectMain{
		padding-top:20px;
		padding-left:20px;
		padding-right:20px;
		border-top:0;
		border:1px solid #e6e6e6;
		border-top:0;
		height:calc(100% - 40px - 80px - 3px);
		overflow-y:auto;
	}
	.projectBox{
		border:1px solid #e6e6e6;
		vertical-align: middle;
		position: relative;
		margin-bottom:10px;
	}
	.checkList{
		border-left:1px solid #e6e6e6;
		margin-left:160px;
	}
	.projectName{
		display:table-cell;	
		width:160px;
		text-align: center;
		height:16px;
		position:absolute;
		top:50%;
		margin-top:-8px;
		font-size:13px;
	}
	.el-checkbox{
		width:140px;
		margin:5px 0 5px 20px;	
		height:20px;
	}
	.el-checkbox__label{
		font-size:12px;
	}
	.el-menu--horizontal{
		border:1px solid #e6e6e6;
	}
</style>