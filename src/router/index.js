import Router from 'vue-router'
import Goods from 'components/goods/Goods.vue'
import Seller from 'components/seller/Seller.vue'
import Ratings from 'components/ratings/Ratings.vue'

export default new Router({
  routes: [
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/seller',
      component: Seller
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '*',
      redirect: '/goods'
    }
  ],
  linkActiveClass:'active'
})
