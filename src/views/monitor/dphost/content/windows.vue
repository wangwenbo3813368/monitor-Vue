<template>
 <el-scrollbar :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle"  tag="section"> 
  <div style="padding:12px">
    <div v-for="item in 50" :key="item">windows</div>
  </div>
 </el-scrollbar>
</template>

<script>
import axios from 'axios'
import Date from '@/untils/date';
export default {
     computed:{      
        viewStyle(){
          return {"height":this.$store.getters.mainHeight+"px",
          width:this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth+"px"};
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight+"px",
          width:this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth+"px"};
        },
     }
 
};
</script>


