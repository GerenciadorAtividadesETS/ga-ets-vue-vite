<script lang="ts">
import { Subject } from './type';

export default {
  
  
  data() {
    return {
      count: 0,
      link: `/subjects/${this.subject?.id}`
    }
  },

  
  props: {
    subject: Object as () => Subject,
      // name: { default:"DEFAULT SUBJECT NAME aaaaaaaa", type: String },
      // professor: { default:"DEFAULT PROFESSOR NAME", type: String },
      // color: { default:"000", type: String},
      // border: { default:"f00", type: String},
      
  },
  computed: {
    customClass() {
      return ``
      ;
    }
  },
}
// tentar fazer isso funcionar no customclass e tals
</script>


<template>
    <router-link :to="link"  class="w-64 h-24 shadow-md bg-white space-x-1 text-start rounded-3xl items-center flex flex-col overflow-hidden border-t-8 border-2" :style="{
      borderColor:`#${this.subject?.border}`,
      borderTopColor: `#${this.subject?.cor}`,
      }" >
      <!-- <div class=" w-full h-1 " :style="{ backgroundColor: `#${color}`}"></div> -->
      <div class="h-full pt-1 flex items-start flex-col gap-2 justify-between flex-wrap w-8/12">
        <p class="leading-4 text-sm ">{{ subject?.nome }}</p>
        <div>
          <div class="h-[1 px] w-full bg-gray-400 rounded-full">
          </div>
          <!-- <p class="text-xs text-gray-500">{{ subject?.idUsuario }}</p> -->
        </div>
        <!-- <div class="text-xs text-gray-500">{{ customClass }}</div> -->
      </div>
    </router-link>
</template>
