<template>
  <div>
    <div class="host-view-block" style="margin-top:0px;border-top:0px">
      <div style="width:100%;font-size:0">
        <div :class="getSheetClass(1)" @click="openSheet(1)">
            <i class="iconfont  icon-block tab-list-icon"></i>
            <span class="li-span">监控项</span>
        </div>
        <div :class="getSheetClass(2)" @click="openSheet(2)">
            <i class="iconfont icon-block tab-list-icon"></i>
            <span class="li-span">触发器</span>
        </div>
      </div>
    </div> 
    <transition  name="slide-top" mode="out-in">
      <component :is="currentComponet"></component>
    </transition>  

  </div>
</template>

<script>
import item from '@/views/monitor/dphost/content/common/item'
import trigger from '@/views/monitor/dphost/content/common/trigger'
export default {
     mixins:[],
     components:{item,trigger},
     data(){
        return {
          activeSheet:1,
        }
     },
     methods:{
        openSheet(index){
          this.activeSheet = index;
        },
        getSheetClass(index){
          if(index == this.activeSheet){
            return "dp-tap-li dp-tap-li-active";
          }else{
            return "dp-tap-li";
          }
        },
        isActiveSheet(index){
          return this.activeSheet == index;
        }
     },
     computed:{      
        viewStyle(){
          return {"height":this.$store.getters.mainHeight-12+"px",
          width:this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth+"px"};
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight-12+"px",
          width:this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth+"px"};
        },
        currentComponet(){
          var component = "item";
          switch(this.activeSheet){
            case 1:
               component =  'item';
               break;
            case 2:
               component = 'trigger';
               break;                           
          }
          return component;
        }        
        
     },
     mounted(){
       console.log("item-trigger");
     }
 
};
</script>

<style scoped>

.dp-tap-li{
  display: inline-block;
  cursor: pointer;
  height:26px;
  padding:0px;
  margin:0px;
  line-height:26px;
  width:calc( 50% );
  text-align:center;
  background-color:#3C3F41;
  color:#C0C4CC;
}
.dp-tap-li:hover{
  color:#409EFF;
}
.dp-tap-li-active{
 background-color:#2B2B2B;
 color:#409EFF;
}
.tab-list-icon{
  vertical-align:middle;
  margin:0 10px;

}
.li-span{
  font-size: 13px;
  vertical-align:middle;
}

</style>






