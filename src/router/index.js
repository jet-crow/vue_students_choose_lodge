import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/confirmationInfo',
    name: 'confirmationInfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/ConfirmationInfo.vue')
  },
  {
    path: '/pickUp',
    name: 'pickUp',
    component: () => import(/* webpackChunkName: "about" */ '../views/PickUp.vue')
  },
  {
    path: '/hall',
    name: 'hall',
    component: () => import(/* webpackChunkName: "about" */ '../views/Hall.vue')
  },
  {
    path: '/hallInfo',
    name: 'hallInfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/HallInfo.vue')
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: () => import('../views/admin/AdminLogin.vue')
  },
  {
    path: '/admin',
    name: 'afterIndex',
    component: () => import('../views/admin/AfterIndex.vue'),
    children: [
      {
        path: 'buildingManagement',
        component: () => import('../views/admin/BuildingManagement.vue')
      }, {
        path: 'roomManagement',
        component: () => import('../views/admin/RoomManagement.vue')
      }, {
        path: 'studentManagement',
        component: () => import('../views/admin/StudentManagement.vue')
      }, {
        path: 'dormitory',
        component: () => import('../views/admin/Dormitory.vue')
      }

    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//路由拦截
router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  let token = localStorage.getItem("token");
  if (to.path === '/') {
    if ((token === null || token === '')) next();
    else next("/confirmationInfo");
    return;
  } else if ((token === null || token === '') && !to.path.includes("admin")) {
    next('/')
    return;
  }

  //如果访问含admin的网址，必须有adminToken，否则直接返回到前端登录页面
  let adminToken = localStorage.getItem("adminToken");
  if (to.path === '/admin/login') {
    next();
    return;
  } else if (to.path.includes("admin") && (adminToken === null || adminToken === '')) {
    next("/");
    return;
  }
  next();
});
export default router
