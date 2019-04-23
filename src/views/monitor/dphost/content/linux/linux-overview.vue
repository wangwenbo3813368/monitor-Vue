<template>
    <div style="padding:0px;overflow:hidden;font-size:0">
      <div v-if="1==2" class="host-view-block-inline-left" 
        style="font-size:13px;height:50px;width:calc((100% - 24px)*3 / 3);display:inline-block">
        <!--告警信息表格 高度根据数据的多少显示-此场景正常情况下的高度是比较小的-->
      </div> 

      <div class="host-view-block-inline-left " 
           :style="getHostViewBlockStyle(2,2,3)">
        <!--cpu 内存图-->       
          <div  class="host-view-block-header" >
            <span style="margin-left:10px">CPU与内存信息</span>
            <span style="margin-right:10px;float:right;color:#606266">2019-04-17 09:43:56</span>
          </div>
        <cpu-memory :echartId="'cpu-memory'"
                    :echartData="getCpuAndMemory" 
                    :echartContentStyle="getHostViewContentStyle(2,2,3)">
        </cpu-memory>
      </div> 
      <div class="host-view-block-inline-right "
           :style="getHostViewBlockStyle(2,1,3)">
        <!--磁盘图-->    
          <div  class="host-view-block-header">
            <span style="margin-left:10px">磁盘信息</span>
            <span style="margin-right:10px;float:right;color:#606266">2019-04-17 09:43:56</span>
          </div>
          <disk :echartId="'disk'"
                    :echartData="getDisk" 
                    :echartContentStyle="getHostViewContentStyle(2,1,3)">
          </disk>
      </div> 

      <div class="host-view-block-inline-left " 
           :style="getHostViewBlockStyle(2,2,3)">
        <!--网卡信息-->       
          <div  class="host-view-block-header">
            <span style="margin-left:10px">网卡信息</span>
            <span style="margin-right:10px;float:right;color:#606266">2019-04-17 09:43:56</span>
          </div>
        <netport :echartId="'netport'"
                    :echartData="getNetPort" 
                    :echartContentStyle="getHostViewContentStyle(2,2,3)">
        </netport>
      </div> 
      <div class="host-view-block-inline-right "
           :style="getHostViewBlockStyle(2,1,3)">
        <!--服务信息-->    
          <div  class="host-view-block-header">
            <span style="margin-left:10px">服务信息</span>
            <span style="margin-right:10px;float:right;color:#606266">2019-04-17 09:43:56</span>
          </div>
          <service  :echartId="'service'"
                    :echartData="getService" 
                    :echartContentStyle="getHostViewContentStyle(2,1,3)">
          </service>
             <!-- <div :echartId="'service'"
                    :echartData="getNetPort" 
                    :style="getHostViewContentStyle(2,2,3)">
        </div>  -->
      </div> 


      <div class="host-view-block-inline-left " 
           :style="getHostViewBlockStyle(4,1,4,null,'rgb(15,30,50)')">
        <!--cpu 内存图-->
        <div v-for="index in 10" :key="index">概述信息</div>
      </div> 
      <div class="host-view-block-inline-middle " 
           :style="getHostViewBlockStyle(4,1,4)">
        <!--cpu 内存图-->
        <div v-for="index in 10" :key="index">概述信息</div>
      </div> 
      <div class="host-view-block-inline-middle " 
           :style="getHostViewBlockStyle(4,1,4)">
        <!--cpu 内存图-->
        <div v-for="index in 10" :key="index">概述信息</div>
      </div> 
      <div class="host-view-block-inline-right " 
           :style="getHostViewBlockStyle(4,1,4)">
        <!--cpu 内存图-->
        <div v-for="index in 10" :key="index">概述信息</div>
      </div>                         

      <div class="host-view-block-inline-left host-view-block-inline-bottom" 
           :style="getHostViewBlockStyle(2,1,2)">
        <!--cpu 内存图-->
        <div v-for="index in 10" :key="index">概述信息</div>
      </div> 
      <div class="host-view-block-inline-right host-view-block-inline-bottom"
           :style="getHostViewBlockStyle(2,1,2)">
        <div v-for="index in 10" :key="index">概述信息1</div>
      </div> 

    </div>


</template>

<script>


import hostDetail from "@/mixins/hostDetail";
import elScrollbarChildren from "@/mixins/el-scrollbar-children"; 
//import CpuMemoey from '@/components/dpechartHost/lineAndGuage/cpu-memory-echart' 
import CpuMemoey from '@/components/dpechartHost/pieAndLine/cpu-memory-echart' 
import Disk from '@/components/dpechartHost/lineAndBar/disk-echart' 
import NetPort from '@/components/dpechartHost/line/netport-echart' 
import Service from '@/components/dpechartHost/table/service-table' 
export default {
     mixins:[hostDetail,elScrollbarChildren],
     components:{ 'cpu-memory':CpuMemoey,'disk':Disk,'netport':NetPort,'service':Service},
     data(){
        return {
        }
     },
     methods:{
     },
     computed:{      
        getCpuAndMemory(){
          //通过vuex中的cpu及memory数据 重新包装成echart需要的数据
          var legendData = ["CPU使用率","内存使用率"];
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
              markLine:[{value:86,name:'告警阈值'}],
              pieData:[
			           		{name:"CPU使用率",value:88.22},{name:"内存使用率",value:22.33}
				      ],
          }
          return  echartData;
        },
        getDisk(){
          var colors = ["#409EFF","#E6A23C"];
          var echartData={
              legendData:["磁盘使用率","磁盘使用量"],
              colors:colors,
              xAxisData:["C","D","E","F"],
              metaDate:[[20.01,30.09,29.78,90.88],[35.55,56.55,12.22,389.22]],
              unit:["%","G"],
              markLine:[{value:86,name:'告警阈值'}],

          }
          return  echartData;          
        },
        getNetPort(){
          var echartData = [];
          for(var i=0;i<50;i++){
              var legendData = ["流入","流出"];
              var colors = ["#F56C6C","#67C23A"];
              var xAxisData = []
              var metaDate =  [[],[]];

              var start = 1514182753000;
              for(var j=0;j<200;j++){
              xAxisData.push(new Date().getFullDateByClock(start+10000*j));
              metaDate[0].push((Math.random()*100).toFixed(2));
              metaDate[1].push((Math.random()*100).toFixed(2));
              }
              var unit = "M";
              var tempData={
                  legendData:legendData,
                  colors:colors,
                  xAxisData:xAxisData,
                  metaDate:metaDate,
                  unit:unit,
                  markLine:[{value:86,name:'告警阈值'}],
              }   
              echartData[i]={
                name:"GigabitEthernet1/0/"+i,
                status:i%2,
                data:tempData,
              }                    
          }
          return  echartData;    
        },
        getService(){
          var tableData = [];
          for(var i=0;i<50;i++){
             tableData.push({
               type:"数据库"+i,
               name:"172.17.36.1-GRMXTPTK_"+i,
               online:i%2,
               status:(i+1)%3,          
             })
          }
          return tableData;
        }
        
     }
 
};
</script>




