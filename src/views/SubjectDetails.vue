<script lang="ts">
import { ref, watchEffect } from 'vue';
import SubjectCard from '../components/SubjectCard.vue';
import { Activity, Subject } from '../components/type';
import { useRoute } from 'vue-router'


export default {
    setup() {
        const route = useRoute()
        const subjectId = route.params.id
        const subject =
            {
                id: 0,
                name: "default",
                professor: "default",
                border: "000",
                color: "000"
            } as Subject
        const activities = {

        } as Activity
        const buscarAPI = () => {
            console.log(route.params.id)

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
    components: { SubjectCard },
    methods: {
        getSubject() {

        }
    },
    watch: {

    },
}

</script>

<template>
    {{ subjectId }}
    <div class="mt-10 content-end flex flex-col justify-center w-full px-14">

        <h1 class="flex justify-between items-center mb-5 text-4xl font-semibold text-end">
            
            <SubjectCard :subject="subject"></SubjectCard>
            Atividades
        </h1>
        <div
            class="sm:min-h-[6rem] p-2 gap-2 items-center justify-center flex-row drop-shadow-md min-w-[272px] flex w-full mb-0 bg-white">
            <!-- <div class="flex h-fit flex-row w-full items-center justify-between"> -->
            <div class="h-0.5 md:block hidden w-full rounded-full bg-gray-300"></div>
            <div class="sm:min-h-[6rem] p-2 gap-2 items-center justify-center flex flex-wrap md:flex-nowrap flex-row">
                <input placeholder="order by" class="border p-2 h-8 rounded-md" type="text">
                <input placeholder="order by" class="border mx-5 p-2 h-8 rounded-md" type="text">
                <input placeholder="search" class="border p-2 h-8 rounded-full" type="text">
            </div>
            <!-- </div> -->
        </div>
        <div class="h-full flex-wrap justify-evenly min-w-[272px] flex w-full mb-0 bg-white">
            <div v-for="(activity, index) in activities">
                <div :key=index class="p-4">
                    <!-- <ActivityCard :activity="activity" /> -->
                </div>
            </div>
        </div>
    </div>
</template>