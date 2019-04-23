//el-scrollbar公共函数 只修改y轴
export default {
    data() {
        return {

        }
    },
    methods: {

    },
    mounted(){
        this.$nextTick(function(){
            this.$EventBus.$emit("refreshSrollBar",{});
          })
    }

}