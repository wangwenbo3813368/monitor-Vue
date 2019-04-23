//用户主机详情页 公共方法调用
export default {
    data() {
        return {

        }
    },
    methods: {
        //动态设置每个模块的宽度高度 
        getHostViewBlockStyle(number,numerator,denominator,heightScale,backgroundColor){
            var heightScale = heightScale||4;
            var width = ((this.$store.state.sys.clientWidth- this.$store.state.sys.asideWidth)*this.$store.state.sys.hostContentWidthRate
            -24-(number-1)*6)*numerator/denominator;
            width = Math.floor(width* 100) / 100;
            return {
                fontSize:"12px",
                backgroundColor:backgroundColor||"#2B2B2B",
                display:"inline-block",
                "vertical-align":"top",
                width:width+"px",
                height:this.$store.state.sys.clientWidth/heightScale+'px',
            }
        },
        getHostViewContentStyle(number,numerator,denominator,heightScale){
            var heightScale = heightScale||4;
            var width = ((this.$store.state.sys.clientWidth- this.$store.state.sys.asideWidth)*this.$store.state.sys.hostContentWidthRate
            -24-(number-1)*6-2)*numerator/denominator;
            width = Math.floor(width* 100) / 100;
            return {
                width:width+"px",
                height:this.$store.state.sys.clientWidth/heightScale-25+'px',
            }
        }
    }

}