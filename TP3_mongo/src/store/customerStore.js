import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '@/axios/index.js'

export const useCustomerStore = defineStore('customer', () => {
  const customers = ref([])

  const loading = ref(true)
  const originalCustomers = ref([])

  const itemsPerPage = 6 // Nombre d'éléments par page
  const currentPage = ref(1)
  const searchQuery = ref('')

  // Calcul du nombre total de pages
  const totalPages = computed(() => Math.ceil(filteredCustomers.value.length / itemsPerPage))
  // Liste des clients affichés pour la page actuelle
  const paginatedCustomers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredCustomers.value.slice(start, end)
  })

  const getCustomers = async () => {
    try {
      const { data } = await axios.get('/customers')
      customers.value = [...data]
      originalCustomers.value = [...data]
    } catch (error) {
      console.error('Erreur lors de la récupération des clients :', error)
    } finally {
      loading.value = false
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
    const totalItems = filteredCustomers.value.length // Utilisez les éléments filtrés
    if (currentPage.value * itemsPerPage < totalItems) {
      currentPage.value += 1
    }
  }
  const filteredCustomers = computed(() => {
    if (!searchQuery.value.trim()) {
      return customers.value // Si le champ est vide, retourner tous les clients
    }
    return customers.value.filter((customer) =>
      customer.contactName.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  })

  const sortCustomers = (properties, order = 'asc') => {
    if (order === 'default') {
      customers.value = [...originalCustomers.value]
      return
    }

    customers.value.sort((a, b) => {
      for (let property of properties) {
        const valueA = a[property] || ''
        const valueB = b[property] || ''

        // Comparaison des valeurs
        const comparison = valueA.localeCompare(valueB, undefined, {
          numeric: true,
          sensitivity: 'base',
        })

        if (comparison !== 0) {
          return order === 'asc' ? comparison : -comparison
        }
      }

      return 0
    })
  }

  const sortedCustomer = (about, attributeId) => {
    sortingOptions.value[about].attributes.forEach((attribute) => {
      attribute.check = attribute.id === attributeId
    })

    switch (attributeId) {
      case '2': // Ordre croissant
        sortCustomers([about, 'customerID'], 'asc') // Tri par contactName puis par customerID
        break
      case '3': // Ordre décroissant
        sortCustomers([about, 'customerID'], 'desc')
        break
      default: // Ordre par défaut (tri par 'about')
        sortCustomers([about, 'customerID'], 'default') // Tri par contactName puis par customerID
        break
    }
  }

  const sortingOptions = ref({
    customerID: {
      about: 'customerID',
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
    country: {
      about: 'country',
      title: 'Pays',
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
    paginatedCustomers,
    totalPages,
    getCustomers,
    customers,
    currentPage,
    sortingOptions,
    sortedCustomer,
    searchQuery,
    getTop,
  }
})
