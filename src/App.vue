<script>
import HelloWorld from './components/HelloWorld.vue'
import TheHeader from './components/TheHeader.vue';
// import ChildComp from './ChildComp.vue'

export default {
  components: {
    HelloWorld,
    TheHeader
  }
}
</script>

<template>
  <div class="h-fit min-h-screen overflow-x-hidden flex flex-col  bg-slate-300">

    <TheHeader></TheHeader>
    <div class="flex justify-center flex-1 ">
      <router-view></router-view>
    </div>
    <!-- <HelloWorld msg="Vite + Vue" /> -->
  </div>
</template>

