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
import LoginView from '../views/LoginView.vue'
import CMSView from '../views/CMSView.vue'

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
      path: '/blog/:slug',
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
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/cms',
      name: 'cms',
      component: CMSView,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guard for protected routes
router.beforeEach(async (to, from, next) => {
  const { useAuth } = await import('../composables/useAuth')
  const { initializeAuth, isAuthenticated } = useAuth()
  
  // Initialize auth if not already done
  if (!isAuthenticated.value && localStorage.getItem('auth_token')) {
    await initializeAuth()
  }
  
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/login')
  } else {
    next()
  }
})

export default router 