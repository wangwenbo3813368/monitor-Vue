<template>
<div class="dp-self-contentReview">
  <div v-loading="loading"></div>
  

  <el-dialog 
	        :title="'审批历史'"
	        :visible.sync="dialog_contentOperateList" 
	        :close-on-click-modal = "true"
          :top="'3%'"
          width="70%"

          :modal-append-to-body = "false"
          :append-to-body="true"
          :lock-scroll="false"
          :fullscreen="false" 	                  
        >
       <div  class="dp-element-dialog-table ">
          <template>
          <el-table :data="contentOperateList" height="400" border style="width: 100%">
            <el-table-column prop="time" label="时间" width="180"></el-table-column>
            <el-table-column  label="操作" width="150">
              <template slot-scope="scope">
                <span v-if="scope.row.operateType=='approve'" style="color:#67C23A">{{ scope.row.operateTypeName }}</span>
                <span v-else-if="scope.row.operateType=='overrule'" style="color:#F56C6C">{{ scope.row.operateTypeName }}</span>
                <span v-else >{{ scope.row.operateTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="submitterName" label="送审人" width="130"></el-table-column>
            <el-table-column prop="reviewerName" label="审批人" width="130"></el-table-column>
            <el-table-column prop="message" label="审批意见" show-overflow-tooltip></el-table-column>
          </el-table>
        </template>
		  </div>
 </el-dialog>

  <el-container>
    
    <el-aside width="350px" >
      <div :class="searchFixed == true ? 'isFixed' :''" ref="needFixed" style="overflow: hidden;">
        <div class="dpCardContent" style="padding: 14px 7px 0px 22px;" >
          <span>
              <el-cascader    
                  filterable
                  :options="options.cascaderBrandSeriesList"
                  :show-all-levels="false"
                  :props="defaultProps"
                  style="width:180px"
                  placeholder="请选择品牌跟车系"
                  v-model="selectedOptions"
                  @change="handleChange">
              </el-cascader>
              <el-dropdown style="margin-left:6px" split-button type="primary"  size="small" @click="viewAll" @command="handleCommand">
                  <i class="el-icon-menu"> 全部</i>
                  <el-dropdown-menu  slot="dropdown"  >
                    <el-dropdown-item  command="-1" style="color:rgba(0,0,0,0.15)">查看未编辑</el-dropdown-item>
                    <el-dropdown-item  command="0" style="color:#909399">查看未提交</el-dropdown-item>
                    <el-dropdown-item  command="1" style="color:#67C23A">查看已通过</el-dropdown-item>
                    <el-dropdown-item  command="2" style="color:#F56C6C">查看未通过</el-dropdown-item>
                    <el-dropdown-item  command="3" style="color:#E6A23C">查看待审批</el-dropdown-item>
                  </el-dropdown-menu>
             </el-dropdown>
          </span>
        </div>
        <div v-if="catalogDetailContentTreeData!=null&&catalogDetailContentTreeData.length>0">
          <div style="padding-left:22px;font-size:12px;font-weight:200;color:rgba(64,158,255,0.75);margin-left:20px"
          v-if="activeFlag=='all'"
          >当前查看：全部目录</div>
          <div style="padding-left:22px;font-size:12px;font-weight:200;color:rgba(64,158,255,0.75);margin-left:20px"
          v-if="activeFlag=='-1'"
          >当前查看：未编辑内容目录</div>
          <div style="padding-left:22px;font-size:12px;font-weight:200;color:rgba(64,158,255,0.75);margin-left:20px"
          v-if="activeFlag=='0'"
          >当前查看：未提交审批目录</div>
          <div style="padding-left:22px;font-size:12px;font-weight:200;color:rgba(64,158,255,0.75);margin-left:20px"
          v-if="activeFlag=='1'"
          >当前查看：已通过审批目录</div>
          <div style="padding-left:22px;font-size:12px;font-weight:200;color:rgba(64,158,255,0.75);margin-left:20px"
          v-if="activeFlag=='2'"
          >当前查看：未通过审批目录</div>
          <div style="padding-left:22px;font-size:12px;font-weight:200;color:rgba(64,158,255,0.75);margin-left:20px"
          v-if="activeFlag=='3'"
          >当前查看：待审批目录</div>
        </div>

        <div style="height: calc(100vh - 165px); "> 
          <div class="tree dptree" style="width:350px;padding:0px;margin-top:6px;overflow: auto;">
                <el-tree  :indent='16' node-key="id"  :data="treeData"
                          :props="defaultProps"
                          :default-expanded-keys="['']"
                          @node-click="handleNodeClick"            
                          >
                   <div  class="custom-tree-node" slot-scope="{ node, data }">
                      <div  style="height:32px;
                        padding:4px 0px 4px 0px;font-size:14px;font-weight:200;line-height: 24px;                     
                        ">
                        <div v-if="data.children==undefined||data.children.length==0">
                        <el-tooltip class="item" effect="dark" :content="node.label" placement="right">
                          <div v-if="data.status=='-1'" style="color:rgba(0,0,0,0.15)"> {{ node.label }}</div>
                          <div v-if="data.status=='0'" style="color:#909399"> {{ node.label }}</div>
                          <div v-if="data.status=='1'" style="color:#67C23A"> {{ node.label }}</div>
                          <div v-if="data.status=='2'" style="color:#F56C6C"> {{ node.label }}</div>
                          <div v-if="data.status=='3'" style="color:#E6A23C"> {{ node.label }}</div>
                         </el-tooltip>
                        </div> 
                        <div v-else>
                          <div   style="color:rgba(0,0,0,0.85)"> {{ node.label }}</div>
                        </div> 
                      </div>
                   </div>   
                </el-tree>
          </div> 
        </div>

      </div>
    </el-aside>

    <el-main style="padding:0px;min-height:600px;border-left:1px solid rgb(221, 221, 221);
      margin-top:14px">
      <div v-if="catalogDetailContent!=null&&catalogDetailContent.content!=null&&catalogDetailContent.content.length>0"   style="
        ">
        <div class="dpElement" style="padding: 0px 0px 0px 8px">
            <el-button type="primary" icon="el-icon-check" style="" 
            v-if="catalogDetailContent.status=='3'" @click="approve">通过</el-button>
            <el-button type="primary" icon="el-icon-close" style="" 
            v-if="catalogDetailContent.status=='3'" @click="overrule">驳回</el-button>
            <el-button type="primary" icon="el-icon-refresh" style="" 
            v-if="catalogDetailContent.status=='1'||catalogDetailContent.status=='2'"
            @click="reset"
            >重置</el-button>
            <el-button type="primary" icon="el-icon-plus" style=""
             v-if="catalogDetailContent.status!='-1'"
             @click="viewContentOperateList"
             >查看审批历史</el-button>
             <span v-if="catalogDetailContent.status=='-1'" style="padding-left:22px;font-size:12px;font-weight:200;color:rgba(0,0,0,0.15)">此目录还没有维护相关内容</span>
             <span v-if="catalogDetailContent.status=='0'" style="padding-left:22px;font-size:12px;font-weight:200;color:#909399">此目录内容还未提交审批</span>
             <span v-if="catalogDetailContent.status=='1'" style="padding-left:22px;font-size:12px;font-weight:200;color:#67C23A">此目录内容已审批通过</span>
             <span v-if="catalogDetailContent.status=='2'" style="padding-left:22px;font-size:12px;font-weight:200;color:#F56C6C">此目录内容已驳回审批</span>
        </div> 
        <div>   
          <dpCardtextListView :cardtextList="catalogDetailContent.content">
          </dpCardtextListView>
        </div>

        <div class="dpElement" style="padding: 0px;margin-top:10px;margin-bottom:10px;margin-right:15%;float:right">
            <el-button type="primary" icon="el-icon-check" style=""  @click="approve"
            v-if="catalogDetailContent.status=='3'" >通过</el-button>
            <el-button type="primary" icon="el-icon-close" style=""   @click="overrule"
            v-if="catalogDetailContent.status=='3'">驳回</el-button>
            <el-button type="primary" icon="el-icon-refresh" style="" 
            v-if="catalogDetailContent.status=='1'||catalogDetailContent.status=='2'"  @click="reset"
            >重置</el-button>
            <el-button type="primary" icon="el-icon-plus" style=""
             v-if="catalogDetailContent.status!='-1'"  @click="viewContentOperateList"
             >查看审批历史</el-button>
        </div> 
      </div>
    </el-main>
</el-container>
</div>
</template>
<script type="text/ecmascript-6">
  import dpCardtextListView from '@/components/dpself/cardtext/dpCardtextListView' 
  import { getRand } from "@/untils/random";
  import { signParams } from "@/untils/sign";
  import api from "@/api/api";
  import axios from "axios";
  import dpOptionsMixns from "@/mixins/dpOptions";

  var rand = getRand();

  export default {
    props: {

    },
    mixins: [dpOptionsMixns],
    watch: {
        '$route' (to, from) {
          // 对路由变化作出响应...
          this.catalogTypeId = this.$route.params.catalogTypeId;
          this.treeData=[];
          this.selectedOptions=[];
          this.catalogDetailContent={
            id:'',
            content:[
              ],
            status:'-1',
            catalogDetailId:'',
          };
          var params={typeId:this.catalogTypeId};
          this.initOptionsData(this.$api.carCatalogCascaderList,params,"cascaderBrandSeriesList");
        }
    },    
    data() {
      return {
          catalogTypeId:this.$route.params.catalogTypeId,
          dialog_contentOperateList:false,
          searchFixed:false,
          selectedOptions:[],
          catalogDetailId:"",
          options:{
            cascaderBrandSeriesList:[]
          },
          catalogDetailContent:{
          },
          defaultProps: {
              children: 'children',
              label: 'name',
              value:'id'
          },           
          treeData:[],
          treeLeafData:[],
          catalogDetailContentTreeData:[],
          activeFlag:'all',
          contentOperateList:[]   
      }
    },
    components: { // 引入组件
      dpCardtextListView,dpOptionsMixns
    },
    methods: {
      handleNodeClick(data,node,el) {
        if(node.isLeaf==true){
           this.catalogDetailContent = {
              catalogDetailId:data.id
           };
           this.initCatalogDetailContent(data.id);
        }
      },
      handleChange(value){
        this.catalogDetailContent={};
        var params={seriesId:value[1],typeId:this.catalogTypeId};
        this.initListData(this.$api.carCatalogDetailBySeriesIdAndTypeList,params);
      },
      handleCommand(value){
        this.activeFlag = value;
        this.catalogDetailContent={};
        this.treeData =  this.getLeafByStatus(value);
      },
      viewAll(){
        this.activeFlag = "all";
        this.catalogDetailContent={};
        this.treeData =  this.catalogDetailContentTreeData;
      },
      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //var offsetTop = this.$refs.needFixed.offsetTop;        
        if (scrollTop >= 63) {
            this._data.searchFixed = true
        } else {
            this._data.searchFixed = false
        }
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
      setListData(data){
        this.catalogDetailContentTreeData = data;
        this.treeLeafData = this.getLeaf(this.catalogDetailContentTreeData);
        if(this.activeFlag=="all"){
          this.treeData =  data;
        }else{
          this.treeData = this.getLeafByStatus(this.activeFlag);
        }
      },
      getLeaf(tree){
        var tempTree = JSON.parse(JSON.stringify(tree));
        var leafData = [];
        while(tempTree.length>0){
          var temp = tempTree.shift();
          if(temp.children==undefined||temp.children.length==0){
            leafData.push(temp);
          }else{
            temp.children.forEach(function(item){
              tempTree.unshift(item);
            })
          }
        }
        return leafData;
      },
      getLeafByStatus(status){
          var leafData = [];
          this.treeLeafData.forEach(function(item){
             if(item.status==status){
               leafData.push(item);
             }
          })
          return leafData;
      },
      setOptionsData(data,option){
        this.$set(this.options,option,data);
      },
      initCatalogDetailContent(catalogDetailId){
        var url = this.$api.carCatalogDetailContentData;
        var params= {catalogDetailId:this.catalogDetailContent.catalogDetailId };
        this.loading = true;              
        axios.post(url, params)
            .then(res => {
                this.loading = false;
                if (res.status == true) {
                    this.setCatalogDetailContent(res.data);
                } else {
                    this.errorMessage('获取数据失败');
                }
            })
            .catch(error => {
                this.errorMessage('获取数据失败,请检查登录是否失效')
                this.loading = false;
            });
      },
      setCatalogDetailContent(data){
        if(data==null){
           this.catalogDetailContent.status ='-1'
           this.catalogDetailContent.content = [
                  {
                  composition:"0",
                  title:"",
                  content:"",
                  images:[]
                  }
              ];
        }else{
          this.catalogDetailContent.id = data.id;
          this.catalogDetailContent.status = data.status;
          this.catalogDetailContent.catalogDetailId = data.catalogDetailId;
          this.catalogDetailContent.content = data.textCardList;
        }
      },
      validateCatalogDetailContent(content){
        var flag = false;
         for(var i=0;i<content.length;i++){
          if(content[i].content!=null&&content[i].content!=""){
            flag=true;
            break;
          }
        }
        return flag;
      },
      viewContentOperateList(){
            this.dialog_contentOperateList = true;
            var url = this.$api.carContentOperateList;
            var params= {catalogDetailContentId:this.catalogDetailContent.id};
            this.loading = true;     
            axios.post(url, params)
                .then(res => {
                    this.loading = false;
                    if (res.status == true) {
                       this.contentOperateList = res.data;
                    } else {
                        this.errorMessage("获取数据失败");
                    }
                })
                .catch(error => {
                    this.errorMessage('获取数据失败,请检查登录是否失效');
                    this.loading = false;
                });
      },
      approve(){
          var operateObj={
               operateType : "approve",
               catalogDetailContentId : this.catalogDetailContent.id,
               alertMessage :'请输入通过意见',
               callbackMessageSuccess : '审批通过成功',
               callbackMessageError : '审批通过失败',
               successStatus : '1',
               errorStatus : this.catalogDetailContent.status
          };
          this.prompt(operateObj);

      },
      overrule(){
          var operateObj={
               operateType : "overrule",
               catalogDetailContentId : this.catalogDetailContent.id,
               alertMessage :'请输入驳回意见',
               callbackMessageSuccess : '审批驳回成功',
               callbackMessageError : '审批驳回失败',
               successStatus : '2',
               errorStatus : this.catalogDetailContent.status
          };
          this.prompt(operateObj);
      },
      reset(){
          var operateObj={
               operateType : "reset",
               catalogDetailContentId : this.catalogDetailContent.id,
               alertMessage :'请输入重置意见',
               callbackMessageSuccess : '审批重置成功',
               callbackMessageError : '审批重置失败',
               successStatus : '3',
               errorStatus : this.catalogDetailContent.status
          };
          this.prompt(operateObj);
      },
      prompt(operateObj){
          this.$prompt(operateObj.alertMessage, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                  }).then(({ value }) => {
                      var url = this.$api.carContentOperateSaveAndEdit;
                      var params= {catalogDetailContentId:operateObj.catalogDetailContentId
                      ,operateType:operateObj.operateType,message:value};
                      this.loading = true;     
                      this.catalogDetailContent.status=operateObj.successStatus;       
                      axios.post(url, params)
                          .then(res => {
                              this.loading = false;
                              if (res.status == true) {
                                  this.successMessage(operateObj.callbackMessageSuccess);
                              } else {
                                  this.catalogDetailContent.status=operateObj.errorStatus;
                                  this.errorMessage(operateObj.callbackMessageError);
                              }
                          })
                          .catch(error => {
                              this.catalogDetailContent.status=operateObj.errorStatus;
                              this.errorMessage('获取数据失败,请检查登录是否失效');
                              this.loading = false;
                          });
          });
      }
    },
    mounted () {
        window.addEventListener('scroll', this.handleScroll)
    },
    created(){
      this.catalogTypeId=this.$route.params.catalogTypeId;
      var params={typeId:this.catalogTypeId};
      this.initOptionsData(this.$api.carCatalogCascaderList,params,"cascaderBrandSeriesList");
    }
  }
</script>
<style scoped>
.isFixed{
    position:fixed;
    top:47px;
}
</style>

<style >
.dptree .el-tree-node__label {
    color: rgba(0, 0, 0, 0.65);
    -webkit-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
    height: 24px;
    line-height: 24px;
}
.dptree{
  border-right:0px;
  position: relative;
}
.dpCardContent .el-button {
  padding: 0px 13px 0px 13px;
  height:32px;
  line-height:32px;
  min-width:20px;
}
.dpCardContent .el-cascader {
    display: inline-block;
    position: relative;
    font-size: 14px;
    line-height: 32px;
    height:32px;
}
.dp-self-contentReview .el-cascader__label{
    line-height: 32px;
    height:32px;
}
.dp-self-contentReview .el-input__inner{
  height:32px;
  line-height: 32px;
}


.dp-self-contentReview .el-input-group{
  line-height:30px;
  width:200px;
  vertical-align: middle;
}
.dp-self-contentReview .el-input-group__append button.el-button{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    border-top-left-radius:0px;
    border-bottom-left-radius:0px;
    height:32px;
    min-width:48px;
}
.dp-self-contentManager .el-input-group__append button.el-button:hover{
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
}
</style>

<style>
  .dp-element-dialog-table  .el-table th {
    padding: 6px 0;
    border-bottom: 1px solid #e6ebf5 !important;
    background: #fafafa;
   }
  .dp-element-dialog-table  th{
    text-align: center;
    color: rgba(0,0,0,.85);
    font-weight: 500;
  }  
  .dp-element-dialog-table  .el-table td{
    padding:10px;
  }
 .dp-element-dialog-table  .el-table .el-table__row .cell {
    text-align: center;
    font-family: Monospaced Number,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(0,0,0,.65);
  }
</style>


