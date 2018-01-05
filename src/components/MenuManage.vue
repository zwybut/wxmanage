<template>
    <main class="main"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 1)">
        <div class="phone l">
            <img src="../assets/iphone.png" class="phoneBackground"/>
            <span class="time">{{clock}}</span>
            <div class="phoneBtnBox">
                <el-popover
                ref="popover"
                placement="top"
                width="84"
                trigger="hover"
                >
                    <ul class="childList">
                        <li class="addChild"><el-button  class="listBtn" size="small" type="primary" alt="add" listName="first" :pId="fatherId[0]" plain @click="choose"><span></span>添加子级</el-button></li>
                        <li v-for="val in first"><el-button  class="listBtn" size="small" type="primary" :alt="val.id" listName="first" plain @click="choose">{{val.mName}}</el-button></li>
                    </ul>
                </el-popover>
                <el-popover
                ref="popover1"
                placement="top"
                width="85"
                trigger="hover">
                    <ul class="childList">
                        <li class="addChild"><el-button  class="listBtn" size="small" type="primary" alt="add" listName="second" :pId="fatherId[1]" plain @click="choose"><span></span>添加子级</el-button></li>
                        <li v-for="val in second"><el-button  class="listBtn" size="small" type="primary" :alt="val.id" listName="second" plain @click="choose">{{val.mName}}</el-button></li>
                    </ul>
                </el-popover>
                <el-popover
                ref="popover2"
                placement="top"
                width="85"
                trigger="hover">
                    <ul class="childList">
                        <li class="addChild"><el-button  class="listBtn" size="small" type="primary" alt="add" listName="third" :pId="fatherId[2]" plain @click="choose"><span></span>添加子级</el-button></li>
                        <li v-for="val in third"><el-button  class="listBtn" size="small" type="primary" :alt="val.id" listName="third" plain @click="choose">{{val.mName}}</el-button></li>
                    </ul>
                </el-popover>
                <div>
                    <el-button v-popover:popover class="phoneBtn" size="small" @click="choose" :alt="fatherId[0]">{{fatherName[0]}}</el-button>
                    <el-button v-popover:popover1 class="phoneBtn" size="small" @click="choose" :alt="fatherId[1]">{{fatherName[1]}}</el-button>
                    <el-button v-popover:popover2 class="phoneBtn" size="small" @click="choose" :alt="fatherId[2]">{{fatherName[2]}}</el-button>
                </div>
            </div>
        </div>
        <div class="content r">
            <header><span class="menuTitle">菜单管理</span>
            </header>
            <el-form class="menuForm" ref="form" :model="form" label-width="80px">
                <div style="width:100%;float:left">
                    <el-form-item label="菜单名称" size="small">
                        <el-input v-model="form.mName" class="input"></el-input>
                    </el-form-item>
                    <el-form-item label="父级菜单" size="small">
                        <el-select v-model="form.pId" placeholder="请选择活动区域" class="input">
                        <el-option label="无" value="0" ></el-option>
                        <el-option v-for="val in fatherMenu" :label="val.mName" :value="val.id" :key="val.id"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div style="width:100%;float:left">
                    <el-form-item label="菜单类型"  size="small" width="320">
                        <el-select v-model="form.mType" placeholder="请选择活动区域" class="input">
                        <el-option label="view" value="view"></el-option>
                        <el-option label="click" value="click"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="可见状态"  size="small" >
                        <el-select v-model="form.show" placeholder="请选择活动区域" class="input">
                        <el-option label="可见" value="true"></el-option>
                        <el-option label="不可见" value="false"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div style="width:100%;float:left">
                    <el-form-item label="唯一键" size="small">
                        <el-input  v-model="form.mKey" class="input"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" size="small">
                        <el-input  v-model="form.mState" class="input"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="菜单链接" width="733px" style="height:96px">
                    <el-input type="textarea" v-model="form.mUrl" class="textarea" :autosize="{minRows: 4,maxRows: 5}"></el-input>
                </el-form-item>
                <el-form-item   class="special">                   
                    <el-button size="small" class="btn" @click="onDelete">删除</el-button>
                    <el-button type="primary" @click="onSubmit" size="small" class="btn">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </main>
