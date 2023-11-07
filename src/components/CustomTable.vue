<script lang="ts">
import { Table } from './type';
import { faUserSecret, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
    props: {
        info: {} as () => Table,
    },
    data() {
        return {
            mouseup: false,

        }
    },
    methods: {
        style(i: number) {
            var obj = {} as any
            if (i != this.info.headers.length - 1) {
                obj.borderBottomWidth = "3px";
            }
            return obj
        },
        getWindowHeight() {
            this.y = this.$refs.todo.clientHeight;
        },
        showHide(e: MouseEvent, index) {
            if (this.info.headers[index].show) {
                this.info.headers[index].show = false
            } else {
                this.info.headers[index].show = true
            }
            console.log(this.info.headers[index].show);
        },
        click(e: MouseEvent) {
            // console.log("lcicou" );

        },
        
    },
    mounted() {
        // const that = this
        this.showDiv = true

        this.$nextTick(function () {
            this.getWindowHeight()
        });
    },
    components: {
        FontAwesomeIcon
    }

}

</script>

<template>
    <!-- <div class="flex flex-row w-full bg-[#D9D9D9] rounded-xl"> -->
    <div class="flex flex-row w-full overflow-auto bg-[#D9D9D9] rounded-xl">
        <div class="flex flex-col" ref="todo">
            <div class="p-2 flex-nowrap flex border-r-[3px] border-white" :ref="`h${index}`" :style="style(index)"
                :key="index" v-for="(header, index) in (this.info.headers)">
                <h1 class="flex-none w-full justify-between flex truncate max-w-[4rem] sm:max-w-[20rem] md:max-w-[48rem]">
                    <p class="truncate">
                        {{ header.value }}&nbsp;
                    </p>
                    <p @:mouseleave="showHide($event, index)" @:mouseenter="showHide($event, index)"
                        v-if="header.aditional">
                        <font-awesome-icon icon="circle-question" />
                    <h1 v-if="header.show"
                        class="absolute whitespace-break-spaces break-words max-w-full bg-white p-1 border border-black rounded-md">
                        {{ header.aditional }}</h1>
                    </p>
                </h1>
            </div>
            <!-- <p class="border-black border-b" :key="index" v-for="(header, index) in headers">{{ header }}{{ index }}</p> -->
        </div>
        
        <div class="flex flex-col min-w-fit w-full">
            
            <p class="p-2 w-fit min-w-full border-white  flex whitespace-nowrap flex-nowrap" :style="style(index)"
                :ref="`v${index}`" v-for="(header, index) in this.info.headers">
                <h1 v-if="!this.info.contents[index]?.value || this.info.contents[index]?.value.trim() == ''">
                    -
                </h1>
                <h1 v-else-if="this.info.contents[index]?.function">
                    <font-awesome-icon class="cursor-pointer" v-on:click="()=>{this.info.contents[index]?.function()}" :icon="this.info.contents[index]?.icon??'circle-question'" />
                    {{this.info.contents[index]?.value}}
                </h1>
                <h1 v-else>
                    {{this.info.contents[index]?.value}}
                </h1>
            </p>
        </div>
    </div>
</template>