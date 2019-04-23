<template>
 <div :style="contentStyle">
     <component :is="componentName" ></component>
 </div>
</template>

<script>

import axios from 'axios'
import windows from '@/views/monitor/dphost/content/windows' 
import linux from '@/views/monitor/dphost/content/linux' 
export default {
     data(){
       return {
            componentName:'linux'
       }
     },
     components:{windows,linux},
     computed:{      
        contentStyle(){
          return {"height":this.$store.getters.mainHeight+"px",width:"100%"};
        },
     },
     methods:{

     },
     created(){

     },
     mounted(){

     }
 
};
</script>

<style>
</style>
