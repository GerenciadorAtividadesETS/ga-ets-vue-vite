<script lang="ts">
import { Activity } from './type';

export default {
  data() {
    return {
      count: 0,
      link: `/subjects/${this.activity?.id}`
    }
  },

  
  props: {
    activity: Object as () => Activity,
      // name: { default:"DEFAULT activity NAME aaaaaaaa", type: String },
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
    <router-link :to="link"  class="w-64 h-24 shadow-md bg-white space-x-1 text-start rounded-full items-center flex flex-col overflow-hidden border-t-8 border-2" :style="{
      borderColor:`#${this.activity?.border}`,
      borderTopColor: `#${this.activity?.color}`,
      }" >
      <!-- <div class=" w-full h-1 " :style="{ backgroundColor: `#${color}`}"></div> -->
      <div class="h-full pt-1 flex items-start flex-col gap-2 justify-between flex-wrap w-8/12">
        <p class="leading-4 text-sm ">{{ activity?.title }}</p>
        <div>
          <div class="h-[1 px] w-full bg-gray-400 rounded-full">
          </div>
          <!-- <p class="text-xs text-gray-500">{{ activity?.professor }}</p> -->
        </div>
        <!-- <div class="text-xs text-gray-500">{{ customClass }}</div> -->
      </div>
    </router-link>
</template>
