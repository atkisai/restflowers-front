import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Checkout from '../views/Сheckout.vue'
// import Franchise from '../views/Franchise.vue'
import Profile from '../views/Profile.vue'
import Delivery from "../views/Delivery";
import Contacts from "../views/Contacts";
import Chat from "../views/Chat";
import OrdersCrm from "../views/crm/OrdersCrm";
import ChatCrm from "../views/crm/ChatCrm";
import ProductsCrm from "../views/crm/ProductsCrm";
import StatisticsCrm from "../views/crm/StatisticsCrm";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/checkout',
    name: 'Сheckout',
    component: Checkout
  },
  // {
  //   path: '/franchise',
  //   name: 'Franchise',
  //   component: Franchise
  // },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/delivery',
    name: 'Delivery',
    component: Delivery
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path:'/crm/orders',
    component: OrdersCrm,
  },
  {
    path: '/crm/products',
    component: ProductsCrm,
  },
  {
    path: '/crm/statistics',
    component: StatisticsCrm,
  },
  {
    path: '/crm/chat',
    component: ChatCrm,
  },
  // {
  //   path: ,
  //   component: ,
  // },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
