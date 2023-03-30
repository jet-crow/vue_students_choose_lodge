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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
