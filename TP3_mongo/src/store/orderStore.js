import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '@/axios/index.js'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])

  const loading = ref(true)
  const originalOrders = ref([])

  const itemsPerPage = 6 // Nombre d'éléments par page
  const currentPage = ref(1)
  const searchQuery = ref('')

  const ordersByDate = ref()
  const ordersAverage = ref('')
  const ordersTotalPrice = ref('')
  const ordersTotal = ref('')
  const ordersTotalPerCountry = ref('')
  const ordersTotalPerEmployees = ref('')
  const ordersTopProduct = ref('')

  // Calcul du nombre total de pages
  const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage))
  // Liste des clients affichés pour la page actuelle
  const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredOrders.value.slice(start, end)
  })

  const getOrders = async () => {
    try {
      const { data } = await axios.get('/orders')
      orders.value = [...data]
      originalOrders.value = [...data]
    } catch (error) {
      console.error('Erreur lors de la récupération des clients :', error)
    } finally {
      loading.value = false
    }
  }

  const getNbOrdersByDate = async () => {
    try {
      const { data } = await axios.get('/nb-orders-date')
      ordersByDate.value = data
    } catch (error) {
      console.error('Erreur lors de la récupération des clients :', error)
    }
  }

  const getAveragePriceOrders = async () => {
    try {
      const { data } = await axios.get('/average-price-orders')
      ordersAverage.value = data
    } catch (error) {
      console.error('Erreur lors de la récupération des clients :', error)
    }
  }

  const getTotalPrice = async () => {
    try {
      const { data } = await axios.get('/total-price-orders')
      ordersTotalPrice.value = data
    } catch (error) {
      console.error('Erreur lors de la récupération des clients :', error)
    }
  }

  const getTotalOrder = async () => {
    try {
      const { data } = await axios.get('/total-orders')
      ordersTotal.value = data
    } catch (error) {
      console.error('Erreur lors de la récupération des clients :', error)
    }
  }

  const getTotalOrderPerCountry = async () => {
    try {
      const { data } = await axios.get('/total-orders-country')
      ordersTotalPerCountry.value = data
    } catch (error) {
      console.error('Erreur lors de la récupération des clients :', error)
    }
  }

  const getTotalOrderPerEmployees = async () => {
    try {
      const { data } = await axios.get('/total-orders-employees')
      ordersTotalPerEmployees.value = data
    } catch (error) {
      console.error('Erreur lors de la récupération des clients :', error)
    }
  }

  const getTopProductsInOrders = async () => {
    try {
      const { data } = await axios.get('/top-products-orders')
      ordersTopProduct.value = data
    } catch (error) {
      console.error('Erreur lors de la récupération des clients :', error)
    }
  }

  const getTop = async (url) => {
    try {
      const { data } = await axios.get(url)
      return data
    } catch (error) {
      console.error('Erreur lors de la récupération des clients :', error)
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value -= 1
    }
  }

  const nextPage = () => {
    const totalItems = filteredOrders.value.length // Utilisez les éléments filtrés
    if (currentPage.value * itemsPerPage < totalItems) {
      currentPage.value += 1
    }
  }
  const filteredOrders = computed(() => {
    if (!searchQuery.value.trim()) {
      return orders.value // Si le champ est vide, retourner tous les clients
    }
    return orders.value.filter((Order) =>
      Order.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  })

  const sortOrders = (properties, order = 'asc') => {
    if (order === 'default') {
      orders.value = [...originalOrders.value]
      return
    }

    orders.value.sort((a, b) => {
      for (let property of properties) {
        const valueA = a[property] || ''
        const valueB = b[property] || ''

        // Si les valeurs sont des nombres, on les compare numériquement
        if (!isNaN(valueA) && !isNaN(valueB)) {
          // Comparaison numérique si les valeurs sont des nombres
          const comparison = valueA - valueB
          if (comparison !== 0) {
            return order === 'asc' ? comparison : -comparison
          }
        } else {
          // Si ce sont des chaînes, on utilise localeCompare
          if (typeof valueA === 'string' && typeof valueB === 'string') {
            const comparison = valueA.localeCompare(valueB, undefined, {
              numeric: true,
              sensitivity: 'base',
            })
            if (comparison !== 0) {
              return order === 'asc' ? comparison : -comparison
            }
          }
        }
      }

      return 0
    })
  }

  const sortedOrder = (about, attributeId) => {
    sortingOptions.value[about].attributes.forEach((attribute) => {
      attribute.check = attribute.id === attributeId
    })

    switch (attributeId) {
      case '2': // Ordre croissant
        sortOrders([about, 'firstName'], 'asc') // Tri par contactName puis par orderID
        break
      case '3': // Ordre décroissant
        sortOrders([about, 'firstName'], 'desc')
        break
      default: // Ordre par défaut (tri par 'about')
        sortOrders([about, 'firstName'], 'default') // Tri par contactName puis par orderID
        break
    }
  }

  const sortingOptions = ref({
    orderID: {
      about: 'orderID',
      title: 'ID',
      attributes: [
        { id: '1', text: 'Défaut', check: true },
        { id: '2', text: 'Ordre croissant', check: false },
        { id: '3', text: 'Ordre décroissant', check: false },
      ],
    },
    contactName: {
      about: 'contactName',
      title: 'NOM',
      attributes: [
        { id: '1', text: 'Défaut', check: true },
        { id: '2', text: 'Ordre croissant', check: false },
        { id: '3', text: 'Ordre décroissant', check: false },
      ],
    },
  })

  return {
    loading,
    prevPage,
    nextPage,
    paginatedOrders,
    totalPages,
    getOrders,
    orders,
    currentPage,
    sortingOptions,
    sortedOrder,
    searchQuery,
    getTop,
    getNbOrdersByDate,
    getAveragePriceOrders,
    getTotalPrice,
    getTotalOrder,
    ordersTotal,
    ordersTotalPrice,
    ordersAverage,
    ordersByDate,
    getTotalOrderPerCountry,
    ordersTotalPerCountry,
    getTotalOrderPerEmployees,
    ordersTotalPerEmployees,
    getTopProductsInOrders,
    ordersTopProduct,
  }
})
