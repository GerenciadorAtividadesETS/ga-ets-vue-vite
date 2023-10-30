<script lang="ts">
export default {
    props: {
        headers: [],
        values: [],
    },
    methods: {
        style(i: number) {
            if (i == this.headers.length - 1) {
                return "border-black border-b"
            }
            return "border-black border-b"
        }
    }

}
</script>

<template>
    <div class="flex flex-row">

        <div class="flex flex-col border border-black rounded-l-lg">
            <div class="border-b-[1px]" :style="{
                borderBottomWidth: 10,
                borderColor: `#000`,
            }" :key="index" v-for="(header, index) in headers">{{ header }}{{ index }}</div>
            <p class="border-black border-b" :key="index" v-for="(header, index) in headers">{{ header }}{{ index }}</p>
        </div>
        <div class="flex flex-col">
            <p v-for="value in values">{{ value }}</p>
        </div>
    </div>
</template>