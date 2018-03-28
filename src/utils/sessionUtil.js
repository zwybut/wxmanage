export const sessionUtil = {
    setSession:function(key,val){
        sessionStorage.setItem(key,val);
    },
    getSession:function(key){
        return sessionStorage.getItem(key);
    },
    removeSession:function(key){
        return sessionStorage.removeItem(key);
    }
}
