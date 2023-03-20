<template>
  <div class="about">
    <div>{{ $store.state.user }}</div>
    <div class="container">
      <h1>Categories</h1>
      <CreateCat />
    </div>
  </div>
  <br />
</template>

<script>
// import CategoryCard from '@components/CategoryCard.vue'
import { v4 as uuidv4 } from 'uuid'
import CreateCat from '@/components/CreateCat.vue'
export default {
  components: {
    CreateCat
  },
  data() {
    return {
      category: {
        id: '',
        name: ''
      }
    }
  },
  methods: {
    onSubmit() {
      const category = {
        ...this.category,
        id: uuidv4()
      }
      this.$store.dispatch('createCat', category)
      this.$router.push({
        name: 'CategoryList'
      })
      // .catch(error => {
      //   this.$router.push({
      //     name: 'ErrorDisplay',
      //     params: { error: error }
      //   })
      // })
    }
  }
}
</script>
