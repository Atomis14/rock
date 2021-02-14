import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

import Login from '../views/Login.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    title: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      protectedRoute: true
    }
  },
  {
    path: '/wall',
    name: 'Wall',
    component: () => import('../views/Wall.vue'),
    meta: {
      protectedRoute: true
    }
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('../views/Messages.vue'),
    meta: {
      protectedRoute: true
    }
  },
  {
    path: '/cloud',
    name: 'Cloud',
    component: () => import('../views/Cloud.vue'),
    meta: {
      protectedRoute: true
    }
  },
  //nicht exisiterende Routes abfangen
  {
    path: '/:cachAll(.*)',  //regex-Pattern
    name: '404',
    component: () => import('../views/404.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  document.title = `${to.name} - ${process.env.VUE_APP_TITLE}`;

  const toProtectedRoute = to.matched.some(record => record.meta.protectedRoute);
  if (toProtectedRoute) { //wenn geschützte Route und user nicht eingeloggt auf login umleiten
    if (!store.getters['auth/user']) {
      next('/login'); 
    } else {
      next();
    }
  } else {  //wenn ungeschützte Route aber User eingeloggt auf geschützten Bereich umeleiten
    if(store.getters['auth/user']) {
      next('/dashboard');
    } else {
      next();
    }
  }
});

export default router;
