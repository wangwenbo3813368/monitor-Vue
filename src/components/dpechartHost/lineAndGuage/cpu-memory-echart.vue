
<template>
<!-- CPU与内存专用echart图  饼图与线图组合-->
<!-- legendData:Array 一维数组 ----数值含义描述; 如:["CPU使用率","内存使用率"];
     xAxisData:Array 一维数组  ----横坐标label;  如:['星期一','星期二','星期三','星期四','星期五'];
     colors:Array 一维数组 ----线条的颜色顺序;  如:['#c23531','#F56C6C',  '#d48265' ,'#E6A23C',  '#409EFF'];
     metaDate:Array 二维数组 元数据,柱状图表示的值;  
		    如:[[90.89,76.92,40.22,30.22,23.98],[10.39,56.72,70.22,30.22,23.98]];
        或者数组里面包含的对象[[{_data:data,value:value},{_data:data,value:value}]]; 
		  	_data可以自定义名称 value是必需项
     unit:字符串 ----单位,放在y轴上方显示;  如:'%' 
		 markLine:Array 一维数组 ----标记线 如: [{name:'告警阈值',value:90}]
		 pieData:Array 一维数组 ----表示饼图的实时值 如：[
				  {name:"CPU使用率",value:88.22},{name:"内存使用率",value:22.33}
	      ],
-->

 <div :id="echartId"  :style="echartContentStyle" >

 </div>
</template>

<script>

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
         return {
           myEchart:{},
         }
     },
     computed:{
       option(){
				var xAxisData = this.echartData.xAxisData;
				var legendData = this.echartData.legendData;
				var colors = this.echartData.colors||['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
				var metaDate = this.echartData.metaDate;
				var unit = this.echartData.unit;

				var pieData=[
					{name:"CPU使用率",value:88.22},{name:"内存使用率",value:22.33}
				];

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
				
				//添加饼图
				series.push(
				 {     
						name: pieData[0].name,
            type: 'gauge',
            detail: {
							formatter:'{value}%',
							offsetCenter: [0, '65%'],
							textStyle: {
									fontSize: 14
							}},
            data: [{value: pieData[0].value, name: pieData[0].name}],        
						center: ['88%', '25%'],
						radius: '45%',
						splitNumber:5,
						pointer: {
                width:3,
            },
						title : {
							  offsetCenter: [0, '90%'],
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 12,
										fontStyle: 'italic',
										color:'#67C23A'
                }
            },
						axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 8,
                    shadowBlur: 0,
										color: [
												[0.3, '#409EFF'],
												[0.7, '#E6A23C'],
												[1, '#F56C6C']
										]										
                }
						},
            axisTick: {            // 坐标轴小标记
                length: 12,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                length: 18,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
						},		            					
				 },
				 {     
            name: pieData[1].name,
            type: 'gauge',
            detail: {
							formatter:'{value}%',
							offsetCenter: [0, '65%'],
							textStyle: {
									fontSize: 14
							}},
            data: [{value: pieData[1].value, name: pieData[1].name}],        
						center: ['88%', '75%'],
						radius: '45%',
						splitNumber:5,
						pointer: {
                width:3,
            },
						title : {
							  offsetCenter: [0, '90%'],
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 12,
										fontStyle: 'italic',
										color:'#67C23A'
                }
            },
						axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 8,
                    shadowBlur: 0,
										color: [
												[0.3, '#409EFF'],
												[0.7, '#E6A23C'],
												[1, '#F56C6C']
										]										
                }
						},
            axisTick: {            // 坐标轴小标记
                length: 12,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                length: 18,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
						},												
		     }
			);

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
										left:"30%",
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
					      grid: {left: '2%',top:"10%",bottom: "12%",right:"25%",containLabel: true},
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
							 this.myEchart.setOption(this.option);
           })
     }
 
};
</script>

<style>

</style>
