<script lang="ts">
import { useRoute } from 'vue-router';
import { User } from '../components/type';

export default {
    setup(props, ctx) {
        const route = useRoute()
        const turma = route.params.classId
        const alunos = [
            {
                edv: "92900000",
                class: 5,
                color: "",
                name: ""
            }
        ] as User[]
        return {
            turma
        }
    },
    data() {
        return {

        }
    }
}
</script>

<template>
    <div class="content-end flex flex-col justify-center w-[75rem] px-14">
        <h1 class="text-4xl mt-7 mb-12 font-semibold text-end">
            Área do Instutor
        </h1>


    </div>
</template>
