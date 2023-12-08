<script lang="ts">
import { ref, watchEffect } from 'vue';
import SubjectCard from '../components/SubjectCard.vue';
import { Activity, Subject } from '../components/type';
import { useRoute } from 'vue-router'
import ActivityCard from '../components/ActivityCard.vue';

export default {
    setup() {
        const route = useRoute()
        const subjectId = route.params.subjectId
        
        const subject =
            {
                id: 0,
                nome: "default",
                cor: "000",
                border: "000"
            } as Subject
        const activities = [
            {
                id: 0,
                cor:"ff0000",
                titulo: "Cubo Magico Jogo da Velha",
                descricao: "<div>exemplo</div>",
                // usuario_id:"Gus Tavo",
                usuario_id:"92900290",
                data_criacao: (new Date),
                data_entrega: (new Date)
            },
            {
                id: 1,
                titulo: "API SpringBoot",
                cor:"00ff00",
                descricao: "<div>exemplo</div>",
                usuario_id:"92900290",
                data_criacao: (new Date),
                // professor:"Li Via",
            },
            {
                id: 2,
                titulo: "Projeto Livre",
                cor:"0000ff",
                descricao: "<div>exemplo</div>",
                usuario_id:"92900290",
                data_criacao: (new Date),
                // usuario_id:"Leo Nardo",
            },
            {
                id: 3,
                titulo: "Banco de dados",
                cor:"00ff00",
                descricao: "<div>exemplo</div>",
                usuario_id:"92900290",
                data_criacao: (new Date),
                // professor:"Fran Cis",
            },
        ] as Activity[]
        const buscarAPI = () => {
            // console.log(route.params.id)

        }
        buscarAPI()

        return {
            subjectId,
            subject,
            activities,
        }
    },
    data() {
        return {

        };
    },
    components: { SubjectCard, ActivityCard },
    methods: {
        getSubject() {

        }
    },
    watch: {

    },
}

</script>

<template>
    <div class="content-end flex flex-col justify-center w-[75rem] px-14">
        <h1 
        class="flex flex-col-reverse sm:flex-row justify-between items-center mb-5 text-4xl font-semibold text-end">

            <SubjectCard :subject="subject"></SubjectCard>
            Atividades
        </h1>
        <div class="sm:flex-row p-2 gap-2 items-center justify-between flex-col-reverse drop-shadow-md min-w-[280px] flex w-full mb-0 bg-white">
            <!-- <div class="flex h-fit flex-row w-full items-center justify-between"> -->
            <div class="h-20">
                <div class="flex flex-row flex-nowrap items-center"><div class="mt-1 mr-1 h-2 w-2 bg-[#0000ff]"></div>No prazo</div>
                <div class="flex flex-row flex-nowrap items-center"><div class="mt-1 mr-1 h-2 w-2 bg-[#00ff00]"></div>Concluido</div>
                <div class="flex flex-row flex-nowrap items-center"><div class="mt-1 mr-1 h-2 w-2 bg-[#ff0000]"></div>Atraso/Vencido</div>
            </div>
            <!-- <div class="h-0.5 md:block hidden w-36 rounded-full bg-gray-300"></div> -->
            <div class="sm:min-h-[6rem] p-2 gap-2 items-center justify-center flex flex-wrap lg:flex-nowrap flex-row">
                <input placeholder="order by" class="border p-2 h-8 rounded-md" type="text">
                <input placeholder="order by" class="border mx-5 p-2 h-8 rounded-md" type="text">
                <input placeholder="search" class="border p-2 h-8 rounded-full" type="text">
            </div>
            <!-- </div> -->
        </div>
        <div class="h-full flex-wrap min-w-[272px] flex flex-col w-full mb-0 bg-white">
            <div v-for="(activity, index) in activities">
                <div :key=index class="">
                    <ActivityCard :activity="activity" />
                </div>
            </div>
        </div>
    </div>
</template>