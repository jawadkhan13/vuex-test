<template>
  <div class="about">
    <!-- {{categories}} -->

    <table class="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Product Name</th>
          <th scope="col">Product Description</th>
          <th scope="col">Category</th>
          <th scope="col">Product Price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <product-item
            :product="product"
            :categories="categories.find((category) => category.id === product.categoryId)"
            @edit-product="editProduct"
            @delete-product="deleteProduct"
          />
        </tr>
      </tbody>
    </table>

    <button class="btn btn-primary" @click="showProductForm">Add Product</button>

    <product-form
      :product="selectedProduct"
      :categories="categories"
      v-if="showForm"
      @save-product="saveProduct"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import ProductItem from '../components/ProductItem.vue'
import ProductForm from '../components/ProductForm.vue'
import { mapState } from 'vuex'

export default {
  components: {
    ProductItem,
    ProductForm
  },
  data() {
    return {
      // products: [],
      showForm: false,
      selectedProduct: null
    }
  },
  computed: {
    ...mapState(['products', 'categories'])
  },
  mounted() {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchCats').catch((error) => {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error }
      })
    })
  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push({
        name: 'SignIn'
      })
    }
  },
  methods: {
    showProductForm() {
      this.showForm = true
      this.selectedProduct = {
        id: null,
        name: '',
        description: '',
        price: '',
        categoryIds: []
      }
    },
    editProduct(product) {
      this.showForm = true
      this.selectedProduct = product
      console.log('Products.vue:', this.selectedProduct)
    },
    deleteProduct(product) {
      if (confirm(`Are you sure you want to delete the product "${product.name}"?`)) {
        this.$store.dispatch('deleteProduct', product)
      }
    },
    saveProduct(product) {
      console.log(product)
      product.categories = product.categories || []
      if (product.id) {
        this.$store.dispatch('updateProduct', product)
      } else {
        this.$store.dispatch('createProduct', product)
      }
      this.showForm = false
      this.selectedProduct = null
    },
    cancel() {
      this.showForm = false
      this.selectedProduct = null
    }
  }
}
</script>
