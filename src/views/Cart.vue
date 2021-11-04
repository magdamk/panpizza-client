<template>
<br/>
{{alert}}
{{msg}}
  <div id="cart" v-show="!hide">
    <div class="cart--header has-text-centered">
      <i class="fa fa-2x fa-shopping-cart"></i>
    </div>
    <p v-if="!cartItems.length" class="cart-empty-text has-text-centered">
      Add some items to the cart!
    </p>
    <ul>
      <li class="cart-item" v-for="cartItem in cartItems" >
    
          <CartListItem :item="cartItem"/>
        
      </li>
      <div class="notification is-success">
        
        <p>
          Total Quantity:
          <span class="has-text-weight-bold">{{ $store.getters.cartQuantity }}</span>
          Total Price:
          <span class="has-text-weight-bold">{{$store.getters.getTotal}}</span>
        </p>
      </div>
      <br>
    </ul>
    <div class="buttons">
    <button :disabled="!cartItems.length" class="button is-info" @click="checkOut()" >
      Checkout (<span class="has-text-weight-bold">{{$store.getters.getTotal}}</span>)
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
import OrderService from '@/services/OrderService.js';
import CartListItem from "@/components/CartListItem.vue";
export default {
  name: "Cart",
  components: {
    CartListItem
  },
  data(){
      return {
        payment: this.$store.getters.getTotal,
        cartItems: this.$store.getters.getCartItems,
        phone: this.$store.getters.getPhone,
        msg: '',
        hide: false,
        alert: ''
      }
  },
  methods: {
    removeAllCartItems(){
      this.$store.dispatch('removeAllCartItems');
      this.cartItems = this.$store.getters.getCartItems
    },
    async checkOut(){
      const id = this.$store.getters.getId;
      if (this.phone){
      const params = {
        payment: this.$store.getters.getTotal,
        products: this.$store.getters.getCartItems.map(({_id}) => [_id])
      }
      const response = await OrderService.addOrder(id,params);
      this.$store.dispatch('removeAllCartItems');
      this.msg = response.msg;
      this.hide = true;
    }else { this.alert = "Please enter your phone and address before making an order! Click on your mail on the menu stripe to enter your account.";
    } 
  }
}
}
</script>