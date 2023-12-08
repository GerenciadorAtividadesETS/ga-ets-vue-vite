<script lang="ts">
import GaeAPI from '../apis/gaeAPI';
import { Activity, User } from './type';

export default {
  setup(props, ctx) {
      let professor_id = props.activity?.usuario_id
      let professor: User = {
        edv: '00000000',
        cor: "000000",
        nome: "default",
        turma: 0
      }
      GaeAPI.get(`/usuarios/${professor_id}`).then((res)=> professor = res.data)
      return {
        professor
      }
  },
  data() {
    return {
      count: 0,
      link: `${this.$route.path}/${this.activity?.id}`
      // link: `${this.$route.path}/${this.activity?.id}`
    }
  },

  
  props: {
    activity: Object as () => Activity,
      // name: { default:"DEFAULT activity NAME aaaaaaaa", type: String },
      // professor: { default:"DEFAULT PROFESSOR NAME", type: String },
      // color: { default:"000", type: String},
      // border: { default:"f00", type: String},
      
  },
  methods: {
    twoDigits(digit: string){
      // console.log(".");
      digit = digit + ""
      // console.log(digit.length);
      
      digit = digit.length < 2? "0"+digit : digit
      return digit
    },
    formatDateToString(date: Date){
      let newDate = ''
      newDate += this.twoDigits(date.getDate()) + "/"
      newDate += this.twoDigits(date.getMonth()) + "/"
      newDate += this.twoDigits(date.getFullYear())
      newDate += " " + this.twoDigits(date.getHours()) + ":"
      newDate += this.twoDigits(date.getMinutes())
      return newDate
    }
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
    <!-- <router-link :to="{path: $route.path, query: { q: activity?.id}}"  class="h-24 shadow-md bg-white space-x-1 text-start items-center flex pl-5 overflow-hidden border-l-8 border-2" :style="{ -->
    <router-link :to="link"  class="h-24 shadow-md bg-white space-x-1 text-start items-center flex pl-5 overflow-hidden border-l-8 border-2" :style="{
      borderColor:`#${this.activity?.border}`,
      borderLeftColor: `#${this.activity?.cor}`,
      }" >
      <!-- <div class=" w-full h-1 " :style="{ backgroundColor: `#${color}`}"></div> -->
      <div class="h-full w-full pt-1 flex items-start flex-col gap-2 justify-between flex-wrap">
        <div >
          <p class="leading-4 text-sm ">{{ activity?.titulo }}</p>
          <p class="text-xs text-gray-500">Abertura: &nbsp; &nbsp; &nbsp;{{ activity?.data_criacao? formatDateToString(activity?.data_criacao) : "" }} </p>
          <p class="text-xs text-gray-500">Vencimento:  {{ activity?.data_entrega?  
          "" + formatDateToString(activity?.data_entrega) : "-" }}</p>
        </div>
        <div>
          <div class="h-[1 px] w-full bg-gray-400 rounded-full">
          </div>
          <p class="text-xs text-gray-500">{{ professor?.nome }}</p>
        </div>
        <!-- <div class="text-xs text-gray-500">{{ customClass }}</div> -->
      </div>
    </router-link>
</template>
