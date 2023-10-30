<script lang="ts">
import { useRoute } from 'vue-router';
import { Activity, Answer } from '../components/type';
import AnswerCard from '../components/AnswerCard.vue';
import Divider from 'primevue/divider';


export default {
    setup() {
        const route = useRoute();
        const subjectId = route.params.subjectId;
        const activityId = route.params.activityId;
        const answer = {
            id: 0,
            lastChangeDate: (new Date),
            compartilhadoLink: "",
            github: "",
            commit: ""
        } as Answer;
        const activity = {
            id: 0,
            color: "ff0000",
            title: "Cubo Magico Jogo da Velha",
            description: "<div>exemplo</div>",
            professor: "Gus Tavo",
            createdDate: (new Date),
            dueDate: (new Date)
        } as Activity;
        const buscarAPI = () => {
            console.log(route.params.id);
        };
        buscarAPI();
        return {
            subjectId,
            activityId,
            activity,
            answer,
        };
    },
    methods: {
        twoDigits(digit: string) {
            console.log(".");
            digit = digit + "";
            console.log(digit.length);
            digit = digit.length < 2 ? "0" + digit : digit;
            return digit;
        },
        formatDateToString(date: Date) {
            let newDate = '';
            newDate += this.twoDigits(date.getDate()) + "/";
            newDate += this.twoDigits(date.getMonth()) + "/";
            newDate += this.twoDigits(date.getFullYear());
            newDate += " " + this.twoDigits(date.getHours()) + ":";
            newDate += this.twoDigits(date.getMinutes());
            return newDate;
        }
    },
    components: { AnswerCard }
}
</script>

<template>
    <div class="content-end flex flex-col w-full px-14">

        <div class="flex flex-row items-center py-4">
            <div class="h-10 w-10 rounded-2xl mr-4" :style="{ backgroundColor: ` #${activity.color}` }"></div>
            <h1 class="text-xl font-semibold"> {{ activity.title }}</h1>
        </div>
        <div
            class="p-2 gap-2 justify-between flex-col drop-shadow-md min-w-[272px] flex w-full mb-0 bg-white px-5">
            <!-- <div class="flex h-fit flex-row w-full items-center justify-between"> -->
            <div class="">
                <p>
                    Aberto: {{ formatDateToString(this.activity.createdDate) }}
                </p>
                <p>
                    Vencimento: {{ this.activity.dueDate? formatDateToString(this.activity.dueDate) : "-"}}
                </p>
            </div>
            
            <div class="w-full h-[2px] rounded-full bg-gray-500"></div>
            <div class="">
                {{ this.activity.description }}
            </div>

            <AnswerCard :answer="this.answer" />
            <!-- <div class="h-0.5 md:block hidden w-36 rounded-full bg-gray-300"></div> -->

            <!-- </div> -->
        </div>
    </div>
</template>