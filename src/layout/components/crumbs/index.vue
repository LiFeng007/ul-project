<!--
 * @Descripttion: 面包屑组件,基于路由元信息进行渲染
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 14:31:02
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-11 22:31:30
-->
<template>
  <div class="ul-crumbs">
    <!-- ** -->
    <span
      class="iconfont icon-fanhui2 cursor-porinter"
      v-if="$route.meta.crmuns.length > 1"
      @click="$router.go(-1)"
    ></span>
    <!-- ** -->
    <div
      class="ul-crumbs-item"
      v-for="(item, index) in $route.meta.crmuns"
      :key="index"
    >
      <span
        :class="[
          'text',
          $route.meta.crmuns.length > 1 &&
          !(index + 1 === $route.meta.crmuns.length)
            ? 'cursor-porinter graying'
            : '',
        ]"
        @click="item.to && $router.push({ name: item.to })"
        >{{ item.item }}</span
      >
      <span
        class="placeholder"
        v-if="!(index + 1 === $route.meta.crmuns.length)"
        >/</span
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: "ul-crmuns",
  };
</script>
