<template>
  <div class="container">
  <br/>
  <div v-if="role==='admin'"><input type="button" class="button is-primary" value="Add menu item" @click="add()" />
  
  </div>
  <br/>
  <h1>
  <img src="../assets/img/pizza.svg" width="28" height="28" style="padding:4px"/>
  PAN*PIZZA
  <img src="../assets/img/pizza.svg" width="28" height="28" style="padding:4px"/></h1>
            
           
  <br/><br/>
  <div class="columns is-multiline">
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
    <button class="button is-info" @click="addToCart(item)" ><span style="width:124px;">add to cart</span> <span class="icon">
      <i class="fas fa-shopping-cart"></i>
    </span></button>
      <button class="button is-danger" @click="removeFromCart(item)" v-if="isInCart(item)"><span style="width:124px;">remove from cart</span>
      <span class="icon">
      <i class="fas fa-shopping-cart"></i>
    </span>
      </button>
      
    </div>
  </footer>
   
    <br/><br/><br/>
  </div>
  </div>
    <h1>
    <img src="../assets/img/bottle.jpg" width="28" height="28" style="padding:4px"/>
    PAN*DRINKS
    <img src="../assets/img/bottle.jpg" width="28" height="28" style="padding:4px"/>
    </h1>
     <br/><br/>
   <div class="columns is-multiline">
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
      <img v-bind:alt="`photo of drink ${item.name}`" v-bind:src="require(`@/assets/img/${item.photo}`)" style="width:50px" />
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
    <button class="button is-info" @click="addToCart(item)"><span style="width:124px;">add to cart</span> <span class="icon">
      <i class="fas fa-shopping-cart"></i>
    </span></button>
      <button class="button is-danger" @click="removeFromCart(item)" v-if="isInCart(item)"><span style="width:124px;">remove from cart</span>
      <span class="icon">
      <i class="fas fa-shopping-cart"></i>
    </span>
      </button>
      
    </div>
  </footer>
   
    <br/><br/><br/>
  </div>
  </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';
import MenuService from '@/services/MenuService.js';
export default {
   name: "Home",
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
      available: false,
      cartItems: [],
      payment: 0
    };
  },
  async created() {

    this.role = this.$store.getters.getRole;
    this.email = this.$store.getters.getUser;
    this.cartItems = this.$store.getters.getCartItems;
    this.payment = this.$store.getters.getTotal;
    
    await this.getMenu();
  },
  methods: {
    async getMenu(){
      this.menu = await MenuService.getAllItems();
      this.menu=this.menu.menu;
    },
    addToCart(item){
    //  console.log('id i price', id,price);
      if (!this.$store.getters.isLoggedIn) this.$router.push('/login')
      else  this.$store.dispatch('addToCart', item);
    },
    removeFromCart(item){
        this.$store.dispatch('removeFromCart', item);
        },
    isInCart(item){
            const ind = this.$store.getters.getCartItems.findIndex(i=>i._id === item._id);
            if (ind>-1) return true
            else return false;
        },
    edit(itemID){
      this.$router.push('/edit/'+itemID);
    },
    add() {
     this.$router.push('/add');
    }
  }
};
</script>
<style>
  .card {
    width: 300px;
    margin: 15px;
    
  }
  .card-content {
    height: 200px;
  }
  h1{
    font-weight: bold;
    text-align: center;
    font-size: 36px;
  }
</style>
