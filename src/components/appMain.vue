<template>
<div :style="mainStyle">
     <!-- <router-view></router-view> -->
      
        <transition name="slide-main" mode="out-in">
          <router-view ></router-view>
        </transition>

</div>

 
</template>

<script>
export default {
     name:'app-main',
     computed:{
       mainStyle(){
          return {"min-height":this.$store.getters.mainHeight+"px",
                   width:"100%",
                  "backgroundColor":"#313335"};
       }
     }
    
}
</script>

<style scoped >

</style>