</template>
<script>
import qs from 'qs'
  export default {
	name: 'MenuManage',
	data () {
        return {
            clock: '',
            form: {
                mName: '',
                pId: '',
                mType: '',
                show: '',
                mUrl:'',
                mKey:'',
                mState:''
            },
            fatherMenu:[],
            fatherName:[],
            fatherId:[],
            first:[],
            second:[],
            third:[],
            id:'',
            listName:'',
            loading:true 
		}
    },
    methods: {
        choose (event) {
            let id
            let listName
            if(event.target.getAttribute('alt')){
                id = event.target.getAttribute('alt')
                listName = event.target.getAttribute('listName')
            }else{
                id = event.target.parentNode.getAttribute('alt')
                listName = event.target.parentNode.getAttribute('listName')
            }
            this.id = id
            this.listName = listName
            console.log(id)
            if(id&&id != 'add'){
                this.$http.get(this.baseUrl + 'menuManage/menu/' + id, qs.stringify({}))
                .then((res) => {
                    console.log(res)
                    if(res.data.code === 0){
                        let data = res.data.data
                        this.form.mName = data.mName
                        this.form.pId = data.pId.toString()
                        this.form.mType = data.mType
                        this.form.show = data.show.toString()
                        this.form.mUrl = data.mUrl
                        this.form.mKey = data.mKey
                        this.form.mState = data.mState
                    }
                    
                }).catch((err) => {
                    console.log(err)               
                })
            }else{
                let pId
                if(event.target.getAttribute('pId')){
                    pId = event.target.getAttribute('pId')
                }else{
                    pId = event.target.parentNode.getAttribute('pId')
                }
                this.form.mName = ''
                this.form.pId = pId.toString()
                this.form.mType = ''
                this.form.show = 'true'
                this.form.mUrl = ''
                this.form.mKey = ''
                this.form.mState = ''
            }
            
        },
        onDelete () {
            console.log(this.id)
            this.$confirm('此操作将删除该用户所有关注站点, 是否继续?', '提示', {				//删除弹出窗
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(this.baseUrl + 'menuManage/menu/' + this.id, qs.stringify({}))
                .then((res) => {
                    console.log(res)
                    if(res.data.code === 0){
                        this.getMenuAtBegin()
                        for (let key in this.form) {
                            this.form[key] = ''
                        }
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                    }else{
                        this.$message({
                            type: 'info',
                            message: '删除失败'
                        })
                    }
                }).catch((err) => {
                    console.log(err)               
                })
            }).catch(() => {})
        },
        onSubmit () {
            if(this.form.mName == '')this.form.mName = '未命名'
            if(this.form.mType == 'view' && this.form.mUrl == ''){
                this.$message({
                    type: 'info',
                    message: '类型为view时，菜单链接不能为空'
                })
            }else if(this.form.mType == 'click' && this.form.mKey == ''){
                this.$message({
                    type: 'info',
                    message: '类型为click时，唯一键不能为空'
                })
            }else{
                if(this.form.pId == '0'){
                    if(this.form.mName.length > 4){
                        this.$message({
                            type: 'info',
                            message: '菜单名称字数超出限制'
                        })
                    }else{
                        this.$http.put(this.baseUrl + 'menuManage/menu/' + this.id, qs.stringify(this.form))
                        .then((res) => {
                            console.log(res)
                            if(res.data.code === 0){
                                this.getMenuAtBegin()
                                this.$message({
                                    type: 'success',
                                    message: '保存成功'
                                })
                                console.log(1111111111)
                            }else{
                                this.$message({
                                    type: 'info',
                                    message: '保存失败'
                                })
                            }
                        }).catch((err) => {
                            console.log(err)               
                        })
                    }
                }else{
                    if(this.form.mName.length > 7){
                        this.$message({
                            type: 'info',
                            message: '菜单名称字数超出限制'
                        })
                    }else{
                        if(this[this.listName].length >= 5 && this.id == 'add'){
                            this.$message({
                                type: 'info',
                                message: '二级菜单个数超出限制'
                            })
                        }else{
                            if(this.id === 'add'){
                                this.$http.post(this.baseUrl + 'menuManage/menu', qs.stringify(this.form))
                                .then((res) => {
                                    console.log(res)
                                    if(res.data.code === 0){
                                        this.getMenuAtBegin()
                                        this.id = res.data.data
                                        console.log(res.data.data)
                                        this.$message({
                                            type: 'success',
                                            message: '添加成功'
                                        })
                                        console.log(222222222)
                                    }else{
                                        this.$message({
                                            type: 'info',
                                            message: '添加失败'
                                        })
                                    }
                                }).catch((err) => {
                                    console.log(err)               
                                })
                            }else{
                                this.$http.put(this.baseUrl + 'menuManage/menu/' + this.id, qs.stringify(this.form))
                                .then((res) => {
                                    console.log(res)
                                    if(res.data.code === 0){
                                        this.getMenuAtBegin()
                                        this.$message({
                                            type: 'success',
                                            message: '保存成功'
                                        })
                                        console.log(3333333)
                                    }else{
                                        this.$message({
                                            type: 'info',
                                            message: '保存失败'
                                        })
                                    }
                                }).catch((err) => {
                                    console.log(err)               
                                })
                            }                  
                        }
                    }
                }
            }
            
              
        },
        activeMenu () {									//设置header默认选中为用户管理
        this.$store.commit('activeMenu', '9')
        },
		getClientHeight () {	``					//获取tablek可视区高度
			this.clientHeight = this.getClientAtBegin()
        },
        getTime () {
            let todayDate = new Date()
            let datehour = todayDate.getHours() >= 10 ? todayDate.getHours() : '0' + todayDate.getHours()
            let getminute = todayDate.getMinutes() >= 10 ? todayDate.getMinutes() : '0' + todayDate.getMinutes()
            let getsecond = todayDate.getSeconds() >= 10 ? todayDate.getSeconds() : '0' + todayDate.getSeconds()
            let str = datehour + ':' + getminute + ':' + getsecond
            this.clock = str
        },
        setTime () {
            setInterval(this.getTime, 1000)
        },
        getMenuAtBegin () {
            this.$http.get(this.baseUrl + 'menuManage/menu', qs.stringify({}))
            .then((res) => {
                if (res.data.code === 0 ) {
                    let data = res.data.data
                    let fatherMenu = []
                    let name = []
                    let id = []
                    for (let i = 0;i < data.length;i++) {
                        if(data[i].pId  === 0){
                            let obj = {}
                            let num = 0
                            obj.mName = data[i].mName
                            obj.id = data[i].id.toString()
                            // obj.pId = data[i].pId.toString()
                            fatherMenu.push(obj)
                            name.push(data[i].mName)
                            id.push(data[i].id.toString())
                        }
                    }
                    this.fatherMenu = fatherMenu
                    this.fatherName = name
                    this.fatherId = id
                    let first = []
                    let second = []
                    let third = []
                    for(let i = 0;i < this.fatherName.length;i++){
                        for(let j = 0;j < data.length;j++){
                            if(data[j].pName&&data[j].pName===this.fatherName[i]){
                                let obj = {}
                                obj.mName = data[j].mName
                                obj.id = data[j].id.toString()
                                obj.pId = data[i].pId.toString()
                                switch (i) {
                                    case 0:first.push(obj)
                                    break
                                    case 1:second.push(obj)
                                    break
                                    case 2:third.push(obj)
                                    break
                                }
                            } 
                        }  
                    }   
                    this.first = first
                    this.second = second
                    this.third = third
                    this.loading = false                     
                }
            }).catch((err) => {
                console.log(err)               
            })				
        }
    },
    mounted (){
        this.getMenuAtBegin() 
    },
    created () {
        this.activeMenu()
        this.getClientHeight()
        this.getTime()
        this.setTime()
        
    }
  }
