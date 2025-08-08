import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue'
import BlogPostView from '../views/BlogPostView.vue'
import AboutView from '../views/AboutView.vue'
import AboutLeadershipView from '../views/AboutLeadershipView.vue'
import AboutPartnershipView from '../views/AboutPartnershipView.vue'
import ContactView from '../views/ContactView.vue'
import ServiceView from '../views/ServiceView.vue'
import MembershipView from '../views/MembershipView.vue'
import MembershipApplicationView from '../views/MembershipApplicationView.vue'
import MarketDataView from '../views/MarketDataView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import MediaView from '../views/MediaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView
    },
    {
      path: '/blog/:id',
      name: 'blog-post',
      component: BlogPostView,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/about/leadership',
      name: 'about-leadership',
      component: AboutLeadershipView
    },
    {
      path: '/about/partnership',
      name: 'about-partnership',
      component: AboutPartnershipView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/services',
      name: 'services',
      component: ServiceView
    },
    {
      path: '/membership',
      name: 'membership',
      component: MembershipView
    },
    {
      path: '/membership/application',
      name: 'membership-application',
      component: MembershipApplicationView
    },
    {
      path: '/market-data',
      name: 'market-data',
      component: MarketDataView
    },
    {
      path: '/resources',
      name: 'resources',
      component: ResourcesView
    },
    {
      path: '/media',
      name: 'media',
      component: MediaView
    }
  ]
})

export default router 