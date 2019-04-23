//通用颜色 如 告警级别颜色
export default {
    data() {
        return {

        }
    },
    methods: {
        //获取告警级别颜色 咨询 警告 一般 严重 灾难  1、2、3、4、5
        getTriggerColor(index){
            var color="#67C23A";
            switch(index){
                case 1:
                  color = "#409EFF";
                  break;
                case 2:
                  color = "#E6A23C";
                  break; 
                case 3:
                  color = "yellow";
                  break;
                case 4:
                  color = "#F56C6C";
                  break;
                case 5:
                  color = "red"; 
                  break;                                       
            }
            return color;
        },
        getTriggerName(index){
            var name="";
            switch(index){
                case 1:
                  name = "咨询";
                  break;
                case 2:
                  name = "警告";
                  break; 
                case 3:
                  name = "一般";
                  break;
                case 4:
                  name = "严重";
                  break;
                case 5:
                  name = "灾难"; 
                  break;                                       
            }
            return name;
        },        
    }

}