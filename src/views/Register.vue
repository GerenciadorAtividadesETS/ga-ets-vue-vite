<script lang="ts">
import axios from "axios";
import FormGenerator from "../components/FormGenerator.vue"
import FormFields from '../components/type'
import { defineComponent, ref } from "vue";
import ColorPicker from 'primevue/colorpicker';



export default {
    data() {
        return {
            color: "00ffff",
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
            ] as FormFields.Fields[]
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
        <div class="bg-red-100 w-full h-fit flex flex-col items-center rounded-3xl">
            <div class="text-xl p-2">
                Registrar
            </div>
            Select a color
            <ColorPicker v-model="color" class="mb-3 " inputId="cp-hex" format="hex"/>
            <div class="w-2/4 min-w-[260px]">
                <FormGenerator :action="apiCallTest" :fields="fields" />
            </div>
            <!-- {{ getFieldValueByName("EDV") }} -->
        </div>
    </div>
    
</template>