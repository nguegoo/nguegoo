import ProductList from '@/views/product/ProductList'
import Cart from '@/views/product/Cart'
import DetailProduct from '@/views/product/DetailProduct'
import AllProductDetail from '@/views/product/AllProductDetail'
export default {
  showList: {
    path: '/product/list',
    name: 'ProductList',
    component: ProductList
  },
  cart: {
    path: '/product/cart',
    name: 'Cart',
    component: Cart
  },
  detailProduct: {
    path: '/product/detail-product/:id',
    name: 'DetailProduct',
    component: DetailProduct
  },
  allDetail: {
    path: '/product/all-detail',
    name: 'AllProductDetail',
    component: AllProductDetail
  }
}