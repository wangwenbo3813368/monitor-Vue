import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import body from '@/components/body'
import home from '@/components/home.vue'
import error from '@/components/404.vue'
import childView from '@/components/appMain.vue'





Vue.use(Router)
/**
 * routes==默认路由节点
 */
export const routes = [{
  path: '/login',
  name: '登录',
  component: login,
  hidden: true
},
{
  path: '/',
  name: '首页',
  meta: {
    role: 'home'
  },
  component: body,
  iconCls: 'icon-item-manage',
  leaf: true, //只有一个节点
  redirect: '/home',
  children: [{
    path: '/home',
    component: home,
  }
  ]
},
{
  path: '/monitor', 
  name: '监控',
  component: body,
  iconCls: 'icon-item-manage',
  meta: {
    isLink: true
  },
  children: [  
    {
      path: '/monitor/hostDetail',
      name: '主机详情页面', 
      isParent: true,
      component: resolve => { require(['@/views/monitor/dphost/view-hostDetail.vue'], resolve) },
      hidden:true,
    },  
    {
      path: '/monitor/resource/list',
      name: '一览列表',
      isParent: true,
      iconCls: 'icon-item-manage',
      component: resolve => { require(['@/views/monitor/dphost/view-hostlist.vue'], resolve) },
    },    
    {
      path: '/monitor/resource/host',
      name: '主机',
      isParent: true,
      iconCls: 'icon-item-manage',
      component: resolve => { require(['@/views/monitor/dpresource/view-resource.vue'], resolve) },
      redirect: '/monitor/resource/host',
      children:[
        {
          path: '/monitor/resource/host',
          name: '资源类页面-主机', 
          component: resolve => { require(['@/views/monitor/dpresource/content/host.vue'], resolve) },
          hidden: true,
        }, 
        {
          path: '/monitor/hostList',
          name: '主机模板类页面', 
          component: resolve => { require(['@/components/dpcomponents/list/host-list.vue'], resolve) },
          hidden: true,
        },
      ]
    },
    {
      path: '/monitor/resource/db',
      name: '数据库',
      isParent: true,
      iconCls: 'icon-item-manage',
      component: resolve => { require(['@/components/test/test02.vue'], resolve) }
    },
  ]
},
{
  path: '/test', 
  name: '测试',
  component: body,
  iconCls: 'icon-item-manage',
  meta: {
    isLink: true
  },
  children: [
    {
      path: '/test/test01',
      name: '测试001',
      component: childView,
      iconCls: 'icon-item-manage',
      children: [
        {
          path: '/test/test01/001',
          name: '测试001-001',
          isParent: true,
          iconCls: 'icon-item-manage',
          component: resolve => { require(['@/components/test/test02.vue'], resolve) }
        },
        {
          path: '/test/test01/002',
          name: '测试001-002',
          isParent: true,
          iconCls: 'icon-item-manage',
          component: resolve => { require(['@/components/test/test02.vue'], resolve) }
        },
        {
          path: '/test/test01/003',
          name: '测试001-003',
          isParent: true,
          iconCls: 'icon-item-manage',
          component: resolve => { require(['@/components/test/test02.vue'], resolve) }
        },
      ]
    }
  ]
},
{
  path: '/monitor1', 
  name: '监控',
  component: body,
  iconCls: 'icon-item-manage',
  meta: {
    isLink: true
  },
  children: [
    {
      path: '/monitor/host1',
      name: '主机',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test01.vue'], resolve) }
    },
    {
      path: '/monitor/db1',
      name: '数据库',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test02.vue'], resolve) }
    },
  ]
},
{
  path: '/monitor2', 
  name: '监控',
  component: body,
  iconCls: 'icon-item-manage',
  meta: {
    isLink: true
  },
  children: [
    {
      path: '/monitor/host2',
      name: '主机',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test01.vue'], resolve) }
    },
    {
      path: '/monitor/db2',
      name: '数据库',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test02.vue'], resolve) }
    },
  ]
},
{
  path: '/monitor3', 
  name: '监控',
  component: body,
  iconCls: 'icon-item-manage',
  meta: {
    isLink: true
  },
  children: [
    {
      path: '/monitor/host3',
      name: '主机',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test01.vue'], resolve) }
    },
    {
      path: '/monitor/db3',
      name: '数据库',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test02.vue'], resolve) }
    },
  ]
},
{
  path: '/monitor4', 
  name: '监控',
  component: body,
  iconCls: 'icon-item-manage',
  meta: {
    isLink: true
  },
  children: [
    {
      path: '/monitor/host4',
      name: '主机',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test01.vue'], resolve) }
    },
    {
      path: '/monitor/db4',
      name: '数据库',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test02.vue'], resolve) }
    },
  ]
},
{
  path: '/monitor5', 
  name: '监控',
  component: body,
  iconCls: 'icon-item-manage',
  meta: {
    isLink: true
  },
  children: [
    {
      path: '/monitor/host5',
      name: '主机',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test01.vue'], resolve) }
    },
    {
      path: '/monitor/db5',
      name: '数据库',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test02.vue'], resolve) }
    },
  ]
},
{
  path: '/monitor6', 
  name: '监控',
  component: body,
  iconCls: 'icon-item-manage',
  meta: {
    isLink: true
  },
  children: [
    {
      path: '/monitor/host6',
      name: '主机',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test01.vue'], resolve) }
    },
    {
      path: '/monitor/db6',
      name: '数据库',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test02.vue'], resolve) }
    },
  ]
},
{
  path: '/monitor7', 
  name: '监控',
  component: body,
  iconCls: 'icon-item-manage',
  meta: {
    isLink: true
  },
  children: [
    {
      path: '/monitor/host7',
      name: '主机',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test01.vue'], resolve) }
    },
    {
      path: '/monitor/db7',
      name: '数据库',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test02.vue'], resolve) }
    },
  ]
},
{
  path: '/monitor8', 
  name: '监控',
  component: body,
  iconCls: 'icon-item-manage',
  meta: {
    isLink: true
  },
  children: [
    {
      path: '/monitor/host8',
      name: '主机',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test01.vue'], resolve) }
    },
    {
      path: '/monitor/db8',
      name: '数据库',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test02.vue'], resolve) }
    },
  ]
},
{
  path: '/monitor9', 
  name: '监控',
  component: body,
  iconCls: 'icon-item-manage',
  meta: {
    isLink: true
  },
  children: [
    {
      path: '/monitor/host9',
      name: '主机',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test01.vue'], resolve) }
    },
    {
      path: '/monitor/db9',
      name: '数据库',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test02.vue'], resolve) }
    },
  ]
},
{
  path: '/monitor10', 
  name: '监控',
  component: body,
  iconCls: 'icon-item-manage',
  meta: {
    isLink: true
  },
  children: [
    {
      path: '/monitor/host10',
      name: '主机',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test01.vue'], resolve) }
    },
    {
      path: '/monitor/db10',
      name: '数据库',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test02.vue'], resolve) }
    },
  ]
},
{
  path: '/monitor11', 
  name: '监控',
  component: body,
  iconCls: 'icon-item-manage',
  meta: {
    isLink: true
  },
  children: [
    {
      path: '/monitor/host11',
      name: '主机',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test01.vue'], resolve) }
    },
    {
      path: '/monitor/db11',
      name: '数据库',
      isParent: true,
      iconCls: 'icon-item-manage',
      //component: home,
      component: resolve => { require(['@/components/test/test02.vue'], resolve) }
    },
  ]
},
];
export const ansycRoutes = [
];
