<script lang="ts">
    import { Table } from './type';
    import { faUserSecret, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
    props: {
        info: {} as ()=> Table,
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
            if (this.info.headers[index].show){
                this.info.headers[index].show = false
            }else{
                this.info.headers[index].show = true
            }
            console.log(this.info.headers[index].show);
        },
        leave(e: MouseEvent, index){
            console.log("saiu" + index);
            
        }
    },
    mounted() {
        // const that = this
        this.showDiv = true

        this.$nextTick(function () {
            this.getWindowHeight()
        });
    },
    components:{
        FontAwesomeIcon
    }

}

</script>

<template>
    <!-- <div class="flex flex-row w-full bg-[#D9D9D9] rounded-xl"> -->        
    <div class="flex flex-row w-full overflow-x-scroll bg-[#D9D9D9] rounded-xl">
        <div class="flex flex-col" ref="todo">
            <div class="p-2 flex-nowrap flex border-r-[3px] border-white" :ref="`h${index}`" :style="style(index)"
                :key="index" v-for="(header, index) in (this.info.headers )">
                <h1 class="flex-none w-full justify-between flex truncate max-w-[4rem] sm:max-w-[20rem] md:max-w-[48rem]">
                    <p class="truncate">
                        {{ header.value }}&nbsp;        
                    </p>
                    <p @:mouseleave="showHide($event, index )" @:mouseenter="showHide($event, index )" v-if="header.aditional">
                        <font-awesome-icon icon="circle-question" /><h1 v-if="header.show" class="absolute whitespace-break-spaces break-words max-w-full bg-white p-1 border border-black rounded-md">{{ header.aditional }}</h1>
                    </p>
                </h1>
            </div>
            <!-- <p class="border-black border-b" :key="index" v-for="(header, index) in headers">{{ header }}{{ index }}</p> -->
        </div>
        <div class="flex flex-col w-full">
            <p class="p-2 w-full  border-white flex flex-none truncate" :style="style(index)" :ref="`v${index}`" v-for="(header, index) in this.info.headers">
                {{  this.info.contents[index] == null || this.info.contents[index].trim() == "" ? "-" : this.info.contents[index]}}</p>
        </div>
    </div>
</template>