<template>
  <div>
    <h1>{{ email }}</h1>
    <h2>My data</h2>
    <p>First Name: {{}} Last Name: {{}}</p>
    <h4>Adress:</h4>
    <p>Street: {{}} House: {{}} Flat: {{}}</p>
    <p>City: {{}} Zip: {{}} </p>
    <p>Phone: {{}} </p>
    <input type="button" value="Logout" @click="logout" />
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
  data() {
    return {
  //    secretMessage: '',
      email: '',
      first_name: '',
      last_name: '',
      street: '',
      house: '',
      flat: '',
      city: '',
      zip: '',
      phone: ''
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
    this.email = this.$store.getters.getUser;
  //  this.secretMessage = await AuthService.getSecretContent();
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/home');
    }
  }
};
</script>