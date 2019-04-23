<template>
    <div class="host-view-block host-view-block-last" style="border-right:0px;">
    <el-table
          :data="[]"
          style="width:calc((100%));max-width:none;">
          <el-table-column
					  prop="name"
            show-overflow-tooltip
            label="主机名称"
            min-width="20%">
          </el-table-column>
          <el-table-column
					  prop="name"
            show-overflow-tooltip
            label="IP"
            min-width="10%">
          </el-table-column>          
          <el-table-column
            :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
				  	prop="resourceType"
            show-overflow-tooltip
            label="资源类型"
            min-width="10%">        
          </el-table-column>
          <el-table-column
            :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
				  	prop="templateType"
            show-overflow-tooltip
            label="模板类型"
            min-width="10%">          
          </el-table-column>          
          <el-table-column
            :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
				  	prop="online"
            show-overflow-tooltip
            label="是否在线"
            min-width="10%">          
          </el-table-column>               
          <el-table-column
            :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
				  	prop="status"
            show-overflow-tooltip
            label="主机状态"
            min-width="10%">                        
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="操作"
            min-width="10%">
            
          </el-table-column>                                                            
      </el-table>	      
     <el-scrollbar  :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle" tag="section" > 
      <el-table
          :data="tableData"
          border
          :show-header="false"
          @row-click="showHostDetail(row)"
          style="width:calc((100%));max-width:none;">
          <el-table-column
					  prop="name"
            show-overflow-tooltip
            label="主机名称"
            min-width="20%">
            <template slot-scope="scope">
              <span style="color:#409EFF">{{scope.row.name}}</span>
            </template>  
          </el-table-column>
          <el-table-column
					  prop="ip"
            show-overflow-tooltip
            label="IP"
            min-width="10%">
            <template slot-scope="scope">
              <span style="color:#ca8622">{{scope.row.ip}}</span>
            </template>  
          </el-table-column>          
          <el-table-column
            :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
				  	prop="resourceType"
            show-overflow-tooltip
            label="资源类型"
            min-width="10%">
            <template slot-scope="scope">
              <span style="color:#8ca3a1">{{scope.row.resourceType}}</span>
            </template>            
          </el-table-column>
          <el-table-column
            :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
				  	prop="templateType"
            show-overflow-tooltip
            label="模板类型"
            min-width="10%">
            <template slot-scope="scope">
              <span style="color:#8ca3a1">{{scope.row.templateType}}</span>
            </template>            
          </el-table-column>          
          <el-table-column
            :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
				  	prop="online"
            show-overflow-tooltip
            label="是否在线"
            min-width="10%">
               <template slot-scope="scope">
                <span v-if="scope.row.online==0" style="color:#F56C6C">
                  <i class="iconfont icon-flashlight_fill icon-host-warning"  
                     style="color:#F56C6C"></i>
                  不在线
                </span>
                <span v-if="scope.row.online==1"  style="color:#67C23A">
                  <i class="iconfont icon-flashlight_fill icon-host-warning"  
                     style="color:#67C23A"></i>
                  在线
                </span>
              </template>     
          </el-table-column>    
           
          <el-table-column
            :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
				  	prop="status"
            show-overflow-tooltip
            label="主机状态"
            min-width="10%">
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
          <el-table-column
            show-overflow-tooltip
            label="操作"
            min-width="10%">
            
          </el-table-column>                                                            
      </el-table>		
     </el-scrollbar>      
    <dpPage></dpPage>
  </div>
    
</template>

<script>
import dpPage from '@/components/dpcomponents/page/page' 

export default {
     components:{dpPage},
     data(){
          var tableData = [];
          var options = [];
          for(var i=0;i<30;i++){
             tableData.push({
               name:"DFL-ITSHARE-02"+i,
               ip:'192.168.222.123',
               resourceType:i%2==0?"主机":"网络",
               templateType:i%2==0?"windows":"linux",
               online:i%2,
               status:(i+1)%2,          
             });
          }
        return {
           tableData:tableData,
           searchData:"",

        }
     },
     methods:{
        showHostDetail(){
           this.routerLinkSimple("/monitor/hostDetail");
        }
     },
     computed:{      
        viewStyle(){
          return {"height":this.$store.getters.mainHeight-30-90+"px",
                  width:"100%"
          }
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight-30-90+"px",
                  width:"100%"
          }
        }  
     },
     mounted(){

     }
 
};
</script>

<style >
.el-table--border, .el-table--group {
  border: 0px solid #606266;
}

</style>



