<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="name">Name</label>
      <input v-model.trim="$v.name.$model" :class="{'is-invalid': $v.name.$error}" type="text" id="name" name="name">
      <div v-if="!$v.name.required" class="invalid-feedback">Name is required.</div>
    </div>
    <div>
      <label for="description">Description</label>
      <textarea v-model.trim="$v.description.$model" :class="{'is-invalid': $v.description.$error}" id="description" name="description"></textarea>
      <div v-if="!$v.description.required" class="invalid-feedback">Description is required.</div>
    </div>
    <div>
      <label for="price">Price</label>
      <input v-model.trim="$v.price.$model" :class="{'is-invalid': $v.price.$error}" type="number" id="price" name="price">
      <div v-if="!$v.price.required" class="invalid-feedback">Price is required.</div>
    </div>
    <div>
      <label for="category">Category</label>
      <select v-model.trim="$v.categoryId.$model" :class="{'is-invalid': $v.categoryId.$error}" id="category" name="category">
        <option value="">-- Select a category --</option>
        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
      </select>
      <div v-if="!$v.categoryId.required" class="invalid-feedback">Category is required.</div>
    </div>
    <button type="submit">Save</button>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  setup() {
    const v$ = useVuelidate({
      name: { required },
      description: { required },
      price: { required },
      categoryId: { required }
    })

    return { v$ }
  },
  data() {
    return {
      categories: [], // assuming this is fetched from the store or API somewhere
      name: this.product ? this.product.name : '',
      description: this.product ? this.product.description : '',
      price: this.product ? this.product.price : '',
      categoryId: this.product ? this.product.category : ''
    }
  },
  methods: {
    onSubmit() {
      if (this.v$.$invalid) {
        return
      }

      const formData = {
        name: this.name,
        description: this.description,
        price: this.price,
        categoryId: this.categoryId
      }

      if (this.product) {
        const updatedProduct = { ...this.product, ...formData }
        this.$store.dispatch('updateProduct', updatedProduct)
      } else {
        console.log('Add Here')
        this.$store.dispatch('createProduct', formData)
      }
    }
  }
}
//In this updated code, we're using useVuelidate from the @vuelidate/core package to create a 
//reactive validation object. We've also updated the template to use the validation object ($v) to
// validate the form inputs and display error messages. In the onSubmit method, we check