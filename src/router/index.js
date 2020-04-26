import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      requireLogin: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  // 判断是否需要登录
  if(to.matched.some(res=>res.meta.requireLogin)){
      if(window.localStorage.getItem('user')){
        next()
      }else{
        next({path:'/login'})
      }
  }else{
    next();
  }
})

export default router
