<template>
 <input type="button" value="Back" @click="goBack()" />
 <div v-if="role==='admin'">
 <div v-if="showAddForm">
 <h4 >Fill in all data</h4>
    <form @submit.prevent="addMenuItem" >
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" v-model.trim="name" />
      </div>
      <div>
        <label for="description">Description</label>
        <input type="text" id="description" v-model.trim="description" />
      </div>
      <div>
         <label for="photo">Photo</label>
        <input type="text" id="photo" v-model.trim="photo"/>
      </div>
       <div>
         <label for="type">Type</label>
        <select type="text" id="type" v-model.trim="type">
          <option value="pizza">PIZZA</option>
          <option value="drink">NAPOJE</option>
        </select>
      </div>
      <div >
         <label for="price">Price</label>
        <input type="number" id="price" v-model.trim="price"/>
      </div>
      <div >
         <label for="position">Position</label>
        <input type="number" id="position" v-model.trim="position"/>
      </div>
      <div >
         <label for="available">Available</label>
         <select type="boolean" id="available" v-model.trim="available">
          <option value=false>false</option>
          <option value=true>true</option>
        </select>
      </div>
      
        <div>
            <button class="btn waves-effect waves-light" type="submit">Submit<i class="material-icons right"></i></button>
        </div>
     
    </form>
</div>
<div v-if="!showAddForm">
     <br/>
     <p>{{message.msg}}</p>
    
     </div>
</div>
</template>
<script>

import MenuService from '@/services/MenuService.js';
export default {
    name: 'AddMenuItem',
    data() {
        return {
        email: '',
        role: '',
        name: '',
        description: '',
        photo: '',
        price: null,
        type: '',
        position: null,
        available: false,
        showAddForm: true,
        mesage: ''
    };
},
async created() {
    if (!this.$store.getters.isLoggedIn && this.$store.getters.getRole !== 'admin') {
      this.$router.push('/login');
    }
    this.role = this.$store.getters.getRole;
    this.email = this.$store.getters.getUser;
    },
 
  methods: {
    async addMenuItem(){
        const params ={
          name: this.name,
          description: this.description,
          photo: this.photo,
          type: this.type,
          position: this.position,
          price: this.price,
          available: this.available
        };
      
        this.message = await MenuService.addMenuItem(params);
        this.showAddForm = false;
       
    },
    goBack(){
         this.$router.push('/');
    }
   
}
}
</script>
