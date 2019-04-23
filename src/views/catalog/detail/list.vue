<template>
<div class="dp-self-element" v-loading="loading">

<el-dialog 
	        :title="title"
	        :visible.sync="dialog_add_edit" 
	        :close-on-click-modal = "false"
          :top="'8%'"
          :width="'60%'"

          :modal-append-to-body = "false"
          :append-to-body="false"
          :lock-scroll="false"
          :fullscreen="false" 	                  
        >
        <div >
          <div style="border-bottom: 1px solid rgb(221, 221, 221);">
            <el-form  :inline="true" :model="currentCatalog" ref="add_catalog_form" :rules="rules"  >	          
              <el-form-item  label="品牌"  prop="brandId">
                  <el-select v-model="currentCatalog.brandId" filterable
                    @change="triggerSeriesOption" placeholder="请选择品牌" style="width:280px">
                  <el-option
                    v-for="item in options.brandList"                   
                    :key="item.id"
                    :label="item.name"               
                    :value="item.id">
                  </el-option>
                </el-select> 
              </el-form-item>				
               <el-form-item label="车系"  prop="seriesId">
                  <el-select v-model="currentCatalog.seriesId" filterable
                   :disabled="option_series_status"
                   placeholder="请选择车系" style="width:280px">
                  <el-option
                    v-for="item in options.seriesList"
                    :disabled="item.disabled"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select> 
              </el-form-item>			    				    					          
            </el-form>
           </div>
		       <div style="float:right;margin-top:10px">
            <el-button @click="close_catalog">取消</el-button>
            <el-button type="primary" style="color:#fff" @click="save_catalog('add_catalog_form')" >确定</el-button>				    		 
		      </div>	
		   </div>
 </el-dialog>

<el-container>
  <el-header style="height:50px;background: #fbfbfb;">
      <div style="display:inline-block;">
        <el-button-group>
          <el-button  icon="el-icon-plus"   @click="addCatalog">新增</el-button>
        </el-button-group>
      </div>
      <div style="display:inline-block;float:right;">
          <el-input placeholder="根据车系名称查询" width="200px" v-model="searchContent" @keyup.enter.native="searchData" >
              <el-button  slot="append" icon="el-icon-search"  @click="searchData"></el-button>
          </el-input>
      </div>
  </el-header>

  <el-main>
    <!-- <div v-if="brandList.length==0">
      <h1  style="width:100%;text-align:center;color:rgba(0,0,0,0.3)">暂无数据</h1>
    </div> -->
    
    <el-table
    :data="tableData_series"
    border
    style="width: 100%">
      <el-table-column
        prop="brandName"
        label="品牌"
        min-width="13%">
      </el-table-column>
      <el-table-column
        prop="seriesName"
        label="车系"
        min-width="27%">
      </el-table-column>
      <el-table-column
        label="图标"
        min-width="17%">
        <template slot-scope="scope">
          <div align="center">
             <img :src="1==2?scope.row.seriesImageUrl:'http://img.aonestep.com/group1/M00/03/54/rBISPFwzIZ2Aaw6IADCAG1NUteQ870.jpg'" alt="" style="width: 60px;"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        min-width="15%">
        <template slot-scope="scope">
         <div v-if="scope.row.status==false" style="color:#E6A23C">未发布</div>
         <div v-if="scope.row.status==true"  style="color:#67C23A">已发布</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="操作"
        min-width="28%"
        >
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="text" icon="el-icon-view" @click="viewList(scope.row)">查看目录</el-button>
            <el-button type="text" v-if="scope.row.status==false" icon="el-icon-bell" @click="publishCatalog(scope.row)">发布</el-button>
            <el-button type="text" v-if="scope.row.status==true" icon="el-icon-back" @click="cancelCatalog(scope.row)">撤销</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <div style="float:right;margin-top:10px" v-if="ishowPage">
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
    watch: {
        '$route' (to, from) {
          // 对路由变化作出响应...
          this.catalogTypeId = this.$route.params.catalogTypeId;
          var params_carCatalog={typeId:this.catalogTypeId,pageSize:this.currentPageSize,pageNumber:this.currentPageNumber};
          this.initListData(this.$api.carCatalogList,params_carCatalog);
          var params_carBrand={enable:true};
          this.initOptionsData(this.$api.carBrandList,params_carBrand,"brandList");
        }
    },
    data() {
      let api = this.$api; //API地址
      return {
        catalogTypeId:this.$route.params.catalogTypeId,
        catalogValue:1,
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
          brandId: [
                 {required: true, message: '请选择品牌', trigger: 'change' }
                 ],
          seriesId: [
                 {required: true, message: '请选择车系', trigger: 'change' }
                 ]                               
          },
        searchContent:"",  
        brandList:[],
        currentCatalog:{},
        tableData_series: [],
        currentPageSize:10,
        currentPageNumber:1,
        pageTotal:0,
        options:{
          brandList:[],
          seriesList:[]
        },
        option_series_status:true
      }
    },
    components: { // 引入组件
 
    },
    methods: {
        viewList(row){
          this.routerLink("/catalogContent/catalogList/"+this.catalogTypeId, "list",row);
        },
        triggerSeriesOption(value){
           this.option_series_status = false;
           var params={enable:true,brandId:value,typeId:this.catalogTypeId};
           this.initOptionsData(this.$api.carSeriesListFilter,params,"seriesList")
        },
        close_catalog(){
           this.dialog_add_edit=false;
         },
        addCatalog(){
           this.title="添加车系维修手册目录";
           this.currentCatalog = {};
           this.option_series_status = true;
           this.dialog_add_edit=true;
         },
        getDataInfo(){
             var obj = {};
             obj = this.currentCatalog;
             obj.typeId = this.catalogTypeId;
             return obj;
         },
        save_catalog(formName){
              var _this = this;
              this.dataInfo = this.getDataInfo();
           		this.$refs[formName].validate(function(valid){
					    		if(valid){
                    _this.saveDataInfo(true,_this.$api.carCatalogSaveAndEdit, _this.dataInfo, "dialog_add_edit","list");			    			
					    		}else{
					    			return false;
					    		}
					    	})
         },
         publishCatalog(row){
          var params = {id:row.id,status:true};
          this.saveDataInfo(true,this.$api.carCatalogAble, params);
         },
        cancelCatalog(row){
          var params = {id:row.id,status:false};
          this.saveDataInfo(true,this.$api.carCatalogAble, params);
         },
         reset(){
           var params={
             searchContent:this.searchContent,
             typeId:this.catalogTypeId,
             pageSize:this.currentPageSize,pageNumber:this.currentPageNumber
           };
           this.initListData(this.$api.carCatalogList,params);
         },
         searchData(){
             this.currentPageSize = 10;
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
           this.tableData_series = data;
         },
         setOptionsData(data,option){
           this.$set(this.options,option,data);
         }
    },
    computed:{
      ishowPage:function(){
        if(this.pageTotal>this.currentPageSize){
          return true;
        }
        return false;
      },
      checkDisable(id){
        var flag = false;
        this.tableData_series.forEach(function(item){
              if(item.seriesId==id){
                flag = true;
                return false;
              }
        })
        return flag;
      }
    },
    mounted () {
      this.loading = false;
        //window.addEventListener('scroll', this.handleScroll)
    },
    created(){
      this.catalogTypeId = this.$route.params.catalogTypeId;
      var params_carCatalog={typeId:this.catalogTypeId,pageSize:this.currentPageSize,pageNumber:this.currentPageNumber};
      this.initListData(this.$api.carCatalogList,params_carCatalog);
      var params_carBrand={enable:true};
      this.initOptionsData(this.$api.carBrandList,params_carBrand,"brandList");
    }
  }
