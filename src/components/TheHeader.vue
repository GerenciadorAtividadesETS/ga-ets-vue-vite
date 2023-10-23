<script>
export default {
  data(){
    return{
      
    }
  },
  props:{
    isLogged: {default: false , type:Boolean}
  }

}
</script>

<template>
    <div class="flex flex-col drop-shadow-lg bg-white w-full items-start">
      <img class="object-fill h-1 w-full" src="/src/assets/boschgraphic.png" alt="bosch supergraphic" />

      <div class="flex flex-row justify-between w-screen h-14">
        <img class="object-contain h-14" src="/src/assets/bosch.png" alt="bosch icon" />
        <div class="w-full flex max-w-[240px] text-xl justify-around items-center">
          <router-link class="m-2" to="/">Home</router-link>
          <router-link v-if="isLogged" class="m-2" to="/subjects">Matérias</router-link>
          <router-link class="m-2" to="/subjects">staticM</router-link>
        </div>
        <div class="w-full pr-5 flex text-xl justify-end items-center">
          <router-link to="/login">
            <div class="bg-black h-12 w-12 rounded-full"></div>
          </router-link>
        </div>
      </div>
    </div>
</template>