
<template>
<!-- 简单的<<<<单条线线性图>>>>,带阴影效果和markLine -->
<!-- legendData:String 字符串 ----数值含义描述; 如:['流入','流出']
     xAxisData:Array 一维数组  ----横坐标label;  如:['星期一','星期二','星期三','星期四','星期五'];
     colors:Array 一维数组 ----线条的颜色顺序;  如:['#c23531','#F56C6C',  '#d48265' ,'#E6A23C',  '#409EFF'];
     metaDate:Array 一维数组 元数据,柱状图表示的值;  
		    如:[90.89,76.92,40.22,30.22,23.98];
        或者数组里面包含的对象[{_data:data,value:value},{_data:data,value:value}]; 
		  	_data可以自定义名称 value是必需项
     unit:String 字符串 ----单位,放在y轴上方显示;  如:'%'; 
		 markLine:Array 一维数组 ----标记线 如: [{name:'告警阈值',value:90}]
-->

 <div :id="echartId"  :style="echartContentStyle" >

 </div>
</template>

<script>
import axios from 'axios'

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
      echartData: {
    　　　　handler(newValue, oldValue) {
               this.$nextTick(function(){
                  debugger;
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
        type: Object,
        required: true
      }
    },
    data(){
        //对外开放数据配置
            // var xAxisData = ['clw_mongo_spark01','clw_microservice03','znz-app5','车联网MYSQL物理机01','uap-db-master-03'];
            // var legendData= "CPU使用率";
            // var colors =    ['#F56C6C','#F56C6C',  '#F56C6C' ,'#F56C6C',  '#F56C6C'];
            // var metaDate = [90.89,76.92,40.22,30.22,23.98];
            // var unit="%";
         return {
           myEchart:{},
         }
     },
     computed:{
       option(){
				var xAxisData = this.echartData.xAxisData;
				var legendData = this.echartData.legendData;
				var colors = this.echartData.colors;
				var metaDate = this.echartData.metaDate;
				var unit = this.echartData.unit;

				var markLine = null;
        var tempLines = [];
				if(this.echartData.markLine&&this.echartData.markLine.length>0){

          for(var i=0;i<this.echartData.markLine.length;i++){
             tempLines.push({
								yAxis:this.echartData.markLine[i].value,
							  label:{
									normal:{
										formatter:this.echartData.markLine[i].name,
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
            
				var  option = {
						    color:colors,
					      dataZoom: [
					          {start: 85},
					          {
					            type: 'inside'
					        }],
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
					      grid: {left: '2%',top:"5%",bottom: "10%",right:"2%",containLabel: true},
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
												axisLine: { show: false,lineStyle:{ color:'#6173A3'}}
										},
								],
								series : [
													{
													name:legendData,
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
																				color: colors[0],
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
													markLine:markLine,
													data:metaDate
												}
								]
				      };
        return option;
       }
     },
     mounted(){
           //直接刷新页面时 需要等上一级的路由加载完成 不然无法获取有效的宽高
           this.$nextTick(function(){
               this.myEchart =  echarts.init(document.getElementById(this.echartId));
               this.myEchart.setOption(this.option);
           })

     }
 
};
</script>

<style>

</style>
