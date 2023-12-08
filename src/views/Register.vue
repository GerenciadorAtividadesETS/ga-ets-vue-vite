<script lang="ts">
import axios from "axios";
import FormGenerator from "../components/FormGenerator.vue"
import FormFields, { Field } from '../components/type'
import { defineComponent, ref } from "vue";
import ColorPicker from 'primevue/colorpicker';
import CustomInput from "../components/CustomInput.vue";
import GaeAPI from '../apis/gaeAPI'

export default {
    data() {
        return {
            color: "ff0000",
            color2: "ff0000",
            inputFocus: false,
            formProgress: 0,
            nameFields: [
                {
                    name: "Nome",
                    placeholder: "Insira seu nome completo",
                    required: true,
                    type: "text",
                    value: "",
                    max: 100
                },
            ] as Field[],
            basicFields: [
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
                    specificValidator: this.greaterThanZero,
                    max: 10
                },
            ] as Field[],
            passwordFields: [
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
                }
            ] as Field[]
        }
    },
    methods: {
        getFieldValueByName(name: string, fieldCollection: Field[]) {
            for (let index = 0; index < fieldCollection.length; index++) {
                const element = fieldCollection[index];
                if (element.name == name) {
                    return element.value
                }
            }
        },
        greaterThanZero() {
            if (this.getFieldValueByName("Turma", this.basicFields) == 0) {
                return "Turma Inválida"
            }
        },
        isSamePassword() {
            // console.log("--");

            // console.log(this.getFieldValueByName("Confirmar Senha"));
            // console.log(this.getFieldValueByName("Senha"));

            if (this.getFieldValueByName("Senha", this.passwordFields) != this.getFieldValueByName("Confirmar Senha", this.passwordFields)) {
                return "Senhas não sao iguais"
            }
            else {
                return undefined
            }
        },
        registerAccount() {
            console.log("Iniciou");
            
            GaeAPI.post("/usuarios",
                {
                    // "turma": this.getFieldValueByName("Turma", this.basicFields).valueOf(),
                    "turma": this.getFieldValueByName("Turma", this.basicFields),
                    "edv": this.getFieldValueByName("EDV", this.basicFields),
                    "nome": this.getFieldValueByName("Nome", this.nameFields),
                    "senha": this.getFieldValueByName("Senha", this.passwordFields),
                    "cor": this.color.toUpperCase()
                }
                )
                .then((res) => {
                    console.log(res.data)
                    alert("Sua conta foi criada com sucesso!")
                    this.$router.push({ path:"/login" })
                })
                .catch((error)=>{
                    alert(error.response.data)
                })
        },


    },
    components: {
        FormGenerator,
        ColorPicker,
        CustomInput
    }
}

</script>

<template>
    <div class="w-2/4 mb-10 min-w-[280px] flex justify-center">
        <div class="bg-[#ffffff] mt-10 pb-2 w-fit px-16 h-fit flex flex-col justify-between items-center rounded-3xl">
            <div class="text-xl py-10">
                {{ "" }}
                Registrar
            </div>
            <div class="flex flex-col items-center">


                <div class="w-2/4 min-w-[260px]">
                    <div v-if="this.formProgress == 0">

                        Select a profile color
                        <!-- <div class="h-16 w-16 " :style="{ backgroundColor: `#${color}` }"></div> -->

                        <div class="absolute mt-1 select-none text-gray-400">
                            <ColorPicker class="" v-model="color" inputId="cp-hex" format="hex" :pt="{
                                root: ({ props }) => ({
                                    class: [
                                        'inline-block pl-2',
                                        {
                                            'opacity-60 select-none cursor-default': props.disabled
                                        }
                                    ]
                                }),
                                input: {
                                    class: [
                                        'm-0',
                                        'font-sans text-base text-gray-600 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 rounded-lg cursor-pointer',
                                        'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
                                        'w-8 h-8'
                                    ]
                                },
                                panel: ({ props }) => ({
                                    class: [
                                        'shadow-md',
                                        'bg-gray-800 border-gray-900',
                                        {
                                            'relative h-48 w-52': props.inline,
                                            'absolute h-48 w-52': !props.inline
                                        }
                                    ]
                                }),
                                selector: 'absolute h-44 w-40 top-2 left-2',
                                color: {
                                    class: 'h-44 w-40',
                                    style: 'background: linear-gradient(to top, #000 0%, rgb(0 0 0 / 0) 100%), linear-gradient(to right, #fff 0%, rgb(255 255 255 / 0) 100%)'
                                },
                                colorhandle: {
                                    class: ['rounded-full border border-solid cursor-pointer h-3 w-3 absolute  opacity-85', 'border-white']
                                },
                                hue: {
                                    class: ['h-44 w-6 absolute top-2 left-44 opacity-85'],
                                    style: 'background: linear-gradient(0deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red)'
                                },
                                huehandle: 'border-solid border-2 cursor-pointer h-2 w-8 left-0 -ml-1 -mt-1 opacity-85 absolute',
                                transition: {
                                    overlay: {
                                        enterFromClass: 'opacity-0 scale-75',
                                        enterActiveClass: 'transition-transform transition-opacity duration-150 ease-in',
                                        leaveActiveClass: 'transition-opacity duration-150 ease-linear',
                                        leaveToClass: 'opacity-0'
                                    }
                                }.overlay
                            }" />

                            #

                        </div>
                        <!-- <CustomInput :field="{value:color}"></CustomInput> -->
                        <input :style="{ borderColor: inputFocus ? 'black' : '' }"
                            class="border flex w-full p-2 h-10 pl-14 py-2 rounded-md focus:outline-none focus:border-black"
                            type="text" v-model="color">
                        <div class="h-6"></div>
                        <div class="">


                            <FormGenerator buttonName="proximo" :action="() => { formProgress++ }"
                                :fields="this.nameFields" />
                        </div>
                    </div>
                    <FormGenerator v-else-if="this.formProgress == 1" buttonName="proximo"
                        :secondary-action="() => formProgress--" :action="() => { formProgress++ }"
                        :fields="this.basicFields" />
                    <FormGenerator v-else-if="this.formProgress == 2" buttonName="registrar" :action="registerAccount"
                        :fields="this.passwordFields" :secondary-action="() => formProgress--" />
                    <div class="w-full flex justify-end text-sm text-gray-500">
                        {{ formProgress + 1 }}/3
                    </div>
                </div>
            </div>
            <!-- {{ getFieldValueByName("EDV") }} -->
            <h1 class="text-sm flex py-4">
                Já tenho uma conta
                <router-link class="ml-1 text-green-600" to="/login">Entrar</router-link>

            </h1>
        </div>
    </div>
</template>