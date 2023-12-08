<script lang="ts">
import { Table } from './type';
import { faUserSecret, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import CustomInput from "./CustomInput.vue"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import cloneDeep from 'lodash/cloneDeep';

export default {
    setup(props, ctx) {

        return {
        }
    },
    props: {
        info: {} as () => Table,
        edit: {}
    },
    data() {
        return {
            _info: this.info,
            mouseup: false,
            back: cloneDeep(this.info),
        }
    },
    emits: ['return-info', 'cancel-changes'],
    methods: {


        style(i: number) {
            var obj = {} as any
            if (i != this._info.headers.length - 1) {
                obj.borderBottomWidth = "3px";
            }
            return obj
        },
        getWindowHeight() {
            this.y = this.$refs.todo.clientHeight;
        },
        showHide(e: MouseEvent, index: number) {
            if (this._info.headers[index].show) {
                this._info.headers[index].show = false
            } else {
                this._info.headers[index].show = true
            }
            console.log(this._info.headers[index].show);
        },
        showHideThis(e: MouseEvent, bool: Boolean) {
            if (bool) {
                bool = false
            } else {
                bool = true
            }
        },
        click(e: MouseEvent) {
            // console.log("lcicou" );

        },
        chage(e: InputEvent, index: number) {
            this._info.contents[index].value
        },
        printAll() {
            console.log('.');
            console.log(this.info);
            console.log('.');
        },
        returnInfo() {
            return this._info
        },
        triggerReturnInfo() {
            this.$emit('return-info')
        },
        cancelChanges() {
            console.log(this._info);

            console.log(this.back);

            this._info = this.back
            this.back = cloneDeep(this._info)
        },
        triggerCancelChanges() {

            this.$emit('cancel-changes')
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

<style>
.aditional-enter-active,
.aditional-leave-active {
    transition: opacity 0.3s ease;
}

.aditional-enter-from,
.aditional-leave-to {
    opacity: 0;
}
</style>

<template >
    <!-- <div class="flex flex-row w-full bg-[#D9D9D9] rounded-xl"> -->
    <form v-on:submit.prevent>

        <div class="flex flex-row w-full overflow-auto bg-slate-300 rounded-xl ">
            <div class="flex flex-col " ref="todo">
                <div class="p-2 flex-nowrap flex border-r-[3px] border-white" :ref="`h${index}`" :style="style(index)"
                    :key="index" v-for="(header, index) in (this._info.headers)">
                    <h3
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
                            <transition name="aditional">
                                <h3 v-if="header.show"
                                    class="absolute whitespace-break-spaces break-words max-w-full bg-white p-1 border border-gray-300 rounded-md">
                                    {{ header.aditional }}</h3>
                            </transition>
                        </p>
                    </h3>
                </div>
                <!-- <p class="border-black border-b" :key="index" v-for="(header, index) in headers">{{ header }}{{ index }}</p> -->
            </div>

            <div class="flex flex-col min-w-fit w-full">

                <p class="w-fit min-w-full border-white flex whitespace-nowrap flex-nowrap" :style="style(index)"
                    :ref="`v${index}`" v-for="(header, index) in this._info.headers">

                <h3 class="flex flex-none" v-if="this._info.contents[index]?.function">
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
                            v-on:click="() => { this._info.contents[index]?.function() }"
                            :icon="this._info.contents[index]?.icon ?? 'circle-question'" />
                    </div>
                    </p>
                </h3>
                <div class="m-2 w-0 select-none text-slate-300">.</div>
                <div class="-ml-4 w-full h-full flex items-center">
                    <div v-if="this._info.contents[index]?.editable && edit" class="w-full h-full flex">
                        <input class="h-full w-full px-2  focus:outline-none border focus:border-black" :style="{
                            
                            borderEndEndRadius: index == (this._info.contents.length-1)? `0.75rem` : ''
                        }" :value="this._info.contents[index].value" @:input="" @:change="{
    console.log($event.target.value);
    this._info.contents[index].value = $event.target.value;
}">
                        <!-- :v-model="this._info.contents[index]?.value" 
                                            
                    -->
                    </div>
                    <h3 class="h-full w-full px-2 border border-t-2 border-slate-300 flex items-center"
                        v-else-if="!this._info.contents[index]?.value || this._info.contents[index]?.value.trim() == ''">
                        -
                    </h3>
                    <h3 class="h-full w-full px-2 border border-t-2 border-slate-300 flex items-center"
                        v-else-if="this._info.contents[index]?.value.startsWith('http')">
                        <a :href="this._info.contents[index]?.value" target="_blank" class=" text-blue-800 hover:underline">
                            {{ this._info.contents[index]?.value }}
                        </a>
                    </h3>
                    <h3 v-else class="h-full w-full px-2 border border-t-2 border-slate-300 flex items-center">
                        {{ this._info.contents[index]?.value }}
                    </h3>
                </div>
                </p>
            </div>
        </div>
    </form>
</template>