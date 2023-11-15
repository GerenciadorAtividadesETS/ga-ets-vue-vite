<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheHeader from './components/TheHeader.vue';
// import ChildComp from './ChildComp.vue'
import { User } from './components/type'
export default {
  data(){
    return{
      isUserLogged: false,
      user: {
            edv:"12312312",
            name:"Gustavinho",
            color:"27AAAF",
            class: 5,
        } as User
    }
  },
  components: {
    HelloWorld,
    TheHeader
  },
  methods: {
    login(){
      this.isUserLogged = !this.isUserLogged
    }
  }
}
</script>

<template>
  <div class="h-fit min-h-screen overflow-x-hidden flex flex-col  bg-slate-300">
    <TheHeader :is-logged="isUserLogged" :user="user" ></TheHeader>
    
    <div class="flex justify-center flex-1 ">
      <!-- <button :onclick="login">login</button> -->
      <router-view></router-view>
    </div>
    <!-- <HelloWorld msg="Vite + Vue" /> -->
  </div>
</template>

