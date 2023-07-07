<template>
    <div id="app">
      <SidebarMenu/>

      <router-view></router-view>
    </div>
  </template>
  <!-- ----------------------------------------------------- -->
  <script>

  import SidebarMenu from '../components/SidebarMenu.vue'

  export default {
    name: 'IndexPage',
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