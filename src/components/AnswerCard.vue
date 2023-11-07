<script lang="ts">
import CustomTable from './CustomTable.vue';
import { Answer } from './type';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Table, User } from './type';

export default {
    setup(props, ctx) {
        // retorno da api.then setar variavel 
        // console.log();
        
        const user:User = {
            edv:"12312312",
            name:"Gustavinho",
            color:"27AAAF",
            class: 5,
        }
        
        
        let formatNum = (num: number) =>{
            return num.toString().length == 1 ? "0"+ num.toString() : num.toString()
        }
        const copy = () => {

            let textCopy = 
            "S:\\PM\\ter\\ets\\Inter_Setor\\COMPARTILHADO\\APRENDIZES\\DIGITAL_SOLUTIONS_" 
            + formatNum(user.class) 
            + "\\"
            + props.answer?.compartilhadoLink
            
            navigator.clipboard.writeText(textCopy)
            
        }
        const info:Table = {
            headers: [
                { value: "Tempo Restante" },
                { value: "Ultima alteração" },
                { value: "Compartilhado",show:false, aditional: "Compartilhado: O link no compartilhado já leva em conta a pasta Aprendizes e a sua turma, porém mesmo copiando o caminho inteiro." },
                { value: "Github",show:false, aditional: "GitHub: Verificar se o projeto contem informações sensiveis da BOSCH antes de publicar, caso houver, crie como repositorio privado e de acesso ao(s) instrutor(es)" },
                { value: "Comentario" },
            ],
            contents:
            [
                { value: props.dueDate?.toLocaleString()?? "" },
                { value: props.answer?.lastChangeDate?.toDateString()?? "" },
                { value: props.answer?.compartilhadoLink?? "-", function: () => { copy(); }, icon: "copy" },
                { value: "https://github.com/Honkato/Delivery" },
                { value: props.answer?.commit?? ""}
            ]
        }


        return {
            copy,
            info,
            user
        }
    },
    props: {
        answer: {} as () => Answer,
        dueDate: Date
    },
    data() {
        return {

            values: ["a", "b", "c",],
            // values: [
            // { field: 'Tempo Restante', value: "5 dias" },
            // { field: '' }],
            columns: [{ field: "field", header: "" }, { field: "value", header: "" }],

        }
    },
    components: {
        DataTable,
        Column,
        ColumnGroup,
        Row,
        CustomTable,
    },
    methods: {

    }
}
</script>

<template>
    <!-- {{ answer }} -->
    <CustomTable :info="this.info" />
    <!-- <DataTable :value="this.values" :showGridlines="true" tableStyle="" -->
    <!-- <DataTable :value="this.values" tableStyle=""
    :pt="{
        root: ({ props }) => ({
            class: [
                'relative',
                {
                    'flex flex-col h-full': props.scrollable && props.scrollHeight === 'flex'
                }
            ]
        }),
        loadingoverlay: {
            class: [
                'fixed w-full h-full t-0 l-0 bg-gray-100/40',
                'transition duration-200',
                'absolute flex items-center justify-center z-2',
                'dark:bg-gray-950/40' // Dark Mode
            ]
        },
        loadingicon: 'w-8 h-8',
        wrapper: ({ props }) => ({
            class: [
                {
                    relative: props.scrollable,
                    'flex flex-col grow h-full': props.scrollable && props.scrollHeight === 'flex'
                }
            ]
        }),
        header: ({ props }) => ({
            class: [
                'bg-slate-50 text-slate-700 border-gray-300 font-bold p-4',
                'dark:border-blue-900/40 dark:text-white/80 dark:bg-gray-900', // Dark Mode
                props.showGridlines ? 'border-x border-t border-b-0' : 'border-y border-x-0'
            ]
        }),
        table: 'w-full border-spacing-0',
        thead: ({ context }) => ({
            class: [
                {
                    // 'bg-slate-50 top-0 z-[1]': context.scrollable
                }
            ]
        }),
        tbody: ({ instance, context }) => ({
            class: [
                {
                    // 'sticky z-[1]': instance.frozenRow && context.scrollable
                }
            ]
        }),
        tfoot: ({ context }) => ({
            class: [
                {
                    // 'bg-slate-50 bottom-0 z-[1]': context.scrollable
                }
            ]
        }),
        footer: {
            class: [
                'bg-slate-50 text-slate-700 border-t-0 border-b border-x-0 border-gray-300 font-bold p-4',
                'dark:border-blue-900/40 dark:text-white/80 dark:bg-gray-900' // Dark Mode
            ]
        },
        column: {
            headercell: ({ context, props }) => ({
                class: [
                    // 'text-left border-0 border-b border-solid border-gray-300 dark:border-blue-900/40 font-bold',
                    // 'transition duration-200',
                    // context?.size === 'small' ? 'p-2' : context?.size === 'large' ? 'p-5' : 'p-4', // Size
                    // context.sorted ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-700', // Sort
                    // context.sorted ? 'dark:text-white/80 dark:bg-blue-300' : 'dark:text-white/80 dark:bg-gray-900', // Dark Mode
                    // {
                    //     'sticky z-[1]': props.frozen || props.frozen === '', // Frozen Columns
                    //     'border-x border-y': context?.showGridlines,
                    //     'overflow-hidden space-nowrap border-y relative bg-clip-padding': context.resizable // Resizable
                    // }
                ]
            }),
            headercontent: 'flex items-center',
            bodycell: ({ props, context }) => ({
                class: [
                    'bg-gray-200',
                    'text-left border-2 border-solid border-white',
                    context?.size === 'small' ? 'p-2' : context?.size === 'large' ? 'p-5' : 'p-4', // Size
                    'dark:text-white/80 dark:border-blue-900/40', // Dark Mode
                    
                ]
            }),
            footercell: ({ context }) => ({
                class: [
                    'text-left border-0 border-b border-solid border-gray-300 font-bold',
                    'bg-slate-50 text-slate-700',
                    'transition duration-200',
                    context?.size === 'small' ? 'p-2' : context?.size === 'large' ? 'p-5' : 'p-4', // Size
                    'dark:text-white/80 dark:bg-gray-900 dark:border-blue-900/40', // Dark Mode
                    {
                        'border-x border-y': context?.showGridlines
                    }
                ]
            }),
            sorticon: ({ context }) => ({
                class: ['ml-2', context.sorted ? 'text-blue-700 dark:text-white/80' : 'text-slate-700 dark:text-white/70']
            }),
            sortbadge: {
                class: [
                    'flex items-center justify-center align-middle',
                    'rounded-[50%] w-[1.143rem] leading-[1.143rem] ml-2',
                    'text-blue-700 bg-blue-50',
                    'dark:text-white/80 dark:bg-blue-400' // Dark Mode
                ]
            },
            columnfilter: 'inline-flex items-center ml-auto',
        }
    }"
     >
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
    </DataTable> -->
</template>