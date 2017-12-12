import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
          path: '/',
          name: 'Main',
          component: Main
        },
    ]
})
