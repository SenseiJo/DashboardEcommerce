<template>
    <div class=" w-full px-4 border-b mt-2">
        <div class="ml-4">
            <h2 class="underline font-bold uppercase mb-8">Statistiques</h2>
            <div class="flex items-center justify-evenly mx-auto flex-wrap">
                <ordersComponent class="m-8" />
                <countriesComponent class="m-8" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ordersComponent from "./chart/countriesComponent.vue";
import countriesComponent from "./chart/hireDateComponent.vue";
</script>