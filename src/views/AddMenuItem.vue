<template>
<br/>
     <input type="button" class="button is-link" value="Back" @click="goBack()" />
    <br/>
 <div v-if="role==='admin'">
 <div v-if="showAddForm">
 <h4 >Fill in all data</h4>
 <form class="form" @submit.prevent="addMenuItem" >
      <div class="field">
        <label class="label" for="name">Name</label>
        <input class="input" type="text" id="name" v-model.trim="name" />
      </div>
      <div class="field">
        <label class="label" for="description">Description</label>
        <input class="input"  type="text" id="description" v-model.trim="description" />
      </div>
      <div class="field">
         <label class="label" for="photo">Photo</label>
        <input class="input" type="text" id="photo" v-model.trim="photo"/>
      </div>
      <div class="select">
       <select type="text" id="type" v-model.trim="type">
          <option value="pizza">PIZZA</option>
          <option value="drink">DRINKS</option>
        </select>
      </div>
      <div class="field">
         <label class="label" for="price">Price</label>
        <input class="input" type="number" id="price" v-model.trim="price"/>
      </div>
       <div class="field">
         <label class="label" for="position">Position</label>
        <input class="input" type="number" id="position" v-model.trim="position"/>
      </div>
       <div class="field" >
         <label class="label" for="available">Available</label>
         <div class="select">
         <select type="boolean" id="available" v-model.trim="available">
          <option value=false>false</option>
          <option value=true>true</option>
        </select>
        </div>
      </div>
      
        <div class="field">
            <button class="button is-info" type="submit">Submit<i class="material-icons right"></i></button>
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
    if (this.$store.getters.getRole !== 'admin') {
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
