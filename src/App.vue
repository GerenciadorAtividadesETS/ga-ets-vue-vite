<script>
import HelloWorld from './components/HelloWorld.vue'
import TheHeader from './components/TheHeader.vue';
// import ChildComp from './ChildComp.vue'

export default {
  data(){
    return{
      user: false
    }
  },
  components: {
    HelloWorld,
    TheHeader
  },
  methods: {
    login(){
      this.user = !this.user
    }
  }
}
</script>

<template>
  <div class="h-fit min-h-screen overflow-x-hidden flex flex-col  bg-slate-300">
    <TheHeader class="fixed" :is-logged="user"></TheHeader>
    
    <div class="flex justify-center mt-[3.75rem] flex-1 ">
      <!-- <button :onclick="login">login</button> -->
      <router-view></router-view>
    </div>
    <!-- <HelloWorld msg="Vite + Vue" /> -->
  </div>
</template>

