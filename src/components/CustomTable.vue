<script lang="ts">
import { Table } from './type';
import { faUserSecret, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import CustomInput from "./CustomInput.vue"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
    props: {
        info: {} as () => Table,
        edit: Boolean
    },
    data() {
        return {
            mouseup: false,
            _info: this.info
            fazer uma função pra retornar ao pai o _info
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
        showHide(e: MouseEvent, index: number) {
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
        chage(e: InputEvent, index: number) {
            this.info.contents[index].value
        },
        printAll() {
            console.log('.');
            console.log(this._info);
            console.log('.');
        }


    },
    mounted() {
        // const that = this
        this.showDiv = true

        this.$nextTick(function () {
            this.getWindowHeight()
        });
    },
    components: {
        CustomInput,
        FontAwesomeIcon
    }

}

</script>

<template >

    <!-- <div class="flex flex-row w-full bg-[#D9D9D9] rounded-xl"> -->
        <form v-on:submit.prevent>
        <button :onclick="printAll">print</button>


        <div class="flex flex-row w-full overflow-auto bg-[#D9D9D9] rounded-xl ">
            <div class="flex flex-col" ref="todo">
                <div class="p-2 flex-nowrap flex border-r-[3px] border-white" :ref="`h${index}`" :style="style(index)"
                    :key="index" v-for="(header, index) in (this.info.headers)">
                    <h1
                        class="flex-none w-full justify-between flex truncate max-w-[4rem] sm:max-w-[20rem] md:max-w-[48rem]">
                        <p class="truncate">
                            {{ header.value }}&nbsp;
                        </p>
                        <!-- v-tooltip.bottom="{
                        value: header.aditional,
                        pt: {
                            arrow: {
                                style: {
                                    borderBottomColor: '#000000',
                                }
                            },
                            text: 'bg-white font-medium p-2 rounded-md'
                        }
                    }"  -->
                        <p @:mouseleave="showHide($event, index)" @:mouseenter="showHide($event, index)"
                            v-if="header.aditional">
                            <font-awesome-icon icon="circle-question" />
                        <h1 v-if="header.show"
                            class="absolute whitespace-break-spaces break-words max-w-full bg-white p-1 border border-gray-300 rounded-md">
                            {{ header.aditional }}</h1>
                        </p>
                    </h1>
                </div>
                <!-- <p class="border-black border-b" :key="index" v-for="(header, index) in headers">{{ header }}{{ index }}</p> -->
            </div>

            <div class="flex flex-col min-w-fit w-full">

                <p class="w-fit min-w-full border-white flex whitespace-nowrap flex-nowrap" :style="style(index)"
                    :ref="`v${index}`" v-for="(header, index) in this.info.headers">

                <h1 class="flex flex-none" v-if="this.info.contents[index]?.function">
                    <p v-tooltip.bottom="{
                        value: 'copiar',
                        pt: {
                            arrow: {
                                style: {
                                    borderBottomColor: '#000000',
                                }
                            },
                            text: 'bg-white font-medium p-2 rounded-md'
                        }
                    }">
                    <div class="m-2">
                        <font-awesome-icon class="cursor-pointer"
                            v-on:click="() => { this.info.contents[index]?.function() }"
                            :icon="this.info.contents[index]?.icon ?? 'circle-question'" />
                    </div>
                    </p>
                </h1>
                <div class="m-2 w-0 select-none text-[#D9D9D9]">
                    .
                </div>
                <div class="-ml-4 w-full h-full flex items-center">
                    <div v-if="this.info.contents[index]?.editable && edit" class="w-full h-full flex">
                        <input class="h-full w-full px-2 focus:outline-none border focus:border-black"
                            :value="this._info.contents[index].value" @:input=""
                            @:change="{
                                console.log($event.target.value);
                                this._info.contents[index].value = $event.target.value;
                                }">
                        <!-- :v-model="this.info.contents[index]?.value" 
                                            
                    -->
                    </div>
                    <h1 class="m-2 "
                        v-else-if="!this.info.contents[index]?.value || this.info.contents[index]?.value.trim() == ''">
                        -
                    </h1>
                    <h1 v-else-if="this.info.contents[index]?.value.startsWith('http')">
                        <a :href="this.info.contents[index]?.value" target="_blank"
                            class="m-2 text-blue-800 hover:underline">
                            {{ this.info.contents[index]?.value }}
                        </a>
                    </h1>
                    <h1 v-else class="m-2 ">
                        {{ this.info.contents[index]?.value }}
                    </h1>
                </div>
                </p>
            </div>
        </div>
    </form>
</template>