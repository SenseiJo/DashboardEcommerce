<template>

    <div class="flex items-center justify-evenly space-x-8 ">
        <div>
            <h3 class="font-bold uppercase text-center">Top 3 produits plus vendus</h3>
            <div style="width: 400px; height: 400px;">
                <Doughnut :data="chartData" :options="options" />
            </div>
        </div>
        <div class="space-y-8">
            <div v-for="(product, i ) in sortedProducts" :key="product._id">
                <p class="font-bold text-center">
                    {{ i + 1 }}.
                    <span>
                        {{ product.productName }}
                    </span>
                </p>

                <p>
                    Revenu : <span class="font-bold uppercase text-center">
                        {{ product.totalRevenue }} €
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    components: {
        Doughnut
    },
}
</script>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useOrderStore } from "@/store/orderStore";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ChartDataLabels);

const useOrder = useOrderStore();
const chartData = ref({
    labels: [],
    datasets: [
        {
            label: null,
            backgroundColor: [
                // '#FF5733', // Rouge vif
                // '#33FF57', // Vert vif
                // '#3357FF', // Bleu vif
                // '#FF33A1', // Rose vif
                // '#F1C40F', // Jaune
                // '#8E44AD', // Violet
                '#2ECC71', // Vert clair
                '#E74C3C', // Rouge foncé
                '#3498DB', // Bleu clair
                '#1ABC9C', // Turquoise
                '#34495E', // Gris foncé
                '#95A5A6', // Gris clair
                '#16A085', // Vert émeraude
                '#C0392B', // Rouge intense
                '#2980B9', // Bleu profond
            ], data: [],
        },
    ],
});

const options = {
    responsive: true,
    maintainAspectRatio: false,

};
const sortedProducts = computed(() => {
    return [...useOrder.ordersTopProduct].sort(
        (a, b) => b.totalRevenue - a.totalRevenue
    );
});

onMounted(async () => {

    await useOrder.getTopProductsInOrders()

    const fetchedData = useOrder.ordersTopProduct;

    if (!fetchedData || !Array.isArray(fetchedData)) {
        console.error("Données invalides reçues :", fetchedData);
        return;
    }

    console.log(fetchedData.value)

    chartData.value = {
        ...chartData.value,
        labels: fetchedData.map((product) =>
            product.productName
        ),
        datasets: [
            {
                ...chartData.value.datasets[0],
                data: fetchedData.map((product) => product.totalQuantity),
            },
        ],
    };
});
</script>
