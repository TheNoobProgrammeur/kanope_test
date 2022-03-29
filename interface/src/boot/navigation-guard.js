import {isAuth, logout} from "src/service/auth";

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    if(to.path === '/logout'){
      logout()
    }
    const auth =  isAuth();
    if (!auth && to.path !== '/login') {
      next('/login')
    } else if(to.path === "/"){
      next('/sensor')
    }
    else {
      next()
    }
  })
}
