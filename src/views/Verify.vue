<template>
  <div>
    <h1>Welocme to PAN*PIZZA</h1>
    
    <p>Please  <input class="button is-link" type="button" value="Login" @click="login" /></p>
    <p>{{msg}} </p>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';
export default {
  name: "Verify",
  data() {
    return {
      msg: ''
    };
  },
  beforeMount() {
    this.verify()
  },
   methods: {
    async verify(){
    try {
        const credentials = this.$route.params.userID+'/'+this.$route.params.token;
        const response = await AuthService.verify(credentials);
        this.msg = response.msg;
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
    login() {
        this.$router.push('/login');
    }
  }
  
};
</script>
