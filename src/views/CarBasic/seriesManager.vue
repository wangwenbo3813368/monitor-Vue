<template>
<div class="dp-self-element-series" v-loading="loading">

<el-dialog 
	        :title="title"
	        :visible.sync="dialog_add_edit" 
	        :close-on-click-modal = "false"
          :top="'2%'" 

          :modal-append-to-body = "true"
          :append-to-body="true"
          :lock-scroll="true"
          :fullscreen="true" 	                  
        >
        <div >
          <div style="border-bottom: 1px solid rgb(221, 221, 221);">
            <el-form :model="currentSeries"  ref="add_series_form" :rules="rules" >
              <el-form-item label="车系图标" :label-width="'30%'" prop="imageUrl">
              <el-upload
                class="avatar-uploader"
                :action="url"
                :show-file-list="false"
                :on-success="uploadImageSuccess"
                >
                <img v-if="currentSeries.imageUrl" :src="basePath+currentSeries.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              </el-form-item>		
              <el-form-item label="车系品牌" :label-width="'30%'" prop="brandId">
                <el-select v-model="currentSeries.brandId" placeholder="请选择" style="width:80%">
                  <el-option
                    v-for="item in options.brand"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select> 
              </el-form-item>	           
              <el-form-item label="车系代码" :label-width="'30%'" prop="code">
                <el-input v-model="currentSeries.code" style="width:80%"  placeholder="请输入车系代码" auto-complete="off" ></el-input>
              </el-form-item>
              <el-form-item label="中文名称" :label-width="'30%'" prop="name">
                <el-input v-model="currentSeries.name" style="width:80%"  placeholder="请输入车系中文名称" ></el-input>
              </el-form-item>
              <el-form-item label="中文描述" :label-width="'30%'" prop="description">
                <el-input  type="textarea" :rows="2" v-model="currentSeries.description" style="width:80%"  placeholder="请输入车系中文描述" ></el-input>
              </el-form-item>
              <el-form-item label="排序" :label-width="'30%'" prop="sort">
                <el-input-number v-model="currentSeries.sort"  :min="0" :max="10000" label="描述文字"></el-input-number>
              </el-form-item>
              

            </el-form>
           </div>
		       <div style="float:right;margin-top:10px">
            <el-button @click="close_series">取消</el-button>
            <el-button type="primary" style="color:#fff" @click="save_series('add_series_form')" >确定</el-button>				    		 
		      </div>	
		   </div>
 </el-dialog>

<el-container>
  <el-header style="height:50px;background: #fbfbfb;">
      <div style="display:inline-block;">
        <el-button-group>
          <el-button  icon="el-icon-plus"   @click="addSeries">新增</el-button>
          <el-button  icon="el-icon-check"  @click="enableSeries"  v-if="isShow">启用</el-button>
          <el-button  icon="el-icon-close"  @click="disableSeries" v-if="isShow">停用</el-button>
        </el-button-group>
      </div>
      <div style="display:inline-block;float:right;">
          <el-input placeholder="搜索" width="200px" v-model="searchContent" @keyup.enter.native="searchData" @input="searchData">
              <el-button  slot="append" icon="el-icon-search"  @click="searchData"></el-button>
          </el-input>
      </div>
  </el-header>

  <el-main>
    <div v-if="seriesList.length==0">
      <h1  style="width:100%;text-align:center;color:rgba(0,0,0,0.3)">暂无数据</h1>
    </div>
    <div style="padding:10px" v-if="seriesList.length>0">
      <div style="display: flex; flex-wrap: wrap;">
        <div v-for="(item,index) in seriesList"  style="width: calc((100% - 100px) / 5); margin: 10px;" :key="index">
          <div class="card card-bordered" style="position: relative; display: block;">
             
              <sub style="position:absolute;top:-2px;left:0px">
                <el-checkbox v-model="item.checked"></el-checkbox>
              </sub>
                <sub style="position:absolute;top:0px;right:0px">
                <el-button v-if="item.enable==true" type="primary" style="color:#fff;min-width:0px;">启用</el-button>
                <el-button v-if="item.enable==false" type="danger" style="color:#fff;min-width:0px;">未启用</el-button>
                </sub>
               <div @click="imageClick(index)" > 
                <div  style="height: 200px; display: flex; justify-content: center; align-items: center;">                 
                  <!-- <img :src="basePath+item.imageUrl" alt="" style="display: block; max-width: 100%; max-height: 300px;"> -->
                  <div style="width:100%">
                  <img  alt="" style="display: block; max-width: 100%; max-height: 150px;"
                  :src="basePath+item.imageUrl" 
                  onerror="javascript:this.src='/static/images/epc/logo_01.png'" 
                  >
                  </div> 
                </div>
              </div>
              <div :class="{ qColor: !item.checked,sColor:item.checked}"   style=" padding: 10px 11px; cursor: pointer; height: 70px;">
                <div style="display: flex; justify-content: space-between;">
                  <el-tooltip :content="item.name" placement="top" effect="light">
                    <h3 :class="{ qColorH: !item.checked,sColorH:item.checked}"   style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                      {{item.name}}
                    </h3>
                  </el-tooltip>
                  <i class="el-icon-edit" @click="edit_Series(item)"></i>
                </div>
                <el-tooltip :content="item.description" placement="top" effect="light">
                  <p style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                    {{item.description}}
                  </p>
                </el-tooltip>
              </div>
          </div>  
        </div>
      </div>  
    </div>
    <div style="float:right" v-if="ishowPage">
      <el-pagination
        background
        :page-size="currentPageSize"
        layout="prev, pager, next"
        @current-change="handleCurrentChangePage"
        :current-page.sync="currentPageNumber"
        :total="pageTotal">
      </el-pagination> 
    </div>         
  </el-main> 
