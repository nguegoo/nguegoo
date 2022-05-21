<template>
  <main class="d-flex justify-center align-center">
    <div color="grey lighten-2" height="500">
      <h1 class="text-center mb-6 mt-6 mb-3" style="text-decoration: underline">ACCESS DENIED</h1>
      <div class="text-center mb-6">
        <v-icon style="font-size: 10em;">mdi-file-lock</v-icon>
      </div>
      <p class="text-center mb-6 font-weight-bold">Cette ressource est protégée par une authentification</p>
       <div class="text-center mb-6">
        <v-icon style="font-size: 5em;" class="mdi-spin">mdi-lock-outline</v-icon>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>

</style>
