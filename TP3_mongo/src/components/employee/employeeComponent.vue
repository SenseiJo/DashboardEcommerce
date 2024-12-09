<template>

    <div class="border-b w-full px-4 flex  justify-between ">
        <div class="ml-4">
            <h2 class="underline font-bold uppercase">Trier par :</h2>
            <div class="flex items-center space-x-2">
                <badgeComponent :categorie="useEmployee.sortingOptions.employeeID" />
                <badgeComponent :categorie="useEmployee.sortingOptions.contactName" />
            </div>
        </div>
        <div class="flex flex-col justify-end p-2 ">
            <p class="p-2">Résultat obtenu : {{ useEmployee.paginatedEmployees.length }} ,
                Page numéro : <input v-model.number="useEmployee.currentPage"
                    class="w-6 text-center cursor-pointer hover:underline ">
            </p>
            <div class="flex border w-72 h-10 items-center justify-between rounded-full  "
                :class="{ 'border-black  ': isFocused, 'border-gray-300': !isFocused }">
                <input type="text" placeholder="Rechercher par nom"
                    class="w-full h-full p-2 rounded-l-full outline-none" v-model="useEmployee.searchQuery"
                    @focus="isFocused = true" @blur="isFocused = false" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6 mr-4 hover:cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>
        </div>
    </div>


    <!-- PARTIE UTILISATEUR -->
    <div class="p-8 border-b">
        <table class="mx-auto w-1/2 border-collapse border border-gray-300">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border border-gray-300 px-4 py-2 text-left">ID Employé</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Prénom - Nom</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Titre</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="employee in useEmployee.paginatedEmployees" :key="employee.employeeID"
                    class="hover:bg-gray-100">
                    <td class="border border-gray-300 px-4 py-2 text-center">{{ employee.employeeID }}</td>
                    <td class="border border-gray-300 px-4 py-2 text-center">
                        {{ employee.firstName }} {{ employee.lastName }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2 text-center">{{ employee.title }}</td>
                </tr>
            </tbody>
        </table>
        <!-- Contrôles de pagination -->
        <div class="flex justify-center items-center mt-4 space-x-4">
            <button @click="useEmployee.prevPage" :disabled="useEmployee.currentPage === 1"
                class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50">
                Précédent
            </button>
            <span>Page {{ useEmployee.currentPage }} sur {{ useEmployee.totalPages }}</span>
            <button @click="useEmployee.nextPage"
                :disabled="useEmployee.currentPage * useEmployee.itemsPerPage >= useEmployee.employees.length"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50">
                Suivant
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEmployeeStore } from "@/store/employeeStore";
import badgeComponent from "@/components/employee/badgeComponent.vue";

const isFocused = ref(false);
const useEmployee = useEmployeeStore()


</script>