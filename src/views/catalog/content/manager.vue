<template>
<div class="dp-self-contentManager">
  <div v-loading="loading"></div>
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
              <el-dropdown style="margin-left:6px"  split-button type="primary"  size="small" @click="viewAll" @command="handleCommand">
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
        <div style="height: calc(100vh - 120px); "> 
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
                          <div v-if="data.status=='-1'" style="color:rgba(0,0,0,0.15)">{{ data.code?(data.code+" "):""}}{{ node.label }}</div>
                          <div v-if="data.status=='0'" style="color:#909399"> {{ data.code?(data.code+" "):""}}{{ node.label }}</div>
                          <div v-if="data.status=='1'" style="color:#67C23A"> {{ data.code?(data.code+" "):""}}{{ node.label }}</div>
                          <div v-if="data.status=='2'" style="color:#F56C6C"> {{ data.code?(data.code+" "):""}}{{ node.label }}</div>
                          <div v-if="data.status=='3'" style="color:#E6A23C"> {{ data.code?(data.code+" "):""}}{{ node.label }}</div>
                         </el-tooltip>
                        </div> 
                        <div v-else>
                          <div   style="color:rgba(0,0,0,0.85)"> {{ data.code?(data.code+" "):""}}{{ node.label }}</div>
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
      <div v-if="catalogDetailContent.content!=null&&catalogDetailContent.content.length>0"   style="
        ">
        <div class="dpElement" style="padding: 0px 0px 0px 8px">
            <el-button type="primary" icon="el-icon-document" style="" @click="saveContent">保存</el-button>
            <el-button type="primary" icon="el-icon-view"
            v-if="catalogDetailContent.status=='0'||catalogDetailContent.status=='2'" 
            style="margin-left:5px;" @click="submit">送审</el-button> 
            <span style="color:rgba(0,0,0,0.15);margin-left:20px;font-size:12px;font-weight:200;" v-if="catalogDetailContent.status=='-1'">注意：未保存有效内容，请先完善内容</span>    
            <span style="color:#67C23A;margin-left:20px;font-size:12px;font-weight:200;" v-if="catalogDetailContent.status=='1'">注意：当前审批通过状态（保存后需要重新送审）</span>     
            <span style="color:#E6A23C;margin-left:20px;font-size:12px;font-weight:200;" v-if="catalogDetailContent.status=='3'">注意：当前内容正在等待审批（保存后需要重新送审）</span>       
        </div> 
        <div>   
          <dpCardtextList :cardtextList="catalogDetailContent.content" >
          </dpCardtextList>
        </div>
        <div class="dpElement" style="padding: 0px;margin-top:10px;margin-bottom:10px;margin-right:15%;float:right">
            <el-button type="primary" icon="el-icon-document" style="" @click="saveContent">保存</el-button>
            <el-button type="primary" icon="el-icon-view"
            v-if="catalogDetailContent.status=='0'||catalogDetailContent.status=='2'" 
            style="margin-left:5px;" @click="submit">送审</el-button>      
        </div> 
      </div>
    </el-main>
