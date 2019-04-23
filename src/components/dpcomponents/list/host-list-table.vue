<template>
  <div :style="hostListTableStyle" class="host-list-table" v-cloak>
    <el-scrollbar  :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle" tag="section" >
      <el-table
          @row-click="viewHostDetail"
          :data="getTableData"
          
          :style="tableStyle"
          style="width:970px;max-width:none;min-width:970px">
          <el-table-column
            show-overflow-tooltip
            label="主机名称"
            width="180">
              <template slot-scope="scope">
                <span style="color:#409EFF">{{ scope.row.name|| scope.row.hostName}}</span>
              </template>
          </el-table-column>
          <el-table-column
            prop="ip"
            label="IP"
            width="130">
             <template slot-scope="scope">
                <span style="color:#ca8622" >{{ scope.row.ip}}</span>
              </template>
          </el-table-column>
           <el-table-column
            prop="online"
            label="是否在线"
            :filters="[{text: '在线', value: 0}, {text: '离线', value: 1}]"
            :filter-method="filterHandler_online"
            width="100">
               <template slot-scope="scope">
                <div v-if="scope.row.online==0">
                  <i class="iconfont icon-flashlight_fill icon-host-warning"  
                     style="color:#67C23A"></i>
                  在线
                </div>
                <div v-if="scope.row.online==1">
                  <i class="iconfont icon-flashlight_fill icon-host-warning"  
                     style="color:#F56C6C"></i>
                  离线
                </div>
              </template>
          </el-table-column>  
          <el-table-column
            prop="status"
            label="状态"
            :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
            :filter-method="filterHandler_status"
            width="100">
               <template slot-scope="scope">
                 <div v-if="scope.row.status==0">
                  <i class="iconfont icon-remind_fill icon-host-warning"  
                     style="color:#67C23A"></i>
                  正常
                </div>
                 <div v-if="scope.row.status==1">
                  <i class="iconfont icon-remind_fill icon-host-warning"  
                      style="color:#E6A23C"></i>
                  警告
                </div>
                 <div v-if="scope.row.status==2">
                  <i class="iconfont icon-remind_fill icon-host-warning"  
                     style="color:#F56C6C"></i>
                  严重
                </div>                                
              </template>
          </el-table-column>  

          <template v-if='1==1'>
            <el-table-column
              sortable
              :sort-method='sortCpu'
              prop="cpu"
              label="CPU使用率"
              width="150">
              <template slot-scope="scope">
                <el-tooltip :content="scope.row.cpu+'%'" placement="top">
                  <div :style="getBarWidth(scope.row.cpu)"></div>
                </el-tooltip>
                <!-- <span style="color:#67C23A">{{ scope.row.cpu }}</span> -->
              </template>
            </el-table-column>
            <el-table-column
              sortable
              :sort-method='sortMemory'
              prop="memory"
              label="内存使用率"
              width="150">
               <template slot-scope="scope">
                 <el-tooltip :content="scope.row.memory+'%'" placement="top"> 
                   <div :style="getBarWidth(scope.row.memory)"></div>
                 </el-tooltip>  
                <!-- <span style="color:#67C23A">{{ scope.row.memory }}</span> -->
              </template>
            </el-table-column>

            <el-table-column
              prop="ip"
              label="操作"
              min-width="160">
                <template>
                  <span style="color:#67C23A"></span>
                </template>
            </el-table-column>
          </template>
        </el-table>
    </el-scrollbar>
  </div>
</template>

<script>


export default {
    // props:{
    //   hostList: {
    //     type: Array,
    //     required: true
    //   }
    // },
    data() {
      var hostList=[];
      for(var i=0;i<30;i++){
        var rand = Math.random();
        hostList.push({
          name:"Windows2012-15-11111111111111111111111111111111",
          ip:"255.255.255.255",
          online:rand>0.5?0:1,
          status:rand>0.7?0:(rand>0.4?1:2),
          cpu:(rand*100).toFixed(2),
          memory:(rand*100).toFixed(2),
        })
      }
      return {
          hostList:hostList,
          
      }
    },
    methods:{
        handleSizeChange(){
        },
        handleCurrentChange(){
        },
        getBarWidth(data){
          var color = data>90?'#F56C6C':(data>75?'#E6A23C':'#67C23A')
          return {
            height:"25px",
            width:data+"%",
            backgroundColor:color,
          }
        },
        filterHandler_online(){

        },
        filterHandler_status(){

        },
        sortCpu(a,b){
          return a.cpu - b.cpu
        },
        sortMemory(a,b){
          return a.memory - b.memory
        },      
        viewHostDetail(){
          this.$emit("viewHostDetail");
        }
    },
    computed:{
        hostListTableStyle(){
          return {"height":this.$store.getters.mainHeight-24-30-30+"px",
          width:(this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth)*0.84-18+"px"
          }
        },
        tableStyle(){
          return {
            maxWidth:'none',
            minWidth:'970px',
            width:(this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth)*0.84-18+"px",
          }
        },
        tableHeight(){
          return this.$store.getters.mainHeight-24-30-30;
        },
        viewStyle(){
          return {"height":this.$store.getters.mainHeight-24-30-30+"px",
          width:(this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth)*0.84-18+"px"
          }
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight-24-30-30+"px",
          width:(this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth)*0.84-18+"px"
          }
        },
        getTableData(){
          return this.hostList;
        }

    }        
 
};
</script>

<style >

.host-list-table .el-table--border, .el-table--group {
    border: 0px;
}

</style>
