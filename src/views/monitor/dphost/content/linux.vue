<template>
 
 <el-scrollbar :ref="'hostDetailScrollbar'" :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle"  tag="section">  
  <div :ref="'hostDetailScrollbar-div'">
    <div class="host-view-block host-view-block-first" style="fontSize:0;border-right:0px;border-bottom:0px;">
      <div class="host-view-div" v-for="(item,index) in basicInformation" :key="index"
          :style="getDivStyle(item.width)">
        <label class="host-view-label">
          {{item.label}}
        </label>  
        <template v-if="item.type=='status'">
            <div v-if="item.value==0" class="host-view-div-inline" style="color:#67C23A">
              <span class="host-view-div-span">
              <i class="iconfont icon-remind_fill icon-host-warning"  
                  style="color:#67C23A"></i>
              正常
              </span>
            </div>
            <div v-if="item.value==1" class="host-view-div-inline" style="color:#E6A23C">
              <span class="host-view-div-span">
              <i class="iconfont icon-remind_fill icon-host-warning"  
                  style="color:#E6A23C"></i>
              警告
              </span>
            </div>
            <div v-if="item.value==2" class="host-view-div-inline" style="color:#F56C6C">
              <span class="host-view-div-span">
              <i class="iconfont icon-remind_fill icon-host-warning"  
                  style="color:#F56C6C"></i>
              严重
              </span>
            </div>          
        </template>
        <template v-else-if="item.type=='online'">
              <div v-if="item.value==0" class="host-view-div-inline" style="color:#67C23A">
                <span class="host-view-div-span">
                  <i class="iconfont icon-flashlight_fill icon-host-warning"  
                      style="color:#67C23A"></i>
                  在线
                </span>
              </div>
              <div v-if="item.value==1" class="host-view-div-inline" style="color:#F56C6C">
                <span class="host-view-div-span">
                  <i class="iconfont icon-flashlight_fill icon-host-warning"  
                      style="color:#F56C6C"></i>
                  离线
                </span>
              </div> 
        </template>
        <template v-else >
          <div  class="host-view-div-inline" >
            <span class="host-view-div-span">
            {{item.value}}
            </span>
          </div>         
        </template>    
      </div>         
    </div>  

    <div class="host-view-block">
      <div style="width:100%;font-size:0;display:block;">
          <div :class="getSheetClass(1)" @click="openSheet(1)">
            <i class="iconfont  icon-item-manage tab-list-icon"></i>
            <span class="li-span">概述信息</span>
          </div>
          <div :class="getSheetClass(2)" @click="openSheet(2)">
            <i class="iconfont icon-item-manage tab-list-icon"></i>
            <span class="li-span">资产信息</span>
          </div>
          <div :class="getSheetClass(3)" @click="openSheet(3)">
            <i class="iconfont icon-item-manage tab-list-icon"></i>
            <span class="li-span">监控指标</span>
          </div>                     
      </div>
    </div>
    <transition  name="slide-top" mode="out-in">
      <component :is="currentComponet"></component>
      <!-- <template v-if="isActiveSheet(1)">
        <linuxOverview></linuxOverview> 
      </template>
      <template v-if="isActiveSheet(2)">
        <linuxAssets></linuxAssets>
      </template>
      <template v-if="isActiveSheet(3)">
        <linuxMonitor></linuxMonitor>
      </template> -->
    </transition>  
  </div>
 </el-scrollbar>
</template>

<script>
import elScrollbarParent from "@/mixins/el-scrollbar-parent"; 
import linuxOverview from '@/views/monitor/dphost/content/linux/linux-overview' 
import linuxAssets from '@/views/monitor/dphost/content/linux/linux-assets' 
import itemTrigger from '@/views/monitor/dphost/content/common/item-trigger'  //共同的sheet页  监控项与触发器的展示页面
export default {
     mixins:[elScrollbarParent],
     components:{linuxOverview,linuxAssets,"item-trigger":itemTrigger},
     data(){
        return {
          activeSheet:1,
          basicInformation:[
            {
               label:"主机名称",
               value:"Windows2012-15",
               width:[1,4],
            },
            {
               label:"操作系统",
               value:"Windows WINDOWS2012-15 6.3.9600 Microsoft Windows Server 2012 R2 Standard x64",
               width:[3,4],
            }
            ,
            {
               label:"IP地址",
               value:"192.168.1.1",
               width:[1,4],
            }
            ,
           {
               label:"是否在线",
               value:1,
               width:[1,4],
               type:'online',
            }
            ,
            {
               label:"主机状态",
               value:0,
               width:[1,4],
               type:'status',
            }
            ,
            {
               label:"运行时间",
               value:"1天5小时52分钟",
               width:[1,4],
            },            
          ]
        }
     },
     methods:{
        openSheet(index){
          this.activeSheet = index;
        },
        getSheetClass(index){
          if(index == this.activeSheet){
            return "dp-tap-li dp-tap-li-active";
          }else{
            return "dp-tap-li";
          }
        },
        isActiveSheet(index){
          return this.activeSheet == index;
        },
        getDivStyle(widthAry){
          var rate = 100*widthAry[0]/widthAry[1];
          return {
                 width:"calc( "+rate+"% )"
                 }
        }    
     },
     computed:{      
        viewStyle(){
          return {"height":this.$store.getters.mainHeight-12
          -(this.$store.state.sys.hostContentWidthRate==1?0:52)+"px",
          width:(this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth)*this.$store.state.sys.hostContentWidthRate+"px"};
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight-12
          -(this.$store.state.sys.hostContentWidthRate==1?0:52)+"px",
          width:(this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth)*this.$store.state.sys.hostContentWidthRate+"px"};
        },
        currentComponet(){
          var component = "linuxOverview";
          switch(this.activeSheet){
            case 1:
               component =  'linuxOverview';
               break;
            case 2:
               component = 'linuxAssets';
               break;
            case 3:
               component = 'item-trigger';
               break;                             
          }
          return component;
        }
        
     }

 
};
</script>

<style scoped>
.dp-tap-li{
  display: inline-block;
  cursor: pointer;
  height:26px;
  padding:0px;
  margin:0px;
  line-height:26px;
  width:calc( 33.33% );
  text-align:center;
  background-color:#3C3F41;
  color:#C0C4CC;
  vertical-align:top;
}
.dp-tap-li:hover{
  color:#409EFF;
}
.dp-tap-li-active{
 background-color:#2B2B2B;
 color:#409EFF;
}
.tab-list-icon{
  vertical-align:middle;
  margin:0 10px;

}
.li-span{
  font-size: 13px;
  vertical-align:middle;
}
.host-view-div{
  display:inline-block;
  height:24px;
  line-height: 24px;
}
.host-view-label{
  display:inline-block;
  font-size:13px;
  width:90px;
  text-align: center;
  color:#409EFF;
  background-color:#3C3F41;
  border-bottom: 1px solid #606266;
  white-space:nowrap;
  overflow: hidden;
  text-overflow:ellipsis;

}
.host-view-div-inline{
  font-size: 12px;
  display:inline-block;
  border-bottom: 1px solid #606266;
  border-left: 1px solid #606266;
  border-right: 1px solid #606266;
  width: calc( 100% - 90px );
  white-space:nowrap;
  padding-left:10px;
  text-overflow:ellipsis;
  color:#ca8622;
  vertical-align:top;
}
.host-view-div-span{
  height:24px;
  line-height: 24px;
  display: block; 
  width: calc( 100%);
  white-space:nowrap; 
  overflow:hidden; 
  text-overflow:ellipsis;
}
</style>



