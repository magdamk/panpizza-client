<template>
  <div v-if="!this.$store.getters.isLoggedIn">
    <h1>Sign Up</h1>
    <div v-show="show">
    <input type="text" placeholder="Email" v-model="email" />
    <input type="text" placeholder="Password" v-model="password" />
    <input
      type="text"
      placeholder="Password (repeat)"
      v-model="password_repeat"
    />
    <input type="button" @click="signUp" value="Sign Up" />
    </div>
    <p v-if="msg">{{ msg }}</p>
    
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
  data() {
    return {
      email: '',
      password: '',
      password_repeat: '',
      msg: '',
      show: true
    };
  },
  methods: {
    async signUp() {
      try {
        const credentials = {
          email: this.email,
          password: this.password,
          password_repeat: this.password_repeat
        };
        const response = await AuthService.signUp(credentials);
        this.msg = response.msg;
        this.show = false;
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    }
  }
};
</script>