<script lang="ts">
import { MenuItem } from 'primevue/menuitem';
import { User } from './type';
import Breadcrumb from 'primevue/breadcrumb';
import { useRoute } from 'vue-router';
import { capitalize } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Icon } from '@iconify/vue';

export default {
  setup() {
    const route = useRoute()
    return {

      route

    }
  },
  props: {
    user: {} as () => User,
    isLogged: { default: false, type: Boolean },
  },
  data() {
    return {
      _user: this.user,
      _isLogged: this.isLogged,
      home: {
        label: 'pi pi-home',
        to: '/',
      },
      items: [
        { label: 'Computer', to: "/" },
        { label: 'Notebook', },
      ] as MenuItem[],
      rota: "",
      caminho: "",
      hideShow: false,

    };
  },
  components: {
    Breadcrumb,
    FontAwesomeIcon,
    Icon
  },
  methods: {
    capitalize(s: string) {
      return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    },
    logout() {
      this._user = undefined;
      this._isLogged = false
      this.hideShow = false
      this.$router.push({ path: '/' })
    },
    changeHideShow() {
      this.hideShow = !this.hideShow
    },
    metodo() {
      console.log("mudou");
      this.rota = this.route?.path
      this.caminho = this.route?.matched[0]?.path
      console.log("x");
      console.log(this.rota.split('/'));
      console.log(this.caminho);
      console.log("x");
      let rotas = [] as MenuItem[]
      console.log("xx");

      let stack = ""

      let item = {} as MenuItem

      this.rota.split("/").forEach((r, i) => {
        stack += i != 0 ? this.rota.split("/")[i - 1] + "/" : ""
        console.log("s: " + stack)
        if (i != 0 && r == "") {
          return
        }
        if (i == 0) {
          item = { label: "Home", to: "/" }
        } else {
          if (this.caminho.split('/')[i].startsWith(":")) {
            item = { label: capitalize(this.caminho.split('/')[i].slice(1)), to: stack + r }
          } else {
            item = { label: capitalize(r), to: stack + r }
            // item = { label: "um nome nem tão pequeno apenas para exemplificar", to: stack + r }
          }
        }

        rotas.push(item)
      });
      console.log("xx");
      console.log(rotas);

      this.items =
        rotas
      // rotas.toString().replace("[", "").replace("]","")

    }
  },
  watch: {
    '$route': {
      handler: 'metodo'
    }
  }


}
</script>

<template>
  <header class="flex z-50 flex-col drop-shadow-lg bg-white w-full items-start">
    <img class="object-fill h-1 w-full" src="/src/assets/boschgraphic.png" alt="bosch supergraphic" />

    <div class="flex flex-row justify-between w-screen h-14">
      <router-link class="min-w-[9rem] " to="/">
        <img class="object-contain h-full" src="/src/assets/bosch.png" alt="bosch icon" />

      </router-link>
      <div class="w-full flex max-w-[240px] text-xl justify-between items-center">
        <router-link v-if="_isLogged" class="m-2" to="/subjects">Matérias</router-link>
        <router-link class="m-2" to="/subjects">staticM</router-link>
      </div>
      <div class="w-full pr-5 flex text-xl justify-end items-center">
        <FontAwesomeIcon icon=""></FontAwesomeIcon>
        <button :onclick="changeHideShow" class="h-[3.30rem] w-[3.30rem] -mr-1 absolute  rounded-full z-50 overflow-hidden flex">
        </button>
          <div class="absolute " v-if="_isLogged">
              <div class="bg-white h-4 w-4 rounded-full absolute -ml-6 mt-1"></div>
              <Icon class="absolute -ml-[1.80rem] -mt-[0.20rem]" :color="'#fff'" height="30" width="30" icon="material-symbols:verified" />
              <Icon class="absolute -ml-[1.65rem] " :color="`#${_user?.color ?? '000000'}`" height="25"
              width="25" icon="material-symbols:verified" />
            </div>
            <Icon class="" :color="`#${_user?.color ?? '000000'}`" height="50" width="50"
            icon="ph:user-circle-gear-duotone" />

        <div :onmouseleave="() => this.hideShow = false" class=" pr-5 right-0  absolute top-14 p-2">
          <div v-if="hideShow && !_isLogged" class="bg-white p-2 rounded-2xl rounded-se">
            <router-link :onclick="() => this.hideShow = false" class="hover:bg-gray-300 w-full flex px-1 rounded"
              to="/login">
              Login
            </router-link>
            <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700">
            <router-link :onclick="() => this.hideShow = false" class="hover:bg-gray-300 w-full flex px-1 rounded"
              to="/register">
              Registrar
            </router-link>
          </div>
          <div v-else-if="hideShow" class="bg-white p-2 rounded-2xl rounded-se">
            <p>Nome: {{ _user?.name.split(" ")[0] }}</p>
            <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700">
            <p>Turma: {{ _user?.class }}</p>
            <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700">
            <button class="hover:bg-gray-300 w-full flex px-1 rounded" :onclick="logout">Sair</button>
          </div>
        </div>

      </div>
    </div>
  </header>
  <div class="w-full flex items-center justify-center text">
    <div class="w-[75rem] py-2 px-14">
      <div class="flex-wrap min-w-[280px] w-full">
        <Breadcrumb :model="items" class="h-fit w-fit text-xs flex flex-wrap sm:text-base" :pt="{
          root: { class: 'p-3 pl-5 pr-0 rounded-md bg-white' },
          // root: ({}) =>{ },
          menu: { class: 'flex flex-wrap break-words truncate' },
          menuitem: { class: 'truncate sm:h-5 flex items-center max-w-[10rem] sm:max-w-[15rem] h-4 pr-5' },
          label: { class: 'truncate flex flex-none h-4 sm:h-5' },
          separator: { class: '-ml-5' },
          action: { class: 'truncate sm:h-5' }

        }" />
        <!-- <Breadcrumb :model="[
          {},
          {}
        ] as MenuItem[]" class="h-fit w-fit" /> -->
      </div>
    </div>
  </div>
</template>