<script lang="ts">
import { useRoute } from 'vue-router';
import GaeAPI from '../apis/gaeAPI';
import CustomTable from '../components/CustomTable.vue';
import AnswerDetailCard from '../components/AnswerDetailCard.vue';
import { Answer, User } from '../components/type';


export default {
    setup(props, ctx) {
        const route = useRoute();
        const answerId = route.params.activityId;
        let student = {
            cor:"",
            edv:"",
            nome:"",
            turma:5
        } as User
        let answer = {
            id:0,
            usuario_id:"",
            compartilhado:'LIVIA_AKIMI_SEKIGAMI',
            github:'',
        } as Answer
        GaeAPI.get('/answer/' + answerId).then((res) => answer = res.data);
        GaeAPI.get('/user/' + answer.usuario_id).then((res) => student = res.data);
        return {
            answerId,
            answer,
            student
        }
    },
    components: { CustomTable, AnswerDetailCard }
}
</script>

<template>
    <!-- <AnswerDetailCard :answerId="answerId" /> -->
    <div class="content-end min-w-[392px] px-14 flex flex-col w-[75rem]">

        <div class="flex flex-row mb-5 text-4xl font-semibold text-end items-center">
            <!-- <div class="min-h-[2.5rem] max-h-[2.5rem] max-w-[2.5rem] min-w-[2.5rem] rounded-2xl mr-2"
                :style="{ backgroundColor: ` #${activity.cor}` }"></div>
            <h1 class="text-2xl py-8 font-semibold"> {{ activity.titulo }}</h1> -->
        </div>
        <div class="p-2 gap-2 justify-between flex-col drop-shadow-md flex mb-0 bg-white px-5">
            <!-- <div class="flex h-fit flex-row w-full items-center justify-between"> -->
            <h1 class="text-xl font-semibold"> Detalhes</h1>
            <div class="">
                <p>
                    <!-- Aberto: {{ formatDateToString(this.activity.data_criacao) }} -->
                    <!-- Aberto: {{ activity.data_criacao.toLocaleString() }} -->
                </p>
                <p>
                    <!-- Vencimento: {{ activity.data_entrega?.toLocaleString() ?? "-" }} -->
                </p>
            </div>

            <div class="w-full h-[2px] rounded-full bg-gray-500"></div>
            <h1 class="text-xl font-semibold"> Atividade</h1>
            <!-- <h1 class="text-xl font-semibold"> {{ activity.titulo }}</h1> -->

            <AnswerDetailCard :answer="answer" :user="student" />

            <!-- <AnswerCard :answer="answer" :.data_entrega="activity?.data_entrega" :edit="edit"/> -->

            <!-- <div class="h-0.5 md:block hidden w-36 rounded-full bg-gray-300"></div> -->

            <!-- </div> -->
        </div>
    </div>
</template>