<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <School name="南京中医药大学" address="仙林大道"></School>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import School from './components/School.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    School,
  }
}
</script>

<style>

</style>
