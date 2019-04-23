<template>
    <el-container>
      <el-aside :style="leftStyle">
        <!-- 左侧部 -->       
          <div style="width:100%;height:100%;background:#2B2B2B;
           border:1px solid #606266;box-shadow:0 0 3px #606266;">                   
            
<el-scrollbar  ref="treeScrollbar" :native="false" :wrapStyle="wrapStyle" wrapClass=""  :viewStyle="viewStyle"  tag="section"> 
                    <el-tree  :indent='12'
                              node-key="id"
                              ref="tree"
                              :render-after-expand='true'
                              :expand-on-click-node='true'
                              accordion
                              :data="treeData"
                              :props="defaultProps"
                              :filter-node-method="filterNode"
                              @node-expand="expandTree('treeScrollbar')"
                              @node-collapse="expandTree('treeScrollbar')"
                              @node-click="handleNodeClick"   
                              :default-expanded-keys="[]"
                              :default-checked-keys="[currentId]"
                                                      
                              >                             
                         <div   slot-scope="{ node,data }">                                                        
                              <div >                                    
                                   <div v-if="node.isLeaf==true">
                                        <el-tooltip v-if="getNameNowrap(data.label)" :content="data.label" placement="right-start">                                      
                                             <template v-if="data.id==currentId"  >
                                                  <div  style="color:#409EFF"   > 
                                                    <div class="tree-node"  :style="getTreeNodeStyle">
                                                      <i v-if="data.status==0" class="iconfont icon-remind_fill icon-host-warning" style="color:#67C23A"></i>              
                                                      <i v-if="data.status==1" class="iconfont icon-remind_fill icon-host-warning" style="color:#F56C6C"></i>
                                                      {{ node.label }}
                                                    </div>
                                                  </div>
                                             </template> 
                                             <template v-else>
                                                  <div  v-if="data.online==1" >  
                                                    <div class="tree-node" :style="getTreeNodeStyle">
                                                      <i v-if="data.status==0" class="iconfont icon-remind_fill icon-host-warning" style="color:#67C23A"></i>              
                                                      <i v-if="data.status==1" class="iconfont icon-remind_fill icon-host-warning" style="color:#F56C6C"></i>
                                                      {{ node.label }}
                                                    </div>
                                                  </div>
                                                  <div  v-if="data.online==0" style="color:#606266;cursor:not-allowed;"  class="tree-node">                
                                                    <div class="tree-node"  :style="getTreeNodeStyle">
                                                      <i  class="iconfont icon-remind_fill icon-host-warning" style="color:#606266"></i>
                                                        {{ node.label }}
                                                    </div>    
                                                  </div>                                                  
                                             </template> 
                                        </el-tooltip>
                                        <div v-else>
                                            <template v-if="data.id==currentId"  >
                                                  <div  style="color:#409EFF"   > 
                                                    <div class="tree-node"  :style="getTreeNodeStyle">
                                                      <i v-if="data.status==0" class="iconfont icon-remind_fill icon-host-warning" style="color:#67C23A"></i>              
                                                      <i v-if="data.status==1" class="iconfont icon-remind_fill icon-host-warning" style="color:#F56C6C"></i>
                                                      {{ node.label }}
                                                    </div>
                                                  </div>
                                             </template> 
                                             <template v-else>
                                                  <div  v-if="data.online==1" >  
                                                    <div class="tree-node" :style="getTreeNodeStyle">
                                                      <i v-if="data.status==0" class="iconfont icon-remind_fill icon-host-warning" style="color:#67C23A"></i>              
                                                      <i v-if="data.status==1" class="iconfont icon-remind_fill icon-host-warning" style="color:#F56C6C"></i>
                                                      {{ node.label }}
                                                    </div>
                                                  </div>
                                                  <div  v-if="data.online==0" style="color:#606266;cursor:not-allowed;"  class="tree-node">                
                                                    <div class="tree-node"  :style="getTreeNodeStyle">
                                                      <i  class="iconfont icon-remind_fill icon-host-warning" style="color:#606266"></i>
                                                        {{ node.label }}
                                                    </div>    
                                                  </div>                                                  
                                             </template>                                           
                                        </div>  
                                   </div> 
                                   <div v-else>
                                        <div>
                                             <div v-if='node.level==1'  style="color:#C0C4CC;font-size:12px">                                              
                                               <i  :class="'iconfont  icon-host-warning icon-item-manage'"  style="color:#C0C4CC"></i>
                                               {{ node.label }}
                                             </div>
                                             <div v-if='node.level==2' style="color:#C0C4CC;font-size:12px"> 
                                               <i v-if='node.level==2' :class="'iconfont  icon-host-warning '+data.icon" style="color:#C0C4CC"></i>
                                               {{ node.label }}
                                             </div>                                             
                                        </div> 
                                   </div>  
                              </div>
                         </div> 
                    </el-tree>
 </el-scrollbar>




          </div> 
      </el-aside>
      <el-main style="padding:0px;overflow:hidden;">
         <linux ></linux>
      </el-main>
    </el-container>      
