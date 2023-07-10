import { createRouter, createWebHashHistory} from 'vue-router';
// import IndexPage from '../views/IndexPage.vue';

const routes = [
    {
        path:'/',
        // component: IndexPage,
        children: [
            {
              path: 'MemberList',
              name: '會員資訊',
              component:() => import('../views/MemberList.vue'),
            },
            {
              path: 'LeaseStatus',
              name: '租賃情況',
              component:() => import('../views/LeaseStatus.vue'),
            },
            {
              path: 'ContractList',
              name: '合約管理',
              component:() => import('../views/ContractList.vue'),
            },
            {
              path: 'MeetingSchedule',
              name: '會議教室',
              component:() => import('../views/MeetingSchedule.vue'),
            },
            {
                path:'RevenueChart',
                name: '營收管理',
                component:() => import('../views/RevenueChart.vue')
              },
            {
                path:'AccessControl',
                name: '權限管理',
                component:() => import('../views/AccessControl.vue')
              },
            {
                path:'ChatWidget',
                name: '線上客服',
                component:() => import('../views/ChatWidget.vue')
              },
            {
                path:'IndexPage',
                name: '首頁',
                component:() => import('../views/IndexPage.vue')
              }
            ]
    },
   
    
        
        
    
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
