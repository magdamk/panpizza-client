<template>
<div>
<p>Hello {{$store.getters.getRole}}!</p>
<p>Today is {{today}}</p>
{{orders}}
    <h2>Orders</h2>
    <div >
    <table>
    <thead>
        <tr>
            <th>
                Nr
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
            <input type="button" value="Details" @click="goToOrder(order._id)" />
            </td>
        </tr>
    </tbody>
    </table>
    </div>
    <div >No orders yet today</div>
    <p>Search past orders by date: </p>
    <div>
        <form @submit.prevent="getAllOrders(date)">
            <div>
            <label for="date">Date: </label>
            <input type="date" id="date" v-model.date ="date" v-bind="{max : setNow()}">
            </div>
            <div>
            <button type="submit">Search<i class="material-icons right">send</i></button>
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
        if (!this.$store.getters.isLoggedIn && this.$store.getters.getRole !== 'admin') {
        this.$router.push('/login');
        };
        await this.getAllOrders();
    },
    watch: {
    // call again the method if the route changes
    '$route': 'getAllOrders'
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
        goToOrder(id) {
        this.$router.push("/orders/" + id);
        }
    }
}
</script>