export const urlUtil ={
    getQueryString:function (Key) { // 得到路径上的参数
        var reg = new RegExp("(^|&)" + Key + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
}
