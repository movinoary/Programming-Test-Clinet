import { createRouter, createWebHistory } from "vue-router";
// Other
import LoginView from "../views/LoginView.vue";
import DashboardRouter from "../views/DashboardRouter.vue";
import DashboardView from "../views/DashboardView.vue";

// Customer Page
import CustomerAddView from "../views/CustomerAddView.vue";
import CustomerEditView from "../views/CustomerEditView.vue";
import CustomerRouter from "../views/CustomerRouter.vue";
import CustomerView from "../views/CustomerView.vue";

// Product Page
import ProductAddView from "../views/ProductAddView.vue";
import ProductEditView from "../views/ProductEditView.vue";
import ProductRouter from "../views/ProductRouter.vue";
import ProductView from "../views/ProductView.vue";

// Sales Page
import SalesAddView from "../views/SalesAddView.vue";
import SalesEditView from "../views/SalesEditView.vue";
import SalesRouter from "../views/SalesRouter.vue";
import SalesView from "../views/SalesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/",
      name: "dashboard",
      component: DashboardRouter,
      children: [
        {
          path: "",
          name: "home dashboard",
          component: DashboardView,
        },
        {
          path: "product",
          name: "product",
          component: ProductRouter,
          children: [
            {
              path: "",
              name: "home product",
              component: ProductView,
            },
            {
              path: "add",
              name: "add product",
              component: ProductAddView,
            },
            {
              path: "edit/:id",
              name: "edit product",
              component: ProductEditView,
            },
          ],
        },
        {
          path: "sales",
          name: "sales",
          component: SalesRouter,
          children: [
            {
              path: "",
              name: "home sales",
              component: SalesView,
            },
            {
              path: "add",
              name: "add sales",
              component: SalesAddView,
            },
            {
              path: "edit/:id",
              name: "edit sales",
              component: SalesEditView,
            },
          ],
        },
        {
          path: "customer",
          name: "customer",
          component: CustomerRouter,
          children: [
            {
              path: "",
              name: "home customer",
              component: CustomerView,
            },
            {
              path: "add",
              name: "add customer",
              component: CustomerAddView,
            },
            {
              path: "edit/:id",
              name: "edit customer",
              component: CustomerEditView,
            },
          ],
        },
      ],
    },
  ],
});
const akun = JSON?.parse(localStorage?.getItem("akunEcom")) || undefined;

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && akun === undefined) next({ name: "login" });
  if (to.name === "login" && akun !== undefined)
    next({ name: "home dashboard" });
  else next();
});

export default router;
