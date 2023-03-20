<template>
  <!-- <div class="category-card">
    <h4>{{ category.name }}</h4>
  </div> -->
  <div class="col-md-3 ml-5 mb-5">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">{{ category.name }}</h5>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  }
}
</script>
<!-- 
<style scoped>
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
