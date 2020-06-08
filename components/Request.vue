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
        border: 1px solid black;
        border-radius: 2px;
        background-color: cadetblue;
    }
</style>