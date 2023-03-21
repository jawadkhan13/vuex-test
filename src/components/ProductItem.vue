<template>
  <td>{{ product.name }}</td>
  <td>{{ product.description }}</td>
  <td>{{ categories.name }}</td>
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
      type: Object,
      default: () => ({})
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
