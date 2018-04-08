import Vue from 'vue'
import Router from 'vue-router'
import TabBar from '../components/TabBar'
import Tabs from '../components/reying/Tabs'
import SearchInput from '../components/SearchInput'
import MovieDetail from '../components/MovieDetail'
import FindMovie from '../components/zhaopian/FindMovie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: TabBar,
      children:[
        {
          path: '/',
          component: Tabs,
        },
        {
          name:'findMovie',
          path: '/find',
          component: FindMovie
        }
      ]
    },
    {
      name:'search',
      path: '/search',
      component: SearchInput
    },
    {
      name:'detail',
      path: '/movie-detail',
      component: MovieDetail
    },

  ]
})
