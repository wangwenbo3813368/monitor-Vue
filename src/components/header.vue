<template>
 
    <header  class="header">
        <div class="header-left">
            <h3 style="width:100%;text-align:center">东浦监控</h3>
        </div>
        <div class="header-right-left" >
            <ul class="header-ul">
                <li v-for="(item,index) in headerList" :key="index" 
                 :class="headerIndex==index?'header-li is-active':'header-li'">{{item.name}}</li>
            </ul>    
        </div>
         <div class="header-right">
            <el-button @click="changeSkin">换肤测试</el-button>
            <el-dropdown  trigger="click" style="">
                  <span class="el-dropdown-link">
                    甜酒<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-plus">问题反馈</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-plus">修改密码</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-plus-outline">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
            </el-dropdown>
         </div>
    </header>

</template>

<script>
import i18n from "@/i18n";
export default {
  data() {
    return {
      userName:localStorage.getItem('userName'),
      headerIndex:0,
      headerList:[{name:"IT监控"},{name:"CMDB"},{name:"自动运维"}]
    };
  },
  methods: {
    changeSkin(){
      window.document.documentElement.setAttribute("data-theme","white");//一级处理
      this.$store.dispatch('setTheme','white');//二级处理
      this.$EventBus.$emit("setTheme", {theme:'white'});//三级处理
    },
    collapseMenu() {//侧边栏收缩 
      this.$store.dispatch("setCollapse");
    },
    showPwd(){
      if(this.$store.state.sys.pwdCollapse){
          this.$store.dispatch('setPwd',false);
      }else{
        this.$store.dispatch('setPwd',true);
      }
    
    },
    logout() {//退出登录
      this.$confirm('确定退出吗？','提示', {type: "warning"})
        .then(mes => {
          this.$store.dispatch("loginOut").then(res => {
              if(res.code=='200'){
                   this.$router.push("/login");
              }else{
                  this.errorMessage()
              }
          });
        })
        .catch(error => {});
    }
  }
};
</script>

<style lang="scss" scoped>
@import  'static/css/mixins.scss';

.header{
 -webkit-user-select: none;
 -ms-user-select: none;
 -moz-user-select: none;
 user-select: none;
}
$header-height: 40px;
.header {
  width: 100%;
  height: $header-height;
  @include font_normal_color(#ffffff);
  @include background_level01_color(#ffffff);
  border-bottom: 0px;
  // box-shadow: 10px 1px 15px rgba(0, 0, 0, 0.17);
  @include box_shadow_normal();
  padding: 0px;
  position: fixed;
  top:0;
  z-index:1002;
  -webkit-transform: translateZ(0);

}
.header-left {
  float: left;
  display: flex;
  align-items: center;
  height: $header-height;
  width: 165px;
}
.header-right {
  float: right;
  display: flex;
  align-items: center;
  margin-right:5px;
  height: $header-height;
  .iconfont {
    cursor: pointer;
    font-size: 20px;
    color: #777777;
    margin-left: 25px;
    &:hover{
        color: #188ae2;
    }
  }
}

.header-right-left{
 float: left;
}
.header-right-left .header-ul{
 display: inline-block;
}
.header-right-left .header-li{
 display: inline-block;
 font-size:15px;
 font-weight: 100;
 height:40px;
 line-height: 40px;
 padding:0 20px;
 cursor: pointer;
}
.header-right-left .is-active{
  color:#E6A23C;
}
.header-right-left .header-li:hover{
  color:#909399;
}
.header-right-left .is-active:hover{
  color:#E6A23C;
}

@media screen and(max-width:800px) {
  .header-right {
    display: none;
  }
  .header-right-left{
    display: none;
  }
  .header-left {
    width: 100%;
    .header-logo {
      text-align: center;
      margin: 0 auto;
    }
  }
}
.header-user-group {
  display: flex;
  height: $header-height;
  line-height: $header-height;
  align-items: center;
}
.user-logo {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

.header-logo {
  margin-left: 26px;
}
.cur{
  cursor: pointer;
}

</style>

