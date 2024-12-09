<template>
    <div class="mx-auto size-full">
        <h1 class="font-bold text-3xl border-b p-8">Liste des commandes</h1>
        <div v-if="useOrder.loading" class="text-center mt-8 flex items-center justify-center flex-col">
            <span class="loading loading-bars loading-xs size-32"></span>
            <span>Chargement...</span>
        </div>
        <div v-else>
            <orderGraphicComponent />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import orderGraphicComponent from "@/components/order/orderGraphicComponent.vue";
import { useOrderStore } from "@/store/orderStore";

const useOrder = useOrderStore()
onMounted(() => {
    useOrder.getOrders()
})
</script>
