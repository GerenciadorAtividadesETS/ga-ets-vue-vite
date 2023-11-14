<script lang="ts">

type Item = { to: string, name?: string , disable?: boolean }
export default {
    props:{
        items: Array as ()=> Item[]
    }
}
</script>

<template>
    <h v-for="i in items" class="flex flex-row">
        <router-link v-if="i.disable == null || i.disable == false" class="h-fit w-fit text-green-600" :to="i.to">{{ i.name?? i.to.slice(1) }}</router-link>
        <h1 v-else>kkk</h1>
        <h1 class="select-none">></h1>
    </h>
</template>