// import Vue from 'vue'
// import Router from 'vue-router'
// import budgetNav from '@/components/yearBudget/budget_nav'//预算模块头部
// import yearBudget from '@/router/year_budget'//预算模块




Vue.use(VueRouter)
// 页面刷新时，重新赋值token


const router = new VueRouter({
  routes: [
    {
      path: '/',
      // redirect: '/budget/index'
    },
    //预算模块
    // {
    //   path: '/yearBudget',
    //   name:'yearBudget',
    //   component: budgetNav,
    //   children:[
    //     ...yearBudget
    //   ]
    // }
  ]
});

export default router;
