<template>
 <div :style="subMenuHeight">
    <el-menu
        @open="changeMenu"
        @close="changeMenu"
        class="el-menu-vertical-demo"
        background-color="#3C3F41"
        text-color="#7F99AC"
        :style="subMenuHeight"
        active-text-color="#ffffff"
        :collapse="$store.state.sys.collapse"
        unique-opened 
        :default-active="activeIndex"
        router
      >
        <span class="dp-menu-title" >
           <el-input
            v-show="!$store.state.sys.collapse"
            placeholder="菜单查询"
            style="width:120px;margin-left:1px"
            v-model="titleSearchContent"
            >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>

          <i v-show="!$store.state.sys.collapse" class="iconfont icon-menu" @click="collapseMenu" 
              style="color:#ffffff;cursor:pointer;font-size:24px;float:right;margin-right:10px"></i>
          <i v-show="$store.state.sys.collapse"  class="iconfont icon-menu" @click="collapseMenu" 
              style="color:#ffffff;cursor:pointer;font-size:24px;margin-left:19px"></i>   
          </span>
        <template v-if="!$store.state.sys.collapse">  
          <el-scrollbar ref="subMenuScrollbar" :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle" tag="section" >
            <template v-for="(item,index) in filterHidden($store.state.perms.routers)" >        
                  <el-submenu  is="el-submenu"  style="margin-left:-10px;" :index="item.path" v-if="!item.leaf" :key="index"  >
                      <template slot="title"  >
                          <i :class="item.iconCls" class="iconfont iconfont1"></i>
                          <span class="collapse-font" slot="title">{{item.name}}</span>
                      </template>
                    
                      <template v-for="(child,index2) in filterHidden(item.children)" >   
                        <el-menu-item
                                style="padding-left:40px;"                 
                                v-if="child.isParent"
                                :index="child.path" 
                                :key="child.path"                
                                >
                              <i :class="item.iconCls" class="iconfont iconfont1"></i>
                              <span class="collapse-font" >{{child.name}}</span>                               
                        </el-menu-item>
                        <el-submenu style="" v-else :index="child.path" class="child-padding" :key="index2" >
                          <template slot="title">
                          <i :class="item.iconCls" class="iconfont iconfont1"></i>  
                          <span class="collapse-font">{{child.name}}</span>
                          </template>
                          <el-menu-item  
                                v-for="child2 in filterHidden(child.children)"
                                :index="child2.path" 
                                :key="child2.path">
                              <i :class="item.iconCls" class="iconfont iconfont1"></i>
                              <span class="collapse-font" >{{child2.name}}</span>    
                        </el-menu-item>
                        </el-submenu>
                      </template>                          
                  </el-submenu>
                
                  <el-menu-item style="margin-left:-10px;" v-if="item.leaf&&item.children.length>0" :index="item.path" class="first-item" :key="index" >
                      <i :class="item.iconCls" class="iconfont iconfont1"></i>
                      <span class="collapse-font " slot="title">{{item.name}}</span>
                  </el-menu-item>  
            </template>
          </el-scrollbar>
        </template>
        <template v-else>
            <template v-for="(item,index) in filterHidden($store.state.perms.routers)" >         
                    <el-submenu  style="margin-left: -10px;" :index="item.path" v-if="!item.leaf" :key="index"  >
                        <template slot="title"  >
                            <i :class="item.iconCls" class="iconfont iconfont1"></i>
                            <span class="collapse-font" slot="title">{{item.name}}</span>
                        </template>
                      
                        <template v-for="(child,index2) in filterHidden(item.children)" >   
                          <el-menu-item
                                  style="padding-left:40px;"                 
                                  v-if="child.isParent"
                                  :index="child.path" 
                                  :key="child.path"                
                                  >
                                <i :class="item.iconCls" class="iconfont iconfont1"></i>
                                <span class="collapse-font" >{{child.name}}</span>                               
                          </el-menu-item>
                          <el-submenu style="" v-else :index="child.path" class="child-padding" :key="index2" >
                            <template slot="title">
                            <i :class="item.iconCls" class="iconfont iconfont1"></i>  
                            <span class="collapse-font">{{child.name}}</span>
                            </template>
                            <el-menu-item  
                                  v-for="child2 in filterHidden(child.children)"
                                  :index="child2.path" 
                                  :key="child2.path">
                                <i :class="item.iconCls" class="iconfont iconfont1"></i>
                                <span class="collapse-font" >{{child2.name}}</span>    
                          </el-menu-item>
                          </el-submenu>
                        </template>                          
                    </el-submenu>
                  
                    <el-menu-item style="margin-left:-10px;" v-if="item.leaf&&item.children.length>0" :index="item.path" class="first-item" :key="index" >
                        <i :class="item.iconCls" class="iconfont iconfont1"></i>
                        <span class="collapse-font " slot="title">{{item.name}}</span>
                    </el-menu-item>
            </template>
        </template> 
    </el-menu>
  </div>
