<template>
  <div class="row">
    <div class="col-md-12">
      <hr />
      <table class="table table-hover table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>
              {{ category.name }}
            </td>
            <td>
              <button class="btn btn-primary ms-3" @click="editCategory(category)">
                Edit
              </button>
              <button class="btn btn-danger ms-3" @click="deleteCategory(category)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <button class="btn btn-success" @click="addCategory">Add Category</button>
      <hr />
      <div v-if="showForm">
        <h3 v-if="selectedCategory">Edit category</h3>
        <h3 v-else>Add category</h3>
        <form @submit.prevent="onSubmit">
          <label class="form-label"> Name:</label>
            <input type="text" v-model.trim="formData.name" class="form-control" required />
            <span>{{ v$?.formData?.name?.$dirty && v$?.formData?.name?.$error }}</span>
            <!-- <div v-if="$v.user.name.$error" class="error-message">{{ $v.user.name.$errorMessage }}</div> -->
          
          <button class="btn btn-success ms-3 mt-3">
            {{ selectedCategory ? 'Update' : 'Create' }}
          </button>
          <button class="btn btn-warning ms-3 mt-3" type="button" @click="cancelEdit">
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  setup() {
    const rules = {
      formData: {
        name: { required },
      },
    }

    const v$ = useVuelidate(rules)

    return { v$ }
  },
  data() {
    return {
      showForm: false,
      formData: {
        name: ''
      },
      selectedCategory: null
    }
  },

  validations() {
    return {
      name: { required }, // Matches this.name
    }
  },
  computed: {
    ...mapState(['categories'])
  },
  methods: {
    ...mapActions(['createCategory', 'updateCategory', 'deleteCategory']),
    addCategory() {
      this.showForm = true
      this.selectedCategory = null
      this.formData = {
        name: ''
      }
    },
    editCategory(category) {
      this.showForm = true
      this.selectedCategory = category
      this.formData = {
        name: category.name
      }
    },
    onSubmit() {
      if (this.selectedCategory) {
        // Update an existing category
        const updatedCategory = { ...this.selectedCategory, ...this.formData }
        this.updateCategory(updatedCategory)
      } else {
        // Create a new category
        const newCategory = this.formData
        this.createCategory(newCategory)
      }
      this.showForm = false
    },
    deleteCategory(category) {
      if (
        confirm(
          `Are you sure you want to delete the category "${category.name}"?`
        )
      ) {
        this.$store.dispatch('deleteCategory', category.id).catch(error => {
          this.$router.push({
            name: 'ErrorDisplay',
            params: { error: error }
          })
        })
      }
    },
    cancelEdit() {
      this.showForm = false
      this.selectedCategory = null
      this.formData = {
        name: ''
      }
    }
  }
}
</script>
<!-- <style scoped>
.category-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.category-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.category-link {
  color: #2c3e50;
  text-decoration: none;
}
</style> -->