</script>

<style >
.dp-self-element h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: .5em;
    font-weight: 500;
    color: rgba(0,0,0,.95);
}
.dp-self-element .sColorH {
    color: #fff;
}
.dp-self-element .qColorH{
    color: rgba(0,0,0,.95);
}
.dp-self-element .qColor{
background-color: rgb(230, 230, 230);
color: rgb(0, 0, 0);
}
.dp-self-element .sColor{
background-color: #409EFF;
color:#fff;
}

.dp-self-element .el-pager li{
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
.dp-self-element .el-input__inner{
  line-height:32px;
}
.dp-self-element .el-input-group{
  line-height:30px;
  width:200px;
  vertical-align: middle;
}
.dp-self-element .el-input-group__append button.el-button{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    border-top-left-radius:0px;
    border-bottom-left-radius:0px;
    height:32px;
    min-width:48px;
}
.dp-self-element .el-input-group__append button.el-button:hover{
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
}


.dp-self-element .el-header{
  line-height:50px;
}
.dp-self-element .el-button{
    border: 1px solid #dcdfe6;
    color: rgba(0,0,0,.50);
}
.dp-self-element .el-button--text {
    border:0px;
    color: #409EFF;
    font-weight:200;
    padding:5px;
    min-width: 40px
}    
.dp-self-element .el-button:hover{
    color: #409EFF;
    border-color: #c6e2ff;
    /* background-color: #ecf5ff; */
}
.dp-self-element  .el-button--text:hover {
    color: #66b1ff;
}
.dp-self-element .el-button--primary{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
}
.dp-self-element  .el-button--primary:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
}

.dp-self-element .card{
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
.dp-self-element .card-bordered{
      border: 1px solid #e8e8e8
}
</style>

<style>
  .dp-self-element .el-dialog__header{
      border-bottom: 1px solid rgb(221, 221, 221);
  }
  .dp-self-element .el-dialog__body {
       min-height: 100px; 
       padding: 30px 20px 10px 20px;
  }
  .dp-self-element  .el-table tr{
    height:54px;
    max-height:72px;
  }
  .dp-self-element  .el-table th {
    padding: 6px 0;
    border-bottom: 1px solid #e6ebf5 !important;
    background: #fafafa;
   }
  .dp-self-element th{
    text-align: center;
    color: rgba(0,0,0,.85);
    font-weight: 500;
  }  
  .dp-self-element .el-table td{
    padding:10px;
  }
  .dp-self-element .el-table .el-table__row .cell {
    text-align: center;
    font-family: Monospaced Number,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(0,0,0,.65);
  }

</style>



