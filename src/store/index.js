import { createStore } from 'vuex'
import data from '../../db.json'
import EventService from '@/services/EventService.js'

const USER_KEY = 'loggedInUser'
export default createStore({
  state: {
    user: [],
    category: {},
    categories: [],
    products: [],
    isAuthenticated: false
  },
  mutations: {
    ADD_USER(state, user) {
      state.user.push(user)
    },
    SIGNIN_USER(state, payload) {
      state.user = payload
      state.isAuthenticated = true
      localStorage.setItem(USER_KEY, JSON.stringify(payload))
    },
    SIGNOUT_USER(state) {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem(USER_KEY)
      // console.log(state.isAuthenticated)
    },
    INITIALIZE_STORE(state) {
      if (localStorage.getItem('LoggedInUser')) {
        state.user = localStorage.getItem('LoggedInUser')
      }
    },
    ADD_CAT(state, category) {
      state.categories.push(category)
    },
    SET_CATS(state, categories) {
      state.categories = categories
      console.log('STATE: ', state.categories)
    },
    DELETE_CATEGORY(state, categoryId) {
      const index = state.categories.findIndex(c => c.id === categoryId)
      if (index !== -1) {
        state.categories.splice(index, 1)
      }
    },
    UPDATE_CATEGORY(state, updatedCategory) {
      const index = state.categories.findIndex(c => c.id === updatedCategory)
      if (index !== -1) {
        state.categories.splice(index, 1, updatedCategory)
      }
    },
    SET_PRODUCTS(state, products) {
      state.products = products
      console.log('State:>', state.categories)
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product)
    },
    UPDATE_PRODUCT(state, product) {
      const index = state.products.findIndex(p => p.id === product.id)
      state.products.splice(index, 1, product)
    },
    DELETE_PRODUCT(state, productId) {
      const index = state.products.findIndex(p => p.id === productId);
      state.products.splice(index, 1);
    }
  },
  actions: {
    createUser({ commit }, user) {
      console.log(user)
      return EventService.postUser(user)
        .then(() => {
          commit('ADD_USER', user)
          alert('You are Registered Now')
        })
        .catch(error => {
          throw error
        })
    },
    fetchUsers({ commit }) {
      return EventService.getUsers()
        .then(response => {
          commit('', response.data)
        })
        .catch(error => {
          // Actions are throwing the errors back to component that triggered them
          throw error
        })
    },
    signIn({ commit }, loggedinUser) {
      const user = data.users.find(
        user =>
          user.name === loggedinUser.name &&
          user.password === loggedinUser.password
      )
      if (user) {
        // console.log(user)
        commit('SIGNIN_USER', user)
      } else {
        throw new Error('Invalid email or password')
      }
    },
    signOut({ commit }) {
      commit('SIGNOUT_USER')
    },
    storeInitialize({ commit }) {
      const storedUser = localStorage.getItem(USER_KEY)
      if (storedUser) {
        commit('SIGNIN_USER', JSON.parse(storedUser))
      }
    },
    createCategory({ commit }, category) {
      return EventService.postCat(category)
        .then(() => {
          alert('Category Added')
          commit('ADD_CAT', category)
          alert('Category Added')
        })
        .catch(error => {
          throw error
        })
    },
    fetchCats({ commit }) {
      return EventService.getCats()
        .then(response => {
          commit('SET_CATS', response.data)
        })
        .catch(error => {
          throw error
        })
    },
    deleteCategory({ commit }, categoryId) {
      console.log('delete method call ' + categoryId)
      return EventService.deleteCat(categoryId)
        .then(() => {
          alert('Category Deleted')
          commit('DELETE_CATEGORY', categoryId)
        })
        .catch(error => {
          throw error
        })
    },
    updateCategory({ commit }, updatedCategory) {
      console.log('Updated: ', updatedCategory)
      return EventService.updateCat(updatedCategory)
        .then(() => {
          commit('UPDATE_CATEGORY', updatedCategory)
        })
        .catch(error => {
          throw error
        })
    },
    fetchProducts({ commit }) {
      return EventService.getProducts()
        .then(response => {
          console.log(response.data)
          commit('SET_PRODUCTS', response.data)
        })
        .catch(error => {
          throw error
        })
    },
    createProduct({ commit }, Formdata) {
      console.log(Formdata)
      return EventService.postProduct(Formdata)
        .then(() => {
          alert('Category Added')
          commit('ADD_PRODUCT', Formdata)
          alert('Category Added')
        })
        .catch(error => {
          throw error
        })
    },
    updateProduct({ commit }, Formdata) {
      console.log('Update:', Formdata)
      return EventService.updateProduct(Formdata)
        .then(response => {
          console.log(response.data)
          commit('UPDATE_PRODUCT', response.data)
        })
        .catch(error => {
          throw error
        })
    },
    deleteProduct({ commit }, product) {
      console.log(product)
      return EventService.deleteProduct(product)
        .then(() => {
          alert('Product Deleted')
          commit('DELETE_PRODUCT', product)
        })
        .catch(error => {
          throw error
        })
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.user
  }
})
