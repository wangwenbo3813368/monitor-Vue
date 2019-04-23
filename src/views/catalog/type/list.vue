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
        <div class="dpSeriesAdd"  >
          <div style="border-bottom: 1px solid rgb(221, 221, 221);">
            <el-form   :model="currentCatalogType" ref="add_catalogtype_form" :rules="rules"  >	          
              <el-form-item  label="手册类型名称"  prop="name"  :label-width="'30%'">
                 <el-input v-model="currentCatalogType.name" style="width:80%" :maxlength="32" ></el-input>
              </el-form-item>				
               <el-form-item label="手册类型编码"  prop="code" :label-width="'30%'">
                 <el-input v-model="currentCatalogType.code" style="width:80%" :maxlength="32"></el-input>
              </el-form-item>
               <el-form-item label="手册类型数据"  prop="value" :label-width="'30%'">
                <el-select v-model="currentCatalogType.value" 
                     placeholder="请选择品牌" style="width:80%" >
                  <el-option
                    v-for="item in valueList"                   
                    :key="item.value"
                    :label="item.name"               
                    :value="item.value">
                  </el-option>
                </el-select> 		
              </el-form-item>	
              <el-form-item label="手册类型排序"  prop="sort" :label-width="'30%'">
                  <el-input-number v-model="currentCatalogType.sort" style="width:80%"  :min="3" :max="10000" label="最小3，最大10000"></el-input-number>
              </el-form-item>	


    					          
            </el-form>
           </div>
		       <div style="float:right;margin-top:10px">
            <el-button @click="close_dialog_catalogtype">取消</el-button>
            <el-button type="primary" style="color:#fff" @click="save_catalogtype('add_catalogtype_form')" >确定</el-button>				    		 
		      </div>	
		   </div>
 </el-dialog>

<el-container>
  <el-header style="height:50px;background: #fbfbfb;">
      <div style="display:inline-block;">
        <el-button-group>
          <el-button  icon="el-icon-plus"   @click="add_dialog_catalogtype">新增</el-button>
        </el-button-group>
      </div>
  </el-header>

  <el-main>

    <el-table
    :data="tableData_catalogtype"
    border
    style="width: 100%">
      <el-table-column
        prop="name"
        label="手册名称"
        min-width="13%">
      </el-table-column>
      <el-table-column
        prop="code"
        label="手册编码"
        min-width="13%">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        min-width="13%">
      </el-table-column>
      <el-table-column
        prop="value"
        label="数据类型"
        min-width="13%">
        <template slot-scope="scope">
          <div align="center">
              {{generate(scope.row.value)}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="配置类型"
        min-width="13%">
         <template slot-scope="scope">
          <div align="center">
              <div v-if="scope.row.type=='system'" style="color:#409EFF">系统初始化</div>
              <div v-else style="color:#67C23A">自定义</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="操作"
        min-width="28%"
        >
        <template slot-scope="scope">
          <el-button-group v-if="scope.row.type!='system'">
            <el-button type="text" icon="el-icon-view" @click="edit_catalogtype(scope.row)">编辑</el-button>
            <!-- <el-button type="text"  icon="el-icon-back">删除</el-button> -->
          </el-button-group>
          <div v-else style="color:#F56C6C">禁止操作系统初始化数据</div>
        </template>
      </el-table-column>
    </el-table>
        
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
        basePath:this.$store.state.sys.baseUrl,
        title:"",
        dialog_add_edit:false,
        valueList:[{value:1,name:"目录无code"},{value:2,name:"目录有code"}],
        rules: {
          name: [
                 {required: true, message: '请输入名称', trigger: 'blur' }
                 ],
          code: [
                 {required: true, message: '请输入编码', trigger: 'blur' }
                 ],   
          value: [
                 {required: true, message: '请选择数据类型', trigger: 'change' }
                 ],
          sort: [
                 {required: true, message: '请输入排序', trigger: 'blur' }
                 ],                 
          },
        tableData_catalogtype: [],
        currentCatalogType:{},
      }
    },
    components: { // 引入组件
 
    },
    methods: {
        generate(value){
           var str;
           switch(value){
             case 1:
               str=value+"-"+"目录无code";
               break;
            case 2:
               str=value+"-"+"目录有code";
               break;  
           }
          return str;             
        },
        close_dialog_catalogtype(){
           this.dialog_add_edit=false;
         },
        add_dialog_catalogtype(){
           this.title="添加手册类型";
           this.currentCatalogType = {};
           this.dialog_add_edit=true;
         },
        edit_catalogtype(data){
           this.title="编辑手册类型";
           this.currentCatalogType = data;
           this.dialog_add_edit=true;
        },
        getDataInfo(){
             var obj = {};
             obj = this.currentCatalogType;
             return obj;
         },
        save_catalogtype(formName){
              var _this = this;
              this.dataInfo = this.getDataInfo();
              debugger;
           		this.$refs[formName].validate(function(valid){
					    		if(valid){
                    _this.saveDataInfo(true,_this.$api.carCatalogTypeSaveAndEdit, _this.dataInfo, "dialog_add_edit","list");			    			
					    		}else{
					    			return false;
					    		}
					    	})
         },
         reset(){
            var params={};
            this.initListData(this.$api.carCatalogTypeList,params);
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
                        this.tableData_catalogtype =res.data;
                    } else {
                        this.errorMessage('获取数据失败');
                    }
                })
                .catch(error => {
                    this.errorMessage('获取数据失败,请检查登录是否失效')
                    this.loading = false;
                });
         },
    },
    computed:{

    },
    mounted () {
      this.loading = false;
    },
    created(){
      var params={};
      this.initListData(this.$api.carCatalogTypeList,params);
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


.dpSeriesAdd .el-form-item {
    margin-bottom: 15px;
}
.dpSeriesAdd .el-input__inner {
    height: 40px;
    line-height: 40px;
}
.dpSeriesAdd .el-radio-group {
    line-height: 0;
    padding-top: 11px;
}
.dpSeriesAdd .el-progress-bar {
    padding-top: 11px;
}
.dpSeriesAdd .el-textarea__inner {
    min-height: 40px !important;
}

</style>



