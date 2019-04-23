<template>
  <div style="width:100%;height:100%;padding:6px 6px 6px 0px;overflow:hidden">
    <div v-for="(item,index) in resourceData"  :key="index" 
      style="width: calc((100% - 24px) / 2); height: calc((100% - 24px) / 2);
      margin: 6px;display:inline-block;background:#2B2B2B" >
        <div  style="background:#2B2B2B;height:100%;border:1px solid #606266;
        box-shadow: 0 0 3px #606266;" >
          <div  style="height:26px;line-height:25px;font-size:12px;color:#C0C4CC;border-bottom:1px solid #606266;background-color:#3C3F41">
            <span style="margin-left:10px">{{item.name}}</span>
  
                <i class="iconfont icon-more"  
                   style="vertical-align: middle;line-height:25px;float:right;
                   cursor:pointer;font-size:16px;margin-right:10px"></i>
 
          </div>
          <div >
            <dpSimpleTopBar :echartId="item.echartId"  
                            :echartData="item.data" 
                            :echartContentStyle="echartContentStyle">
            </dpSimpleTopBar>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import dpSimpleTopBar from '@/components/dpechartNormal/bar/top-simple-bar' 

export default {
    components: {dpSimpleTopBar},
    data() {
      return {
          resourceData:[
              {name:"严重警告 Top5",echartId:"test01",
                data:{
                    xAxisData:['clw_mongo_spark01','clw_microservice03','znz-app5','车联网MYSQL物理机01','uap-db-master-03'],
                    legendData:"严重告警数量",
                    colors :['#F56C6C','#F56C6C',  '#F56C6C' ,'#F56C6C',  '#F56C6C'],
                    metaDate :[{hostid:1,value:302},
                               {hostid:2,value:198},
                               {hostid:3,value:76},
                               {hostid:4,value:55},
                               {hostid:5,value:23}],
                    unit:"",
                }
              },
              {name:"CPU Top5",echartId:"test02",
                data:{
                    xAxisData:['clw_mongo_spark01','clw_microservice03','znz-app5','车联网MYSQL物理机01','uap-db-master-03'],
                    legendData:"CPU使用率",
                    colors :['#F56C6C','#F56C6C',  '#F56C6C' ,'#F56C6C',  '#F56C6C'],
                    metaDate :[90.89,76.92,40.22,30.22,23.98],
                    unit:"%",
                }
              },
              {name:"内存 Top5",echartId:"test03",
                 data:{
                    xAxisData:['clw_mongo_spark01','clw_microservice03','znz-app5','车联网MYSQL物理机01','uap-db-master-03'],
                    legendData:"内存使用率",
                    colors :['#F56C6C','#F56C6C',  '#F56C6C' ,'#F56C6C',  '#F56C6C'],
                    metaDate :[90.89,76.92,40.22,30.22,23.98],
                    unit:"%",
                }
              },
              {name:"磁盘 Top5",echartId:"test04",
                 data:{
                    xAxisData:['clw_mongo_spark01','clw_microservice03','znz-app5','车联网MYSQL物理机01','uap-db-master-03'],
                    legendData:"磁盘使用率",
                    colors :['#F56C6C','#F56C6C',  '#F56C6C' ,'#F56C6C',  '#F56C6C'],
                    metaDate :[90.89,76.92,40.22,30.22,23.98],
                    unit:"%",
                }
              },
          ]
      }
    },
    computed:{
      echartContentStyle(){
        return {
            height:(this.$store.getters.mainHeight-12*3-26*2)/2+"px",
            width:((this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth)*0.84-30)/2,
        }
      }
    }
 
};
</script>
<style>
.icon-more{
  color:#C0C4CC;
}
.icon-more:hover{
  color:#606266;
}
</style>