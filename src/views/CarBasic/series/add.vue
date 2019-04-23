<template>
<div class="cms-body"  v-loading="loading">
<a class="cms-back" href="javascript:void(0)" @click="backToListManageer" ></a>

<el-container>
  <el-header style="height:50px;background: #fbfbfb;" >
    <div style="text-align: center;width:100%">
        <h3 style="color:rgba(0,0,0,0.55);margin-top: 12px;">
         {{title}}
        </h3>
    </div>
  </el-header>

  <el-main>
    <div class="dpSeriesAdd">
       <div >
          <div style="border-bottom: 1px solid rgb(221, 221, 221);">
            <el-form :model="currentSeries"  ref="add_series_form" :rules="rules" >
              <el-form-item label="车系图标" :label-width="'30%'" prop="imageUrl">
              <el-upload
                class="avatar-uploader"
                :action="url"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
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
      var _this = this;
      let api = this.$api; //API地址

     var validateRepeat =function(rule, value, callback){
          var params = {id:_this.currentSeries.id,code:_this.currentSeries.code,name:_this.currentSeries.name}
          axios.post(_this.$api.carSeriesValidateRepeat, params)
                    .then(res => {
                        if(res.status == true) {
                           callback();
                        }else{
                           callback(new Error('已经存在相同车系代码或车系名称'));
                        }
                    })
                    .catch(error => {
                        console.log(111,error)
                        _this.errorMessage('获取数据失败,请检查登录是否失效')
                        _this.loading = false;
                    }); 
        };
      return {
        url:this.$store.state.sys.baseUrl+api.singleFileUpload+"?appId="+process.env.appId+
          "&sessionKey="+localStorage.getItem("sessionKey")+
          "&type="+"attach"+
          "&nonceStr="+rand+
          "&mark="+false,
        basePath:this.$store.state.sys.baseUrl,
        title: this.$route.query.id.title,
        loading:true,
        currentSeries:this.$route.query.id.currentSeries||{},
        rules: {
          brandId:[
                { required: true, message: '请选择车系品牌', trigger: 'change' }
                 ],
          imageUrl: [
                 {required: true, message: '请上传车系图片', trigger: 'blur' }
                 ],
          code: [
                 {required: true, message: '请输入车系代码', trigger: 'blur' },
                 {validator: validateRepeat, trigger: 'blur' }
                 ],
          name: [
                 {required: true, message: '请输入车系中文名称', trigger: 'blur' },
                 {validator: validateRepeat, trigger: 'blur' }
                 ],  
          description: [
                 {required: true, message: '请输入车系中文描述', trigger: 'blur' }
                 ],                               
          },
        options:{
          brand:[] 
        } 
      }
    },
    components: { // 引入组件
 
    },
    methods: {
        backToListManageer(){
             this.routerLink("/series/list", "list");
        },
        close_series(){
           this.routerLink("/series/list", "list");
        },
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
        beforeAvatarUpload(file) {
          const isJPG = ((file.type === 'image/jpeg')||(file.type === 'image/png'));
          if (!isJPG) {
            this.$message.error('上传图片只能是 JPG或者PNG 格式!');
          }
          return isJPG;
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
                    _this.saveDataInfo(false,_this.$api.carSeriesSaveAndEdit, _this.dataInfo, "","list");			    			
					    		}else{
					    			return false;
					    		}
					    	})
         },
         setOptionsData(data,option){
           console.log(111,data,option)
           this.$set(this.options,option,data);
         }
    },
    computed:{
    },
    mounted () {
       this.loading = false;
    },
    created(){
      //初始化options
      this.initOptionsData(this.$api.carBrandList,{},"brand");
    }
  }
</script>
<style>
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



