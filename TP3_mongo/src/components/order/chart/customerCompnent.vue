<template>
    <div>
        <h3 class="font-bold uppercase text-center">Nombre de commandes par Employés</h3>
        <div style="width: 400px; height: 400px;">
            <Pie :data="chartData" :options="options" />
        </div>
    </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    components: {
        Pie
    },
}
</script>

<script setup>
import { onMounted, ref } from "vue";
import { useOrderStore } from "@/store/orderStore";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ChartDataLabels);

const useOrder = useOrderStore();
const chartData = ref({
    labels: [],
    datasets: [
        {
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
            ],
            data: [],
        },
    ],
});

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top",
        },
        datalabels: {
            color: "#fff",
            font: {
                size: 14,
            },
            formatter: (value) => {
                return `${value} commandes`;
            },
        },
    },
};

onMounted(async () => {
    await useOrder.getTotalOrderPerEmployees();

    const fetchedData = useOrder.ordersTotalPerEmployees;

    if (!fetchedData || !Array.isArray(fetchedData)) {
        console.error("Données invalides reçues :", fetchedData);
        return;
    }

    chartData.value = {
        ...chartData.value,
        labels: fetchedData.map((country) => country.employeeDetails.firstName + " " + country.employeeDetails.lastName),
        datasets: [
            {
                ...chartData.value.datasets[0],
                data: fetchedData.map((country) => country.totalOrders),
            },
        ],
    };
});
</script>