</template>

<script>
// import '@/plugs/slimscroll.min.js'
import VueI18n from 'vue-i18n'
import cmsZhLocale from '@/i18n/lang/zh_CN'
import cmsEnLocale from '@/i18n/lang/en'
import api from "@/api/api";
import axios from "axios";

export default {
  name: "dp-submenu",
  watch: {
    $route: function(to, from) {
      this.activeIndex = this.$route.path;
    }
  },
  data() {
    return {
       activeIndex: "/home",
       isCollapse: false,
       titleSearchContent:"",
       //动态菜单
       configMenu:[],
    };
  },
  methods: {
    //过滤掉不显示的路由菜单
    filterHidden(data){
      if(data){
         return data.filter(function(item){
              return !item.hidden;
         });
      }
    },
    collapseMenu() {//侧边栏收缩 
       this.$store.dispatch("setCollapse");
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    changeMenu(){
       //菜单dom改变后回调 此段代码需要查看element-ui 的el-scrollbar 源码 参考地址
       //https://blog.csdn.net/zhouweihua138/article/details/80077311
       this.$nextTick(function(){         
            var  clientHeight = this.$refs.subMenuScrollbar.$refs.wrap.clientHeight;
            var  scrollHeight = this.$refs.subMenuScrollbar.$refs.wrap.scrollHeight;
            var  clientWidth = this.$refs.subMenuScrollbar.$refs.wrap.clientWidth;
            var  scrollWidth = this.$refs.subMenuScrollbar.$refs.wrap.scrollWidth;

            var heightPercentage = (clientHeight * 100 / scrollHeight);
            var widthPercentage = (clientWidth * 100 / scrollWidth);

            var length =  this.$refs.subMenuScrollbar.$children.length;
            this.$refs.subMenuScrollbar.$children[length-1].$el.children[0].style.height=(heightPercentage < 100) ? (heightPercentage + '%') : '';
            this.$refs.subMenuScrollbar.$children[length-1].$el.children[0].style.width=(widthPercentage < 100) ? (widthPercentage + '%') : '';
            // alert(this.$refs.subMenuScrollbar.$children[length-1].$el.children[0].$el.className )
            // console.log(this.$refs.subMenuScrollbar)
       })
    }
  },
  computed:{
    subMenuHeight(){
      return {"height":this.$store.getters.mainHeight+"px"};
    },
    viewStyle(){
      return {"height":this.$store.getters.mainHeight-36+"px"};
    },
    wrapStyle(){
      return {"max-height":this.$store.getters.mainHeight-36+"px"};
    },

  },
  mounted(){
     this.activeIndex = this.$route.matched[1].path;
  },
  created(){
    
  }
};
</script>

<style lang="scss" scoped>
.full-height {
  width: 220px;
  height: 100%;
}
.el-menu{
  
  position: relative;
  z-index: 55;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 165px;
 
}
.el-menu-vertical-demo{
 -webkit-user-select: none;
 -ms-user-select: none;
 -moz-user-select: none;
 user-select: none;
}
.dp-menu-title{
  display: inline-block;
  // padding: 20px 24px 15px 24px;
  height:36px;
  line-height:36px;
  width: 100%;
  font-size: 13px;
  transition: 0.5s;
  position: relative;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.collapse-font{
  margin-left: 5px;
}
.el-menu--collapse{
  position: fixed;
  z-index: 500;
}
.el-menu--collapse .iconfont{
  font-size: 24px;
  margin-left: 10px;
  position: relative;
  left:-7px;
}

.el-menu-item.is-active{
  background: #303133 !important;
}
.iconfont{
  color: #7F99AC;
}

</style>

<style>
.dp-menu-title .el-input__inner{
    border-radius: 20px;
    border: 0px solid #3C3F41;
    font-size: 12px;
}
.dp-menu-title .el-input__inner:focus{
    border-color: #3C3F41;
}

.el-input__inner{
  font-size: 12px;
  background-color:#313335;
  border-radius: 0px;
  border: 0px solid #DCDFE6;
  color:#C0C4CC;
  padding:0px 0px 0px 30px;
}


</style>
