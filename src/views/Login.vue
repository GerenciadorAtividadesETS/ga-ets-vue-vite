<script lang="ts">
import axios from "axios";
import FormGenerator from "../components/FormGenerator.vue"
import FormFields, { Field, User } from '../components/type'
import { defineComponent, ref } from "vue";
import ColorPicker from 'primevue/colorpicker';
import Breadcrumb from "primevue/breadcrumb";
import CustomBreadcrumb from "../components/CustomBreadcrumb.vue";
import GaeAPI from "../apis/gaeAPI";

export default {
    props: {
        user: {} as () => User
    },
    data() {
        return {
            _user: this.user,
            buttonName: "entrar",
            buttonClass: "m-2 py-1 px-4 bg-slate-300 rounded-full",

            fields: [
                {
                    name: "EDV",
                    placeholder: "Insira seu edv",
                    required: true,
                    type: "number",
                    value: "1",
                    max: 8,
                },
                {
                    name: "Senha",
                    placeholder: "Insira sua senha",
                    required: true,
                    type: "password",
                    value: "1",

                },
            ] as Field[]
        }
    },
    methods: {

        OnFocus(e) {
            if (e.type == 'mousedown') {
                this.isChangingColor = true
            }
            // console.log(e.type);

            // console.log(visible);

            // this.isChangingColor = visible

        },
        getFieldValueByName(name: string) {
            for (let index = 0; index < this.fields.length; index++) {
                const element = this.fields[index];
                if (element.name == name) {
                    return element.value
                }
            }
        },
        loginAccount() {
            axios.post('http://localhost:8080/login',
                {
                    "edv": this.getFieldValueByName("EDV"),
                    "senha": this.getFieldValueByName("Senha")
                }
            )
                .then((res) => {
                    console.log(res.data);
                    this.$cookie.set("USER_TOKEN", "res.data.tokenJWT")
                    console.log(
                        this.$cookie.keys()
                    )
                })
                .catch((error) => {
                    console.log(error.response);

                })
            // GaeAPI.post("/login", {
            //     "edv": "92900290",
            //     "senha": "admin"
            // })
            //     .then((res) => {
            //         // this.$cookie.set("USER_TOKEN", res.data)
            //         // console.log(res.data)
            //     })
        },
        teste() {
            console.log("aa");
            this.$cookie.set("USER_TOKEN", "res.data")
            // this.user = {
            //     edv: "14234",
            //     name: "Livia",
            //     color: "2700AF",
            //     class: 5,
            // } as User
        },
        teste2() {
            console.log("aa");
            console.log(
                this.$cookie.get("USER_TOKEN"))
            // this.user = {
            //     edv: "14234",
            //     name: "Livia",
            //     color: "2700AF",
            //     class: 5,
            // } as User
        },
    },
    components: {
        FormGenerator,
        ColorPicker,
        Breadcrumb,
        CustomBreadcrumb
    }
}

</script>

<template>
    <div class="w-2/4 mb-10 min-w-[280px] flex justify-center">
        <div class="bg-[#ffffff] mt-10 pb-2 w-fit px-16 h-fit flex flex-col justify-between items-center rounded-3xl">

            <div class="flex flex-col items-center">

                <div class="text-xl py-10">
                    Entrar
                </div>

                <div class="w-2/4 min-w-[260px]">
                    <FormGenerator :buttonName="buttonName" :action="teste" :fields="fields" />
                    <FormGenerator :buttonName="buttonName" :action="teste2" :fields="fields" />
                </div>
            </div>

            <!-- {{ getFieldValueByName("EDV") }} -->
            <div class=" h-5 "></div>
            <h1 class="text-sm flex py-4">
                Não tenho uma conta
                <router-link class="ml-1 text-green-600" to="/register">Registrar</router-link>

            </h1>
        </div>
    </div>
</template>