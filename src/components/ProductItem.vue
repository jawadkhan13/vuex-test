<template>
  <!-- <h3>{{ product.name }}</h3>

    <p>{{ product.description }}</p>

    <p>Price: ${{ product.price }}</p> -->

  <!-- <p v-if="product.categories && product.categories.length > 0">
      Categories:
      {{ product.categories.map(category => category.name).join(', ') }}
    </p> -->
  <!-- 
    <button @click="edit">Edit</button>
    <button @click="deleteProduct">Delete</button> -->

  <td>{{ product.name }}</td>
  <td>{{ product.description }}</td>
  <td>${{ product.price }}</td>
  <td colspan="2">
    <button class="btn btn-info ms-3" @click="edit">Edit</button>
    <button class="btn btn-danger ms-3" @click="deleteProduct">Delete</button>
  </td>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({})
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    edit() {
      this.$emit('edit-product', this.product)
    },
    deleteProduct() {
      this.$emit('delete-product', this.product)
    }
  }
}
</script>
