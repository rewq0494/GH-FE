<template>
    <div id="app">
      <SidebarMenu/>

    </div>
    <router-view></router-view>
  </template>
  <!-- ----------------------------------------------------- -->
  <script>

  import SidebarMenu from '../components/SidebarMenu.vue'

  export default {
    name: 'App',
    components: {
        SidebarMenu,

    }
  }
  </script>
  <!-- ------------------------------- -->
<style>

html, body {
  background-color: #373633;
  margin: 0;
  padding: 0;
}

</style>