<template>
  <div v-show="this.$store.getters.isLoggedIn">
    <h1>Hi {{ email }}</h1>

    <input class="button is-link" type="button" value="Logout" @click="logout()" />
  </div>
  
</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
  name: "Logout",
  data() {
    return {
  //    secretMessage: '',
      email: '',
      msg: ''
    };
  },
  async created() {
    
    this.email = this.$store.getters.getUser;
  //  this.secretMessage = await AuthService.getSecretContent();
  },
  methods: {
    async logout() {
      this.msg =  await AuthService.logout().msg;
      this.$store.dispatch('logout');
      this.$router.push('/');
  },
  
}
}
</script>