</el-container>
</div>
</template>
<script type="text/ecmascript-6">
  import dpCardtextList from '@/components/dpself/cardtext/dpCardtextList' 
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
          searchFixed:false,
          selectedOptions:[],
          catalogDetailId:"",
          contentId:"",
          options:{
            cascaderBrandSeriesList:[]
          },
          catalogDetailContent:{
            id:'',
            content:[
              ],
            status:'-1',
            catalogDetailId:'',
          },
          defaultProps: {
              children: 'children',
              label: 'name',
              value:'id'
          },           
          treeData:[],
          treeLeafData:[],
          catalogDetailContentTreeData:[],
          activeFlag:'all'       
      }
    },
    components: { // 引入组件
      dpCardtextList,dpOptionsMixns
    },
    methods: {
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
      handleNodeClick(data,node,el) {
        if(node.isLeaf==true){
          //  this.catalogDetailContent = {
          //    id:'',
          //    status:'-1',
          //    catalogDetailId:data.id,
          //    content:[
          //         {
          //         composition:"0",
          //         title:"",
          //         content:"",
          //         images:[]
          //         }
          //     ]
          //  };
           this.catalogDetailId = data.id;
           this.initCatalogDetailContent(data.id);
        }
      },
      handleChange(value){
        this.catalogDetailContent={
            id:'',
            content:[
              ],
            status:'-1',
            catalogDetailId:'',
         };
        var params={seriesId:value[1],typeId:this.catalogTypeId};
        this.initListData(this.$api.carCatalogDetailBySeriesIdAndTypeList,params);
      },
      onScroll(a){
        console.log("滚动",a)
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
      saveContent(){
        if(this.validateCatalogDetailContent(this.catalogDetailContent.content)){
          var url = this.$api.carCatalogDetailContentSaveAndEdit;
          var params= {catalogDetailId:this.catalogDetailId,
          id:this.catalogDetailContent.id,content:this.generateContent(this.catalogDetailContent.content) }
          this.loading = true;            
          axios.post(url, params)
              .then(res => {
                  this.loading = false;
                  if (res.status == true) {
                      //重新保存过的内容，需要重新审批
                      this.catalogDetailContent.status='0';
                      this.catalogDetailContent.id = res.data.id;
                      this.successMessage('保存成功');
                  } else {
                      this.errorMessage('获取数据失败');
                  }
              })
              .catch(error => {
                  this.errorMessage('获取数据失败,请检查登录是否失效');
                  this.loading = false;
              });
        }else{
          this.warningMessage('未完善有效内容,不能进行保存');
        }
      },
      submit(){
        var url = this.$api.carContentOperateSaveAndEdit;
        var params= {catalogDetailContentId:this.catalogDetailContent.id,operateType:"submit"}
        this.loading = true;     
        this.catalogDetailContent.status='3';       
        axios.post(url, params)
            .then(res => {
                this.loading = false;
                if (res.status == true) {
                    //重新保存过的内容，需要重新审批
                    this.successMessage('送审成功');
                } else {
                    this.catalogDetailContent.status='0';
                    this.errorMessage('送审失败');
                }
            })
            .catch(error => {
                this.catalogDetailContent.status='0';
                this.errorMessage('获取数据失败,请检查登录是否失效');
                this.loading = false;
            });
      },
      initCatalogDetailContent(catalogDetailId){
        var url = this.$api.carCatalogDetailContentData;
        var params= {catalogDetailId:catalogDetailId }
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
      generateContent(content){
        //这里不能把svg的具体数据传到后台
        debugger;
        var newContent = JSON.parse(JSON.stringify(content));
        var ary =[];
        for(var i=0;i<newContent.length;i++){
          if((newContent[i].content!=null&&newContent[i].content!="")||newContent[i].images.length>0){
            var images = newContent[i].images;
            if(images!=null&&images.length>0){
              for( var j =0;j<images.length;j++){
                if(images[j].type=="svg"){
                   images[j].data=null;
                }
              }
            }
            ary.push(newContent[i]);
          }
        }
        return JSON.stringify(ary);
      },
      validateCatalogDetailContent(content){
        //至少维护了文字内容或者是图片信息
        var flag = false;
         for(var i=0;i<content.length;i++){
          if((content[i].content!=null&&content[i].content!="")||content[i].images.length>0){
            flag=true;
            break;
          }
        }
        return flag;
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
  min-width: 20px;
}
.dpCardContent .el-cascader {
    display: inline-block;
    position: relative;
    font-size: 14px;
    line-height: 32px;
    height:32px;
}
.dp-self-contentManager .el-cascader__label{
    line-height: 32px;
    height:32px;
}
.dp-self-contentManager .el-input__inner{
  height:32px;
  line-height: 32px;
}

.dp-self-contentManager .el-input-group{
  line-height:30px;
  width:200px;
  vertical-align: middle;
}
.dp-self-contentManager .el-input-group__append button.el-button{
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

