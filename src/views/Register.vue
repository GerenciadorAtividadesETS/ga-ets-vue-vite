<script lang="ts">
import axios from "axios";
import FormGenerator from "../components/FormGenerator.vue"
import FormFields, { Field } from '../components/type'
import { defineComponent, ref } from "vue";
import ColorPicker from 'primevue/colorpicker';

export default {
    data() {
        return {
            color: "ff00ff",
            buttonName:"register",
            buttonClass:"m-2 py-1 px-4 bg-slate-300 rounded-full",
            fields: [
                {
                    name: "Nome",
                    placeholder: "Insira seu nome completo",
                    required: true,
                    type: "text",
                    value: "",
                },
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
                    name: "Turma",
                    placeholder: "Insira sua turma",
                    required: true,
                    type: "number",
                    value: "",
                },
                {
                    name: "Senha",
                    placeholder: "Insira sua senha",
                    required: true,
                    type: "password",
                    value: "",
                    min: 6,
                },
                {
                    name: "Confirmar Senha",
                    placeholder: "Confirme sua senha",
                    required: true,
                    type: "password",
                    value: "",
                    specificValidator: this.isSamePassword
                },
            ] as Field[]
        }
    },
    methods: {
        getFieldValueByName(name: string) {
            for (let index = 0; index < this.fields.length; index++) {
                const element = this.fields[index];
                if (element.name == name) {
                    return element.value
                }
            }
        },
        isSamePassword() {
            console.log("--");

            console.log(this.getFieldValueByName("Confirmar Senha"));
            console.log(this.getFieldValueByName("Senha"));

            if (this.getFieldValueByName("Senha") != this.getFieldValueByName("Confirmar Senha")) {
                return "Senhas não sao iguais"
            }
            else {
                return undefined
            }
        },
        apiCallTest() {
            this.mostrar()
            axios.get("https://viacep.com.br/ws/01001000/json/")
                .then((res) => {
                    console.log(res.data)
                })
        },
    },
    components: {
        FormGenerator,
        ColorPicker
    }
}

</script>

<template>
    <div class="w-2/4 mb-10 min-w-[280px] flex items-center content-center justify-center">
        <div class="bg-[#ffffff] pb-2 w-full h-fit flex flex-col items-center rounded-3xl">
            <div class="text-xl p-2">
                Registrar
            </div>
            <div class="w-2/4 min-w-[260px]">
                Select a profile color
                <div class="border flex items-center w-full bg-white rounded-lg p-1">
                        <ColorPicker v-model="color" inputId="cp-hex" format="hex" 
                         />#{{ color }}
                </div>
                <FormGenerator :buttonName="buttonName" :buttonClass="buttonClass" :action="apiCallTest" :fields="fields" />
            </div>
            <!-- {{ getFieldValueByName("EDV") }} -->
            <h1 class="text-sm flex">
                Já tenho uma conta 
                <router-link class="ml-1 text-green-600" to="/login">Entrar</router-link>

            </h1>
        </div>
    </div>
</template>