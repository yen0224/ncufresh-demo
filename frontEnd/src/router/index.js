// modules
import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
// views
import Home from "@/views/HomePage.vue";
import Auth from "@/views/AuthPage.vue";
import NewArticle from "@/views/NewArticle.vue";
import NotFound from "@/views/notFound.vue";
import ViewPost from "@/views/ViewPost.vue";
import userManagement from "@/views/userManage.vue";
import notLogIn from "@/views/notLogIn.vue";
// 設置路由
// 參考文件：https://ithelp.ithome.com.tw/articles/10276947
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth,
    },
    {
      path: "/new",
      name: "NewArticle",
      component: NewArticle,
      //路由守衛，會再進入頁面前檢查是否有jwt，沒有的話就會導向notLogIn頁面
      beforeEnter: (to, from, next) => {
        if (Cookies.get("jwt")) {
          next();
        } else {
          //alert("You are not logged in");
          next("/notLogIn");
        }
      },
    },
    {
      path: "/post/:id",
      name: "ViewPost",
      component: ViewPost,
    },
    {
      path: "/user",
      name: "userManagement",
      component: userManagement,
      //路由守衛，會再進入頁面前檢查是否有jwt，沒有的話就會導向notLogIn頁面
      beforeEnter: (to, from, next) => {
        if (Cookies.get("jwt")) {
          next();
        } else {
          next("/notLogIn");
        }
      },
    },
    {
      path: "/notLogIn",
      name: "notLogIn",
      component: notLogIn,
    },
    {
      path: "/*",
      name: "404",
      component: NotFound,
    },
  ],
});

export default router;
