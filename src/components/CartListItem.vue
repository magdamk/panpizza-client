<template>
  <div class="box">
    <div class="cart-item__details">
      <p class="is-inline">
      <figure class="image is-2by2">
      <img v-bind:alt="`photo of ${item.name}`" v-bind:src="require(`@/assets/img/${item.photo}`)" style="width:30px" />
    </figure>{{item.type}} {{item.name}}</p>
      <div>
        <span class="has-text-info has-text-weight-bold">
         PLN {{item.price}}
        </span>
        
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'CartListItem',
  props: {
    item:{
      type: Object,
      required: true
    }
  }
}
</script>