//el-scrollbar公共函数 只修改y轴
export default {
    data() {
        return {

        }
    },
    methods: {
        refreshSrollBar(id){ 
            var  clientHeight = this.$refs[id].$refs.wrap.clientHeight;
            var  scrollHeight = this.$refs[id+'-div'].offsetHeight+24;                  
            var heightPercentage = (clientHeight * 100 / scrollHeight);
            var length =  this.$refs[id].$children.length;
            this.$refs[id].$children[length-2].$el.children[0].style.height=(heightPercentage < 100) ? (heightPercentage + '%') : '';                          
        }
    },
    created(){
        this.$EventBus.$on("refreshSrollBar", ({}) => {
            this.refreshSrollBar("hostDetailScrollbar");
       });
    },
    beforeDestroy () {
        this.$EventBus.$off('refreshSrollBar',this.handle);
    }

}