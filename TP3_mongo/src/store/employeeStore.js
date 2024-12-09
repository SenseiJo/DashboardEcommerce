import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '@/axios/index.js'

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref([])

  const loading = ref(true)
  const originalEmployees = ref([])

  const itemsPerPage = 6 // Nombre d'éléments par page
  const currentPage = ref(1)
  const searchQuery = ref('')
  const employeeDetail = ref(null)

  // Calcul du nombre total de pages
  const totalPages = computed(() => Math.ceil(filteredEmployees.value.length / itemsPerPage))
  // Liste des clients affichés pour la page actuelle
  const paginatedEmployees = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredEmployees.value.slice(start, end)
  })

  const getEmployees = async () => {
    try {
      const { data } = await axios.get('/employees')
      employees.value = [...data]
      originalEmployees.value = [...data]
    } catch (error) {
      console.error('Erreur lors de la récupération des clients :', error)
    } finally {
      loading.value = false
    }
  }

  const getEmployeeDetail = async (employee) => {
    paginatedEmployees.value.forEach((emp) => {
      emp.check = emp.employeeID === employee.employeeID
    })
    try {
      const { data } = await axios.get(`/getEmployeeDetails/${employee.employeeID}`)
      employeeDetail.value = data[0]
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
    const totalItems = filteredEmployees.value.length // Utilisez les éléments filtrés
    if (currentPage.value * itemsPerPage < totalItems) {
      currentPage.value += 1
    }
  }
  const filteredEmployees = computed(() => {
    if (!searchQuery.value.trim()) {
      return employees.value // Si le champ est vide, retourner tous les clients
    }
    return employees.value.filter((Employee) =>
      Employee.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  })

  const sortEmployees = (properties, order = 'asc') => {
    if (order === 'default') {
      employees.value = [...originalEmployees.value]
      return
    }

    employees.value.sort((a, b) => {
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

  const sortedEmployee = (about, attributeId) => {
    sortingOptions.value[about].attributes.forEach((attribute) => {
      attribute.check = attribute.id === attributeId
    })

    switch (attributeId) {
      case '2': // Ordre croissant
        sortEmployees([about, 'firstName'], 'asc') // Tri par contactName puis par employeeID
        break
      case '3': // Ordre décroissant
        sortEmployees([about, 'firstName'], 'desc')
        break
      default: // Ordre par défaut (tri par 'about')
        sortEmployees([about, 'firstName'], 'default') // Tri par contactName puis par employeeID
        break
    }
  }

  const sortingOptions = ref({
    employeeID: {
      about: 'employeeID',
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
    paginatedEmployees,
    totalPages,
    getEmployees,
    employees,
    currentPage,
    sortingOptions,
    sortedEmployee,
    searchQuery,
    getTop,
    getEmployeeDetail,
    employeeDetail,
  }
})
