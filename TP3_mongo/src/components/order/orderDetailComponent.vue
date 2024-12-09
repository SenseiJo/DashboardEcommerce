<template>
    <div class="w-full px-4 border-b mt-2">
        <h2 class="underline font-bold uppercase mb-8 ml-4">Afficher les détails d'un employé</h2>
        <div class="w-full px-4  mt-2 flex mb-12 ">
            <div class="flex flex-col items-center justify-center ">
                <div class="grid grid-cols-2 gap-2 w-96 ">
                    <div class="badge bg-gray-500 gap-2 hover:cursor-pointer justify-self-center w-full"
                        v-for="order in useOrder.paginatedOrders" :key="order.orderID"
                        @click="useOrder.getOrderDetail(order)">
                        <svg v-if="order.check" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="h-4 w-4 text-green-500 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block h-4 w-4 stroke-current text-red-500">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12">
                            </path>
                        </svg>
                        <p class="text-white"> {{ order.firstName }} - {{ order.lastName }}
                        </p>
                    </div>
                </div>
                <!-- Contrôles de pagination -->
                <div class="flex justify-center items-center mt-4 space-x-4">
                    <button @click="useOrder.prevPage" :disabled="useOrder.currentPage === 1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>
                    </button>
                    <span>Page {{ useOrder.currentPage }} sur {{ useOrder.totalPages }}</span>
                    <button @click="useOrder.nextPage"
                        :disabled="useOrder.currentPage * useOrder.itemsPerPage >= useOrder.orders.length">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>

            <div v-if="useOrder.orderDetail">
                <p class="font-bold mb-2 text-center">
                    {{ useOrder.orderDetail.firstName }} {{ useOrder.orderDetail.lastName }}
                </p>
                <table class="mx-auto w-1/2 border-collapse border border-gray-300">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="border border-gray-300 px-4 py-2 text-left">Titre</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Titre de politesse</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Date de naissance</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Date d'embauche</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Adresse</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Ville</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Région</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Code postal</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Pays</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Téléphone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="hover:bg-gray-100">
                            <td class="border border-gray-300 px-4 py-2 text-center">{{
                                useOrder.orderDetail.title
                                }}
                            </td>
                            <td class="border border-gray-300 px-4 py-2 text-center">{{
                                useOrder.orderDetail.titleOfCourtesy }}</td>
                            <td class="border border-gray-300 px-4 py-2">
                                {{ new Date(useOrder.orderDetail.birthDate).toLocaleDateString('fr-FR') }}
                            </td>
                            <td class="border border-gray-300 px-4 py-2">
                                {{ new Date(useOrder.orderDetail.hireDate).toLocaleDateString('fr-FR') }}
                            </td>
                            <td class="border border-gray-300 px-4 py-2">{{ useOrder.orderDetail.address }}
                            </td>
                            <td class="border border-gray-300 px-4 py-2">{{ useOrder.orderDetail.city }}</td>
                            <td class="border border-gray-300 px-4 py-2">
                                {{ useOrder.orderDetail.regionDetails[0].regionDescription === "NULL" ? "" :
                                    useOrder.orderDetail.regionDetails[0].regionDescription
                                }}
                            </td>
                            <td class="border border-gray-300 px-4 py-2">{{ useOrder.orderDetail.postalCode }}
                            </td>
                            <td class="border border-gray-300 px-4 py-2">{{ useOrder.orderDetail.country }}
                            </td>
                            <td class="border border-gray-300 px-4 py-2">{{ useOrder.orderDetail.homePhone }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import { useOrderStore } from "@/store/orderStore";

const useOrder = useOrderStore()

onBeforeUnmount(() => {
    useOrder.orderDetail = null
});
</script>