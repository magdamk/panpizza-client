<template>
  <div>
  <h2>USER DATA <i class="fas fa-address-card"></i></h2>
  <div v-if="showEditForm">
  <p>{{msg}}</p>
  <h4 >Edytuj wybrane pozycje</h4>
    <form class="form" @submit.prevent="updateUserData" >
      <div class="field is-horizontal">
       <div class="field-body">
        <div class="field">
        <label class="label" for="first_name">First name</label>
         <p class="control is-expanded has-icons-left">
          
          <input class="input" type="text" id="first_name" v-model.trim="first_name" />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </p>
        </div>
       <div class="field">
       <label class="label" for="last_name">Last name</label>
       <p class="control is-expanded has-icons-left">
        
        <input class="input" type="text" id="last_name" v-model.trim="last_name" />
         <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
        
      </p>
      </div>
      </div>
      </div>
      
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <label class="label" for="street">Street</label>
            <p class="control is-expanded has-icons-left">
            <input class="input" type="text" id="street" v-model.trim="street"/>
            <span class="icon is-small is-left">
            <i class="fas fa-map-marker-alt"></i>
            </span>
            </p>
          </div>
          <div class="field">
            <label class="label" for="house">House</label>
            <p class="control is-expanded has-icons-left">
            <input class="input" type="text" id="house" v-model.trim="house"/>
            <span class="icon is-small is-left">
            <i class="fas fa-map-marker-alt"></i>
            </span>
            </p>
          </div>
          <div class="field">
              <label class="label" for="flat">Flat</label>
              <p class="control is-expanded has-icons-left">
            <input class="input" type="text" id="flat" v-model.trim="flat"/>
            <span class="icon is-small is-left">
            <i class="fas fa-map-marker-alt"></i>
            </span>
            </p>
          </div>
        </div>
      </div>

  <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
             <label class="label" for="zip">Zip-code</label>
            <p class="control is-expanded has-icons-left">
            <input class="input" type="text" id="zip" v-model.trim="zip"/>
            <span class="icon is-small is-left">
            <i class="fas fa-map-marker-alt"></i>
            </span>
            </p>
          </div>
          <div class="field">
             <label class="label" for="city">City</label>
            <p class="control is-expanded has-icons-left">
            <input class="input" type="text" id="city" v-model.trim="city"/>
            <span class="icon is-small is-left">
            <i class="fas fa-map-marker-alt"></i>
            </span>
            </p>
          </div>

        </div>
      </div>
      
      
      <div class="field is-horizontal">
      <div class="field">
         <label class="label" for="phone">Phone</label>
          <p class="control is-expanded has-icons-left">
        <input class="input" type="tel" id="phone" v-model.number="phone" min="0"/>
        <span class="icon is-small is-left">
            <i class="fas fa-phone"></i>
            </span>
            </p>
      </div>
      </div>
         <div class="field is-horizontal">
         <div class="field-body">
         <div class="field">
          <input class="button is-danger" type="button" value="Cancel" @click="edit" />
          </div>
          <div class="field">
            <button class="button is-link" type="submit">Submit<i class="material-icons right"></i></button>
            </div>
          </div>  
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
    <h4>Phone:</h4>
    <p> {{userData.phone}} </p>
    <input v-if="!showEditForm" type="button" class="button is-primary" value="Edit" @click="edit" />
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
<style>
  h4, h2 {
    font-weight: bold;
  }
</style>