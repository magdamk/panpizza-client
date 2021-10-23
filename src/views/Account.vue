<template>
  <div v-if="$store.getters.isLoggedIn">

  <UserData :userData="userData" :email="email" @userDataChange="userDataChange" />
  <div v-show="$store.getters.getRole==='user'">
  <UserOrders :userOrders="userOrders"   />
  </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService.js';
import OrderService from '@/services/OrderService.js';
import UserData from "@/components/UserData.vue";
import UserOrders from "@/components/UserOrders.vue";
export default {
  name: "Account",
  components: { UserData, UserOrders },
  data() {
    return {
      email: '',
      userData: {},
      userOrders: [],
      msg: '',
    };
  },
  
  async created() {
    this.email = this.$store.getters.getUser;
    await this.getUserData(this.email);
    await this.getUserOrders(this.userData._id);
  },
  methods: {
    async getUserData(email){
        if (email){
            this.userData = await UserService.getUserData(email);
            this.msg = this.userData.msg;
            this.userData = this.userData.userData;
        }
    },
    async getUserOrders(id){
            if (id){
                const result = await OrderService.getUserOrders(id);
                this.userOrders = result.userOrders;
                if (!this.userOrders.length) {msg = false}
            }
        },
    async userDataChange(){
     await this.getUserData(this.email);
    }
  }
};
</script>