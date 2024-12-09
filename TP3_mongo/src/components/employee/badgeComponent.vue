<template>
    <div class="flex flex-col space-y-2 py-2">
        <span class="font-bold uppercase">{{ categorie.title }}</span>
        <div class="badge bg-gray-500 gap-2 hover:cursor-pointer" v-for="attribut in categorie.attributes"
            :key="attribut.text" @click="useEmployee.sortedEmployee(categorie.about, attribut.id)">
            <svg v-if="attribut.check" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="h-4 w-4 text-green-500 ">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                class="inline-block h-4 w-4 stroke-current text-red-500">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <p class="text-white"> {{ attribut.text }}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const { categorie } = defineProps(["categorie"])
import { useEmployeeStore } from "@/store/employeeStore";
const useEmployee = useEmployeeStore()


</script>