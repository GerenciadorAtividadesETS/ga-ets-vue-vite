<script lang="ts">
import { Fields } from './type';
export default {
    data() {
        return {
            
        }
    },
    props: {
        field: Object as () => Fields,
    },
    emits: ['validateInput'],
    methods: {
        validators(field: Fields) {
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
            const field = this.field as Fields;

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
                console.log(this.field.value);
            }
        },
    },

}
</script>

<template>
    <div class="flex flex-col w-full">
        <!-- // [Vue warn]: Component emitted event "validate-input" but it is neither declared in the emits option nor as an "onValidate-input" prop. -->
        {{ field?.name }}
        <input :required="field?.required" :type="field?.type" :placeholder="field?.placeholder ?? field?.name"
            class="border w-full p-2 h-8 rounded-md" @input="this.onInput($event)">
        <!-- v-model == @input="onInput($event, index)" -->
    </div>
    <div v-if="field?.error != ''" class="text-sm text-red-600">{{ field?.error ? "*" + field?.error : "" }}</div>
</template>