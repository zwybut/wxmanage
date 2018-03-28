export const addvcdUtil={
    getSimpleAddvnm:function(adress){
		if(adress.indexOf("市辖区") != -1){
			return "辖"
		}else{
			var arr = adress.split("");
			arr.pop();
			return arr;
        }
    }
}
