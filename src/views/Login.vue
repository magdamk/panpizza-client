<template>
  <div v-if="!this.$store.getters.isLoggedIn">
    <h1>Login</h1>
     <div class="field">
        <label class="label">Email</label>
        <p class="control has-icons-left">
        
        <input type="email" placeholder="Email" v-model="email" class="input" style="width:500px;"/>
        <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
    </p></div>
    <div class="field">
     <label class="label">Password</label>
    <p class="control has-icons-left">
    <input type="password" placeholder="Password" v-model="password" class="input" style="width:500px;"/>
    <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
    </p></div>
     <div class="field">
    <input type="button" @click="login" value="Login" class="button is-link"/>
    </div>
   
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      msg: ''
    };
  },
  mounted()  {
        if (this.$store.getters.isLoggedIn) {
        this.$router.push('/');
        };
    },
  methods: {
    async login() {
      try {
        const credentials = {
          email: this.email,
          password: this.password
        };
        const response = await AuthService.login(credentials);
        this.msg = response.msg;
        const token = response.token;
        const email = response.email;
        const role = response.role;
        const id = response.id;
        const phone = response.phone;
        this.$store.dispatch('login', { token, email, role, id, phone });
        this.$router.push('/');
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    }
  }
};
</script>