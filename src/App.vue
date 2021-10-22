<template>

  <nav class="navbar is-success" role="navigation" aria-label="main navigation">

<div class="navbar-brand">
    <p class="navbar-item" >
      <img src="../src/assets/img/pepperoni1.png" width="28" height="28">
      PAN*PIZZA
    </p>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMenuItems">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      

    </a>
  </div>

  <div id="navbarMenuItems" class="navbar-menu">
   <div class="navbar-start">
   <div class="navbar-item">
    <router-link to="/" >Menu</router-link>
    </div>
     <div class="navbar-item">
    <router-link to="/about" >About</router-link> 
    </div>
     <div class="navbar-item" v-if="this.$store.getters.getRole==='admin'">
    <router-link  to="/orders" >Orders</router-link>
    </div>
  </div>

  <div class="navbar-end">
   <div class="navbar-item">
    <router-link v-if="!this.$store.getters.isLoggedIn" to="/sign-up" >SignUp</router-link>
    </div>
     <div class="navbar-item">
    <router-link v-if="!this.$store.getters.isLoggedIn" to="/login">Login</router-link>
    </div>
     <div class="navbar-item">
    <router-link v-if="this.$store.getters.isLoggedIn" to="/account">{{$store.getters.getUser}}</router-link>
    </div>
     <div class="navbar-item">
     <router-link v-if="this.$store.getters.isLoggedIn" to="/cart"> <i class="fas fa-shopping-cart"></i></router-link>
     </div>
     <div class="navbar-item">
    <router-link v-if="this.$store.getters.isLoggedIn" to="/logout">Logout</router-link>
    </div>
  </div>
</div>
  </nav>
  <div class="container">
  <router-view/>
</div>
</template>
<script>
import './../node_modules/bulma/css/bulma.css'

export default {}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
