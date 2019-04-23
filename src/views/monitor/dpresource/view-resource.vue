<template>
 <div v-cloak>
   <el-container :style="contentStyle">
      <el-aside :style="leftStyle">
        <!-- 左侧部 -->       
          <div style="width:100%;height:100%;background:#2B2B2B;
           border:1px solid #606266;box-shadow:0 0 3px #606266;overflow:hidden">                   
            <dpTemplateList ></dpTemplateList>
          </div> 
      </el-aside>
      <el-main style="padding:0px;overflow:hidden;">
        <transition name="slide-main" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
   </el-container>
   <dpHistoryDialog :title="dialog_title" >              
   </dpHistoryDialog>
 </div>
</template>

<script>
import dpTemplateList from '@/components/dpcomponents/list/template-list' 
import dpHistoryDialog from '@/components/dpcomponents/dialog/history-dialog' 
import axios from 'axios'
import Date from '@/untils/date';
export default {
     data(){
       return {
         dialog_title:"",
       }
     },
     components:{dpHistoryDialog,dpTemplateList},
     computed:{      
        contentStyle(){
          return {"height":this.$store.getters.mainHeight+"px",width:"100%"};
        },
        leftStyle(){
          return {"height":this.$store.getters.mainHeight+"px",
                  padding:"12px 6px 12px 12px",width:"16%"};
        }
     },
     methods:{
       echartDomClick(title,hostid){
          this.dialog_title = title;
          this.$EventBus.$emit("historyDialogShow", {});
       }
     },
     created(){

     },
     beforeDestroy(){
        this.$EventBus.$off('echartDomClick',this.handle);
     },
     mounted(){
        this.$EventBus.$on("echartDomClick", ({title,hostid}) => {
                    this.echartDomClick(title,hostid);
        });
     }
 
};
</script>

<style>
</style>
