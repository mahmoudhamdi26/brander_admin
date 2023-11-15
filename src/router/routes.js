import { useAuthStore } from 'stores/auth'

const routes = [
  {
    path: '/auth',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/auth/LoginPage.vue'), name: "Login" },
      { path: 'register', component: () => import('pages/auth/RegisterPage.vue'), name: "Register" }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: (to, from, next) => {
      const isLoggedIn = useAuthStore().isLoggedIn();
      if(isLoggedIn){
        next();
      }else{
        next('/auth/login');
      }
    },
    children: [
      {
        path: '', name: 'Home',
        component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/users',
        children: [
          {path: '', name: 'UsersIndex', component: () => import('pages/users/IndexPage.vue'), meta: { requiresAuth: true } },
        ]
      },
      {
        path: '/templates',
        children: [
          {path: '', name: 'TemplatesIndex', component: () => import('pages/templates/IndexTemplates.vue'), meta: { requiresAuth: true } },
        ]
      },
      {path: '/templates/add', name: 'AddTemplate', component: () => import('pages/templates/AddTemplatePage.vue'), meta: { requiresAuth: true } }
    ]
  },





  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
