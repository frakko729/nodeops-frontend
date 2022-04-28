import { useUserStore } from "@/stores/userStore";
import { useUIStore } from "./stores/uiStore";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LandingPageLayout from "./views/layouts/LandingPageLayout.vue";
import AppLayout from "./views/layouts/AppLayout.vue";
import AppLayout2 from "./views/layouts/AppLayout2.vue";
import Cookies from "js-cookie";

/**
 * List of all routes
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "landing-page",
    component: () =>
      import(/* webpackChunkName: "landing-page" */ "@/views/LandingPage.vue"),
    meta: {
      requiresAuth: false,
      layout: LandingPageLayout,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue"),
    meta: { requiresAuth: true, layout: AppLayout2 },
  },
  {
    path: "/jobs",
    name: "jobs",
    component: () =>
      import(/* webpackChunkName: "jobs" */ "@/views/jobs/Jobs.vue"),
    meta: { requiresAuth: true, layout: AppLayout2 },
  },
  {
    path: "/jobs/create",
    name: "job-create",
    component: () =>
      import(/* webpackChunkName: "jobs" */ "@/views/jobs/JobCreate.vue"),
    meta: { requiresAuth: true, layout: AppLayout2 },
  },
  {
    path: "/jobs/:jobId",
    name: "job-detail",
    component: () =>
      import(/* webpackChunkName: "jobs" */ "@/views/jobs/JobDetail.vue"),
    meta: { requiresAuth: true, layout: AppLayout2 },
  },
  {
    path: "/nodes",
    name: "nodes",
    component: () =>
      import(/* webpackChunkName: "nodes" */ "@/views/Nodes.vue"),
    meta: { requiresAuth: true, layout: AppLayout2 },
  },
  {
    path: "/reports",
    name: "reports",
    component: () =>
      import(/* webpackChunkName: "reports" */ "@/views/Reports.vue"),
    meta: { requiresAuth: true, layout: AppLayout2 },
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "@/views/Settings.vue"),
    meta: { requiresAuth: true, layout: AppLayout2 },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "errors" */ "@/views/errors/NotFound.vue"),
    meta: { requiresAuth: false, layout: AppLayout2 },
  },
];

/**
 * Create router object
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

/**
 * Router before each route
 */
router.beforeEach((to, from) => {
  const userStore = useUserStore();

  /**
   * Check if auth cookie exists and relogin
   */
  if (from.name === undefined && Cookies.get("XSRF-TOKEN") !== undefined) {
    userStore.loginFromToken(to.path);
    return true;
  }

  /**
   * Check if route requires auth
   */
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return { name: "landing-page" };
  }

  /**
   * Close mobile navigation before route change
   */
  const uiStore = useUIStore();
  if (uiStore.isMobileNavigation) {
    uiStore.toggleMobileNavigation();
  }
  return true;
});

export default router;
