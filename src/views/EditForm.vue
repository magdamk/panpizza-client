<template>
 <div v-if="role==='admin'">
 <div v-show="showEditForm">
   <h4 >Edytuj wybrane pozycje</h4>
    <form @submit.prevent="updateItem(item)" >
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
        <input type="boolean" id="available" v-model.trim="available"/>
      </div>
      
        <div>
            <button class="btn waves-effect waves-light" type="submit">Submit<i class="material-icons right"></i></button>
        </div>
     
    </form>
    </div>
     <div v-if="!showEditForm">
     <br/>
     <p>{{message.msg}}</p>
     <input type="button" value="Ok" @click="goBack()" />
     </div>
</div>
</template>

<script>

import MenuService from '@/services/MenuService.js';
export default {
    name: 'EditForm',
    props: {
        itemID: {
            type: String,
            required: true
        }
    },
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
        showEditForm: true
    };
},
async created() {
    if (!this.$store.getters.isLoggedIn || this.$store.getters.getRole !== 'admin') {
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
        if (this.photo != this.item.photo) params.photo = this.photo;
        if (this.type != this.item.type) params.type = this.type;
        if (this.position != this.item.position) params.position = this.position;
        if (this.price != this.item.price) params.price = this.price;
        if (this.available != this.item.available) params.available = this.available;
        this.message = await MenuService.updateItem(this.item._id,params);
        this.showEditForm = !this.showEditForm;
       
    },
    goBack(){
         this.$router.push('/');
    }
   
}
}
</script>
