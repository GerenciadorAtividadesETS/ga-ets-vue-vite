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
  },
  
}
</script>

<template>
  <div class="h-fit min-h-screen overflow-x-hidden flex flex-col  bg-slate-200">
    <TheHeader ></TheHeader>
    <div class="flex justify-center flex-1 ">
      <!-- <button :onclick="login">login</button> -->
      <router-view ></router-view>
    </div>
    <!-- <HelloWorld msg="Vite + Vue" /> -->
  </div>
</template>

