<template>
  <div class="request-container">
      <div class="request-body"
        v-text="number"
      />
  </div>
</template>

<script>
export default {
    props: {
        number: Number,
    },
}
</script>

<style scoped>
    .request-container {
        display: flex;
    }
    .request-body {
        min-width: 20px;
        font-weight: bold;
        border: 1px solid #48CAE4;
        border-radius: 3px;
        background-color: #023E8A;
        color: white;
    }
</style>