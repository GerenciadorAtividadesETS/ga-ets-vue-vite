<script>
import SubjectCard from '../components/SubjectCard.vue';

export default {
    data() {
        return {
            list: [0, 1,0, 1,0, 1,0, 1,0, 1,0, 1,0, 1,0, 1,0, 1,0, 1,0, 1,0, 1,]
        }
    },
    components: {
        SubjectCard
    }
}

</script>
<template>
    <div class="mt-10 content-end flex flex-col justify-center w-full px-14">
        <div
            class="sm:min-h-[6rem] p-2 gap-2 items-center justify-center flex-row drop-shadow-md min-w-[272px] flex w-full mb-0 bg-white">
            <!-- <div class="flex h-fit flex-row w-full items-center justify-between"> -->
            <div class="h-0.5 md:block hidden w-full rounded-full bg-gray-300"></div>
            <div class="sm:min-h-[6rem] p-2 gap-2 items-center justify-center flex flex-wrap md:flex-nowrap flex-row">
                <input placeholder="order by" class="border p-2 h-8 rounded-md" type="text">
                <input placeholder="order by" class="border mx-5 p-2 h-8 rounded-md" type="text">
                <input placeholder="search" class="border p-2 h-8 rounded-full" type="text">
            </div>
            <!-- </div> -->
        </div>
        <div class="h-full flex-wrap justify-evenly min-w-[272px] flex w-full mb-0 bg-white">
                <div v-for="x in list">
                    <div :key=x class="p-4">
                        <SubjectCard />
                    </div>
                </div>
        </div>
    </div>
</template>