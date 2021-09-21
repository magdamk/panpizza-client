<template>
 <input type="button" value="Back" @click="goBack()" />
 <br/>
 <br/>
 <h4>Order nr {{orderID}}</h4>
 <div>
 <p><b>Client: </b></p>
 <p>{{order.order[0].client[0].first_name + ' '+ order.order[0].client[0].last_name}}</p>
 <p>Phone : {{order.order[0].client[0].phone}}</p>
  <p>Address: {{order.order[0].client[0].street + ' '+ order.order[0].client[0].house}}
  <span v-if="order.order[0].client[0].flat">/{{order.order[0].client[0].flat}}</span>
  </p>

</div>
<div>
 <p><b>Order: </b></p>
<p v-for="(product, ind) in order.order[0].product">{{ind+1 + '. ' + product.name}}</p>
 <p>Status: {{order.order[0].status}}</p>
 <div>
 <form @submit.prevent="changeStatus(orderID)">
 <label for="status">Status: </label>
            <select type="text" id="status" v-model="status">
          <option value="new">new</option>
          <option value="accepted">accepted</option>
          <option value="complete">complete</option>
        </select>

<button type="submit" >Change status</button>
</form>
</div>
<input type="button" value="Cancel order" @click="deleteOrder(orderID)" />
</div>
{{order}}
</template>

<script>
import OrderService from '@/services/OrderService.js';
export default {
    name: "Order",
    data() {
    return {
        orderID: this.$route.params.orderID,
        order: [],
        status: ''
    };
  },
    async created()  {
        if (!this.$store.getters.isLoggedIn && this.$store.getters.getRole !== 'admin') {
        this.$router.push('/login');
        }
        await this.getOrder(this.orderID);
        this.status = this.order.order[0].status;
    },
    watch: {
    // call again the method if the route changes
    '$route': 'getOrder(this.orderID)'
  },
    methods: {
       goBack(){
         this.$router.push('/orders');
       },
       async getOrder(orderID){
        this.order = await OrderService.getOrder(this.orderID);
       },
        async changeStatus(id){
            const params = {};
            if (this.status != this.order.order[0].status)
            { params.status = this.status;
            const result = await OrderService.changeOrderStatus(id, params);
            this.$router.push('/orders/'+orderID);
            }
        }
    }
    }

</script>