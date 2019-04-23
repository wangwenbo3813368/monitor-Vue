<template>
<div class="dp-self-element dp-catalog-tree cms-body flex " v-loading="loading">
<a class="cms-back" href="javascript:void(0)" @click="backToListManageer" ></a>

<el-container>
  <el-header style="height:50px;background: #fbfbfb;" >
    <div style="text-align: center;width:100%">
        <h3 style="color:rgba(0,0,0,0.55)">
         {{catalog.seriesName}}
        </h3>
    </div>
  </el-header>

  <el-main>
    <div class="dpAdvancedConfig">
        <el-form ref="form" :model="form" label-width="30%" :rules="rules">
          <el-form-item label="复制源车系名称" prop="catalogId_source">
            <el-select :disabled="disabledFlag" v-model="form.catalogId_source" placeholder="请选择复制源车系" style="width:60%;height:40px">
                  <el-option
                    v-for="item in options.catalogList"
                    :key="item.id"
                    :label="item.seriesName"
                    :value="item.id">
                  </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择复制级别" :disabled="disabledFlag">
            <el-radio-group v-model="form.copyLevel" style="width:60%;height:40px">
              <el-radio label="0">仅复制目录</el-radio>
              <el-radio label="1">复制目录与内容</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="复制后内容状态" v-if="form.copyLevel=='1'" :disabled="disabledFlag">
            <el-radio-group v-model="form.catalogDetailContentStatus"  style="width:60%;height:40px">
              <el-radio label="-1">与源数据一致</el-radio>
              <el-radio label="0">未送审</el-radio>
              <el-radio label="3">待审批</el-radio>
              <el-radio label="1">已通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="目录复制进度" v-if="disabledFlag==true">
            <el-progress style="width:60%;height:40px" :text-inside="true" :stroke-width="18" :percentage="catalogDetailRate" status="success"></el-progress>
          </el-form-item>
          <el-form-item label="内容复制进度" v-if="form.copyLevel=='1'&&disabledFlag==true">
            <el-progress style="width:60%;height:40px" :text-inside="true" :stroke-width="18" :percentage="catalogDetailContentRate" status="success"></el-progress>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="startCopy('form')" :disabled="disabledFlag">立即复制</el-button>
            <el-button :disabled="disabledFlag" @click="backToListManageer">取消</el-button>
          </el-form-item>
        </el-form>
   
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
          var params={typeId:this.catalogTypeId};
          this.initOptionsData(this.$api.carCatalogCascaderListForAdvancedConfig,params,"catalogList");
        }
    },
    data() {
      var _this = this;
      let api = this.$api; //API地址
      return {
        catalogTypeId:this.$route.params.catalogTypeId,
        catalog: this.$route.query.id,
        loading:true,
        dialog_add_edit:false,
        rules: {
          catalogId_source: [
                 {required: true, message: '请选择复制源车系', trigger: 'change' }
                 ]                       
          },
        form:{
          catalogId:this.$route.query.id.id,
          catalogId_source:'',
          copyLevel:'0',
          catalogDetailContentStatus:'-1'
        },
        options:{
           catalogList:[]
        },
        canBack:true,
        disabledFlag:false,
        catalogDetailTotal:0,
        catalogDetailContentTotal:0,
        catalogDetailCurrent:0,
        catalogDetailContentCurrent:0,
        catalogDetailRate:0,
        catalogDetailContentRate:0,
        counter:0,
        uuid:''
      }
    },
    components: { // 引入组件
 
    },
    methods: {
        backToListManageer(){
           if(this.canBack==true){
             this.routerLink("/catalogContent/seriesList/"+this.catalogTypeId, "list");
           }
        },
        getDataInfo(){
           return this.form;
         },
        startCopy(formName){
              var _this = this;
              this.dataInfo = this.getDataInfo();
           		this.$refs[formName].validate(function(valid){
					    		if(valid){      
                      _this.canBack =false;
                      _this.disabledFlag = true;                           
                      axios.post(_this.$api.carCatalogStartCopy, _this.dataInfo)
                          .then(res => {
                              _this.loading = false;
                              if (res.status == true) {
                                 _this.catalogDetailTotal = res.data.detailCount;
                                 _this.catalogDetailContentTotal = res.data.contentCount;
                                 _this.catalogDetailCurrent = res.data.detailCount;
                                 _this.catalogDetailContentCurrent = res.data.contentCount;
                                 _this.uuid = res.data.uuid;
                                 _this.counter = 300;
                                 _this.successMessage(res.message);
                                 _this.getCopyRate();
                              } else {
                                  _this.errorMessage('获取数据失败');
                              }
                          })
                          .catch(error => {
                              _this.errorMessage('获取数据失败,请检查登录是否失效')
                              _this.loading = false;
                          });
                   	    			
					    		}else{
					    			return false;
					    		}
					    	})
         },
         getCopyRate(){
           var _this = this;
           setTimeout(function(){
                axios.post(_this.$api.carCatalogGetCopyRate, {uuid:_this.uuid})
                    .then(res => {
                        if (res.status == true) {
                           if(res.data.detailCount==0&&res.data.contentCount==0){
                              _this.catalogDetailRate =100;
                              _this.catalogDetailContentRate =100;
                              _this.successMessage("成功复制完毕");
                              _this.canBack =true;
                           }else{
                             if(_this.counter-->0){
                                 _this.catalogDetailCurrent = res.data.detailCount;
                                 _this.catalogDetailContentCurrent = res.data.contentCount;
                                 if(_this.catalogDetailTotal==0){
                                   _this.catalogDetailRate =100;
                                 }else{
                                   _this.catalogDetailRate = 100-(_this.catalogDetailCurrent/_this.catalogDetailTotal).toFixed(2);
                                 }
                                 if(_this.catalogDetailContentTotal==0){
                                   _this.catalogDetailContentRate =100;
                                 }else{
                                   _this.catalogDetailContentRate = 100-(_this.catalogDetailContentCurrent/_this.catalogDetailContentTotal).toFixed(2);
                                 }
                                 _this.getCopyRate();
                             }
                           }
                        } else {
                            _this.canBack =true;
                            _this.errorMessage('获取数据失败');
                        }
                    })
                    .catch(error => {
                         _this.canBack =true;
                         _this.errorMessage('获取数据失败,请检查登录是否失效')
                    });
           },300);
                
         },
         reset(){
         },
         setListData(data){
           this.catalogDataDetailList = data;
         },
         setOptionsData(data,option){
           this.$set(this.options,option,data);
         },
    },
    computed:{
      isShow:function(){
        if(this.brandList==null||this.brandList.length==0) return false;
        var flag = false;
        this.brandList.forEach(function(item){
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
    },
    created(){
      this.catalogTypeId = this.$route.params.catalogTypeId;
      var params={typeId:this.catalogTypeId};
      this.initOptionsData(this.$api.carCatalogCascaderListForAdvancedConfig,params,"catalogList");
    }
  }
</script>
<style>
.dpAdvancedConfig .el-form-item {
    margin-bottom: 15px;
}
.dpAdvancedConfig .el-input__inner {
    height: 40px;
    line-height: 40px;
}
.dpAdvancedConfig .el-radio-group {
    line-height: 0;
    padding-top: 11px;
}
.dpAdvancedConfig .el-progress-bar {
    padding-top: 11px;
}
</style>



