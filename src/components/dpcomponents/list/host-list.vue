<template>
  <div  style="margin:12px 12px 12px 6px;overflow:hidden;
    background:#2B2B2B;border:1px solid #606266;
    width: calc((100% - 18px)); height: calc((100% - 24px));
    box-shadow: 0 0 3px #606266;">
    <div class="host-list-search" style="height:29px;width:100%;border-bottom:1px solid #606266;">
      <el-input   :style="inputWidth"
         @focus="collInput(true)"  @blur="collInput(false)"
         placeholder="请输入主机名或IP查询" v-model="searchData">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <div class="close" :style="backgroundStyle"  @mouseover="hoverClose(true)" @mouseout="hoverClose(false)">
         <i class="iconfont icon-guanbi" 
              style="vertical-align: middle;height:28px;
              line-height:28px;color:#7F99AC;cursor:pointer;font-size:12px;margin:0 10px"></i>
      </div>
      <div style="float:right;">
         <i class="iconfont icon-gallery-view"  @click="changeHostListViewType('table')" v-if="viewType=='gallery'"
              style="vertical-align: middle;height:28px;line-height:28px;color:#ffffff;cursor:pointer;font-size:20px;margin-right:10px"></i>
         <i class="iconfont icon-menu"   @click="changeHostListViewType('gallery')" v-if="viewType=='table'"
              style="vertical-align: middle;height:28px;line-height:28px;color:#ffffff;cursor:pointer;font-size:20px;margin-right:10px"></i>
      </div>        
    </div>
    <transition  name="bounce" mode="out-in">
      <template v-if="getShowGallery"> 
        <keep-alive>  
          <dpHostListGallery  @viewHostDetail="viewHostDetail"></dpHostListGallery> 
        </keep-alive>
      </template>
       <template v-if="getShowTable" >
        <keep-alive>    
          <dpHostListTable  @viewHostDetail="viewHostDetail" ></dpHostListTable>
        </keep-alive>
      </template>  
    </transition>

     <dpPage></dpPage>
  </div>
</template>

<script>

import dpHostListGallery from '@/components/dpcomponents/list/host-list-gallery' 
import dpHostListTable from '@/components/dpcomponents/list/host-list-table' 
import dpPage from '@/components/dpcomponents/page/page' 
export default {
    components:{dpHostListGallery,dpHostListTable,dpPage},
    data() {
      return {
         searchData:"",
         inputWidth:{
           width:"165px"
         },
         backgroundStyle:{
           background:""
         },
         viewType:'table',
      }
    },
    methods:{
      collInput(flag){
        if(flag){
          this.inputWidth.width="320px";
        }else{
          if(this.searchData==""){
            this.inputWidth.width="165px";
          }        
        }
      },
      hoverClose(flag){
        if(flag){
          this.backgroundStyle.background="#3C3F41";
        }else{
          this.backgroundStyle.background="";
        }
      },
      changeHostListViewType(type){
        this.viewType = type;
      },
      viewHostDetail(){
        this.routerLinkSimple("/monitor/hostDetail");
      }
    },
    computed:{
       getShowGallery(){
         return this.viewType == 'gallery';
       },
       getShowTable(){
         return this.viewType == 'table';
       }
    }
 
};
</script>

<style>
.host-list-search .el-input__inner{
  font-size: 13px;
  background-color: #3C3F41;
  border-radius: 0px;
  border: 0px solid #DCDFE6;
  color:#C0C4CC;
  padding:0px 0px 0px 30px;
}
.host-list-search{
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  user-select: none;
}


</style>





<style scoped>
.close{
  float:right;
  border-left:1px solid #606266;
  cursor:pointer;
}
</style>
