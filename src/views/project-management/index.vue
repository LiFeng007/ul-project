<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 20:27:53
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-11 17:47:13
-->
<template>
  <div>
    <button
      class="green-btn"
      @click="$router.push({ name: 'project-detail', query: { projectId: 1 } })"
    >
      项目详情
    </button>
    <button
      class="tiffany-btn"
      @click="
        $router.push({ name: 'project-to-examine', query: { projectId: 1 } })
      "
    >
      项目审核
    </button>
    <!-- ** -->
    <Ul-nav @getData="getData">
      <template v-slot:left>
        <button class="blue-btn">项目上传</button>
      </template>
    </Ul-nav>
  </div>
</template>

<script>
  import UlNav from "@/components/nav";

  export default {
    name: "project-management",

    components: { UlNav },

    methods: {
      getData: function (e) {
        console.log(e);
      },
    },
  };
</script>

<style>
</style>