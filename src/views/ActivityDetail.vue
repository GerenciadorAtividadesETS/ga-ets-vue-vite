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
        
        const activity:Activity = {
            id: 0,
            color: "ff0000",
            title: "Cubo Magico Jogo da Velha",
            description: "<div>exemplo</div>",
            professor: "Gus Tavo",
            createdDate: (new Date),
            dueDate: (new Date)
        };
        const buscarAPI = () => {
            // console.log(route.params.id);
        };
        buscarAPI();
        return {
            subjectId,
            activityId,
            activity,
            
        };
    },
    methods: {
        twoDigits(digit: string) {
            
            // console.log(".");
            digit = digit + "";
            // console.log(digit.length);
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
        },
        
    },
    data(){
        return{
        }
    },
    components: { AnswerCard }
}
</script>

<template>
    <div class="content-end min-w-[392px] px-14 flex flex-col w-[75rem]">

        <div 
        class="flex flex-row mb-5 text-4xl font-semibold text-end items-center">
            <div class="min-h-[2.5rem] max-h-[2.5rem] max-w-[2.5rem] min-w-[2.5rem] rounded-2xl mr-2" :style="{ backgroundColor: ` #${activity.color}` }"></div>
            <h1 class="text-2xl font-semibold"> {{ activity.title }}</h1>
        </div>
        <div
            class="p-2 gap-2 justify-between flex-col drop-shadow-md flex mb-0 bg-white px-5">
            <!-- <div class="flex h-fit flex-row w-full items-center justify-between"> -->
                <h1 class="text-xl font-semibold"> Detalhes</h1>
                <div class="">
                <p>
                    <!-- Aberto: {{ formatDateToString(this.activity.createdDate) }} -->
                    Aberto: {{ activity.createdDate.toLocaleString() }}
                </p>
                <p>
                    Vencimento: {{ activity.dueDate?.toLocaleString()?? "-"}}
                </p>
            </div>
            
            <div class="w-full h-[2px] rounded-full bg-gray-500"></div>
            <h1 class="text-xl font-semibold"> Atividade</h1>
            <!-- <h1 class="text-xl font-semibold"> {{ activity.title }}</h1> -->

            <div class="">
                {{ activity.description }}
                {{ typeof(activityId) }}
            </div>
            
                <AnswerCard :activityId='activityId.toString()' :dueDate="activity?.dueDate"/>
            
            <!-- <AnswerCard :answer="answer" :dueDate="activity?.dueDate" :edit="edit"/> -->
            
            <!-- <div class="h-0.5 md:block hidden w-36 rounded-full bg-gray-300"></div> -->

            <!-- </div> -->
        </div>
    </div>
</template>