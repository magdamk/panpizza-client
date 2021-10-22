<template>
<div v-if="$store.getters.getRole==='admin'">
 <input type="button" value="Back" @click="goBack()" />
 <br/>
 <br/>
 <h4>Order nr {{orderID}}</h4>
 <div>
 <p><b>Client: </b></p>
 <p>{{order.client[0].first_name + ' '+ order.client[0].last_name}}</p>
 <p>Phone : {{order.client[0].phone}}</p>
  <p>Address: {{order.client[0].street + ' '+ order.client[0].house}}
  <span v-if="order.client[0].flat">/{{order.client[0].flat}}</span>
  </p>

</div>
<div>
 <p><b>Order: </b></p>
<p v-for="(product, ind) in order.product">{{ind+1 + '. ' + product.name}}</p>
 <p>Status: {{order.status}}</p>
 <div>
 <form @submit.prevent="changeStatus(orderID)">
 <label for="status">Status: </label>
        <select type="text" id="status" v-model="status">
          <option value="pending">Pending</option>
          <option value="in progress">In progress</option>
          <option value="complete">Complete</option>
        </select>

<button type="submit" >Change status</button>
</form>
</div>
<input type="button" value="Cancel order" @click="deleteOrder(orderID)" />
</div>
</div>
</template>

<script>
import OrderService from '@/services/OrderService.js';
export default {
    name: "Order",
    data() {
    return {
        orderID: this.$route.params.orderID,
        order: {},
        status: ''
    };
  },
    async created()  {
        if (this.$store.getters.getRole !== 'admin') {
        this.$router.push('/');
        }
        await this.getOrder(this.$route.params.orderID);
        this.status = this.order.status;
    },
    methods: {
       goBack(){
         this.$router.push('/orders');
       },
       async getOrder(id){
        this.order = await OrderService.getOrder(id);
        this.order = this.order.order[0];
       },
        async changeStatus(id){
            const params = {};
            if (this.status != this.order.status)
            { params.status = this.status;
            const result = await OrderService.changeOrderStatus(id, params);
            this.$router.push('/orders/');
            }
        },
        async deleteOrder(id){
            const params = {status: 'cancelled'};
            
            const result = await OrderService.changeOrderStatus(id, params);
            this.$router.push('/orders/');
        }
    }
    }

</script>