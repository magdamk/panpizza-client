<template>
<br/>
     <input type="button" class="button is-link" value="Back" @click="goBack()" />
    <br/>
 <div v-if="role==='admin'">
 <div v-show="showEditForm">
   <h4 >Edytuj wybrane pozycje</h4>
    <form class="form" @submit.prevent="updateItem(item)" >
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
        <img :src="require(`@/assets/img/${photo}`)"  style="height:50px;border:2px solid black; padding: 2px">
       {{photo}}
        <input class="input" type="file" accept="image/png, image/jpeg" id="photo" @change="photoChange()"/>
       
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
            <button class="button is-info" type="submit">Save changes<i class="material-icons right"></i></button>
            <input class="button is-danger" type="button" value="Delete menu item" @click="deleteMenuItem()" />
        </div>
     
    </form>

    <div></div>
    </div>
   
     <div v-if="!showEditForm">
     <br/>
     <p>{{message.msg}}</p>
      <div v-if="showDelete">
        <input class="button is-primary" type="button" value="Cancel" @click="showForm()" />
        <input class="button is-danger" type="button" value="Delete confirm" @click="deleteItem()" />
     </div>
     
     </div>
</div>
</template>

<script>

import MenuService from '@/services/MenuService.js';
export default {
    name: 'EditForm',
    /*
    props: {
        itemID: {
            type: String,
            required: true
        }
    },*/
    data() {
        return {
        item:'',
        email: '',
        role: '',
        name: '',
        description: '',
        photo: '',
        price: null,
        type: '',
        position: null,
        available: false,
        showEditForm: true,
        showDelete: false,
        message: { msg: ''}
    };
},
async created() {
    if (this.$store.getters.getRole !== 'admin') {
      this.$router.push('/login');
    }
    this.role = this.$store.getters.getRole;
    this.email = this.$store.getters.getUser;
    this.item = await MenuService.getItemByID(this.$route.params.itemID);
    this.item = this.item.item[0];
    this.name = this.item.name;
      this.description = this.item.description; 
      this.photo = this.item.photo;
      this.price = this.item.price;
      this.type = this.item.type;
      this.position = this.item.position;
      this.available = this.item.available;
  },
 
  methods: {
    async updateItem(){
        const params ={};
        if (this.name != this.item.name) params.name = this.name;
        if (this.description != this.item.description) params.description = this.description;
        console.log('photo ', this.photo);
        if (this.photo != this.item.photo) params.photo = this.photo;
        if (this.type != this.item.type) params.type = this.type;
        if (this.position != this.item.position) params.position = this.position;
        if (this.price != this.item.price) params.price = this.price;
        if (this.available != this.item.available) params.available = this.available;
        this.message = await MenuService.updateItem(this.item._id,params);
        this.showEditForm = !this.showEditForm;
       
    },
    deleteMenuItem(){
      this.showEditForm = !this.showEditForm;
      this.showDelete = true;
      this.message.msg = "Please confirm Menu Item Deletion";
    },
    async deleteItem(){
         this.message = await MenuService.deleteItem(this.item._id);
        this.showDelete = false;
    },
    showForm(){
      this.showEditForm = !this.showEditForm;
      this.showDelete = false;
    },
    goBack(){
         this.$router.push('/');
    },
    photoChange(){
      const path = document.getElementById('photo').value;
      const ind = path.lastIndexOf('\\');
      this.photo = path.slice(ind+1);
    }
   
}
}
</script>
