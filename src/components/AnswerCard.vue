<script lang="ts">
import CustomTable from './CustomTable.vue';
import { Answer } from './type';


export default {
    props: {
        answer: {} as () => Answer
    },
    data() {
        return {
            headers: ["a","b","c"],
            values: ["a","b","c"]
            // columns: [{ field: "f", header: "h" }, { field: "f", header: "h" }]
        }
    },
    components: {
    CustomTable
}
}
</script>

<template>
    {{ answer }}
    <CustomTable :headers="this.headers" :values="this.values"/>
    <!-- <DataTable :value="products" tableStyle="min-width: 50rem">
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
    </DataTable> -->
</template>