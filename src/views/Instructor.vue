<script lang="ts">
import GaeAPI from '../apis/gaeAPI'
import { Activity, Answer, Field, Subject, User } from '../components/type'
import { Icon } from "@iconify/vue"
import Dialog from 'primevue/dialog';
import FormGenerator from '../components/FormGenerator.vue'
import Dropdown from 'primevue/dropdown';
import ColorPicker from 'primevue/colorpicker';

export default {
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
            turmas: [] as Number[],
            professores: [] as User[],
            addActivityModal: false,
            addSubjectModal: false,
            val: 0,
            subjectNewColor: 'ff0000',
            fields: [
                {
                    name: "titulo",
                    required: true,
                    value: ""
                },
                {
                    name: "descricao",
                    required: true,
                    value: ""
                },
                {
                    name: "dataCriacao",
                    required: true,
                    type: "datetime-local",
                },
                {
                    name: "dataEntrega",
                    required: true,
                    type: "datetime-local",
                    specificValidator: (a) => {
                        if (a) {
                            console.log(a);

                        }
                    }
                }
            ] as Field[]
        }
    },
    methods: {
        getFieldValueByName(name: string) {
            for (let index = 0; index < this.fields.length; index++) {
                const element = this.fields[index];
                if (element.name == name) {
                    return element.value
                }
            }
        },
        alterarMaterias(turma: number) {
            /*
            api pegando e setando as infos
            */
            GaeAPI.get(`/materias/turmas/${turma}`, { headers: { Authorization: this.$cookies.get("USER_TOKEN") } })
                .then(res => this.materias = res.data.content)
            GaeAPI.get(`/turmas/${turma}`, { headers: { Authorization: this.$cookies.get("USER_TOKEN") } })
                .then(res => { this.students = res.data.content; console.log("AAAAAAAAASDCZX");
                 console.log(res.data.content);
                 })
        },
        alterarAtividades(materia: Subject) {
            /*
            api pegando e setando as infos
            */
            if (materia.id == null) {
                this.atividades = []
                return
            }
            GaeAPI.get(`/atividades/turmas/${this.selectedClass}`, { headers: { Authorization: this.$cookies.get("USER_TOKEN") } })
                .then(res => this.atividades = res.data.content.filter(activity => activity.idMateria == materia.id)
                )


            // this.atividades = listaAuxiliar.filter(activity => activity.idMateria == materia.id)


        },
        alterarAlunosAtividades(atividade: Activity) {
            /*
            api pegando e setando as infos
            */
            if (atividade.id == null) {
                this.answers = [] as Answer[]
                return
            }
            // GaeAPI.get(`respostas/atividades/${this.selectedActivity.id}`,{headers:{Authorization:this.$cookies.get("USER_TOKEN")}})
            GaeAPI.get(`respostas/atividades/${this.selectedActivity.id}`, { headers: { Authorization: this.$cookies.get("USER_TOKEN") } })
                .then(res => {
                    this.answers = res.data.content; console.log(res.data.content);
                })


        },
        isInAnswers(student: User) {
            // Check if the student is in the answers list
            return this.answers.some((answer: Answer) => answer.idUsuario == student.id);
        },
        isIdInList(estudante: User) {
            return this.listaIds.some((item: Answer) => item.idUsuario === estudante.id);
        },
        createSubject() {
            GaeAPI.post('/materias', {
                nome: this.val,
                cor: this.subjectNewColor
            },
                { headers: { Authorization: this.$cookies.get('USER_TOKEN') } })
                .then(res => {
                    this.addSubjectModal = false
                    this.materias.push(res.data)
                    this.selectedSubject = res.data
                })
        },
        createActivity(){
            GaeAPI.post('/atividades',{
                "idMateria": this.selectedSubject.id,
                "turma": this.selectedClass,
                "titulo": this.getFieldValueByName('titulo'),
                "descricao": this.getFieldValueByName('descricao'),
                "dataEntrega": this.getFieldValueByName('dataEntrega')
            },
            { headers: { Authorization: this.$cookies.get('USER_TOKEN') } })
            .then(res =>{
                this.addActivityModal = false
                alert("Atividade criada com sucesso!")
                this.atividades.push(res.data)
                this.selectedActivity = res.data
            }

            )
        }
    },
    watch: {
        selectedClass(newC, oldC) {
            this.selectedSubject = {} as Subject
            this.hoverButton = ''
            this.alterarMaterias(newC)
        },
        selectedSubject(newS) {
            this.selectedActivity = {} as Activity
            if (newS.code) {
                this.selectedSubject = newS.code
                return
            }
            this.alterarAtividades(newS)
        },
        selectedActivity(newA) {
            this.alterarAlunosAtividades(newA)
        },
        val(v) {
            console.log('.');

            console.log(v)
            v = v.code
        }
    },
    components: {
        Icon, Dialog, FormGenerator, Dropdown, ColorPicker
    },
    computed: {
        estudanteResposta(): { student: User, answer: Answer }[] {
            console.log("chamou");

            return this.students.map((student: User) => {
                let answer = this.answers.find((item: Answer) => item.idUsuario == student.id)
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
                let answer = !this.answers.find((item: Answer) => item.idUsuario == student.id)
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
                if (this.answers.some((item: Answer) => item.idUsuario == student.id)) {

                }
            })

            // Sort the students based on whether they are in the answers list


        },
        closeCallback() {

        }
    },
    created() {
        GaeAPI.get("/turmas", { headers: { Authorization: this.$cookies.get("USER_TOKEN") } })
            .then(res => this.turmas = res.data.content
                .map(item => item.turma)
                .sort((a, b) => { return a - b })
            )
    },
}

