import Home from "./views/Home.vue";
import NotFound from "./views/NotFound.vue";
import Projects from "./views/Projects.vue";
import Reports from "./views/Reports.vue";
import Settings from "./views/Settings.vue";
import Jobs from "./views/Jobs.vue";
import CreateJob from "./views/CreateJob.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/jobs",
    name: "jobs",
    component: Jobs,
  },
  {
    path: "/job/create",
    name: "job-create",
    component: CreateJob,
  },
  {
    path: "/projects",
    name: "projects",
    component: Projects,
  },
  {
    path: "/reports",
    name: "reports",
    component: Reports,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
