<script lang="ts">
import CustomTable from './CustomTable.vue';
import { Answer } from './type';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';
import { Table, User } from './type';
import axios from 'axios';
import GaeAPI from '../apis/gaeAPI'

type arrayBool = { value: Boolean }

export default {

    setup(props, ctx) {
        // retorno da api.then setar variavel 
        // console.log();
        console.log(props.activityId);

        
        var user: User = {
            edv: "12312312",
            nome: "Gustavinho",
            cor: "27AAAF",
            turma: 5,
        }

        var answer: Answer = {
            id: 0,
            idUsuario: user.edv,
            dataAlteracao: (new Date),
            compartilhado: "GUSTAVO_MIGUEL_RONCADA_MEIRA\\TRILHA_DEV\\AULAS JAVA\\GAE",
            github: "https://github.com/Honkato/Delivery",
            comentario: ""
        };

        const tokenJWT = "";
        GaeAPI.get("", { headers: { Authorization: tokenJWT } })
            .then(
                () => {
                    answer = {
                        id: 0,
                        idUsuario: user.edv,
                        dataAlteracao: (new Date),
                        compartilhado: "GUSTAVO_MIGUEL_RONCADA_MEIRA\\TRILHA_DEV\\AULAS JAVA\\GAE",
                        github: "https://github.com/Honkato/Delivery",
                        comentario: ""
                    }
                }
            )
        GaeAPI.get("", { headers: { Authorization: tokenJWT } })
            .then(
                () => {
                    user = {
                        edv: "12312312",
                        nome: "Gustavinho",
                        cor: "27AAAF",
                        turma: 5,
                    }
                }
            )

        let formatNum = (num: number) => {
            return num.toString().length == 1 ? "0" + num.toString() : num.toString()
        }
        const copy = () => {

            let textCopy =
                "S:\\PM\\ter\\ets\\Inter_Setor\\COMPARTILHADO\\APRENDIZES\\DIGITAL_SOLUTIONS_"
                + formatNum(user.turma)
                + "\\"
                + answer?.compartilhado

            navigator.clipboard.writeText(textCopy)

        }
        const info: Table = {
            headers: [
                { value: "Tempo Restante" },
                { value: "Ultima alteração" },
                { value: "Compartilhado", show: false, aditional: "Compartilhado: O link no compartilhado já leva em conta a pasta Aprendizes e a sua turma, porém mesmo copiando o caminho inteiro." },
                { value: "Github", show: false, aditional: "GitHub: Verificar se o projeto contem informações sensiveis da BOSCH antes de publicar, caso houver, crie como repositorio privado e de acesso ao(s) instrutor(es)" },
                { value: "Comentario" },
            ],
            contents:
                [
                    { value: props.dataEntrega?.toLocaleString() ?? "" },
                    { value: answer?.dataAlteracao?.toDateString() ?? "" },
                    { value: answer?.compartilhado ?? "-", function: () => { copy(); }, icon: "copy", editable: true },
                    { value: answer?.github ?? "-", editable: true },
                    { value: answer?.comentario ?? "", editable: true }
                ]
        }


        return {
            copy,
            info,
            user
        }
    },
    props: {
        // answer: {} as () => Answer,
        activityId: String,
        userId: String
    },
    data() {
        return {
            values: ["a", "b", "c",],
            // values: [
            // { field: 'Tempo Restante', value: "5 dias" },
            // { field: '' }],
            columns: [{ field: "field", header: "" }, { field: "value", header: "" }],
            _info: {} as Table,
            edit: false
        }
    },
    components: {
        DataTable,
        Column,
        ColumnGroup,
        Row,
        CustomTable,
    },
    methods: {
        returnInfo() {
            if (this.$refs.customTable) {
                this._info = this.$refs.customTable.returnInfo()
                console.log("--");
                console.log(this._info);
            }
        },
        runReturnInfo() {
            if (this.$refs.customTable) {
                this.edit = false
                this.$refs.customTable.triggerReturnInfo()
            }
        },
        cancelChanges() {
            if (this.$refs.customTable) {
                this.$refs.customTable.cancelChanges()
            }
        },
        runCancelChanges() {
            if (this.$refs.customTable) {
                this.edit = false
                console.log(this.edit);
                this.$refs.customTable.triggerCancelChanges()
            }
        }
    },
    mounted() {



    },
}
</script>

<template>
    <!-- {{ answer }} -->
    <div class=" w-full flex items-center justify-between">

        <h1 class="text-xl font-semibold">Sua Resposta</h1>
        <button :onclick="() => { edit = !edit }" class="bg-blue-400 p-1 rounded-md w-14"> Editar</button>
    </div>
    <CustomTable @return-info="returnInfo" @cancel-changes="cancelChanges" :info="this.info" :edit="edit"
        ref="customTable" />

    <div v-if="edit" class="flex justify-end">
        <button :onclick="() => runCancelChanges()" class="bg-red-400 w-16 p-1 rounded-lg mr-2">cancelar</button>
        <button :onclick="() => runReturnInfo()" class="bg-green-400 w-16 p-1 rounded-lg">salvar</button>
    </div>
    <!-- <DataTable :value="this.values" :showGridlines="true" tableStyle="" -->
</template>