<template>
    <div>
        <h3 class="font-bold uppercase text-center">Pays</h3>
        <div style="width: 1000px; height: 400px;">
            <Bar :data="chartData" :options="options" />
        </div>
    </div>
</template>

<script>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
    components: {
        Bar
    },
}
</script>

<script setup>
import { onMounted, ref } from "vue";
import { useCustomerStore } from "@/store/customerStore";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ChartDataLabels);

const useCustomer = useCustomerStore();
const chartData = ref({
    labels: [],
    datasets: [
        {
            label: 'Nombre de clients par pays',
            backgroundColor: [
                '#FF5733', // Rouge vif
                '#33FF57', // Vert vif
                '#3357FF', // Bleu vif
                '#FF33A1', // Rose vif
                '#F1C40F', // Jaune
                '#8E44AD', // Violet
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


onMounted(async () => {
    const fetchedData = await useCustomer.getTop("/top-countries-customers");

    if (!fetchedData || !Array.isArray(fetchedData)) {
        console.error("Données invalides reçues :", fetchedData);
        return;
    }

    chartData.value = {
        ...chartData.value,
        labels: fetchedData.map((countrie) => countrie._id),
        datasets: [
            {
                ...chartData.value.datasets[0],
                data: fetchedData.map((countrie) => countrie.totalCustomers),
            },
        ],
    };
});
</script>
