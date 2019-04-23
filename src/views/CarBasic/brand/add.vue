<template>
<div class="cms-body" v-loading="loading">
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
    <div class="dpBrandAdd">
       <div >
          <div style="border-bottom: 1px solid rgb(221, 221, 221);">
            <el-form :model="currentBrand"  ref="add_brand_form" :rules="rules" >
              <el-form-item label="品牌图标" :label-width="'30%'" prop="imageUrl">
              <el-upload
                class="avatar-uploader"
                :before-upload="beforeAvatarUpload"
                :action="url"
                :show-file-list="false"
                :on-success="uploadImageSuccess"
                >
                <img v-if="currentBrand.imageUrl" :src="basePath+currentBrand.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              </el-form-item>		          
              <el-form-item label="品牌代码" :label-width="'30%'" prop="code">
                <el-input v-model="currentBrand.code" style="width:80%"  placeholder="请输入品牌代码" auto-complete="off" ></el-input>
              </el-form-item>
              <el-form-item label="创立日期" :label-width="'30%'" prop="createTime">
                <el-date-picker
                  style="width:80%"
                  v-model="currentBrand.createTime"
                  type="date"
                  placeholder="选择创立日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="中文名称" :label-width="'30%'" prop="name">
                <el-input v-model="currentBrand.name" style="width:80%"  placeholder="请输入中文名称" ></el-input>
              </el-form-item>
              <el-form-item label="中文描述" :label-width="'30%'" prop="description">
                <el-input  type="textarea" :rows="2" autosize  v-model="currentBrand.description" style="width:80%"  placeholder="请输入中文描述" ></el-input>
              </el-form-item>							    				    					          
            </el-form>
           </div>
		       <div style="float:right;margin-top:10px">
            <el-button @click="close_brand">取消</el-button>
            <el-button type="primary" style="color:#fff" @click="save_brand('add_brand_form')" >确定</el-button>				    		 
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
          var params = {id:_this.currentBrand.id,code:_this.currentBrand.code,name:_this.currentBrand.name}
          axios.post(_this.$api.carBrandValidateRepeat, params)
                    .then(res => {
                        if(res.status == true) {
                           callback();
                        }else{
                           callback(new Error('已经存在相同品牌代码或品牌名称'));
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
        currentBrand:this.$route.query.id.currentBrand||{},
        rules: {
          imageUrl: [
                 {required: true, message: '请上传品牌图片', trigger: 'blur' }
                 ],
          code: [
                 {required: true, message: '请输入品牌代码', trigger: 'blur' },
                 {validator: validateRepeat, trigger: 'blur' }
                 ],
          createTime: [
                 {required: true, message: '请选择品牌创立日期', trigger: 'blur' }
                 ],
          name: [
                 {required: true, message: '请输入品牌中文名称', trigger: 'blur' },
                 {validator: validateRepeat, trigger: 'blur' }
                 ],  
          description: [
                 {required: true, message: '请输入品牌中文描述', trigger: 'blur' }
                 ],                               
          },
      }
    },
    components: { // 引入组件
 
    },
    methods: {
        backToListManageer(){
             this.routerLink("/brand/list", "list");
        },
        close_brand(){
           this.routerLink("/brand/list", "list");
        },
        uploadImageSuccess(d){
            if(d.status){
                    var image={ 
                      id:d.data.id,
                      name:d.data.filename,
                      url:d.data.filepath
                      };
                  this.$set(this.currentBrand,"imageUrl",image.url);
                  this.$set(this.currentBrand,"imageId", image.id);
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
             obj = this.currentBrand;
             return obj;
        },
        save_brand(formName){
              var _this = this;
              this.dataInfo = this.getDataInfo();
           		this.$refs[formName].validate(function(valid){
					    		if(valid){
                    _this.saveDataInfo(false,_this.$api.carBrandSaveAndEdit, _this.dataInfo, "","list");			    			
					    		}else{
					    			return false;
					    		}
					    	})
         }
    },
    computed:{
    },
    mounted () {
       this.loading = false;
    },
    created(){
    }
  }
</script>
<style>
.dpBrandAdd .el-form-item {
    margin-bottom: 15px;
}
.dpBrandAdd .el-input__inner {
    height: 40px;
    line-height: 40px;
}
.dpBrandAdd .el-radio-group {
    line-height: 0;
    padding-top: 11px;
}
.dpBrandAdd .el-progress-bar {
    padding-top: 11px;
}
.dpBrandAdd .el-textarea__inner {
    min-height: 40px !important;
}
</style>



