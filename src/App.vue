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
 <a>   <router-link to="/" >Menu</router-link></a>
    </div>
     <div class="navbar-item">
<a><router-link to="/about" >About</router-link> </a>
    </div>
     <div class="navbar-item" >
   <a> <router-link  to="/orders" v-if="this.$store.getters.getRole==='admin'" >Orders</router-link></a>
    </div>
  </div>

  <div class="navbar-end">
   <div class="navbar-item">
   <a> <router-link v-if="!this.$store.getters.isLoggedIn" to="/sign-up" >SignUp</router-link></a>
    </div>
     <div class="navbar-item">
   <a> <router-link v-if="!this.$store.getters.isLoggedIn" to="/login">Login</router-link></a>
    </div>
     <div class="navbar-item">
  <a>  <router-link v-if="this.$store.getters.isLoggedIn" to="/account">{{$store.getters.getUser}}</router-link></a>
    </div>
     <div class="navbar-item">
     <a><router-link v-if="this.$store.getters.isLoggedIn&&this.$store.getters.getRole!=='admin'" to="/cart"> <i class="fas fa-shopping-cart"></i><span v-show="$store.getters.cartQuantity">({{$store.getters.cartQuantity}})</span></router-link></a>
     </div>
     <div class="navbar-item">
    <a><router-link v-if="this.$store.getters.isLoggedIn" to="/logout">Logout</router-link></a>
    </div>
  </div>
</div>
  </nav>
  <div class="container">
  <router-view/>
</div>
</template>

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
