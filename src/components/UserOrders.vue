<template>
<div>
    <h2>Orders</h2>
    <div v-if="userOrders.length">
    <table>
    <thead>
        <tr>
            <th>
                Nr
            </th>
            <th>
                Date
            </th>
            <th>
                Status
            </th>
            <th>
                Products
            </th>
            <th>
                Price
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(order,index) in userOrders" :key="order._id">
            <td>
                {{index+1}}
            </td>
            <td>
                {{order.dateString}}
            </td>
            <td>
                {{order.status}}
            </td>
            <td>
                <span v-for="product in order.product">{{ product.name+' ' }}</span>
            </td>
            <td>
                {{order.payment}}
            </td>
        </tr>
    </tbody>
    </table>
    </div>
    <div v-else>No orders yet</div>
</div>
</template>

<script>

export default {
    name: "UserOrders",
    props: {
        userOrders: {
            type: Array,
            required: true
        }
    },
    async mounted()  {
        if (!this.$store.getters.isLoggedIn) {
        this.$router.push('/login');
        };
    }
}
</script>