<template>
    <div class="mx-auto size-full">
        <h1 class="font-bold text-3xl border-b p-8">Liste des clients</h1>

        <div v-if="useCustomer.loading" class="text-center mt-8 flex items-center justify-center flex-col">
            <span class="loading loading-bars loading-xs size-32"></span>
            <span>Chargement...</span>
        </div>

        <div v-else>
            <customerComponent />
            <customerGraphicComponent />
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import customerComponent from "@/components/customer/customerComponent.vue";
import customerGraphicComponent from "@/components/customer/customerGraphicComponent.vue";
import { useCustomerStore } from "@/store/customerStore";
const useCustomer = useCustomerStore()
onMounted(() => {
    useCustomer.getCustomers()
})
</script>