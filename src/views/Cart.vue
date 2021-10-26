<template>
cart vue {{cartItems}}
  <div id="cart">
    <div class="cart--header has-text-centered">
      <i class="fa fa-2x fa-shopping-cart"></i>
    </div>
    <p v-if="!cartItems.length" class="cart-empty-text has-text-centered">
      Add some items to the cart!
    </p>
    <ul>
      <li class="cart-item" v-for="cartItem in cartItems" :key="cartItem">
          <CartListItem :cartItem="cartItem"/>
      </li>
      <div class="notification is-success">
        
        <p>
          Total Quantity:
          <span class="has-text-weight-bold">{{ cartQuantity }}</span>
        </p>
      </div>
      <br>
    </ul>
    <div class="buttons">
    <button :disabled="!cartItems.length" class="button is-info">
      Checkout (<span class="has-text-weight-bold">${{ cartTotal }}</span>)
    </button>

 <button class="button is-danger is-outlined" @click="removeAllCartItems()">
    <span>Delete All items</span>
    <span class="icon is-small">
      <i class="fas fa-times"></i>
    </span>
  </button>
       </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CartListItem from "@/components/CartListItem.vue";
export default {
  name: "Cart",
  components: {
    CartListItem
  },
  data(){
      return {
          cartItems: this.$store.getters.getCartItems
      }
  },
  computed: {
    ...mapGetters(["cartTotal", "cartQuantity"]),
  },
  methods: {
      removeAllCartItems(){
        this.$store.dispatch('removeAllCartItems');
        this.$forceUpdate();
      }
  }
};
</script>