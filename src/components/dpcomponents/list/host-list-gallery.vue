<template>
  <div :style="galleryStyle" v-cloak>
    <el-scrollbar  :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle" tag="section" >
      <div :style="marginLeftStyle">
        <div v-for="(item,index) in hostList" :key="index" 
           class="hostDiv" @click="viewHostDetail"
           style="display:inline-block;width:120px;height:90px;cursor:pointer;">
            <div style="width:100%;">
              <div style="width:32px;float:left;margin-left:10px">
                  <i class="iconfont icon-remind_fill icon-host-warning"  
                    :style="getHostColor(index)"></i>
              </div>
              <div style="width:48px;display:inline-block">
                <img src ="/static/images/host/window.png"  style="width:48px;height:48px;display:inline-block;" />
              </div>
            </div>
            <el-tooltip v-if="getNameNowrap(item.name)" :content="item.name" placement="bottom-start">
              <div class="hostName">   
                    {{item.name}}
              </div>
            </el-tooltip>
            <div v-else class="hostName">  
                    {{item.name}}
            </div>
            <div class="hostIp">
                  192.168.222.222
            </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>

import String from '@/untils/string'
export default {
    // props:{
    //   hostList: {
    //     type: Array,
    //     required: true
    //   }
    // },
    data() {
      var hostList = [];
      for(var i=0;i<30;i++){
        hostList.push({name:'DFL-ITSHARE-01-00'+i});
      }
      return {
          hostList:hostList
      }
    },
    methods:{
        getHostColor(index){
          //正常  #67C23A   有严重以下告警 #E6A23C  有严重及以上告警 red
          var color="";
           var random = Math.random();
           if(random<0.3){
             return {color:"red"};
           }else if(random<0.7){
             return {color:"#67C23A"};
           }else{
             return {color:"#E6A23C"};
           }
        },      
        getNameNowrap(data){
          var width = new String(data).width();
          return width>120*0.9;;
        },
        viewHostDetail(){
          this.$emit("viewHostDetail");
        }
    },
    computed:{
        marginLeftStyle(){
          return {
            "padding-top":"20px",
            "padding-bottom":"20px",
            "padding-left": (((this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth)*0.84-18)%120)/2+"px"
          }
        },
        galleryStyle(){
          return {"height":this.$store.getters.mainHeight-24-30-30+"px",
          width:(this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth)*0.84-18+"px",
          // backgroundColor:"#3C3F41",
          }
        },
        viewStyle(){
          return {"height":this.$store.getters.mainHeight-24-30-30+"px",
          width:(this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth)*0.84-18+"px"
          };
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight-24-30-30+"px",
          width:(this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth)*0.84-18+"px"
          }
        },
    },
    mounted(){
  
    }
     
};
</script>

<style scoped>
.hostDiv:hover{
  background-color: #3C3F41;
}
.icon-host-warning{
  vertical-align: middle;
  height:28px;
  line-height:28px;
  cursor:pointer;
  font-size:14px;
  margin-left: 9px;
}
.hostName{
  color:#C0C4CC;
  font-size: 12px;
  text-align: center;
  margin-left:5%;
  width:90%;
  white-space:nowrap;
  overflow:hidden; 
  text-overflow:ellipsis;
}
.hostIp{
  color:#606266;
  font-size: 12px;
  text-align: center;
  margin-left:5%;
  width:90%;
  white-space:nowrap;
  overflow:hidden; 
  text-overflow:ellipsis;
}
</style>
