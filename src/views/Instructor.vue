<script lang="js">

export default {
    setup() {
        let turmas = [0, 3, 4, 5, 7, 10]
        turmas = turmas.slice(1)
        return {
            turmas
        }
    },
    data() {
        return {
            selectedClass: "",
            selectedSubject: "",
            selectedActivity: "",
            materias: [],
            atividades: []
        }
    },
    methods: {
        alterarMaterias() {
            /*chamada da API*/

        }
    },
    watch:{
        selectedClass(newC, oldC){
            if (newC % 2 == 0){
                this.materias = ["banco de dados", "aquiconcertezatem20aquiconcertezatem20aquiconcert"]
            }else{
                this.materias = ["java", "python", "jython"]
            }
        },
        selectedSubject(newS){
            if (newS.length % 2 == 0){
                this.atividades = ["Chop Suey!", "B.O.Y.B", "Lost in hollywood"]
            }else{
                this.atividades = ["Toxicity", "Rolling in the deep"]
            }
        }
    }

}

</script>

<template>
    <div class="content-end flex flex-col justify-center w-[75rem] px-14">
        <h1 class="text-4xl mt-7 mb-12 font-semibold text-end">
            Área do Instutor
        </h1>
        <div class="gap-2 items-center p-4 flex-col justify-around sm:flex-row drop-shadow-md min-w-[272px] flex w-full mb-0 bg-white">
            <div class="flex flex-row items-center gap-2 sm:flex-col sm:items-start">
                Turma
                <select class="max-w-[10rem] border p-2 rounded focus:outline-none" v-model="selectedClass">
                    <option disabled value="">Selecione</option>
                    <option v-for="i in turmas" :value="i">{{ i }}</option>
                </select>
            </div>
            <div class="flex flex-row items-center gap-2 sm:flex-col sm:items-start"
            :style="{color: selectedClass==''?'gray':'black'}">
                Materia
                <select :disabled="selectedClass==''" class="max-w-[10rem] border p-2 rounded focus:outline-none" v-model="selectedSubject">
                    <option disabled value="">Selecione</option>
                    <option v-for="i in materias" :value="i">{{ i }}</option>
                </select>
            </div>
            <div class="flex flex-row items-center gap-2 sm:flex-col sm:items-start"
            :style="{color: selectedSubject==''?'gray':'black'}">
                Atividade
                <select :disabled="selectedSubject==''" class="max-w-[10rem] border p-2 rounded focus:outline-none" v-model="selectedActivity">
                    <option disabled value="">Selecione</option>
                    <option v-for="i in atividades" :value="i">{{ i }}</option>
                </select>
            </div>
            <button class="bg-gray-300 p-2 rounded-md">Alunos</button>
        </div>
        <div class="gap-2 items-center p-4 flex-col min-w-[272px] h-full flex w-full mb-0 bg-white">
            
        </div>
    </div>
</template>