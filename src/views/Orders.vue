<template>
<div v-if="$store.getters.getRole==='admin'">
<p>Hello {{$store.getters.getRole}}!</p>
<p>Today is {{today}}</p>
<div v-show="!orders.length">No orders yet today</div>
   
    <h2>Orders</h2>
    <div>
    <table class="table">
    <thead>
        <tr>
            <th>
                Nr
            </th>
            <th>
                Time
            </th>    
            <th>
                Client
            </th>
            <th>
                Phone
            </th>
            <th>
                Address
            </th>
            <th>
                Products
            </th>
            <th>
                Payment
            </th>
            <th>
                Status
            </th>
            <th>
                Details
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(order,index) in orders" :key="order._id">
            <td>
                {{index+1}}
            </td>
            <td>
                {{order.date.slice(11,19)}}
            </td>
             <td>
                {{order.client[0].first_name + ' ' + order.client[0].last_name}}
            </td>
            <td>
                {{order.client[0].phone}}
            </td>
            <td>
                {{order.client[0].street + ' ' + order.client[0].house}}<span v-if="order.client[0].flat">/{{order.client[0].flat}}</span>
            </td>
            <td>
               <span v-for="product in order.product">{{ product.name+' ' }}</span>
            </td>
            <td>
                {{order.payment}}
            </td>
            <td>
                {{order.status}}
            </td>
            <td>
            <input type="button" class="button" value="Details" @click="goToOrder(order._id)" />
            </td>
        </tr>
    </tbody>
    </table>
    </div>
   <br/>
    <p>Search past orders by date: </p>
    <div>
        <form class="form" @submit.prevent="getAllOrders(date)">

            <div class="field">
            <label class="label" for="date">Date: </label>
            <input class="input" type="date" id="date" v-model.date ="date" v-bind="{max : setNow()}" style="width:150px;">
            </div>
            <div class="field">
            <button class="button is-link" type="submit"><span>Search</span><span class="icon"><i class="fas fa-search"></i></span></button>
            </div>
        </form>
    </div> 
</div>
</template>

<script>
//import UserService from '@/services/UserService.js';
import OrderService from '@/services/OrderService.js';
//import UserData from "@/components/UserData.vue";
//import UserOrders from "@/components/UserOrders.vue";
export default {
    name: "Orders",
    data() {
    return {
      orders: [],
      today: new Date().toISOString().split("T")[0],
      date: new Date().toISOString().split("T")[0],
      
    };
  },
    async mounted()  {
        if (this.$store.getters.getRole !== 'admin') {
        this.$router.push('/');
        };
        await this.getAllOrders();
    },
    
    methods: {
        async getAllOrders(){
            const query = "?dateString=" + this.date;
            this.orders = await OrderService.getAllOrders(query);
            this.orders = this.orders.orders;
            
        },
        setNow(){
            return new Date().toISOString().split("T")[0];

        },
        goToOrder(orderId) {
        this.$router.push("/orders/"+orderId);
        }
    }
}
</script>