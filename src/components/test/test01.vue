<template>
 <el-scrollbar :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle"  tag="section"> 
  <div style="padding:10px">
    <el-input v-model="name"></el-input>
    <div v-for="item in 50" :key="item">{{namea}}</div>
  </div>
 </el-scrollbar>
</template>

<script>
import axios from 'axios'
import Date from '@/untils/date';
export default {
     data(){
        return {
          name:"",
        }
     },
     computed:{      
        viewStyle(){
          return {"height":this.$store.getters.mainHeight+"px"};
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight+"px"};
        },
        namea(){
          return this.nameb+"aaa";
        },
        nameb(){
          return this.name;
        }

     }
 
};
</script>


