<template>
  <div class="home">
    <img alt="dontwastedata logo" src="../assets/logo.png">
    <HelloWorld msg="Get the waste data"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
