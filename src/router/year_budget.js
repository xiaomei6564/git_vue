/**
 * 预算模块
 */
export default [
  {
    path: 'index',            // 预算页
    name: 'index',
    component: resolve => require(['@/components/yearBudget/index/budget'], resolve),
  }
]