</el-container>
</div>
</template>
<script type="text/ecmascript-6">
  import { getRand } from "@/untils/random";
  import { signParams } from "@/untils/sign";
  import api from "@/api/api";
  import axios from "axios";
  import dpFormMixns from "@/mixins/dpForm";
  import dpOptionsMixns from "@/mixins/dpOptions";

  var rand = getRand();

  export default {
    mixins: [dpFormMixns,dpOptionsMixns],
    data() {
      let api = this.$api; //API地址
      return {
        loading:true,
        url:this.$store.state.sys.baseUrl+api.singleFileUpload+"?appId="+process.env.appId+
          "&sessionKey="+localStorage.getItem("sessionKey")+
          "&type="+"attach"+
          "&nonceStr="+rand+
          "&mark="+false,
        basePath:this.$store.state.sys.baseUrl,
        title:"",
        dialog_add_edit:false,
        rules: {
          brandId:[
                { required: true, message: '请选择车系品牌', trigger: 'change' }
                 ],
          imageUrl: [
                 {required: true, message: '请上传车系图片', trigger: 'blur' }
                 ],
          code: [
                 {required: true, message: '请输入车系代码', trigger: 'blur' }
                 ],
          name: [
                 {required: true, message: '请输入车系中文名称', trigger: 'blur' }
                 ],  
          description: [
                 {required: true, message: '请输入车系中文描述', trigger: 'blur' }
                 ],                               
          },
        options:{
          brand:[] 
        },  
        searchContent:"",  
        seriesList:[],
        currentSeries:{},
        currentPageSize:15,
        currentPageNumber:1,
        pageTotal:0
      }
    },
    components: { // 引入组件
 
    },
    methods: {
        uploadImageSuccess(d){
             if(d.status){
                      var image={ 
                        id:d.data.id,
                        name:d.data.filename,
                        url:d.data.filepath
                        };
                   this.$set(this.currentSeries,"imageUrl",image.url);
                   this.$set(this.currentSeries,"imageId", image.id);
                }

         },
         getCheckdeIds(){
             var ids = [];
             this.seriesList.forEach(function(item){
               if(item.checked==true){
                 ids.push(item.id);
               }
             })
             return ids.join("----");
         },
         imageClick(index){
            if(this.seriesList[index].checked==undefined||this.seriesList[index].checked==false){
              this.$set(this.seriesList[index],"checked",true);
            }else{
              this.$set(this.seriesList[index],"checked",false);
            }
         },
         close_series(){
           this.dialog_add_edit=false;
         },
         addSeries(){
           this.title="新增汽车车系";
           this.currentSeries= {};
           this.routerLink("/series/add", "list",{title:this.title,currentSeries:this.currentSeries});
           //this.dialog_add_edit=true;
         },
         getDataInfo(){
             var obj = {};
             obj = this.currentSeries;
             return obj;
         },
         save_series(formName){
              var _this = this;
              this.dataInfo = this.getDataInfo();
           		this.$refs[formName].validate(function(valid){
					    		if(valid){
                    _this.saveDataInfo(true,_this.$api.carSeriesSaveAndEdit, _this.dataInfo, "dialog_add_edit","list");			    			
					    		}else{
					    			return false;
					    		}
					    	})
         },
         edit_Series(item){
           this.title="编辑汽车车系";
           this.currentSeries = item;
           this.routerLink("/series/add", "list",{title:this.title,currentSeries:this.currentSeries});
           //this.dialog_add_edit=true;
         },
         enableSeries(){
             this.$confirm('确定启用吗？', '提示', { type: "warning" })
                .then(mes => {
                  var params = {ids:this.getCheckdeIds(),type:"enable"};
                  this.saveDataInfo(true,this.$api.carSeriesAble, params);
                }).catch(error => { });
         },
         disableSeries(){
             this.$confirm('确定停用吗？', '提示', { type: "warning" })
                .then(mes => {
                  var params = {ids:this.getCheckdeIds(),type:"disable"};
                  this.saveDataInfo(true,this.$api.carSeriesAble, params);
                }).catch(error => { });
         },
         reset(){
           var params={
             pageSize:this.currentPageSize,
             pageNumber:this.currentPageNumber,
             searchContent:this.searchContent
           }
           this.initListData(this.$api.carSeriesList,params);
         },
         searchData(){
             this.currentPageSize = 15;
             this.currentPageNumber = 1;
             this.reset();
         },
         initListData(url,params){
            this.params = params;
            this.listUrl = url;
            this.getListData(params)
         },
         getListData(params) {
            this.loading = true;            
            axios.post(this.listUrl, params)
                .then(res => {
                    this.loading = false;
                    if (res.status == true) {
                       this.setListData(res.data);
                       this.pageTotal = res.total;
                    } else {
                        this.errorMessage('获取数据失败');
                    }
                })
                .catch(error => {
                    this.errorMessage('获取数据失败,请检查登录是否失效')
                    this.loading = false;
                });
         },
         handleCurrentChangePage(){
           this.reset();
         },
         setListData(data){
           this.seriesList = data;
         },
         setOptionsData(data,option){
           console.log(111,data,option)
           this.$set(this.options,option,data);
         }
    },
    computed:{
      isShow:function(){
        if(this.seriesList==null||this.seriesList.length==0) return false;
        var flag = false;
        this.seriesList.forEach(function(item){
          if(item.checked==true){
            flag =true;
            return false;
          }
        })
        return flag;
      },
      ishowPage:function(){
        if(this.pageTotal>this.currentPageSize){
          return true;
        }
        return false;
      }
    },
    mounted () {
      this.loading = false;
        //window.addEventListener('scroll', this.handleScroll)
    },
    created(){
      var params={pageSize:this.currentPageSize,pageNumber:this.currentPageNumber}
      this.initListData(this.$api.carSeriesList,params);
      // //初始化options
      // this.initOptionsData(this.$api.carBrandList,{},"brand");

    }
  }
