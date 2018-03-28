
export const dateUtil = {
	getFormatDate:function(dateTime,fmt){  // 日期数据格式化
	    var o = {
	        "M+": dateTime.getMonth() + 1,                 //月份
	        "d+": dateTime.getDate(),                    //日
	        "h+": dateTime.getHours(),                   //小时
	        "m+": dateTime.getMinutes(),                 //分
	        "s+": dateTime.getSeconds(),                 //秒
	        "q+": Math.floor((dateTime.getMonth() + 3) / 3), //季度
	        "S": dateTime.getMilliseconds()             //毫秒
	    };
	    if (/(y+)/.test(fmt))
	        fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	        if (new RegExp("(" + k + ")").test(fmt))
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	},
	/*对时间进行加减一个间隔
	 * TimeUnit:间隔单位：HOUR：小时，DAY：天
	 * DiffValue：间隔值
	*/
	getDateAdd:function (dateTime,TimeUnit, DiffValue) {
		var todayInMS = dateTime.getTime();
		var TimeUnit = TimeUnit.toUpperCase();
		var ResultTodayInMS;
		switch (TimeUnit) {
			case "MINUTE":
				ResultTodayInMS = todayInMS + (60 * (DiffValue) * 1000);
				break;
			case "HOUR":
				ResultTodayInMS = todayInMS + (60 * 60 * (DiffValue) * 1000);
				break;
			case "DAY":
				ResultTodayInMS = todayInMS + (60 * 60 * 24 * (DiffValue) * 1000);
				break;
		}
		return new Date(ResultTodayInMS);
	},
	// 得到某个月的天数据，year是某年，month为某月
	getMonthDay:function(year,month){

		// 对于非法数据进行过滤
		if(parseInt(month) > 12 || parseInt(month) < 1 || parseInt(year) < 1900 || parseInt(year) > 3000) return 0;

		var Days = 0;
		// 得到这个月的第一天
		var thisMonthFirstDay = new Date(year + "-" + month + "-1");
		// 得到下个月的第一天
		var nextMonthFirstDay = new Date(thisMonthFirstDay);
		nextMonthFirstDay.setMonth(nextMonthFirstDay.getMonth()+1);
		// 计算一天的毫秒数
		var OneDaySeconds = 24 * 60 * 60 * 1000;
		// 得到两个时间的之间的天数
		Days = (nextMonthFirstDay - thisMonthFirstDay)/ OneDaySeconds;
	
		return Days;

		// var month = date.split("年")[1].split("月")[0];
		// if (month == '01' || month == '03' || month == '05' || month == '07' || month == '08' || month == '10' || month == '12') {
		// 	return '31';
		// } else if (month == '04' || month == '06' || month == '09' || month == '11') {
		// 	return '30';
		// } else if (month == '02') {
		// 	var stryear = parseFloat(date.split("年")[0]);
		// 	var cond1 = stryear % 4 == 0; //条件1：年份必须要能被4整除
		// 	var cond2 = stryear % 100 != 0; //条件2：年份不能是整百数
		// 	var cond3 = stryear % 400 == 0; //条件3：年份是400的倍数
		// 	//当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
		// 	//如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
		// 	//所以得出判断闰年的表达式：
		// 	var cond = cond1 && cond2 || cond3;
		// 	if (cond) {
		// 		return "29";
		// 	} else {
		// 		return "28";
		// 	}
		// }

	}


}

