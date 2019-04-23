
<template>
<!-- 网卡信息专用图  自定义dom-list与线图组合-->
<!-- 传入数据未数组 [{name:"端口1",status:0,data:echartData_realy}...]
   其中echartData_realy 的格式如下：
	 echartData_realy{
      legendData:legendData,
			xAxisData:xAxisData,
			colors:colors,
			metaDate:metaDate,
			unit:unit,
			markLine:markLine,
	 }
	   legendData:Array 一维数组 ----数值含义描述; 如:['磁盘使用率','磁盘使用量']
     xAxisData:Array 一维数组  ----横坐标label;  如:['星期一','星期二','星期三','星期四','星期五'];
     colors:Array 一维数组 ----线条的颜色顺序;  如:['#c23531','#F56C6C',  '#d48265' ,'#E6A23C',  '#409EFF'];
     metaDate:Array 二维数组 元数据,柱状图表示的值;  
		    如:[[90.89,76.92,40.22,30.22,23.98],[10.39,56.72,70.22,30.22,23.98]];
        或者数组里面包含的对象[[{_data:data,value:value},{_data:data,value:value}]]; 
		  	_data可以自定义名称 value是必需项
     unit:String 字符串 ----单位,放在y轴上方显示;  如:'M' 
		 markLine:Array 一维数组 ----标记线 如: [{name:'告警阈值',value:90}]
-->
 <div  :style="echartContentStyle" class="inline-block-font">
	    <div :style="echartContentStyle_left">
        <!-- 左侧部 -->                 
				<el-input v-model="searchData"  >
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input>	    
				<el-scrollbar :native="false"  :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle"  tag="section"> 				  
						<ul style="padding:5px 0px;display:inline-block">							
							<li v-for="(item,index) in filterListData" :key="index" class="li-list"
										@mouseover="hoverList(index,true)" 
										@mouseout="hoverList(index,false)"
										@click="clickList(item,index)" >
									<i :class="' iconfont icon-list  icon-Network-Plug'" 
										:style="listColor(item,index)">
									</i>
									<span class="li-span" :style="listColor(item,index)">
									{{item.name}}
									</span>
							</li>         
						</ul> 
				</el-scrollbar>
      </div>

			<div :id="echartId"  :style="echartContentStyle_netport" >

			</div>
 </div>
</template>