</script>

<style >
.dp-self-element-series h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: .5em;
    font-weight: 500;
    color: rgba(0,0,0,.95);
}
.dp-self-element-series .sColorH {
    color: #fff;
}
.dp-self-element-series .qColorH{
    color: rgba(0,0,0,.95);
}
.dp-self-element-series .qColor{
background-color: rgb(230, 230, 230);
color: rgb(0, 0, 0);
}
.dp-self-element-series .sColor{
background-color: #409EFF;
color:#fff;
}

.dp-self-element-series .el-pager li{
font-weight: 100;
font-family: Arial;
outline: 0;
border-radius: 4px;
}
</style>



<style >
.el-input__inner{
  height:32px;
  line-height:32px;
}
.dp-self-element-series .el-input__inner{
  line-height:32px;
}
.dp-self-element-series .el-input-group{
  line-height:30px;
  width:200px;
  vertical-align: middle;
}
.dp-self-element-series .el-input-group__append button.el-button{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    border-top-left-radius:0px;
    border-bottom-left-radius:0px;
    height:32px;
    min-width:48px;
}
.dp-self-element-series .el-input-group__append button.el-button:hover{
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
}


.dp-self-element-series .el-header{
  line-height:50px;
}
.dp-self-element-series .el-button{
    border: 1px solid #dcdfe6;
    color: rgba(0,0,0,.50);
}
.dp-self-element-series .el-button:hover{
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}
.dp-self-element-series .card{
    font-family: Monospaced Number,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(0,0,0,.65);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    background: #fff;
    border-radius: 2px;
    position: relative;
    -webkit-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
}
.dp-self-element-series .card-bordered{
      border: 1px solid #e8e8e8
}
</style>

<style>
  .dp-self-element-series .el-dialog__header{
      border-bottom: 1px solid rgb(221, 221, 221);
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>



