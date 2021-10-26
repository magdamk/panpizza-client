<template>
  <div class="box">
    <div class="cart-item__details">
   
      <p class="is-inline">{{item.item[0].type}} {{item.item[0].name}}</p>
      <div>
        <span class="cart-item--price has-text-info has-text-weight-bold">
         {{item.item[0].price}} PLN
        </span>

      
      </div>

    </div>
  </div>
</template>
<script>
import MenuService from '@/services/MenuService.js';
export default {
  name: 'CartListItem',
  props: ['cartItem'],
  data(){
      return {
          itemId: this.cartItem,
          item:null
    }
  },
  async created() {
    this.item = await MenuService.getItemByID(this.itemId);
  },
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