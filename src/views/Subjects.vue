<script lang="ts">
import SubjectCard from '../components/SubjectCard.vue';
import { Subject } from '../components/type';
import isLoggedMixin from '../service/userSession';
export default {
    data() {
        return {
            subjects: [
                {
                    id: 0,
                    nome: "nome da materia",
                    cor: "000",
                    border: "a0a0a0"
                },
                {
                    id: 1,
                    nome: "UM NOME BEM GRANDE PRA UMA MATERIA BEM CHATA",
                    cor: "000",
                    border: "ffa0a0"
                },
                {
                    id: 2,
                    nome: "um nome nem tão pequeno apenas para exemplificar",
                    cor: "000",
                    border: "a0a0a0"
                },
                {
                    id: 2,
                    nome: "um nome nem tão pequeno apenas para exemplificar",
                    cor: "000",
                    border: "a0a0a0"
                },
                {
                    id: 2,
                    nome: "um nome nem tão pequeno apenas para exemplificar",
                    cor: "000",
                    border: "a0a0a0"
                },



            ] as Subject[],
            list: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,],
            user: false
        }
    },
    mixins: [
        isLoggedMixin
    ],
    components: {
        SubjectCard
    },
    created() {
        this.checkIfLogged()
            .then(response => {
                console.log(response);
                this.user = response ? response : false;

            })
            .catch(error => console.log(error));
    },

}

</script>
<template>
    <div class="content-end flex flex-col justify-center w-[75rem] px-14">
        <h1 class="text-4xl mt-7 mb-12 font-semibold text-end">
            Matérias
        </h1>

        <div class="p-2 gap-2 items-center justify-center flex-row drop-shadow-md min-w-[272px] flex w-full mb-0 bg-white">
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
            <div v-for="subject in subjects">
                <div :key=subject.id class="p-4">
                    <SubjectCard :subject="subject" />
                </div>
            </div>
        </div>
    </div>
</template>