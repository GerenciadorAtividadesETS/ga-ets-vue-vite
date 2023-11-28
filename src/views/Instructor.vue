<script lang="js">

export default {
    setup() {
        let turmas = [0, 3, 4, 5, 7, 10]
        return {
            turmas
        }
    },
    data() {
        return {
            selectedClass: ""
        }

    },

}
</script>

<template>
    <div class="content-end flex flex-col justify-center w-[75rem] px-14">
        <h1 class="text-4xl mt-7 mb-12 font-semibold text-end">
            Área do Instutor
        </h1>
        <div
            class="gap-2 items-center justify-center flex-col drop-shadow-md min-w-[272px] h-full flex w-full mb-0 bg-white">
            <div class="p-5 gap-2 items-center justify-center flex-col drop-shadow-md flex w-full mb-0 bg-white">
                <h2>Configurações gerais</h2>
            </div>
            <router-link class="w-fit h-fit" :to="`/instructor/subjects?q=${selectedClass}`"><div class="p-5 h-fit rounded-lg bg-slate-300 font-semibold">Gerenciar Materias</div></router-link>
            <div class="p-5 gap-2 items-center justify-center flex-col drop-shadow-md flex w-full mb-0 bg-white">
                <h2>Configurações por Turma</h2>
                <select class="bg-red-200 p-2 rounded" v-model="selectedClass">
                    <option class="" disabled value="">Selecione a Turma</option>
                    <option v-for="i in turmas" :value="i">{{ i }}</option>
                </select>
            </div>
            <h2>Selecione o que deseja fazer</h2>
            <div class="h-full flex justify-center gap-2">
                <router-link class="w-fit h-fit" :to="`/instructor/student?q=${selectedClass}`"><div class="p-5 h-fit rounded-lg bg-slate-300 font-semibold">Gerenciar Alunos</div></router-link>
                <router-link class="w-fit h-fit" :to="`/instructor/activities?q=${selectedClass}`"><div class="p-5 h-fit rounded-lg bg-slate-300 font-semibold">Gerenciar Atividades</div></router-link>
                <!-- <button class="p-5 h-fit rounded-lg bg-slate-300 font-semibold">Gerenciar Suas Atividades</button> -->
            </div>

        </div>
    </div>
</template>