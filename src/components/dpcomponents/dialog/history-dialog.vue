<template>
  <!-- 简单的用于显示历史数据的dialog -->
 <div class="dpDialog" >
    <el-dialog 
    :title="title"
    :visible.sync="dialog_visible" 
    :center="true"
    width="90%" 
    top="2%"
    :close-on-click-modal = "false"            
        >
        <div >
        <template style="z-index:105;">
            <div
            v-loading="loading"
            :element-loading-text="'拼命加载中'"
            :element-loading-spinner="'el-icon-loading'"
            :element-loading-background="'rgba(0, 0, 0, 0.5)'"   
            id="echart_history_dialog" 
            :style="contentStyle">
            <dpMulSimpleLine :echartId="'echart_history_dialog'"  
                            :echartData="echartData" 
                            :echartContentStyle="contentStyle">
            </dpMulSimpleLine>
            </div>	 
        </template>

        </div>
    </el-dialog>   
 </div>
 
</template>

<script>
import axios from 'axios'
import Date from '@/untils/date';
import dpSingleSimpleLine from '@/components/dpechartNormal/line/single-simple-line' 
import dpMulSimpleLine from '@/components/dpechartNormal/line/mul-simple-line' 
export default {
    watch:{
      dialog_visible: {
    　　　　handler(newValue, oldValue) {
               this.$nextTick(function(){
                  if(newValue==true){
                      //ajax
                      //渲染
                    var legendData = ["流入","流出"];
                    var colors = ["#E6A23C","#409EFF"];
                    var xAxisData = []
                    var metaDate =  [[],[]];
                    
                    var start = 1514182753000;
                    for(var i=0;i<200;i++){
                    xAxisData.push(new Date().getFullDateByClock(start+10000*i));
                    metaDate[0].push((Math.random()*100).toFixed(2));
                    metaDate[1].push((Math.random()*100).toFixed(2));
                    }
                    var unit = "%";
                    var echartData={
                        legendData:legendData,
                        colors:colors,
                        xAxisData:xAxisData,
                        metaDate:metaDate,
                        unit:unit,
                        markLine:[{value:86,name:'告警阈值'}]
                    }
                    this.echartData = echartData;
                  }
               }) 
    　　　　},
    　　　　deep: true
　　  }
    },
    props: {
      title:{
        type: String,
        required: true
      },
    },
    components:{dpSingleSimpleLine,dpMulSimpleLine},
    data(){
        var legendData = ["流入","流出"];
        var colors = ["#E6A23C","#409EFF"];
        var xAxisData = []
        var metaDate =  [[],[]];
        
        var start = 1514182753000;
        for(var i=0;i<200;i++){
        xAxisData.push(new Date().getFullDateByClock(start+10000*i));
        metaDate[0].push((Math.random()*100).toFixed(2));
        metaDate[1].push((Math.random()*100).toFixed(2));
        }
        var unit = "%";
        var echartData={
            legendData:legendData,
            colors:colors,
            xAxisData:xAxisData,
            metaDate:metaDate,
            unit:unit,
            markLine:[{value:86,name:'告警阈值'}]
        }
        return {
            dialog_visible:false,
            loading:false,
            echartData:echartData,
        }
    },
    methods:{
        show(){
            this.dialog_visible = true;
        }
    },
    computed:{
      dialog_visible_inside:{
        get:function() {
          return this.dialog_visible
        },
        set:function(value) {
          this.dialog_visible =value
        }
      },
      contentStyle(){
        return {"height":this.$store.state.sys.clientHeight-100+"px",width:"100%"};
      }
    },
    mounted(){
        this.$EventBus.$on("historyDialogShow", ({}) => {
                    this.show();
        });
    },
     beforeDestroy(){
        this.$EventBus.$off('historyDialogShow',this.handle);
     },   
    
 
};
</script>

<style>

.dpDialog .el-dialog--center .el-dialog__body{
   display:block;
   padding:0px;
   background: rgb(15,30,50);
}
 
.dpDialog .el-dialog__header{
  padding: 5px 20px 5px;
  background:rgba(150,50,50,1);
}
.dpDialog .el-dialog__headerbtn{
    top:6px;
}
.dpDialog .el-dialog__title{
   font-size:12px;
   color:#C0C4CC ;
}
.dpDialog  .el-dialog__wrapper{
    height:98%;
    overflow:hidden;
    opacity:0.9;
 }



</style>
