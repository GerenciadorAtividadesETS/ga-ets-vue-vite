<script lang="ts">
import { Activity, Answer, Subject, User } from '../components/type'
import { Icon } from "@iconify/vue"

export default {

    setup() {
        let turmas = [0, 3, 4, 5, 7, 10]
        turmas = turmas.slice(1)
        let professores: User[]
        professores = [
            {
                cor: "ff0000",
                edv: "92900290",
                nome: "Gus tavo",
                turma: 0
            },
            {
                cor: "00ff00",
                edv: "92900291",
                nome: "Li Via",
                turma: 0
            },
            {
                cor: "0000ff",
                edv: "92900292",
                nome: "Nome do professor",
                turma: 0
            },
        ]
        return {
            turmas,
            professores
        }
    },
    data() {
        var selectedActivity = {} as Activity
        var selectedSubject = {} as Subject
        // selectedActivity = null
        // selectedSubject = null

        return {
            selectedClass: 0,
            selectedSubject,
            selectedActivity,
            materias: [] as Subject[],
            atividades: [] as Activity[],
            hoverButton: 'Primeiro selecione uma turma',
            students: [] as User[],
            answers: [] as Answer[],
            hideDetails: true,
        }
    },
    methods: {

        alterarMaterias(turma: number) {
            /*
            api pegando e setando as infos
            */
            if (turma % 2 == 0) {
                this.materias =
                    [
                        {
                            id: 1,
                            nome: "Banco de dados",
                            cor: "ff0000"
                        },
                        {
                            id: 2,
                            nome: "Um nome bem grande para testar o tamanho do componente",
                            cor: "00ff00"
                        },
                    ] as Subject[]
            } else {
                this.materias =
                    [
                        {
                            id: 3,
                            nome: "UX/UI",
                            cor: "ff0000"
                        },
                        {
                            id: 4,
                            nome: "Ingles",
                            cor: "00ff00"
                        },
                    ] as Subject[]
            }
        },
        alterarAtividades(materia: Subject) {
            /*
            api pegando e setando as infos
            */
            if (materia.id == null) {
                this.atividades = []
                return
            }

            if (materia.id % 2 == 0) {
                this.atividades =
                    [
                        {
                            id: 1,
                            titulo: "outro nome bem grande so para testar o limite de tamanhos",
                            cor: "000000",
                            data_criacao: (new Date),
                            data_entrega: (new Date),
                            descricao: "",
                            usuario_id: "92900290"
                        },
                        {
                            id: 2,
                            titulo: "nome",
                            cor: "000000",
                            data_criacao: (new Date),
                            data_entrega: (new Date),
                            descricao: "",
                            usuario_id: "92900290"
                        },
                    ] as Activity[]
            } else {
                this.atividades = [
                    {
                        id: 3,
                        titulo: "atividade com nome especifico",
                        cor: "000000",
                        data_criacao: (new Date),
                        data_entrega: (new Date),
                        descricao: "",
                        usuario_id: "92900291"
                    },
                    {
                        id: 4,
                        titulo: "aquela que vai demorar o semestre inteiro",
                        cor: "000000",
                        data_criacao: (new Date),
                        data_entrega: (new Date),
                        descricao: "",
                        usuario_id: "92900292"
                    },
                ] as Activity[]
            }
        },
        alterarAlunosAtividades(atividade: Activity) {
            /*
            api pegando e setando as infos
            */
            if (atividade.id == null) {
                this.students = [] as User[]
                return
            }

            if (atividade.id % 2 == 0) {
                this.students =
                    [
                        {
                            turma: this.selectedClass,
                            cor: '6a00b0',
                            edv: '92900000',
                            nome: 'Raissa Rossi'
                        },
                        {
                            turma: this.selectedClass,
                            cor: '000084',
                            edv: '92900001',
                            nome: 'Alfredo'
                        },
                        {
                            turma: this.selectedClass,
                            cor: '00ff84',
                            edv: '92900002',
                            nome: 'Jessofer'
                        },
                    ] as User[]
                this.answers =
                    [
                        {
                            id: 1,
                            data_alteracao: (new Date),
                            data_entrega: (new Date),
                            usuario_id: "92900000"
                        },
                        {
                            id: 2,
                            data_alteracao: (new Date),
                            data_entrega: (new Date),
                            usuario_id: "92900001"
                        },
                    ] as Answer[]
            } else {
                this.students = [
                    {
                        turma: this.selectedClass,
                        cor: '6a00b0',
                        edv: '92900000',
                        nome: 'Raissa Rossi'
                    },
                    {
                        turma: this.selectedClass,
                        cor: '000084',
                        edv: '92900001',
                        nome: 'Alfredo'
                    },
                    {
                        turma: this.selectedClass,
                        cor: '00ff84',
                        edv: '92900002',
                        nome: 'Jessofer'
                    },
                ] as User[]
                this.answers =
                    [
                        {
                            id: 2,
                            data_alteracao: (new Date),
                            data_entrega: (new Date),
                            usuario_id: "92900002"
                        },
                    ] as Answer[]
            }

        },
        isInAnswers(student: User) {
            // Check if the student is in the answers list
            return this.answers.some((answer: Answer) => answer.usuario_id == student.edv);
        },
        isEdvInList(estudante: User) {
            return this.listaIds.some((item: Answer) => item.usuario_id === estudante.edv);
        },
    },
    watch: {
        selectedClass(newC, oldC) {
            this.selectedSubject = {} as Subject
            this.hoverButton = ''
            this.alterarMaterias(newC)
        },
        selectedSubject(newS) {
            this.selectedActivity = {} as Activity
            this.alterarAtividades(newS)
        },
        selectedActivity(newA) {
            this.alterarAlunosAtividades(newA)
        }
    },
    components: {
        Icon
    },
    computed: {
        estudanteResposta(): { student: User, answer: Answer }[] {
            console.log("chamou");

            return this.students.map((student: User) => {
                let answer = this.answers.find((item: Answer) => item.usuario_id == student.edv)
                if (!answer) {
                    return
                }
                console.log(answer);

                return { student: student, answer: answer }
            })
                .filter(item => item)
                .sort((a, b) => { return a.student.nome.localeCompare(b.student.nome) })
        },
        estudanteSemResposta() {
            return this.students.filter((student: User) => {
                let answer = !this.answers.find((item: Answer) => item.usuario_id == student.edv)
                if (!answer) {
                    return
                }
                console.log(answer);

                return student
            })
                .filter(item => item)
                .sort((a, b) => { return a.nome.localeCompare(b.nome) })
        },
        orderedStudents() {
            // Create a copy of the students array
            this.students.map((student: User) => {
                if (this.answers.some((item: Answer) => item.usuario_id == student.edv)) {

                }
            })

            // Sort the students based on whether they are in the answers list


        },

    }
}

