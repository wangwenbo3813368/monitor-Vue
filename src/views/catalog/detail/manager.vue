<template>
<div class="dp-self-element dp-catalog-tree cms-body flex " >
<a class="cms-back" href="javascript:void(0)" @click="backToListManageer"></a>
<el-dialog 
	        :title="title"
	        :visible.sync="dialog_add_edit" 
	        :close-on-click-modal = "false"
          :top="'8%'"
          :width="'40%'"

          :modal-append-to-body = "false"
          :append-to-body="false"
          :lock-scroll="false"
          :fullscreen="false" 	                  
        >
        <div >
          <div style="border-bottom: 1px solid rgb(221, 221, 221);">
            <el-form   :model="currentCatalogDetail" ref="add_catalogDetail_form" :rules="rules"  >
              <el-form-item  label="目录编号" :label-width="'25%'"  prop="code">
                   <el-input v-model="currentCatalogDetail.code" style="width:80%" maxlength=30 placeholder="请输入目录编码(最多30个字符)" auto-complete="off" ></el-input>
              </el-form-item>	          
              <el-form-item  label="目录名称" :label-width="'25%'"  prop="name">
                   <el-input v-model="currentCatalogDetail.name" style="width:80%" maxlength=30 placeholder="请输入目录名称(最多30个字符)" auto-complete="off" ></el-input>
              </el-form-item>				
              <el-form-item  label="关键词" :label-width="'25%'"  >
                   <el-input type="textarea" autosize :rows="2" style="width:80%"   v-model="currentCatalogDetail.tags" maxlength="60" placeholder="多个关键词请用空格隔开" auto-complete="off"></el-input>
              </el-form-item>				
               <el-form-item label="排序" :label-width="'25%'"  prop="sort">
                   <el-input-number v-model="currentCatalogDetail.sort" style="width:80%" :min="1" :max="100000" label="请输入排序(最大值为100000)"></el-input-number>
              </el-form-item>			    				    					          
            </el-form>
           </div>
		       <div style="float:right;margin-top:10px">
            <el-button  @click="close_catalogDetail">取消</el-button>
            <el-button type="primary" style="color:#fff" @click="save_catalogDetail('add_catalogDetail_form')" >确定</el-button>				    		 
		      </div>	
		   </div>
 </el-dialog>

