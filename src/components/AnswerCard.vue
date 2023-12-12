<script lang="ts">
import CustomTable from './CustomTable.vue';
import { Activity, Answer, Table, User } from './type';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';
import axios from 'axios';
import GaeAPI from '../apis/gaeAPI'
import isLoggedMixin from '../service/userSession';

type arrayBool = { value: Boolean }

export default {


    props: {
        // answer: {} as () => Answer,
        activity: {
            // type: {} as ()=> Activity,
            required: true
        },
        user: {
            // type: {} as ()=> User,
            required: true
        },
    },
    data() {
        return {
            info: {} as Table,
            _info: {} as Table,
            edit: false,
            answer: {} as Answer,
            copy: () => { },
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
        calculateTimeDifference(date1: Date, date2: Date): { days: number, hours: number, minutes: number, seconds: number } {
            const timeDifference = Math.abs(date2.getTime() - date1.getTime());

            const seconds = Math.floor(timeDifference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            return {
                days: days,
                hours: hours % 24,
                minutes: minutes % 60,
                seconds: seconds % 60,
            };
        },
        returnInfo() {
            if (this.$refs.customTable) {
                let res = this.$refs.customTable.returnInfo().contents
                console.log(res);
                let newAnswer = {
                    idAtividade: this.activity.id,
                    compartilhado: res[2].value,
                    github: res[3].value,
                    comentario: res[4].value,
                } as Answer
                console.log(newAnswer);
                if (newAnswer.comentario?.length?? 0 < 5){
                    this.edit = true
                    alert("Coloque um caminho no compartilhado")
                }
                else if (this.answer.id) {
                    alert("essa funcionalidade ainda não foi aplicada na API")
                    // GaeAPI.put(`/respostas?id=${this.answer.id}`, newAnswer ,{
                    //     headers:{
                    //         Authorization: this.$cookies.get("USER_TOKEN")
                    //     }
                    // })
                    // .then((res)=>{
                    //     alert(res.data)
                    // })
                    // .catch(error=>{
                    //     alert(error.response.data)
                    // })
                }
                else {
                    console.log("nova");

                    GaeAPI.post('/respostas', newAnswer ,{
                        headers:{
                            Authorization: this.$cookies.get("USER_TOKEN")
                        }
                    })
                    .then((res)=>{
                        alert("Atividade enviada com sucesso!")
                    })
                    .catch(error=>{
                        alert(error.response.data)
                    })
                }
                // console.log("--");
                // console.log(this._info);
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
                // console.log(this.edit);
                this.$refs.customTable.triggerCancelChanges()
            }
        },
        dateToDatabaseDate(originalDate: Date) {
            // Extract the components of the date
            const year = originalDate.getFullYear();
            const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
            const day = originalDate.getDate().toString().padStart(2, '0');
            const hours = originalDate.getHours().toString().padStart(2, '0');
            const minutes = originalDate.getMinutes().toString().padStart(2, '0');
            const seconds = originalDate.getSeconds().toString().padStart(2, '0');

            // Create the desired format
            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        }
    },
    watch: {
        activity(activity: Activity) {
            // GaeAPI.get(`/respostas?atividade=${activity.id}`)
            GaeAPI.get(`/respostas?atividade=${activity.id}`, {
                headers: {
                    Authorization: this.$cookies.get("USER_TOKEN")
                }
            })
                .then(res => {


                    this.answer = res.data
                    // console.log(res.data);

                })
                .catch(error => {
                    if (error.response.status) {
                        this.answer = {
                            idAtividade: this.activity.id,
                            idUsuario: this.user.id,

                        } as Answer
                    }

                })
        },
        answer(answer: Answer) {
            console.log(answer);

            let formatNum = (num: number) => {
                return num.toString().length == 1 ? "0" + num.toString() : num.toString()
            }


            let activityUser = {} as User
            // GaeAPI.get(`/turmas/${this.activity.turma}`, {
            //     headers: {
            //         Authorization: this.$cookies.get('USER_TOKEN')
            //     }
            // })
            //     .then(res => {
            //         let users = res.data.content as User[]
            //         activityUser = users.find(user => user.id == answer.idUsuario) as User
            //     })
            //     .catch(error => {
            //         GaeAPI.get('/usuarios', {
            //             headers: {
            //                 Authorization: this.$cookies.get('USER_TOKEN')
            //             }
            //         })
            //             .then(resU => {
            //                 activityUser = resU.data
            //             })
            //     })
            this.copy = () => {

                let textCopy =
                    "S:\\PM\\ter\\ets\\Inter_Setor\\COMPARTILHADO\\APRENDIZES\\DIGITAL_SOLUTIONS_"
                    + formatNum(this.user.turma)
                    + "\\"
                    + answer?.compartilhado

                navigator.clipboard.writeText(textCopy)

            }
            let date: { days: 0, hours: 0, minutes: 0, seconds: 0 }
            if (answer?.dataAlteracao) {
                date = this.calculateTimeDifference((new Date(answer?.dataAlteracao)), (new Date(this.activity.dataEntrega)))
                // console.log(date);
            } else {
                date = this.calculateTimeDifference((new Date), (new Date(this.activity.dataEntrega)))

            }

            this.info = {
                headers: [
                    { value: "Tempo Restante" },
                    { value: "Ultima alteração" },
                    { value: "Compartilhado", show: false, aditional: "Compartilhado: O link no compartilhado já leva em conta a pasta Aprendizes e a sua turma, porém mesmo copiando o caminho inteiro." },
                    { value: "Github", show: false, aditional: "GitHub: Verificar se o projeto contem informações sensiveis da BOSCH antes de publicar, caso houver, crie como repositorio privado e de acesso ao(s) instrutor(es)" },
                    { value: "Comentario" },
                ],
                contents:
                    [
                        { value: date?.days + " dias " + date?.hours + " Horas " + date?.minutes + " Minutos" },
                        { value: answer?.dataAlteracao ? (new Date(answer?.dataAlteracao)).toLocaleString() : "Ainda não respondido" },
                        { value: answer?.compartilhado ?? "", function: () => { this.copy(); }, icon: "copy", editable: true },
                        { value: answer?.github ?? "", editable: true },
                        { value: answer?.comentario ?? "", editable: true }
                    ]
            } as Table

        }
    },
    // mixins: [isLoggedMixin],
    created() {
        let answer = {} as Answer
        let activity = this.activity as Activity
        // this.checkIfLogged()
        //     .then(response => {
        //         this.user = response ? response : false;

        //     })
        //     .catch(error =>{});
        // GaeAPI.get('/materias', {
        //     headers: {
        //         Authorization: this.$cookies.get('USER_TOKEN')
        //     }
        // })
        //     .then((res) => {
        //         this.getSubject(res.data.content)
        //     })
    }
}
</script>

<template>
    <!-- {{ answer }} -->
    <div class=" w-full flex items-center justify-between">

        <h1 class="text-xl font-semibold">Sua Resposta</h1>
        <button v-if="(new Date(this.activity.dataEntrega)) > (new Date)" :onclick="() => { edit = !edit }"
            class="bg-blue-400 p-1 rounded-md w-14"> Editar</button>
    </div>

    <CustomTable @return-info="returnInfo" @cancel-changes="cancelChanges" :info='this.info' :edit="edit"
        ref="customTable" />

    <div v-if="edit" class="flex justify-end">
        <button :onclick="() => runCancelChanges()" class="bg-red-400 w-16 p-1 rounded-lg mr-2">cancelar</button>
        <button :onclick="() => runReturnInfo()" class="bg-green-400 w-16 p-1 rounded-lg">salvar</button>
    </div>
    <!-- <DataTable :value="this.values" :showGridlines="true" tableStyle=""/> -->
</template>