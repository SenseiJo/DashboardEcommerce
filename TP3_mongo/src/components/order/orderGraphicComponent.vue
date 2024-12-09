<template>
    <div class=" w-full px-4 border-b mt-2">
        <div class="ml-4">
            <h2 class="underline font-bold uppercase mb-8">Statistiques</h2>
            <div class="flex items-center justify-evenly mx-auto flex-wrap space-y-8">
                <div class="flex">
                    <customerCompnent class="m-8  " />
                    <countriesComponent class="m-8 " />
                </div>
                <hiredateComponent class="m-8  " />
                <productsComponent class="m-8  " />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import countriesComponent from "./chart/countriesComponent.vue";
import hiredateComponent from "./chart/hireDateComponent.vue";
import customerCompnent from "./chart/customerCompnent.vue";
import productsComponent from "./chart/productsComponent.vue";
</script>