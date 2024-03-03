import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import { isTokenExpired } from '../utils/jwtUtil'


const router = createRouter({
  mode: 'history',
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'base',
      redirect: { name: 'welcome' }
    },
    {
      path: '/main',
      component: AppLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
        },
        {
          path: 'deviceDetail',
          name: 'deviceDetail',
          component: () => import('@/views/DeviceDetail.vue'),
        },
        {
          path: 'deviceList',
          name: 'deviceList',
          component: () => import('@/views/DeviceList.vue'),
        },
        {
          path: 'alarmLog',
          name: 'alarmLog',
          component: () => import('@/views/AlarmLog.vue'),
        },
        {
          path: 'alarmManagement',
          name: 'alarmManagement',
          component: () => import('@/views/AlarmManagement.vue'),
        },
        {
          path: 'quota',
          name: 'quota',
        component: () => import('@/views/Quota.vue'),
        },
        {
          path: 'trainingSettings',
          name: 'trainingSettings',
        component: () => import('@/views/TrainingSettings.vue'),
        },
        {
          path: 'storedModels',
          name: 'storedModels',
        component: () => import('@/views/StoredModels.vue')
        },
        {
          path: 'modelDetail',
          name: 'modelDetail',
        component: () => import('@/views/ModelDetail.vue')
        },
        {
          path: 'documentation',
          name: 'documentation',
        component: () => import('@/views/Documentation.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
        component: () => import('@/views/Settings.vue'),
        },
      ]
    },
    {
      path: '/pages/404',
      name: 'notfound',
      component: () => import('@/views/pages/NotFound.vue')
    },
    {
      path: '/user/login',
      name: 'login',
      component: () => import('@/views/pages/auth/Login.vue')
    },
    {
      path: '/user/signup',
      name: 'signup',
      component: () => import('@/views/pages/auth/Signup.vue')
    },
    {
      path: '/user/accessdenied',
      name: 'accessdenied',
      component: () => import('@/views/pages/auth/AccessDenied.vue')
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('@/views/pages/Welcome.vue')
    },
    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('@/views/pages/NotFound.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token')
    // if (token == null) {
    //   next({
    //     path: '/user/login',
    //     params: { nextUrl: to.fullPath }
    //   })
    // } else {
    //   if (isTokenExpired(token)) {
    //     next({
    //       path: '/user/login',
    //       params: { nextUrl: to.fullPath }
    //     })
    //   } else {
    //     next()
    //   }
    // }
    next()
  }
  else {
    next()
  }
})

export default router
