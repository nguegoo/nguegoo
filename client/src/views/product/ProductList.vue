<template>
  <div>
      <all-product />
      <Footer />
  </div>
</template>

<script>
import AllProduct from '@/components/product/AllProduct'
import Footer from '@/components/mainComponents/Footer'
export default {
  name: 'ProductList',
  components: {
    AllProduct,
    Footer
  }
}
</script>

<style scoped>

</style>
