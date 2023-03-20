import axios from 'axios'
// import data from '../../db.json'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  postUser(user) {
    return apiClient.post('/users', user)
  },
  getUsers() {
    return apiClient.get('/users')
  },
  postCat(category) {
    return apiClient.post('/category', category)
  },
  getCats() {
    return apiClient.get('/category')
  },
  deleteCat(id) {
    return apiClient.delete(`/category/${id}`)
  },
  updateCat(category) {
    return apiClient.put(`/category/${category.id}`, category)
  },
  getProducts() {
    return apiClient.get('/products')
  },
  postProduct(product) {
    return apiClient.post('/products', product)
  },
  updateProduct(product) {
    return apiClient.put(`/products/${product.id}`, product)
  },
  deleteProduct(product) {
    return apiClient.delete(`/products/${product.id}`)
  }
}
