<script>
export default {
  data() {
    return {
      count: 0,
      text: ''
    }
  },

  
  props: {
      name: { default:"DEFAULT SUBJECT NAME aaaaaaaa", type: String },
      professor: { default:"DEFAULT PROFESSOR NAME", type: String },
      color: { default:"000", type: String},
      border: { default:"f00", type: String},
      
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
    <div class=" shadow-md space-x-1 rounded-full items-center flex flex-col overflow-hidden border-t-8 border-2" :style="{
      borderColor:`#${this.border}`,
      borderTopColor: `#${this.color}`,
      }" >
      <!-- <div class=" w-full h-1 " :style="{ backgroundColor: `#${color}`}"></div> -->
      <div class=" pt-1 flex  flex-col gap-2 justify-between flex-wrap w-8/12">
        <p class="leading-4 text-sm ">{{ name }}</p>
        <p class="text-xs text-gray-500">{{ professor }}</p>
        <!-- <div class="text-xs text-gray-500">{{ customClass }}</div> -->
      </div>
    </div>
</template>
