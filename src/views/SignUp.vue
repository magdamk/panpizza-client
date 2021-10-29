<template>
<br/><br/>
 <div v-if="!this.$store.getters.isLoggedIn">
 
    <div v-show="show" class="form">
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
    <label class="label">Repeat password</label>
    <p class="control has-icons-left">
    <input
      type="password"
      placeholder="Password (repeat)"
      v-model="password_repeat"
      class="input"
      style="width:500px;"
    />
    <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
     </p></div> 
     <div class="field">
    <input type="button" @click="signUp" value="Sign Up" class="button is-link"/>
    </div>
    </div>
    <p v-if="msg">{{ msg }}</p>
    
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
  name: "SignUp",
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