</script>

<template>
    <Dialog v-model:visible="addActivityModal" modal header="Cadastrar Atividade" :pt="{
        root: { class: ' bg-white border rounded-lg' },
        body: { class: ' bg-white rounded-none' },
        footer: { class: ' bg-white rounded-none' },
        content: { class: ' bg-white rounded-none' },
        header: { class: 'ml-2' },
        mask: {
            style: 'backdrop-filter: blur(2px)'
        }
    }">
        <!-- #container="{ this.closeCallback }" -->
        <div class="flex flex-col bg-white rounded-none w-96  px-8 py-5 gap-4 ">
            <div>
                <h3>

                    Turma
                </h3>
                <select class="max-w-[7rem] min-w-[7rem] w-full border p-1 rounded focus:outline-none"
                    v-model="selectedClass">
                    <option disabled :value="0">Selecione</option>
                    <option v-for="i in turmas" :value="i">{{ i }}</option>
                </select>
            </div>
            <div>
                <div class="w-full flex">

                    <h3>
                        Materias
                    </h3>
                    <button :onclick="() => addSubjectModal = true"
                        :style="{ backgroundColor: selectedClass == 0 ? 'rgb(74 222 128)' : '' }"
                        :disabled="selectedClass == 0"
                        class="ml-2 w-6 h-6 flex items-center justify-center bg-green-600 rounded-full">
                        <div :style="{ backgroundColor: selectedClass == 0 ? 'rgb(170 240 240)' : '' }"
                            class="absolute w-3 h-0.5 rounded-full bg-white"></div>
                        <div :style="{ backgroundColor: selectedClass == 0 ? 'rgb(170 240 240)' : '' }"
                            class="absolute h-3 w-0.5 rounded-full bg-white"></div>
                    </button>
                </div>
                <select :disabled="selectedClass == 0"
                    class="max-w-[10rem] min-w-[10rem]  w-full border p-1 rounded focus:outline-none"
                    v-model="selectedSubject">
                    <option disabled :value="{}">Selecione</option>
                    <option v-for="materia in materias" :value="materia">{{ materia.nome }}</option>
                </select>
            </div>
            <FormGenerator :action="createActivity" :fields="fields"></FormGenerator>
            
        </div>
    </Dialog>
    <Dialog v-model:visible="addSubjectModal" modal header=" Cadastrar Materia" :pt="{
        root: { class: ' bg-white border rounded-lg' },
        body: { class: ' bg-white rounded-none' },
        footer: { class: ' bg-white rounded-none' },
        content: { class: ' bg-white rounded-none' },
        header: { class: 'ml-2' },
        mask: {
            style: 'backdrop-filter: blur(2px)'
        }
    }">
        <!-- #container="{ this.closeCallback }" -->
        <div class="flex flex-col bg-white rounded-none w-full  items-center px-8 py-5 gap-4 ">
            <div class="flex justify-between items-center gap-2 w-full">
                <h2>
                    Materia
                </h2>
                <!-- v-model="selectedSubject"  -->
                <!-- :options="[
                    {name: 'subject', code: {a:'subject'} },
                    {name: 'subject1', code: 'subject1'},
                    {name: 'subject2', code: 'subject2'},
                    ]"  -->
                <Dropdown editable v-model="val"
                    :options="materias.map(subject => { return { name: subject.nome, code: subject.id } })" optionLabel="name"
                    placeholder="Select a City" class="w-full md:w-14rem" :pt="{
                        root: { class: 'w-full md:w-14rem border rounded pr-3' },
                        item: ({ props, state, context }) => ({
                            class: context.focused || context.selected ? 'bg-gray-300 border border-black p-1' : 'bg-white'
                        })
                    }" />


                <!-- class: context.selected ? 'bg-gray-100' : context.focused ? 'bg-blue-100' : 'bg-white' -->
                <!-- <select :disabled="selectedClass == 0"
                    class="max-w-[10rem] min-w-[10rem] h-min  w-full border p-2 rounded focus:outline-none"
                    v-model="selectedSubject">
                    <option disabled :value="{}">Selecione</option>
                    <option v-for="materia in materias" :value="materia">{{ materia.nome }}</option>
                </select> -->
            </div>
            <div class="flex justify-between items-center gap-2 w-full">
                <h2>
                    Cor
                </h2>
                <!-- v-model="selectedSubject"  -->
                <!-- :options="[
                    {name: 'subject', code: {a:'subject'} },
                    {name: 'subject1', code: 'subject1'},
                    {name: 'subject2', code: 'subject2'},
                    ]"  -->
                    <div>

                    
                    <div class="mt-1 absolute select-none text-gray-400">
                        <ColorPicker class="" v-model="subjectNewColor" inputId="cp-hex" format="hex" :pt="{
                            root: ({ props }) => ({
                                class: [
                                    'inline-block pl-2',
                                    {
                                        'opacity-60 select-none cursor-default': props.disabled
                                    }
                                ]
                            }),
                            input: {
                                class: [
                                    'm-0',
                                    'font-sans text-base text-gray-600 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 rounded-lg cursor-pointer',
                                    'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
                                    'w-8 h-8'
                                ]
                            },
                            panel: ({ props }) => ({
                                class: [
                                    'shadow-md',
                                    'bg-gray-800 border-gray-900',
                                    {
                                        'relative h-48 w-52': props.inline,
                                        'absolute h-48 w-52': !props.inline
                                    }
                                ]
                            }),
                            selector: 'absolute h-44 w-40 top-2 left-2',
                            color: {
                                class: 'h-44 w-40',
                                style: 'background: linear-gradient(to top, #000 0%, rgb(0 0 0 / 0) 100%), linear-gradient(to right, #fff 0%, rgb(255 255 255 / 0) 100%)'
                            },
                            colorhandle: {
                                class: ['rounded-full border border-solid cursor-pointer h-3 w-3 absolute  opacity-85', 'border-white']
                            },
                            hue: {
                                class: ['h-44 w-6 absolute top-2 left-44 opacity-85'],
                                style: 'background: linear-gradient(0deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red)'
                            },
                            huehandle: 'border-solid border-2 cursor-pointer h-2 w-8 left-0 -ml-1 -mt-1 opacity-85 absolute',
                            transition: {
                                overlay: {
                                    enterFromClass: 'opacity-0 scale-75',
                                    enterActiveClass: 'transition-transform transition-opacity duration-150 ease-in',
                                    leaveActiveClass: 'transition-opacity duration-150 ease-linear',
                                    leaveToClass: 'opacity-0'
                                }
                            }.overlay
                        }" />

                        #

                    </div>
                    <!-- <CustomInput :field="{value:color}"></CustomInput> -->
                    <input 
                        class="border flex w-full p-2 h-10 pl-14 py-2 rounded-md focus:outline-none focus:border-black"
                        type="text" v-model="subjectNewColor">
                    </div>
            </div>
            <button :disabled='!(typeof (val) != typeof ({})) || !val' :onclick="createSubject"
                class="p-1 rounded bg-green-500 text-white w-min"
                :style="{ backgroundColor: (!(typeof (val) != typeof ({})) || !val) ? 'rgb(134, 239, 172)' : '' }">Cadastrar</button>
        </div>
    </Dialog>

    <div class="content-end flex flex-col justify-center w-[75rem] px-14">
        <h1 class="text-4xl mt-7 mb-12 font-semibold text-end">
            Área do Instutor
        </h1>
        <div
            class="gap-2 items-center p-4 flex-col justify-around sm:flex-row drop-shadow-md min-w-[272px] flex w-full mb-0 bg-white">
            <div class="flex flex-row items-center gap-2 sm:flex-col sm:items-start">
                <h2>
                    Turma
                </h2>
                <select class="max-w-[7rem] min-w-[7rem]  w-full border p-2 rounded focus:outline-none"
                    v-model="selectedClass">
                    <option disabled :value="0">Selecione</option>
                    <option v-for="i in turmas" :value="i">{{ i }}</option>
                </select>
            </div>
            <div class="flex flex-row items-center gap-2 sm:flex-col sm:items-start"
                :style="{ color: selectedClass == 0 ? 'gray' : 'black' }">
                <div class="flex justify-between w-full">
                    <h2>
                        Materia
                    </h2>


                </div>
                <select :disabled="selectedClass == 0"
                    class="max-w-[10rem] min-w-[10rem]  w-full border p-2 rounded focus:outline-none"
                    v-model="selectedSubject">
                    <option disabled :value="{}">Selecione</option>
                    <option v-for="materia in materias" :value="materia">{{ materia.nome }}</option>
                </select>
            </div>
            <div class="flex flex-row items-center gap-2 sm:flex-col sm:items-start"
                :style="{ color: selectedSubject.id == null ? 'gray' : 'black' }">
                <div class="flex justify-between w-full">
                    <h2>
                        Atividade
                    </h2>

                    <!-- <button @click="() => addActivityModal = true"
                        :style="{ backgroundColor: selectedSubject.id == null ? 'rgb(74 222 128)' : '' }"
                        :disabled="selectedSubject.id == null"
                        class="ml-2 w-7 flex items-center justify-center bg-green-600 rounded-full">
                        <div :style="{ backgroundColor: selectedSubject.id == null ? 'rgb(170 240 240)' : '' }"
                            class="absolute w-3 h-0.5 rounded-full bg-white"></div>
                        <div :style="{ backgroundColor: selectedSubject.id == null ? 'rgb(170 240 240)' : '' }"
                            class="absolute h-3 w-0.5 rounded-full bg-white"></div>
                    </button> -->
                    <button @click="() => addActivityModal = true"
                        :style="{ backgroundColor: selectedClass == 0 ? 'rgb(74 222 128)' : '' }"
                        :disabled="selectedClass == 0"
                        class="ml-2 w-7 flex items-center justify-center bg-green-600 rounded-full">
                        <div :style="{ backgroundColor: selectedClass == 0 ? 'rgb(170 240 240)' : '' }"
                            class="absolute w-3 h-0.5 rounded-full bg-white"></div>
                        <div :style="{ backgroundColor: selectedClass == 0 ? 'rgb(170 240 240)' : '' }"
                            class="absolute h-3 w-0.5 rounded-full bg-white"></div>
                    </button>
                </div>
                <select :disabled="selectedSubject.id == null ? true : false"
                    class="max-w-[10rem] min-w-[10rem] w-full border p-2 rounded focus:outline-none"
                    v-model="selectedActivity">
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
            <button :onclick="() => hideDetails = !hideDetails"
                class="w-full items-center p-2 flex justify-between rounded hover:bg-slate-200">
                <h2 class="font-semibold">
                    Detalhes Atividade
                </h2>
                <div v-if="hideDetails"
                    class="border-b-8 border-b-black border-r-8 border-r-transparent border-l-8 border-l-transparent w-0 h-0">
                </div>
                <div v-else
                    class="border-t-8 border-t-black border-r-8 border-r-transparent border-l-8 border-l-transparent w-0 h-0">
                </div>
            </button>
            <div class="w-full p-2" v-if="!hideDetails">
                <h3 class="flex">
                    <h3 class="font-semibold pr-2">Nome: </h3>{{ selectedActivity.titulo }}
                </h3>
                <h3 class="flex">
                    <h3 class="font-semibold pr-2">Criado por: </h3>{{ professores.find(p => p.edv ==
                        this.selectedActivity.idUsuario)?.nome }}
                </h3>
                <h3 class="flex">
                    <h3 class="font-semibold pr-2">Data de Inicio: </h3>{{ selectedActivity?.dataCriacao?.toLocaleString()
                    }}
                </h3>
                <h3 class="flex">
                    <h3 class="font-semibold pr-2">Data de Entrega: </h3>{{ selectedActivity?.dataEntrega?.toLocaleString()
                    }}
                </h3>
                <button class="bg-red-500 p-1 rounded text-white">Excluir</button>
            </div>

        </div>
        <div class="gap-2 items-center p-4 flex-col min-w-[272px] justify-start h-full flex w-full mb-0 bg-white">
            <div v-if="selectedActivity.id != null" class="h-full w-full">
                <h2 class="w-full p-2 pl-0">Entregues</h2>
                <div v-for="studentAnswer in estudanteResposta" class="w-full">
                    <div class="border w-full border-l-4 border-l-green-500 p-4">
                        <div class="flex ">
                            <router-link :to="'/instructor/' + selectedActivity.id + '/' + studentAnswer.student.edv"
                                class="flex flex-col items-center mr-2 rounded px-2 hover:bg-slate-200">
                                <Icon :color="`#${studentAnswer?.student?.cor ?? '000000'}`" height="50" width="50"
                                    icon="ph:user-circle-duotone" />
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
                                    {{ studentAnswer?.answer.dataEntrega?.toLocaleString() }}
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