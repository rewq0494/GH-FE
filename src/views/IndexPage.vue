<template>
  <div><NavbarMenu/></div>
  <div><IndexCarousel/></div>
  <div><IndexService/></div>
  
  </template>
  <!-- ----------------------------------------------------- -->
<script>
import NavbarMenu from '../components/NavbarMenu.vue'
import IndexCarousel from '../components/index/IndexCarousel.vue'
import IndexService from '../components/index/IndexService.vue'

export default {

  components: {
    NavbarMenu,
    IndexCarousel,
    IndexService,
  }
}
</script>


<style>

html, body {
  background-color: #524e4e49;
  margin: 0;
  padding: 0;
}
div{
  position: relative;
}

</style>