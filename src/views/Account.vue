<template>
  <div>
  <div v-if="showEditForm">
  tu będzie formularz
  </div>
    <h4>Email</h4>
    <p>{{email}}</p>
    <h4>Name</h4>
    <p>{{userData.first_name + ' ' + userData.last_name}} </p>
    <h4>Adress:</h4>
    <p>{{userData.street}} {{userData.house}} / {{userData.flat}}</p>
    <p> {{userData.zip}} {{userData.city}} </p>
    <p>Phone: {{userData.phone}} </p>
    <input type="button" value="Edit" @click="edit" />
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
      phone: '',
      userData: null,
      msg: '',
      showEditForm: false
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
   
    this.email = this.$store.getters.getUser;
    await this.getUserData(this.email);
  //  this.secretMessage = await AuthService.getSecretContent();
  },
  methods: {
    async getUserData(email){
        if (email){
            this.userData = await AuthService.getUserData(email);
            this.msg = this.userData.msg;
            this.userData = this.userData.userData;
        }
    },
    edit() {
     this.showEditForm = !this.showEditForm;
    }
  }
};
</script>