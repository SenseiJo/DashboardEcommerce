<template>
    <div class="mx-auto size-full">
        <h1 class="font-bold text-3xl border-b p-8">Liste des Produits</h1>
        <div v-if="loading" class="text-center mt-8 flex items-center justify-center flex-col">
            <span class="loading loading-bars loading-xs size-32"></span>
            <span>Chargement...</span>
        </div>
        <div v-else class="p-8">
            <table class="mx-auto  w-1/2 border-collapse border border-gray-300">
                <thead>
                    <tr class="bg-gray-200">
                        <th class="border border-gray-300 px-4 py-2 text-left"> </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in paginatedProducts" :key="product.id" class="hover:bg-gray-100">
                        <td class="border border-gray-300 px-4 py-2 text-center">{{ product }}</td>
                    </tr>
                </tbody>
            </table>

            <!-- Contrôles de pagination -->
            <div class="flex justify-center items-center mt-4 space-x-4">
                <button @click="prevPage" :disabled="currentPage === 1"
                    class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50">
                    Précédent
                </button>
                <span>Page {{ currentPage }} sur {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage * itemsPerPage >= products.length"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50">
                    Suivant
                </button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import axios from "@/axios/index.js";
import { ref, onMounted, computed } from "vue";

const products = ref([]);
const loading = ref(true);

const itemsPerPage = 15; // Nombre d'éléments par page
const currentPage = ref(1);

// Calcul du nombre total de pages
const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage));

// Liste des clients affichés pour la page actuelle
const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return products.value.slice(start, end);
});

// Récupérer les clients depuis l'API
const getProducts = async () => {
    try {
        const { data } = await axios.get('/products');
        products.value = data;
    } catch (error) {
        console.error("Erreur lors de la récupération des clients :", error);
    } finally {
        loading.value = false;
    }
};

// Aller à la page précédente
const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
    }
};

// Aller à la page suivante
const nextPage = () => {
    if (currentPage.value * itemsPerPage < products.value.length) {
        currentPage.value += 1;
    }
};

onMounted(() => {
    getProducts();
});
</script>
