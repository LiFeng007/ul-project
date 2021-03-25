<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 20:04:58
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-25 22:00:16
-->
<template>
  <div class="ul-layout">
    <div style="position:fixed;top:0;width:100%;z-index:999">
      <nav>
        <!-- ** -->
        <div class="ul-nav-logo">
          <img src="@/assets/image/logo.png" title="logo" class="logo" />
          <img src="@/assets/image/U+.png" title="u" class="u" />
        </div>
        <!-- ** -->
        <div class="ul-nav-link">
          <router-link v-for="(item, index) in routeArr" :key="index" :to="{ name: item.to }" tag="div" class="cursor-porinter">
            {{ item.name }}
          </router-link>
        </div>
        <!-- ** -->
        <div class="ul-nav-user">
          <img src="@/assets/image/user.png" alt="user">
          <span class="cursor-porinter" @click="logOut">【退出登录】</span>
        </div>
      </nav>
    </div>
    <UlCrumbs />
    <!-- <transition name="fade"> -->
    <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
  import UlCrumbs from "./components/crumbs";

  export default {
    name: "layouat",

    data() {
      const routeArr = [
        { name: "课程管理", to: "course" },
        { name: "解惑模块", to: "puzzle-solving" },
        { name: "项目管理", to: "project" },
        { name: "员工管理", to: "staff" },
      ];
      return {
        routeArr,
      };
    },

    methods: {
      logOut: function () {
        window.localStorage.removeItem("x-token");
        this.$root.$tipsInfo("退出登录", "warning");
        this.$router.push('/login');
      },
    },

    components: { UlCrumbs },
  };
</script>
