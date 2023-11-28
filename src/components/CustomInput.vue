<script lang="ts">
import { Field } from './type';
export default {
    data() {
        return {
            
        }
    },
    props: {
        field: Object as () => Field,
    },
    emits: ['validate-input'],
    methods: {
        validators(field: Field) {
            if (field?.required && field.value.toString() == "") {
                return field.name + " is required";
            }
            if (field?.min != null && field.value.toString().length < field.min || field?.max != null && field.value.toString().length > field.max) {
                if (field.max == field.min) {
                    return field.name + " must contain " + field.max + " letters";
                }
                else if (field.max != null) {
                    return field.name + " can't contain more than " + field.max + " letters";
                }
                else if (field.min != null && field.max == null) {
                    return field.name + " must contain at least " + field.min + " letters";
                }
                else {
                    return field.name + " must be between " + field.min + " and " + field.max;
                }
            }
            if (field?.specificValidator != null) {
                var msg = field.specificValidator()?.valueOf();
                if (msg) {
                    // alert(msg);
                    return msg
                }
            }
            return undefined
        },
        validate() {
            const field = this.field as Field;

            field.error = this.validators(field);
        },
        triggerValidation() {
            this.$emit('validate-input');
        },
        onInput(e: Event, id: number) {
            if (e.target instanceof HTMLInputElement) {
                this.field?.type == 'number'?e.target.value = e.target.value.replace(/[^0-9]/g, ""):null
                this.field.value = e.target.value;
                this.validate()
                // console.log(this.field.value);
            }
        },
    },

}
</script>

<template>
    <div class="w-full">
        <div class="flex flex-col w-full">
            {{ field?.name }}
            <input :maxlength="field?.max?? 255" :required="field?.required" :type="this.field?.type == 'number'? 'text': this.field?.type" :placeholder="field?.placeholder ?? field?.name"
            :value="field?.value" class="border w-full p-2 h-8 rounded-md focus:outline-none focus:border-black" @input="this.onInput($event)">
            <!-- v-model == @input="onInput($event, index)" -->
        </div>
        <div class="h-8">
            <div v-if="field?.error != ''" class="text-sm text-red-600">{{ field?.error ? "*" + field?.error : "" }}</div>
        </div>
    </div>
</template>