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
    children:[
      {
        path:'buildingManagement',
        component: () => import('../views/admin/BuildingManagement.vue')
      },{
        path: 'roomManagement',
        component: () => import('../views/admin/RoomManagement.vue')
      }
      ,{
        path: 'studentManagement',
        component: () => import('../views/admin/StudentManagement.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
