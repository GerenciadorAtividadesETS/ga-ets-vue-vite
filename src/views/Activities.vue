<script lang="ts">
import { ref, watchEffect } from 'vue';
import SubjectCard from '../components/SubjectCard.vue';
import { Activity, Subject, User } from '../components/type';
import { useRoute } from 'vue-router'
import ActivityCard from '../components/ActivityCard.vue';
import GaeAPI from '../apis/gaeAPI';
import isLoggedMixin from '../service/userSession';

export default {
    setup() {
        const route = useRoute()
        const subjectId = route.params.subjectId

        // const subject =
        //     {
        //         id: 0,
        //         nome: "default",
        //         cor: "000",
        //         border: "000"
        //     } as Subject
        // const activities = [
        //     {
        //         id: 0,
        //         cor:"ff0000",
        //         titulo: "Cubo Magico Jogo da Velha",
        //         descricao: "<div>exemplo</div>",
        //         // idUsuario:"Gus Tavo",
        //         idUsuario:"92900290",
        //         dataCriacao: (new Date),
        //         dataEntrega: (new Date)
        //     },
        //     {
        //         id: 1,
        //         titulo: "API SpringBoot",
        //         cor:"00ff00",
        //         descricao: "<div>exemplo</div>",
        //         idUsuario:"92900290",
        //         dataCriacao: (new Date),
        //         // professor:"Li Via",
        //     },
        //     {
        //         id: 2,
        //         titulo: "Projeto Livre",
        //         cor:"0000ff",
        //         descricao: "<div>exemplo</div>",
        //         idUsuario:"92900290",
        //         dataCriacao: (new Date),
        //         // idUsuario:"Leo Nardo",
        //     },
        //     {
        //         id: 3,
        //         titulo: "Banco de dados",
        //         cor:"00ff00",
        //         descricao: "<div>exemplo</div>",
        //         idUsuario:"92900290",
        //         dataCriacao: (new Date),
        //         // professor:"Fran Cis",
        //     },
        // ] as Activity[]
        const buscarAPI = () => {
            // console.log(route.params.id)

        }
        buscarAPI()

        return {
            subjectId,
        }
    },
    data() {
        return {
            subject: {} as Subject,
            activities: [] as Activity[],
            user: {} as User
        };
    },
    mixins:[isLoggedMixin],
    components: { SubjectCard, ActivityCard },
    methods: {
        getSubject(subjects: Subject[]) {
            this.subject = subjects.find(subject => subject.id == this.subjectId)
        },
        getActivities(activities: Activity[]){
            this.activities = activities.filter(activity => activity.idMateria == this.subjectId)
        }
    },
    created() {
        this.checkIfLogged()
            .then(response => {
                this.user = response ? response : false;

            })
            .catch(error =>{});
        GaeAPI.get('/materias', {
            headers: {
                Authorization: this.$cookies.get('USER_TOKEN')
            }
        })
            .then((res) => {
                this.getSubject(res.data.content)
            })
    },
    watch:{
        user(){
            GaeAPI.get(`atividades/turmas/${this.user.turma}`)
                    .then((resA) => {
                        this.getActivities(resA.data.content)
                    })
        }
    }
}

</script>

<template>
    <div class="content-end flex flex-col justify-center w-[75rem] px-14">
        <h1 class="flex flex-col-reverse sm:flex-row justify-between items-center mb-5 text-4xl font-semibold text-end">
            <div class="pointer-events-none">
                <SubjectCard :subject="subject"></SubjectCard>
            </div>
            Atividades
        </h1>
        <div
            class="sm:flex-row p-2 gap-2 items-center justify-between flex-col-reverse drop-shadow-md min-w-[280px] flex w-full mb-0 bg-white">
            <!-- <div class="flex h-fit flex-row w-full items-center justify-between"> -->
            <div class="h-20">
                <div class="flex flex-row flex-nowrap items-center">
                    <div class="mt-1 mr-1 h-2 w-2 bg-[#0000ff]"></div>No prazo
                </div>
                <div class="flex flex-row flex-nowrap items-center">
                    <div class="mt-1 mr-1 h-2 w-2 bg-[#00ff00]"></div>Concluido
                </div>
                <div class="flex flex-row flex-nowrap items-center">
                    <div class="mt-1 mr-1 h-2 w-2 bg-[#ff0000]"></div>Atraso/Vencido
                </div>
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
</div></template>