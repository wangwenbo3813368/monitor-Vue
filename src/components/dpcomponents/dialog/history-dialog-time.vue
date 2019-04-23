<template>
 <!-- 带时间选择的可切换table与Line,用于显示历史数据的dialog -->
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
                <el-date-picker
                  style="width:100%;"
                  v-model="time"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right">
                </el-date-picker>
                <dpMulSimpleLine v-if="showFlag('line')" :echartId="'echart_history_dialog_time'"  
                                :echartData="echartData" 
                                :echartContentStyle="echartContentStyle">
                </dpMulSimpleLine>
                <div v-if="showFlag('table')" style="overflow:hidden;
                border:0px solid #606266;border-top:1px solid #606266;border-left:1px solid #606266;">
                        <el-table
                              :data="[]"                              
                              style="width:calc(( 100% ));max-width:none;">
                              <el-table-column
                                sortable
                                prop="time"
                                show-overflow-tooltip
                                label="时间"
                                min-width="20%">
                              </el-table-column>
                              <el-table-column
                                prop="value"
                                show-overflow-tooltip
                                label="文本信息"
                                min-width="80%">
                              </el-table-column>                            
                      </el-table>				          
                  <el-scrollbar :native="false"  :wrapStyle="tableContentStyle" wrapClass=""  :viewStyle="tableContentStyle"  tag="section"> 	                                       
                      <el-table
                              :data="tableData"
                              
                              :show-header="false"
                              style="width:calc(( 100% ));max-width:none;">
                              <el-table-column
                                sortable
                                prop="time"
                                show-overflow-tooltip
                                label="时间"
                                min-width="20%">
                                <template slot-scope="scope">
                                  <span style="color:#409EFF">{{scope.row.time}}</span>
                                </template>  
                              </el-table-column>
                              <el-table-column
                                prop="value"
                                show-overflow-tooltip
                                label="文本信息"
                                min-width="80%">
                                <template slot-scope="scope">
                                  <span style="color:#ca8622">{{scope.row.value}}</span>
                                </template>  
                              </el-table-column>                            
                      </el-table>
				          </el-scrollbar>                                
                </div>
                <dpPage ></dpPage>
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
import dpPage from '@/components/dpcomponents/page/page' 
export default {
    watch:{
      dialog_visible: {
    　　　　handler(newValue, oldValue) {
               this.$nextTick(function(){
                  if(newValue==true){
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
    components:{dpSingleSimpleLine,dpMulSimpleLine,dpPage},
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
        var tableData = [];
        for(var i=0;i<50;i++){
           tableData.push({time:"2019-04-17 09:22:25",value:"主机操作系统为windows"});
        }
        return {
            dialog_visible:false,
            loading:false,
            echartData:echartData,
            showType:'',
            tableData:tableData,
            pickerOptions: {
              shortcuts: [
                {
                text: '最近一天',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                  picker.$emit('pick', [start, end]);
                }
              },{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }]
            },
            time: ''            
        }
    },
    methods:{
        show(type){
            this.showType= type;
            this.dialog_visible = true;
        },
        showFlag(type){
          return  this.showType===type;
        }
    },
    computed:{
      contentStyle(){
        return {"height":this.$store.state.sys.clientHeight-100+"px",width:"100%",overflow:"hidden"};
      },
      echartContentStyle(){
        return {"height":this.$store.state.sys.clientHeight-100-28+"px",width:"100%"};
      },
      tableContentStyle(){
        return {"height":this.$store.state.sys.clientHeight-100-28-30-32+"px",width:"100%"};
      }
    },
    mounted(){
        this.$EventBus.$on("historyDialogShow", ({type}) => {
             this.show(type);
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

.dpDialog .el-table--border, .el-table--group {
    border-top: 0px solid #606266;
}
.el-picker-panel{
    background: #313335;
    border: 1px solid #606266;
}
.el-date-range-picker__time-header{
    border-bottom: 1px solid #606266;
}
.el-picker-panel__sidebar{
    background: #313335;
    border-right: 1px solid #606266;
}
.el-picker-panel__footer{
    background: #313335;
    border-top: 1px solid #606266;
}
.el-date-range-picker__content.is-left {
    border-right: 1px solid #606266;
}
.el-picker-panel__icon-btn{
    color:#C0C4CC;
}
.el-date-table th {
    border-bottom: 1px solid #606266;
}
.el-date-table td.in-range div {
    background-color: #2B2B2B;
}
.el-date-table td.in-range div:hover {
    background-color: #2B2B2B;
}
.el-time-panel{
    background: #313335;
    border: 1px solid #606266;
}
.el-time-spinner__item.active:not(.disabled) {
    color: #C0C4CC;
    font-weight: 700;
}
.el-time-spinner__item:hover:not(.disabled):not(.active) {
    background: none; 
    color: #409EFF;
    cursor: pointer;
}
.el-time-panel__content::after, .el-time-panel__content::before{
    margin-top:-8px;
    border-top: 1px solid #606266;
    border-bottom: 1px solid #606266;
}
.el-time-panel__btn{
    color: #409EFF;
}
.el-picker-panel__link-btn{
    background: #313335;
    color: #409EFF;
    border: 0px;
}
.el-button.is-plain:focus, .el-button.is-plain:hover {
    background: #313335;
    color: #409EFF;
}
.el-button.is-disabled.is-plain, .el-button.is-disabled.is-plain:focus, .el-button.is-disabled.is-plain:hover {
    background-color: #313335;
    color: #C0C4CC;
}
.el-input.is-disabled .el-input__inner {
    background-color: #313335;
    border-color: #E4E7ED;
    color: #C0C4CC;
    cursor: not-allowed;
}
.el-picker-panel .el-input__inner {
    border: 1px solid #606266;
}
</style>
