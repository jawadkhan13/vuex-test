<template>
  <hr class="mt-5" />
  <h2>{{ formTitle }}</h2>
  <hr />
  <form @submit.prevent="onSubmit">
    <div class="mb-3 row">
      <label for="name" class="col-sm-1 col-form-label">Name:</label>
      <div class="col-sm-5">
        <input
          type="text"
          id="name"
          class="form-control"
          :class="{ 'is-invalid': errors.name }"
          v-model.trim="formData.name"
        />
        <div class="invalid-feedback">Name is required</div>
      </div>

      <label class="col-sm-1 col-form-label" for="desc">Description: </label>
      <div class="col-sm-5">
        <textarea
          class="form-control"
          :class="{ 'is-invalid': errors.description }"
          id="desc"
          v-model.trim="formData.description"
        ></textarea>
        <div class="invalid-feedback">Description is required</div>
      </div>
    </div>

    <div class="mb-3 row">
      <label class="col-sm-1 col-form-label" for="price">Price:</label>
      <div class="col-sm-5">
        <input
          type="number"
          class="form-control"
          :class="{ 'is-invalid': errors.price }"
          id="price"
          v-model.number="formData.price"
        />
        <div class="invalid-feedback">Price is required</div>
      </div>

      <label for="category" class="col-sm-1 col-form-label">Category:</label>
      <div class="col-sm-5">
        <select
          id="category"
          class="form-select"
          :class="{ 'is-invalid': errors.categoryIds }"
          v-model="formData.categoryIds"
        >
          <option value="" selected="true">Select a category</option>
          <option v-for="category in categories" :value="category.id" :key="category.id">
            {{ category.name }}
          </option>
        </select>
        <div class="invalid-feedback">Catogory is required</div>
      </div>
    </div>
    <div>
      <button type="submit" class="btn btn-success ms-3">{{ saveButtonTitle }}</button>
      <button type="button" class="btn btn-warning ms-3" @click="cancel">Cancel</button>
    </div>
  </form>
</template>
<script>
import { mapActions } from 'vuex'
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
    const rules = {
      name: { required },
      description: { required },
      price: { required },
      categoryId: { required }
    }

    const v$ = useVuelidate(rules)

    return { v$ }
  },
  data() {
    return {
      formData: {
        name: this.product ? this.product.name : '',
        description: this.product ? this.product.description : '',
        price: this.product ? this.product.price : '',
        categoryIds: this.product ? this.product.category : ''
      },
      errors: {}
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories
    },
    formTitle() {
      console.log('Button', this.product.id)
      return this.product.id ? 'Edit Product' : 'New Product'
    },
    saveButtonTitle() {
      return this.product.id ? 'Save Changes' : 'Create Product'
    }
  },
  methods: {
    ...mapActions(['createProduct', 'updateProduct']),
    onSubmit() {
      const formData = {
        name: this.formData.name,
        description: this.formData.description,
        price: this.formData.price,
        categoryIds: this.formData.categoryIds
      }
      if (this.validateForm()) {
        if (this.product.id) {
          const updatedProduct = { ...this.product, ...formData }
          this.$store.dispatch('updateProduct', updatedProduct)
        } else {
          console.log('Add Here')
          this.$store.dispatch('createProduct', formData)
        }

        this.clearForm()
      }
    },
    validateForm() {
      // reset errors object
      this.errors = {}

      // validate name
      if (!this.formData.name.trim()) {
        this.errors.name = 'Name is required.'
      }

      // validate description
      if (!this.formData.description.trim()) {
        this.errors.description = 'Password is required.'
      }
      // validate price
      if (!this.formData.price) {
        this.errors.price = 'Price is required.'
      }
      // validate category
      if (!this.formData.categoryIds.trim()) {
        this.errors.categoryIds = 'Category is required.'
      }

      // return true if there are no errors
      return Object.keys(this.errors).length === 0
    },
    clearForm() {
      this.formData.name = ''
      this.formData.description = ''
      this.formData.price = ''
      this.formData.categoryId = ''
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>
