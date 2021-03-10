<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 14:50:11
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-10 22:21:35
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>


<style lang="scss">
.router-link-exact-active{
  color: red;
}
</style>
