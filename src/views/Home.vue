<template>
  <div class="home">
    <h1>Welcome to PAN*PIZZA</h1>
    <h2>Menu</h2>
    <div v-for="(item,index) in menu" :key="item._id"> <b>{{item.name}}</b>
        <br/>
        <br/>
        <img v-bind:alt="`photo of pizza ${item.name}`" v-bind:src="require(`@/assets/img/${item.photo}`)" style="width:100px" />
        <br/>
        {{item.description}} 
        <br/>
        Price: {{item.price}} PLN
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
     // item:'',
      secretMessage: '',
      email: '',
      role: '',
    };
  },
  async created() {

    this.role = this.$store.getters.getRole;
    this.email = this.$store.getters.getUser;
    await this.getMenu();
    this.secretMessage = await AuthService.getSecretContent();
  },
  methods: {
    async getMenu(){
      this.menu = await MenuService.getAllItems();
      this.menu=this.menu.menu;
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
     photoURL (item) {
      return  "@/assets/img/"+item.photo;
      // The path could be '../assets/img.png', etc., which depends on where your vue file is
    }

  },
  
   
};
</script>
