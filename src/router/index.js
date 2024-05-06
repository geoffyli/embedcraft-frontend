import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import { isTokenExpired } from '../utils/jwtUtil';

/**
 * Vue Router configuration with routes and authentication checks.
 */
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
        requiresAuth: true // Marks routes under this path as requiring authentication
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue'), // Lazy-loaded component
        },
        {
          path: 'trainingSettings',
          name: 'trainingSettings',
          component: () => import('@/views/TrainingSettings.vue'), // Lazy-loaded component
        },
        {
          path: 'storedModels',
          name: 'storedModels',
          component: () => import('@/views/StoredModels.vue'), // Lazy-loaded component
        },
        {
          path: 'modelDetail',
          name: 'modelDetail',
          component: () => import('@/views/ModelDetail.vue'), // Lazy-loaded component
        },
        {
          path: 'documentation',
          name: 'documentation',
          component: () => import('@/views/Documentation.vue'), // Lazy-loaded component
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/views/Settings.vue'), // Lazy-loaded component
        }
      ]
    },
    {
      path: '/pages/404',
      name: 'notfound',
      component: () => import('@/views/pages/NotFound.vue') // Lazy-loaded 404 component
    },
    {
      path: '/user/login',
      name: 'login',
      component: () => import('@/views/pages/auth/Login.vue') // Lazy-loaded login component
    },
    {
      path: '/user/signup',
      name: 'signup',
      component: () => import('@/views/pages/auth/Signup.vue') // Lazy-loaded signup component
    },
    {
      path: '/user/accessdenied',
      name: 'accessdenied',
      component: () => import('@/views/pages/auth/AccessDenied.vue') // Lazy-loaded access denied component
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('@/views/pages/Welcome.vue') // Lazy-loaded welcome component
    },
    // Fallback for unmatched routes (404)
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('@/views/pages/NotFound.vue') // Lazy-loaded 404 component
    }
  ]
});

/**
 * Global navigation guard to check for authentication before navigating to routes requiring auth.
 */
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    
    // If no token is found, redirect to the login page
    if (token == null) {
      next({
        path: '/user/login',
        params: { nextUrl: to.fullPath }
      });
    } else {
      // Check if the token is expired
      if (isTokenExpired(token)) {
        next({
          path: '/user/login',
          params: { nextUrl: to.fullPath }
        });
      } else {
        next(); // Proceed to the requested route
      }
    }
    next(); // Ensure the guard continues correctly
  } else {
    next(); // Proceed to the requested route
  }
});

export default router;
