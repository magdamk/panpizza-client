<template>
  <div class="home">
    <h1>Welocme to PAN*PIZZA</h1>
    <div v-if="this.$store.getters.isLoggedIn">
    <h1>Hi {{ email }} {{ role }}</h1>
    <p v-if="secretMessage">{{ secretMessage }} Server level</p>
    <p v-if="role==='admin'">Visible only for admins. Vue level.</p>
   </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';
export default {
  data() {
    return {
      secretMessage: '',
      email: '',
      role: ''
    };
  },
  async created() {
    this.role = this.$store.getters.getRole;
    this.email = this.$store.getters.getUser;
    this.secretMessage = await AuthService.getSecretContent();
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
};
</script>
