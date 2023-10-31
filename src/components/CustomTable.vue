<script lang="ts">
export default {
    props: {
        headers: [],
        values: [],
    },
    data() {
        return {
            y: 0
        }
    },
    methods: {
        style(i: number) {
            var obj = {} as any
            if (i != this.headers.length - 1) {
                obj.borderBottomWidth = "3px";
            }
            return obj
        },
        getWindowHeight() {
            this.y = this.$refs.todo.clientHeight;
        }
    },
    mounted() {
        // const that = this
        this.showDiv = true
        this.$nextTick(function () {
            this.getWindowHeight()
        });
    },

}

</script>

<template>
    <!-- <div class="flex flex-row w-full bg-[#D9D9D9] rounded-xl"> -->
    <div class="flex flex-row w-full bg-[#D9D9D9] rounded-xl">
        <div class="flex flex-col" ref="todo">
            <div class="p-1 border-r-[3px] border-white" :ref="`h${index}`" :style="style(index)" :key="index"
                v-for="(header, index) in headers">
                {{ header }}
            </div>
            <!-- <p class="border-black border-b" :key="index" v-for="(header, index) in headers">{{ header }}{{ index }}</p> -->
        </div>
        <div class="flex flex-col w-full">
            <p class="p-1 w-full border-white" :style="style(index)" :ref="`v${index}`" v-for="(header, index) in headers">
                {{ this.values[index] != null ? this.values[index] : "-" }}</p>
        </div>
    </div>
    
</template>