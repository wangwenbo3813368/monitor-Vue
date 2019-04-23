<template>

    <div class="host-view-block host-view-block-last el-input__inner_border_0">
      <el-input v-model="searchData" placeholder="可搜索名称与键值"  >
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
			</el-input>
	  
      <el-table
          :data="tableData"
          
          style="width:calc((100% + 1px));max-width:none;border-top:1px solid #606266;">
          <el-table-column
					  prop="name"
            show-overflow-tooltip
            label="监控项名称"
            min-width="15%">
            <template slot-scope="scope">
              <span style="color:#409EFF">{{scope.row.name}}</span>
            </template>  
          </el-table-column>
          <el-table-column
				  	prop="key"
            show-overflow-tooltip
            label="键值"
            min-width="12%">
            <template slot-scope="scope">
              <span style="color:#8ca3a1">{{scope.row.key}}</span>
            </template>              
          </el-table-column>
          <el-table-column
            :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
				  	prop="grouptype"
            show-overflow-tooltip
            label="应用集分类"
            min-width="10%">
            <template slot-scope="scope">
              <span style="color:#8ca3a1">{{scope.row.grouptype}}</span>
            </template>            
          </el-table-column>
          <el-table-column
            sortable
				  	prop="intervaltime"
            show-overflow-tooltip
            label="刷新频率"
            min-width="10%">
             <template slot-scope="scope">
              <span style="color:#8ca3a1">{{scope.row.intervaltime}}</span>
            </template>                  
          </el-table-column>
          <el-table-column
            sortable
				  	prop="lasttime"
            show-overflow-tooltip
            label="更新时间"
            min-width="12%">
            <template slot-scope="scope">
              <span style="color:#8ca3a1">{{scope.row.lasttime}}</span>
            </template>              
          </el-table-column>
          <el-table-column
            :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
				  	prop="valuetype"
            show-overflow-tooltip
            label="数据类型"
            min-width="10%">
            <template slot-scope="scope">
              <span style="color:#8ca3a1">{{scope.row.valuetype}}</span>
            </template>                 
          </el-table-column>            
          <el-table-column
				  	prop="lastvalue"
            show-overflow-tooltip
            label="最新值"
            min-width="20%">
            <template slot-scope="scope">
              <span style="color:#ca8622">{{scope.row.lastvalue}}</span>
            </template>   
          </el-table-column>  
          <el-table-column
            :filters="[{text: '正常', value: 0}, {text: '警告', value: 1}, {text: '严重', value: 2}]"
				  	prop="status"
            show-overflow-tooltip
            label="状态"
            min-width="7%">
               <template slot-scope="scope">
                <span v-if="scope.row.status==0" style="color:#F56C6C">
                  <i class="iconfont icon-flashlight_fill icon-host-warning"  
                     style="color:#F56C6C"></i>
                  已停用
                </span>
                <span v-if="scope.row.status==1"  style="color:#67C23A">
                  <i class="iconfont icon-flashlight_fill icon-host-warning"  
                     style="color:#67C23A"></i>
                  已启用
                </span>
              </template>             
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="历史"
            min-width="6%">
              <template slot-scope="scope">
                <span @click="viewHistory(scope.row)">
                  <el-tooltip  :content="'查看历史记录'" placement="left-start">
                    <i v-if="scope.row.valuetype=='文本'" class="iconfont icon-table icon-host-warning"  
                      style="color:#67C23A"></i>
                    <i v-if="scope.row.valuetype=='数值'" class="iconfont icon-areachart icon-host-warning"  
                      style="color:#67C23A"></i>
                  </el-tooltip>                    
                </span> 
              </template>             
          </el-table-column>                                                            
      </el-table>		
      <dpPage></dpPage>

    <dpHistoryDialogTime  :title="dialog_title">              
    </dpHistoryDialogTime>      
    </div>     

</template>

<script>
import dpPage from '@/components/dpcomponents/page/page' 
import dpHistoryDialogTime from '@/components/dpcomponents/dialog/history-dialog-time'
import elScrollbarChildren from "@/mixins/el-scrollbar-children";
export default {
     mixins:[elScrollbarChildren],
     components:{dpPage,dpHistoryDialogTime},
     data(){
                 var tableData = [];
          for(var i=0;i<30;i++){
             tableData.push({
               name:"强制等待虚拟CPU的时间"+i,
               key:"net.tcp.service[tcp,,8080]"+i,
               grouptype:i%2==0?"Memory":"Disk",
               intervaltime:"90秒",
               lasttime:"2019-04-17 11:33:28",
               valuetype:i%2==0?"文本":"数值",
               lastvalue:i%2==0?"等待时间"+i*10:i*7+2,
               status:(i+1)%2,          
             })
          }
        return {
           tableData:tableData,
           searchData:"",
           dialog_title:'',
        }
     },
     methods:{
        viewHistory(row){
          this.dialog_title = row.name;
          this.$EventBus.$emit("historyDialogShow", {type:row.valuetype=='文本'?'table':'line'});          
        }
     }
 
};
</script>

<style >
.el-table--border, .el-table--group {
  border: 0px solid #606266;
  border-top: 1px solid #606266;
}

 
</style>



