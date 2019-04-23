<template>
  <div class="host-view-block host-view-block-last">
     <div v-for="index in 100" :key="index" >资产信息</div>
     <dpPage></dpPage>
  </div> 
</template>

<script>
import dpPage from '@/components/dpcomponents/page/page'
import elScrollbarChildren from "@/mixins/el-scrollbar-children";
export default {
     mixins:[elScrollbarChildren],
     components:{dpPage},
     data(){
        return {
          activeSheet:1,
        }
     },
     methods:{

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
  width:calc((100% ) / 3);
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



