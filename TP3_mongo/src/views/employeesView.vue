<template>
    <div class="mx-auto size-full">
        <h1 class="font-bold text-3xl border-b p-8">Liste des employés</h1>
        <div v-if="useEmployee.loading" class="text-center mt-8 flex items-center justify-center flex-col">
            <span class="loading loading-bars loading-xs size-32"></span>
            <span>Chargement...</span>
        </div>
        <div v-else>
            <employeeComponent />
            <employeeGraphicComponent />
            <employeeDetailComponent />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import employeeComponent from "@/components/employee/employeeComponent.vue";
import employeeGraphicComponent from "@/components/employee/employeeGraphicComponent.vue";
import employeeDetailComponent from "@/components/employee/employeeDetailComponent.vue";
import { useEmployeeStore } from "@/store/employeeStore";

const useEmployee = useEmployeeStore()
onMounted(() => {
    useEmployee.getEmployees()
})
</script>
