import { createRouter, createWebHashHistory } from 'vue-router'
import PickUp from '../views/PickUp.vue'

const routes = [
  {
    path: '/',
    name: 'PickUp',
    component: PickUp
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/confirmationInfo',
    name: 'confirmationInfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/ConfirmationInfo.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
