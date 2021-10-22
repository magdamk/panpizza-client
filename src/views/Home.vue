<template>
  <div class="container">
  <br/>
  <div v-if="role==='admin'"><input type="button" class="button is-primary" value="Add menu item" @click="add()" />
  
  </div>
  <br/>
  <h1>PIZZA</h1>
            
           
  <br/><br/>
  <div class="columns">
    <div class="card" v-for="(item,index) in menu.pizza" :key="item._id"  v-show="(role==='admin') || (item.available===true)"> 
      <br/>
      <br/>
      <div v-if="role==='admin'">
         {{item.position}}.
      <br/>
      On menu: <span v-if="item.available">{{item.available}}</span>
                                            <span v-else  style="color:red;"> {{item.available}}</span>
      </div>
  
  <header class="card-header">
    <p class="card-header-title">
      {{item.name}}
    </p> 
  </header>
   
   <div class="card-image">
    <figure class="image is-4by4">
      <img v-bind:alt="`photo of pizza ${item.name}`" v-bind:src="require(`@/assets/img/${item.photo}`)" style="width:100px" />
    </figure>
  </div>

  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">{{item.price}} PLN</p>
      </div>
    </div>
    {{item.description}} 
    <br/>
    <br/>
  </div>
  <footer class="card-footer">
    <div v-if="role==='admin'"><input class="button is-warning" type="button" value="Edit" @click="edit(item._id)" /></div>
    <div v-if="role!=='admin'">
      <button class="button is-danger" @click="removeFromCart(item.id)" v-if="isInCart(item.id)"><span>remove from cart</span>
      <span class="icon">
      <i class="fas fa-shopping-cart"></i>
    </span>
      </button>
      <button class="button is-info" @click="addToCart(item.id)" v-else><span>add to cart</span> <span class="icon">
      <i class="fas fa-shopping-cart"></i>
    </span></button>
    </div>
  </footer>
   
    <br/><br/><br/>
  </div>
  </div>
    <h1>NAPOJE</h1>
     <br/><br/>
   <div class="columns">
     <div class="card" v-for="(item,index) in menu.drink" :key="item._id"  v-show="(role==='admin') || (item.available===true)"> 
      <br/>
      <br/>
      <div v-if="role==='admin'">
         {{item.position}}.
      <br/>
      On menu: <span v-if="item.available">{{item.available}}</span>
                                            <span v-else  style="color:red;"> {{item.available}}</span>
      </div>
  
  <header class="card-header">
    <p class="card-header-title">
      {{item.name}}
    </p> 
  </header>
   
   <div class="card-image">
    <figure class="image is-4by4">
      <img v-bind:alt="`photo of drink ${item.name}`" v-bind:src="require(`@/assets/img/${item.photo}`)" style="width:100px" />
    </figure>
  </div>

  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">{{item.price}} PLN</p>
      </div>
    </div>
    {{item.description}} 
    <br/>
    <br/>
  </div>
  <footer class="card-footer">
    <div v-if="role==='admin'"><input class="button is-warning" type="button" value="Edit" @click="edit(item._id)" /></div>
    <div v-if="role!=='admin'">
      <button class="button is-danger" @click="removeFromCart(item.id)" v-if="isInCart(item.id)"><span>remove from cart</span>
      <span class="icon">
      <i class="fas fa-shopping-cart"></i>
    </span>
      </button>
      <button class="button is-info" @click="addToCart(item.id)" v-else><span>add to cart</span> <span class="icon">
      <i class="fas fa-shopping-cart"></i>
    </span></button>
    </div>
  </footer>
   
    <br/><br/><br/>
  </div>
  </div>
    <div v-if="this.$store.getters.isLoggedIn">
    <h1>Hi {{ email }} {{ role }}</h1>
    <p v-if="secretMessage">{{ secretMessage }} Server level</p>
    <p v-if="role==='admin'">Visible only for admins. Vue level.</p>
   </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';
import MenuService from '@/services/MenuService.js';
export default {
  data() {
    return {
      menu: '',
      email: '',
      role: '',
      showAddForm: false,
      name: '',
      description: '',
      photo: '',
      price: 0,
      type: '',
      position: null,
      available: false
    };
  },
  async created() {

    this.role = this.$store.getters.getRole;
    this.email = this.$store.getters.getUser;
    
    await this.getMenu();
  }
  /*,
  watch: {
    // call again the method if the route changes
    '$route': 'getMenu'
    }
    */
    ,
  methods: {
    async getMenu(){
      this.menu = await MenuService.getAllItems();
      this.menu=this.menu.menu;
    },
    addToCart(id) {

    },
    removeFromCart(id){

    },
    isInCart(id){

    },
    edit(itemID){
      this.$router.push('/edit/'+itemID);
    },
    add() {
     this.$router.push('/add');
    }
  },
};
</script>
<style>
  .card {
    width: 300px;
    margin: 15px;
    
  }
  .card-content {
    height: 150px;
  }
  h1{
    font-weight: bold;
    text-align: center;
    font-size: 36px;
  }
</style>
