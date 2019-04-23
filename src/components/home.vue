<template>
 <el-scrollbar :native="false"  :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle"  tag="section">
  <div style="padding:10px">
    <div>123</div>
    <div>123</div>
        <div>123</div>
    <div>123</div>
        <div>123</div>
    <div>123</div>
        <div>123</div>
    <div>123</div>
        <div>123</div>
    <div>123</div>
        <div>123</div>
    <div>123</div>
        <div>123</div>
    <div>123</div>
        <div>123</div>
    <div>123</div>
        <div>123</div>
    <div>123</div>
        <div>123</div>
    <div>123</div>
        <div>123</div>
    <div>123</div>
        <div>123</div>
    <div>123</div>
        <div>123</div>
    <div>123</div>
        <div>123</div>
     <el-input autosize  type="textarea" v-model="value"></el-input>
  </div>
 </el-scrollbar>
</template>

<script>
import axios from 'axios'
import Date from '@/untils/date';
export default {
     data(){
        return {
            value:""
        }
     },
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


