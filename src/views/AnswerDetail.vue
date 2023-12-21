<script lang="ts">
import { useRoute } from 'vue-router';
import GaeAPI from '../apis/gaeAPI';
import CustomTable from '../components/CustomTable.vue';
import { Activity, Answer, User } from '../components/type';
import AnswerCard from '../components/AnswerCard.vue';

export default {
    setup(props, ctx) {
        let student = {} as User
        let answer = {} as Answer
        return {
        }
    },
    data() {
        return {
            student: {} as User,
            activity: {} as Activity,
            answer: {} as Answer,
            route: useRoute()
        }
    },
    components: { CustomTable, AnswerCard },
    created() {
        GaeAPI.get(`/respostas?atividade=${this.route.params.answerId}`, { headers: { Authorization: this.$cookies.get("USER_TOKEN") } })
            .then((res) => {
                this.answer = res.data; console.log("TESTE");
                GaeAPI.get('/atividades/' + res.data.idAtividade, { headers: { Authorization: this.$cookies.get("USER_TOKEN") } })
                    .then((resA) => this.activity = resA.data);
            });
        // GaeAPI.get('/usuarios?usuario=' + this.answer.idUsuario).then((res) => this.student = res.data);
        GaeAPI.get('/usuarios', { headers: { Authorization: this.$cookies.get("USER_TOKEN") } })
            .then((res) => this.student = res.data);



    },
}
</script>

<template>
    <div class="content-end min-w-[392px] px-14 flex flex-col w-[75rem]">
        <div class="flex flex-row mb-5 text-4xl font-semibold text-end items-center">
            <div class="min-h-[2.5rem] max-h-[2.5rem] max-w-[2.5rem] min-w-[2.5rem] rounded-2xl mr-2"
                :style="{ backgroundColor: ` #${activity.cor}` }"></div>
            <h1 class="text-2xl py-8 font-semibold"> {{ activity.titulo }}</h1>
        </div>
        <div class="p-2 gap-2 justify-between flex-col drop-shadow-md flex mb-0 bg-white px-5">
            <!-- <div class="flex h-fit flex-row w-full items-center justify-between"> -->
            <h1 class="text-xl font-semibold"> Detalhes</h1>
            <div class="">
                <p>
                    <!-- Aberto: {{ formatDateToString(this.activity.dataCriacao) }} -->
                    Aberto: {{ activity.dataCriacao?.toLocaleString() }}
                </p>
                <p>
                    Vencimento: {{ activity.dataEntrega?.toLocaleString() ?? "-" }}
                </p>
            </div>

            <div class="w-full h-[2px] rounded-full bg-gray-500"></div>
            <h1 class="text-xl font-semibold"> Atividade</h1>
            <h3 class=""> {{ activity.descricao }}</h3>
            <div v-if="student">
                <div class="border-2 rounded p-2" :style="{ borderColor: '#' + student.cor}">
                    <h3 class="flex"><h3 class="font-semibold">Nome:&nbsp; </h3><h3>{{student.nome}}</h3></h3>
                    <h3 class="flex"><h3 class="font-semibold">Turma:&nbsp; </h3><h3>{{student.turma}}</h3></h3>
                    <h3 class="flex"><h3 class="font-semibold">EDV:&nbsp; </h3><h3>{{student.edv}}</h3></h3>
                </div>
            </div>
            <AnswerCard :editable="true" :activity="activity" :user="student" />

            <!-- <AnswerCard :answer="answer" :.dataEntrega="activity?.dataEntrega" :edit="edit"/> -->

            <!-- <div class="h-0.5 md:block hidden w-36 rounded-full bg-gray-300"></div> -->

            <!-- </div> -->
        </div>
    </div>
</template>