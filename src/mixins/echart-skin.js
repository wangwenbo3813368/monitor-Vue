export default {
    methods:{
       changeSkin(){
            this.$nextTick(function(){
                alert("我是echart图,我也要开始换肤了")
                this.myEchart.clear();				  
                this.myEchart.resize();
                this.myEchart.setOption(this.option);
            }) 
       }
    },
    computed:{
       borderColor(){
         //根据不同的主题色 返回不同颜色
       },
       textColor(){
         //根据不同的主题色 返回不同颜色
       }
    },
    created(){
        this.$EventBus.$on("setTheme", ({theme}) => {
            this.changeSkin(theme);
       });
    },
    beforeDestroy () {
        this.$EventBus.$off('setTheme',this.handle);
    }

}