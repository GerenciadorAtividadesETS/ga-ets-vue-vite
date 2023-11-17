<script lang="ts">
// import { Vue, Component, Prop } from 'vue-property-decorator';
import FieldsForm from "./type"
import Vuelidate from 'vuelidate'
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import CustomInput from "./CustomInput.vue"

export default {
    data() {
        return {
            variavel: "",
        };
    },
    emits: ['validate-input']
    ,
    props: {
        text: { default: "text", type: String },
        action: { default: () => { }, type: Function },
        secondaryAction: Function,
        secondaryButtonName: { default: "back", type: String },
        fields: Array as () => FieldsForm.Field[],
        buttonName: { default: "submit", type: String },
        buttonClass: { default: "m-2 py-2 px-6 bg-slate-300 rounded-lg", type: String }
    },
    methods: {
        onInput(e: Event, id: number) {
            // a v-on handler receives the native DOM event
            // as the argument.
            if (e.target instanceof HTMLInputElement) {
                this.fields[id].value = e.target.value;
                // console.log(this.fields[id].value);
            }
        },
        runInputValidation() {
            if (this.$refs.inputs) {
                this.$refs.inputs[0].triggerValidation()
                // this.$refs.inputs.forEach(input => {
                //     input.triggerValidation();
                // });
            }
        },
        inputValidation() {
            if (this.$refs.inputs) {
                this.$refs.inputs.forEach(input => {
                    input.validate();
                });
            }
        },
        onSubmit(e: SubmitEvent) {
            var doAction = true;
            this.runInputValidation()
            for (let i = 0; i < this.fields.length; i++) {
                const field = this.fields[i] as FieldsForm.Field;
                if (field.error) {
                    return
                }
            }
            this.action();
        },
    },
    components: { CustomInput }
}

</script>

<template>
    <form class="w-full">
        <div class="w-full" v-for="(field, index) in fields" :key="index">
            <CustomInput @validate-input="inputValidation" :field="field" ref="inputs" />
        </div>
        <div class="w-full flex justify-center">
            <!-- @:click.prevent="onSubmit($event)"  -->
            <button v-if="secondaryAction != undefined" @:click.prevent="secondaryAction" :class="buttonClass">
                {{ secondaryButtonName }}
            </button>
            <button @:click.prevent="onSubmit" :class="buttonClass">
                {{ buttonName }}
            </button>
        </div>

    </form>
</template>