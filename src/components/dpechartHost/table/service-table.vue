
<template>

	<div :id="echartId"  :style="echartContentStyle" class="service-list-table" >
     <el-scrollbar  :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle" tag="section" >
      <el-table
          :data="echartData"
          border
          style="width:calc((100% ));max-width:none;">
          <el-table-column
					  prop="type"
            show-overflow-tooltip
            label="服务类型"
            min-width="30%">
             <template slot-scope="scope">
              <span style="color:#409EFF">{{scope.row.type}}</span>
            </template>              
          </el-table-column>
          <el-table-column
				  	prop="name"
            show-overflow-tooltip
            label="主机名称"
            min-width="30%">
             <template slot-scope="scope">
              <span style="color:#ca8622">{{scope.row.name}}</span>
            </template>              
          </el-table-column>          
          <el-table-column
					  prop="online"
            show-overflow-tooltip
            label="是否在线"
            min-width="20%">
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
            show-overflow-tooltip
            label="服务状态"
            min-width="20%">
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
      </el-table>		
     </el-scrollbar> 															
	</div>
</template>

<script>

export default {
    watch:{
      echartContentStyle: {
    　　　　handler(newValue, oldValue) {
               this.$nextTick(function(){

               }) 
    　　　　},
    　　　　deep: true
　　  },
      echartData: {
    　　　　handler(newValue, oldValue) {
               this.$nextTick(function(){

               }) 
    　　　　},
    　　　　deep: true
　　  }
    },
    props: {
      echartId: {
        type: String,
        required: true
      },
      echartContentStyle:{
        type: Object,
        required: true
      },
      echartData:{
        type: Array,
        required: true
      }
    },
    data(){
         return {
           
         }
     },
     computed:{
         wrapStyle(){
           return this.echartContentStyle;
         },
         viewStyle(){
           return this.echartContentStyle;
         },
     },
     mounted(){
           //直接刷新页面时 需要等上一级的路由加载完成 不然无法获取有效的宽高
           this.$nextTick(function(){

           })
     }
 
};
</script>

<style>

.service-list-table .el-table--border, .el-table--group {
    border: 0px solid #606266;
    border-top: 0px solid #606266;
    border-left: 0px solid #606266;
}
.service-list-table .el-table th, .el-table tr{
  cursor: pointer;
  background-color: #2B2B2B;
}
.service-list-table .el-table__body-wrapper .el-table th, .el-table tr{
  background-color: #313335;
}
</style>
