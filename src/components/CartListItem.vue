<template>
  <div class="box">
    <div class="cart-item__details">
      <p class="is-inline">{{cartItem}}</p>
      <div>
        <span class="cart-item--price has-text-info has-text-weight-bold">
         xxx
        </span>

        <span>
          <i class="fa fa-arrow-circle-up " @click="addToCart(cartItem)"></i>
          <i class="fa fa-arrow-circle-down " @click="removeFromCart(cartItem)"></i>
        </span>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'CartListItem',
  props: ['cartItem'],
  methods: {
    addToCart(id){
        this.$store.dispatch('addToCart', id);
    },
    removeFromCart(id){
        this.$store.dispatch('removeFromCart', id);
        },
  }
}
</script>