</template>

<script>
import String from '@/untils/string'
import linux from '@/views/monitor/dphost/content/linux' 
export default {
     mixins:[],
     components:{linux},
     data(){
         var treeData =  [];
         var resources = ['主机','数据库','网络','存储','中间件'];
         var templates = ['Windows','Linux','Huawei CE','EMC',''];
         var hosts = [];

         for(var i=0;i<300;i++){
           hosts.push({
             label:'DFL-ITSHARE-02'+(i%2==0?'':'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊')+i,
             online:i%20==0?0:1,
             status:(i+1)%30==0?1:0,
             id:i,
           })
         }

        for(var i=0;i<10;i++){
          treeData.push({
          label: resources[i%5]+" "+300,
          children: [{
            label: templates[i%5]+" "+100,
            icon:'icon-windows',
            children: hosts
          }, {
            label: templates[i%5+1]+" "+200,
            icon:'icon-linux',
            children: hosts
          }]
          })
        }
          
        return {
          currentParentId:'',
          currentId:3,
          defaultProps: {
              children: 'children',
              label: 'label',
              value:'id'
          },           
          treeData: treeData,
          treeLeafData:[],
        }
     },
     methods:{
      filterNode(value, data) {
          
      },
      handleNodeClick(data,node,el) {
        if(data.online==0){
          return;
        }
        if(node.isLeaf==true){
           this.currentId = data.id;
           this.$store.dispatch('setCollapse',true);      
        }

      },
      expandTree(ref){
            this.$nextTick(function(){
              var self = this;
              setTimeout(() => {
                var  clientHeight = self.$refs[ref].$refs.wrap.clientHeight;
                var  scrollHeight = self.$refs[ref].$refs.wrap.scrollHeight;
                var  clientWidth = self.$refs[ref].$refs.wrap.clientWidth;
                var  scrollWidth = self.$refs[ref].$refs.wrap.scrollWidth;

                var heightPercentage = (clientHeight * 100 / scrollHeight);
                var widthPercentage = (clientWidth * 100 / scrollWidth);
                var length =  self.$refs[ref].$children.length;
                self.$refs[ref].$children[length-1].$el.children[0].style.height=(heightPercentage < 100) ? (heightPercentage + '%') : '';
                self.$refs[ref].$children[length-1].$el.children[0].style.width=(widthPercentage < 100) ? (widthPercentage + '%') : '';
                          
              }, 500);
           })
      },
      getNameNowrap(data){
          var width = new String(data).width('12px');
          return width>((this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth)*0.16-48);
      },
     },
     computed:{      
        leftStyle(){
          return {"height":this.$store.getters.mainHeight-52+"px",
                  padding:"12px 0px 12px 12px",width:"16%"};
        },
        wrapStyle(){
          return {"height":this.$store.getters.mainHeight-52-24+"px"};
        },
        viewStyle(){
          return {"height":this.$store.getters.mainHeight-52-24+"px"};
        },
        getTreeNodeStyle(){
          return {
              'white-space':'nowrap',
              'overflow':'hidden',
              'text-overflow':'ellipsis',
              'width': (this.$store.state.sys.clientWidth-this.$store.state.sys.asideWidth)*0.16-48+'px',
          }
        }

     },
     created(){
       this.$store.dispatch('setHostContentWidthRate',0.84);
     },
     beforeDestroy(){
       this.$store.dispatch('setHostContentWidthRate',1);
     }
 
};
</script>

<style >
.el-tree {
  position: relative;
  cursor: default;
  background:#2B2B2B;
  color: #C0C4CC;
  font-size: 12px;
}
.el-tree-node:focus .el-tree-node__content {
    background-color: #3C3F41;
}
.el-tree-node__content:hover {
    background-color: #3C3F41;
}
.el-tree-node__content:focus {
    background-color: #3C3F41;
}
.el-tree-node__content{
  height:24px;
  line-height:24px;
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.is-current{
    background-color: #3C3F41;
}
.el-tree-node__content>.el-tree-node__expand-icon {
    padding: 0px;
}
.el-tree-node.is-expanded>.el-tree-node__children {
    display: block;
}
.tree-node{
  white-space:nowrap;
  overflow:hidden; 
  text-overflow:ellipsis;
  width:150px;
}
</style>



