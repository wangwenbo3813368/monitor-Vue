
<template>
<!-- 简单的<<<<top柱状图>>>>,仅用来展示简单的top排行 -->
<!-- legendData:数值含义描述; 如:'CPU使用率'
     xAxisData:横坐标label;  如:['主机01','主机02','主机03','主机04','主机05'];
     colors:柱状图的颜色顺序;  如:['#c23531','#F56C6C',  '#d48265' ,'#E6A23C',  '#409EFF'];
     metaDate:元数据,柱状图表示的值;  如:[90.89,76.92,40.22,30.22,23.98];
          或者数组里面包含的对象[{_data:data,value:value}}]; _data可以自定义名称 value是必需项
     unit:单位,放在y轴上方显示;  如:'%'; 
-->

 <div :id="echartId"  :style="echartContentStyle" >

 </div>
</template>

<script>
import axios from 'axios'
import echartSkin from "@/mixins/echart-skin";
export default {
    mixins:[echartSkin],
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
            var colors = this.echartData.colors;
            var metaDate = this.echartData.metaDate;
            var unit = this.echartData.unit;

            var serieData = [
                {
                    name:legendData,
                    type: 'bar',
                    symbol:"circle",
                    symbolSize:3,
                    data: metaDate,
                    label: {
                       normal: {
                            position:  "top",
                            show: true,
                            color:'#9ea7c4',
                            // formatter: '{c}'+unit,
                            }
                    },
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width:0.8
                            },
                            color: function(params) {
                                return colors[params.dataIndex]
                            }
                        }
                    }

                }
            ];            
            var option = {
                grid: {left: '2%',top:"15%",bottom: "10%",right:"5%",containLabel: true},
                tooltip : {
                    trigger: 'axis',
                    axisPointer : { type : 'shadow'},
                    position: function (point, params, dom, rect, size) {
                        // 固定在顶部
                        return ['10%', '2%'];  
                    },
                    textStyle: {
                    color:"rgba(135,189,199,1)",
                    'align':"left"
                   },
                //    formatter: function (params, ticket, callback) {
                //         if(data_static.type=="week"){
                //         var tempTitle = ToolsModuler.getWeekName(0,1);
                //         return tempTitle+"<br />"+params[0].name+"<br />"+params[0].marker+params[0].seriesName+":"+params[0].value;
                //         }else if(data_static.type=="day"){
                //             return params[0].name+"<br />"+params[0].marker+params[0].seriesName+":"+params[0].value;
                //         }else{
                //             return params[0].name+"<br />"+params[0].marker+params[0].seriesName+":"+params[0].value;
                //         }
                //     }
                },
                xAxis: [
                    {   
                        triggerEvent:false,//坐标轴是否响应事件
                        type: 'category',
                        splitLine: {
                            show:false,
                        },
                        axisLine: { show: true,lineStyle:{ color:'#6173A3' }},
                        axisLabel:{
                            textStyle:{color:'#9ea7c4',fontSize:11},
                            "interval": 1
                            },
                        axisTick : {show: false},
                        data:xAxisData
                    },
                ],
                yAxis: [
                    {   
                        splitNumber:4,
                        // name: unit,
                        axisTick : {show: false},
                        splitLine: {
                            show:false,
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
                        axisLine: { show: true,lineStyle:{ color:'#6173A3'}}
                    },
                ],
                series:serieData
			};
            return option;
        }
     },
     mounted(){
           //直接刷新页面时 需要等上一级的路由加载完成 不然无法获取有效的宽高
           var self = this;
           this.$nextTick(function(){           
               this.myEchart =  echarts.init(document.getElementById(this.echartId));
               var _myChart =  this.myEchart;
               this.myEchart.getZr().on('click', function(params){                  
                    var pointInPixel= [params.offsetX, params.offsetY];
                    if (_myChart.containPixel('grid',pointInPixel)) {
                        var xIndex=_myChart.convertFromPixel({seriesIndex:0},[params.offsetX, params.offsetY])[0];
                        self.$EventBus.$emit("echartDomClick",
                            {
                                title:self.echartData.legendData+" "+self.echartData.xAxisData[xIndex],
                                hostid:self.echartData.metaDate[xIndex].hostid
                            })
                    }       
                    // var title = params.seriesName+" "+params.name;
                    // var hostid = params.data.hostid;
                    // self.$EventBus.$emit("echartDomClick",{title:title,hostid:hostid})
               });
               this.myEchart.setOption(this.option);
           })

     }
 
};
</script>

<style>

</style>
