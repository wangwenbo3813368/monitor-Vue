export default {
    data() {
        return {
            loading: true, //遮罩层
            disabled: true, //禁用状态
            ids: "", //多选id
            status: "", //审核状态
            tableData: [], //表格数据
            total: 0, //列表总数
            listUrl: '',//列表地址,
            params: {},
            checkedList: [],//选中的对象
            state: false,
        }
    },
    methods: {
        initListData(url, params) {
            this.params = params;
            this.listUrl = url;
            this.getListData(params)
        },
        getListData(params) {
            this.loading = true;
            this.$http
                .post(this.listUrl, params)
                .then(res => {
                    this.loading = false;
                    if (res.status == true) {
                       this.setListData(res.data);
                    } else {
                        this.errorMessage('获取数据失败');
                    }


                })
                .catch(error => {
                    this.errorMessage('获取数据失败,请检查登录是否失效')
                    this.loading = false;
                });
        }
    }
}