<el-container>
  <el-header style="height:50px;background: #fbfbfb;" v-if="catalogDataDetailList.length==0">
      <div style="display:inline-block;">
        
          <el-button  icon="el-icon-plus"  @click="addCatalogDetail_firstLevel(0)" >新增一级目录</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="refresh" >刷新</el-button>
       
      </div>
      <div style="display:inline-block;float:right;margin-left:10px;margin-right:60px">
          <el-tooltip class="item" effect="dark" content="非专业人员请勿操作" placement="top">
              <el-button  type="primary" icon="el-icon-setting" @click="advancedConfig">高级配置</el-button>
          </el-tooltip>
      </div>
      <div style="display:inline-block;float:right;margin-left:10px;">
            <el-upload
              class="upload-demo"     
              :action="excelUploadUrl"
              list-type="picture"
              :before-upload="beforeAvatarUpload"
              :on-success="uploadExcelSuccess"
              :show-file-list="false"
              >
              <el-button  type="primary" icon="el-icon-upload2">上传目录</el-button>            
            </el-upload>
      </div>
      <div style="display:inline-block;float:right;">
           <el-checkbox v-model="checked" @change="changeChecked">目录是否有编号</el-checkbox>
      </div> 
  </el-header>

  <el-main>
    
    <div class="tree dptree" style="padding:0px;margin:0px;min-width:1000px">
        <div class="custom-tree-nodea" style="background: #fafafa;border-top: 1px solid #e8e8e8;border-bottom: 1px solid #e8e8e8;">
          <div style="display:inline-block;height:54px;border-left: 1px solid #e8e8e8;
              vertical-align: middle;text-align: left;line-height:54px;padding-left:15px;">编号
              <span style="font-size:12px;font-weight:100;color:rgba(0,0,0,0.35)">  当前车系:{{catalogName}}</span></div>
          <div class="last" style="height:54px;border-left: 1px solid #e8e8e8;
          vertical-align: middle;text-align: center;line-height:54px;">
            <div style="width:300px;padding:0px;margin:0px;border-right: 1px solid #e8e8e8;">目录</div>
            <div style="width:200px;padding:0px;margin:0px;border-right: 1px solid #e8e8e8;">关键字</div>
            <div style="width:320px;padding:0px;margin:0px;">操作</div>
          </div>
        </div>
        <el-tree   node-key="id" :data="catalogDataDetailList" :props="defaultProps"  
                  :default-expanded-keys="['']"   :expand-on-click-node="false" 
                  >
               <div  class="custom-tree-nodea" slot-scope="{ node, data }">
                  <div  style="height:54px;
                    padding:16px 0px 16px 0px; 
                    ">
                    {{ data.code||data.name  }}
                  </div>

                  <div style="height:54px;border-left: 1px solid #e8e8e8;" class="last">
                    <div style=" white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:300px; 
                    height:54px;line-height: 54px;border-right: 1px solid #e8e8e8; text-align: center; " > 
                      {{ data.name }}
                   </div>     
                   <div style=" white-space:nowrap;overflow:hidden; text-overflow:ellipsis;width:200px; 
                   height:54px;line-height: 54px;border-right: 1px solid #e8e8e8; text-align: center; " > 
                      {{ data.tags }}
                   </div>                     
                    <div  style="height:54px;
                    padding:16px 0px 16px 20px;width:320px;                    
                    ">                    
                      <el-button
                        type="text"
                        size="mini"
                        icon="el-icon-plus"
                        @click="addCatalogDetail_sameLevel(node,data)"
                        >
                        新增同级
                      </el-button>
                      <el-button
                        type="text"
                        size="mini"
                        icon="el-icon-plus"
                        @click="addCatalogDetail_nextLevel(node,data)"
                        >
                        新增下级
                      </el-button>
                      <el-button
                        type="text"
                        size="mini"
                        icon="el-icon-edit"
                        @click="editCatalogDetail(node,data)"
                        >
                        修改
                      </el-button>
                      <el-button
                        type="text"
                        size="mini"
                        icon="el-icon-delete"
                        @click="getCatalogDetailDeleteMessage(node,data)"
                        >
                        删除
                      </el-button>                    
                    </div>
                  </div>
              </div>                 
        </el-tree>
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

  var rand = getRand();

  export default {
    mixins: [dpFormMixns],
     watch: {
        '$route' (to, from) {
          // 对路由变化作出响应...
          this.catalogTypeId = this.$route.params.catalogTypeId;
          var params={catalogId:this.catalogId};
          this.initListData(this.$api.carCatalogDetailList,params);
        }
    },
    data() {
      var _this = this;
      var validateRepeat =function(rule, value, callback){
           var flag=false;
           var children=[];
           if(_this.currentTreeAddType=="sameLevel"||_this.currentTreeAddType=="nextLevel"){
              if(_this.currentTreeAddType=="sameLevel"){
                 var parent = _this.currentTreeSelectedNode.parent;
                 children = parent.data.children||parent.data;
              }else{
                 children = _this.currentTreeSelectedNodeData.children||[];
              }
              children.forEach(function(item){
                if(item.name==value){
                  flag=true;
                  return false;
                }
              });
           }else if(_this.currentTreeAddType=="edit"){
              var parent = _this.currentTreeSelectedNode.parent;
              children = parent.data.children||parent.data;
              var count=0;
              children.forEach(function(item){
                if(item.name==value){
                  count++;
                  if(count>1){
                     flag=true;
                     return false;
                  }
                }
              });
           }
          if(flag==false){
            callback();
          }else{
            callback(new Error('同级目录已存在同名重复目录'));
          }
        };

      let api = this.$api; //API地址
      return {
         excelUploadUrl:this.$store.state.sys.baseUrl+api.carCatalogDetailUploadExcel+"?appId="+process.env.appId+
        "&sessionKey="+localStorage.getItem("sessionKey")+
        "&type="+"attach"+
        "&nonceStr="+rand+
        "&mark="+false+
        "&catalogId="+ this.$route.query.id.id,
        checked:false,
        catalog:this.$route.query.id,
        catalogId: this.$route.query.id.id,
        catalogName: this.$route.query.id.seriesName,
        catalogTypeId:this.$route.params.catalogTypeId,
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
          sort: [
                 {required: true, message: '请输入排序(最大值为100000)', trigger: 'blur' }
                 ],
          name: [
                 {required: true, message: '请输入目录名称(最多30个字符)', trigger: 'blur' },
                 {validator: validateRepeat, trigger: 'blur' }
                 ],  
                          
          },
        currentCatalogDetail:{},
        currentPageSize:15,
        currentPageNumber:1,
        currentTreeSelectedNode:{},
        currentTreeSelectedNodeData:{},
        currentTreeAddType:"",
        pageTotal:0,
        defaultProps:{
          children: 'children',
          label: 'name'
        },
        catalogDataDetailList:[]
      }
    },
    components: { // 引入组件
 
    },
    methods: {
        changeChecked(value){
             if(value=true){
               this.excelUploadUrl=this.$store.state.sys.baseUrl+api.carCatalogDetailUploadExcel+"?appId="+process.env.appId+
                  "&sessionKey="+localStorage.getItem("sessionKey")+
                  "&type="+"attach"+
                  "&nonceStr="+rand+
                  "&mark="+false+
                  "&catalogId="+ this.$route.query.id.id+
                  "&valueType=code";
             }else{
                 this.excelUploadUrl=this.$store.state.sys.baseUrl+api.carCatalogDetailUploadExcel+"?appId="+process.env.appId+
                  "&sessionKey="+localStorage.getItem("sessionKey")+
                  "&type="+"attach"+
                  "&nonceStr="+rand+
                  "&mark="+false+
                  "&catalogId="+ this.$route.query.id.id;             
             }
        },
        backToListManageer(){
           this.routerLink("/catalogContent/seriesList/"+this.catalogTypeId, "list");
        },
        advancedConfig(){
          this.routerLink("/catalogContent/advancedConfig/"+this.catalogTypeId, "list",this.catalog);
        },
        beforeAvatarUpload(file) {
          var name = file.name.substring(file.name.lastIndexOf('.')+1);
          const isExcel = ((name === 'xls')||(name === 'xlsx'));
          if (!isExcel) {
            this.$message.error('上传文件只能是 xls或者xlsx 格式!');
          }
          return isExcel;
        },
        uploadExcelSuccess(d){
             if(d.status){
                this.successMessage("操作成功");
                this.refresh();
              }else{
                this.errorMessage(d.message);
              }

         },
         close_catalogDetail(){
           this.dialog_add_edit=false;
         },
         addCatalogDetail_firstLevel(parentid){
           this.title="新增一级目录";
           this.currentCatalogDetail = {};
           this.currentCatalogDetail.catalogId= this.catalogId;
           this.currentCatalogDetail.parentId = parentid;
           //默认计算推荐排序 每次预留100个空间
           this.currentCatalogDetail.sort = 100;
           this.currentTreeAddType = "createFirst";
           this.dialog_add_edit=true;
         },
         addCatalogDetail_sameLevel(node,data){
           this.currentCatalogDetail = {};
           this.currentCatalogDetail.parentId = data.parentId;
           //默认计算推荐排序 每次预留100个空间
           this.currentCatalogDetail.sort = 100+node.parent.childNodes.length*100;
           this.setcurrentCatalogAndTree(node,data,"sameLevel","新增同级目录");
         },
         addCatalogDetail_nextLevel(node,data){
           this.currentCatalogDetail = {};
           //在使用异步页面展示与数据保存中 新增下级目录比较特殊 因为他依赖于父级的ID 而父级的ID是由后台程序生成 做个延迟提示
           this.currentCatalogDetail = {};
           if(data.id==undefined){
             this.warningMessage("请稍候,等待上一步操作完成再继续");
             return;
           }
           this.currentCatalogDetail.parentId = data.id;
           this.currentCatalogDetail.sort = 100+node.childNodes.length*100;
           this.setcurrentCatalogAndTree(node,data,"nextLevel","新增下级目录");
         },
         editCatalogDetail(node,data){
           this.currentCatalogDetail = data;
           this.currentCatalogDetail.parentId = data.parentId;
           this.setcurrentCatalogAndTree(node,data,"edit","修改当前目录");
         },
         setcurrentCatalogAndTree(node,data,type,title){
           this.title=title;
           this.currentCatalogDetail.catalogId= this.catalogId;          
           this.currentTreeSelectedNode = node;
           this.currentTreeSelectedNodeData = data;
           this.currentTreeAddType = type;
           this.dialog_add_edit=true;
         },
         getCatalogDetailDeleteMessage(node,data){
           this.currentTreeSelectedNode = node;
           this.currentTreeSelectedNodeData = data; 
                axios.post(this.$api.carCatalogDetailDeleteMessage, {id:data.id})
                    .then(res => {
                        if (res.status == true) {
                            this.loading = false;
                            var level = res.data.level;
                            if(level<2){
                                //直接删除
                                this.deleteCatalogDetail(data.id);
                            }else if(level==2){
                                //提示删除
                               this.$confirm('将删除所有子目录和已经维护的内容,是否确定删除？', '警告', { type: "error" })
                                .then(mes => {
                                    this.deleteCatalogDetail(data.id);
                                })
                                .catch(error => { });
                            }else{
                                //密码删除
                              this.$prompt("删除数据过多,请输入管理员删除密码进行验证", '提示', {
                                          confirmButtonText: '确定',
                                          cancelButtonText: '取消',
                                          inputPlaceholder:'请输入管理员专用删除密码',
                                          inputValidator(value){
                                                 if(value==null||value.trim()==""){
                                                   return false;
                                                 }
                                                 return true;
                                          },
                                          inputErrorMessage: '密码不能为空'
                                        }).then(({ value }) => {
                                          this.deleteCatalogDetail(data.id,value);
                                });
                               
                            }
                        } else {
                            this.errorMessage('获取数据失败');
                        }
                    })
                    .catch(error => {
                        console.log(111,error)
                        this.errorMessage('获取数据失败,请检查登录是否失效')
                        this.loading = false;
                    });
         },
         deleteCatalogDetail(id,password){
                    var parent = this.currentTreeSelectedNode.parent;
                    var children = parent.data.children||parent.data;
                    //考虑排序
                    var index=0;
                      for(;index<children.length;index++){
                          if(this.currentTreeSelectedNode.data.id==children[index].id){
                            break;
                          }
                      }                                               
                    children.splice(index,1); 
                    //如果删除失败 则提示 并刷新
                    axios.post(this.$api.carCatalogDetailDeleteCascaderById, { id: id,password:password}).then(res => {
                        if (res.status == false) {
                            this.errorMessage(res.message);
                            this.refresh();
                        }
                    }).catch(error => {
                        this.errorMessage('删除数据失败,请检查登录是否失效');
                        this.refresh();
                    });
         },
         getDataInfo(){
             var obj = {};
             obj = this.currentCatalogDetail;
             return obj;
         },
         save_catalogDetail(formName){
              var _this = this;
              this.dataInfo = this.getDataInfo();
           		this.$refs[formName].validate(function(valid){
					    		if(valid){
                     //先修改前端 在请求后端 如果请求失败刷新 如果成功不做处理
                     if(_this.currentTreeAddType=="createFirst"){
                          _this.catalogDataDetailList.push(_this.dataInfo);
                     }else if(_this.currentTreeAddType=="nextLevel"){
                          if (!_this.currentTreeSelectedNodeData.children) {
                            _this.$set(_this.currentTreeSelectedNodeData, 'children', []);
                          }
                          //考虑排序
                          var index_insert=0;
                           for(;index_insert<_this.currentTreeSelectedNodeData.children.length;index_insert++){
                                if(_this.currentTreeSelectedNodeData.children[index_insert].sort>_this.dataInfo.sort){
                                  break;
                                }
                           }
                          _this.currentTreeSelectedNodeData.children.splice(index_insert,0,_this.dataInfo);                        
                     }else if(_this.currentTreeAddType=="sameLevel"){
                          var parent = _this.currentTreeSelectedNode.parent;
                          var children = parent.data.children||parent.data;
                          //考虑排序
                          var index_insert=0;
                           for(;index_insert<children.length;index_insert++){
                                if(children[index_insert].sort>_this.dataInfo.sort){
                                  break;
                                }
                           }                                               
                          children.splice(index_insert,0,_this.dataInfo); 
                     }else if(_this.currentTreeAddType=="edit"){
                          var parent = _this.currentTreeSelectedNode.parent;
                          var children = parent.data.children||parent.data;
                          var childrenNodes = parent.childNodes;
                          children.sort(function(a,b){
                            return a.sort-b.sort;
                          });
                          childrenNodes.sort(function(a,b){
                            return a.data.sort-b.data.sort;
                          });                         
                     }                      
                     _this.saveDataInfo(true,_this.$api.carCatalogDetailSaveAndEdit, _this.dataInfo, "dialog_add_edit",null,true);			    			
					    		}else{
					    			return false;
					    		}
					    	})
         },
         reset(data){
             //对于新增的目录条目，需要把ID写回
             this.currentCatalogDetail.id = data.id;

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
                    } else {
                        this.errorMessage('获取数据失败');
                    }
                })
                .catch(error => {
                    this.errorMessage('获取数据失败,请检查登录是否失效')
                    this.loading = false;
                });
         },
         refresh(){
            var params={catalogId:this.catalogId};
            this.initListData(this.$api.carCatalogDetailList,params);
         },
         setListData(data){
           debugger;
           this.catalogDataDetailList = data;
         }
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
       //window.addEventListener('scroll', this.handleScroll)
    },
    created(){
      this.catalogDataDetailList=[];
      this.catalogTypeId=this.$route.params.catalogTypeId;
      var params={catalogId:this.catalogId};
      this.initListData(this.$api.carCatalogDetailList,params);
    }
  }
</script>
<style>

.dp-catalog-tree .tree{
  width:100%;
  position:relative;
}
.dp-catalog-tree .tree{
  width:100%;
}

.dp-catalog-tree .tree .el-tree-node__content {
    height: 54px;
    border-bottom: 1px solid #e8e8e8;
    border-left: 1px solid #e8e8e8;
}


 div.custom-tree-nodea{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    height:54px;
    width:100%;
    flex:1;
  }

.custom-tree-nodea .last{
      width:820px;
      display: flex;
      justify-content: flex-end;
}
.dp-catalog-tree .el-tree-node__content>.el-tree-node__expand-icon {
    padding: 6px 6px 6px 15px;
}

.dp-catalog-tree .el-input-number {
    line-height: 30px;
}
</style>



