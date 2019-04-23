<template>
    <div class="dp-page" style="display:flex;justify-content:flex-end;height:30px;width:100%;background:#3C3F41">
      <div style="display:block;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="4000">
          </el-pagination>
        </div>
    </div>
</template>

<script>

export default {
    data(){
      return {
        currentPage:1,
      }
    },
    methods:{
      handleSizeChange(){

      },
      handleCurrentChange(){

      }
    }
 
};
</script>

<style>
.dp-page .el-pagination {
    padding: 4px 20px;

}
.dp-page .el-pagination button{
    border:1px solid #606266;
}
.dp-page .el-pagination button:disabled {
    color: #606266;
    background-color: #3C3F41;
    cursor: not-allowed;
}
.dp-page .el-pagination .btn-prev {
    padding-right: 6px;
    background: #3C3F41;
    color:#F2F6FC;
}
.dp-page .el-pagination .btn-next{
    padding-left: 6px;
    background: #3C3F41;
    margin-left:3px;
    color:#F2F6FC;

}
.dp-page .el-dialog, .el-pager li {
    background: #3C3F41;
    -webkit-box-sizing: border-box;
}

.dp-page .el-input--mini .el-input__inner {
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    border:1px solid #606266;
    background-color: #3C3F41;
    color:#C0C4CC;
}
.dp-page .el-pagination button{
    height: 22px;
    line-height: 22px;
    font-size: 12px;
}
.dp-page .el-pager li{
    height: 22px;
    line-height: 20px;
    font-size: 12px;
    border: 1px solid #606266;
    min-width: 32px;
    margin-left:3px;
    color:#C0C4CC;
}

.dp-page .el-pagination__editor{
    height: 22px;
    line-height: 22px;
    font-size: 12px;
}
.dp-page .el-pagination span:not([class*=suffix]) {
    height: 22px;
    line-height: 22px;
    font-size: 12px;
}
.dp-page .el-pagination__editor.el-input .el-input__inner {
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    border: 1px solid #606266;
    background-color: #3C3F41;
    color:#C0C4CC;
}

.dp-page  .el-input--mini .el-input__icon {
    line-height: 22px;
    font-size: 12px;
}


.dp-page .el-input__inner {
     padding: 0px; 
     font-size: 12px;
}

.dp-page  .el-pager li.active+li {
    border-left: 1px solid #606266;
}
.dp-page .el-pager li.active {
    color: #EBEEF5;
    cursor: default;
    background: #409EFF;
}
.dp-page .el-pager .more::before {
    line-height: 22px;
}
.el-select-dropdown{
    background-color: #3C3F41;
    border: 1px solid #606266;
}
.el-select-dropdown__item {
    padding: 0 30px;
    font-size: 12px;
    line-height:28px;
    height:28px;
}
.el-select-dropdown__item.selected {
    color: #409EFF;

}
.el-select-dropdown__item.hover{
   background-color: #606266;
   color: #409EFF;
}

</style>
