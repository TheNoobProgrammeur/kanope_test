const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "sensor", component: () => import("pages/SensorPage.vue") },
      {path: "user",component: () => import("pages/UserAdminPage.vue") },
      {path: "rooter",component: () => import("pages/RooterPage.vue") }
    ],
  },
  {
    path: "/login",
    component: () => import("pages/loginPage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
