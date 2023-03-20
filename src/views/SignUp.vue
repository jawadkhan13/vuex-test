<template>
  <h1>Sign-Up Here:</h1>

  <div class="container">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <input v-model="user.name" type="text" placeholder="Name" class="form-control"
              :class="{ 'is-invalid': errors.name }" />
            <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
          </div>
          <div class="mb-3">
            <input v-model="user.password" type="password" placeholder="Password" class="form-control"
              :class="{ 'is-invalid': errors.password }" />
            <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
          </div>
          <button type="submit" class="btn btn-success">Submit</button>
        </form>
      </div>
      <div class="col-md-4"></div>
    </div>
    <!-- <div>{{ $store.state.user }}</div> -->
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  data() {
    return {
      user: {
        id: '',
        name: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    onSubmit() {
      const user = {
        ...this.user,
        id: uuidv4()
      }
      if (this.validateForm()) {
        this.$store.dispatch('createUser', user)
        this.$router.push({
          name: 'SignIn'
        })
      }
    },
    validateForm() {
      // reset errors object
      this.errors = {}

      // validate name
      if (!this.user.name.trim()) {
        this.errors.name = 'Name is required.'
      }

      // validate password
      if (!this.user.password.trim()) {
        this.errors.password = 'Password is required.'
      }

      // return true if there are no errors
      return Object.keys(this.errors).length === 0
    }
  }
}
</script>
