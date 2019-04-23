import api from '@/api/api'

const roles = [{
    name: '工作台',
    role: '/work',
    isHidden: true,
    checked:true,
    api: [
        api.userLogin,
        api.flowSourceList,
        api.flowSearchWordList,
        api.statisticMemberList,
        api.globalStatistic,
        api.flowPvList,
    ]
},
{
    name: '品牌信息',
    role: '/CarBasic',
    children: [
        {
            name: '品牌管理',
            role: '/brand', 
            children:[
                {name: '品牌列表',
                 role: '/brand/list'
                },
                {name: '品牌维护',
                 role: '/brand/add'
                },
            ]         
        },
        {
            name: '车系管理',
            role: '/series',    
            children:[
                {name: '车系列表',
                 role: '/series/list'
                },
                {name: '车系维护',
                 role: '/series/add'
                },
            ]        
        },
    ]
}]
export default roles