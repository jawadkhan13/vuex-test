<template>
  <h1>Log In Here:</h1>

  <div class="container">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <input v-model="form.name" type="text" placeholder="Name" class="form-control"
              :class="{ 'is-invalid': errors.name }" />
            <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
          </div>
          <div class="mb-3">
            <input v-model="form.password" type="password" placeholder="Password" class="form-control"
              :class="{ 'is-invalid': errors.password }" />
            <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
          </div>
          <button type="submit" class="btn btn-success">Submit</button>
        </form>
      </div>
      <div class="col-md-4"></div>
      <!-- <div>{{ $store.state.user }}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    onSubmit() {
      // validate form before submitting
      if (this.validateForm()) {
        this.$store.dispatch('signIn', this.form)
        this.$router.push({
          name: 'Dashboard'
        })
      }
    },
    validateForm() {
      // reset errors object
      this.errors = {}

      // validate name
      if (!this.form.name) {
        this.errors.name = 'Name is required.'
      }

      // validate password
      if (!this.form.password) {
        this.errors.password = 'Password is required.'
      }

      // return true if there are no errors
      return Object.keys(this.errors).length === 0
    }
  }
}
</script>
