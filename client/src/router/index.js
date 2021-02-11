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
    // der webpackChunkName-Kommentar sorgt dafür, dass alle Routes mit dem gleichen ChunkName zusammen lazy loaded werden
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/secured',
    name: 'Secured',
    component: () => import('../views/Secured.vue'),
    /* beforeEnter: (to, from, next) => { //einfache middlware falls nur diese Route geschützt werden muss
      if(!store.getters['auth/user']) {
        return next('/login');
      }
      next();
    } */
    meta: {
      protectedRoute: true
    }
  },
  {
    path: '/secured2',
    name: 'Secured2',
    component: () => import('../views/Secured2.vue'),
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
      next('/secured');
    } else {
      next();
    }
  }
});

export default router;
