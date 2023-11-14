<script lang="ts">
import axios from "axios";
import FormGenerator from "../components/FormGenerator.vue"
import FormFields, { Field } from '../components/type'
import { defineComponent, ref } from "vue";
import ColorPicker from 'primevue/colorpicker';
import Breadcrumb from "primevue/breadcrumb";
import CustomBreadcrumb from "../components/CustomBreadcrumb.vue";


export default {
    data() {
        return {
            buttonName: "entrar",
            buttonClass: "m-2 py-1 px-4 bg-slate-300 rounded-full",
            home: {
                label: 'pi pi-home',
                to: '/',
            },
            items: [
                { label: 'Computer', to:"/" },
                { label: 'Notebook' },
            ],
            fields: [
                {
                    name: "EDV",
                    placeholder: "Insira seu edv",
                    required: true,
                    type: "number",
                    value: "",
                    min: 8,
                    max: 8,
                },
                {
                    name: "Senha",
                    placeholder: "Insira sua senha",
                    required: true,
                    type: "password",
                    value: "",
                    min: 6,
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
        isSamePassword() {
            // console.log("--");

            // console.log(this.getFieldValueByName("Confirmar Senha"));
            // console.log(this.getFieldValueByName("Senha"));

            if (this.getFieldValueByName("Senha") != this.getFieldValueByName("Confirmar Senha")) {
                return "Senhas não sao iguais"
            }
            else {
                return undefined
            }
        },
        apiCallTest() {
            axios.get("https://viacep.com.br/ws/01001000/json/")
                .then((res) => {
                    // console.log(res.data)
                })
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
    a
    <CustomBreadcrumb :items="[{to:'/ahoy'}]"/>
    a
    <div class="w-2/4 mb-10 min-w-[280px] flex items-center content-center justify-center">
        <div class="bg-[#ffffff] pb-2 w-full h-3/5 justify-around flex flex-col items-center rounded-3xl">
            <div class="text-xl p-2">
                Entrar
            </div>
            <div class="w-2/4 min-w-[260px]">
                <FormGenerator :buttonName="buttonName" :buttonClass="buttonClass" :action="apiCallTest" :fields="fields" />
            </div>
            <!-- {{ getFieldValueByName("EDV") }} -->
            <h1 class="text-sm flex">
                Não tenho uma conta
                <router-link class="ml-1 text-green-600" to="/register">Registrar</router-link>

            </h1>
        </div>
    </div>
</template>