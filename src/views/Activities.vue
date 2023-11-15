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
                name: "default",
                professor: "default",
                border: "000",
                color: "000"
            } as Subject
        const activities = [
            {
                id: 0,
                color:"ff0000",
                title: "Cubo Magico Jogo da Velha",
                description: "<div>exemplo</div>",
                professor:"Gus Tavo",
                createdDate: (new Date),
                dueDate: (new Date)
            },
            {
                id: 1,
                title: "API SpringBoot",
                color:"00ff00",
                description: "<div>exemplo</div>",
                professor:"Li Via",
                createdDate: (new Date),
            },
            {
                id: 2,
                title: "Projeto Livre",
                color:"0000ff",
                description: "<div>exemplo</div>",
                professor:"Leo Nardo",
                createdDate: (new Date),
            },
            {
                id: 3,
                title: "Banco de dados",
                color:"00ff00",
                description: "<div>exemplo</div>",
                professor:"Fran Cis",
                createdDate: (new Date),
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