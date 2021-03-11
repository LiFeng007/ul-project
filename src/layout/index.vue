<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 20:04:58
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-11 21:59:35
-->
<template>
  <div class="ul-nav">
    <nav>
      <!-- ** -->
      <div class="ul-nav-logo">
        <img src="@/assets/image/logo.png" title="logo" class="logo"/>
        <img src="@/assets/image/U+.png" title="u" class="u"/>
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
      </div>
    </nav>
    <UlCrumbs />
    <router-view></router-view>
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

    components: { UlCrumbs },
  };
</script>
