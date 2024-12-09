<template>
    <div>
        <h3 class="font-bold uppercase text-center">Nombre d'employés par pays</h3>
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
import { useCustomerStore } from "@/store/customerStore";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ChartDataLabels);

const useCustomer = useCustomerStore();
const chartData = ref({
    labels: [],
    datasets: [
        {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
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
                return `${value} employés`;
            },
        },
    },
};

onMounted(async () => {
    const fetchedData = await useCustomer.getTop("/top-coutries-employees");

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
                data: fetchedData.map((countrie) => countrie.count),
            },
        ],
    };

});
</script>
