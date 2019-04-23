<template>
 <el-scrollbar :native="false"  :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle"  tag="section"> 
  <div style="padding:10px">
    <div v-for="item in 50" :key="item">22222222</div>
  </div>
 </el-scrollbar>
</template>

<script>
import axios from 'axios'
import Date from '@/untils/date';
export default {
     computed:{      
        viewStyle(){
          return {"height":this.$store.getters.mainHeight+"px"};
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight+"px"};
        },
     }
 
};
</script>


