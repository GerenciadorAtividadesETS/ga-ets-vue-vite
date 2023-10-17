<script lang="ts">
import axios from "axios";
import FormGenerator from "../components/FormGenerator.vue"
import FormFields from '../components/type'
import { defineComponent, ref } from "vue";

export default {
    data(){
        return{
            fields: [
            {
                name:"Nome",
                placeholder:"Insira seu nome completo",
                required:true,
                type:"text",
                value: "",
            },
            {
                name:"EDV",
                placeholder:"Insira seu edv",
                required:true,
                type:"number",
                value: "",
                min:6,
                max:6,
            },
            {
                name:"Senha",
                placeholder:"Insira sua senha",
                required:true,
                type:"password",
                value: "",
                min:6,
            },
            {
                name:"Confirmar senha",
                placeholder:"Confirme sua senha",
                required:true,
                type:"password",
                value: "",
                specificValidator:this.isSamePassword
            },
            ] as FormFields.Fields[]
        }
    },
    methods:{
        isSamePassword(){
            return "não"
        },
        apiCallTest(){
            axios.get("https://viacep.com.br/ws/01001000/json/")
            .then((res)=>{
                console.log(res.data)
            })
        },

        getFieldValue(name: string){
           for (let index = 0; index < this.fields.length; index++) {
            const element = this.fields[index];
            if (element.name == name){
                return element.value
            }
           }
        }
    },
    components:{
        FormGenerator
    }
}
</script>

<template>
    <div class="bg-white w-2/4 h-full flex flex-col items-center rounded-3xl">
        Registrar
        <FormGenerator :action="apiCallTest" :fields="fields"/>
        {{ getFieldValue("EDV") }}
    </div>
</template>