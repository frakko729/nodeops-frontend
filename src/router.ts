import { useUIStore } from "./stores/uiStore";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue"),
  },
  {
    path: "/jobs",
    name: "jobs",
    component: () =>
      import(/* webpackChunkName: "jobs" */ "@/views/jobs/Jobs.vue"),
  },
  {
    path: "/job/create",
    name: "job-create",
    component: () =>
      import(/* webpackChunkName: "jobs" */ "@/views/jobs/CreateJob.vue"),
  },
  {
    path: "/projects",
    name: "projects",
    component: () =>
      import(/* webpackChunkName: "projects" */ "@/views/Projects.vue"),
  },
  {
    path: "/reports",
    name: "reports",
    component: () =>
      import(/* webpackChunkName: "reports" */ "@/views/Reports.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "@/views/Settings.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "errors" */ "@/views/errors/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

/**
 * Close mobile navigation before route change
 */
router.beforeEach(() => {
  const uiStore = useUIStore();
  if (uiStore.isMobileNavigation) {
    uiStore.toggleMobileNavigation();
  }
  return true;
});

export default router;
