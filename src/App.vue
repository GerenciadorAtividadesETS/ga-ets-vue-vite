<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheHeader from './components/TheHeader.vue';
// import ChildComp from './ChildComp.vue'
import { User } from './components/type'
export default {
  setup(){
    
  },
  data(){
    return{
      isUserLogged: false,
      user: {} as User
      // user: {
      //       edv:"12312312",
      //       nome:"Gustavinho inho",
      //       cor:"27AAAF",
      //       turma: 0,
      //   } as User
    }
  },
  components: {
    HelloWorld,
    TheHeader
  },
  methods: {
    login(){
      this.$cookies.set("a", "b")
      console.log(this.$cookies.get("a"));
      
      // this.isUserLogged = !this.isUserLogged
    }
  }
}
</script>

<template>
  <div class="h-fit min-h-screen overflow-x-hidden flex flex-col  bg-slate-200">
    <TheHeader :is-logged="this.isUserLogged" :user="this.user" ></TheHeader>
    <button :onclick="login">login</button>
    <div class="flex justify-center flex-1 ">
      <!-- <button :onclick="login">login</button> -->
      <router-view :user="this.user"></router-view>
    </div>
    <!-- <HelloWorld msg="Vite + Vue" /> -->
  </div>
</template>