<script>
import dpTemplateList from '@/components/dpcomponents/list/template-list' 
export default {
    watch:{
      echartContentStyle: {
    　　　　handler(newValue, oldValue) {
               this.$nextTick(function(){
                  this.myEchart.clear();				  
                  this.myEchart.resize();
                  this.myEchart.setOption(this.option);
               }) 
    　　　　},
    　　　　deep: true
　　  },
      activeEchartData: {
    　　　　handler(newValue, oldValue) {
               this.$nextTick(function(){
                  this.myEchart.clear();				  
                  this.myEchart.resize();
                  this.myEchart.setOption(this.option);
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
		components:{dpTemplateList},
    data(){
         return {
					myEchart:{},
          hoverIndex:-1,
          activeIndex:-1,
					searchData:"",
					activeEchartData:{},
         }
		 },
		 methods:{
			 listColor(item,index){
				  var color,cursor;
				  if(item.status==1){
						color = "#67C23A";
					}else{
						cursor = "not-allowed",
						color = "#F56C6C";
					}
					if(index==this.activeIndex){
						color = "#409EFF";
					}else if(item.status==1&&index==this.hoverIndex){
						color = "#606266";
					}
           return {color:color,cursor:cursor};
        },
        hoverList(index,flag){
           if(flag){
             this.hoverIndex = index;
           }else{
             this.hoverIndex =-1;
           }
        },
        clickList(item,index){
					if(item.status==1){
						this.activeIndex= index;
						this.activeEchartData = item.data;
				   }
				},	
		 },
     computed:{
			 filterListData(){
				 var self =this;
				  return this.echartData.filter(function(item){
						return item.name.indexOf(self.searchData)!==-1;
					})
			 },
			 echartContentStyle_left(){
           return {
						 'border-right':"1px solid #606266",
						 padding:"0px",margin:"0px",display:"inline-block","vertical-align":"top",		
						 width: Number(this.echartContentStyle.width.replace("px",""))*0.15+"px",
						 height: Number(this.echartContentStyle.height.replace("px",""))+"px",
					 }
			 },
			 echartContentStyle_netport(){
           return {
						 padding:"0px",margin:"0px",display:"inline-block","vertical-align":"top",					
						 width: Number(this.echartContentStyle.width.replace("px",""))*0.85+"px",
						 height: Number(this.echartContentStyle.height.replace("px",""))+"px",
					 }
			 },
       viewStyle(){
          return {"height":Number(this.echartContentStyle.height.replace("px",""))-28+"px",};
        },
        wrapStyle(){
          return {"height":Number(this.echartContentStyle.height.replace("px",""))-28+"px",};
        },			 
       option(){
				var xAxisData = this.activeEchartData.xAxisData;
				var legendData = this.activeEchartData.legendData;
				var colors = this.activeEchartData.colors||['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
				var metaDate = this.activeEchartData.metaDate;
				var unit = this.activeEchartData.unit;



				var markLine = null;
        var tempLines = [];
				if(this.activeEchartData.markLine&&this.activeEchartData.markLine.length>0){
          for(var i=0;i<this.activeEchartData.markLine.length;i++){
             tempLines.push({
								yAxis:this.activeEchartData.markLine[i].value,
							  label:{
									normal:{
										formatter:this.activeEchartData.markLine[i].name,
										position:'middle',
									}
								},
								lineStyle:{
									normal:{
										color:"#F56C6C"
										}
								},								
						 })
					}
          markLine = {
						silent: true,//标记线不响应和触发鼠标事件
						data:tempLines,
					}    
				}
						
				var  series = [];
				for(var i=0;legendData&&i<legendData.length;i++){
					 series.push({												
												name:legendData[i],
												type: 'line',
												smooth: true,
												label: {
															normal: {
																	show: true,
																	position: 'top'
															}
												},        
												areaStyle: {
															normal: {
																	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
																			offset: 0,
																			color: colors[i],
																			opacity:0.3,
																	}, {
																			offset: 1,
																			color: 'rgba(0, 0, 0, 0)',
																			opacity:0,
																	}], false),
																	shadowColor: 'rgba(0, 0, 0, 0.1)',
																	shadowBlur: 10
																}
												},												
												data:metaDate[i]
					  });
				}
				series[0].markLine = markLine;
				
				

				var  option = {
						    color:colors,
					      dataZoom: [
                    {start: 85,height: 20,bottom: 10,},
					          ],
							  legend: {
										data: legendData,
										icon: 'rect',
										itemWidth: 14,
										itemHeight: 5,
										itemGap: 13,										
										top: "2%",
										// left:"50%",
										textStyle: {
												 color: "#C0C4CC"
										}
								},
					      tooltip : {
					    	  trigger: 'axis',
					    	  axisPointer : { type : 'shadow'},
//					    	position: function (point, params, dom, rect, size) {
//					    	      // 固定在顶部
//					    	      return ['10%', '10%'];
//					    	  },
				        textStyle: {
					                color:"rgba(135,189,199,1)",
					                'align':"left"
					          }
						     
					      },
					      grid: {left: "2%",top:"10%",bottom: "12%",right:"0%",containLabel: true},
		            xAxis : [
													{
														type: 'category',
														splitLine: {
																show:false,
														},
														axisLine: { show: false,lineStyle:{ color:'#6173A3' }},
														axisLabel:{show:true},
														axisTick : {show: true},
														data : xAxisData
													}
		            ],
								yAxis: [
										{   
											splitNumber:4,
												// name: unit,
												axisTick : {show: false},
												splitLine: {
														show:true,
														lineStyle: {
														// 使用深浅的间隔色
														color: ['rgba(33,67,90,1)']
														}
												},
												axisLabel:{
													textStyle:{color:'#9ea7c4',fontSize:10},
													formatter: function (value, index) {
														return value+unit;
													}
												},
												axisLine: { show: true,lineStyle:{ color:'rgba(33,67,90,1)'}}
										},
										{
											axisLine: { show: true,lineStyle:{ color:'rgba(33,67,90,1)'}}
										}
								],
								series : series
				      };
        return option;
       }
     },
     mounted(){
           //直接刷新页面时 需要等上一级的路由加载完成 不然无法获取有效的宽高
           this.$nextTick(function(){
							 this.myEchart =  echarts.init(document.getElementById(this.echartId));
							  //初始化选中一个有效数据进行展示
								for(var i=0,length=this.echartData.length;i<length;i++){
										if(this.echartData[i].status==1){
											this.activeIndex = i;
											this.activeEchartData = this.echartData[i].data;
											break;
										}
								}
							  this.myEchart.setOption(this.option);
           })
     }
 
};
</script>

<style scoped>
.inline-block-font{
	font-size: 0;
}
.li-span{
  display:inline-block;
  margin-left:5px;
  vertical-align: middle;
  font-size:12px;
}
.icon-list{
  display:inline-block;
  font-size:14px;
  vertical-align: middle;
  color:#9ea7c4;
}
.li-list{
  color:#9ea7c4;
  padding:2px 0px 2px 5px;
  line-height:16px; 
  cursor:pointer;
  white-space:nowrap;
  overflow:hidden; 
  text-overflow:ellipsis;
}
</style>
<style >
.inline-block-font .el-input__inner{
  font-size: 12px;
  background-color:#313335;
  border-radius: 0px;
  border: 0px solid #DCDFE6;
  color:#C0C4CC;
  padding:0px 0px 0px 30px;
}
.inline-block-font{
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

</style>


