<template>
  <div class="about">
    <div class="container">
      <h1>Categories</h1>
      <CreateCat />
    </div>
  </div>
  <br />
  <br />
</template>
<script>
// import CategoryCard from '../components/CategoryCard.vue'
import CreateCat from '@/components/CreateCat.vue'

export default {
  components: {
    // CategoryCard,
    CreateCat
  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push({
        name: 'SignIn'
      })
    }
    console.log('hello')
    this.$store.dispatch('fetchCats').catch(error => {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error }
      })
    })
  },
  computed: {
    categories() {
      // let a = carStore.state.categories
      console.log('Template:', this.$store.state.categories)
      console.log('Template 1:', this.$store.state.category)
      return this.$store.state.categories
    }
  }
}
</script>
<!-- <style scoped>
.categories {
  display: flex;
  flex-direction: column;
  align-items: left;
}
</style> -->
