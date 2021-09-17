<template>
  <div>
  <h2>Data</h2>
  <div v-if="showEditForm">
  <p>{{msg}}</p>
  <h4 >Edytuj wybrane pozycje</h4>
    <form @submit.prevent="updateUserData" >
      <div>
        <label for="first_name">First name</label>
        <input type="text" id="first_name" v-model.trim="first_name" />
      </div>
      <div>
        <label for="last_name">Last name</label>
        <input type="text" id="last_name" v-model.trim="last_name" />
      </div>
      <div>
         <label for="street">Street</label>
        <input type="text" id="street" v-model.trim="street"/>
      </div>
      <div >
         <label for="house">House</label>
        <input type="text" id="house" v-model.trim="house"/>
      </div>
      <div >
         <label for="flat">Flat</label>
        <input type="text" id="flat" v-model.trim="flat"/>
      </div>
      <div>
         <label for="zip">Zip-code</label>
         <input type="text" id="zip" v-model.trim="zip"/>
      </div>
      <div >
         <label for="city">City</label>
        <input type="text" id="city" v-model.trim="city"/>
      </div>
      <div >
      <div>
         <label for="phone">Phone</label>
        <input type="tel" id="phone" v-model.number="phone" min="0"/>
      </div>
      </div>
         <div>
        <input type="button" value="Cancel" @click="edit" />
            <button class="btn waves-effect waves-light" type="submit">Submit<i class="material-icons right"></i></button>
        </div>
     
    </form>
  </div>
    <h4>Email</h4>
    
    <p>{{userData.email}}</p>
    <h4>Name</h4>
    <p>{{userData.first_name + ' ' + userData.last_name}} </p>
    <h4>Adress:</h4>
    <p>{{userData.street}} {{userData.house}} <span v-if="userData.flat">/ {{userData.flat}}</span></p>
    <p> {{userData.zip}} {{userData.city}} </p>
    <p>Phone: {{userData.phone}} </p>
    <input type="button" value="Edit" @click="edit" />
  </div>
</template>
<script>
import UserService from '@/services/UserService.js';
export default {
    name: "UserData",
    props: {
        userData: {
            type: Object,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
  emit: ['userDataChange' ],
  data() {
    return {
      secretMessage: '',
      first_name: '',
      last_name: '',
      street: '',
      house: '',
      flat: '',
      city: '',
      zip: '',
      phone: '',
      showEditForm: false,
      message: '',
      msg: ''
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
    
  },
  methods: {
    
    async updateUserData(){
        const params ={};
        if (this.first_name != this.userData.first_name) params.first_name = this.first_name;
        if (this.last_name != this.userData.last_name) params.last_name = this.last_name;
        if (this.street != this.userData.street) params.street = this.street;
        if (this.house != this.userData.house) params.house = this.house;
        if (this.flat != this.userData.flat) params.flat = this.flat;
        if (this.zip != this.userData.zip) params.zip = this.zip;
        if (this.city != this.userData.city) params.city = this.city;
        if (this.phone != this.userData.phone) params.phone = this.phone;
        this.message = await UserService.updateUserData(this.email,params);
     
      //  this.edit(); 
        this.showEditForm = !this.showEditForm;
        this.$emit('userDataChange');
       
    },
    edit() {
        this.first_name = this.userData.first_name;
        this.last_name = this.userData.last_name;
        this.street = this.userData.street;
        this.house = this.userData.house;
        this.flat = this.userData.flat;
        this.zip = this.userData.zip;
        this.city = this.userData.city;
        this.phone = this.userData.phone;
     this.showEditForm = !this.showEditForm;
    }
  }
};
</script>