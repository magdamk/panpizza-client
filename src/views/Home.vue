<template>
  <div class="home">
  User: {{$store.getters.getUser}}
    <h1>Welcome to PAN*PIZZA</h1>
    <h2>Menu</h2>

     <div v-if="role==='admin'"><input type="button" value="Add menu item" @click="add()" />
    
      <br/><br/>
      </div>
    <h3>PIZZA</h3>
    <div v-for="(item,index) in menu.pizza" :key="item._id"  v-show="(role==='admin') || (item.available===true)"> <b>{{item.name}}</b>
        <br/>
        <br/>
        <div v-if="role==='admin'">
         {{item.position}}.
        <br/>
        On menu: <span v-if="item.available">{{item.available}}</span>
                                            <span v-else  style="color:red;"> {{item.available}}</span>
        
        </div>
        <img v-bind:alt="`photo of pizza ${item.name}`" v-bind:src="require(`@/assets/img/${item.photo}`)" style="width:100px" />
        <br/>
        {{item.description}} 
        <br/>
        Price: {{item.price}} PLN
        <div v-if="role==='admin'"><input type="button" value="Edit" @click="edit(item._id)" />
         
  
        </div>
        <br/><br/><br/>
    </div>
    <h3>NAPOJE</h3>
    <p>w przygotowaniu</p>
    <div v-for="(item,index) in menu.drink" :key="item._id"> <b>{{item.name}}</b>
        <br/>
        <br/>
        <div v-if="role==='admin'">
        {{item.position}}.
        <br/>
        On menu: <span v-if="item.available">{{item.available}}</span>
                                            <span v-else  style="color:red;"> {{item.available}}</span>
        
        </div>
        <img v-bind:alt="`photo of drink ${item.name}`" v-bind:src="require(`@/assets/img/${item.photo}`)" style="width:100px" />
        <br/>
        {{item.description}} 
        <br/>
        Price: {{item.price}} PLN
        <div v-if="role==='admin'"><input type="button" value="Edit" @click="edit(item._id)" />
         
 
        </div>
        <br/><br/><br/>
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
  },
  
  methods: {
    async getMenu(){
      this.menu = await MenuService.getAllItems();
      this.menu=this.menu.menu;
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