</script>
<style scoped>
    .main{
        margin-top:20px;
        height:calc(100% - 30px);
    }
    .phone{
        width:290px;
        height:573px;
        position:relative;
    }
    .phoneBackground{
        width:290px;
        height:573px;
        position:absolute;
        top:0;
        left:0;
    }
    .time{
        display:inline-block;
        text-align:center;
        height:12px;
        background:rgba(49,48,53,1);
        position:absolute;
        top:74px;
        left:121px;
        color:#fff;
        font-size:10px;
        line-height:12px;
    }
    .phoneBtnBox{
        position:absolute;
        bottom:71px;
        left:17px;
    }
    .phoneBtn{
        float:left;
        margin-left:0;
        width:85px;
        border-right:0;
    }
    .content{
        margin-left:30px;
        width:calc(100% - 290px - 30px );
        height:calc(100% - 60px - 20px);
    }
    .content header{
        border:1px solid #e6e6e6;
        height:38px;
        background:#fafafa;
    }
    .content .menuForm{
        width:calc(100% - 2px);
        border:1px solid #e6e6e6;
        border-top:0;
        height:100%;
        padding-top:20px;
    }
    .menuTitle{
        margin-left:20px;
        line-height:38px;
    }
    .input{
        width:320px;
    }
    .el-form-item{
        float:left;
        margin-bottom:20px;
    }
    .el-form-item__label{
         line-height: 32px
    }
    .el-form-item.special{
        margin-left:516px;
    }
    .special .btn{
        width:100px;
    }
    .textarea{
        width:720px;  
    }
    .textarea .el-textarea__inner{
        height:100px;
    }
    .el-popover{
        padding:0
    }
    .childList{
        padding-left:0;
        margin:0;
        width:100%;
        font-size:12px;
        margin-bottom:1px;
    }
    .childList li{
        width:100%;
        text-align:center;
        line-height:38px;
    }
    .addChild span{
        display:inline-block;
        width:8px;
        height:8px;
        margin-right:3px;
        background:url(../assets/phone_add.png)no-repeat center;
        background-size:cover;
    }
    .listBtn{
        margin:0;
        padding:0;
        width:100%;
        height:100%;
        border:0;
        text-align:center;
        line-height:38px;
        background:#fff;
        color:#000;
    }
</style>