</script>

<template>
    <div class="content-end flex flex-col justify-center w-[75rem] px-14">
        <h1 class="text-4xl mt-7 mb-12 font-semibold text-end">
            Área do Instutor
        </h1>
        <div
            class="gap-2 items-center p-4 flex-col justify-around sm:flex-row drop-shadow-md min-w-[272px] flex w-full mb-0 bg-white">
            <div class="flex flex-row items-center gap-2 sm:flex-col sm:items-start">
                Turma
                <select class="max-w-[5rem] min-w-[5rem]  w-full border p-2 rounded focus:outline-none" v-model="selectedClass">
                    <option disabled :value="0">Selecione</option>
                    <option v-for="i in turmas" :value="i">{{ i }}</option>
                </select>
            </div>
            <div class="flex flex-row items-center gap-2 sm:flex-col sm:items-start"
                :style="{ color: selectedClass == 0 ? 'gray' : 'black' }">
                Materia
                <select :disabled="selectedClass == 0" class="max-w-[10rem] min-w-[10rem]  w-full border p-2 rounded focus:outline-none"
                    v-model="selectedSubject">
                    <option disabled :value="{}">Selecione</option>
                    <option v-for="materia in materias" :value="materia">{{ materia.nome }}</option>
                </select>
            </div>
            <div class="flex flex-row items-center gap-2 sm:flex-col sm:items-start"
                :style="{ color: selectedSubject.id == null ? 'gray' : 'black' }">
                Atividade
                <select :disabled="selectedSubject.id == null ? true : false"
                    class="max-w-[10rem] min-w-[10rem] w-full border p-2 rounded focus:outline-none" v-model="selectedActivity">
                    <option disabled :value="{}">Selecione</option>
                    <option v-for="atividade in atividades" :value="atividade">{{ atividade.titulo }}</option>
                </select>
            </div>
            <p v-tooltip.bottom="{
                value: hoverButton,
                pt: {
                    arrow: {
                        style: {
                            borderBottomColor: '#ffffff',
                        }
                    },
                    text: 'bg-white font-medium p-2 rounded-md'
                }
            }">
                <button :disabled="selectedClass ? false : true"
                    :style="selectedClass != 0 ? '' : { backgroundColor: 'rgb(229 231 235)', color: 'rgb(156 163 175)' }"
                    class="bg-gray-300 p-2 rounded-md">
                    Alunos
                </button>
            </p>
        </div>
        <div
            class=" items-center p-2 flex-col border-t justify-around drop-shadow-md min-w-[272px] flex w-full mb-0 bg-white">
            <button :onclick="()=>hideDetails = !hideDetails" class="w-full items-center p-2 flex justify-between rounded hover:bg-slate-200">
                <h2 class="font-semibold">
                    Detalhes Atividade
                </h2>
                <div v-if="hideDetails" class="border-b-8 border-b-black border-r-8 border-r-transparent border-l-8 border-l-transparent w-0 h-0"></div>
                <div v-else class="border-t-8 border-t-black border-r-8 border-r-transparent border-l-8 border-l-transparent w-0 h-0"></div>
            </button>
            <div class="w-full p-2" v-if="!hideDetails">
                <h3 class="flex">
                    <h3 class="font-semibold pr-2">Nome: </h3>{{ selectedActivity.titulo }}
                </h3>
                <h3 class="flex">
                    <h3 class="font-semibold pr-2">Criado por: </h3>{{ professores.find(p => p.edv == this.selectedActivity.usuario_id)?.nome }}
                </h3>
                <h3 class="flex">
                    <h3 class="font-semibold pr-2">Data de Inicio: </h3>{{ selectedActivity?.data_criacao?.toLocaleString() }}
                </h3>
                <h3 class="flex">
                    <h3 class="font-semibold pr-2">Data de Entrega: </h3>{{ selectedActivity?.data_entrega?.toLocaleString() }}
                </h3>
            </div>

        </div>
        <div class="gap-2 items-center p-4 flex-col min-w-[272px] justify-start h-full flex w-full mb-0 bg-white">
            <div v-if="selectedActivity.id != null" class="h-full w-full">
                <h2 class="w-full p-2 pl-0">Entregues</h2>
                <div v-for="studentAnswer in estudanteResposta" class="w-full">
                    <div class="border w-full border-l-4 border-l-green-500 p-4">
                        <div class="flex ">
                            <router-link :to="'/instructor/'+studentAnswer.answer.id" class="flex flex-col items-center mr-2 rounded px-2 hover:bg-slate-200">
                                <Icon  :color="`#${studentAnswer?.student?.cor ?? '000000'}`" 
                                height="50"
                                 width="50" icon="ph:user-circle-duotone" />
                                vizualizar
                            </router-link>
                            <div class="">
                                <p class="">
                                    {{ studentAnswer?.student?.nome }}
                                </p>
                                <p class="">
                                    {{ studentAnswer?.student?.edv }}
                                </p>
                                <p class="">
                                    {{ studentAnswer?.answer.data_entrega?.toLocaleString() }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 class="w-full p-2 pl-0">Não Entregues</h2>
                <div v-for="student in estudanteSemResposta" class="w-full">
                    <div class="border border-l-4 border-l-red-500 w-full p-4">
                        <div class="flex">
                            <div class="pl-1 ml-4 mr-6">
                                <Icon :color="`#${student?.cor ?? '000000'}`" height="50" width="50"
                                icon="ph:user-circle-duotone" />
                            </div>
                            <div class="">
                                <p class="">
                                    {{ student?.nome }}
                                </p>
                                <p class="">
                                    {{ student?.edv }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>