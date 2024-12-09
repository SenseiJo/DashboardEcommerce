<template>
    <div>
        <h3 class="font-bold uppercase text-center">Nombre d'Embauches</h3>
        <div style="width: 1000px; height: 400px;">
            <Line :data="chartData" :options="options" />
        </div>
    </div>
</template>

<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default {
    components: {
        Line
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
            label: null,
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
    plugins: {
        legend: {
            display: false, // Cela masquera la légende

        },
    },
    scales: {
        y: {
            beginAtZero: true, // Démarre à 0
            max: 5,
            ticks: {
                callback: function (value) {
                    return Number.isInteger(value) ? value : ''; // Affiche uniquement les entiers
                },
                stepSize: 1, // Force un incrément de 1 entre les valeurs
                font: {
                    size: 12, // Taille de la police des ticks sur l'axe Y
                    weight: 'bold', // Poids de la police (facultatif)
                },
            },
        },
    },
};


onMounted(async () => {
    const fetchedData = await useCustomer.getTop("/hireDate-employee");

    if (!fetchedData || !Array.isArray(fetchedData)) {
        console.error("Données invalides reçues :", fetchedData);
        return;
    }

    chartData.value = {
        ...chartData.value,
        labels: fetchedData.map((hireDate) =>
            new Date(hireDate._id).toLocaleDateString('fr-FR')
        ),
        datasets: [
            {
                ...chartData.value.datasets[0],
                data: fetchedData.map((hireDate) => hireDate.totalEmployee),
            },
        ],
    };
});
</script>
