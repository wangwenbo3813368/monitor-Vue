<template>
 <el-scrollbar :native="false"  :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle"  tag="section"> 
     <ul style="padding:5px 0px;display:inline-block">
       
       <li v-for="(item,index) in listData" :key="index" class="li-list"
            @mouseover="hoverList(index,true)" 
            @mouseout="hoverList(index,false)"
            @click="clickList(index)" >
          <i :class="' iconfont icon-list  '+item.icon" 
            :style="listColor(index)">
          </i>
          <span class="li-span" :style="listColor(index)">
           {{item.name}}
          </span>
      </li>         
     </ul> 
 </el-scrollbar>
</template>

<script>
import axios from 'axios'
export default {
      data(){
        return {
          hoverIndex:-1,
          activeIndex:-1,
          listData:[
            {icon:" icon-windows",name:"windows"},
            {icon:" icon-linux",name:"linux"},
            {icon:" icon-windows",name:"windows"},
            {icon:" icon-windows",name:"windows"},
            {icon:" icon-windows",name:"windows"},
            {icon:" icon-windows",name:"windows11111111111"},
            {icon:" icon-linux",name:"linux111111111111111"},
            {icon:" icon-linux",name:"linux111111111111111"},
            {icon:" icon-linux",name:"linux111111111111111"},
            {icon:" icon-windows",name:"windows11111111111"},
            {icon:" icon-linux",name:"linux111111111111111"},
            {icon:" icon-linux",name:"linux111111111111111"},
            {icon:" icon-linux",name:"linux111111111111111"},
            {icon:" icon-windows",name:"windows11111111111"},


          ]
        }
      },
      methods:{
        listColor(index){
          var color = "7F99AC";
            if(index==this.activeIndex){
              color = "#409EFF";
            }else if(index==this.hoverIndex){
              color = "#606266";
            }else{
              color = "#7F99AC";
            }
           return {color:color};
        },
        hoverList(index,flag){
           if(flag){
             this.hoverIndex = index;
           }else{
             this.hoverIndex =-1;
           }
        },
        clickList(index){
           this.activeIndex= index;
           this.routerLinkSimple("/monitor/hostlist");
        },
      },
      computed:{      
        viewStyle(){
          return {"height":this.$store.state.sys.clientHeight-64+"px"};
        },
        wrapStyle(){
          return {"height":this.$store.state.sys.clientHeight-64+"px"};
        },
        
     }
};
</script>

<style scoped>
.li-span{
  display:inline-block;
  margin-left:5px;
  vertical-align: middle;
  font-size:12px;
}
.icon-list{
  display:inline-block;
  font-size:28px;
  vertical-align: middle;
  color:#9ea7c4;
}
.li-list{
  color:#9ea7c4;
  padding:5px 0px 5px 5px;
  line-height:28px; 
  cursor:pointer;

  white-space:nowrap;
  overflow:hidden; 
  text-overflow:ellipsis;
}
</style>

