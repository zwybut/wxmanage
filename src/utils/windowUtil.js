export const windowUtil = {
	getWinHeight:function(){
		var winHeight = 0;
		if (window.innerHeight) winHeight = window.innerHeight;
		else if ((document.body) && (document.body.clientHeight)) winHeight = document.body.clientHeight;
        return winHeight;
	}

}
