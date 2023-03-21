<template>
  <div>
    <h1>Dashboard</h1>
    <hr />
    <span v-if="isAuthenticated">
      Welcome to your dashboard
      {{ currentUser.name }}!
    </span>
    <span v-else>Please sign in to view your dashboard.</span>
    <!-- {{ products }} -->
    <button class="btn btn-danger" v-if="isAuthenticated" @click="handleLogout">Log Out</button>

    <DataTable class="table table-bordered table-striped table-hover display" :data="tableData">
      <thead>
        <tr>
          <th scope="col" class="text-center">Product Name</th>
          <th scope="col" class="text-center">Product Description</th>
          <th scope="col" class="text-center">Product Price</th>
          <th scope="col" class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <product-item
          v-for="product in products"
          :key="product.id"
          :product="product"
          :categories="categories"
          @edit-product="editProduct"
          @delete-product="deleteProduct"
        />
      </tbody>
    </DataTable>
  </div>
</template>
<script>
// import DataTable from 'vue3-easy-data-table'
// import { Header, Item } from "vue3-easy-data-table";
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-select-bs5'
import ProductItem from '../components/ProductItem.vue'

DataTable.use(DataTablesCore)

export default {
  components: {
    DataTable,
    ProductItem
  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push({
        name: 'SignIn'
      })
    } else {
      this.$store.dispatch('fetchProducts')
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    currentUser() {
      return this.$store.getters.currentUser
    },
    users() {
      return this.$store.state.users
    },
    products() {
      return this.$store.state.products
    },
    tableData() {
      return this.products.map((product) => {
        return [product.name, product.description, product.price, '']
      })
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('signOut')
      this.$router.push({
        name: 'SignIn'
      })
    },
    edit() {
      this.$emit('edit-product', this.product)
    },
    deleteProduct() {
      this.$emit('delete-product', this.product)
    }
  }
}
</script>

<style>
@import 'datatables.net-bs5';
</style>
