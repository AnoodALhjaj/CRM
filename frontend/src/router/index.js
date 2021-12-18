import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import SignUp from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Dashbord from '../views/dashbord/Dashbord.vue'
import Profile from '../views/dashbord/Profile.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/sign-up',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/log-in',
    name: 'login',
    component: Login
  },
  {
    path: '/dashbord',
    name: 'dashbord',
    component: Dashbord,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuth) {
    next('/log-in')
  } else {
    next()
  }
})
export default router
